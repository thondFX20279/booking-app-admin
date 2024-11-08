import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user?.isAdmin ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
