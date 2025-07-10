import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../services/api";
import {
  Container,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import "../styles/global.css";
import "../styles/Home.css";

export default function EncuestasPorCategoria() {
  const { nombre } = useParams();
  const [encuestas, setEncuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoriaExiste, setCategoriaExiste] = useState(true);

  const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

  const limpiarTitulo = (nombre) => {
    if (!nombre) return "";
    const limpio = nombre.replace(/^Encuesta (de|sobre)\s*/i, "").trim();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
  };

  useEffect(() => {
    const obtener = async () => {
      setCargando(true);
      try {
        const respCategorias = await axios.get("/categoria/obtener");
        const categoriasActivas = respCategorias.data.filter((c) => c.estado);

        const existe = categoriasActivas.some(
          (c) => c.nombre.toLowerCase() === nombre.toLowerCase()
        );

        if (!existe) {
          setCategoriaExiste(false);
          setCargando(false);
          return;
        }

        const respEncuestas = await axios.get("/encuesta/activas");
        const filtradas = respEncuestas.data.filter(
          (enc) => enc.categoria?.toLowerCase() === nombre.toLowerCase()
        );

        setEncuestas(filtradas);
        setError("");
        setCategoriaExiste(true);
      } catch {
        setError("Error al obtener datos");
      } finally {
        setCargando(false);
      }
    };

    obtener();
  }, [nombre]);

  if (cargando)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );

  if (error)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (!categoriaExiste)
    return (
      <Container
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "60vh" }}
      >
        <h2 className="mb-3">Categoría no encontrada</h2>
        <p>
          La categoría <strong>{capitalizar(nombre)}</strong> no existe o fue
          eliminada.
        </p>
        <Button as={Link} to="/" className="boton-principal mt-3">
          Volver al inicio
        </Button>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Encuestas de {capitalizar(nombre)}</h1>
      {encuestas.length === 0 ? (
        <p className="text-center">
          No hay encuestas disponibles en esta categoría.
        </p>
      ) : (
        <Row>
          {encuestas.map((encuesta) => (
            <Col key={encuesta._id} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{limpiarTitulo(encuesta.nombre)}</Card.Title>
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
      )}
    </Container>
  );
}
