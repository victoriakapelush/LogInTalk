const express = require("express");
const router = express.Router();
const { loginController, authenticateLogin } = require('../controllers/loginController');

router.get("/", loginController);

router.post("/", authenticateLogin);

module.exports = router;
