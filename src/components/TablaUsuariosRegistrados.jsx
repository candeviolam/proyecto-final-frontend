import { Table } from "react-bootstrap";

export default function TablaUsuariosRegistrados({
  usuarios,
  mostrarFecha = false,
}) {
  if (!usuarios || usuarios.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  const mostrarColFecha = mostrarFecha && usuarios.some((u) => u?.createdAt);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          {mostrarColFecha && <th>Fecha de registro</th>}
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <tr key={u._id}>
            <td>{u.nombre}</td>
            <td>{u.email}</td>
            <td>{u.rol}</td>
            {mostrarColFecha && (
              <td>
                {u.createdAt
                  ? new Date(u.createdAt).toLocaleString("es-AR")
                  : "-"}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
