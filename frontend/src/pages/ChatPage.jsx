import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  getMessages,
  createMessage,
  reset,
  addMessage,
} from "../features/chat/chatSlice";
import Button from "../components/Button";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getDoctors, getUsers } from "../features/user/userService";
import InputGroup from "../components/InputGroup";
import { extractUserData } from "../features/auth/authService";

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const { messages, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.chat
  );

  const u = JSON.parse(localStorage.getItem("user"));
  const user = extractUserData(u);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role === "doctor") {
        getUsers().then((users) => {
          setRecipients(users);
        });
      } else {
        getDoctors().then((doctors) => {
          setRecipients(doctors);
        });
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getMessages());

    socket.on("chatMessage", (msg1) => {
      dispatch(addMessage(msg1));
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Message sent successfully");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedRecipient) {
      const messageData = {
        sender: user._id,
        recipient: selectedRecipient,
        text: newMessage,
      };

      // Optimistically update the UI
      dispatch(addMessage(messageData));

      dispatch(createMessage(messageData));

      socket.emit("chatMessage", messageData);

      setNewMessage("");
      dispatch(reset());
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 rounded-lg shadow-md">
      <RecipientSelector
        recipients={recipients}
        selectedRecipient={selectedRecipient}
        setSelectedRecipient={setSelectedRecipient}
        userRole={user.role}
      />
      <MessageList
        messages={messages}
        user={user}
        selectedRecipient={selectedRecipient}
      />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const RecipientSelector = ({
  recipients,
  selectedRecipient,
  setSelectedRecipient,
  userRole,
}) => (
  <div className="mb-4">
    <select
      className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 w-full"
      value={selectedRecipient}
      onChange={(e) => setSelectedRecipient(e.target.value)}
    >
      <option value="">
        Select {userRole === "doctor" ? "User" : "Doctor"}
      </option>
      {recipients.length > 0 &&
        recipients.map((recipient) => (
          <option key={recipient._id} value={recipient._id}>
            {recipient.name}
          </option>
        ))}
    </select>
  </div>
);

const MessageList = ({ messages, user, selectedRecipient }) => (
  <div className="flex-grow overflow-y-auto mb-4">
    {messages.length > 0 &&
      messages
        .filter(
          (msg) =>
            (msg.sender === user._id && msg.recipient === selectedRecipient) ||
            (msg.sender === selectedRecipient && msg.recipient === user._id)
        )
        .map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${
              msg.sender === user._id
                ? "bg-blue-200 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
  </div>
);

const MessageInput = ({ newMessage, setNewMessage, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="flex items-center">
    <InputGroup
      type="text"
      placeholder="Type a message..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      className="flex-grow mr-2"
    />
    <Button type="submit">Send</Button>
  </form>
);

export default ChatPage;
