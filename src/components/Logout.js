import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase.js";
import { signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    signOutUser();
  }, [navigate]);

  return <div>Cerrando sesión...</div>;
};

export default Logout;