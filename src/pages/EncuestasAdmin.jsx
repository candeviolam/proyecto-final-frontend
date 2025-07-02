import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Container,
} from "react-bootstrap";
import axios from "../services/api";
import "../styles/global.css";

export default function EncuestasAdmin() {
  const [encuestas, setEncuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [encuestaActual, setEncuestaActual] = useState({
    nombre: "",
    categoria: "",
    preguntas: [],
  });

  const [categorias, setCategorias] = useState([]);

  // Obtener categorías
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const resp = await axios.get("/categoria/obtener");
        const activas = resp.data.filter((c) => c.estado);
        setCategorias(activas);
      } catch (error) {
        console.error("Error al obtener categorías", error);
      }
    };

    obtenerCategorias();
  }, []);

  //Obtener encuestas
  useEffect(() => {
    obtenerEncuestas();
  }, []);

  const obtenerEncuestas = async () => {
    setCargando(true);

    try {
      const respuesta = await axios.get("/encuesta/obtener");
      setEncuestas(respuesta.data);
      setError("");
    } catch (err) {
      setError("Error al obtener encuestas");
    } finally {
      setCargando(false);
    }
  };

  //Manejar apertura del modal para crear
  const abrirModalCrear = () => {
    setModoEdicion(false);
    setEncuestaActual({ nombre: "", categoria: "", preguntas: [] });
    setMostrarModal(true);
  };

  //Manejar apertura del modal para editar
  const abrirModalEditar = (encuesta) => {
    setModoEdicion(true);
    setEncuestaActual(encuesta);
    setMostrarModal(true);
  };

  //Manejar creación o edición
  const guardarEncuesta = async () => {
    try {
      if (modoEdicion) {
        await axios.put(
          `/encuesta/modificar/${encuestaActual._id}`,
          encuestaActual,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post("/encuesta/crear", encuestaActual, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setMostrarModal(false);
      obtenerEncuestas();
    } catch (err) {
      setError("Error al guardar encuesta");
    }
  };

  //Activar/Inactivar
  const cambiarEstado = async (id) => {
    try {
      await axios.put(
        `/encuesta/estado/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      obtenerEncuestas();
    } catch {
      setError("Error al cambiar estado de la encuesta");
    }
  };

  //Eliminar encuesta
  const eliminarEncuesta = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar esta encuesta?"))
      return;
    try {
      await axios.delete(`/encuesta/eliminar/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      obtenerEncuestas();
    } catch {
      setError("Error al eliminar la encuesta");
    }
  };

  if (cargando)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  if (error)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Administrar Encuestas</h1>
      <Button onClick={abrirModalCrear} className="mb-3 boton-principal">
        Crear Encuesta
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {encuestas.map((encuesta) => (
            <tr key={encuesta._id}>
              <td>{encuesta.nombre}</td>
              <td>{encuesta.categoria}</td>
              <td>{encuesta.estado ? "Activa" : "Inactiva"}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => abrirModalEditar(encuesta)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => cambiarEstado(encuesta._id)}
                  className="me-2"
                >
                  {encuesta.estado ? "Inactivar" : "Activar"}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => eliminarEncuesta(encuesta._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/*Modal Crear/Editar*/}
      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Encuesta" : "Crear Encuesta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={encuestaActual.nombre}
                onChange={(e) =>
                  setEncuestaActual({
                    ...encuestaActual,
                    nombre: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={encuestaActual.categoria}
                onChange={(e) =>
                  setEncuestaActual({
                    ...encuestaActual,
                    categoria: e.target.value,
                  })
                }
              >
                <option value="">Seleccionar categoría</option>
                {categorias
                  .filter((c) => c.estado)
                  .map((c) => (
                    <option key={c._id} value={c.nombre}>
                      {c.nombre}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preguntas (una por línea)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={encuestaActual.preguntas
                  .map((p) => p.pregunta)
                  .join("\n")}
                onChange={(e) =>
                  setEncuestaActual({
                    ...encuestaActual,
                    preguntas: e.target.value
                      .split("\n")
                      .filter((t) => t.trim() !== "")
                      .map((texto) => ({
                        tipo: "texto",
                        pregunta: texto,
                        opciones: [],
                      })),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button className="boton-principal" onClick={guardarEncuesta}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
