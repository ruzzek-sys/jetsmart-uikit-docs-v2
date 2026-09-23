/**
 * Genera las páginas placeholder del sitio y assets/js/nav-data.js a partir del
 * manifiesto de páginas del archivo de Figma "Jetsmart UI Kit v1.0".
 *
 * Uso: node tools/generate-pages.mjs            crea solo las páginas que faltan
 *      node tools/generate-pages.mjs --force    reescribe TODAS desde la plantilla
 *
 * El generador no sobrescribe páginas existentes: una vez creado el archivo, lo que
 * escribas ahí a mano queda. `nav-data.js` sí se regenera siempre, es derivado.
 *
 * Campos de cada item:
 *   label  -> título de la página (igual al nombre de la página en Figma)
 *   slug   -> nombre del archivo html
 *   desc   -> bajada de una línea bajo el título
 *   nodes  -> frames "Live Preview" de la página en Figma
 *   live   -> false cuando la página no tiene frame "Live Preview" y `nodes`
 *             apunta a otro frame de esa misma página como provisional
 *   id     -> data-page-id, solo cuando no puede ser el slug (colisiones)
 *
 * Las secciones con `preview: false` (Foundations) se generan sin iframe.
 */

import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE_KEY = "dKd6jNGAnng8hIV5MS4Avd";
const FILE_NAME = "Jetsmart-UI-Kit-v1.0";

const COMPONENT_DOCS = [
  ["Resumen", "Documentación pendiente. Edita esta página para agregar contenido.", true],
  ["Propiedades", "Propiedades pendientes de documentar desde Figma.", true]
];

const FOUNDATION_DOCS = [
  ["Resumen", "Foundation pendiente de documentar desde Figma.", true],
  ["Tokens", "Tokens y valores por documentar."],
  ["Uso", "Guidelines de uso por definir."]
];

const PATTERN_DOCS = [
  ["Resumen", "Pattern pendiente de documentar.", true],
  ["Propiedades", "Propiedades pendientes de documentar desde Figma.", true]
];

const FLOW_DOCS = [
  ["Resumen", "Flow pendiente de documentar.", true],
  ["Pantallas", "Pantallas y pasos del flujo por documentar."],
  ["Uso", "Guidelines de uso por definir."]
];

