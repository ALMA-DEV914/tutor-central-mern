const { User, Student, Tutor, Chat, Message } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { GraphQLUpload } = require("graphql-upload");
const aws = require("../utils/aws-fileupload");
const { signToken } = require("../utils/auth");
const sharp = require("sharp");
const { ChainableTemporaryCredentials } = require("aws-sdk");

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // thoughts: async () => {
    //   return Thought.find().sort({ createdAt: -1 });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        // console.log(context.user);
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v"
        );

        if (userData.role === "tutor") {
          const tutorData = await Tutor.findOne({
            userId: context.user._id,
          }).populate("userId");
          return { user: userData, tutor: tutorData };
        }
        if (userData.role === "student") {
          const studentData = await Student.findOne({
            userId: context.user._id,
          }).populate("userId");
          return { user: userData, student: studentData };
        }

        // return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // get all users
    users: async () => {
      return await User.find().select("-__v -password");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return await User.findOne({ username }).select("-__v -password");
    },
    student: async (parent, { id }, context) => {
      return await Student.findOne({ _id: id })
        .select("-__v")
        .populate("userId");
    },
    tutors: async (parent, args, context) => {
      const tutor = await Tutor.find().select("-__v").populate("userId");
      return tutor;
    },
    chat: async (parent, args) => {
      // should get context.user and check this chat id
      // is present in their chats
      console.log(args);
      const chat = await Chat.findOne({ _id: args.id }).populate(
        "tutor student messages"
      );
      chat.messages = chat.messages.reverse();
      return chat;
    },
  },

  Mutation: {
    addStudent: async (parent, args) => {
      const user = await User.create({ ...args, role: "student" });
      const token = signToken(user);
      const student = await Student.create({ ...args, userId: user._id });

      return { token, student };
    },
    addTutor: async (parent, args) => {
      const user = await User.create({ ...args, role: "tutor" });
      const token = signToken(user);
      const tutor = await Tutor.create({ ...args, userId: user._id });

      return { token, tutor };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
        // const user = await User.find({ id: context.user._id });
        // user.password = args.password;
        // user.save();
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    createChat: async (parent, { tutor }, context) => {
      if (context.user) {
        let chat = await Chat.findOne({
          tutor,
          student: context.user._id,
        }).populate("tutor student");
        if (!chat) {
          chat = await Chat.create({
            tutor,
            student: context.user._id,
          });
          await User.updateOne(
            { _id: context.user._id },
            { $push: { chats: chat } }
          );
          await User.updateOne({ _id: tutor }, { $push: { chats: chat } });
        }
        return chat;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addMessage: async (parent, { chatId, messageText }, context) => {
      if (context.user) {
        let chat = await Chat.findOne({
          _id: chatId,
        });
        let from = context.user._id;
        let to =
          chat.tutor._id === context.user._id
            ? chat.student._id
            : chat.tutor._id;
        let message = await Message.create({
          from: from,
          to: to,
          messageText,
        });
        message = await message.populate("from to");
        console.log(message);
        chat.messages.push(message);
        chat.save();
        return message;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    singleUpload: async (parent, { file }) => {
      if (context.user) {
        const { createReadStream, filename, mimetype, encoding } = await file;

        const stream = createReadStream();
        try {
          const uniqueFilename = context.user.id + "-" + new Date().getTime();
          console.log("image upload");
          // upload to s3
          const compressed = await sharp(stream)
            .resize({ width: 400, withoutEnlargement: true })
            .webp()
            .withMetadata()
            .toBuffer();
          aws.uploadFile(uniqueFilename + ".webp", compressed);
          // create the DB entry associated with job id
          const user = await User.findByIdAndUpdate(
            {
              _id: context.user._id,
            },
            {
              photo:
                "https://ucbstore.s3.us-west-1.amazonaws.com/" +
                encodeURIComponent(uniqueFilename + ".webp"),
            },
            { new: true }
          );
          return user;
        } catch (err) {
          console.log(err);
        }

        return {};
      }
      throw new AuthenticationError("You must be signed in");
    },
  },
};

module.exports = resolvers;
