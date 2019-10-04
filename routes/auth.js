const express = require("express");
const { User, validateUser } = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route   POST api/auth
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  const { name, email, username, password } = req.body;

  // check for existing user
  const existingUser = await User.findOne({ username: req.body.username });
  if (!existingUser) return res.status(404).send("User not found");

  // validate user password
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
  console.log(existingUser);
  jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      isAdmin: existingUser.isAdmin,
      name: existingUser.name,
      email: existingUser.email,
      employeeId: existingUser.employeeId
    },
    config.get("jwtSecret"),
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          username: existingUser.username,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
          employeeId: existingUser.employeeId
        }
      });
    }
  );
});

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;

  // validate user
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  // check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(402).send({ msg: "User already exists" });

  // create new user
  const newUser = await new User({
    name,
    email,
    username,
    password
  });

  // create salt & hash password
  const salt = await bcrypt.genSalt(10);
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    newUser.save();

    jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        isAdmin: newUser.isAdmin,
        name: newUser.name,
        email: newUser.email
      },
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        console.log(err, token);
        if (err) throw err;
        return res.status(200).send({
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email
          }
        });
      }
    );
  });
});

module.exports = router;
