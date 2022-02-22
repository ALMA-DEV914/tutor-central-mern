const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
