import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "../services/api";

const ModalRegistro = ({ show, handleClose }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [error, setError] = useState("");

  const validarCampos = () => {
    if (
      !nombre ||
      !apellido ||
      !email ||
      !telefono ||
      !contraseña ||
      !repetirContraseña
    ) {
      setError("Todos los campos son obligatorios");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("El email ingresado no es válido");
      return false;
    }
    if (!/^\d{10}$/.test(telefono)) {
      setError("El teléfono debe tener 10 dígitos");
      return false;
    }
    if (contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (contraseña !== repetirContraseña) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    if (!aceptoTerminos) {
      setError("Debe aceptar los términos y condiciones");
      return false;
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    try {
      const respuesta = await axios.post("/auth/register", {
        nombre,
        apellido,
        email,
        telefono,
        contraseña,
      });

      alert("Registro exitoso, ahora puede iniciar sesión");
      handleClose();
    } catch (err) {
      setError("Error al registrar usuario. Inténtelo nuevamente");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </Form.Group>
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
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ingrese su  número de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={mostrarContraseña ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <Button
              variant="link"
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
            >
              {mostrarContraseña ? "Ocultar" : "Mostrar"} contraseña
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              type={mostrarContraseña ? "text" : "password"}
              placeholder="Repita se contraseña"
              value={repetirContraseña}
              onChange={(e) => setRepetirContraseña(e.target.value)}
              required
            />
            <Button
              variant="link"
              onClick={() => setMostrarContraseña(!mostrarContraseña)}
            >
              {mostrarContraseña ? "Ocultar" : "Mostrar"} contraseña
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="He leído y acepto las condiciones de uso y la política de privacidad"
              checked={aceptoTerminos}
              onChange={(e) => setAceptoTerminos(e.target.checked)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear cuenta
          </Button>
        </Form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistro;
