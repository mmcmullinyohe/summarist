import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ChoosePlan() {
  const navigate = useNavigate();
  const { user, setUser, openAuthModal } = useAuth();

  function choosePlan(subscription) {
    if (!user) {
      openAuthModal();
      return;
    }

    setUser({
      ...user,
      subscription,
    });

    navigate("/settings");
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <h1>Choose your plan</h1>

        <section style={{ marginTop: "32px" }}>
          <h2>Premium Plus</h2>
          <p>Access every book summary in text and audio.</p>
          <p>$99.99 per year</p>

          <button
            className="btn"
            onClick={() => choosePlan("premium-plus")}
          >
            Choose yearly plan
          </button>
        </section>

        <section style={{ marginTop: "32px" }}>
          <h2>Premium</h2>
          <p>Access every book summary in text and audio.</p>
          <p>$9.99 per month</p>

          <button
            className="btn"
            onClick={() => choosePlan("premium")}
          >
            Choose monthly plan
          </button>
        </section>
      </main>
    </>
  );
}

export default ChoosePlan;