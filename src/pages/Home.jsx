import { useState, useEffect } from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../services/api";
import { obtenerImagenFondo } from "../utils/obtenerImagenFondo";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/global.css";

export default function Home() {
  const [logueada, setLogueada] = useState(false);
  const [encuestasDestacadas, setEncuestasDestacadas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarScroll, setMostrarScroll] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogueada(true);
    }
  }, []);

  useEffect(() => {
    const obtenerDestacadas = async () => {
      try {
        const resp = await axios.get("/encuesta/activas");
        const mezcladas = resp.data.sort(() => 0.5 - Math.random());
        setEncuestasDestacadas(mezcladas.slice(0, 3));
      } catch (error) {
        console.error("Error al obtener encuestas destacadas", error);
      }
    };
    obtenerDestacadas();
  }, []);

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

  useEffect(() => {
    const manejarScroll = () => {
      setMostrarScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  const limpiarTitulo = (nombre) => {
    if (!nombre) return "";
    const limpio = nombre.replace(/^Encuesta (de|sobre)\s*/i, "").trim();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
  };

  return (
    <Container className="mt-5">
      <div className="banner-home">
        <h1>Bienvenido a Encuestas Online</h1>
      </div>

      {logueada && (
        <p className="text-success text-center mb-4">Sesión iniciada</p>
      )}

      <section className="encuestas-destacadas mt-5">
        <h2 className="titulo-categorias">Encuestas destacadas</h2>
        <Carousel interval={5000} fade indicators>
          {encuestasDestacadas.map((encuesta) => (
            <Carousel.Item key={encuesta._id}>
              <div className="carousel-slide-content d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="carousel-text p-4">
                  <h3>{limpiarTitulo(encuesta.nombre)}</h3>
                  <p className="descripcion-encuesta">
                    {encuesta.descripcion && encuesta.descripcion.trim() !== ""
                      ? encuesta.descripcion
                      : `Participá en esta encuesta sobre ${encuesta.categoria}.`}
                  </p>
                  <Button
                    as={Link}
                    to={`/encuesta/${encuesta._id}`}
                    className="boton-comenzar mt-2"
                  >
                    Responder Encuesta
                  </Button>
                </div>
                <div
                  className="carousel-image"
                  style={{
                    backgroundImage: `url(${obtenerImagenFondo({
                      categoria: encuesta.categoria,
                      nombreEncuesta: encuesta.nombre,
                    })})`,
                  }}
                ></div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

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
}
