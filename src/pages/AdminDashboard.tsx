import { useEffect, useState } from "react";
import { apiService } from "../hooks/apiService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await apiService.get("/api/v1/users");
        setUsers(users);
        console.log(users);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center">Admin Dashboard</h1>
      {users.length > 0 ? (
        <>
          <div className="user-list w-full overflow-x-auto my-10">
            <table className="border w-[80%] mx-auto p-10">
              <thead className="bg-gray-200">
                <tr>
                  <th>S.No</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <DtRow user={user} key={user._id} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-3xl text-center">No User Record Found!</h1>
      )}
    </div>
  );
};

export default AdminDashboard;

const DtRow = ({ user, index }) => {
  return (
    <>
      <tr className="mt-1 border">
        <td>{index + 1}</td>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-lg">Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg">Delete</button>
        </td>
      </tr>
    </>
  );
};
