const passport = require('passport');

const loginController = (req, res, next) => {
    res.render('login', { title: "Log In" });
  };

  const authenticateLogin = passport.authenticate('local', {
    successRedirect: '/messageWindow',
    failureRedirect: '/',
    failureFlash: true
  });

  const handleInvalidLogin = (req, res, next) => {
    req.flash('error', 'Invalid username or password');
    res.redirect('/');
  };
  
  module.exports = { loginController, authenticateLogin, handleInvalidLogin };