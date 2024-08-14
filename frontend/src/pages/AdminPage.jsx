import { useEffect, useState } from "react";
import { getUsers, editUserRole } from "../features/user/userService";
import UserRow from "../components/UserRow"; // Import the new UserRow component
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function getAllUsers() {
      const allusers = await getUsers();
      setUsers(allusers);
    }
    getAllUsers();
  }, []);

  const handleRoleChange = async (user, role) => {
    await editUserRole(user, role);
    const updatedUsers = users.map(
      (use) => (use._id === user._id ? { ...use, role: role } : use) // Fix the role assignment
    );
    setUsers(updatedUsers);
  };

  const handleViewChats = (user) => {
    navigate(`/admin/chats/${user._id}`); // Call navigate within the handler
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onRoleChange={handleRoleChange}
                onViewChats={handleViewChats}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
