import { useEffect, useState } from "react";
import API from "../api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    API.get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const makeAdmin = async (id) => {
    try {
      await API.put(`/users/make-admin/${id}`);

      alert("User promoted to admin");

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const removeAdmin = async (id) => {
    if (!window.confirm("Remove admin privileges?")) {
      return;
    }

    try {
      await API.put(`/users/remove-admin/${id}`);

      alert("Admin removed successfully");

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await API.delete(`/users/delete/${id}`);

      alert("User deleted");

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="admin-page-header">
  <h1>Users Management</h1>
  <p>
    <strong>{users.length}</strong> registered travellers in the system
  </p>
</div>

      {/* Total Users Card */}
      

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={
                      user.role === "admin"
                        ? "role-admin"
                        : "role-user"
                    }
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

                <td>
                  {user.role !== "admin" ? (
                    <button
                      className="action-btn edit-btn"
                      onClick={() => makeAdmin(user.id)}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      className="action-btn warning-btn"
                      onClick={() => removeAdmin(user.id)}
                    >
                      Remove Admin
                    </button>
                  )}

                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;