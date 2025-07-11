export function obtenerImagenFondo({ categoria, nombreEncuesta }) {
  const nombre = nombreEncuesta?.toLowerCase() || "";
  const cat = categoria?.toLowerCase() || "";

  if (nombre.includes("bienestar")) return "/fondo-bienestar.jpeg";
  if (nombre.includes("lectura")) return "/fondo-libros.jpeg";
  if (nombre.includes("géneros literarios")) return "/fondo-libros.jpeg";
  if (nombre.includes("música")) return "/fondo-musica.jpeg";
  if (nombre.includes("conciertos")) return "/fondo-musica.jpeg";
  if (nombre.includes("series") || nombre.includes("películas"))
    return "/fondo-seriesypeliculas.jpeg";
  if (nombre.includes("viajes") || nombre.includes("turismo"))
    return "/fondo-viajesyturismo.jpeg";

  if (cat.includes("cultura")) return "/fondo-libros.jpeg";
  if (cat.includes("estilo de vida")) return "/fondo-bienestar.jpeg";
  if (cat.includes("tecnología")) return "/fondo-tecnologia.jpeg";
  if (cat.includes("medioambiente") || cat.includes("medio ambiente"))
    return "/fondo-medioambiente.jpeg";
  if (cat.includes("educacion") || cat.includes("educación"))
    return "/fondo-educacion.jpeg";
  if (cat.includes("mascotas")) return "/fondo-mascotas.jpeg";
  if (cat.includes("deportes") || cat.includes("deporte"))
    return "/fondo-deporte.jpeg";
  if (cat.includes("alimentación")) return "/fondo-alimentacion.jpeg";

  return "/fondo-generico.jpeg";
}
