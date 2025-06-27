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
  const { nombre } = useParams(); // obtiene la categoría de la URL
  const [encuestas, setEncuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtener = async () => {
      setCargando(true);
      try {
        // Traer todas las encuestas activas
        const respuesta = await axios.get("/encuesta/activas");
        // Filtrar por categoría
        const filtradas = respuesta.data.filter(
          (encuesta) =>
            encuesta.categoria?.toLowerCase() === nombre.toLowerCase()
        );
        setEncuestas(filtradas);
        setError("");
      } catch (err) {
        setError("Error al obtener las encuestas");
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

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Encuestas de {nombre}</h1>
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
                  <Card.Title>{encuesta.nombre}</Card.Title>
                  <Card.Text>Categoría: {encuesta.categoria}</Card.Text>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/encuesta/${encuesta._id}`}
                    className="btn-primary"
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
