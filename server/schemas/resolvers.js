const { User, Student, Tutor, Chat, Message } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const aws = require("../utils/aws-fileupload");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // console.log(context.user);
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v")
          .populate("chats");
        for (let i = 0; i < userData.chats.length; i++) {
          await userData.chats[i].populate("student tutor");
        }
        console.log(userData);

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
        // console.log(userData);
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
    tutor: async (parent, { id }, context) => {
      console.log(id);
      const tutor = await Tutor.findOne({ userId: id })
        .select("-__V")
        .populate("userId");
      console.log(tutor);
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
      console.log(chat);
      return chat;
    },
  },

  Mutation: {
    signedLink: async (parent, { filename }) => {
      return aws.getS3UploadLink(filename);
    },
    addStudent: async (parent, args) => {
      console.log({ ...args, role: "student" });
      const user = await User.create({ ...args, role: "student" });
      const student = await Student.create({ ...args, userId: user._id });
      const token = signToken(user, student._id);

      return { token, student };
    },
    addTutor: async (parent, args) => {
      const user = await User.create({ ...args, role: "tutor" });
      const tutor = await Tutor.create({ ...args, userId: user._id });
      const token = signToken(user, tutor._id);

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
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          args,
          { new: true }
        );
        console.log(args);
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateTutor: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          args,
          { new: true }
        );
        const tutor = await Tutor.findOneAndUpdate(
          { userId: context.user._id },
          args,
          { new: true }
        );
        console.log(user);
        console.log(tutor);
        return { user, tutor };
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
          chat.tutor._id.toString() === context.user._id
            ? chat.student._id
            : chat.tutor._id;
        let message = await Message.create({
          from: from,
          to: to,
          messageText,
        });
        message = await message.populate("from to");
        chat.messages.push(message);
        chat.save();
        return message;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
