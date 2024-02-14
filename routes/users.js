const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/instaclone");

// this will fetch the data from the login page where the user will input the data
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

// serializeUser() deserializeUser() value have been called through this
userSchema.plugin(plm);

// we have exported the userSchema through this line which we have created above
module.exports = mongoose.model("user", userSchema);
