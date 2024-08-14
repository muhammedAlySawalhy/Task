import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getMessages } from "../features/chat/chatSlice";
import { getUserById } from "../features/user/userService";
import MessageList from "../components/MessageList";

const AdminChatView = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state) => state.chat);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    const fetchUserDetails = async (id) => {
      const user = await getUserById(id);
      setUserDetails((prev) => ({ ...prev, [id]: user }));
    };

    messages.forEach((message) => {
      if (!userDetails[message.sender]) {
        fetchUserDetails(message.sender);
      }
      if (!userDetails[message.recipient]) {
        fetchUserDetails(message.recipient);
      }
    });
  }, [messages, userDetails]);

  const userMessages = messages.filter(
    (message) => message.sender === userId || message.recipient === userId
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chat Messages</h1>
      <div className="bg-white p-4 shadow rounded">
        <MessageList messages={userMessages} userDetails={userDetails} />
      </div>
    </div>
  );
};




export default AdminChatView;