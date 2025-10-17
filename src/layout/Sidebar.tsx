import { Link } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";

export interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const menuItems = [
    { path: "/", label: "Inicio", icon: <FaHome className="text-xl min-w-[20px]" /> },
    { path: "/tareas", label: "Tareas", icon: <FaTasks className="text-xl min-w-[20px]" /> },
  ];

  return (
    <aside
      id="sidebar"
      className={[
        // Colocada a la derecha (fixed/pegada)
        "hidden md:flex md:flex-col md:shrink-0 md:sticky md:top-0 z-40",
        // Fondo con degradado cian
        "bg-gradient-to-b from-cyan-900/60 via-cyan-800/60 to-cyan-950/70 text-cyan-100",
        "h-screen shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden",
        "transition-all duration-300 ease-in-out",
        // Ancho dinámico
        isSidebarOpen ? "md:w-64" : "md:w-20",
        // Alinear al lado derecho
        "order-last md:border-l border-cyan-400/30",
      ].join(" ")}
      aria-label="Barra lateral de navegación"
    >
      {/* Header del sidebar */}
      <div className="flex items-center justify-end gap-4 px-6 py-4 border-b border-cyan-500/30 bg-cyan-950/40">
        <h2
          className={`text-2xl font-semibold text-cyan-300 whitespace-nowrap transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          MENÚ
        </h2>

        <button
          onClick={toggleSidebar}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-cyan-700/30 border border-cyan-500/40 hover:bg-cyan-600/30 hover:border-cyan-400 transition-all duration-300"
          aria-label={isSidebarOpen ? "Colapsar menú" : "Expandir menú"}
          aria-expanded={isSidebarOpen} // ✅ corregido (booleano real)
          aria-controls="sidebar"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`block w-full h-0.5 bg-cyan-300 rounded-sm transition-all duration-300 origin-center ${
                isSidebarOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-cyan-300 rounded-sm transition-all duration-300 ${
                isSidebarOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-cyan-300 rounded-sm transition-all duration-300 origin-center ${
                isSidebarOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="
                  text-cyan-200 no-underline font-medium py-4 px-6 flex items-center gap-4
                  transition-all duration-300 border-r-[3px] border-transparent
                  hover:bg-cyan-700/20 hover:border-cyan-400 hover:text-cyan-100 hover:translate-x-1
                "
              >
                {item.icon}
                <span
                  className={`text-base tracking-wide transition-opacity duration-300 ${
                    isSidebarOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
