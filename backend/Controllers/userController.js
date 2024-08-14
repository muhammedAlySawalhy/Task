const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const exists = await User.findOne({ email });

  if (exists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: "user",
  });

  if (user) {
    const { name, email, password } = user;
    res.status(201).json({
      name: name,
      email: email,
      password: password,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("user data is invalid");
  }
});
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ ...user, token: generateToken(user.id) });
  } else {
    res.status(400);
    throw new Error("user data is invalid");
  }
});

const getMe = (req, res) => {
  res.status(200).json(req.user);
};

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: "doctor" });

  res.status(200).json(doctors);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json(user);
});
const editUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const { role } = req.body;
    user.role = role;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  }
});
module.exports = {
  registerUser,
  LoginUser,
  getMe,
  getUsers,
  getDoctors,
  editUserRole,
  getUser,
};
