import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/global.css";

const Home = () => {
  const [logueada, setLogueada] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [mostrarScroll, setMostrarScroll] = useState(false);

  // Obtener token para mostrar mensaje si hay sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogueada(true);
    }
  }, []);

  // Obtener categorías dinámicamente
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const resp = await axios.get("/categoria/obtener");
        const activas = resp.data.filter((c) => c.estado);
        setCategorias(activas);
      } catch (error) {
        console.error("Error al obtener categorías", error);
      }
    };

    obtenerCategorias();
  }, []);

  // Mostrar botón scroll-top
  useEffect(() => {
    const manejarScroll = () => {
      setMostrarScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  return (
    <Container className="mt-5">
      <div className="banner-home">
        <h1>Bienvenido a Encuestas Online</h1>
      </div>

      {logueada && (
        <p className="text-success text-center mb-4">Sesión iniciada</p>
      )}

      <section className="categorias-destacadas">
        <h2 className="titulo-categorias">Categorías</h2>
        <div className="contenedor-categorias">
          {categorias.map((categoria) => (
            <Link
              key={categoria._id}
              to={`/categoria/${categoria.nombre}`}
              className="categoria-box"
            >
              <h3>{categoria.nombre}</h3>
              <p>Explorá encuestas de esta categoría.</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/todas" className="btn btn-todas-encuestas">
            Ver todas las encuestas
          </Link>
        </div>
      </section>

      {mostrarScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scroll-top"
        >
          ↑
        </button>
      )}
    </Container>
  );
};

export default Home;
