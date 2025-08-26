import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [errorFormulario, setErrorFormulario] = useState("");

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    setCargando(true);
    try {
      const resp = await axios.get("/categoria/obtener");
      setCategorias(resp.data);
      setError("");
    } catch {
      setError("Error al obtener las categorías");
    } finally {
      setCargando(false);
    }
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setCategoriaActual({ nombre: "" });
    setMostrarModal(true);
  };

  const abrirModalEditar = (categoria) => {
    setModoEdicion(true);
    setCategoriaActual(categoria);
    setMostrarModal(true);
  };

  const guardarCategoria = async () => {
    if (!categoriaActual.nombre || categoriaActual.nombre.trim().length < 3) {
      setErrorFormulario("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    const token = getToken();
    if (!token) {
      setErrorFormulario(
        "Debés iniciar sesión como administrador para continuar."
      );
      return;
    }

    try {
      if (modoEdicion) {
        await axios.put(
          `/categoria/modificar/${categoriaActual._id}`,
          { nombre: categoriaActual.nombre },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "/categoria/crear",
          { nombre: categoriaActual.nombre },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setMostrarModal(false);
      setErrorFormulario("");
      obtenerCategorias();
    } catch (error) {
      const mensaje =
        error.response?.data?.message || "Error al guardar la categoría.";
      setErrorFormulario(mensaje);
    }
  };

  const cambiarEstado = async (id) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Sin token");
      await axios.put(
        `/categoria/estado/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      obtenerCategorias();
    } catch {
      setError("Error al cambiar el estado de la categoría.");
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Está seguro que desea eliminar esta categoría?"))
      return;
    try {
      const token = getToken();
      if (!token) throw new Error("Sin token");
      await axios.delete(`/categoria/eliminar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
      <Button
        variant="outline-secondary"
        as={Link}
        to="/admin"
        className="mb-3"
      >
        ← Volver al Panel Admin
      </Button>

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

      <Modal
        show={mostrarModal}
        onHide={() => {
          setMostrarModal(false);
          setErrorFormulario("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? "Editar Categoría" : "Crear Categoría"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
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

          {errorFormulario && (
            <Alert variant="danger" className="mt-2">
              {errorFormulario}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setMostrarModal(false);
              setErrorFormulario("");
            }}
          >
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
