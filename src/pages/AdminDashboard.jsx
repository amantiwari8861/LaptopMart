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
          <div className="user-list w-80 overflow-x-auto">
            <table className="border">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <DtRow user={user} key={user._id} />
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

const DtRow = ({ user }) => {
  return (
    <>
      <tr>
        <td>{user.name}</td>
      </tr>
    </>
  );
};
