import axios from "../auth/authaxios";

const API_URL = "api/messages/";

// Function to get the token from local storage or any other storage

const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createMessage = async (data) => {
  const { sender, text, recipient } = data;
  if (!sender || !text || !recipient) {
    throw new Error("please add all fields");
  }
  console.log("hit hit");
  const createdMessage = await axios.post(API_URL + "create/", {
    senderId: sender,
    text,
    recipientId: recipient,
  });
  return createdMessage;
};

const chatService = {
  getMessages,
  createMessage,
};

export default chatService;
