//Componente principal

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import RutaProtegida from "./components/RutaProtegida";
import ComponenteNavbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ComponenteNavbar /> {/*Navbar en todas las páginas*/}
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
