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

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState({ nombre: "" });

  //Obtener categorías
  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    setCargando(true);
    try {
      const respuesta = await axios.get("/categoria/obtener");
      setCategorias(respuesta.data);
      setError("");
    } catch (err) {
      setError("Error al obtener las categorías");
    } finally {
      setCargando(false);
    }
  };

  //Abrir modal para crear
  const abrirModalCrear = () => {
    setModoEdicion(false);
    setCategoriaActual({ nombre: "" });
    setMostrarModal(true);
  };

  //Abrir modal para editar
  const abrirModalEditar = (categoria) => {
    setModoEdicion(true);
    setCategoriaActual(categoria);
    setMostrarModal(true);
  };

  //Guardar categoría
  const guardarCategoria = async () => {
    try {
      if (modoEdicion) {
        await axios.put(
          `/categoria/modificar/${categoriaActual._id}`,
          categoriaActual,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post("/categoria/crear", categoriaActual, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setMostrarModal(false);
      obtenerCategorias();
    } catch {
      setError("Error al guardar la categoría");
    }
  };

  //Activar/Inactivar categoría
  const cambiarEstado = async (id) => {
    try {
      await axios.put(
        `/categoria/estado/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      obtenerCategorias();
    } catch {
      setError("Error al cambiar el estado de la categoría");
    }
  };

  //Eliminar categoría
  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar esta categoría?"))
      return;
    try {
      await axios.delete(`/categoria/eliminar/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      obtenerCategorias();
    } catch {
      setError("Error al eliminar la categoría");
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
      <h1 className="mb-4">Administrar Categorías</h1>
      <Button onClick={abrirModalCrear} className="mb-3 boton-principal">
        Crear Categoría
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria._id}>
              <td>{categoria.nombre}</td>
              <td>{categoria.estado ? "Activa" : "Inactiva"}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => abrirModalEditar(categoria)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => cambiarEstado(categoria._id)}
                  className="me-2"
                >
                  {categoria.estado ? "Inactivar" : "Activar"}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => eliminarCategoria(categoria._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/*Modal Crear/Editar*/}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Categoría" : "Crear Categoría"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={categoriaActual.nombre}
                onChange={(e) =>
                  setCategoriaActual({
                    ...categoriaActual,
                    nombre: e.target.value,
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
          <Button className="boton-principal" onClick={guardarCategoria}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
