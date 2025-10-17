import React, { useEffect, useState } from "react";
import {
  FaBrain,
  FaGraduationCap,
  FaLightbulb,
  FaRocket,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaArrowDown,
  FaLaptopCode,
  FaBriefcase,
   FaDocker,
   FaFolderOpen,
    FaMicrochip,
} from "react-icons/fa";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { Link } from "react-router-dom";
import RevealSection from "../components/RevealSection";
import { motion } from "framer-motion";
import { containerStagger } from "../animation/variants";

// ===== Animaciones (CSS-in-JS) =====
const ANIM_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .float-slow { animation: floatY 7s ease-in-out infinite; }
  .float-delay { animation: floatY 8.5s ease-in-out infinite 1.2s; }
  .tilt-hover { transition: transform .35s ease; }
  .tilt-hover:hover { transform: perspective(900px) rotateX(2deg) rotateY(-2deg) scale(1.02); }
  .kenburns { overflow: hidden; }
  .kenburns > img { transform-origin: center; animation: kenburns 12s ease-in-out infinite alternate; }
  .parallax-1 { transform: translateY(var(--parallax, 0px)); will-change: transform; }

  @keyframes floatY {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  @keyframes kenburns {
    0% { transform: scale(1); }
    100% { transform: scale(1.06); }
  }
}
`;

// ====== Componentes Reutilizables ======
const GlassCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <motion.div
    className={`relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/40 via-white/10 to-white/5 shadow-2xl shadow-black/20 ${className}`}
    initial={{ opacity: 0, y: 20, scale: 0.97 }}  // entrada discreta
    whileInView={{ opacity: 1, y: 0, scale: 1 }} // reveal elegante
    viewport={{ amount: 0.25 }}                  // se repite cada vez que entra
    transition={{
      type: "spring",
      stiffness: 120,   // resorte medio
      damping: 22,      // más damping = menos rebote
    }}
    whileHover={{ y: -2, scale: 1.01 }}          // micro interacción
    whileTap={{ scale: 0.99 }}
    style={{ willChange: "transform, opacity" }}
  >
    <motion.div
      className="rounded-[calc(1.5rem-1px)] bg-white/10 backdrop-blur-xl ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white/15 group-hover:ring-white/25"
      layout
    >
      {children}
    </motion.div>
  </motion.div>
);

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  gradient: string;
  title: string;
}> = ({ icon, tag, tagColor, gradient, title }) => (
  <motion.div
    className="space-y-4 md:space-y-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3 }} // 👈 se repite cada vez
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      className="flex items-center gap-3 md:gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.3 }} // 👈 se repite cada vez
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div
        className={`p-2 md:p-3 rounded-full ${gradient} shadow-lg shadow-black/30`}
      >
        {icon}
      </div>
      <span
        className={`${tagColor} font-semibold text-base md:text-lg tracking-wide`}
      >
        {tag}
      </span>
    </motion.div>

    <motion.h2
      className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }} // 👈 se repite cada vez
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {title}{" "}
      <span className="bg-gradient-to-r bg-clip-text text-transparent block">
        {tag}
      </span>
    </motion.h2>
  </motion.div>
);

type GlowVariant = "blue" | "green" | "warm" | "teal" | "white";

const GlowBelow: React.FC<{
  variant?: GlowVariant;
  widthClass?: string;
  heightClass?: string;
  className?: string;
}> = ({
  variant = "white",
  widthClass = "w-[85%]",
  heightClass = "h-16 md:h-20",
  className = "",
}) => {
  const glowClasses = {
    blue: "from-blue-400/35 via-purple-500/20",
    green: "from-green-400/35 via-cyan-400/20",
    warm: "from-amber-300/35 via-orange-400/20",
    teal: "from-cyan-400/35 via-teal-400/20",
    white: "from-white/25 via-gray-300/10",
  };

  return (
    <motion.div
      className={[
        "absolute -bottom-3 left-1/2 -translate-x-1/2",
        widthClass,
        heightClass,
        "pointer-events-none blur-3xl",
        className,
      ].join(" ")}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.3 }} // se repite al entrar
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // timing del reveal
      style={{ willChange: "transform, opacity" }}
    >
      {/* Hijo que pulsa infinito */}
      <motion.div
        className={[
          "w-full h-full bg-gradient-to-t to-transparent blur-3xl pointer-events-none",
          glowClasses[variant],
        ].join(" ")}
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  );
};

// ====== Datos ======
const techStack = [
  { name: "Docker", icon: <FaDocker color="#0db7ed" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178c6" /> },
  { name: "JavaScript", icon: <FaJs color="#f0db4f" /> },
  { name: "HTML5", icon: <FaHtml5 color="#e34c26" /> },
  { name: "CSS3", icon: <FaCss3Alt color="#264de4" /> },
  { name: "React", icon: <FaReact color="#61dafb" /> },
  { name: "Node.js", icon: <FaNodeJs color="#3c873a" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#38bdf8" /> },
   
];

const Homepage: React.FC = () => {
  const [scrollY] = useState(0);
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 👇 placeholder para futura animación o acción
          return;
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Limpieza por buenas prácticas
  return () => observer.disconnect();
}, []);


  const scrollToNext = () =>
    document
      .getElementById("development")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{ANIM_CSS}</style>
      <main className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero Section */}
        <RevealSection
          id="hero"
          direction="up"
          amount={0.2}
          className="relative min-h-[82vh] md:min-h-[88vh] flex items-center justify-center text-center overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-blue-900/20 to-teal-900/20"
        >
          {/* Fondo animado con gradiente y partículas */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-teal-900/20">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${
                  50 + scrollY * 0.05
                }%, rgba(59,130,246,0.35) 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Partículas animadas */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute ${
                  i === 0
                    ? "top-1/4 left-1/4 w-2 h-2 bg-blue-400 animate-pulse"
                    : i === 1
                    ? "top-1/3 right-1/4 w-1 h-1 bg-blue-400 animate-ping"
                    : i === 2
                    ? "bottom-1/3 left-1/3 w-3 h-3 bg-blue-400 animate-bounce"
                    : i === 3
                    ? "bottom-1/4 right-1/3 w-2 h-2 bg-blue-400 animate-pulse"
                    : i === 4
                    ? "top-1/5 right-1/5 w-1.5 h-1.5 bg-purple-400 animate-pulse delay-300"
                    : "bottom-1/5 left-1/5 w-2 h-2 bg-yellow-400 animate-pulse delay-500"
                } rounded-full opacity-${i === 1 ? 40 : i === 2 ? 30 : 50}`}
              />
            ))}
          </div>

          {/* Contenido principal */}
          <motion.div
            className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-10 mx-auto flex flex-col items-center"
            variants={containerStagger}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col items-center w-full max-w-5xl">
              {/* Logo y título */}
              <motion.div
                className="mb-10 md:mb-12"
                initial={{ opacity: 0, y: -80 }} // empieza arriba y oculto
                whileInView={{ opacity: 1, y: 0 }} // baja a su posición
                viewport={{ amount: 0.3 }} // se repite cada vez que entra
                transition={{
                  type: "spring", // animación tipo resorte
                  stiffness: 500, // qué tan fuerte es el resorte
                  damping: 20, // controla el rebote
                  bounce: 0.6, // fuerza del “brinco”
                  duration: 1,
                }}
              >
                <div className="inline-flex items-center gap-3 p-4 rounded-full bg-gradient-to-r  from-blue-600 shadow-2xl">
                  <FaFolderOpen className="text-4xl md:text-5xl text-white" />
                  <span className="text-xl md:text-2xl font-bold text-white">
                    Portafolio de Tareas 
                  </span>
                </div>
              </motion.div>

              {/* Título principal */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 text-center leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="bg-gradient-to-r  from-blue-400 bg-clip-text text-transparent inline-block"
                  animate={{
                    textShadow: [
                      "0px 0px 0px rgba(59,130,246,0)",
                      "0px 0px 12px rgba(59,130,246,0.6)",
                      "0px 0px 0px rgba(59,130,246,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  Soy Pablo Arreola
                </motion.span>
              </motion.h1>

              {/* Subtítulo */}

              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 text-center max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }} // 👈 se repite cada vez que entra
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.span
                  className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent inline-block"
                  animate={{
                    textShadow: [
                      "0px 0px 0px rgba(34,211,238,0)",
                      "0px 0px 10px rgba(34,211,238,0.6)",
                      "0px 0px 0px rgba(34,211,238,0)",
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  Estudiante de Ingeniería en Sistemas en la Universidad Mariano Gálvez De Guatemala
                </motion.span>
              </motion.h2>

              {/* Contenedor de imágenes */}
             {/* ==== Sección de Foto y Universidad ==== */}
{/* ==== Sección Foto y Universidad (responsiva y centrada) ==== */}
<div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-10 sm:gap-12 md:gap-14 mb-12 md:mb-16 w-full">
  {/* Foto */}
  <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
    <div
      className="relative group mb-3 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.3)]"
      style={{ "--parallax": `${scrollY * 0.03}px` } as React.CSSProperties}

    >
      <img
        src= "/imagenes/perfil2.png.png"
        alt="Foto de Pablo Arreola"
        className="w-full h-full object-cover bg-gray-900"
      />
    </div>
    <div className="flex items-center gap-2 text-blue-400">
      <FaLaptopCode className="text-base sm:text-lg" />
      <span className="text-sm sm:text-base font-medium">Desarrollador Web</span>
    </div>
  </div>

  {/* Logo UMG */}
  <div className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
    <div
      className="relative group mb-3 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(20,184,166,0.3)]"
      style={{ "--parallax": `${scrollY * 0.02}px` } as React.CSSProperties}

    >
      <img
        src="/imagenes/Logoumg.png"
        alt="Logo UMG"
        className="w-full h-full object-contain bg-gray-900"
      />
    </div>
    <div className="flex items-center gap-2 text-blue-400">
      <FaGraduationCap className="text-base sm:text-lg" />
      <span className="text-sm sm:text-base font-medium">Universidad Mariano Gálvez</span>
    </div>
  </div>
</div>




              {/* Descripción y botones */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full max-w-4xl">
               <GlassCard className="flex-1">
  <div className="px-8 py-6 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 rounded-3xl backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]">
    <p className="text-lg md:text-xl font-light text-cyan-100 text-center leading-relaxed">
      En el siguiente espacio podrás explorar mis 
      <span className="font-semibold text-cyan-300"> proyectos </span>
      y conocer más sobre mi aprendizaje a lo largo del curso de 
      <span className="font-semibold text-cyan-400"> Desarrollo Web.</span>
    </p>
  </div>
</GlassCard>


                <div className="flex flex-col sm:flex-row md:flex-col gap-4">
                  {/* Botón Verde Neón */}
                  <Link
                    to="/tareas"
                    className="
      inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3
      bg-blue-400 hover:bg-blue-400
      shadow-lg shadow-green-500/30
      transition-all text-base font-bold text-gray-900
      min-w-[180px] border-2 border-indigo-400
      active:scale-95
    "
                  >
                    <FaBriefcase className="text-lg" />
                    <span>Mis Proyectos</span>
                  </Link>

                  {/* Botón Cyan Neón */}
                  <button
                    onClick={scrollToNext}
                    className="
      inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3
      bg-blue-400 hover:bg-blue-500
      shadow-lg shadow-cyan-500/30
      transition-all text-base font-bold text-gray-900
      min-w-[180px] border-2 border-indigo-300
      active:scale-95
    "
                    aria-label="Desplazarse hacia abajo"
                  >
                    <FaArrowDown className="text-lg" />
                    <span>Conoce Mas de mi </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </RevealSection>

        {/* Contenedor para el resto del contenido */}
{/* ===== Misión y Visión ===== */}
<RevealSection
  id="vision"
  direction="up"
  amount={0.25}
  className="relative py-16 md:py-24 bg-gradient-to-b from-gray-950 to-gray-900"
>
  <motion.div
    className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-10 mx-auto flex flex-col items-center"
    variants={containerStagger}
    initial="hidden"
    animate="show"
  >
    <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-16">
      {/* Texto principal */}
      <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
        <SectionHeader
          icon={<FaLightbulb className="text-xl md:text-2xl text-cyan-300" />}
          tag="Misión y Visión"
          tagColor="text-cyan-400"
          gradient="bg-gradient-to-r from-cyan-600 to-blue-600"
          title="Propósito y futuro"
        />

        {/* Párrafo principal */}
        <GlassCard>
          <div className="px-6 py-5 md:px-8 md:py-7 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.3)] rounded-3xl">
            <p className="text-base md:text-lg text-cyan-100 leading-relaxed">
              Mi misión como futuro <strong className="text-cyan-300">Ingeniero en Sistemas</strong> 
              es continuar aprendiendo, evolucionando con cada tecnología nueva y 
              compartir esos conocimientos con quienes inician su propio camino.  
              A través del <strong className="text-cyan-300">desarrollo web</strong>, busco crear soluciones que 
              simplifiquen la vida de las personas y aporten valor real al mundo digital.
            </p>
          </div>
        </GlassCard>

        {/* Bloques individuales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          <GlassCard>
            <div className="px-4 py-4 md:px-6 md:py-5 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full" />
                <strong className="text-sm md:text-base text-cyan-300">
                  Misión
                </strong>
              </div>
              <p className="text-sm md:text-base text-cyan-100 leading-relaxed">
                Desarrollar habilidades técnicas y humanas que me permitan 
                construir software útil, ético y sostenible, inspirando a otros 
                a descubrir su pasión por la tecnología y el aprendizaje continuo.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="px-4 py-4 md:px-6 md:py-5 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full" />
                <strong className="text-sm md:text-base text-cyan-300">
                  Visión
                </strong>
              </div>
              <p className="text-sm md:text-base text-cyan-100 leading-relaxed">
                Ser un profesional íntegro y apasionado, capaz de combinar 
                la innovación tecnológica con la empatía humana, contribuyendo 
                al crecimiento de mi entorno y guiando a otros en el camino 
                del desarrollo web y la transformación digital.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="px-4 py-4 md:px-6 md:py-5 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full" />
                <strong className="text-sm md:text-base text-cyan-300">
                  Valores
                </strong>
              </div>
              <p className="text-sm md:text-base text-cyan-100 leading-relaxed">
                Compromiso, curiosidad, colaboración y humildad para seguir 
                aprendiendo cada día, entendiendo que el conocimiento compartido 
                multiplica su valor.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Imagen lateral */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
          <GlassCard>
            <div
              className="relative rounded-[inherit] overflow-hidden kenburns float-slow tilt-hover parallax-1"
              style={{ "--parallax": `${scrollY * 0.05}px` } as React.CSSProperties}
            >
              <img
                src="/imagenes/inicio3.png"
                alt="Visión y Misión"
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-4 md:p-6">
                <span className="text-lg md:text-xl font-bold text-cyan-200 drop-shadow">
                  Misión y Visión
                </span>
              </div>
            </div>
          </GlassCard>
          <GlowBelow variant="teal" />
        </div>
      </div>
    </div>
  </motion.div>
</RevealSection>

        {/* ===== Desarrollo ===== */}
        <RevealSection
          id="development"
          direction="up"
          amount={0.25}
          className="relative py-16 md:py-24 bg-gradient-to-b from-gray-950 to-gray-900"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <SectionHeader
                  icon={<FaBrain className="text-xl md:text-2xl text-white" />}
                  tag="Conocimientos"
                  tagColor="text-blue-400"
                  gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
                  title="Lo que he aprendido"
                />

                <div className="max-w-xl">
                  <GlassCard>
    <div className="px-6 py-5 md:px-8 md:py-7 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]
 rounded-3xl">
      <p className="text-base md:text-lg text-gray-300 leading-relaxed">
        En los últimos cuatro años he recorrido un camino apasionante dentro del
        desarrollo web, dominando desde los fundamentos de HTML, CSS y JavaScript
        hasta tecnologías modernas como React, TypeScript, .NET, Docker y bases de datos.
        Este aprendizaje me ha permitido comprender cómo se construyen aplicaciones
        seguras, escalables y centradas en la experiencia del usuario. Hoy, el
        desarrollo web es para mí mucho más que código: es una herramienta para
        innovar, resolver problemas reales y crear soluciones que impacten
        positivamente en el mundo digital.
      </p>
    </div>
  </GlassCard>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                   <GlassCard>
                   <div className="px-4 py-4 md:px-6 md:py-5 flex gap-3 md:gap-4 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]
 rounded-2xl">
                   <div className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
                    <p className="text-sm md:text-base text-gray-300">
                         Consolidé mis bases en <strong className="text-blue-400">frontend</strong>, 
                       aplicando buenas prácticas con React, Tailwind y TypeScript para crear interfaces modernas y accesibles.
                    </p>
                  </div>
                 </GlassCard>
                   <GlassCard>
    <div className="px-4 py-4 md:px-6 md:py-5 flex gap-3 md:gap-4 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]
 rounded-2xl">
      <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
      <p className="text-sm md:text-base text-gray-300">
        Fortalecí mis conocimientos en <strong className="text-purple-400">backend y bases de datos</strong>,
        utilizando Node.js, .NET, SQL Server y Docker para construir APIs escalables y seguras.
      </p>
    </div>
  </GlassCard>
                   <GlassCard>
    <div className="px-4 py-4 md:px-6 md:py-5 flex gap-3 md:gap-4 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]
 rounded-2xl">
      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
      <p className="text-sm md:text-base text-gray-300">
        Desarrollé una visión integral del <strong className="text-cyan-400">ciclo completo del desarrollo</strong>,
        desde la planificación y diseño hasta la implementación y despliegue en entornos reales.
      </p>
    </div>
  </GlassCard>

   <GlassCard>
    <div className="px-4 py-4 md:px-6 md:py-5 flex gap-3 md:gap-4 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]
 rounded-2xl">
      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
      <p className="text-sm md:text-base text-gray-300">
        Perfeccioné mis habilidades en <strong className="text-emerald-400">control de versiones y despliegue</strong>,
        integrando Git, GitHub, Docker y CI/CD para automatizar procesos y garantizar entregas eficientes y profesionales.
      </p>
    </div>
  </GlassCard>
                </div>
              </div>

              <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
                  <GlassCard>
                    <div
                      className="relative rounded-[inherit] overflow-hidden kenburns float-slow tilt-hover parallax-1"
                      style={{ "--parallax": `${scrollY * 0.06}px` } as React.CSSProperties}

                    >
                      <img
                        src="/imagenes/inicio1.png"
                        alt="Desarrollo Web "
                        className="w-full h-auto"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t  from-cyan-600/30  to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)]
 via-transparent  flex items-end justify-center p-4 md:p-6">
                        <span className="text-lg md:text-xl font-bold text-white drop-shadow">
                          Desarrollo Web Moderno
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                  <GlowBelow variant="teal" />
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ===== Tecnologías ===== */}
        <RevealSection
          id="technologies"
          direction="up"
          amount={0.25}
          className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950"
        >
          <motion.div
            className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-10 mx-auto flex flex-col items-center"
            variants={containerStagger}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <SectionHeader
                  icon={
                    <FaMicrochip className="text-xl md:text-2xl text-white" />
                  }
                  tag="Herramientas"
                  tagColor="text-blue-400"
                  gradient="bg-gradient-to-r from-blue-600 to-cyan-600"
                  title="Herramientas y Lenguajes"
                />

             <GlassCard>
  <div className="px-6 py-5 md:px-8 md:py-7 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.25)] rounded-3xl">
    <p className="text-base md:text-lg text-cyan-100 leading-relaxed">
      El desarrollo web moderno integra una amplia gama de herramientas que
      enlazan los lenguajes de programación en un ecosistema unificado.
      En el <strong className="text-cyan-300">frontend</strong> destacan
      <strong className="text-cyan-400"> HTML</strong>, 
      <strong className="text-cyan-400"> CSS</strong> y 
      <strong className="text-cyan-400"> JavaScript</strong>, junto con frameworks como 
      <strong className="text-cyan-300"> React</strong> y 
      <strong className="text-cyan-300"> Tailwind CSS</strong> para crear interfaces modernas y responsivas.
      En el <strong className="text-cyan-300">backend</strong>, tecnologías como 
      <strong className="text-cyan-400"> Node.js</strong> y 
      <strong className="text-cyan-400"> .NET</strong> permiten construir APIs sólidas, mientras que
      <strong className="text-cyan-300"> SQL Server</strong> y 
      <strong className="text-cyan-300"> MySQL</strong> gestionan los datos de forma eficiente.
      Además, herramientas como <strong className="text-cyan-400">Docker</strong>, 
      <strong className="text-cyan-400">GitHub</strong> y flujos de 
      <strong className="text-cyan-400"> CI/CD</strong> hacen posible un desarrollo ágil, automatizado y profesional.
    </p>
  </div>
</GlassCard>



              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {techStack.map((tech, idx) => (
    <GlassCard
      key={idx}
      className="bg-gradient-to-br from-cyan-500/30 via-cyan-400/20 to-blue-500/10 
                 backdrop-blur-md rounded-3xl shadow-[0_0_25px_rgba(34,211,238,0.35)]
                 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)]
                 transition-all duration-300 hover:scale-105 hover:rotate-1"
    >
      <div className="px-4 py-5 md:px-6 md:py-6 flex flex-col items-center">
        <span
          className="text-3xl md:text-4xl mb-2 md:mb-3 
                     text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]
                     transition-transform duration-300 hover:scale-110"
        >
          {tech.icon}
        </span>
        <span
          className="text-xs sm:text-sm md:text-sm font-semibold text-center 
                     text-cyan-100 tracking-wide drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]"
        >
          {tech.name}
        </span>
      </div>
    </GlassCard>
  ))}
