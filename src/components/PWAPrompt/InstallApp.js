import React, { useState, useEffect } from "react";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("✅ Install Prompt detected!"); // Debug log
      event.preventDefault(); 
      setDeferredPrompt(event);
      setShowButton(true);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("🎉 User installed the app!");
        } else {
          console.log("❌ User dismissed the install prompt.");
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  if (!showButton) return null;

  return (
    <button onClick={handleInstallClick} style={buttonStyle}>
      📥 Install App
    </button>
  );
};

// Button Styles
const buttonStyle = {
  position: "fixed",
  top: "10px",
  right: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "16px",
};

export default InstallApp;
