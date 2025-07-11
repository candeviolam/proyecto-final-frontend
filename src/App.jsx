import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Encuesta from "./pages/Encuesta";
import RutaProtegidaAdmin from "./components/RutaProtegidaAdmin";
import EncuestasAdmin from "./pages/EncuestasAdmin";
import CategoriasAdmin from "./pages/CategoriasAdmin";
import EncuestasPorCategoria from "./pages/EncuestasPorCategoria";
import ComponenteNavbar from "./components/Navbar";
import TodasLasEncuestas from "./components/TodasLasEncuestas";
import Pagina404 from "./components/Pagina404";
import Footer from "./components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/global.css";
import "./styles/index.css";

function App() {
  const [autenticado, setAutenticado] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setAutenticado(true);
      const datosToken = JSON.parse(atob(token.split(".")[1]));
      setRol(datosToken.rol);
    } else {
      setAutenticado(false);
      setRol("");
    }
  }, []);

  if (autenticado === null || rol === null) {
    return <p>Cargando...</p>;
  }

  return (
    <BrowserRouter>
      <div className="layout-principal">
        <ComponenteNavbar
          autenticado={autenticado}
          setAutenticado={setAutenticado}
          rol={rol}
        />

        <main className="contenido-principal">
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
            <Route
              path="/categoria/:nombre"
              element={<EncuestasPorCategoria />}
            />
            <Route path="/todas" element={<TodasLasEncuestas />} />
            <Route path="*" element={<Pagina404 />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
