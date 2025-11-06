import React from "react";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to My Homepage </h1>
        <p>This is the first page of my React app.</p>
      </div>
    </>
  );
}

export default Home;
