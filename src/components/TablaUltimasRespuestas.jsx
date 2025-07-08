import { Table } from "react-bootstrap";

export default function TablaUltimasRespuestas({ respuestas }) {
  if (!respuestas || respuestas.length === 0) {
    return <p>No hay respuestas recientes.</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Encuesta</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Respuestas</th>
        </tr>
      </thead>
      <tbody>
        {respuestas.map((r, i) => (
          <tr key={i}>
            <td>{r.encuestaNombre}</td>
            <td>{r.categoria}</td>
            <td>{new Date(r.respuesta.fecha).toLocaleString()}</td>
            <td>
              {r.respuesta.respuestas.map((resp, j) => (
                <div key={j}>
                  <strong>{resp.pregunta}</strong>: {String(resp.respuesta)}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
