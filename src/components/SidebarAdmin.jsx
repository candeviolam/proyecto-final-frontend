import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <aside className="fixed top-16 left-0 w-64 h-full bg-gray-800 text-white p-6 shadow-lg z-40">
      <h2 className="text-2xl font-bold mb-8 text-center">Panel Admin</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/admin" className="block px-4 py-2 rounded hover:text-purple-700 transition">
          Inicio
        </Link>
        <Link
          to="/admin/encuestas"
          className="block px-4 py-2 rounded hover:text-purple-700 transition"
        >
          Encuestas
        </Link>
        <Link
          to="/admin/categorias"
          className="block px-4 py-2 rounded hover:text-purple-700 transition"
        >
          Categorías
        </Link>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="text-left block px-4 py-2 rounded hover:text-red-600 transition"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