const SECTIONS = [
  {
    id: "foundations",
    label: "Foundations",
    dir: "foundations",
    preview: false,
    docs: FOUNDATION_DOCS,
    items: [
      {
        label: "Typography",
        slug: "typography",
        desc: "Dos familias, una escala de 15 pasos y 8 escalas semánticas que resuelven todo el texto del kit.",
        nodes: ["5405:113123"],
        live: false
      },
      {
        label: "Colors",
        slug: "colors",
        desc: "Nueve rampas primitivas, 77 tokens semánticos y 18 parejas de fondo y contenido ya validadas por contraste.",
        nodes: ["5520:1926"],
        live: false
      },
      {
        label: "Spacing",
        slug: "spacing",
        desc: "19 primitivos en múltiplos de 4 px, 6 familias semánticas y un grid de 3 breakpoints que ordenan el espacio del kit.",
        nodes: ["5572:2054"],
        live: false
      },
      {
        label: "Radius & Width",
        slug: "radius-width",
        desc: "21 primitivos de radio, 8 roles semánticos, 9 grosores de borde y 7 tokens de stroke que definen la forma del kit.",
        nodes: ["5590:2050"],
        live: false
      },
      { label: "Elevations", slug: "elevations", desc: "Sombras y niveles de elevación.", nodes: ["5824:1928"], live: false },
      {
        label: "Icons",
        slug: "icons",
        desc: "Dos librerías enlazadas en Figma: Font Awesome 7 para íconos de interfaz y Round World Flags para banderas circulares.",
        nodes: ["5564:123884"],
        live: false
      }
    ]
  },
  {
    id: "components",
    label: "Components",
    dir: "components",
    preview: true,
    docs: COMPONENT_DOCS,
    items: [
      { label: "Accordion", slug: "accordion", desc: "Contenedor colapsable para agrupar contenido extenso.", nodes: ["5167:54214"], live: true },
      { label: "Alert Dialog", slug: "alert-dialog", desc: "Diálogo modal para confirmaciones y avisos críticos.", nodes: ["3588:81707"], live: true },
      { label: "Action Card", slug: "action-card", desc: "Tarjeta con una acción principal destacada.", nodes: ["5167:54342"], live: true },
      { label: "Avatar Selector", slug: "avatar-selector", desc: "Selector de avatar para perfiles de usuario.", nodes: ["5167:54454", "5167:54480"], live: true },
      { label: "Badge", slug: "badge", desc: "Etiqueta compacta para estados y conteos.", nodes: ["5167:54501"], live: true },
      { label: "Banner", slug: "banner", desc: "Banner promocional y banner del Club.", nodes: ["5167:55805", "5167:55812"], live: true },
      { label: "Breadcrumb", slug: "breadcrumb", desc: "Ruta de navegación jerárquica.", nodes: ["5167:59958"], live: true },
      { label: "Buttons", slug: "buttons", desc: "Botones de acción en sus distintas variantes y tamaños.", nodes: ["3570:80903", "5167:79401"], live: true },
      { label: "Calendar", slug: "calendar", desc: "Calendario para selección de fechas.", nodes: ["5167:80655"], live: true },
      { label: "Cards", slug: "cards", desc: "Tarjetas de contenido en sus distintas variantes.", nodes: ["5205:89718", "5205:90295", "5205:90501"], live: true },
      { label: "Checkbox", slug: "checkbox", desc: "Casilla para selección múltiple.", nodes: ["5205:90724"], live: true },
      { label: "Chatbot", slug: "chatbot", desc: "Interfaz conversacional de asistencia.", nodes: ["5205:92334"], live: true },
      { label: "Content Panel", slug: "content-panel", desc: "Panel para bloques de contenido.", nodes: ["5205:98909"], live: true },
      { label: "Date Carousel", slug: "date-carousel", desc: "Carrusel de fechas para comparar tarifas.", nodes: ["5205:106790"], live: true },
      { label: "Data Item", slug: "data-item", desc: "Par etiqueta-valor para mostrar datos.", nodes: ["5205:107801"], live: true },
      { label: "Divider", slug: "divider", desc: "Separador visual entre bloques.", nodes: ["5230:108660"], live: true },
      { label: "Dropdown Menu", slug: "dropdown-menu", desc: "Menú desplegable de opciones.", nodes: ["5230:109302"], live: true },
      { label: "FAQ Panel", slug: "faq-panel", desc: "Panel de preguntas frecuentes.", nodes: ["5279:112230"], live: true },
      { label: "File Upload Card", slug: "file-upload-card", desc: "Tarjeta para carga de archivos.", nodes: ["5279:113127"], live: true },
      { label: "Feature Item", slug: "feature-item", desc: "Ítem para destacar características o beneficios.", nodes: ["5279:113872"], live: true },
      { label: "Flag Selector", slug: "flag-selector", desc: "Selector de país e idioma.", nodes: ["5300:118764"], live: true },
      { label: "Footer", slug: "footer", desc: "Pie de página del sitio.", nodes: ["5550:103925"], live: true },
      { label: "Hero Banner", slug: "hero-banner", desc: "Banner principal de cabecera.", nodes: ["5300:119080"], live: true },
      { label: "Icon Circle", slug: "icon-circle", desc: "Icono contenido en un círculo.", nodes: ["5300:119897"], live: true },
      { label: "Inline Message", slug: "inline-message", desc: "Mensaje contextual dentro del contenido.", nodes: ["5550:107797"], live: true },
      { label: "Info Cards", slug: "info-cards", desc: "Tarjetas informativas breves.", nodes: ["5561:109438"], live: true },
      { label: "Input", slug: "input", desc: "Campos de entrada de texto y sus estados.", nodes: ["6557:1897", "6558:10517"], live: true },
      { label: "Loading Message", slug: "loading-message", desc: "Mensaje de carga y estados de espera.", nodes: ["5562:111454"], live: true },
      { label: "Logos Brands", slug: "logos-brands", desc: "Logos de marca y aliados.", nodes: ["5563:111877"], live: true },
      { label: "Modal", slug: "modal", desc: "Ventana modal sobre el contenido.", nodes: ["6232:173946"], live: true },
      { label: "Navbar", slug: "navbar", desc: "Barra de navegación principal.", nodes: ["6232:174145", "7607:42580", "7607:42659", "7607:42873"], live: true },
      { label: "Newsletter", slug: "newsletter", desc: "Bloque de suscripción al newsletter.", nodes: ["5563:115388"], live: true },
      { label: "Notice Panel", slug: "notice-panel", desc: "Panel de aviso informativo.", nodes: ["5563:117055"], live: true },
      { label: "Notification Item", slug: "notification-item", desc: "Ítem de la lista de notificaciones.", nodes: ["5563:119762"], live: true },
      { label: "Page Indicator", slug: "page-indicator", desc: "Indicador de página para carruseles.", nodes: ["5563:121829", "5563:122964"], live: true },
      { label: "Password Accordion", slug: "password-accordion", desc: "Acordeón con requisitos de contraseña.", nodes: ["5563:123913"], live: true },
      { label: "Payment", slug: "payment", desc: "Métodos y formularios de pago.", nodes: ["6567:76337", "7576:8365", "6567:77547", "7576:8246"], live: true },
      { label: "Progress Bar", slug: "progress-bar", desc: "Barra de progreso.", nodes: ["6065:115112"], live: true },
      { label: "Promo Code", slug: "promo-code", desc: "Ingreso y validación de código promocional.", nodes: ["7538:135574", "6065:115139"], live: true },
      { label: "Quantity Stepper", slug: "quantity-stepper", desc: "Control para aumentar o disminuir cantidades.", nodes: ["7538:131357", "7538:131725", "5356:16037"], live: true },
      { label: "Radio", slug: "radio", desc: "Botón de selección única.", nodes: ["6065:116033"], live: true },
      { label: "Radio Card", slug: "radio-card", desc: "Tarjeta seleccionable de opción única.", nodes: ["6065:116271"], live: true },
      { label: "Scroll Bar", slug: "scroll-bar", desc: "Barra de desplazamiento personalizada.", nodes: ["6065:116375"], live: true },
      { label: "Selection Table", slug: "selection-table", desc: "Tabla con filas seleccionables.", nodes: ["6065:116456"], live: true },
      { label: "Selector Card", slug: "selector-card", desc: "Tarjeta selectora de opciones.", nodes: ["6065:116556"], live: true },
      { label: "Sidebar", slug: "sidebar", desc: "Panel lateral de navegación o contenido.", nodes: ["6567:79655", "7503:122547", "7503:122778", "7503:122805"], live: true },
      { label: "Step Bar", slug: "step-bar", desc: "Barra de pasos de un flujo.", nodes: ["6065:116934"], live: true },
      { label: "Stepper", slug: "stepper", desc: "Indicador de avance por etapas.", nodes: ["6567:81598"], live: true },
      { label: "Table", slug: "table", desc: "Tabla de datos.", nodes: ["6567:84339"], live: true },
      { label: "Tabs", slug: "tabs", desc: "Chips y barras de pestañas para alternar entre vistas.", nodes: ["7350:106944", "6617:86190", "7350:106892", "6617:87408", "6617:87480"], live: true },
      { label: "Timeline", slug: "timeline", desc: "Línea de tiempo de eventos.", nodes: ["6065:117652"], live: true },
      { label: "Toggle", slug: "toggle", desc: "Interruptor de encendido y apagado.", nodes: ["6065:117797"], live: true },
      { label: "Toggle Card", slug: "toggle-card", desc: "Tarjeta con interruptor integrado.", nodes: ["6077:118393"], live: true },
      { label: "Topbar", slug: "topbar", desc: "Barra superior de la aplicación.", nodes: ["5268:109894"], live: true },
      { label: "Tooltip", slug: "tooltip", desc: "Mensaje flotante de ayuda.", nodes: ["6077:123603"], live: true }
    ]
  },
  {
    id: "product-components",
    label: "Product Components",
    dir: "product-components",
    preview: true,
    docs: COMPONENT_DOCS,
    items: [
      { label: "Action Panel", slug: "action-panel", desc: "Panel de acciones contextuales del producto.", nodes: ["6187:2321"], live: false },
      { label: "Add Baggage Card", slug: "add-baggage-card", desc: "Tarjeta para agregar equipaje.", nodes: ["6186:135425"], live: true },
      { label: "Add-on Selector", slug: "add-on-selector", desc: "Selector de servicios adicionales.", nodes: ["5469:12321"], live: true },
      { label: "Boarding Pass Card", slug: "boarding-pass-card", desc: "Tarjeta de pase de abordar.", nodes: ["6186:138537"], live: true },
      { label: "Bundle Card", slug: "bundle-card", desc: "Tarjeta de paquete de servicios.", nodes: ["6186:139756"], live: true },
      { label: "Flight Card", slug: "flight-card", desc: "Tarjeta de vuelo con horarios y tarifas.", nodes: ["6186:142603"], live: true },
      { label: "Flight Details Card", slug: "flight-details-card", desc: "Tarjeta con el detalle del vuelo.", nodes: ["6186:145649"], live: true },
      { label: "Flight Status Widget", slug: "flight-status-widget", desc: "Widget de estado de vuelo.", nodes: ["6186:148344"], live: true },
      { label: "Flight Leg Selection", slug: "flight-leg-selection", desc: "Selección de tramos del vuelo.", nodes: ["6186:149903"], live: true },
      { label: "Flight Summary Card", slug: "flight-summary-card", desc: "Resumen del vuelo seleccionado.", nodes: ["6186:150529"], live: true },
      { label: "Frequent Traveler Item", slug: "frequent-traveler-item", desc: "Ítem de viajero frecuente.", nodes: ["6186:153087"], live: true },
      { label: "Itinerary Fare Summary", slug: "itinerary-fare-summary", desc: "Resumen de itinerario y tarifas.", nodes: ["6186:156082"], live: true },
      { label: "Membership Plan Card", slug: "membership-plan-card", desc: "Tarjeta de plan de membresía.", nodes: ["5636:125790"], live: true },
      { label: "Passenger Item", slug: "passenger-item", desc: "Ítem de pasajero.", nodes: ["6186:158033"], live: true },
      { label: "Passenger Form Accordion", slug: "passenger-form-accordion", desc: "Acordeón con el formulario de pasajero.", nodes: ["5167:85834"], live: true },
      { label: "Passenger Stepper", slug: "passenger-stepper", desc: "Control de cantidad de pasajeros.", nodes: ["5543:70065"], live: true },
      { label: "Receipt Summary Card", slug: "receipt-summary-card", desc: "Tarjeta de resumen de compra.", nodes: ["6186:161150"], live: true },
      { label: "Profile Summary Card", slug: "profile-summary-card", desc: "Tarjeta de resumen de perfil.", nodes: ["5543:64060"], live: true },
      { label: "Search Summary", slug: "search-summary", desc: "Resumen de la búsqueda de vuelos.", nodes: ["5543:35599"], live: true },
      { label: "Seat Selector", slug: "seat-selector", desc: "Selector de asientos.", nodes: ["6573:156899"], live: true },
      { label: "Seat Selection Sidebar", slug: "seat-selection-sidebar", desc: "Panel lateral de selección de asiento.", nodes: ["6186:161989"], live: true },
      { label: "Summary Bar", slug: "summary-bar", desc: "Barra de resumen y total de la compra.", nodes: ["6229:172143"], live: true },
      { label: "Trip Status Card", slug: "trip-status-card", desc: "Tarjeta de estado del viaje.", nodes: ["6186:168687"], live: true },
      { label: "Searchbox Widget", slug: "searchbox-widget", desc: "Widget de búsqueda de vuelos.", nodes: ["4802:1399"], live: false }
    ]
  },
  {
    id: "patterns",
    label: "Patterns",
    dir: "patterns",
    preview: true,
    docs: PATTERN_DOCS,
    items: [
      {
        label: "Overview",
        slug: "index",
        id: "patterns-overview",
        desc: "Combinaciones de componentes para flujos y experiencias completas.",
        nodes: ["3072:78207"],
        live: false
      }
    ]
  },
  {
    id: "flows",
    label: "Flows",
    dir: "flows",
    preview: true,
    docs: FLOW_DOCS,
    items: [
      { label: "Home", slug: "home", id: "flows-home", desc: "Pantallas de la home en desktop y mobile.", nodes: ["3496:11099"], live: false },
      { label: "Booking", slug: "booking", id: "flows-booking", desc: "Flujo completo de reserva de vuelos.", nodes: ["2742:58106"], live: false },
      {
        label: "Administra tu vuelo",
        slug: "administra-tu-vuelo",
        id: "flows-administra-tu-vuelo",
        desc: "Flujo de gestión de una reserva existente.",
        nodes: ["1368:13480"],
        live: false
      },
      {
        label: "Administración de Usuario",
        slug: "administracion-de-usuario",
        id: "flows-administracion-de-usuario",
        desc: "Pantallas de cuenta y perfil de usuario.",
        nodes: ["2370:21781"],
        live: false
      }
    ]
  }
];

