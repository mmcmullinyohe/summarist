import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ChoosePlan() {
  const { user, openAuthModal } = useAuth();

  const [loadingPlan, setLoadingPlan] = useState("");
  const [error, setError] = useState("");

  async function choosePlan(plan) {
    if (!user) {
      openAuthModal();
      return;
    }

    try {
      setError("");
      setLoadingPlan(plan);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      if (!data.url) {
        throw new Error("Stripe Checkout URL was not returned.");
      }

      window.location.assign(data.url);
    } catch (error) {
      console.error("Checkout error:", error);
      setError(error.message || "Unable to start checkout.");
      setLoadingPlan("");
    }
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

        {error && (
          <p
            style={{
              color: "#c62828",
              marginTop: "20px",
            }}
          >
            {error}
          </p>
        )}

        <section style={{ marginTop: "32px" }}>
          <h2>Premium Plus</h2>

          <p>Access every book summary in text and audio.</p>
          <p>Seven-day free trial, then $79.99 per year.</p>

          <button
            className="btn"
            type="button"
            disabled={Boolean(loadingPlan)}
            onClick={() => choosePlan("yearly")}
          >
            {loadingPlan === "yearly"
              ? "Opening checkout..."
              : "Start yearly plan"}
          </button>
        </section>

        <section style={{ marginTop: "32px" }}>
          <h2>Premium</h2>

          <p>Access every book summary in text and audio.</p>
          <p>$9.99 per month.</p>

          <button
            className="btn"
            type="button"
            disabled={Boolean(loadingPlan)}
            onClick={() => choosePlan("monthly")}
          >
            {loadingPlan === "monthly"
              ? "Opening checkout..."
              : "Choose monthly plan"}
          </button>
        </section>
      </main>
    </>
  );
}

export default ChoosePlan;