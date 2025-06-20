import SidebarAdmin from "../components/SidebarAdmin";
import TarjetaResumen from "../components/TarjetaResumen";
import GraficoRespuestas from "../components/GraficoRespuestas";

export default function Admin() {
  return (
    <div className="flex">
      <SidebarAdmin />

      <main className="flex-1 ml-64 pt-20 p-6 bg-gray-100 min-h-screen overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-6">Panel de administración</h1>

        {/*Acá van a ir las tarjetas de resumen y otros componentes*/}
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
      </main>
    </div>
  );
}
