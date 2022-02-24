const { Schema, model } = require("mongoose");
const { default: mongoose } = require("mongoose");

const studentSchema = new Schema(
  {
    studentId: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
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
