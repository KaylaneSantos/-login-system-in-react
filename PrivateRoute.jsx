import React from "react";
import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoute = () => {
  let auth = false;
  const getItemStorage = localStorage.getItem("token");
  if (getItemStorage) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
