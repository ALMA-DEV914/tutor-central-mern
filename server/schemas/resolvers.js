const { User, Student, Tutor } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { GraphQLUpload } = require("graphql-upload");
const aws = require("../utils/aws-fileupload");
const { signToken } = require("../utils/auth");
const sharp = require("sharp");

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
          "-__v -password"
        );
        console.log(userData);
        if (userData.role === "tutor") {
          const tutorData = await Tutor.findOne({ tutorId: context.user._id });
          return { userData, tutorData };
        }
        if (userData.role === "student") {
          const studentData = await Student.findOne({
            studentId: context.user._id,
          });
          return { userData, studentData };
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
    tutors: async (parent, { role = "tutor" }) => {
      return await User.find({ role }).select("-__v -password");
    },
  },

  Mutation: {
    addStudent: async (parent, args) => {
      const user = await User.create({ ...args, role: "student" });
      const token = signToken(user);
      const student = await Student.create(args);

      return { token, user, student };
    },
    addTutor: async (parent, args) => {
      const user = await User.create({ ...args, role: "tutor" });
      const token = signToken(user);
      const tutor = await Tutor.create(args);

      return { token, user, tutor };
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
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    createChat: async (parent, args, context) => {
      if (context.user) {
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addMessage: async (parent, args, context) => {
      if (context.user) {
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
