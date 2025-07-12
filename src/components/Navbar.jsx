import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalRegistro from "./ModalRegistro";
import "../styles/global.css";

const ComponenteNavbar = ({ autenticado, setAutenticado, rol, setRol }) => {
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("rol");
    sessionStorage.removeItem("rol");
    setAutenticado(false);
    setRol("");
    navigate("/");
  };

  const collapseRef = useRef();

  useEffect(() => {
    if (autenticado && collapseRef.current?.classList.contains("show")) {
      collapseRef.current.classList.remove("show");
    }
  }, [autenticado]);

  return (
    <Navbar
      expand="lg"
      className="navbar-custom fixed top-0 left-0 w-full z-50 shadow-sm justify-content-between"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="ms-5"
          style={{ color: "var(--color-accent)", fontWeight: "bold" }}
        >
          Encuestas Online
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" ref={collapseRef}>
          <Nav className="ms-auto me-5">
            {rol === "admin" && (
              <Link
                to="/admin"
                className="btn btn-outline-light"
                style={{
                  color: "var(--color-accent)",
                  borderColor: "var(--color-accent)",
                  marginRight: "10px",
                }}
              >
                Panel Admin
              </Link>
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

      <ModalLogin
        show={mostrarModalLogin}
        handleClose={() => setMostrarModalLogin(false)}
        abrirRegistro={() => {
          setMostrarModalLogin(false);
          setMostrarModalRegistro(true);
        }}
        setAutenticado={setAutenticado}
      />

      <ModalRegistro
        show={mostrarModalRegistro}
        handleClose={() => setMostrarModalRegistro(false)}
        setAutenticado={setAutenticado}
      />
    </Navbar>
  );
};

export default ComponenteNavbar;
