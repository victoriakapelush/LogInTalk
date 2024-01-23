const passport = require('passport');

const messageWindowController = (req, res, next) => {
    res.render('messageWindow', { title: "Let's Talk" });
  };
  
module.exports = { messageWindowController };