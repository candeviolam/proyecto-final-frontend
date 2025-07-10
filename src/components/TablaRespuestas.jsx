import { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import axios from "../services/api";
import moment from "moment";

export default function TablaRespuestas({ encuestaId, onClose }) {
  const [respuestas, setRespuestas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const resp = await axios.get(`/encuesta/${encuestaId}/respuestas`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRespuestas(resp.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          setError("No se encontraron respuestas para esta encuesta.");
        } else if (err.response?.status === 401) {
          setError("No autorizado. Vuelva a iniciar sesión.");
        } else {
          setError("Error al cargar las respuestas.");
        }
      } finally {
        setCargando(false);
      }
    };

    fetchRespuestas();
  }, [encuestaId]);

  if (cargando) return <Spinner animation="border" className="mt-3" />;

  if (error)
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );

  return (
    <div>
      <Button variant="secondary" size="sm" onClick={onClose} className="mb-3">
        Cerrar
      </Button>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Email</th>
            <th>Cantidad de respuestas</th>
          </tr>
        </thead>
        <tbody>
          {respuestas.map((r, index) => (
            <tr key={r._id}>
              <td>{index + 1}</td>
              <td>{moment(r.createdAt).format("DD/MM/YYYY HH:mm")}</td>
              <td>{r.email || "Anónimo"}</td>
              <td>{r.respuestas.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
