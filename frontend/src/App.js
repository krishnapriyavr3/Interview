import { Routes, Route, Link } from "react-router-dom";
import Practice from "./pages/Practice";
import ManageUsers from "./pages/ManageUsers";

function App() {
  return (
    <>
      <nav style={{ padding: "10px", background: "#6b21a8", color: "white" }}>
        <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
        <Link to="/practice" style={{ marginRight: "10px", color: "white" }}>Practice</Link>
        <Link to="/manage-users" style={{ color: "white" }}>Manage Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1 style={{ textAlign: "center", marginTop: "20px" }}>Welcome 🚀</h1>} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </>
  );
}

export default App;
