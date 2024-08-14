const asyncHandler = require("express-async-handler");
const Message = require("../Model/messageModel");
const io = require("socket.io")();

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

const createMessage = asyncHandler(async (req, res) => {
  console.log(req.body, "req");
  const { senderId, recipientId, text } = req.body;
  if (!senderId || !text || !recipientId) {
    res.status(400);
    throw new Error("please add all fields");
  }
  const createdMessage = await Message.create({
    sender: senderId,
    recipient: recipientId,
    text,
  });

  io.emit("chatMessage", createdMessage);
  res.status(200).json(createdMessage);
});
module.exports = { getMessages, createMessage };
