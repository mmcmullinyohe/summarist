import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, openAuthModal, logout } = useAuth();

  return (
    <aside className="sidebar">
      <Link to="/for-you">For You</Link>

      <Link to="/library">Library</Link>

      <button className="sidebar-disabled" disabled>
        Highlights
      </button>

      <button className="sidebar-disabled" disabled>
        Search
      </button>

      <Link to="/settings">Settings</Link>

      <button className="sidebar-disabled" disabled>
        Help & Support
      </button>

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={openAuthModal}>Login</button>
      )}
    </aside>
  );
}

export default Sidebar;