import { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/users")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      fetchUsers(); // refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading users...</p>;
  if (error) return <p style={{ color: "red", padding: "20px" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageUsers;
