# 📊 Encuestas Online - Frontend

Aplicación web para crear y responder encuestas, desarrollada en React.js con React Router y Bootstrap.

---

## Funcionalidades principales

- Página principal con encuestas destacadas.
- Respuesta a encuestas anónimamente o con email.
- Registro de nuevos usuarios.
- Inicio de sesión de administrador.
- Panel administrativo:
  - Creación, edición y eliminación de encuestas.
  - Creación y gestión de categorías.
  - Visualización de estadísticas y respuestas.
  - Tabla de usuarios registrados.
- Gráficas de datos.
- Rutas protegidas con autenticación JWT.
- Diseño responsive.

---

## Tecnologías usadas

- React.js
- React Router DOM
- Axios
- Bootstrap
- Recharts

---

## Configuración del entorno

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/candeviolam/proyecto-final-frontend.git

   ```

2. **Instalar dependencias:**

```bash
npm install
```

3. Crear un archivo .env en la raíz con el siguiente contenido:
   VITE_API_URL=http://localhost:4000/api

---

## Levantar la aplicación en local

```bash
npm run dev
```

La aplicación se ejecutará en http://localhost:5173 por defecto.

## Estructura de carpetas

/src
/components Componentes reutilizables
/pages Vistas principales
/services Configuración de Axios
/styles Hojas de estilos
App.jsx Rutas principales
main.jsx Punto de entrada

## Usuario administrador por defecto

Email: admin@admin.com
Contraseña: superadmin123

## Enlaces útiles

Frontend en producción: [URL_FRONTEND]
Backend en producción: [URL_BACKEND]
Tablero Trello: [URL_TRELLO]
Diseño Figma: [URL_FIGMA]
