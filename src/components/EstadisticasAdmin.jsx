import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Spinner, Modal } from "react-bootstrap";
import axios from "../services/api";
import TablaUltimasRespuestas from "./TablaUltimasRespuestas";
import TablaUsuariosRegistrados from "./TablaUsuariosRegistrados";
import {
  FaClipboardList,
  FaFolderOpen,
  FaUserFriends,
  FaPoll,
} from "react-icons/fa";
import "../styles/admin.css";

export default function EstadisticasAdmin() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [mostrarModalRespuestas, setMostrarModalRespuestas] = useState(false);
  const [mostrarModalUsuarios, setMostrarModalUsuarios] = useState(false);

  const [respuestas, setRespuestas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoRespuestas, setCargandoRespuestas] = useState(false);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const resp = await axios.get("/admin/estadisticas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEstadisticas(resp.data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerEstadisticas();
  }, []);

  const abrirModalRespuestas = async () => {
    setCargandoRespuestas(true);
    setMostrarModalRespuestas(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const resp = await axios.get("/admin/respuestas/ultimas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRespuestas(resp.data);
    } catch (error) {
      console.error("Error al cargar respuestas:", error);
      setRespuestas([]);
    } finally {
      setCargandoRespuestas(false);
    }
  };

  const abrirModalUsuarios = async () => {
    setCargandoUsuarios(true);
    setMostrarModalUsuarios(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const resp = await axios.get("/admin/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(resp.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setUsuarios([]);
    } finally {
      setCargandoUsuarios(false);
    }
  };

  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!estadisticas) {
    return (
      <div className="text-center my-5">
        <p>No se pudieron cargar las estadísticas.</p>
      </div>
    );
  }

  return (
    <>
      <Row className="g-4">
        <Col md={3}>
          <Card
            className="tarjeta-estadisticas encuestas"
            onClick={() => navigate("/admin/encuestas")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <FaClipboardList size={40} />
              <h5>Encuestas activas</h5>
              <h2>{estadisticas.encuestasActivas}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className="tarjeta-estadisticas categorias"
            onClick={() => navigate("/admin/categorias")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <FaFolderOpen size={40} />
              <h5>Categorías activas</h5>
              <h2>{estadisticas.categoriasActivas}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className="tarjeta-estadisticas respuestas"
            onClick={abrirModalRespuestas}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <FaPoll size={40} />
              <h5>Respuestas totales</h5>
              <h2>{estadisticas.respuestasTotales}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className="tarjeta-estadisticas usuarios"
            onClick={abrirModalUsuarios}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <FaUserFriends size={40} />
              <h5>Usuarios registrados</h5>
              <h2>{estadisticas.usuariosRegistrados}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Respuestas */}
      <Modal
        show={mostrarModalRespuestas}
        onHide={() => setMostrarModalRespuestas(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Últimas respuestas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cargandoRespuestas ? (
            <Spinner animation="border" />
          ) : (
            <TablaUltimasRespuestas respuestas={respuestas} />
          )}
        </Modal.Body>
      </Modal>

      {/* Modal Usuarios */}
      <Modal
        show={mostrarModalUsuarios}
        onHide={() => setMostrarModalUsuarios(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Usuarios registrados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cargandoUsuarios ? (
            <Spinner animation="border" />
          ) : (
            <TablaUsuariosRegistrados usuarios={usuarios} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
