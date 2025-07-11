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

/public              Imágenes
/src
   /components       Componentes reutilizables
   /pages            Páginas principales
   /services         Configuración de Axios
   /styles           Hojas de estilos
   /utils			       Funciones auxiliares
   App.jsx           Rutas principales
   main.jsx          Punto de entrada
.env                 Variables de entorno (URL de la API)
index.html           HTML base de la aplicación

---

## Usuario administrador por defecto

Email: admin@admin.com
Contraseña: superadmin123

---

## Enlaces

Frontend: https://encuestas-online.netlify.app/
Backend: https://encuestas-online.onrender.com
Tablero Trello: https://trello.com/b/HGkI7SfI/trabajo-final-encuestas-online
Diseño Figma: https://www.figma.com/design/d9pfdnP1MaTGFArkRtpuo9/Encuestas-Online?node-id=0-1&t=s4CW89JL9gWomPov-1
