import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import api from "../services/api"; //para importar la configuración de axios

const ModalLogin = ({ mostrar, cerrar }) => {
  const [pestañaActiva, setPestañaActiva] = useState("login");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      if (pestañaActiva === "login") {
        const respuesta = await api.post("/auth/login", { email, contraseña });
        localStorage.setItem("token", respuesta.data.token); // Guardar el token en el localStorage
        cerrar(); // Cerrar el modal
        window.location.reload(); // Refrescar para que el token esté disponible
      } else {
        //Lógica para el registro
        const respuesta = await api.post("/auth/register", {
          email,
          contraseña,
        });
        alert("Registro exitoso, ahora puedes iniciar sesión.");
        setPestañaActiva("login");
      }
    } catch (err) {
      setError("Datos incorrectos o error en el servidor.");
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrar}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión / Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={pestañaActiva}
          onSelect={(key) => setPestañaActiva(key)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Iniciar Sesión">
            <form onSubmit={manejarEnvio}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contraseña" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {pestañaActiva === "login" ? "Iniciar Sesión" : "Registrarse"}
              </button>
            </form>
            {error && <div className="text-danger mt-2">{error}</div>}
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
