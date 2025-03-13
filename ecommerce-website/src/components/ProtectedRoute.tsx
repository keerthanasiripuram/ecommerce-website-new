import React, { JSX } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

type protectedRouteState = {
  role: string;
  children: React.ReactNode;
};

const ProtectedRoute = (props: protectedRouteState): JSX.Element => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode<{ role: string }>(token);

  if (token && props.role == decodedToken.role) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default React.memo(ProtectedRoute);
