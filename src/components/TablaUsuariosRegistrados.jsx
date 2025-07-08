import { Table } from "react-bootstrap";

export default function TablaUsuariosRegistrados({ usuarios }) {
  if (!usuarios || usuarios.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Fecha de registro</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <tr key={u._id}>
            <td>{u.nombre}</td>
            <td>{u.email}</td>
            <td>{u.rol}</td>
            <td>{new Date(u.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
