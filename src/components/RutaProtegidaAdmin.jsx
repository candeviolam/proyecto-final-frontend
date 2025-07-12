import { Navigate } from "react-router-dom";

export default function RutaProtegidaAdmin({ children }) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const datosToken = JSON.parse(atob(token.split(".")[1]));
  const rol = datosToken.rol;

  if (rol !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
