import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  let location = useLocation();
  if (isLoading) {
    return <div className="h-screen">loading....</div>;
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/sign-in" state={{ from: location }} />;
};

export default PrivateRoute;
