import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "../services/api";

const ModalLogin = ({ show, handleClose, abrirRegistro, setAutenticado }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post("/auth/login", { email, contraseña });
      localStorage.setItem("token", respuesta.data.token);

      const datosToken = JSON.parse(atob(respuesta.data.token.split(".")[1]));
      localStorage.setItem("rol", datosToken.rol);

      if (recordarme) {
        localStorage.setItem("recordarme", "true");
      }

      setAutenticado(true);
      handleClose();
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Datos incorrectos o error en el servidor"
      );
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
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
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
            ¿Aún no tiene cuenta?{" "}
            <Button variant="link" onClick={abrirRegistro}>
              Crear cuenta
            </Button>
          </p>
          <p>
            <Button
              variant="link"
              onClick={() => alert("Funcionalidad en desarrollo")}
            >
              ¿Ha olvidado su contraseña?
            </Button>
          </p>
        </Form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
