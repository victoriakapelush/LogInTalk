const passport = require('passport');

const loginController = (req, res, next) => {
    res.render('login', { title: "Log In" });
  };

  const authenticateLogin = passport.authenticate('local', {
    successRedirect: '/messageWindow',
    failureRedirect: '/',
    failureFlash: true
  });
  
  module.exports = { loginController, authenticateLogin };