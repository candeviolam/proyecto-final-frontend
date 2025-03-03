import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "../services/api";

const ModalLogin = ({ show, handleClose, abrirRegistro }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post("/auth/login", { email, constraseña });
      localStorage.setItem("token", respuesta.data.token);

      if (recordarme) {
        localStorage.setItem("recordarme", "true");
      }

      handleClose();
      window.location.reload(); //Refrescar para actualizar el estado de autenticación
    } catch (err) {
      setError("Datos incorrectos o error en el servidor.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Recuérdame"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
          <p className="mb-3">
            ¿Aún no tiene cuenta?{""}
            <Button variant="link" onClick={abrirRegistro}>
              Crear cuenta
            </Button>
          </p>
          <p>
            <Button variant="link">¿Ha olvidado su contraseña?</Button>
          </p>
        </Form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
