/**
 * Datos y renderizado de la página Foundations · Color.
 *
 * Los valores son los de las variables de color del archivo de Figma
 * "Jetsmart UI Kit v1.0": 106 primitivos en Tier 1 y 77 tokens semánticos en
 * Tier 2, cada uno con el alias al primitivo que referencia.
 *
 * Los contrastes NO están escritos a mano: se calculan con la fórmula de
 * luminancia relativa de WCAG 2.1 a partir de los mismos hex, igual que los
 * niveles AA / AAA y los conteos de alias por paso de rampa.
 */
(function () {
  "use strict";

  var ZONES = [
    { steps: ["50", "100"], label: "Fondos" },
    { steps: ["200", "300", "400"], label: "Decorativo" },
    { steps: ["500"], label: "Color base" },
    { steps: ["600", "700"], label: "Acción" },
    { steps: ["800", "900", "950"], label: "Contenido" }
  ];

  var ZONE_DOCS = [
    {
      range: "50 – 100",
      tag: "Fondos",
      text: "Superficies tintadas y fondos subtle. Contraste bajo por diseño: nunca llevan texto de su propio color sin reforzar."
    },
    {
      range: "200 – 400",
      tag: "Decorativo",
      text: "Ilustración, gráficos y bordes decorativos. En la mayoría de las rampas no tienen alias en Tier 2."
    },
    {
      range: "500",
      tag: "Color base",
      text: "El color de identidad de la rampa. Es el paso que la gente reconoce como «el color», pero no siempre cumple contraste."
    },
    {
      range: "600 – 700",
      tag: "Acción",
      text: "Estados hover y bordes que deben cumplir el 3:1 de WCAG 1.4.11."
    },
    {
      range: "800 – 950",
      tag: "Contenido",
      text: "Texto e iconos sobre fondos claros, y fondos inversos. Es la zona que garantiza 4,5:1."
    }
  ];

  var RAMPS = [
    {
      path: "brand/royal-navy-blue",
      label: "Royal Navy Blue",
      role: "Marca primaria",
      desc: "Color institucional de Jetsmart. Alimenta todos los tokens brand-primary de fondo, contenido y borde. El paso 500 es el azul de marca.",
      note: "Los pasos 200 a 400 no tienen alias en Tier 2: existen para ilustraciones y gráficos, no para interfaz.",
      steps: [
        ["50", "#EEF2F6"],
        ["100", "#D5DFEF"],
        ["200", "#9EB3D6"],
        ["300", "#6581B3"],
        ["400", "#35518A"],
        ["500", "#153266"],
        ["600", "#11294F"],
        ["700", "#0D2042"],
        ["800", "#0A1832"],
        ["900", "#070F20"],
        ["950", "#040813"]
      ]
    },
    {
      path: "brand/medium-ruby",
      label: "Medium Ruby",
      role: "Marca secundaria",
      desc: "Color de marca secundario. Sostiene acciones destacadas, precios en campaña y los tokens brand-secondary.",
      note: "El paso 500 pasa 4,5:1 sobre blanco, por eso puede llevar texto e icono directamente.",
      steps: [
        ["50", "#FDF3F4"],
        ["100", "#F9DDE0"],
        ["200", "#EEB4BA"],
        ["300", "#DF8790"],
        ["400", "#CC555F"],
        ["500", "#AF272F"],
        ["600", "#911F27"],
        ["700", "#74191F"],
        ["800", "#561318"],
        ["900", "#3A0D10"],
        ["950", "#220709"]
      ]
    },
    {
      path: "brand/bayou",
      label: "Bayou",
      role: "Marca terciaria",
      desc: "Color de marca terciario, para superficies tintadas y acentos de apoyo. Sus pasos claros no alcanzan 3:1, por eso los tokens de texto y borde saltan a 700–800.",
      note: "bayou/500 solo alcanza 2,66:1 sobre blanco: nunca lo uses como color de texto ni de borde informativo.",
      steps: [
        ["50", "#F0FAFB"],
        ["100", "#D6F0F4"],
        ["200", "#AADFE8"],
        ["300", "#73C7D6"],
        ["400", "#3FB3C8"],
        ["500", "#14AEC7"],
        ["600", "#0F8EA3"],
        ["700", "#0C7081"],
        ["800", "#0A5663"],
        ["900", "#073D47"],
        ["950", "#04262D"]
      ]
    },
    {
      path: "brand/amber",
      label: "Amber",
      role: "Accent",
      desc: "Color accent. Reservado para promociones y realces puntuales. Su par de contenido es negro, nunca blanco.",
      note: "amber/500 tiene 1,99:1 sobre blanco. Para texto sobre fondos claros el kit usa amber/900.",
      steps: [
        ["50", "#FFF9EC"],
        ["100", "#FFECCF"],
        ["200", "#FDD795"],
        ["300", "#FCC053"],
        ["400", "#FCB028"],
        ["500", "#FFA400"],
        ["600", "#DA8600"],
        ["700", "#A96500"],
        ["800", "#7E4C07"],
        ["900", "#5D390C"],
        ["950", "#392205"]
      ]
    },
    {
      path: "slate",
      label: "Slate",
      role: "Neutrales",
      desc: "Rampa neutra del producto. Define las superficies, el texto primario, secundario y terciario, los placeholders y la mayoría de los bordes.",
      note: "Es la rampa con más alias del kit: casi todo el texto y los bordes neutros salen de aquí.",
      steps: [
        ["50", "#F4F7FB"],
        ["100", "#E7EDF4"],
        ["200", "#CFD9E5"],
        ["300", "#B4C3D4"],
        ["400", "#98AAC0"],
        ["500", "#7E92A9"],
        ["600", "#62768E"],
        ["700", "#495B71"],
        ["800", "#314156"],
        ["900", "#1E2A3A"],
        ["950", "#151823"]
      ]
    },
    {
      path: "utility/green",
      label: "Utility Green",
      role: "Success",
      desc: "Utility success. Confirmaciones, pagos aprobados, check-in completado y mensajes de éxito.",
      note: "El fondo usa green/600 y el texto sobre fondo claro usa green/900: el 500 no llega a 4,5:1 sobre blanco.",
      steps: [
        ["50", "#F0FDF4"],
        ["100", "#DCFCE7"],
        ["200", "#BBF7D0"],
        ["300", "#86EFAC"],
        ["400", "#4ADE80"],
        ["500", "#22C55E"],
        ["600", "#16A34A"],
        ["700", "#15803D"],
        ["800", "#166534"],
        ["900", "#14532D"],
        ["950", "#022C22"]
      ]
    },
    {
      path: "utility/red",
      label: "Utility Red",
      role: "Error",
      desc: "Utility error. Validaciones de formulario, errores de pago, estados destructivos y mensajes de bloqueo.",
      note: "El rojo nunca comunica solo: acompáñalo siempre de icono y texto.",
      steps: [
        ["50", "#FEF2F2"],
        ["100", "#FEE2E2"],
        ["200", "#FECACA"],
        ["300", "#FCA5A5"],
        ["400", "#F87171"],
        ["500", "#EF4444"],
        ["600", "#DC2626"],
        ["700", "#B91C1C"],
        ["800", "#991B1B"],
        ["900", "#7F1D1D"],
        ["950", "#450A0A"]
      ]
    },
    {
      path: "utility/yellow",
      label: "Utility Yellow",
      role: "Warning",
      desc: "Utility warning. Avisos que piden atención sin bloquear la tarea: cambios de horario, documentación pendiente, equipaje por confirmar.",
      note: "yellow/500 es el único fondo de utility que lleva contenido negro: con blanco solo alcanza 1,92:1.",
      steps: [
        ["50", "#FEFCE8"],
        ["100", "#FEF9C3"],
        ["200", "#FEF08A"],
        ["300", "#FDE047"],
        ["400", "#FACC15"],
        ["500", "#EAB308"],
        ["600", "#CA8A04"],
        ["700", "#A16207"],
        ["800", "#854D0E"],
        ["900", "#713F12"],
        ["950", "#422006"]
      ]
    },
    {
      path: "utility/blue",
      label: "Utility Blue",
      role: "Info y foco",
      desc: "Utility info. Mensajes informativos y, sobre todo, el anillo de foco del kit: border/focus apunta a blue/500.",
      note: "El foco es accesibilidad, no decoración: blue/500 no se reemplaza por un color de marca.",
      steps: [
        ["50", "#EFF6FF"],
        ["100", "#DBEAFE"],
        ["200", "#BFDBFE"],
        ["300", "#93C5FD"],
        ["400", "#60A5FA"],
        ["500", "#3B82F6"],
        ["600", "#2563EB"],
        ["700", "#1D4ED8"],
        ["800", "#1E40AF"],
        ["900", "#1E3A8A"],
        ["950", "#172554"]
      ]
    },
    {
      path: "",
      label: "Base",
      role: "Blanco y negro",
      desc: "Blanco y negro puros. Solo se usan a través de tokens semánticos: content/inverse, content/on-brand-primary, background/primary y border/inverse.",
      note: "Nunca escribas #FFFFFF ni #000000 a mano en un componente: siempre pasa por el token semántico que corresponde.",
      steps: [
        ["white", "#FFFFFF"],
        ["black", "#000000"]
      ]
    }
  ];

  var SEMANTIC = [
    {
      key: "background",
      label: "Background",
      scope: "FRAME_FILL · SHAPE_FILL",
      intro: "Se aplica como Fill de un frame o shape. Es la superficie sobre la que se apoya todo lo demás.",
      groups: [
        {
          label: "Marca",
          desc: "Cuatro colores de marca × tres intensidades. El token base pinta la superficie sólida, -strong resuelve hover y presionado, -subtle es el fondo tintado de baja énfasis.",
          tokens: [
            ["brand-primary", "brand/royal-navy-blue/500", "#153266"],
            ["brand-primary-strong", "brand/royal-navy-blue/600", "#11294F"],
            ["brand-primary-subtle", "brand/royal-navy-blue/100", "#D5DFEF"],
            ["brand-secondary", "brand/medium-ruby/500", "#AF272F"],
            ["brand-secondary-strong", "brand/medium-ruby/700", "#74191F"],
            ["brand-secondary-subtle", "brand/medium-ruby/100", "#F9DDE0"],
            ["brand-tertiary", "brand/bayou/500", "#14AEC7"],
            ["brand-tertiary-strong", "brand/bayou/600", "#0F8EA3"],
            ["brand-tertiary-subtle", "brand/bayou/100", "#D6F0F4"],
            ["brand-accent", "brand/amber/500", "#FFA400"],
            ["brand-accent-strong", "brand/amber/700", "#A96500"],
            ["brand-accent-subtle", "brand/amber/50", "#FFF9EC"]
          ]
        },
        {
          label: "Superficies",
          desc: "La base neutra del producto: página, tarjeta, sección alterna y estado inverso.",
          note: "background/transparent es el único token sin alias a Tier 1: es blanco con opacidad 0 y sirve para estados sin fondo.",
          tokens: [
            ["primary", "white", "#FFFFFF"],
            ["secondary", "slate/100", "#E7EDF4"],
            ["tertiary", "slate/50", "#F4F7FB"],
            ["subtle", "brand/royal-navy-blue/50", "#EEF2F6"],
            ["neutral", "slate/300", "#B4C3D4"],
            ["strong", "slate/900", "#1E2A3A"],
            ["inverse", "slate/950", "#151823"],
            ["transparent", null, "#FFFFFF00"]
          ]
        },
        {
          label: "Utility",
          desc: "Cuatro estados × dos intensidades. El token sólido se usa en badges y barras de estado; el -subtle en banners y alertas embebidas.",
          note: "Cada fondo sólido tiene un content/on-utility-* asignado. No elijas el color del texto a ojo: usa el par.",
          tokens: [
            ["utility-success", "utility/green/600", "#16A34A"],
            ["utility-success-subtle", "utility/green/100", "#DCFCE7"],
            ["utility-warning", "utility/yellow/500", "#EAB308"],
            ["utility-warning-subtle", "utility/yellow/100", "#FEF9C3"],
            ["utility-error", "utility/red/600", "#DC2626"],
            ["utility-error-subtle", "utility/red/100", "#FEE2E2"],
            ["utility-info", "utility/blue/600", "#2563EB"],
            ["utility-info-subtle", "utility/blue/100", "#DBEAFE"]
          ]
        }
      ]
    },
    {
      key: "content",
      label: "Content",
      scope: "TEXT_FILL",
      intro: "Se aplica como color de texto o de icono. El icono es contenido: nunca lleva un token de fondo.",
      groups: [
        {
          label: "Marca",
          desc: "Texto e iconos con color de marca sobre fondos claros. La versión -strong existe porque el paso 500 de bayou y amber no alcanza el contraste mínimo.",
          note: "content/brand-tertiary y content/brand-accent no cumplen 4,5:1 sobre blanco. Para texto, usa siempre la variante -strong.",
          tokens: [
            ["brand-primary", "brand/royal-navy-blue/500", "#153266"],
            ["brand-primary-strong", "brand/royal-navy-blue/600", "#11294F"],
            ["brand-secondary", "brand/medium-ruby/500", "#AF272F"],
            ["brand-secondary-strong", "brand/medium-ruby/600", "#911F27"],
            ["brand-tertiary", "brand/bayou/500", "#14AEC7"],
            ["brand-tertiary-strong", "brand/bayou/800", "#0A5663"],
            ["brand-accent", "brand/amber/500", "#FFA400"],
            ["brand-accent-strong", "brand/amber/900", "#5D390C"]
          ]
        },
        {
          label: "Neutrales",
          desc: "La jerarquía de lectura del producto. Cada token baja un escalón de énfasis: título, cuerpo, apoyo, placeholder, deshabilitado.",
          note: "content/placeholder y content/disabled no cumplen 4,5:1 a propósito: comunican «aquí no hay contenido todavía» o «esto no está disponible».",
          tokens: [
            ["primary", "slate/900", "#1E2A3A"],
            ["secondary", "slate/700", "#495B71"],
            ["tertiary", "slate/600", "#62768E"],
            ["placeholder", "slate/500", "#7E92A9"],
            ["disabled", "slate/300", "#B4C3D4"],
            ["disabled-on-brand", "slate/700", "#495B71"]
          ]
        },
        {
          label: "Utility",
          desc: "El texto del mensaje de estado cuando el fondo es claro o -subtle. Son pasos oscuros de la rampa (800–900) justamente para cumplir contraste.",
          note: "No confundir con los on-utility-*: estos van sobre fondos claros, los on-* van sobre el fondo sólido del estado.",
          tokens: [
            ["utility-success", "utility/green/900", "#14532D"],
            ["utility-warning", "utility/yellow/900", "#713F12"],
            ["utility-error", "utility/red/800", "#991B1B"],
            ["utility-info", "utility/blue/800", "#1E40AF"]
          ]
        },
        {
          label: "Sobre fondo sólido",
          desc: "Para cada fondo sólido existe un token de contenido ya validado por contraste. No se elige a ojo: se toma el par que corresponde al fondo.",
          note: "on-brand-accent es negro y on-utility-warning también: amber y yellow no admiten texto blanco.",
          tokens: [
            ["inverse", "white", "#FFFFFF"],
            ["on-brand-primary", "white", "#FFFFFF"],
            ["on-brand-secondary", "white", "#FFFFFF"],
            ["on-brand-tertiary", "white", "#FFFFFF"],
            ["on-brand-accent", "black", "#000000"],
            ["on-utility-success", "white", "#FFFFFF"],
            ["on-utility-warning", "black", "#000000"],
            ["on-utility-error", "white", "#FFFFFF"],
            ["on-utility-info", "white", "#FFFFFF"]
          ]
        }
      ]
    },
    {
      key: "border",
      label: "Border",
      scope: "STROKE_COLOR",
      intro: "Se aplica como Stroke: separadores, contornos de input, tarjetas seleccionadas y el anillo de foco.",
      groups: [
        {
          label: "Marca",
          desc: "Bordes que llevan color de marca: outline de botones, tarjetas seleccionadas, chips activos. La versión -strong es la que cumple el 3:1 de WCAG 1.4.11.",
          note: "border/brand-tertiary (2,66:1) y border/brand-accent (1,99:1) no cumplen 3:1. Si el borde comunica estado, usa -strong.",
          tokens: [
            ["brand-primary", "brand/royal-navy-blue/500", "#153266"],
            ["brand-primary-strong", "brand/royal-navy-blue/600", "#11294F"],
            ["brand-secondary", "brand/medium-ruby/500", "#AF272F"],
            ["brand-secondary-strong", "brand/medium-ruby/600", "#911F27"],
            ["brand-tertiary", "brand/bayou/500", "#14AEC7"],
            ["brand-tertiary-strong", "brand/bayou/700", "#0C7081"],
            ["brand-accent", "brand/amber/500", "#FFA400"],
            ["brand-accent-strong", "brand/amber/700", "#A96500"]
          ]
        },
        {
          label: "Neutrales y estado",
          desc: "Separadores, contornos de input, el anillo de foco y los bordes de los cuatro estados de utilidad.",
          note: "border/focus es accesibilidad, no estilo: no se reemplaza por un color de marca ni se quita en ningún componente.",
          tokens: [
            ["primary", "slate/300", "#B4C3D4"],
            ["secondary", "slate/200", "#CFD9E5"],
            ["tertiary", "brand/bayou/100", "#D6F0F4"],
            ["inverse", "white", "#FFFFFF"],
            ["focus", "utility/blue/500", "#3B82F6"],
            ["utility-success", "utility/green/600", "#16A34A"],
            ["utility-warning", "utility/yellow/500", "#EAB308"],
            ["utility-error", "utility/red/600", "#DC2626"],
            ["utility-info", "utility/blue/600", "#2563EB"]
          ]
        }
      ]
    },
    {
      key: "effect",
      label: "Effect",
      scope: "EFFECT_COLOR",
      intro: "El color de las sombras. No se aplica a mano: llega a través de los estilos de efecto del kit, documentados en Elevations.",
      groups: [
        {
          label: "Elevación",
          desc: "Cinco niveles, todos derivados de slate/400 con distinta opacidad.",
          tokens: [
            ["elevation-xs", "shadow/base-14", "#98AAC024"],
            ["elevation-sm", "shadow/base-18", "#98AAC02E"],
            ["elevation-md", "shadow/base-24", "#98AAC03D"],
            ["elevation-lg", "shadow/base-32", "#98AAC052"],
            ["elevation-xl", "shadow/base-42", "#98AAC06B"]
          ]
        }
      ]
    }
  ];

  var PAIRS = [
    ["background/brand-primary", "content/on-brand-primary"],
    ["background/brand-primary-subtle", "content/brand-primary-strong"],
    ["background/brand-secondary", "content/on-brand-secondary"],
    ["background/brand-secondary-subtle", "content/brand-secondary-strong"],
    ["background/brand-tertiary", "content/on-brand-tertiary"],
    ["background/brand-tertiary-subtle", "content/brand-tertiary-strong"],
    ["background/brand-accent", "content/on-brand-accent"],
    ["background/brand-accent-subtle", "content/brand-accent-strong"],
    ["background/utility-success", "content/on-utility-success"],
    ["background/utility-success-subtle", "content/utility-success"],
    ["background/utility-warning", "content/on-utility-warning"],
    ["background/utility-warning-subtle", "content/utility-warning"],
    ["background/utility-error", "content/on-utility-error"],
    ["background/utility-error-subtle", "content/utility-error"],
    ["background/utility-info", "content/on-utility-info"],
    ["background/utility-info-subtle", "content/utility-info"],
    ["background/primary", "content/primary"],
    ["background/inverse", "content/inverse"]
  ];

  var COVERAGE = [
    {
      token: "content/brand-tertiary",
      min: 4.5,
      rule: "Texto · 4,5:1",
      fix: "content/brand-tertiary-strong",
      why: "bayou/800"
    },
    {
      token: "content/brand-accent",
      min: 4.5,
      rule: "Texto · 4,5:1",
      fix: "content/brand-accent-strong",
      why: "amber/900"
    },
    {
      token: "border/brand-tertiary",
      min: 3,
      rule: "Borde · 3:1",
      fix: "border/brand-tertiary-strong",
      why: "bayou/700"
    },
    {
      token: "border/brand-accent",
      min: 3,
      rule: "Borde · 3:1",
      fix: "border/brand-accent-strong",
      why: "amber/700"
    },
    {
      token: "content/placeholder",
      min: 4.5,
      rule: "Texto · 4,5:1",
      intentional: "Solo para texto de ejemplo dentro de un input vacío, nunca para contenido real."
    },
    {
      token: "content/disabled",
      min: 4.5,
      rule: "Texto · 4,5:1",
      intentional: "WCAG exime a los controles deshabilitados, pero el estado debe leerse también sin color."
    }
  ];

  var NAMING = [
    ["background/", "Categoría", "Se aplica como Fill de un frame o shape. Scope: FRAME_FILL y SHAPE_FILL."],
    ["content/", "Categoría", "Se aplica como color de texto o de icono. Scope: TEXT_FILL."],
    ["border/", "Categoría", "Se aplica como Stroke. Scope: STROKE_COLOR."],
    ["brand-primary", "Rol", "Qué representa: marca primaria, secundaria, terciaria, accent, o un estado de utilidad."],
    ["-strong", "Modificador", "Un paso más oscuro. Hover, presionado, y la variante que cumple contraste cuando la base no llega."],
    ["-subtle", "Modificador", "Fondo tintado de baja énfasis. Siempre se combina con un contenido -strong."],
    ["on-", "Modificador", "Contenido que va encima de un fondo sólido. Su valor ya está validado por contraste contra ese fondo."]
  ];

  var COLLECTIONS = [
    {
      name: "Tier 1: Core Primitives",
      mode: "Default",
      total: 224,
      colors: 106,
      role: "Las nueve rampas de 11 pasos, blanco y negro, y los cinco tonos de sombra. Solo se edita cuando cambia la paleta de marca."
    },
    {
      name: "Tier 2: Color",
      mode: "Theme 1",
      total: 77,
      colors: 77,
      role: "background/, content/, border/ y effect/. Es la colección que se usa a diario."
    },
    {
      name: "Tier 2: Typography",
      mode: "Theme 1",
      total: 325,
      colors: 0,
      role: "Familia, peso, tamaño, interlineado y tracking de cada estilo de texto."
    },
    {
      name: "Tier 2: Spatial & Shape",
      mode: "Theme 1",
      total: 96,
      colors: 0,
      role: "Espaciado, radios y grosores."
    },
    {
      name: "Tier 3: Components",
      mode: "Mode 1",
      total: 5,
      colors: 5,
      role: "Excepciones atadas a un componente concreto: hoy solo los iconos de asiento del selector."
    }
  ];

  var APPLY = [
    ["Fill de un frame", "background/", "Selecciona el frame → Fill → icono de variable → background/…"],
    ["Color de texto", "content/", "Selecciona el texto → Fill → icono de variable → content/…"],
    ["Iconos", "content/", "El icono es contenido: usa content/… en su Fill, no un token de fondo."],
    ["Stroke", "border/", "Selecciona el nodo → Stroke → icono de variable → border/…"],
    ["Sombra", "effect/", "Las sombras no se pintan a mano: se aplican con los estilos de efecto del kit."]
  ];

  var UPDATES = [
    {
      goal: "Cambio de tono",
      where: "Edita Tier 2",
      text: "Reapunta el alias del token semántico a otro paso de la rampa. Todos los componentes lo reciben."
    },
    {
      goal: "Cambio de marca",
      where: "Edita Tier 1",
      text: "Cambia el valor del primitivo. Afecta a todos los tokens que lo referencian: revisa antes cuáles son."
    },
    {
      goal: "Nunca en el nodo",
      where: "Prohibido",
      text: "Corregir el color en el componente crea una excepción invisible que nadie encontrará después."
    },
    {
      goal: "Antes de publicar",
      where: "Contraste",
      text: "Cualquier cambio de alias obliga a recalcular el contraste de las parejas afectadas."
    },
    {
      goal: "Publicar",
      where: "Librería",
      text: "Los cambios llegan a producto al publicar la librería y aceptar la actualización en cada archivo."
    }
  ];

  /* --- Contraste WCAG 2.1 ------------------------------------------------ */

  function channel(v) {
    var c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function luminance(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  }

  function hasAlpha(hex) {
    return hex.length > 7;
  }

  function contrast(a, b) {
    if (!a || !b || hasAlpha(a) || hasAlpha(b)) {
      return null;
    }
    var la = luminance(a);
    var lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  var MIN_TEXT = 4.5;
  var MIN_BORDER = 3;

  function ratioText(value) {
    return value === null ? "—" : value.toFixed(2).replace(".", ",") + ":1";
  }

  function ratioCell(value, min) {
    if (value === null) {
      return '<span class="ty-muted">—</span>';
    }
    return (
      '<span class="cl-ratio cl-ratio--' +
      (value >= min ? "ok" : "fail") +
      '">' +
      ratioText(value) +
      "</span>"
    );
  }

  function wcagLevel(value) {
    if (value === null) {
      return { label: "—", kind: "neutral" };
    }
    if (value >= 7) {
      return { label: "AAA", kind: "on" };
    }
    if (value >= 4.5) {
      return { label: "AA", kind: "on" };
    }
    if (value >= 3) {
      return { label: "AA large", kind: "var" };
    }
    return { label: "Falla", kind: "off" };
  }

  /* --- Índices ----------------------------------------------------------- */

  var TOKENS = {};
  var ALIAS_COUNT = {};

  SEMANTIC.forEach(function (cat) {
    cat.groups.forEach(function (group) {
      group.tokens.forEach(function (t) {
        TOKENS[cat.key + "/" + t[0]] = { hex: t[2], alias: t[1], category: cat.key };
        if (t[1]) {
          ALIAS_COUNT[t[1]] = (ALIAS_COUNT[t[1]] || 0) + 1;
        }
      });
    });
  });

  RAMPS.forEach(function (ramp) {
    ramp.steps.forEach(function (step) {
      TOKENS[rampStepPath(ramp, step)] = { hex: step[1], alias: null, category: "primitive" };
    });
  });

  function rampStepPath(ramp, step) {
    return ramp.path ? ramp.path + "/" + step[0] : step[0];
  }

  function cssVarName(path) {
    return "--c-" + path.replace(/\//g, "-");
  }

  function injectColorVars() {
    var rules = [];

    Object.keys(TOKENS).forEach(function (path) {
      if (TOKENS[path].category !== "primitive") {
        rules.push(cssVarName(path) + ":" + TOKENS[path].hex + ";");
      }
    });

    RAMPS.forEach(function (ramp) {
      ramp.steps.forEach(function (step) {
        rules.push("--p-" + rampStepPath(ramp, step).replace(/\//g, "-") + ":" + step[1] + ";");
      });
    });

    var el = document.createElement("style");
    el.id = "cl-generated-vars";
    el.textContent = ":root{" + rules.join("") + "}";
    document.head.appendChild(el);
  }

  /* --- Helpers de markup ------------------------------------------------- */

  function token(name) {
    return '<button type="button" class="ty-token" title="Copiar token">' + name + "</button>";
  }

  function badge(text, kind) {
    return '<span class="ty-badge ty-badge--' + kind + '">' + text + "</span>";
  }

  function swatch(hex, category) {
    if (category === "content") {
      return '<span class="cl-swatch cl-swatch--text" style="color:' + hex + '">Aa</span>';
    }
    if (category === "border") {
      return '<span class="cl-swatch cl-swatch--border" style="border-color:' + hex + '"></span>';
    }
    if (category === "effect") {
      return '<span class="cl-swatch cl-swatch--effect" style="box-shadow:0 2px 8px 2px ' + hex + '"></span>';
    }
    return '<span class="cl-swatch" style="background:' + hex + '"></span>';
  }

  function table(head, rows, modifier) {
    return (
      '<div class="ty-table-wrap"><table class="ty-table' +
      (modifier ? " " + modifier : "") +
      '"><thead><tr>' +
      head
        .map(function (h) {
          return "<th>" + h + "</th>";
        })
        .join("") +
      "</tr></thead><tbody>" +
      rows.join("") +
      "</tbody></table></div>"
    );
  }

  function zoneOf(step) {
    var found = ZONES.filter(function (z) {
      return z.steps.indexOf(step) !== -1;
    })[0];
    return found ? found.label : "Base";
  }

  /* --- Renderers --------------------------------------------------------- */

  function renderRamps(host) {
    var tabs = RAMPS.map(function (ramp, i) {
      return (
        '<button type="button" class="ty-tab' +
        (i === 0 ? " ty-tab--active" : "") +
        '" data-scale="' +
        (ramp.path || "base") +
        '"><span class="cl-dot" style="background:' +
        (ramp.steps[5] ? ramp.steps[5][1] : ramp.steps[0][1]) +
        '"></span>' +
        ramp.label +
        "</button>"
      );
    });

    var panels = RAMPS.map(function (ramp, i) {
      var strip = ramp.steps
        .map(function (step) {
          return (
            '<span class="cl-strip__step" style="background:' +
            step[1] +
            '" title="' +
            step[0] +
            " · " +
            step[1] +
            '"></span>'
          );
        })
        .join("");

      var rows = ramp.steps.map(function (step) {
        var path = rampStepPath(ramp, step);
        var count = ALIAS_COUNT[path] || 0;
        var onWhite = contrast(step[1], "#FFFFFF");
        var onBlack = contrast(step[1], "#000000");

        return (
          "<tr><td>" +
          token("color/" + path) +
          "</td><td>" +
          swatch(step[1]) +
          '</td><td class="ty-num">' +
          step[1].toLowerCase() +
          '</td><td class="ty-num">' +
          ratioCell(onWhite, MIN_TEXT) +
          '</td><td class="ty-num">' +
          ratioCell(onBlack, MIN_TEXT) +
          "</td><td>" +
          badge(zoneOf(step[0]), "neutral") +
          "</td><td>" +
          (count
            ? badge(count + (count === 1 ? " token" : " tokens"), "on")
            : '<span class="ty-muted">—</span>') +
          "</td></tr>"
        );
      });

      return (
        '<div class="ty-panel"' +
        (i === 0 ? "" : " hidden") +
        ' data-panel="' +
        (ramp.path || "base") +
        '"><p class="ty-panel__intro">' +
        ramp.desc +
        '</p><p class="ty-panel__meta">' +
        (ramp.path ? "color/" + ramp.path + "/…" : "color/white · color/black") +
        " · " +
        ramp.role +
        " · " +
        ramp.steps.length +
        " pasos</p>" +
        '<div class="cl-strip">' +
        strip +
        "</div>" +
        table(["Token", "", "Hex", "◻ Blanco", "◼ Negro", "Zona", "Alias Tier 2"], rows) +
        '<p class="ty-caption">' +
        ramp.note +
        "</p></div>"
      );
    });

    host.innerHTML = '<div class="ty-tabs">' + tabs.join("") + "</div>" + panels.join("");
    wireTabs(host);
  }

  function renderSemantic(host) {
    var tabs = SEMANTIC.map(function (cat, i) {
      var count = cat.groups.reduce(function (acc, g) {
        return acc + g.tokens.length;
      }, 0);
      return (
        '<button type="button" class="ty-tab' +
        (i === 0 ? " ty-tab--active" : "") +
        '" data-scale="' +
        cat.key +
        '">' +
        cat.label +
        '<span class="ty-tab__count">' +
        count +
        "</span></button>"
      );
    });

    var panels = SEMANTIC.map(function (cat, i) {
      var groups = cat.groups
        .map(function (group) {
          var rows = group.tokens.map(function (t) {
            var onWhite = contrast(t[2], "#FFFFFF");
            var onBlack = contrast(t[2], "#000000");
            var min = cat.key === "border" ? MIN_BORDER : MIN_TEXT;
            return (
              "<tr><td>" +
              token(cat.key + "/" + t[0]) +
              "</td><td>" +
              swatch(t[2], cat.key) +
              "</td><td>" +
              (t[1] ? '<code>' + t[1] + "</code>" : '<span class="ty-muted">valor directo</span>') +
              '</td><td class="ty-num">' +
              t[2].toLowerCase() +
              '</td><td class="ty-num">' +
              ratioCell(onWhite, min) +
              '</td><td class="ty-num">' +
              ratioCell(onBlack, min) +
              "</td></tr>"
            );
          });

          return (
            "<h4 class=\"cl-group\">" +
            group.label +
            '</h4><p class="cl-group__desc">' +
            group.desc +
            "</p>" +
            table(["Token", "", "Primitivo Tier 1", "Hex", "◻ Blanco", "◼ Negro"], rows) +
            (group.note ? '<p class="ty-caption">' + group.note + "</p>" : "")
          );
        })
        .join("");

      return (
        '<div class="ty-panel"' +
        (i === 0 ? "" : " hidden") +
        ' data-panel="' +
        cat.key +
        '"><p class="ty-panel__intro">' +
        cat.intro +
        '</p><p class="ty-panel__meta">' +
        cat.key +
        "/… · scope " +
        cat.scope +
        "</p>" +
        groups +
        "</div>"
      );
    });

    host.innerHTML = '<div class="ty-tabs">' + tabs.join("") + "</div>" + panels.join("");
    wireTabs(host);
  }

  function renderPairs(host) {
    var rows = PAIRS.map(function (pair) {
      var bg = TOKENS[pair[0]];
      var fg = TOKENS[pair[1]];
      var ratio = contrast(bg.hex, fg.hex);
      var level = wcagLevel(ratio);

      return (
        "<tr><td>" +
        token(pair[0]) +
        "</td><td>" +
        token(pair[1]) +
        '</td><td><span class="cl-pair" style="background:' +
        bg.hex +
        ";color:" +
        fg.hex +
        '">Aa 100%</span></td><td class="ty-num">' +
        ratioCell(ratio, MIN_TEXT) +
        "</td><td>" +
        badge(level.label, level.kind) +
        "</td></tr>"
      );
    });

    host.innerHTML =
      table(["Fondo", "Contenido", "Muestra", "Ratio", "WCAG"], rows) +
      '<p class="ty-caption">AA large solo vale para texto de 18 px o más en Bold, o 24 px en Regular. Para texto de cuerpo, exige AA.</p>';
  }

  function renderCoverage(host) {
    var rows = COVERAGE.map(function (item) {
      var hex = TOKENS[item.token].hex;
      var ratio = contrast(hex, "#FFFFFF");

      return (
        "<tr><td>" +
        token(item.token) +
        "</td><td>" +
        swatch(hex, TOKENS[item.token].category) +
        '</td><td class="ty-num">' +
        ratioCell(ratio, item.min) +
        "</td><td>" +
        badge(item.rule, ratio >= item.min ? "on" : "off") +
        '</td><td class="ty-muted">' +
        (item.intentional
          ? "<strong>Intencional.</strong> " + item.intentional
          : "Reemplazo: " + token(item.fix) + " <span class=\"ty-muted\">(" + item.why + ")</span>") +
        "</td></tr>"
      );
    });

    host.innerHTML = table(
      ["Token", "", "Sobre blanco", "Mínimo que no alcanza", "Qué usar"],
      rows,
      "cl-table--last-wide"
    );
  }

  function renderZones(host) {
    var rows = ZONE_DOCS.map(function (zone) {
      return (
        '<tr><td class="ty-num">' +
        zone.range +
        "</td><td>" +
        badge(zone.tag, "neutral") +
        '</td><td class="ty-muted">' +
        zone.text +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Pasos", "Zona", "Para qué sirve"], rows, "ty-table--roles");
  }

  function renderNaming(host) {
    var rows = NAMING.map(function (row) {
      return (
        "<tr><td><code>" +
        row[0] +
        "</code></td><td>" +
        badge(row[1], "neutral") +
        '</td><td class="ty-muted">' +
        row[2] +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Parte del nombre", "Qué es", "Qué indica"], rows, "ty-table--roles");
  }

  function renderCollections(host) {
    var rows = COLLECTIONS.map(function (c) {
      return (
        "<tr><td><strong>" +
        c.name +
        "</strong></td><td>" +
        badge(c.mode, "neutral") +
        '</td><td class="ty-num">' +
        c.total +
        '</td><td class="ty-num">' +
        (c.colors ? c.colors : "—") +
        '</td><td class="ty-muted">' +
        c.role +
        "</td></tr>"
      );
    });

    host.innerHTML = table(
      ["Colección", "Modo", "Variables", "De color", "Rol"],
      rows,
      "cl-table--last-wide"
    );
  }

  function renderApply(host) {
    var rows = APPLY.map(function (row) {
      return (
        "<tr><td><strong>" +
        row[0] +
        "</strong></td><td><code>" +
        row[1] +
        '</code></td><td class="ty-muted">' +
        row[2] +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Propiedad que pintas", "Categoría", "Cómo se aplica"], rows, "ty-table--roles");
  }

  function renderUpdates(host) {
    host.innerHTML = UPDATES.map(function (u) {
      return (
        '<div class="ty-item"><div class="ty-item__head"><h4>' +
        u.goal +
        "</h4>" +
        badge(u.where, "neutral") +
        "</div><p>" +
        u.text +
        "</p></div>"
      );
    }).join("");
  }

  function renderContrastBadges() {
    document.querySelectorAll("[data-contrast]").forEach(function (el) {
      var parts = el.getAttribute("data-contrast").split("|");
      var bg = TOKENS[parts[0]];
      var fg = TOKENS[parts[1]];
      if (!bg || !fg) {
        return;
      }
      var ratio = contrast(bg.hex, fg.hex);
      var level = wcagLevel(ratio);
      el.innerHTML = badge(
        ratioText(ratio) + " · " + level.label,
        ratio !== null && ratio >= MIN_TEXT ? "on" : "off"
      );
    });
  }

  function wireTabs(host) {
    host.addEventListener("click", function (event) {
      var tab = event.target.closest(".ty-tab");
      if (!tab) {
        return;
      }

      host.querySelectorAll(".ty-tab").forEach(function (el) {
        el.classList.toggle("ty-tab--active", el === tab);
      });
      host.querySelectorAll(".ty-panel").forEach(function (el) {
        el.hidden = el.getAttribute("data-panel") !== tab.getAttribute("data-scale");
      });
    });
  }

  function enableTokenCopy() {
    document.addEventListener("click", function (event) {
      var chip = event.target.closest(".ty-token");
      if (!chip || !navigator.clipboard) {
        return;
      }

      var original = chip.textContent;
      navigator.clipboard.writeText(original).then(function () {
        chip.classList.add("ty-token--copied");
        chip.textContent = "copiado";
        setTimeout(function () {
          chip.textContent = original;
          chip.classList.remove("ty-token--copied");
        }, 900);
      });
    });
  }

  var RENDERERS = {
    ramps: renderRamps,
    zones: renderZones,
    semantic: renderSemantic,
    naming: renderNaming,
    pairs: renderPairs,
    coverage: renderCoverage,
    collections: renderCollections,
    apply: renderApply,
    updates: renderUpdates
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-cl]")) {
      return;
    }

    injectColorVars();

    document.querySelectorAll("[data-cl]").forEach(function (host) {
      var renderer = RENDERERS[host.getAttribute("data-cl")];
      if (renderer) {
        renderer(host);
      }
    });

    renderContrastBadges();
    enableTokenCopy();
  });
})();
