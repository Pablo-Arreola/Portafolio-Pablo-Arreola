import React from "react";
import {
  BookOpen,
  Network,
  Wifi,
  Smartphone,
  Globe,
  Code,
  Server,
  Database,
  Mail,
  Shield,
  Terminal,
  FileText,
  Link as LinkIcon,
  Rss,
  Layers,
  GitBranch,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

// === Animación suave para secciones ===
// Nota: Framer Motion v11+ requiere que `ease` sea tipo Easing, no string.
// El equivalente numérico de "easeOut" es [0, 0, 0.58, 1]
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.58, 1], // ✅ corregido
    },
  },
};

// === Título de Sección ===
const SectionTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <div className="flex items-center gap-2 text-cyan-300">
    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
      {icon}
    </div>
    <h3 className="text-xl font-semibold tracking-tight text-cyan-100">{children}</h3>
  </div>
);

// === Tarjeta de término ===
const TermCard: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => (
  <motion.article
    variants={fadeIn}
    className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-900/30 via-gray-900/40 to-gray-950/50 p-4 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition duration-300 ease-out backdrop-blur-md"
  >
    <div className="flex items-start gap-3">
      {icon && (
        <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shrink-0">
          {icon}
        </div>
      )}
      <div className="w-full">
        <h4 className="text-lg font-medium text-cyan-200">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-cyan-100/90">{children}</p>
      </div>
    </div>
  </motion.article>
);

