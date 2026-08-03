import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    setUser,
  } = useAuth();

  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isAuthModalOpen) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError(
        mode === "register"
          ? "Password must be at least 6 characters"
          : "User not found"
      );
      return;
    }

    setUser({
      email,
      subscription: "basic",
    });

    closeAuthModal();
    navigate("/for-you");
  }

  function handleGuestLogin() {
    setUser({
      email: "guest@gmail.com",
      subscription: "basic",
    });

    closeAuthModal();
    navigate("/for-you");
  }

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div
        className="auth-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="auth-modal-close"
          onClick={closeAuthModal}
          aria-label="Close"
        >
          ×
        </button>

        <h2>{mode === "login" ? "Log in" : "Create an account"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="btn" type="submit">
            {mode === "login" ? "Log in" : "Register"}
          </button>
        </form>

        <button
          className="auth-guest-button"
          onClick={handleGuestLogin}
        >
          Continue as guest
        </button>

        <button
          className="auth-switch-button"
          onClick={() =>
            setMode((currentMode) =>
              currentMode === "login" ? "register" : "login"
            )
          }
        >
          {mode === "login"
            ? "Create an account"
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}

export default AuthModal;