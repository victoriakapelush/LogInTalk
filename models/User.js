const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: { type: String, ref: 'Message'},
  password: { type: String },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;