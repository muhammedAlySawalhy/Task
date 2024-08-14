const express = require("express");
const {
  getMessages,
  createMessage,
} = require("../Controllers/messageController");
const protect = require("../middlewares/authMIddleware");
const router = express.Router();

router.get("/", protect, getMessages);
router.post("/create", protect, createMessage);
module.exports = router;
