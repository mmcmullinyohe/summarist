import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Summarist" className="navbar-logo" />
      </Link>

      <div className="navbar-links">
        <Link to="/for-you">For You</Link>
        <Link to="/choose-plan">Choose Plan</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  );
}

export default Navbar;