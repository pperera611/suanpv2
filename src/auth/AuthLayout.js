// AuthLayout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthLayout = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  

  return <>{user && children}</>;
};

export default AuthLayout;