const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const MessageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  time: { type: String, required: true, default: DateTime.local().toISO() },
  text: { type: String, required: true }
});

MessageSchema.virtual("formattedTime").get(function () {
    return DateTime.fromISO(this.time).toRelative();
  });

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;