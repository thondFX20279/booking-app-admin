import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);
  return user?.isAdmin ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default PublicRoute;
