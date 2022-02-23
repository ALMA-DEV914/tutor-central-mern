const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const message = require("Message");
const { default: mongoose } = require("mongoose");

const chatSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    tutor: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    student: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      required: true,
    },
    messages: [message],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Chat = model("Post", chatSchema);

module.exports = Chat;
