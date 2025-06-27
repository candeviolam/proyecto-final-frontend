import { useState } from "react";
import { Button } from "react-bootstrap";
import SidebarAdmin from "../components/SidebarAdmin";
import TarjetaResumen from "../components/TarjetaResumen";
import GraficoRespuestas from "../components/GraficoRespuestas";
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TarjetaResumen
            titulo="Encuestas"
            cantidad={12}
            claseColor="bg-color-primary"
          />
          <TarjetaResumen
            titulo="Categorías"
            cantidad={5}
            claseColor="bg-color-secondary"
            textoOscuro
          />
          <TarjetaResumen
            titulo="Respuestas"
            cantidad={87}
            claseColor="bg-color-success"
          />
          <TarjetaResumen
            titulo="Usuarios únicos"
            cantidad={34}
            claseColor="bg-color-accent"
            textoOscuro
          />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Respuestas de la semana</h2>
          <GraficoRespuestas />
        </section>

        <Button className="boton-principal mt-4" href="/admin/encuestas">
          Administrar Encuestas
        </Button>
      </main>
    </div>
  );
}
