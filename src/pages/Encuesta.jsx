import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import "../styles/global.css";

const Encuesta = () => {
  const { id } = useParams();
  const [encuesta, setEncuesta] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  //Obtener encuesta al cargar la página
  useEffect(() => {
    const obtenerEncuesta = async () => {
      try {
        const respuesta = await axios.get(`/encuesta/${id}`);
        setEncuesta(respuesta.data);
        setRespuestas(new Array(respuesta.data.preguntas.length).fill("")); //Inicializa respuestas vacías
      } catch (err) {
        setError("No se pudo cargar la encuesta");
      } finally {
        setCargando(false);
      }
    };

    obtenerEncuesta();
  }, [id]);

  //Manejar cambios en respuestas
  const manejarCambio = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
  };

  //Enviar respuestas
  const manejarEnvio = async (e) => {
    e.preventDefault();

    const respuestasFormateadas = encuesta.preguntas.map((preg, i) => ({
      pregunta: preg.pregunta,
      respuesta: respuestas[i] || "",
    }));

    try {
      await axios.post(`/encuesta/${id}/responder`, {
        email: email || null,
        respuestas: respuestasFormateadas,
      });
      setMensaje("¡Gracias por completar la encuesta!");
      setError("");
    } catch (err) {
      setError("Error al enviar respuestas");
      setMensaje("");
    }
  };

  if (cargando) return <Spinner animation="border" className="m-5" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-5">
      <div className="fondo-claro">
        <h2>{encuesta.nombre}</h2>
        <p>Categoría: {encuesta.categoria}</p>
        <Form onSubmit={manejarEnvio}>
          {encuesta.preguntas.map((pregunta, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>
                {index + 1}. {pregunta.pregunta}
              </Form.Label>
              {pregunta.tipo === "texto" ? (
                <Form.Control
                  type="text"
                  value={respuestas[index]}
                  onChange={(e) => manejarCambio(index, e.target.value)}
                />
              ) : (
                <Form.Select
                  value={respuestas[index]}
                  onChange={(e) => manejarCambio(index, e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  {pregunta.opciones.map((op, i) => (
                    <option key={i} value={op}>
                      {op}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>
              Email (opcional, para recibir tus respuestas)
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@ejemplo.com"
            />
          </Form.Group>
          <Button type="submit" className="boton-principal">
            Enviar respuestas
          </Button>
        </Form>
        {mensaje && (
          <Alert variant="success" className="mt-3">
            {mensaje}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default Encuesta;
