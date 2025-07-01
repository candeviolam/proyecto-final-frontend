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
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const TodasLasEncuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  if (cargando) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Todas las Encuestas Disponibles</h2>
      <Row>
        {encuestas.map((enc) => (
          <Col md={4} sm={6} xs={12} key={enc._id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{enc.nombre}</Card.Title>
                <Card.Text>Categoría: {enc.categoria}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/encuesta/${enc._id}`)}
                >
                  Responder
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TodasLasEncuestas;
