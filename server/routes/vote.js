const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Rating = require("../models/Vote");

router.get("/", (req, res) => {
  Rating.find().then(ratings => res.json(ratings));
});

router.post("/", (req, res) => {
  const newRating = new Vote({
    totalRatings: req.body.newRating,
    userName: req.body.userName
  });
  newRating.save().then(ratings => res.json(ratings));
});

module.exports = router;

