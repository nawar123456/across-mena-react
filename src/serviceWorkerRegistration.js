export function register() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js", { type: "module" }) // Ensure correct path
          .then((registration) => {
            console.log("✅ Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("❌ Service Worker registration failed:", error);
          });
      });
    }
  }
  