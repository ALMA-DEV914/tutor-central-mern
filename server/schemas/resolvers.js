const { User, Post, Category } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // thoughts: async () => {
    //   return Thought.find().sort({ createdAt: -1 });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts");

        return userData;
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
    categories: async () => {
      return await Category.find();
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

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
  },
};

module.exports = resolvers;
