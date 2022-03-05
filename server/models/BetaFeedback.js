const { Schema, model } = require("mongoose");

//model definition
const betaFeedbackSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        archived: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: {} },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const BetaFeedbackSchema = model("betaFeedback", betaFeedbackSchema);

module.exports = BetaFeedbackSchema;
