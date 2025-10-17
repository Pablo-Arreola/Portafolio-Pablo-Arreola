import { Link } from "react-router-dom";
import {
  motion,
  cubicBezier,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import "../App.css";


const MotionLink = motion(Link);

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

// Para encabezado y estadísticas
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};


function StatCount({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { amount: 0.6 });

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) mv.set(to);
    else mv.set(0);
  }, [inView, to, mv]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

type Task = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  link?: string | null;
  repo?: string | null; 
  desp?: string | null; 
};

const tasksData: Task[] = [
  {
    id: 1,
    title: "Glosario Desarrollo Web",
    description:
      "Esta es una tarea nos ayuda a comprender el significado de cada sigla que vimos en la clase.",
    imageUrl: "/imagenes/glosario.jpg",
    link: "/glosario",
    repo: null,
    desp: null,
  },
  {
    id: 2,
    title: "Formulario de Registro actualización de datos",
    description:
      "Esta tarea se utilizaron los diferentes input para generar un formulario.",
    imageUrl: "/imagenes/formulario.png",
    
    repo: "https://github.com/Pablo-Arreola/Formulario.git",
    desp: "https://formulario-alpha-one.vercel.app/",
  },
  {
    id: 3,
    title: "Página con aplicaciones responsivas",
    description: "Implementación de diseño responsive con CSS Grid y Flexbox.",
    imageUrl: "/imagenes/responsiva.png",
    link: null,
    repo: "https://github.com/Pablo-Arreola/pagina-responsiva.git",
    desp: null,
  },

    {
    id: 4,
    title: "API de Gestiones",
    description: "Realizacion de CRUD Expedientes, Indicios y usuario utilizando TypeScript, nodejs, sql server y docker",
    imageUrl: "/imagenes/api.jpg",
    link: null,
    repo: "https://github.com/Pablo-Arreola/Gestor.git",
    desp: null,
  },

  {
    id: 5,
    title: "Frontend de API",
    description: "Interfaz de la API de gestiones  utilizando React (Vite + TypeScript), TailwindCSS, Heroicons, Auth Context y SweetAlert2",
    imageUrl: "/imagenes/frontendapi.png",
    link: null,
    repo: "https://github.com/Pablo-Arreola/Tarea-Frontend.git",
    desp: null,
  },

  {
    id: 6,
    title: "Certificación FreeCodeCamp",
    description: "Certificación de FreeCodeCamp en Frontend Development Libraries",
    imageUrl: "/imagenes/Certificado.jpg.png",
    link: "https://www.freecodecamp.org/certification/fcc-dc106be3-24c0-4fe9-8e20-3df4694d8668/front-end-development-libraries",
    repo: null,
    desp: null,
  }
];

/* ====================== Íconos SVG ====================== */
const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const CodeIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

/* ====================== Página ====================== */
const TasksPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-teal-900/20 text-white p-6">
      {/* Partículas fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-30" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-50" />
      </div>

      {/* Encabezado */}
      <motion.div
        className="relative z-10 text-center mb-16"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-8 shadow-2xl"
          variants={item}
        >
          <GitHubIcon className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
          variants={item}
        >
          Mis Proyectos y Certificaciones
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          variants={item}
        >
          Explora mi portafolio de proyectos de desarrollo web y certificaciones
        </motion.p>

       
      </motion.div>

      {/* Grid de tarjetas */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.25 }}
      >
        {tasksData.map((task) => (
          <motion.div
            key={task.id}
            className="group relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-500/20"
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Glow decorativo */}
            <motion.div
              className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"
              aria-hidden
            />

            <div className="relative">
              {task.imageUrl ? (
                <motion.div
                  className="mb-6 rounded-xl overflow-hidden relative"
                  variants={itemUp}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                >
                  <img
                    src={task.imageUrl}
                    alt={task.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="pointer-events-none absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-150" />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="mb-6 rounded-xl h-48 bg-gradient-to-br from-gray-700/50 to-gray-600/50 flex items-center justify-center border border-gray-600 group-hover:border-teal-500/50 transition-colors duration-300"
                  variants={itemUp}
                >
                  <div className="text-center">
                    <GitHubIcon className="w-16 h-16 text-gray-400 group-hover:text-teal-400 transition-colors duration-300 mx-auto mb-2" />
                    <span className="text-xs text-gray-500 group-hover:text-teal-400 transition-colors duration-300">
                      Repositorio GitHub
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Contenido */}
              <motion.div className="flex-1" variants={itemUp}>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                  {task.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {task.description}
                </p>
              </motion.div>

              {/* Botones de acción */}
              <motion.div className="flex flex-col gap-3" variants={itemUp}>
                {task.repo && (
                  <motion.a
                    href={task.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 border border-gray-600 hover:border-gray-400"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GitHubIcon className="w-5 h-5" />
                    <span>Ver Repositorio</span>
                    <ExternalLinkIcon className="w-4 h-4 opacity-70" />
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </motion.a>
                )}

                {task.link && (
                  <MotionLink
                    to={task.link}
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 border border-blue-500/50 hover:border-teal-400/50"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CodeIcon className="w-5 h-5" />
                    <span>Ver tarea</span>
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </MotionLink>
                )}

                {task.desp && (
                  <motion.a
                    href={task.desp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-gray-900 font-bold py-3 px-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30 border-2 border-blue-300 hover:border-cyan-400 group"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="text-sm">VER DESPLIEGUE</span>
                    <ExternalLinkIcon className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-all" />
                    <span className="pointer-events-none absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Estadísticas */}
      <motion.div
  className="relative z-10 max-w-6xl mx-auto mt-24 p-10 rounded-3xl bg-gradient-to-r from-cyan-900/40 to-cyan-800/40 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.3)]"
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ amount: 0.35, once: true }}
>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
    {/* === Tareas Completadas === */}
    <motion.div className="space-y-3" variants={item}>
      <div className="text-5xl font-extrabold text-cyan-400 tracking-tight">
        <StatCount to={tasksData.length} />
      </div>
      <div className="text-cyan-300 text-base md:text-lg font-medium">
        Tareas Completadas
      </div>
    </motion.div>

    {/* === Horas de Desarrollo === */}
    <motion.div className="space-y-3" variants={item}>
      <div className="text-5xl font-extrabold text-cyan-400 tracking-tight">
        <StatCount to={60} />
      </div>
      <div className="text-cyan-300 text-base md:text-lg font-medium">
        Horas de Desarrollo
      </div>
    </motion.div>

    {/* === Certificaciones === */}
    <motion.div className="space-y-3" variants={item}>
      <div className="text-5xl font-extrabold text-cyan-400 tracking-tight">
        <StatCount to={1} />
      </div>
      <div className="text-cyan-300 text-base md:text-lg font-medium">
        Certificaciones Obtenidas
      </div>
    </motion.div>
  </div>
</motion.div>


     
    </div>
  );
};

export default TasksPage;
