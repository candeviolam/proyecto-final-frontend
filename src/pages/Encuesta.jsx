import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { obtenerImagenFondo } from "../utils/obtenerImagenFondo";
import "../styles/global.css";

export default function Encuesta() {
  const { id } = useParams();
  const [inicio, setInicio] = useState(false);
  const [encuesta, setEncuesta] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [errorCarga, setErrorCarga] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");
  const [cargando, setCargando] = useState(true);

  const emailRef = useRef(null);

  const limpiarTitulo = (nombre) => {
    if (!nombre) return "";
    const limpio = nombre.replace(/^Encuesta (de|sobre)\s*/i, "").trim();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
  };

  useEffect(() => {
    const obtenerEncuesta = async () => {
      try {
        const resp = await axios.get(`/encuesta/${id}`);
        setEncuesta(resp.data);
        setRespuestas(new Array(resp.data.preguntas.length).fill(""));
      } catch (err) {
        if (err.response?.status === 404) {
          setErrorCarga("La encuesta no existe o fue eliminada.");
        } else {
          setErrorCarga("Error al cargar la encuesta.");
        }
      } finally {
        setCargando(false);
      }
    };
    obtenerEncuesta();
  }, [id]);

  useEffect(() => {
    if (!encuesta) return;
    const selector = `[data-preg="${preguntaActual}"] input, [data-preg="${preguntaActual}"] textarea, [data-preg="${preguntaActual}"] select`;
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) {
        el.focus();
        try {
          el.select?.();
        } catch {}
      }
    }, 0);
  }, [preguntaActual, encuesta]);

  const manejarCambio = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
  };

  const manejarCambioMultiple = (index, opcion) => {
    const seleccionadas = respuestas[index] || [];
    let nuevas;
    if (seleccionadas.includes(opcion)) {
      nuevas = seleccionadas.filter((o) => o !== opcion);
    } else {
      nuevas = [...seleccionadas, opcion];
    }
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = nuevas;
    setRespuestas(nuevasRespuestas);
  };

  const esValidaRespuesta = (preg, valor) => {
    const tipo = preg?.tipo;
    if (tipo === "texto") return Boolean(valor && String(valor).trim() !== "");
    if (tipo === "opcionUnica") return Boolean(valor);
    if (tipo === "opcionMultiple")
      return Array.isArray(valor) && valor.length > 0;
    if (tipo === "escala")
      return valor !== undefined && valor !== null && String(valor) !== "";
    return true;
  };

  const manejarEnvio = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, ingresá un email válido.");
      return;
    }

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
    } catch {
      setError("Error al enviar respuestas");
      setMensaje("");
    }
  };

  const validarYAvanzar = () => {
    const preg = encuesta.preguntas[preguntaActual];
    const resp = respuestas[preguntaActual];

    if (!esValidaRespuesta(preg, resp)) {
      setErrorValidacion("Por favor responder la pregunta antes de continuar.");
      return;
    }

    setErrorValidacion("");
    setPreguntaActual((prev) => prev + 1);
  };

  const manejarEnter = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const lastIdx = encuesta.preguntas.length - 1;

    if (preguntaActual < lastIdx) {
      validarYAvanzar();
      return;
    }

    const preg = encuesta.preguntas[preguntaActual];
    const resp = respuestas[preguntaActual];

    if (!esValidaRespuesta(preg, resp)) {
      setErrorValidacion(
        "Por favor responder la pregunta antes de enviar la encuesta."
      );
      return;
    }
    setErrorValidacion("");

    if (emailRef.current && document.activeElement !== emailRef.current) {
      emailRef.current.focus();
      emailRef.current.select?.();
      return;
    }

    manejarEnvio();
  };

  if (cargando) return <Spinner animation="border" className="m-5" />;
  if (errorCarga) return <Alert variant="danger">{errorCarga}</Alert>;

  if (!inicio) {
    return (
      <div
        className="fondo-encuesta"
        style={{
          backgroundImage: `url(${obtenerImagenFondo({
            categoria: encuesta.categoria,
            nombreEncuesta: encuesta.nombre,
          })})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="bienvenida-encuesta">
          <h2>{limpiarTitulo(encuesta.nombre)}</h2>
          <p>
            Gracias por participar. Tu respuesta es importante para ayudarnos a
            conocer tu opinión.
          </p>
          <Button
            onClick={() => setInicio(true)}
            className="boton-comenzar mt-3"
          >
            Comenzar encuesta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fondo-encuesta"
      style={{
        backgroundImage: `url(${obtenerImagenFondo({
          categoria: encuesta.categoria,
          nombreEncuesta: encuesta.nombre,
        })})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "50px",
        paddingBottom: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {mensaje ? (
        <div className="contenedor-preguntas text-center">
          <h2>¡Gracias por completar la encuesta!</h2>
          <p>Tus respuestas fueron registradas correctamente.</p>
          <Button
            variant="success"
            onClick={() => (window.location.href = "/")}
            className="mt-3"
          >
            Volver al Inicio
          </Button>
        </div>
      ) : (
        <Container className="mt-5 d-flex justify-content-center">
          <div className="contenedor-preguntas">
            <h2>{limpiarTitulo(encuesta.nombre)}</h2>
            <p>Categoría: {encuesta.categoria}</p>

            <Form onSubmit={manejarEnvio} onKeyDown={manejarEnter}>
              {encuesta.preguntas.map((pregunta, index) => (
                <div
                  key={index}
                  data-preg={index}
                  style={{
                    opacity: index === preguntaActual ? 1 : 0.3,
                    pointerEvents: index === preguntaActual ? "auto" : "none",
                    transition: "opacity 0.3s",
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {index + 1}. {pregunta.pregunta}
                    </Form.Label>

                    {pregunta.tipo === "texto" && (
                      <Form.Control
                        type="text"
                        value={respuestas[index] || ""}
                        onChange={(e) => manejarCambio(index, e.target.value)}
                      />
                    )}

                    {pregunta.tipo === "opcionUnica" && (
                      <div>
                        {pregunta.opciones.map((op, i) => (
                          <Form.Check
                            key={i}
                            type="radio"
                            name={`pregunta_${index}`}
                            label={op}
                            checked={respuestas[index] === op}
                            onChange={() => manejarCambio(index, op)}
                          />
                        ))}
                      </div>
                    )}

                    {pregunta.tipo === "opcionMultiple" && (
                      <div>
                        {pregunta.opciones.map((op, i) => (
                          <Form.Check
                            key={i}
                            type="checkbox"
                            label={op}
                            checked={respuestas[index]?.includes(op)}
                            onChange={() => manejarCambioMultiple(index, op)}
                          />
                        ))}
                      </div>
                    )}

                    {pregunta.tipo === "escala" && (
                      <div>
                        <Form.Range
                          min={0}
                          max={10}
                          value={respuestas[index] || 0}
                          onChange={(e) => manejarCambio(index, e.target.value)}
                        />
                        <span className="ms-2">{respuestas[index] || 0}</span>
                      </div>
                    )}

                    {errorValidacion && index === preguntaActual && (
                      <Alert variant="danger" className="mt-2">
                        {errorValidacion}
                      </Alert>
                    )}
                  </Form.Group>
                </div>
              ))}

              {preguntaActual === encuesta.preguntas.length - 1 && (
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email (opcional, para recibir tus respuestas)
                  </Form.Label>
                  <Form.Control
                    ref={emailRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@ejemplo.com"
                  />
                </Form.Group>
              )}

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  disabled={preguntaActual === 0}
                  onClick={() => setPreguntaActual(preguntaActual - 1)}
                >
                  Anterior
                </Button>
                {preguntaActual < encuesta.preguntas.length - 1 ? (
                  <Button variant="primary" onClick={validarYAvanzar}>
                    Siguiente
                  </Button>
                ) : (
                  <Button variant="success" type="submit">
                    Enviar
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Container>
      )}
    </div>
  );
}
