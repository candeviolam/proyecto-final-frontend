import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navegar = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: contraseña,
        }
      );

      localStorage.setItem("token", respuesta.data.token);
      navegar("/admin");
    } catch (err) {
      setError("Datos incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={iniciarSesion}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
