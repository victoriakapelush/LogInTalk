const express = require('express');
const Message = require('../models/message');
const User = require('../models/user');

const messageWindowController = async (req, res, next) => {
  try {
    const [messages] = await Promise.all([
      Message.find().populate('user').sort({ createdAt: -1 }),
    ]);
    res.render('messageWindow', { messages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const postMessage = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    const newMessage = new Message({
      user: currentUser._id,
      message: req.body.message,
    });

    await newMessage.save();
    res.redirect('/messageWindow');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { messageWindowController, postMessage };


