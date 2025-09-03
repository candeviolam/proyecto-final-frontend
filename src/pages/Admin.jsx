import GraficoRespuestas from "../components/GraficoRespuestas";
import EstadisticasAdmin from "../components/EstadisticasAdmin";
import { Link } from "react-router-dom";
import "../styles/admin.css";

export default function Admin() {
  return (
    <main className="admin-main">
      <nav className="menu-admin-horizontal">
        <Link to="/admin/encuestas" className="link-admin-horizontal">
          Encuestas
        </Link>
        <Link to="/admin/categorias" className="link-admin-horizontal">
          Categorías
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-6 mt-3">Panel de administración</h1>

      <EstadisticasAdmin />

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Respuestas de la semana</h2>
        <GraficoRespuestas />
      </section>
    </main>
  );
}
