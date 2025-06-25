import React, { useState } from "react";

const Article = ({ title, preview, fullText }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div style={{ marginBottom: "24px" }}>
      <h3>{title}</h3>
      <p>{preview} <button onClick={() => setShowPopup(true)} style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}>Read More</button></p>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "24px",
            boxShadow: "0px 4px 16px rgba(0,0,0,0.25)",
            zIndex: 1000,
          }}
        >
          <h3>{title}</h3>
          <p>{fullText}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Article;