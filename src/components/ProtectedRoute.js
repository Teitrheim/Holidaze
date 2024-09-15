import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isVenueManager }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isVenueManager && !user.venueManager) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
