import React from "react";
import {
  BookOpen,
  Code,
  FileText,
  Grid,
  Keyboard,
  LayoutTemplate,
  Link as LinkIcon,
  ListChecks,
  Mail,
  Network,
  Palette,
  Rss,
  Smartphone,
  Terminal,
  Table,
} from "lucide-react";

/** Título de sección con icono */
const SectionTitle: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <div className="flex items-center gap-2">
    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
      {icon}
    </div>
    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">{children}</h2>
  </div>
);

/** Tarjeta de contenido */
const Card: React.FC<{ title?: string; icon?: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children,
}) => (
  <article className="rounded-xl border border-white/10 bg-neutral-900/60 p-4 hover:bg-neutral-900/80 transition">
    {title ? (
      <div className="mb-2 flex items-start gap-3">
        {icon ? (
          <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0">
            {icon}
          </div>
        ) : null}
        <h3 className="text-lg font-medium text-gray-100">{title}</h3>
      </div>
    ) : null}
    <div className="text-sm leading-relaxed text-gray-300">{children}</div>
  </article>
);

const Tarea2: React.FC = () => {
  return (
    <div className="pb-12">
      {/* HERO */}
      <header className="py-10 md:py-14">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            <BookOpen className="h-4 w-4" />
            Informe — Frontend (HTML • CSS • Responsive)
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Desarrollo web frontend: estructura, estilo y responsividad
          </h1>
          <p className="mt-4 text-gray-300 md:text-lg">
            El frontend es la interfaz con la que el usuario interactúa: combina{" "}
            <strong>HTML</strong> (estructura), <strong>CSS</strong> (presentación) y{" "}
            <strong>JavaScript</strong> (interactividad). Este informe resume los pilares:
            formularios semánticos, fundamentos de CSS, frameworks de estilo y{" "}
            <em>media queries</em> para diseños responsivos.
          </p>
        </div>
      </header>

      {/* ÍNDICE */}
      <nav className="mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            ["Introducción", "intro"],
            ["Elementos de formulario (HTML)", "html-form"],
            ["Fundamentos de CSS", "css-base"],
            ["Frameworks de estilo", "css-fw"],
            ["Media Queries (Responsive)", "mediaq"],
            ["Enlaces", "links"],
            ["Conclusión", "outro"],
            ["Bibliografía", "refs"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs md:text-sm rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300 hover:bg-white/10"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main className="space-y-10">
        {/* INTRODUCCIÓN */}
        <section id="intro" className="space-y-4">
          <SectionTitle icon={<LayoutTemplate className="h-5 w-5" />}>Introducción</SectionTitle>
          <Card>
            <p>
              El desarrollo web frontend combina arte y ciencia para construir la interfaz que las
              personas ven y usan. Este documento aborda:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-gray-300/95">
              <li>
                <strong>HTML</strong> como base semántica —especialmente formularios con{" "}
                <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code> y{" "}
                <code>&lt;select&gt;</code>.
              </li>
              <li>
                <strong>CSS</strong> para dar estilo y composición: cascada, especificidad y
                utilidades.
              </li>
              <li>
                <strong>Frameworks</strong> para acelerar y estandarizar el diseño.
              </li>
              <li>
                <strong>Media Queries</strong> para experiencias responsivas en cualquier
                dispositivo.
              </li>
            </ul>
          </Card>
        </section>

        {/* ELEMENTOS DE FORMULARIO */}
        <section id="html-form" className="space-y-4">
          <SectionTitle icon={<Terminal className="h-5 w-5" />}>
            Elementos de formulario en HTML
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card title="&lt;input&gt; (tipos comunes)" icon={<Keyboard className="h-5 w-5" />}>
              <ul className="list-disc list-inside space-y-1">
                <li><code>type="text"</code>: texto de una línea.</li>
                <li><code>type="password"</code>: oculta caracteres.</li>
                <li><code>type="email"</code>: formato de correo + teclado móvil adecuado.</li>
                <li><code>type="number"</code>: restringe a valores numéricos.</li>
                <li><code>type="date"</code>: selector de fecha estándar.</li>
                <li><code>type="checkbox"</code>: casilla de verificación (on/off).</li>
                <li><code>type="radio"</code>: opción única por <code>name</code>.</li>
                <li><code>type="file"</code>: subir archivos.</li>
                <li><code>type="submit"</code> / <code>button</code>: envía o ejecuta acciones JS.</li>
                <li>Otros: <code>search</code>, <code>tel</code>, <code>url</code>, <code>color</code>, <code>range</code>, <code>time</code>.</li>
              </ul>
            </Card>

            <Card title="&lt;textarea&gt;" icon={<FileText className="h-5 w-5" />}>
              <p>
                Entrada de múltiples líneas: ideal para comentarios o descripciones largas.
                Atributos útiles: <code>rows</code>, <code>cols</code>, <code>placeholder</code>.
                El contenido inicial va entre etiquetas:{" "}
                <code>&lt;textarea&gt;...&lt;/textarea&gt;</code>.
              </p>
            </Card>

            <Card title="&lt;select&gt; + &lt;option&gt;" icon={<ListChecks className="h-5 w-5" />}>
              <p>
                Menú desplegable con <code>value</code> (lo enviado al servidor) y
                <code> selected</code> (valor por defecto). Soporta <code>multiple</code> para
                seleccionar varias opciones.
              </p>
            </Card>
          </div>
        </section>

        {/* FUNDAMENTOS DE CSS */}
        <section id="css-base" className="space-y-4">
          <SectionTitle icon={<Palette className="h-5 w-5" />}>Fundamentos de CSS</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Reglas y selectores" icon={<Code className="h-5 w-5" />}>
              <p>
                Una regla CSS = <em>selector</em> + <em>bloque de declaración</em> (propiedad:
                valor). Ej.: <code>p &#123; color: blue; &#125;</code>.
              </p>
            </Card>

            <Card title="Cascada y especificidad" icon={<Table className="h-5 w-5" />}>
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Importancia</strong>: <code>!important</code>.</li>
                <li><strong>Especificidad</strong>: <code>#id</code> &gt; <code>.clase</code> &gt; elemento.</li>
                <li><strong>Orden</strong>: la última regla gana si lo anterior empata.</li>
              </ol>
            </Card>
          </div>
        </section>

        {/* FRAMEWORKS */}
        <section id="css-fw" className="space-y-4">
          <SectionTitle icon={<Grid className="h-5 w-5" />}>Frameworks de estilo</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Bootstrap" icon={<Smartphone className="h-5 w-5" />}>
              <p>
                Sistema de grillas responsivo y componentes listos (botones, navbars, modales).
                Gran documentación y comunidad.
              </p>
            </Card>
            <Card title="Tailwind CSS" icon={<Terminal className="h-5 w-5" />}>
              <p>
                Framework de utilidades: compone interfaces con clases como{" "}
                <code>flex</code>, <code>p-4</code>, <code>text-center</code>. Ideal para
                diseños personalizados rápidos.
              </p>
            </Card>
            <Card title="Foundation" icon={<Network className="h-5 w-5" />}>
              <p>
                Enfoque semántico y accesible; grilla flexible y componentes robustos.
              </p>
            </Card>
          </div>
        </section>

        {/* MEDIA QUERIES */}
        <section id="mediaq" className="space-y-4">
          <SectionTitle icon={<Smartphone className="h-5 w-5" />}>Media Queries (Responsive)</SectionTitle>
          <Card>
            <p>
              Las <em>media queries</em> aplican estilos según características del dispositivo:
              ancho, orientación, resolución o impresión. En enfoque <em>mobile-first</em> se
              declaran estilos base para móviles y se amplían con <code>min-width</code>.
            </p>
            <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-gray-200 overflow-x-auto">
{`/* Base (móvil) */
body { background-color: lightblue; }

/* ≥600px */
@media (min-width: 600px) {
  body { background-color: lightgreen; }
}

/* ≥900px */
@media (min-width: 900px) {
  body { background-color: salmon; }
}`}
            </div>
          </Card>
        </section>

        {/* ENLACES */}
        <section id="links" className="space-y-4">
          <SectionTitle icon={<LinkIcon className="h-5 w-5" />}>Enlaces</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Repositorio" icon={<Rss className="h-5 w-5" />}>
              <a
                href="https://github.com/Pablo-Arreola/Formulario.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-white"
              >
                GitHub — Formulario-Tarea1
                <LinkIcon className="h-4 w-4" />
              </a>
            </Card>
            <Card title="Formulario en producción" icon={<Mail className="h-5 w-5" />}>
              <a
                href="https://formulario-alpha-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-white"
              >
                formulario-tarea1.vercel.app
                <LinkIcon className="h-4 w-4" />
              </a>
            </Card>
          </div>
        </section>

        {/* CONCLUSIÓN */}
        <section id="outro" className="space-y-4">
          <SectionTitle icon={<BookOpen className="h-5 w-5" />}>Conclusión</SectionTitle>
          <Card>
            <p>
              <strong>HTML</strong> aporta la estructura (especialmente en formularios).{" "}
              <strong>CSS</strong> otorga presentación y control del layout. Las{" "}
              <strong>media queries</strong> garantizan que el sitio se adapte a cualquier
              pantalla. Con frameworks como Bootstrap o Tailwind, el desarrollo se acelera y se
              mantiene la consistencia visual. Dominar estos pilares es clave para construir
              aplicaciones modernas, accesibles y atractivas.
            </p>
          </Card>
        </section>

        {/* BIBLIOGRAFÍA */}
        <section id="refs" className="space-y-4">
          <SectionTitle icon={<FileText className="h-5 w-5" />}>Bibliografía / E-grafía</SectionTitle>
          <Card>
            <ul className="list-disc list-inside space-y-1">
              <li>
                MDN Web Docs —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://developer.mozilla.org/es/docs/Learn/Forms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Formularios
                </a>
              </li>
              <li>
                MDN —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://developer.mozilla.org/es/docs/Web/HTML/Element"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Elementos HTML
                </a>
              </li>
              <li>
                MDN —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://developer.mozilla.org/es/docs/Web/CSS/Media_Queries/Using_media_queries"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Media Queries
                </a>
              </li>
              <li>
                W3Schools —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://www.w3schools.com/html/html_forms.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HTML Forms
                </a>
              </li>
              <li>
                W3Schools —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://www.w3schools.com/css/css_intro.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CSS Introduction
                </a>
              </li>
              <li>
                Bootstrap —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentación
                </a>
              </li>
              <li>
                Tailwind CSS —{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href="https://tailwindcss.com/docs/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instalación
                </a>
              </li>
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Tarea2;
