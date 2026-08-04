import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Settings() {
  const { user, logout, openAuthModal } = useAuth();

  if (!user) {
    return (
      <>
        <Navbar />

        <main style={{ maxWidth: "700px", margin: "40px auto" }}>
          <h1>Settings</h1>

          <p>You are not logged in.</p>

          <button
            className="btn"
            onClick={openAuthModal}
          >
            Login
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <SearchBar />

      <main style={{ maxWidth: "700px", margin: "40px auto" }}>
        <h1>Settings</h1>

        <h2>Email</h2>
        <p>{user.email}</p>

        <h2>Subscription</h2>
        <p>{user.subscription}</p>

        {user.subscription === "basic" && (
          <Link to="/choose-plan">
            <button className="btn">
              Upgrade Plan
            </button>
          </Link>
        )}

        <br />
        <br />

        <button
          className="btn"
          onClick={logout}
        >
          Logout
        </button>
      </main>
    </>
  );
}

export default Settings;