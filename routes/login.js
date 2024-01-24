const express = require("express");
const router = express.Router();
const { loginController, authenticateLogin, handleInvalidLogin } = require('../controllers/loginController');

router.get("/", loginController);

router.post("/", authenticateLogin, handleInvalidLogin);

module.exports = router;
