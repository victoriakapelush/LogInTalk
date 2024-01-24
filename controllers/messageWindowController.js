const Message = require('../models/message');
const User = require('../models/user');

const messageWindowController = async (req, res, next) => {
  try {
    const messages = await Message.find().populate().exec();
    const users = await User.find().exec();
    res.render('messageWindow', { title: "Let's Talk", messages, users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const postMessage = async (req, res, next) => {
  const userId = req.body.userId; 
  const newMessage = new Message({
    user: userId,
    message: req.body.message
  });

  try {
    await newMessage.save();
    res.redirect('/messageWindow');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { messageWindowController, postMessage };

