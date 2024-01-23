const express = require("express");
const router = express.Router();
const { messageWindowController } = require('../controllers/messageWindowController');

router.get("/", messageWindowController);

module.exports = router;
