import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import ModalLogin from "./ModalLogin";
import ModalRegistro from "./ModalRegistro";

const ComponenteNavbar = ({ autenticado, setAutenticado }) => {
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAutenticado(false);
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Encuestas Online</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {autenticado ? (
              <Button variant="outline-danger" onClick={cerrarSesion}>
                Cerrar Sesión
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                onClick={() => setMostrarModalLogin(true)}
              >
                Acceder
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/*Modal de Iniciar Sesión*/}
      <ModalLogin
        show={mostrarModalLogin}
        handleClose={() => setMostrarModalLogin(false)}
        abrirRegistro={() => {
          setMostrarModalLogin(false); //Cerrar el modal de inicio de sesión
          setMostrarModalRegistro(true);
        }}
        setAutenticado={setAutenticado}
      />

      {/*Modal de Registro*/}
      <ModalRegistro
        show={mostrarModalRegistro}
        handleClose={() => setMostrarModalRegistro(false)}
      />
    </Navbar>
  );
};

export default ComponenteNavbar;
