export default function TarjetaResumen({
  titulo,
  cantidad,
  claseColor,
  textoOscuro,
}) {
  return (
    <div className={`rounded-xl shadow-md p-6 text-center ${claseColor}`}>
      <h3
        className={`text-lg font-semibold ${
          textoOscuro ? "text-oscuro" : "text-white"
        }`}
      >
        {titulo}
      </h3>
      <p
        className={`text-3xl font-bold ${
          textoOscuro ? "text-oscuro" : "text-white"
        }`}
      >
        {cantidad}
      </p>
    </div>
  );
}