</div>



              </div>

              <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
                  <GlassCard>
                    <div
                      className="relative rounded-[inherit] overflow-hidden kenburns float-slow tilt-hover parallax-1"
                      style={{ "--parallax": `${scrollY * 0.04}px` } as React.CSSProperties}

                    >
                      <img
                        src="/imagenes/inicio2.png"
                        alt="Herramientas de Desarrollo"
                        className="w-full h-auto"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-4 md:p-6">
                        <span className="text-lg md:text-xl font-bold text-white drop-shadow">
                          Herramientas De Desarrollo
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                  <GlowBelow variant="green" />
                </div>
              </div>
            </div>
          </motion.div>
        </RevealSection>

       
        {/* ===== Futuro ===== */}
        {/* ===== Metas Profesionales ===== */}
<RevealSection
  id="future"
  direction="up"
  amount={0.25}
  className="relative py-16 md:py-24 bg-gradient-to-b from-gray-950 to-gray-900"
>
  <motion.div
    className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-10 mx-auto flex flex-col items-center"
    variants={containerStagger}
    initial="hidden"
    animate="show"
  >
    <div className="flex flex-col lg:flex-row-reverse items-center gap-8 md:gap-10 lg:gap-16">
      {/* === Lado Izquierdo: Texto === */}
      <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
        <SectionHeader
          icon={<FaRocket className="text-xl md:text-2xl text-cyan-300" />}
          tag="METAS"
          tagColor="text-cyan-400"
          gradient="bg-gradient-to-r from-cyan-600 to-blue-600"
          title="Crecimiento profesional"
        />

        {/* Descripción general */}
        <GlassCard>
          <div className="px-6 py-5 md:px-8 md:py-7 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.3)] rounded-3xl">
            <p className="text-base md:text-lg text-cyan-100 leading-relaxed">
              Mi camino en la ingeniería en sistemas está lleno de metas que
              representan el compromiso con mi formación continua, la pasión
              por el aprendizaje y la búsqueda de la excelencia en el desarrollo
              web y tecnológico. Cada etapa está pensada para fortalecer mi
              crecimiento profesional y personal.
            </p>
          </div>
        </GlassCard>

        {/* Metas individuales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {/* === Meta a corto plazo === */}
          <GlassCard>
            <div className="px-4 py-4 md:px-6 md:py-5 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse" />
                <strong className="text-sm md:text-base text-cyan-300">
                  Corto Plazo
                </strong>
              </div>
              <p className="text-sm md:text-base text-cyan-100 leading-relaxed">
                Seguir aprendiendo y dominar nuevas tecnologías modernas del
                desarrollo web, obtener certificaciones reconocidas y fortalecer
                mi portafolio profesional para ampliar mis oportunidades.
              </p>
            </div>
          </GlassCard>

          {/* === Meta a mediano plazo === */}
          <GlassCard>
            <div className="px-4 py-4 md:px-6 md:py-5 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse delay-150" />
                <strong className="text-sm md:text-base text-cyan-300">
                  Mediano Plazo
                </strong>
              </div>
              <p className="text-sm md:text-base text-cyan-100 leading-relaxed">
                Graduarme como <strong className="text-cyan-300">Ingeniero en Sistemas</strong>,
                consolidando mi experiencia práctica y teórica en el desarrollo
                de aplicaciones, gestión de proyectos y tecnologías web
                avanzadas.
              </p>
            </div>
          </GlassCard>

          {/* === Meta a largo plazo === */}
          <GlassCard>
            <div className="px-4 py-4 md:px-6 md:py-5 bg-gradient-to-br from-cyan-600/25 via-cyan-500/15 to-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse delay-300" />
                <strong className="text-sm md:text-base text-cyan-300">
                  Largo Plazo
                </strong>
              </div>
              <p className="text-sm md:text-base text-cyan-100 leading-relaxed">
                Alcanzar mi <strong className="text-cyan-300">maestría en tecnología o ingeniería</strong>,
                contribuyendo al mundo académico y profesional mediante la
                investigación, la innovación y la formación de nuevas
                generaciones de desarrolladores.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Frase final motivacional */}
        <GlassCard>
          <div className="px-6 py-5 md:px-8 md:py-7 bg-gradient-to-br from-cyan-600/30 via-cyan-500/20 to-blue-500/10 backdrop-blur-md rounded-3xl text-center">
            <FaRocket className="text-3xl md:text-4xl text-cyan-300 mx-auto mb-3 animate-bounce" />
            <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-2">
              "Cada meta es un paso hacia un futuro lleno de conocimiento"
            </h3>
            <p className="text-base md:text-lg text-cyan-100">
              El aprendizaje constante es la base del progreso. Cada día es una
              nueva oportunidad para seguir creciendo y dejar huella en el
              desarrollo tecnológico.
            </p>
          </div>
        </GlassCard>
      </div>

      {/* === Lado Derecho: Imagen === */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md">
          <GlassCard>
            <div
              className="relative rounded-[inherit] overflow-hidden kenburns float-slow tilt-hover parallax-1"
              style={{ "--parallax": `${scrollY * 0.03}px` } as React.CSSProperties}
            >
              <img
                src="/imagenes/inicio4.png"
                alt="Metas profesionales"
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-4 md:p-6">
                <span className="text-lg md:text-xl font-bold text-cyan-200 drop-shadow">
                  Mis Metas
                </span>
              </div>
            </div>
          </GlassCard>
          <GlowBelow variant="teal" />
        </div>
      </div>
    </div>
  </motion.div>
</RevealSection>

      </main>
    </>
  );
};

export default Homepage;
