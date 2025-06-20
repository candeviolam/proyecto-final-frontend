import { Navigate } from "react-router-dom";

export default function RutaProtegidaAdmin({ children }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token || rol !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
