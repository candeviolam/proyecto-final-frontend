import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import ModalLogin from "./ModalLogin";
import ModalRegistro from "./ModalRegistro";
import "../styles/global.css";

const ComponenteNavbar = ({ autenticado, setAutenticado }) => {
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAutenticado(false);
    window.location.reload();
  };

  const collapseRef = useRef();

  const rol = localStorage.getItem("rol");
  console.log("Rol actual:", rol);

  useEffect(() => {
    if (autenticado && collapseRef.current?.classList.contains("show")) {
      collapseRef.current.classList.remove("show");
    }
  }, [autenticado]);

  return (
    <Navbar
      expand="lg"
      className="shadow-sm fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          syle={{ color: "var(--color-accent)", fontWeight: "bold" }}
        >
          Encuestas Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" ref={collapseRef}>
          <Nav className="ms-auto">
            {rol === "admin" && (
              <Button
                variant="outline-light"
                href="/admin"
                style={{
                  color: "var(--color-accent)",
                  borderColor: "var(--color-accent)",
                  marginRight: "10px",
                }}
              >
                Panel Admin
              </Button>
            )}

            {autenticado ? (
              <Button
                variant="outline-light"
                onClick={cerrarSesion}
                style={{
                  color: "var(--color-accent)",
                  borderColor: "var(--color-accent)",
                }}
              >
                Cerrar Sesión
              </Button>
            ) : (
              <Button
                variant="outline-light"
                onClick={() => setMostrarModalLogin(true)}
                style={{
                  color: "var(--color-accent)",
                  borderColor: "var(--color-accent)",
                }}
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
          setMostrarModalLogin(false);
          setMostrarModalRegistro(true);
        }}
        setAutenticado={setAutenticado}
      />

      {/*Modal de Registro*/}
      <ModalRegistro
        show={mostrarModalRegistro}
        handleClose={() => setMostrarModalRegistro(false)}
        setAutenticado={setAutenticado}
      />
    </Navbar>
  );
};

export default ComponenteNavbar;
