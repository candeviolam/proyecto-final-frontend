//Componente principal

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Encuesta from "./pages/Encuesta";
import RutaProtegida from "./components/RutaProtegida";
import RutaProtegidaAdmin from "./components/RutaProtegidaAdmin";
import EncuestasAdmin from "./pages/EncuestasAdmin";
import CategoriasAdmin from "./pages/CategoriasAdmin";
import EncuestasPorCategoria from "./pages/EncuestasPorCategoria";
import ComponenteNavbar from "./components/Navbar";
import TodasLasEncuestas from "./components/TodasLasEncuestas";
import "./styles/global.css";
import "./styles/index.css";

function App() {
  const [autenticado, setAutenticado] = useState(false);

  //Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAutenticado(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <ComponenteNavbar
        autenticado={autenticado}
        setAutenticado={setAutenticado}
      />{" "}
      {/*Navbar en todas las páginas*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encuesta/:id" element={<Encuesta />} />
        <Route
          path="/admin"
          element={
            <RutaProtegidaAdmin>
              <Admin />
            </RutaProtegidaAdmin>
          }
        />
        <Route
          path="/admin/encuestas"
          element={
            <RutaProtegidaAdmin>
              <EncuestasAdmin />
            </RutaProtegidaAdmin>
          }
        />
        <Route
          path="/admin/categorias"
          element={
            <RutaProtegidaAdmin>
              <CategoriasAdmin />
            </RutaProtegidaAdmin>
          }
        />
        <Route path="/categoria/:nombre" element={<EncuestasPorCategoria />} />
        <Route path="/todas" element={<TodasLasEncuestas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
