const express = require("express");
const router = express.Router();
const { messageWindowController, postMessage } = require('../controllers/messageWindowController');

router.get("/", messageWindowController);

router.post('/', postMessage);

module.exports = router;
