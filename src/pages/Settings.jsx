import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Settings() {
  const { user, logout, openAuthModal } = useAuth();

  if (!user) {
    return (
      <>
        <Navbar />
        <SearchBar />
        <div className="app-layout">
          <Sidebar />

          <main
            style={{
              width: "100%",
              maxWidth: "700px",
              margin: "40px auto",
              padding: "0 24px",
            }}
          >
            <h1>Settings</h1>

            <p>You are not logged in.</p>

            <button className="btn" onClick={openAuthModal}>
              Login
            </button>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="app-layout">
        <Sidebar />

        <main
          style={{
            width: "100%",
            maxWidth: "700px",
            margin: "40px auto",
            padding: "0 24px",
          }}
        >
          <h1>Settings</h1>

          <h2>Email</h2>
          <p>{user.email}</p>

          <h2>Subscription</h2>
          <p>{user.subscription}</p>

          {user.subscription === "basic" && (
            <Link to="/choose-plan">
              <button className="btn">Upgrade Plan</button>
            </Link>
          )}

          <br />
          <br />

          <button className="btn" onClick={logout}>
            Logout
          </button>
        </main>
      </div>
    </>
  );
}

export default Settings;
