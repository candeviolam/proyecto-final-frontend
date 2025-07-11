# 📊 Encuestas Online - Frontend

Aplicación web para crear y responder encuestas, desarrollada en React.js con React Router y Bootstrap.

---

## Objetivo

Permitir a un administrador gestionar encuestas y a usuarios responderlas de forma anónima o con correo electrónico.

---

## Funcionalidades principales

- Página principal con encuestas destacadas y categorías.
- Respuesta de encuestas anónimas o con email.
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

## Instalación y configuración

1. **Clonar el repositorio:**
   git clone https://github.com/candeviolam/proyecto-final-frontend.git

2. **Instalar dependencias:**
   npm install

3. **Crear un archivo .env en la raíz con:**
   VITE_API_URL=http://localhost:4000/api

---

4. **Levantar/ejecutar la aplicación:**
   npm run dev
La aplicación se ejecutará en http://localhost:5173 por defecto.

---

## Estructura del proyecto

/public            Imágenes 
/src
   /components     Componentes reutilizables
   /pages          Páginas principales
   /services       Configuración de Axios
   /styles         Hojas de estilos
   App.jsx         Rutas principales
   main.jsx        Punto de entrada
.env               Variables de entorno (URL de la API)
index.html         HTML base de la aplicación

---

## Usuario administrador por defecto

Email: admin@admin.com
Contraseña: superadmin123

---

## Enlaces

Frontend: [URL_FRONTEND]
Backend: [URL_BACKEND]
Tablero Trello: [URL_TRELLO]
Diseño Figma: [URL_FIGMA]
