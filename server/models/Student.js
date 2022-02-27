const { Schema, model } = require("mongoose");
const User = require("./User");
const { default: mongoose } = require("mongoose");

const studentSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: User, required: true },
    paymentInfo: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 250,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;
