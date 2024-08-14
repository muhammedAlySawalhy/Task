const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please add an email"],
    },
    password: {
      type: String,
      min: 8,
      max: 30,
      required: [true, "please add a password"],
    },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
