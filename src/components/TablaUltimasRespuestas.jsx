import { Table } from "react-bootstrap";

const fmt = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function dateFromObjectId(oid) {
  if (!oid || typeof oid !== "string" || oid.length < 8) return null;
  const secs = parseInt(oid.slice(0, 8), 16);
  if (!Number.isFinite(secs)) return null;
  const d = new Date(secs * 1000);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatFechaFromRow(row) {
  const direct = row?.createdAt || row?.fecha || row?.respuesta?.fecha;
  if (direct) {
    const d = new Date(direct);
    if (!Number.isNaN(d.getTime())) return fmt.format(d);
  }

  const dFromRespId = dateFromObjectId(row?.respuesta?._id);
  if (dFromRespId) return fmt.format(dFromRespId);

  const dFromRowId = dateFromObjectId(row?._id);
  if (dFromRowId) return fmt.format(dFromRowId);

  return "-";
}

function getItems(row) {
  if (Array.isArray(row?.respuestas)) return row.respuestas;
  if (Array.isArray(row?.respuesta?.respuestas))
    return row.respuesta.respuestas;
  return [];
}

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
        {respuestas.map((r, i) => {
          const fechaOk = formatFechaFromRow(r);
          const items = getItems(r);

          return (
            <tr key={i}>
              <td>{r.encuestaNombre}</td>
              <td>{r.categoria}</td>
              <td>{fechaOk}</td>
              <td>
                {items.map((resp, j) => (
                  <div key={j}>
                    <strong>{resp.pregunta}</strong>:{" "}
                    {Array.isArray(resp.respuesta)
                      ? resp.respuesta.join(", ")
                      : String(resp.respuesta)}
                  </div>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
