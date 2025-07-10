import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "../services/api";
import { Link } from "react-router-dom";
import "../styles/global.css";

export default function TodasLasEncuestas() {
  const [encuestas, setEncuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const encuestasPorPagina = 5;

  useEffect(() => {
    const obtenerTodas = async () => {
      try {
        const resp = await axios.get("/encuesta/activas");
        setEncuestas(resp.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar encuestas.");
      } finally {
        setCargando(false);
      }
    };

    obtenerTodas();
  }, []);

  const totalPaginas = Math.ceil(encuestas.length / encuestasPorPagina);

  const encuestasPaginadas = encuestas.slice(
    (paginaActual - 1) * encuestasPorPagina,
    paginaActual * encuestasPorPagina
  );

  if (cargando) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Todas las Encuestas</h1>
      {encuestas.length === 0 ? (
        <p className="text-center">No hay encuestas disponibles.</p>
      ) : (
        <>
          <Row>
            {encuestasPaginadas.map((encuesta) => (
              <Col md={4} sm={6} xs={12} className="mb-4" key={encuesta._id}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{encuesta.nombre}</Card.Title>
                    <Card.Text>Categoría: {encuesta.categoria}</Card.Text>
                    <Button
                      as={Link}
                      to={`/encuesta/${encuesta._id}`}
                      className="boton-comenzar"
                    >
                      Responder Encuesta
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Controles de paginación */}
          {/* Controles de paginación */}
          <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
            {paginaActual > 1 && (
              <button
                type="button"
                onClick={() => setPaginaActual(paginaActual - 1)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  color: "#666",
                }}
              >
                &lt;
              </button>
            )}

            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPaginaActual(i + 1)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: paginaActual === i + 1 ? "#4caf50" : "#555",
                  borderBottom:
                    paginaActual === i + 1
                      ? "2px solid var(--color-success)"
                      : "none",
                  padding: "0 6px",
                }}
                aria-current={paginaActual === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}

            {paginaActual < totalPaginas && (
              <button
                type="button"
                onClick={() => setPaginaActual(paginaActual + 1)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  color: "#666",
                }}
              >
                &gt;
              </button>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
