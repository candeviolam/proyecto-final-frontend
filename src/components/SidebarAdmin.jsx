import { Link } from "react-router-dom";
import "../styles/admin.css";

export default function SidebarAdmin({ mostrar, cerrar }) {
  return (
    <aside className={`sidebar ${mostrar ? "mostrar" : ""}`}>
      {/*Solo se ve el botón de cerrar en pantallas chicas*/}
      <button className="cerrar-sidebar solo-mobile" onClick={cerrar}>
        ✖
      </button>

      <nav className="flex flex-col space-y-4">
        <Link to="/admin" className="link-admin">
          Inicio admin
        </Link>
        <Link to="/admin/encuestas" className="link-admin">
          Encuestas
        </Link>
        <Link to="/admin/categorias" className="link-admin">
          Categorías
        </Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="link-admin cerrar"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
