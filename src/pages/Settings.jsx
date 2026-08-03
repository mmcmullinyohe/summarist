import Navbar from "../components/Navbar";

function Settings() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "40px" }}>
        <h1>Settings</h1>

        <h2>Email</h2>
        <p>guest@gmail.com</p>

        <h2>Subscription</h2>
        <p>Premium</p>

        <button className="btn">Log Out</button>
      </main>
    </>
  );
}

export default Settings;