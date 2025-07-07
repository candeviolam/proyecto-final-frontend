import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "../services/api";

export default function GraficoRespuestasEncuesta({ encuestaId }) {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resp = await axios.get(`/encuesta/${encuestaId}/respuestas`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Contar cuántas respuestas tiene cada pregunta
        const conteoPorPregunta = {};

        resp.data.forEach((respuesta) => {
          respuesta.respuestas.forEach((r) => {
            const pregunta = r.pregunta;
            if (!conteoPorPregunta[pregunta]) {
              conteoPorPregunta[pregunta] = 0;
            }
            conteoPorPregunta[pregunta]++;
          });
        });

        const datosFormateados = Object.entries(conteoPorPregunta).map(
          ([pregunta, cantidad]) => ({
            pregunta,
            cantidad,
          })
        );

        setData(datosFormateados);
      } catch (err) {
        console.error(err);
        setError("Error al cargar datos de la encuesta");
      } finally {
        setCargando(false);
      }
    };

    if (encuestaId) {
      obtenerDatos();
    }
  }, [encuestaId]);

  if (cargando) return <p>Cargando gráfico...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="pregunta" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="cantidad" fill="var(--color-success)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
