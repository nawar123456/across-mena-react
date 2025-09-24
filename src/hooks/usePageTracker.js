// src/hooks/usePageTracker.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const visitData = JSON.parse(localStorage.getItem("page_visits") || "{}");

    visitData[path] = (visitData[path] || 0) + 1;

    localStorage.setItem("page_visits", JSON.stringify(visitData));
  }, [location]);
};

export default usePageTracker;
