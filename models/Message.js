const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  time: { type: String, default: Date.now },
  message: { type: String }
});

MessageSchema.virtual("formattedTime").get(function () {
    return DateTime.fromISO(this.time).toRelative();
  });

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;