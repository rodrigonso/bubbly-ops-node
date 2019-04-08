const express = require('express');
const { User } = require('../models/user-model');
const router = express.Router();

router.get('/', async(req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async(req, res) => {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return res.status(200).send(existingUser);

    const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    await newUser.save();
    res.status(200).send(newUser);
})

module.exports = router;