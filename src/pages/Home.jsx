import { useState, useEffect } from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/global.css";

const Home = () => {
  const [logueada, setLogueada] = useState(false);
  const [encuestasDestacadas, setEncuestasDestacadas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarScroll, setMostrarScroll] = useState(false);

  // Obtener token para mostrar mensaje si hay sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogueada(true);
    }
  }, []);

  //Obtener encuestas activas aleatoriamente
  useEffect(() => {
    const obtenerDestacadas = async () => {
      try {
        const resp = await axios.get("/encuesta/activas");
        const todas = resp.data;

        // Mezclar el array y tomar 3
        const mezcladas = todas.sort(() => 0.5 - Math.random());
        setEncuestasDestacadas(mezcladas.slice(0, 3));
      } catch (error) {
        console.error("Error al obtener encuestas destacadas", error);
      }
    };

    obtenerDestacadas();
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

  // Para obtener imagen de fondo
  const obtenerImagenFondo = (nombreEncuesta) => {
    const nombre = nombreEncuesta?.toLowerCase() || "";

    if (nombre.includes("bienestar")) return "/fondo-bienestar.jpeg";
    if (nombre.includes("lectura")) return "/fondo-libros.jpeg";
    if (nombre.includes("géneros literarios")) return "/fondo-libros.jpeg";
    if (nombre.includes("música")) return "/fondo-musica.jpeg";
    if (nombre.includes("conciertos")) return "/fondo-musica.jpeg";
    if (nombre.includes("series") || nombre.includes("películas"))
      return "/fondo-pantallas.jpeg";
    if (nombre.includes("pasatiempos")) return "/fondo-estilo-vida.jpeg";
    if (nombre.includes("viajes") || nombre.includes("turismo"))
      return "/fondo-viajes.jpeg";
    if (nombre.includes("tecnología")) return "/fondo-tecnologia.jpeg";
    if (nombre.includes("medio ambiente")) return "/fondo-medio-ambiente.jpeg";
    if (nombre.includes("universitaria")) return "/fondo-educacion.jpeg";
    if (nombre.includes("deporte")) return "/fondo-deporte.jpeg";
    if (nombre.includes("perros") || nombre.includes("gatos"))
      return "/fondo-mascotas.jpeg";
    if (nombre.includes("alimentación") || nombre.includes("recetas"))
      return "/fondo-alimentacion.jpeg";

    return "/fondo-generico.jpg";
  };

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
        <Carousel interval={5000} fade indicators={true}>
          {encuestasDestacadas.map((encuesta) => (
            <Carousel.Item key={encuesta._id}>
              <div className="carousel-slide-content d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="carousel-text p-4">
                  <h3>{limpiarTitulo(encuesta.nombre)}</h3>
                  <p>
                    {encuesta.descripcion || (
                      <>
                        Participá en esta encuesta sobre{" "}
                        <strong>{encuesta.categoria}</strong>.
                      </>
                    )}
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
                    backgroundImage: `url(${obtenerImagenFondo(
                      encuesta.nombre
                    )})`,
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
};

export default Home;