// Páginas de la versión anterior del sitio que ya no existen en Figma o cambiaron de nombre.
const STALE_FILES = [
  "foundations/color.html",
  "foundations/fonts.html",
  "components/date-carrusel.html",
  "patterns/booking-flow.html",
  "patterns/search-results.html"
];

function embedUrl(nodeId) {
  const fileUrl = encodeURIComponent(
    `https://www.figma.com/design/${FILE_KEY}/${FILE_NAME}?node-id=${nodeId.replace(":", "-")}`
  );
  return `https://www.figma.com/embed?embed_host=share&url=${fileUrl}`;
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function previewSection(item) {
  const heading = item.live ? "Live Preview" : "Preview · frame provisional";
  const frames = item.nodes
    .map(
      (nodeId, index) => `            <div class="figma-preview__frame">
              <iframe
                title="${escapeHtml(item.label)} - Figma preview${item.nodes.length > 1 ? ` ${index + 1}` : ""}"
                src="${embedUrl(nodeId)}"
                loading="lazy"
                allowfullscreen>
              </iframe>
            </div>`
    )
    .join("\n");

  return `          <section class="figma-preview">
            <p class="figma-preview__label">${heading}</p>
${frames}
          </section>`;
}

function docSections(docs) {
  return docs
    .map(([heading, text, isComingSoon]) => {
      const anchor = `doc-${heading
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;
      const paragraph = isComingSoon ? `<p class="coming-soon">${text}</p>` : `<p>${text}</p>`;
      return `          <section class="doc-section">
            <h2 id="${anchor}">${heading}</h2>
            ${paragraph}
          </section>`;
    })
    .join("\n\n");
}

function pageHtml(section, item) {
  const blocks = [];
  if (section.preview) {
    blocks.push(previewSection(item));
  }
  blocks.push(docSections(section.docs));

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(item.label)} - JetSmart UI Kit</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../assets/css/custom.css">
</head>
<body data-page-id="${item.id || item.slug}">
  <div id="sidebar-overlay" aria-hidden="true"></div>
  <div id="app-shell">
    <aside id="sidebar"></aside>
    <div class="main-column">
      <header id="topbar"></header>
      <div class="content-wrap">
        <main>
          <header class="page-header">
            <p class="page-header__eyebrow">${escapeHtml(section.label)}</p>
            <h1>${escapeHtml(item.label)}</h1>
            <p>${escapeHtml(item.desc)}</p>
          </header>

${blocks.join("\n\n")}
        </main>
        <aside id="page-toc"></aside>
      </div>
    </div>
  </div>
  <script>window.JETSMART_BASE = "../";</script>
  <script src="../assets/js/nav-data.js"></script>
  <script src="../assets/js/layout.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

function navDataJs() {
  const sections = SECTIONS.map((section) => {
    const items = section.items
      .map((item) => {
        const extra = item.nodes.length > 1 ? `, figmaNodeIds: ${JSON.stringify(item.nodes)}` : "";
        return `        { id: "${item.id || item.slug}", label: ${JSON.stringify(item.label)}, href: "${section.dir}/${item.slug}.html", figmaNodeId: "${item.nodes[0]}"${extra} }`;
      })
      .join(",\n");

    return `    {
      id: "${section.id}",
      label: "${section.label}",
      items: [
${items}
      ]
    }`;
  }).join(",\n");

  return `// Generado por tools/generate-pages.mjs — no editar a mano.
window.JETSMART_NAV = {
  fileKey: "${FILE_KEY}",
  fileName: "${FILE_NAME}",
  sections: [
${sections}
  ]
};

window.JETSMART_NAV.getFigmaEmbedUrl = function (nodeId) {
  var fileUrl = encodeURIComponent(
    "https://www.figma.com/design/" +
      this.fileKey +
      "/" +
      this.fileName +
      "?node-id=" +
      nodeId.replace(":", "-")
  );
  return "https://www.figma.com/embed?embed_host=share&url=" + fileUrl;
};

window.JETSMART_NAV.findItemById = function (pageId) {
  for (var i = 0; i < this.sections.length; i++) {
    var section = this.sections[i];
    for (var j = 0; j < section.items.length; j++) {
      if (section.items[j].id === pageId) {
        return { section: section, item: section.items[j] };
      }
    }
  }
  return null;
};
`;
}

// Por defecto el generador NUNCA sobrescribe una página que ya existe: solo crea las
// que faltan. Así documentar una página a mano no exige marcarla de ninguna forma.
// Con --force vuelve al comportamiento antiguo y reescribe todo desde la plantilla.
const FORCE = process.argv.includes("--force");

let creadas = 0;
let conservadas = 0;
const nuevas = [];

for (const section of SECTIONS) {
  await mkdir(path.join(ROOT, section.dir), { recursive: true });

  for (const item of section.items) {
    const rel = `${section.dir}/${item.slug}.html`;
    if (!FORCE && existsSync(path.join(ROOT, rel))) {
      conservadas++;
      continue;
    }
    await writeFile(path.join(ROOT, rel), pageHtml(section, item), "utf8");
    creadas++;
    nuevas.push(rel);
  }
}

// nav-data.js sí se regenera siempre: es un archivo derivado, no se edita a mano.
await writeFile(path.join(ROOT, "assets/js/nav-data.js"), navDataJs(), "utf8");

for (const relPath of STALE_FILES) {
  await rm(path.join(ROOT, relPath), { force: true });
}

if (FORCE) {
  console.log(`--force: ${creadas} páginas reescritas desde la plantilla.`);
  console.log("  Revisa `git status`: esto pisa cualquier documentación escrita a mano.");
} else {
  console.log(`Páginas creadas: ${creadas} · conservadas sin tocar: ${conservadas}`);
  for (const rel of nuevas) {
    console.log(`  + ${rel}`);
  }
}
for (const section of SECTIONS) {
  const preview = section.preview ? "con preview" : "sin preview";
  console.log(`  ${section.label}: ${section.items.length} (${preview}, ${section.docs.length} secciones doc)`);
}
console.log("nav-data.js actualizado");
