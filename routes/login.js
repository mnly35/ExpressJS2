const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
//const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv/config");

router.post("/", async (req, res) => {
  console.log("Post User API is called...");
  //1. Generate Salt - async
  const salt = await bcrypt.genSalt();

  //2. Hash password -async
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //create userModel from request
  const user = userModel({
    username: req.body.username,
    password: hashPassword,
  });
  try {
    const save = await user.save();
    res.send(save);
  } catch (error) {
    res.send(error);
  }
});
router.post("/login", async (req, res) => {
  console.log("Login User API is called...");
  try {
    //Get User From Database
    const user = await userModel.findOne({ username: req.body.username });
    // If user not found -return error
    if (!user) {
      return res.status(400).json({ error: "Invalid Username" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: "Invalid Password" });
    }
    //define payload
    const payload = {
      username: user.username,
    };
    console.log(process.env.SECRETKEY);
    //Create JWT Token
    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: 360000 },
      (err, token) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            error: "Error while login,Please try later",
          });
        console.log(token);
        res.json({ token: token });
      }
    );
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
