const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");
const User = require("./User");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
  {
    messageText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    from: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    to: { type: mongoose.Types.ObjectId, ref: User, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
