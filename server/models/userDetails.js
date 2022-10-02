const mongoose = require("mongoose");
//  here is the schema
const userSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
  },

  description: {
    type: String,
  },

  dueDate: {
    type: String,
  },
});

const UserDetails = mongoose.model("UserDetails", userSchema);

module.exports = UserDetails;
