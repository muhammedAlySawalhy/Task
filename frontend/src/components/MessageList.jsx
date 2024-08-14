import React from "react";

const MessageList = ({ messages, userDetails }) => {
  return (
    <>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className="mb-4">
            <div className="text-sm text-gray-500">
              From: {userDetails[message.sender]?.name || message.sender} To:{" "}
              {userDetails[message.recipient]?.name || message.recipient}
            </div>
            <div className="text-md">{message.text}</div>
            <div className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))
      ) : (
        <div>No messages found.</div>
      )}
    </>
  );
};

export default MessageList;
