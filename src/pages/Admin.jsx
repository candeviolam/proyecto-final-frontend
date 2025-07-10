import { useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import GraficoRespuestas from "../components/GraficoRespuestas";
import EstadisticasAdmin from "../components/EstadisticasAdmin";
import "../styles/admin.css";

export default function Admin() {
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  return (
    <div className="admin-layout">
      <SidebarAdmin
        mostrar={mostrarSidebar}
        cerrar={() => setMostrarSidebar(false)}
      />

      <main className="admin-main">
        <button
          className="boton-hamburguesa"
          onClick={() => setMostrarSidebar(true)}
        >
          ☰
        </button>

        <h1 className="text-3xl font-bold mb-6">Panel de administración</h1>

        <EstadisticasAdmin />

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Respuestas de la semana</h2>
          <GraficoRespuestas />
        </section>
      </main>
    </div>
  );
}
