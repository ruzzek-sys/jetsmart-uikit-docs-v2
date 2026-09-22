/**
 * Datos y renderizado de la página Foundations · Typography.
 *
 * Los valores replican los tokens y estilos publicados en el archivo de Figma
 * "Jetsmart UI Kit v1.0" (página Fonts). Las clases .ts-* se generan a partir de
 * estos mismos datos, así que los especímenes de la página y los ejemplos de
 * buenas prácticas usan exactamente las mismas propiedades que el estilo real.
 */
(function () {
  "use strict";

  var PRIMARY = "Lato";
  var SECONDARY = "Encode Sans";

  var FONT_SIZES = [
    { token: "2xs", px: 10, rem: "0.625rem", ratio: "—" },
    { token: "xs", px: 12, rem: "0.75rem", ratio: "×1.20" },
    { token: "sm", px: 14, rem: "0.875rem", ratio: "×1.17" },
    { token: "base", px: 16, rem: "1rem", ratio: "×1.14" },
    { token: "lg", px: 18, rem: "1.125rem", ratio: "×1.13" },
    { token: "xl", px: 20, rem: "1.25rem", ratio: "×1.11" },
    { token: "2xl", px: 24, rem: "1.5rem", ratio: "×1.20" },
    { token: "3xl", px: 30, rem: "1.875rem", ratio: "×1.25" },
    { token: "4xl", px: 36, rem: "2.25rem", ratio: "×1.20" },
    { token: "5xl", px: 42, rem: "2.625rem", ratio: "×1.17" },
    { token: "6xl", px: 48, rem: "3rem", ratio: "×1.14" },
    { token: "7xl", px: 60, rem: "3.75rem", ratio: "×1.25" },
    { token: "8xl", px: 72, rem: "4.5rem", ratio: "×1.20" },
    { token: "9xl", px: 96, rem: "6rem", ratio: "×1.33" },
    { token: "10xl", px: 128, rem: "8rem", ratio: "×1.33" }
  ];

  var FONT_WEIGHTS = [
    { token: "thin", css: 100, figma: "Thin" },
    { token: "extralight", css: 200, figma: "ExtraLight" },
    { token: "light", css: 300, figma: "Light" },
    { token: "normal", css: 400, figma: "Regular" },
    { token: "medium", css: 500, figma: "Medium" },
    { token: "semibold", css: 600, figma: "SemiBold" },
    { token: "bold", css: 700, figma: "Bold" },
    { token: "extrabold", css: 800, figma: "ExtraBold" },
    { token: "black", css: 900, figma: "Black" }
  ];

  var LINE_HEIGHTS = [
    { px: 12, used: false },
    { px: 14, used: true },
    { px: 16, used: true },
    { px: 18, used: true },
    { px: 20, used: true },
    { px: 22, used: true },
    { px: 24, used: true },
    { px: 28, used: true },
    { px: 32, used: true },
    { px: 36, used: true },
    { px: 40, used: true },
    { px: 44, used: true },
    { px: 48, used: true },
    { px: 52, used: true },
    { px: 56, used: true },
    { px: 64, used: true },
    { px: 72, used: false },
    { px: 80, used: true },
    { px: 88, used: false },
    { px: 96, used: true },
    { px: 112, used: false },
    { px: 128, used: false }
  ];

  var LETTER_SPACING = [
    { token: "tighter", px: -0.8, em: "-0.05em" },
    { token: "tight", px: -0.4, em: "-0.025em" },
    { token: "normal", px: 0, em: "0em" },
    { token: "wide", px: 0.4, em: "+0.025em" },
    { token: "wider", px: 0.8, em: "+0.05em" },
    { token: "widest", px: 1.6, em: "+0.1em" }
  ];

  /**
   * usos: número de instancias en el archivo, 0 = estilo publicado sin uso,
   * null = existe la variable en Tier 2 pero no hay estilo publicado.
   */
  var SCALES = [
    {
      key: "display",
      label: "Display",
      family: SECONDARY,
      weight: 500,
      weightName: "Medium",
      ls: -0.4,
      upper: false,
      role: "Portadas",
      roleDesc:
        "Hero de campaña y mensajes a pantalla completa. Uno por vista; la bajada nunca es otro paso de Display, es Subheading.",
      intro:
        "Escala de mayor jerarquía: portadas, hero de campaña y mensajes a pantalla completa. Encode Sans Medium, tracking tight (−0,4 px), ratio constante 1,33.",
      sample: "Vuela por Sudamérica",
      steps: [
        { step: "xs", size: 24, lh: 32, ratio: "1.33", usos: null },
        { step: "sm", size: 30, lh: 40, ratio: "1.33", usos: 1 },
        { step: "md", size: 36, lh: 48, ratio: "1.33", usos: 1 },
        { step: "lg", size: 48, lh: 64, ratio: "1.33", usos: 10 },
        { step: "xl", size: 60, lh: 80, ratio: "1.33", usos: 0 },
        { step: "2xl", size: 72, lh: 96, ratio: "1.33", usos: null }
      ]
    },
    {
      key: "heading",
      label: "Heading",
      family: SECONDARY,
      weight: 500,
      weightName: "Medium",
      ls: -0.4,
      upper: false,
      role: "Títulos",
      roleDesc:
        "Títulos de página, de sección y de tarjeta. Ocho pasos, de 2xs 16/20 a 3xl 48/56: la escala más usada del kit.",
      intro:
        "La escala más usada del kit para títulos de página, de sección y de tarjeta. Encode Sans Medium, tracking tight (−0,4 px).",
      sample: "Selecciona tu asiento",
      steps: [
        { step: "2xs", size: 16, lh: 20, ratio: "1.25", usos: 148 },
        { step: "xs", size: 18, lh: 24, ratio: "1.33", usos: 22 },
        { step: "sm", size: 20, lh: 28, ratio: "1.40", usos: 157 },
        { step: "md", size: 24, lh: 32, ratio: "1.33", usos: 217 },
        { step: "lg", size: 30, lh: 40, ratio: "1.33", usos: 73 },
        { step: "xl", size: 36, lh: 44, ratio: "1.22", usos: 5 },
        { step: "2xl", size: 42, lh: 52, ratio: "1.24", usos: 3 },
        { step: "3xl", size: 48, lh: 56, ratio: "1.17", usos: null }
      ]
    },
    {
      key: "subheading",
      label: "Subheading",
      family: PRIMARY,
      weight: 500,
      weightName: "Medium",
      ls: 0,
      upper: false,
      role: "Bajadas",
      roleDesc:
        "El texto que acompaña a un Display o a un Heading. Lato Medium: baja el peso sin tener que bajar tanto el cuerpo.",
      intro: "La bajada que acompaña a un Display o a un Heading. Lato Medium, tracking normal.",
      sample: "Nuevas rutas desde Santiago",
      steps: [
        { step: "xs", size: 14, lh: 20, ratio: "1.43", usos: null },
        { step: "sm", size: 16, lh: 22, ratio: "1.38", usos: 24 },
        { step: "md", size: 18, lh: 24, ratio: "1.33", usos: 13 },
        { step: "lg", size: 20, lh: 28, ratio: "1.40", usos: 10 },
        { step: "xl", size: 24, lh: 32, ratio: "1.33", usos: null },
        { step: "2xl", size: 30, lh: 40, ratio: "1.33", usos: null }
      ]
    },
    {
      key: "body",
      label: "Body",
      family: PRIMARY,
      variants: [
        { key: "regular", label: "Regular", weight: 400 },
        { key: "strong", label: "Strong", weight: 700 }
      ],
      ls: 0,
      upper: false,
      role: "Lectura",
      roleDesc:
        "Párrafos, descripciones y datos de lectura. Regular por defecto, Strong para el énfasis dentro del mismo paso.",
      intro:
        "El cuerpo de texto de lectura del kit: párrafos, descripciones y datos. Lato en dos pesos —regular y strong—.",
      sample: "Reserva desde la app y elige tu asiento sin costo adicional.",
      steps: [
        { variant: "regular", step: "xs", size: 12, lh: 16, ratio: "1.33", usos: 53 },
        { variant: "regular", step: "sm", size: 14, lh: 20, ratio: "1.43", usos: 655 },
        { variant: "regular", step: "md", size: 16, lh: 24, ratio: "1.50", usos: 977 },
        { variant: "regular", step: "lg", size: 18, lh: 24, ratio: "1.33", usos: 206 },
        { variant: "regular", step: "xl", size: 20, lh: 28, ratio: "1.40", usos: 0 },
        { variant: "regular", step: "2xl", size: 24, lh: 32, ratio: "1.33", usos: 0 },
        { variant: "regular", step: "3xl", size: 30, lh: 40, ratio: "1.33", usos: 0 },
        { variant: "strong", step: "xs", size: 12, lh: 16, ratio: "1.33", usos: 9 },
        { variant: "strong", step: "sm", size: 14, lh: 20, ratio: "1.43", usos: 77 },
        { variant: "strong", step: "md", size: 16, lh: 24, ratio: "1.50", usos: 324 },
        { variant: "strong", step: "lg", size: 18, lh: 24, ratio: "1.33", usos: 47 },
        { variant: "strong", step: "xl", size: 20, lh: 28, ratio: "1.40", usos: 0 },
        { variant: "strong", step: "2xl", size: 24, lh: 32, ratio: "1.33", usos: 40 },
        { variant: "strong", step: "3xl", size: 30, lh: 40, ratio: "1.33", usos: 0 }
      ]
    },
    {
      key: "label",
      label: "Label",
      family: PRIMARY,
      variants: [
        { key: "regular", label: "Regular", weight: 400 },
        { key: "strong", label: "Strong", weight: 700 }
      ],
      ls: 0,
      upper: false,
      role: "Rótulos",
      roleDesc:
        "Botones, campos, chips, tabs y contadores. Interlineado comprimido a propósito: una línea, no un párrafo.",
      intro:
        "Los rótulos del kit: campos, chips, tags de estado, contadores y navegación. Lato en dos pesos —regular y strong—.",
      sample: "Continuar",
      note:
        "Label publica además la variante Strong-Underline en sus seis pasos (10 a 20 px) para enlaces dentro de texto: mismos valores que Strong más text-decoration underline.",
      steps: [
        { variant: "regular", step: "2xs", size: 10, lh: 14, ratio: "1.40", usos: 0 },
        { variant: "regular", step: "xs", size: 12, lh: 14, ratio: "1.17", usos: 0 },
        { variant: "regular", step: "sm", size: 14, lh: 16, ratio: "1.14", usos: 1487 },
        { variant: "regular", step: "md", size: 16, lh: 24, ratio: "1.50", usos: 10 },
        { variant: "regular", step: "lg", size: 18, lh: 24, ratio: "1.33", usos: 349 },
        { variant: "regular", step: "xl", size: 20, lh: 28, ratio: "1.40", usos: 32 },
        { variant: "strong", step: "2xs", size: 10, lh: 14, ratio: "1.40", usos: 12 },
        { variant: "strong", step: "xs", size: 12, lh: 14, ratio: "1.17", usos: 15 },
        { variant: "strong", step: "sm", size: 14, lh: 16, ratio: "1.14", usos: 467 },
        { variant: "strong", step: "md", size: 16, lh: 24, ratio: "1.50", usos: 1093 },
        { variant: "strong", step: "lg", size: 18, lh: 24, ratio: "1.33", usos: 360 },
        { variant: "strong", step: "xl", size: 20, lh: 28, ratio: "1.40", usos: 0 }
      ]
    },
    {
      key: "caption",
      label: "Caption",
      family: PRIMARY,
      weight: 400,
      weightName: "Regular",
      ls: 0,
      upper: false,
      role: "Letra pequeña",
      roleDesc:
        "Legales, notas al pie y etiquetas de eje. Contenido accesorio; nunca el que el usuario vino a leer.",
      intro: "Leyendas, texto legal, notas al pie y etiquetas de eje. Lato Regular, un solo peso.",
      sample: "Sujeto a disponibilidad en la aeronave asignada.",
      steps: [
        { step: "xs", size: 10, lh: 14, ratio: "1.40", usos: 26 },
        { step: "sm", size: 12, lh: 16, ratio: "1.33", usos: 116 },
        { step: "md", size: 14, lh: 20, ratio: "1.43", usos: 545 },
        { step: "lg", size: 16, lh: 20, ratio: "1.25", usos: 203 },
        { step: "xl", size: 18, lh: 24, ratio: "1.33", usos: null },
        { step: "2xl", size: 20, lh: 28, ratio: "1.40", usos: null }
      ]
    },
    {
      key: "pretitle",
      label: "Pretitle",
      family: PRIMARY,
      weight: 600,
      weightName: "SemiBold",
      ls: 0.8,
      upper: true,
      role: "Caja alta",
      roleDesc:
        "Antetítulos cortos sobre un título o un dato. Trae textCase UPPER y tracking +0,8 desde el estilo publicado.",
      intro:
        "Etiquetas cortas que anteceden a un dato o valor. Lato SemiBold, letter-spacing wider (+0,8 px) y textCase UPPER aplicado desde el estilo.",
      sample: "Oferta por tiempo limitado",
      steps: [
        { step: "xs", size: 10, lh: 14, ratio: "1.40", usos: null },
        { step: "sm", size: 12, lh: 16, ratio: "1.33", usos: null },
        { step: "md", size: 14, lh: 20, ratio: "1.43", usos: 30 },
        { step: "lg", size: 16, lh: 24, ratio: "1.50", usos: 0 },
        { step: "xl", size: 18, lh: 24, ratio: "1.33", usos: null },
        { step: "2xl", size: 20, lh: 28, ratio: "1.40", usos: null }
      ]
    },
    {
      key: "featured",
      label: "Featured",
      family: PRIMARY,
      weight: 700,
      weightName: "Bold",
      ls: 0,
      upper: false,
      role: "Cifras",
      roleDesc:
        "Precios, horarios y códigos dentro de una tarjeta u opción seleccionable. Lato Bold, un solo peso.",
      intro:
        "Énfasis numérico: precios, horarios y códigos dentro de una tarjeta u opción seleccionable. Lato Bold, un solo peso.",
      sample: "CLP 39.990",
      steps: [
        { step: "2xs", size: 14, lh: 18, ratio: "1.29", usos: 18 },
        { step: "xs", size: 16, lh: 20, ratio: "1.25", usos: 135 },
        { step: "sm", size: 18, lh: 22, ratio: "1.22", usos: 89 },
        { step: "md", size: 20, lh: 24, ratio: "1.20", usos: 81 },
        { step: "lg", size: 24, lh: 32, ratio: "1.33", usos: 79 },
        { step: "xl", size: 30, lh: 36, ratio: "1.20", usos: 0 },
        { step: "2xl", size: 36, lh: 44, ratio: "1.22", usos: null }
      ]
    }
  ];

  var STYLE_INVENTORY = [
    { family: "Display", count: 4, role: "Portadas y titulares a ancho completo" },
    { family: "Heading", count: 7, role: "Jerarquía de títulos de sección" },
    { family: "Subheading", count: 3, role: "Bajadas y subtítulos bajo un título" },
    { family: "Body", count: 14, role: "Párrafos, descripciones y datos de lectura" },
    { family: "Label", count: 12, role: "Etiquetas de UI: botones, campos, tabs" },
    { family: "Caption", count: 4, role: "Notas, textos de ayuda y legales" },
    { family: "Pretitle", count: 2, role: "Antetítulo corto sobre un título" },
    { family: "Featured", count: 7, role: "Cifras y datos destacados" }
  ];

  var ANATOMY = [
    { prop: "Font family", variable: "typography/body/regular/xl/font-family", value: "Lato" },
    { prop: "Font weight", variable: "typography/body/regular/xl/font-weight", value: "400" },
    { prop: "Font size", variable: "typography/body/regular/xl/font-size", value: "20 px" },
    { prop: "Line height", variable: "typography/body/regular/xl/line-height", value: "28 px" },
    { prop: "Letter spacing", variable: "typography/body/regular/xl/letter-spacing", value: "0" }
  ];

  var UPDATES = [
    {
      goal: "Un paso más grande",
      variable: "typography/body/regular/xl/font-size",
      target: "font-size/2xl → 24"
    },
    {
      goal: "Otro interlineado",
      variable: "typography/body/regular/xl/line-height",
      target: "line-height/lh-32 → 32"
    },
    {
      goal: "Otra familia tipográfica",
      variable: "typography/body/regular/xl/font-family",
      target: "font-family/secondary → Encode Sans"
    },
    {
      goal: "Más peso",
      variable: "typography/body/regular/xl/font-weight",
      target: "font-weight/semibold → 600"
    },
    {
      goal: "Tracking más ajustado",
      variable: "typography/body/regular/xl/letter-spacing",
      target: "letter-spacing/tight → −0,4"
    }
  ];

  var BREAKERS = [
    {
      title: "Override en el nodo",
      tag: "Desprende",
      text: "Escribir tamaño, peso o interlineado sobre un texto que ya tiene estilo. Sigue viéndose bien y deja de heredar Tier 2."
    },
    {
      title: "Estilo con valores a mano",
      tag: "Sin variable",
      text: "Crear un estilo escribiendo números en Edit text style. Primero se crea la variable en Tier 2, después el estilo que la enlaza."
    },
    {
      title: "Editar una primitiva",
      tag: "Mueve todo",
      text: "Cambiar font-size/xl en Tier 1 no ajusta un estilo: mueve ese paso en todas las familias que lo usan, incluidas las que nadie quería tocar."
    },
    {
      title: "Interlineado AUTO o %",
      tag: "No tokeniza",
      text: "El valor queda a criterio de la métrica de la fuente y no responde a la escala. Siempre en píxeles desde la variable."
    },
    {
      title: "Copiar formato entre textos",
      tag: "No traza",
      text: "Pegar propiedades de un texto a otro no aplica el estilo. El resultado se ve idéntico y no existe para el sistema."
    }
  ];

  function stepClass(scale, step) {
    return "ts-" + scale.key + (step.variant ? "-" + step.variant : "") + "-" + step.step;
  }

  function stepToken(scale, step) {
    return "typography/" + scale.key + (step.variant ? "/" + step.variant : "") + "/" + step.step;
  }

  function stepWeight(scale, step) {
    if (!step.variant) {
      return scale.weight;
    }
    var found = scale.variants.filter(function (v) {
      return v.key === step.variant;
    })[0];
    return found ? found.weight : 400;
  }

  function stepWeightName(scale, step) {
    if (!step.variant) {
      return scale.weightName;
    }
    var found = scale.variants.filter(function (v) {
      return v.key === step.variant;
    })[0];
    return found ? found.label : "Regular";
  }

  /** Genera las clases .ts-* desde los mismos datos que alimentan las tablas. */
  function injectStyleClasses() {
    var rules = [];

    SCALES.forEach(function (scale) {
      scale.steps.forEach(function (step) {
        rules.push(
          "." +
            stepClass(scale, step) +
            "{font-family:'" +
            scale.family +
            "',sans-serif;font-weight:" +
            stepWeight(scale, step) +
            ";font-size:" +
            step.size +
            "px;line-height:" +
            step.lh +
            "px;letter-spacing:" +
            scale.ls +
            "px;text-transform:" +
            (scale.upper ? "uppercase" : "none") +
            ";}"
        );
      });
    });

    var el = document.createElement("style");
    el.id = "ty-generated-styles";
    el.textContent = rules.join("\n");
    document.head.appendChild(el);
  }

  function token(name) {
    return '<button type="button" class="ty-token" title="Copiar token">' + name + "</button>";
  }

  function bar(value, max) {
    var pct = Math.round((value / max) * 100);
    return '<span class="ty-bar"><span class="ty-bar__fill" style="width:' + pct + '%"></span></span>';
  }

  function usageBadge(usos) {
    if (usos === null) {
      return '<span class="ty-badge ty-badge--var">solo variable</span>';
    }
    if (usos === 0) {
      return '<span class="ty-badge ty-badge--off">sin uso</span>';
    }
    return '<span class="ty-badge ty-badge--on">' + usos.toLocaleString("es-CL") + " usos</span>";
  }

  function table(head, rows, modifier) {
    return (
      '<div class="ty-table-wrap"><table class="ty-table' +
      (modifier ? " " + modifier : "") +
      "\"><thead><tr>" +
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

  function renderFontSizes(host) {
    var max = FONT_SIZES[FONT_SIZES.length - 1].px;

    var rows = FONT_SIZES.map(function (s) {
      return (
        "<tr><td>" +
        token("font-size/" + s.token) +
        '</td><td class="ty-num">' +
        s.px +
        "px</td><td>" +
        s.rem +
        '</td><td class="ty-muted">' +
        s.ratio +
        "</td><td>" +
        bar(s.px, max) +
        "</td></tr>"
      );
    });

    var specimens = FONT_SIZES.map(function (s) {
      return (
        '<div class="ty-specimen"><span class="ty-specimen__meta">' +
        s.token +
        " · " +
        s.px +
        '</span><span class="ty-specimen__sample ty-lato" style="font-size:' +
        s.px +
        "px;line-height:1.2\">Vuela alto Aa</span></div>"
      );
    });

    host.innerHTML =
      table(["Token", "px", "rem", "Razón", "Proporción"], rows) +
      '<p class="ty-caption">Especimen a tamaño real · Lato Regular</p>' +
      '<div class="ty-specimens">' +
      specimens.join("") +
      "</div>";
  }

  function renderFontWeights(host) {
    var rows = FONT_WEIGHTS.map(function (w) {
      return (
        "<tr><td>" +
        token("font-weight/" + w.token) +
        '</td><td class="ty-num">' +
        w.css +
        "</td><td>" +
        w.figma +
        '</td><td><span class="ty-lato" style="font-weight:' +
        w.css +
        ';font-size:20px">Jetsmart 1234</span></td></tr>'
      );
    });

    host.innerHTML = table(["Token", "CSS", "Estilo Figma", "Especimen"], rows);
  }

  function renderLineHeights(host) {
    var max = LINE_HEIGHTS[LINE_HEIGHTS.length - 1].px;

    var rows = LINE_HEIGHTS.map(function (lh) {
      return (
        "<tr><td>" +
        token("line-height/lh-" + lh.px) +
        '</td><td class="ty-num">' +
        lh.px +
        "px</td><td>" +
        (lh.used
          ? '<span class="ty-badge ty-badge--on">en uso</span>'
          : '<span class="ty-badge ty-badge--off">sin uso</span>') +
        "</td><td>" +
        bar(lh.px, max) +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Token", "px", "Estado", "Proporción"], rows);
  }

  function renderLetterSpacing(host) {
    var rows = LETTER_SPACING.map(function (ls) {
      var px = (ls.px > 0 ? "+" : "") + ls.px.toString().replace(".", ",") + "px";
      return (
        "<tr><td>" +
        token("letter-spacing/" + ls.token) +
        '</td><td class="ty-num">' +
        px +
        '</td><td class="ty-muted">' +
        ls.em +
        '</td><td><span class="ty-lato" style="font-size:16px;font-weight:600;letter-spacing:' +
        ls.px +
        'px">BOARDING PASS</span></td></tr>'
      );
    });

    host.innerHTML = table(["Token", "px", "em @16px", "Especimen"], rows);
  }

  function renderScales(host) {
    var tabs = SCALES.map(function (scale, i) {
      return (
        '<button type="button" class="ty-tab' +
        (i === 0 ? " ty-tab--active" : "") +
        '" data-scale="' +
        scale.key +
        '">' +
        scale.label +
        '<span class="ty-tab__count">' +
        scale.steps.length +
        "</span></button>"
      );
    });

    var panels = SCALES.map(function (scale, i) {
      var rows = scale.steps.map(function (step) {
        return (
          "<tr><td>" +
          token(stepToken(scale, step)) +
          '</td><td class="ty-num">' +
          step.size +
          "/" +
          step.lh +
          '</td><td class="ty-muted">' +
          step.ratio +
          "</td><td>" +
          usageBadge(step.usos) +
          "</td></tr>"
        );
      });

      var specimens = scale.steps.map(function (step) {
        return (
          '<div class="ty-specimen ty-specimen--block"><span class="ty-specimen__meta">' +
          (step.variant ? step.variant + " · " : "") +
          step.step +
          " · " +
          step.size +
          "/" +
          step.lh +
          '</span><span class="ty-specimen__sample ' +
          stepClass(scale, step) +
          '">' +
          scale.sample +
          "</span></div>"
        );
      });

      var meta =
        scale.family +
        " " +
        (scale.variants
          ? scale.variants
              .map(function (v) {
                return v.label;
              })
              .join(" / ")
          : scale.weightName) +
        " · tracking " +
        (scale.ls > 0 ? "+" : "") +
        scale.ls.toString().replace(".", ",") +
        " px" +
        (scale.upper ? " · textCase UPPER" : "");

      return (
        '<div class="ty-panel"' +
        (i === 0 ? "" : " hidden") +
        ' data-panel="' +
        scale.key +
        '"><p class="ty-panel__intro">' +
        scale.intro +
        '</p><p class="ty-panel__meta">' +
        meta +
        "</p>" +
        table(["Token", "px/LH", "Ratio", "Usos en el archivo"], rows) +
        (scale.note ? '<p class="ty-caption">' + scale.note + "</p>" : "") +
        '<div class="ty-specimens">' +
        specimens.join("") +
        "</div></div>"
      );
    });

    host.innerHTML =
      '<div class="ty-tabs" role="tablist">' + tabs.join("") + "</div>" + panels.join("");

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

  function renderRoles(host) {
    var rows = SCALES.map(function (scale) {
      return (
        '<tr><td><span class="ty-role">' +
        scale.label +
        '</span></td><td><span class="ty-badge ty-badge--neutral">' +
        scale.role +
        '</span></td><td class="ty-muted">' +
        scale.roleDesc +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Escala", "Rol", "Cuándo se usa"], rows, "ty-table--roles");
  }

  function renderInventory(host) {
    var rows = STYLE_INVENTORY.map(function (s) {
      return (
        "<tr><td><strong>" +
        s.family +
        '</strong></td><td class="ty-num">' +
        s.count +
        '</td><td class="ty-muted">' +
        s.role +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Familia", "Estilos", "Rol en el kit"], rows);
  }

  function renderAnatomy(host) {
    var rows = ANATOMY.map(function (a) {
      return (
        "<tr><td><strong>" +
        a.prop +
        "</strong></td><td>" +
        token(a.variable) +
        '</td><td class="ty-num">' +
        a.value +
        "</td></tr>"
      );
    });

    host.innerHTML = table(["Propiedad del estilo", "Variable enlazada · Tier 2", "Valor"], rows);
  }

  function renderUpdates(host) {
    var rows = UPDATES.map(function (u) {
      return (
        "<tr><td><strong>" +
        u.goal +
        "</strong></td><td>" +
        token(u.variable) +
        '</td><td class="ty-muted">' +
        u.target +
        "</td></tr>"
      );
    });

    host.innerHTML = table(
      ["Qué se quiere ajustar", "Variable que se edita · Tier 2", "Se re-apunta a · Tier 1"],
      rows
    );
  }

  function renderItems(host, items) {
    host.innerHTML = items
      .map(function (item) {
        return (
          '<div class="ty-item"><div class="ty-item__head"><h4>' +
          item.title +
          '</h4><span class="ty-badge ty-badge--neutral">' +
          item.tag +
          '</span></div><p>' +
          item.text +
          "</p></div>"
        );
      })
      .join("");
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
    "font-sizes": renderFontSizes,
    "font-weights": renderFontWeights,
    "line-heights": renderLineHeights,
    "letter-spacing": renderLetterSpacing,
    scales: renderScales,
    roles: renderRoles,
    inventory: renderInventory,
    anatomy: renderAnatomy,
    updates: renderUpdates,
    breakers: function (host) {
      renderItems(host, BREAKERS);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-ty]")) {
      return;
    }

    injectStyleClasses();

    document.querySelectorAll("[data-ty]").forEach(function (host) {
      var renderer = RENDERERS[host.getAttribute("data-ty")];
      if (renderer) {
        renderer(host);
      }
    });

    enableTokenCopy();
  });
})();
