import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("auth_token"); // check if user is logged in

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the child component
  return children;
}
