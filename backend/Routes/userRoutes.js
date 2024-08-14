const express = require("express");
const {
  registerUser,

  LoginUser,
  getMe,
  getDoctors,
  getUsers,
  editUserRole,
  getUser,
} = require("../Controllers/userController");
const protect = require("../middlewares/authMIddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

const router = express.Router();

router.post("/", registerUser);

router.post("/login", LoginUser);

router.get("/me", protect, getMe);
router.get("/get/doctors", protect, getDoctors);
router.get("/get/user/:id", protect, getUser);
// Fetch all users
router.get("/get/users", protect, getUsers);
router.put("/edit/user/:id", isAdmin, editUserRole);
module.exports = router;
