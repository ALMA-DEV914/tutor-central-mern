const { User, Post, Category, Student, Tutor } = require("../models");
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
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts");
        if (userData.role === "tutor") {
          const tutorData = await Tutor.findOne({ _id: context.user._id });
          return { userData, tutorData };
        }
        if (userData.role === "student") {
          const studentData = await Student.findOne({ _id: context.user._id });
          return { userData, studentData };
        }

        // return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },

    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },

    // get all users
    users: async () => {
      return User.find().select("-__v -password").populate("posts");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("posts");
    },
    // tutor: async (parent, { username }) => {
    //   const user = await User.findOne({ username }).select("-__v -password");
    //   // const tutor = await Tutor.findOne({ username });
    //   return { user };
    // },
    // student: async (parent, { username }) => {
    //   return User.findOne({ username }).select("-__v -password");
    // },
    categories: async () => {
      return await Category.find();
    },
    tutors: async (parent, { role = "tutor" }) => {
      return User.find({ role }).select("-__v -password").populate("posts");
    },
  },

  Mutation: {
    // addUser: async (parent, args) => {
    //   const user = await User.create(args);
    //   const token = signToken(user);

    //   return { token, user };
    // },
    // addStudent: async (parent, args, content) => {
    //   if (content.user.role === "student") {
    //     const student = await Student.create(args);

    //     return student;
    //   }
    // },
    // addTutor: async (parent, args, content) => {
    //   if (content.user.role === "tutor") {
    //     const tutor = await Tutor.create(args);

    //     return tutor;
    //   }
    // },
    addStudent: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      const student = await Student.create(args);

      return { token, user, student };
    },
    addTutor: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      const tutor = await Tutor.create(args);

      return { token, user, tutor };
    },
    // addUser: async (parent, args) => {
    //   const user = await User.create(args);
    //   const token = signToken(user);
    //   if (user.role === "student") {
    //       addStudent: async(parent,args)=>{
    //     const student = Student.create(args);
    //     return { token, student };}
    //   } else if (user.role === "tutor") {
    //     const tutor = Tutor.create(args);
    //     return { token, tutor };
    //   }
    //   //   return { token, user };
    // },

    addCategory: async (parent, args) => {
      const category = await Category.create(args);

      return category;
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

    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              posts: { commentText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updatePost: async (parent, args, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(Post._id, args, {
          new: true,
          runValidators: true,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: updatedPost._id } },
          { new: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateComment: async (parent, args, context) => {
      if (context.user) {
        const updatedComment = await Comment.findByIdAndUpdate(
          Comment._id,
          args,
          {
            new: true,
            runValidators: true,
          }
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: updatedComment._id } },
          { new: true }
        );

        return updatedComment;
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
