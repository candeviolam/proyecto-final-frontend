export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f0f0f0",
        color: "#333",
        textAlign: "center",
        padding: "1rem",
        marginTop: "2rem",
      }}
    >
      <hr style={{ margin: "0.5rem 0" }} />
      <p style={{ margin: "0.2rem" }}>Encuestas Online © 2025</p>
      <p style={{ margin: "0.2rem" }}>
        <i className="bi bi-envelope-fill" style={{ marginRight: "5px" }}></i>
        encuestas.online.app@gmail.com
      </p>
      <hr style={{ margin: "0.5rem 0" }} />
    </footer>
  );
}
