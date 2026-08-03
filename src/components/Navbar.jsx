import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const { user, openAuthModal, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src={logo}
          alt="Summarist"
          className="navbar-logo"
        />
      </Link>

      <div className="navbar-links">
        <Link to="/for-you">For You</Link>

        <Link to="/choose-plan">Choose Plan</Link>

        <Link to="/settings">Settings</Link>

        {user ? (
          <button
            className="navbar-button"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="navbar-button"
            onClick={openAuthModal}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;