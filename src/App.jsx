//Componente principal

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import RutaProtegida from "./components/RutaProtegida";
import ComponenteNavbar from "./components/Navbar";

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
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
