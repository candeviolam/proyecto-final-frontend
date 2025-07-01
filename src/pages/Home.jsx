import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/global.css";

const Home = () => {
  const [logueada, setLogueada] = useState(false);
  //Estado para almacenar las encuestas
  const [encuestas, setEncuestas] = useState([]);
  const [mostrarScroll, setMostrarScroll] = useState(false);

  //Manejar clic en una encuesta
  const manejarClicEncuesta = (id) => {
    //Redirigir a la página de la encuesta
    window.location.href = `/encuesta/${id}`;
  };

  //Obtener encuestas activas desde el backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogueada(true);
    }

    const obtenerEncuestas = async () => {
      try {
        const respuesta = await axios.get("/encuesta/activas");
        setEncuestas(respuesta.data);
      } catch (error) {
        console.error("Error al obtener encuestas", error);
      }
    };

    obtenerEncuestas();
  }, []);

  useEffect(() => {
    const manejarScroll = () => {
      if (window.scrollY > 100) {
        setMostrarScroll(true);
      } else {
        setMostrarScroll(false);
      }
    };

    window.addEventListener("scroll", manejarScroll);

    return () => {
      window.removeEventListener("scroll", manejarScroll);
    };
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
          <Link to="/categoria/Libros" className="categoria-box">
            <h3>Libros</h3>
            <p>Encuestas sobre hábitos y géneros literarios.</p>
          </Link>
          <Link to="/categoria/Música" className="categoria-box">
            <h3>Música</h3>
            <p>Comparte tu pasión y costumbres musicales.</p>
          </Link>
          <Link to="/categoria/Deporte" className="categoria-box">
            <h3>Deporte</h3>
            <p>Participá contando tu actividad física.</p>
          </Link>
          <Link to="/categoria/Mascotas" className="categoria-box">
            <h3>Mascotas</h3>
            <p>Contanos sobre tus animales y sus cuidados.</p>
          </Link>
          <Link
            to="/categoria/Hábitos y Bienestar Personal"
            className="categoria-box"
          >
            <h3>Hábitos y Bienestar Personal</h3>
            <p>Explorá tu día a día y bienestar emocional.</p>
          </Link>
          <Link to="/categoria/Alimentación" className="categoria-box">
            <h3>Alimentación</h3>
            <p>Compartí tus hábitos y preferencias alimenticias.</p>
          </Link>
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
