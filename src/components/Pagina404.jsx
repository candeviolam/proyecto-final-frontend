import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/global.css";

export default function NoEncontrado() {
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <img
        src="/error-404.jpeg"
        alt="Página no encontrada"
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      />
      <h1 className="display-4 mb-3" style={{ color: "var(--color-primary)" }}>
        404 - Página no encontrada
      </h1>
      <p className="lead mb-4" style={{ maxWidth: "500px" }}>
        Lo sentimos, la página que buscás no existe.
      </p>
      <Button as={Link} to="/" className="boton-principal">
        Volver al Inicio
      </Button>
    </Container>
  );
}
