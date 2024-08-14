// utils/createAdminUser.js
const User = require("../Model/userModel"); // Assuming you have a User model
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  try {
    const adminUser = await User.findOne({ role: "admin" });
    if (adminUser) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const newAdmin = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin user created successfully");
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

module.exports = createAdmin;
