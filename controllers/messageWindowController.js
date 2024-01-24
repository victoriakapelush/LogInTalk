const Message = require('../models/message');
const User = require('../models/user');

const messageWindowController = async (req, res, next) => {
  try {
    const [currentUser, messages] = await Promise.all([
      User.findById(req.body._id),
      Message.find().populate('user').sort(),
    ]);
    res.render('messageWindow', { messages, currentUser });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const postMessage = async (req, res, next) => {
  const currentUser = await User.findById(req.body._id);
    const newMessage = new Message({
      user: currentUser,
      message: req.body.message,
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