// === Componente Principal ===
const Glosario: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="pb-12 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-cyan-100"
    >
      {/* === Encabezado === */}
      <header className="py-10 md:py-14 text-center md:text-left">
        <motion.div variants={fadeIn} className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <BookOpen className="h-4 w-4" />
            Glosario de Tecnologías Web y Redes
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            INTRODUCCIÓN
          </h1>
          <p className="mt-4 text-cyan-100/90 md:text-lg leading-relaxed">
            Este glosario reúne los principales conceptos y tecnologías que sustentan el
  funcionamiento de Internet y de la Web moderna. Incluye términos sobre redes,
  protocolos de comunicación, lenguajes de programación, servidores, sistemas operativos
  y estándares internacionales. Su objetivo es ofrecer una visión clara y organizada de
  cómo cada elemento —desde una conexión 2G hasta un protocolo HTTP o una hoja de estilo CSS—
  contribuye al desarrollo, funcionamiento y expansión del entorno digital actual.
          </p>
        </motion.div>
      </header>

      {/* === Índice === */}
      <nav className="mb-8 px-4">
        <motion.div
          variants={fadeIn}
          className="flex flex-wrap gap-2 justify-center md:justify-start"
        >
          {[
            "Números y Redes",
            "A",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "L",
            "M",
            "P",
            "R",
            "S",
            "U",
            "W",
            "X",
          ].map((sec) => (
            <a
              key={sec}
              href={`#sec-${sec.replace(/\s+/g, "-")}`}
              className="text-xs md:text-sm rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition"
            >
              {sec}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* === Contenido === */}
      <main className="space-y-10 max-w-6xl mx-auto px-4">
        {/* ========= SECCIONES ========= */}

        {/* Números y Redes */}
        <section id="sec-Números-y-Redes" className="space-y-4">
          <SectionTitle icon={<Network className="h-5 w-5" />}>Números y Redes</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <TermCard
              title="2G (Segunda Generación de Redes Móviles)"
              icon={<Smartphone className="h-5 w-5" />}
            >
              La segunda generación se enfocó en digitalizar la voz y habilitar el SMS.
              Supuso un salto frente a 1G (analógica).
            </TermCard>
            <TermCard title="3G – Tercera Generación" icon={<Wifi className="h-5 w-5" />}>
              Habilitó navegación web y videollamadas con velocidades decentes;
              base para la era de smartphones.
            </TermCard>
            <TermCard title="4G – Cuarta Generación (LTE)" icon={<Wifi className="h-5 w-5" />}>
              Aumenta velocidad y capacidad de red para streaming HD, videollamadas
              estables y baja latencia.
            </TermCard>
          </div>
        </section>

        {/* A */}
        <Section id="sec-A" title="A" icon={<Code className="h-5 w-5" />}>
          <TermCard title="ADSL – Asymmetric Digital Subscriber Line" icon={<Server className="h-5 w-5" />}>
            Acceso a Internet sobre línea telefónica; descarga mayor que subida.
            Muy extendida antes de la fibra.
          </TermCard>
          <TermCard title="AJAX – Asynchronous JavaScript And XML" icon={<Code className="h-5 w-5" />}>
            Actualiza partes de la página sin recargarla completa. Hoy suele usar JSON; se implementa con fetch() o XHR.
          </TermCard>
          <TermCard title="AMF – Action Message Format" icon={<Layers className="h-5 w-5" />}>
            Formato binario de Adobe para intercambio cliente-servidor.
          </TermCard>
          <TermCard title="ASP – Active Server Pages" icon={<Server className="h-5 w-5" />}>
            Tecnología de Microsoft para páginas dinámicas del lado servidor.
          </TermCard>
          <TermCard title="ATOM – Atom Syndication Format" icon={<Rss className="h-5 w-5" />}>
            Formato XML para distribución de contenido (feeds), alternativa a RSS.
          </TermCard>
        </Section>

        {/* C */}
        <Section id="sec-C" title="C" icon={<BookOpen className="h-5 w-5" />}>
          <TermCard title="CERN" icon={<Globe className="h-5 w-5" />}>
            Laboratorio europeo de física de partículas. Lugar de nacimiento de la Web.
          </TermCard>
          <TermCard title="CGI – Common Gateway Interface" icon={<Server className="h-5 w-5" />}>
            Permite ejecutar programas en el servidor para generar contenido dinámico.
          </TermCard>
          <TermCard title="CSS – Cascading Style Sheets" icon={<FileText className="h-5 w-5" />}>
            Lenguaje que define la presentación visual del contenido HTML.
          </TermCard>
        </Section>

        {/* D */}
        <Section id="sec-D" title="D" icon={<Database className="h-5 w-5" />}>
          <TermCard title="DBMS – DataBase Management System" icon={<Database className="h-5 w-5" />}>
            Software para crear y gestionar bases de datos.
          </TermCard>
          <TermCard title="DHCP – Dynamic Host Configuration Protocol" icon={<Network className="h-5 w-5" />}>
            Asigna IPs automáticamente dentro de una red.
          </TermCard>
          <TermCard title="DNS – Domain Name System" icon={<LinkIcon className="h-5 w-5" />}>
            Traduce dominios legibles a direcciones IP.
          </TermCard>
        </Section>

        {/* E */}
        <Section id="sec-E" title="E" icon={<Code className="h-5 w-5" />}>
          <TermCard title="ECMA – European Computer Manufacturers Association" icon={<BookOpen className="h-5 w-5" />}>
            Estándar base de JavaScript (ECMAScript).
          </TermCard>
        </Section>

        {/* F */}
        <Section id="sec-F" title="F" icon={<Shield className="h-5 w-5" />}>
          <TermCard title="FreeBSD – Free Berkeley Software Distribution" icon={<Server className="h-5 w-5" />}>
            Sistema operativo derivado de Unix, usado en servidores.
          </TermCard>
          <TermCard title="FTP – File Transfer Protocol" icon={<LinkIcon className="h-5 w-5" />}>
            Transfiere archivos entre cliente y servidor. Sustituido por SFTP.
          </TermCard>
        </Section>

        {/* G */}
        <Section id="sec-G" title="G" icon={<GitBranch className="h-5 w-5" />}>
          <TermCard title="GPRS" icon={<Wifi className="h-5 w-5" />}>Mejora de GSM para datos.</TermCard>
          <TermCard title="GNU/Linux" icon={<Terminal className="h-5 w-5" />}>Sistema operativo libre basado en Linux.</TermCard>
          <TermCard title="GSM" icon={<Smartphone className="h-5 w-5" />}>Estándar mundial de telefonía móvil.</TermCard>
        </Section>

        {/* H */}
        <Section id="sec-H" title="H" icon={<Globe className="h-5 w-5" />}>
          <TermCard title="HTML" icon={<FileText className="h-5 w-5" />}>Lenguaje base de la web.</TermCard>
          <TermCard title="HTTP" icon={<Globe className="h-5 w-5" />}>Protocolo de transferencia de hipertexto.</TermCard>
        </Section>

        {/* I */}
        <Section id="sec-I" title="I" icon={<Layers className="h-5 w-5" />}>
          <TermCard title="IANA" icon={<Network className="h-5 w-5" />}>Coordina identificadores únicos de Internet.</TermCard>
          <TermCard title="IETF" icon={<BookOpen className="h-5 w-5" />}>Define estándares técnicos (RFCs).</TermCard>
          <TermCard title="IMAP" icon={<Mail className="h-5 w-5" />}>Protocolo moderno para correos.</TermCard>
          <TermCard title="IP" icon={<Network className="h-5 w-5" />}>Direccionamiento de paquetes.</TermCard>
          <TermCard title="ISO" icon={<Shield className="h-5 w-5" />}>Normas internacionales (ISO 9001, 27001).</TermCard>
        </Section>

        {/* ...continúan tus demás secciones... */}
      </main>

      {/* === Conclusión === */}
      <footer className="mt-16 px-4 max-w-5xl mx-auto text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          CONCLUSIÓN
        </h2>
        <p className="text-cyan-100/90 max-w-4xl leading-relaxed">
          Este glosario es una base de consulta para entender tecnologías web y redes: cada término es una pieza del engranaje que sostiene Internet, servicios móviles y sistemas actuales.
        </p>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-cyan-200 mb-3">BIBLIOGRAFÍA / REFERENCIAS</h3>
          <ul className="list-disc list-inside text-cyan-100/80 space-y-1">
            <li>W3C — w3.org</li>
            <li>MDN Web Docs — developer.mozilla.org</li>
            <li>IETF RFCs — rfc-editor.org</li>
            <li>ECMA — ecma-international.org</li>
            <li>ISO — iso.org</li>
            <li>GNU / Linux — gnu.org / kernel.org</li>
          </ul>
        </div>
      </footer>
    </motion.div>
  );
};

/* === Componente auxiliar para agrupar secciones === */
const Section: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  id,
  title,
  icon,
  children,
}) => (
  <section id={id} className="space-y-4">
    <SectionTitle icon={icon}>{title}</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{children}</div>
  </section>
);

export default Glosario;
