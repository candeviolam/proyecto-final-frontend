import React, { useState } from "react";
import ModalLogin from "../components/ModalLogin";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="contenedor text-center mt-5">
      <h1>Bienvenido a Encuestas Online</h1>
      <p>Explora y responde encuestas de manera fácil y rápida.</p>
      <button className="btn btn-primary" onClick={handleShowModal}>
        Iniciar Sesión / Registrarse
      </button>

      {/*Modal de Login/Registro*/}
      <ModalLogin show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Home;
