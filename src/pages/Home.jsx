import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/global.css";

const Home = () => {
  const [logueada, setLogueada] = useState(false);
  //Estado para almacenar las encuestas
  const [encuestas, setEncuestas] = useState([]);

  //Obtener encuestas activas desde el backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogueada(true);
    }

    const obtenerEncuestas = async () => {
      try {
        const respuesta = await axios.get("/encuesta/activas");
        setEncuestas(respuesta.data);
      } catch (error) {
        console.error("Error al obtener encuestas", error);
      }
    };

    obtenerEncuestas();
  }, []);

  //Manejar clic en una encuesta
  const manejarClicEncuesta = (id) => {
    //Redirigir a la página de la encuesta
    window.location.href = `/encuesta/${id}`;
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Encuestas Disponibles</h1>
      {logueada && (
        <p className="text-success text-center mb-4">Sesión iniciada</p>
      )}
      <Row>
        {encuestas.length > 0 ? (
          encuestas.map((encuesta) => (
            <Col key={encuesta._id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{encuesta.nombre}</Card.Title>
                  <Card.Text>{encuesta.categoria}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => manejarClicEncuesta(encuesta._id)}
                    className="btn-primary"
                  >
                    Responder Encuesta
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">
            No hay encuestas disponibles en este momento.
          </p>
        )}
      </Row>
    </Container>
  );
};

export default Home;
