import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Container,
  Dropdown,
} from "react-bootstrap";
import axios from "../services/api";
import GraficoRespuestasEncuesta from "../components/GraficoRespuestasEncuesta";
import TablaRespuestas from "../components/TablaRespuestas";
import "../styles/global.css";

export default function EncuestasAdmin() {
  const [encuestas, setEncuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalGrafico, setMostrarModalGrafico] = useState(false);
  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [encuestaActual, setEncuestaActual] = useState({
    nombre: "",
    categoria: "",
    preguntas: [],
  });
  const [categorias, setCategorias] = useState([]);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [preguntasTexto, setPreguntasTexto] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [mostrarModalRespuestas, setMostrarModalRespuestas] = useState(false);

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
    setPreguntasTexto("");
    setMostrarModal(true);
  };

  //Manejar apertura del modal para editar
  const abrirModalEditar = (encuesta) => {
    setModoEdicion(true);
    setEncuestaActual(encuesta);
    setPreguntasTexto(
      encuesta.preguntas?.map((p) => p.pregunta).join("\n") || ""
    );
    setMostrarModal(true);
  };

  //Manejar creación o edición
  const guardarEncuesta = async () => {
    // Validaciones
    if (!encuestaActual.nombre || encuestaActual.nombre.trim().length < 5) {
      setErrorFormulario("El nombre debe tener al menos 5 caracteres.");
      return;
    }

    if (!encuestaActual.categoria || encuestaActual.categoria.trim() === "") {
      setErrorFormulario("Debe seleccionar una categoría.");
      return;
    }

    const preguntasProcesadas = preguntasTexto
      .split("\n")
      .filter((t) => t.trim() !== "")
      .map((texto) => ({
        tipo: "texto",
        pregunta: texto.trim(),
        opciones: [],
      }));

    //Validación
    if (preguntasProcesadas.length === 0) {
      setErrorFormulario("Debe agregar al menos una pregunta.");
      return;
    }

    try {
      if (modoEdicion) {
        await axios.put(
          `/encuesta/modificar/${encuestaActual._id}`,
          {
            ...encuestaActual,
            preguntas: preguntasProcesadas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post(
          "/encuesta/crear",
          {
            ...encuestaActual,
            preguntas: preguntasProcesadas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      setMostrarModal(false);
      setErrorFormulario("");
      obtenerEncuestas();
    } catch {
      setErrorFormulario("Error al guardar la encuesta.");
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

  // Filtrado de encuestas
  const encuestasFiltradas = encuestas.filter((e) => {
    const coincideNombre = e.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());

    const coincideCategoria =
      filtroCategoria === "todas" || e.categoria === filtroCategoria;

    const coincideEstado =
      filtroEstado === "todas" ||
      (filtroEstado === "activa" && e.estado) ||
      (filtroEstado === "inactiva" && !e.estado);

    return coincideNombre && coincideCategoria && coincideEstado;
  });

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Administrar Encuestas</h1>
      <Button onClick={abrirModalCrear} className="mb-3 boton-principal">
        Crear Encuesta
      </Button>

      <div className="mb-4 d-flex flex-wrap gap-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          style={{ maxWidth: "200px" }}
        />

        <Form.Select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c._id} value={c.nombre}>
              {c.nombre}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="todas">Todos los estados</option>
          <option value="activa">Activa</option>
          <option value="inactiva">Inactiva</option>
        </Form.Select>
      </div>

      <div className="tabla-responsive">
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
            {encuestasFiltradas.map((encuesta) => (
              <tr key={encuesta._id}>
                <td>{encuesta.nombre}</td>
                <td>{encuesta.categoria}</td>
                <td>{encuesta.estado ? "Activa" : "Inactiva"}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm">
                      <i className="bi bi-three-dots"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => abrirModalEditar(encuesta)}>
                        <i className="bi bi-pencil me-2"></i> Editar
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => cambiarEstado(encuesta._id)}
                      >
                        <i className="bi bi-toggle-on me-2"></i>
                        {encuesta.estado ? "Inactivar" : "Activar"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => eliminarEncuesta(encuesta._id)}
                      >
                        <i className="bi bi-trash me-2"></i> Eliminar
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          setEncuestaSeleccionada(encuesta._id);
                          setMostrarModalGrafico(true);
                        }}
                      >
                        <i className="bi bi-bar-chart me-2"></i> Ver Gráfica
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setEncuestaSeleccionada(encuesta._id);
                          setMostrarModalRespuestas(true);
                        }}
                      >
                        <i className="bi bi-list-check me-2"></i> Ver Respuestas
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/*Modal Crear/Editar*/}
      <Modal
        show={mostrarModal}
        onHide={() => {
          setMostrarModal(false);
          setErrorFormulario("");
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Encuesta" : "Crear Encuesta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}

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
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción breve de la encuesta"
                value={encuestaActual.descripcion || ""}
                onChange={(e) =>
                  setEncuestaActual({
                    ...encuestaActual,
                    descripcion: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preguntas</Form.Label>

              {encuestaActual.preguntas.map((pregunta, index) => (
                <div
                  key={index}
                  className="border rounded p-3 mb-3"
                  style={{ background: "#f8f9fa" }}
                >
                  <Form.Label>Pregunta {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escribe la pregunta"
                    value={pregunta.pregunta}
                    className="mb-2"
                    onChange={(e) => {
                      const nuevas = [...encuestaActual.preguntas];
                      nuevas[index].pregunta = e.target.value;
                      setEncuestaActual({
                        ...encuestaActual,
                        preguntas: nuevas,
                      });
                    }}
                  />

                  <Form.Select
                    value={pregunta.tipo}
                    className="mb-2"
                    onChange={(e) => {
                      const nuevas = [...encuestaActual.preguntas];
                      nuevas[index].tipo = e.target.value;
                      // Si es texto o escala, limpiamos opciones
                      if (
                        e.target.value === "texto" ||
                        e.target.value === "escala"
                      ) {
                        nuevas[index].opciones = [];
                      }
                      setEncuestaActual({
                        ...encuestaActual,
                        preguntas: nuevas,
                      });
                    }}
                  >
                    <option value="texto">Texto libre</option>
                    <option value="opcionUnica">Opción única</option>
                    <option value="opcionMultiple">Opción múltiple</option>
                    <option value="escala">Escala 0-10</option>
                  </Form.Select>

                  {(pregunta.tipo === "opcionUnica" ||
                    pregunta.tipo === "opcionMultiple") && (
                    <Form.Control
                      type="text"
                      placeholder="Opciones separadas por coma"
                      value={pregunta.opciones.join(", ")}
                      onChange={(e) => {
                        const nuevas = [...encuestaActual.preguntas];
                        nuevas[index].opciones = e.target.value
                          .split(",")
                          .map((o) => o.trim())
                          .filter((o) => o !== "");
                        setEncuestaActual({
                          ...encuestaActual,
                          preguntas: nuevas,
                        });
                      }}
                    />
                  )}

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      const nuevas = [...encuestaActual.preguntas];
                      nuevas.splice(index, 1);
                      setEncuestaActual({
                        ...encuestaActual,
                        preguntas: nuevas,
                      });
                    }}
                  >
                    Eliminar pregunta
                  </Button>
                </div>
              ))}
            </Form.Group>

            <Button
              className="boton-agregar-pregunta"
              onClick={() =>
                setEncuestaActual({
                  ...encuestaActual,
                  preguntas: [
                    ...encuestaActual.preguntas,
                    { pregunta: "", tipo: "texto", opciones: [] },
                  ],
                })
              }
            >
              + Agregar pregunta
            </Button>

            {errorFormulario && (
              <Alert variant="danger" className="mt-2">
                {errorFormulario}
              </Alert>
            )}
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

      <Modal
        show={mostrarModalGrafico}
        onHide={() => setMostrarModalGrafico(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Respuestas de la Encuesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {encuestaSeleccionada && (
            <GraficoRespuestasEncuesta encuestaId={encuestaSeleccionada} />
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={mostrarModalRespuestas}
        onHide={() => setMostrarModalRespuestas(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Respuestas de la encuesta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {encuestaSeleccionada && (
            <TablaRespuestas
              encuestaId={encuestaSeleccionada}
              onClose={() => setMostrarModalRespuestas(false)}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
