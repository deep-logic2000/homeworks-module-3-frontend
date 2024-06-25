import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../components/AuthProvider/AuthProvider";

const PrivateRoute = () => {
  // const { isAuthenticated } = useAuth();

  // return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
  return <Outlet />;
};

export default PrivateRoute;
