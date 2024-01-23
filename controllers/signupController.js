const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signupController = (req, res, next) => {
    res.render('signup', { title: "Sign Up" });
  };

const authenticatedUser = async (req, res, next) => {
    try {
      const password = req.body.password;
      
      // Check if password is a string and has a valid length
      if (typeof password !== 'string') {
        return res.status(400).json({ message: "Invalid password format" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      });
  
      const result = await user.save();
      res.redirect("/messageWindow");
  
      // Now, when comparing passwords:
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        // Passwords do not match!
        return res.status(401).json({ message: "Incorrect password" });
      }
  
      // Passwords match, proceed with your logic
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports = { signupController, authenticatedUser };