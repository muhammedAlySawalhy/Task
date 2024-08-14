import React from "react";
import Button from "../components/Button";

const UserRow = ({ user, onRoleChange, onViewChats }) => {
  return (
    <tr key={user._id} className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b">{user.name}</td>
      <td className="py-2 px-4 border-b">{user.email}</td>
      <td className="py-2 px-4 border-b">{user.role}</td>
      <td className="py-2 px-4 border-b flex space-x-2">
        {user.role !== "doctor" ? (
          <Button
            onClick={() => onRoleChange(user, "doctor")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Make Doctor
          </Button>
        ) : (
          <Button
            onClick={() => onRoleChange(user, "user")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Make User
          </Button>
        )}
        <Button
          onClick={() => onViewChats(user)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Chats
        </Button>
      </td>
    </tr>
  );
};

export default UserRow;
