//axios para hacer solicitudes al backend
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", //cambiar esto al deployar
});

export default api; //En cualquier componente o página se puede usar "api" para hacer solicitudes
