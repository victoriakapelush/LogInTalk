const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now },
  message: { type: String }
});

MessageSchema.virtual("formattedTime").get(function () {
  const now = DateTime.now();
  const messageTime = DateTime.fromJSDate(this.time);

  const diff = now.diff(messageTime, ["years", "months", "days", "hours", "minutes"]).toObject();

  if (diff.years > 0) {
    return `${Math.round(diff.years)} ${diff.years === 1 ? "year ago" : "years ago"}`;
  } else if (diff.months > 0) {
    return `${Math.round(diff.months)} ${diff.months === 1 ? "month ago" : "months ago"}`;
  } else if (diff.days > 0) {
    return `${Math.round(diff.days)} ${diff.days === 1 ? "day ago" : "days ago"}`;
  } else if (diff.hours > 0) {
    return `${Math.round(diff.hours)} ${diff.hours === 1 ? "hour ago" : "hours ago"}`;
  } else if (diff.minutes > 0) {
    return `${Math.round(diff.minutes)} ${diff.minutes === 1 ? "minute ago" : "minutes ago"}`;
  } else {
    return "Just now";
  }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;