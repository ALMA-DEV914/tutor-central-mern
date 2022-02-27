const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const Message = require("./Message");
const User = require("./User");
const { default: mongoose } = require("mongoose");

const chatSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    tutor: { type: mongoose.Types.ObjectId, ref: User, required: true },
    student: { type: mongoose.Types.ObjectId, ref: User, required: true },
    messages: [Message.schema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
