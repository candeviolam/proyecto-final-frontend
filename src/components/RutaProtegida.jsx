import { Navigate } from "react-router-dom";

const RutaProtegida = ({ contenido }) => {
  const token = localStorage.getItem("token"); // Verifica si el usuario tiene un token válido
  return token ? contenido : <Navigate to="/login" />;
};

export default RutaProtegida;
