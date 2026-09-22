/**
 * Datos y renderizado de la página Foundations · Spacing.
 *
 * Los valores son las variables FLOAT del archivo de Figma
 * "Jetsmart UI Kit v1.0": 19 primitivos en Tier 1 y 57 tokens semánticos
 * en Tier 2: Spatial & Shape, cada uno con alias al primitivo que referencia.
 *
 * Las barras y los rem se derivan de esos px (rem = px / 16). Los conteos de
 * alias se calculan recorriendo los tokens de Tier 2.
 */
(function () {
  "use strict";

  var PRIMITIVES = [
    ["none", 0],
    ["0,5", 2],
    ["1", 4],
    ["2", 8],
    ["3", 12],
    ["4", 16],
    ["5", 20],
    ["6", 24],
    ["7", 28],
    ["8", 32],
    ["9", 36],
    ["10", 40],
    ["11", 44],
    ["12", 48],
    ["13", 52],
    ["16", 64],
    ["20", 80],
    ["24", 96],
    ["32", 128]
  ];

  var FAMILIES = [
    {
      key: "stack",
      label: "Stack",
      scale: "Componente",
      property: "Gap vertical",
      scope: "GAP · itemSpacing (columna)",
      intro: "Espacio entre elementos que se apilan dentro de un auto layout en columna. Ritmo vertical: campos de un formulario, tarjetas de una lista, título y párrafo.",
      note: "stack/none (0 px) es válido: se usa cuando dos elementos deben tocarse, como una imagen y su caption superpuesta.",
      tokens: [
        ["none", "spacing/none", 0, "Elementos que deben leerse como una sola unidad, sin aire entre ellos."],
        ["xs", "spacing/0,5", 2, "Ajuste fino entre un label y su valor en una fila de datos muy compacta."],
        ["sm", "spacing/1", 4, "Separación entre un campo de formulario y su texto de ayuda o error."],
        ["md", "spacing/2", 8, "Gap por defecto entre campos de un formulario o entre ítems de una lista simple."],
        ["lg", "spacing/3", 12, "Separación entre bloques dentro de una tarjeta: título, contenido y acciones."],
        ["xl", "spacing/4", 16, "Separación entre secciones internas de un componente grande, como un acordeón abierto."],
        ["2xl", "spacing/5", 20, "Separación entre tarjetas cortas dentro de un mismo grupo o carrusel."],
        ["3xl", "spacing/6", 24, "Separación entre bloques de un formulario largo o entre pasos de un stepper."],
        ["4xl", "spacing/7", 28, "Gap entre tarjetas grandes o entre un bloque de contenido y su CTA principal."],
        ["5xl", "spacing/8", 32, "Separación entre módulos completos dentro de una misma pantalla."],
        ["6xl", "spacing/9", 36, "El paso más alto de stack: separación entre el último bloque de un componente y el siguiente."]
      ]
    },
    {
      key: "inline",
      label: "Inline",
      scale: "Componente",
      property: "Gap horizontal",
      scope: "GAP · itemSpacing (fila)",
      intro: "Espacio entre elementos en línea dentro de un auto layout en fila. Ritmo horizontal: icono y texto de un botón, chips, acciones de una toolbar.",
      note: "inline/sm (4 px) es el paso más usado del kit: es el gap por defecto entre icono y label en botones y tabs.",
      tokens: [
        ["none", "spacing/none", 0, "Elementos que deben leerse como una sola unidad, sin aire entre ellos."],
        ["xs", "spacing/0,5", 2, "Separación entre un icono pequeño y su badge de notificación."],
        ["sm", "spacing/1", 4, "Gap entre icono y label dentro de un botón o un tab — el paso más usado del kit."],
        ["md", "spacing/2", 8, "Separación entre acciones de una toolbar o entre chips de un filtro."],
        ["lg", "spacing/3", 12, "Gap entre campos que van en una misma fila, como código de país y teléfono."],
        ["xl", "spacing/4", 16, "Separación entre bloques de acciones secundarias, como Cancelar y Guardar."],
        ["2xl", "spacing/5", 20, "Gap entre columnas cortas dentro de una misma fila de datos."],
        ["3xl", "spacing/6", 24, "Separación entre grupos de controles dentro de una barra de herramientas amplia."],
        ["4xl", "spacing/7", 28, "Gap entre bloques de navegación dentro de un navbar o topbar."],
        ["5xl", "spacing/8", 32, "Separación entre secciones horizontales de un breadcrumb extenso o un stepper amplio."],
        ["6xl", "spacing/9", 36, "El paso más alto de inline: separación entre grupos de navegación muy distantes entre sí."]
      ]
    },
    {
      key: "inset-x",
      label: "Inset-X",
      scale: "Componente",
      property: "Padding left / right",
      scope: "GAP · padding horizontal",
      intro: "Padding horizontal interno de un contenedor: left y right. Botones, inputs, tarjetas y badges.",
      note: "Separado de inset-y porque en la mayoría de los componentes el padding horizontal es mayor que el vertical.",
      tokens: [
        ["none", "spacing/none", 0, "Sin padding horizontal: contenido que debe llegar exactamente al borde, como una imagen a sangre."],
        ["xs", "spacing/0,5", 2, "Padding lateral de un badge pequeño o un tag compacto."],
        ["sm", "spacing/1", 4, "Padding lateral de un icono-botón o un chip pequeño."],
        ["md", "spacing/2", 8, "Padding lateral por defecto de inputs y botones medianos."],
        ["lg", "spacing/3", 12, "Padding lateral de botones primarios y tarjetas de contenido."],
        ["xl", "spacing/4", 16, "Padding lateral de tarjetas grandes o de un modal pequeño."],
        ["2xl", "spacing/5", 20, "Padding lateral de un panel lateral (sidebar) o un modal mediano."],
        ["3xl", "spacing/6", 24, "Padding lateral de un modal grande o un panel de contenido amplio."],
        ["4xl", "spacing/7", 28, "Padding lateral de un contenedor de sección dentro de un layout denso."],
        ["5xl", "spacing/8", 32, "Padding lateral de un bloque hero pequeño."],
        ["6xl", "spacing/9", 36, "El paso más alto de inset-x antes de pasar a la escala de página."]
      ]
    },
    {
      key: "inset-y",
      label: "Inset-Y",
      scale: "Componente",
      property: "Padding top / bottom",
      scope: "GAP · padding vertical",
      intro: "Padding vertical interno de un contenedor: top y bottom. Botones, inputs, tarjetas y badges.",
      note: "Si un componente presenta poco espacio vertical, la causa habitual es inset-y, no inset-x: la percepción es más sensible a la separación vertical.",
      tokens: [
        ["none", "spacing/none", 0, "Sin padding vertical: contenido que ocupa el alto completo del contenedor."],
        ["xs", "spacing/0,5", 2, "Padding vertical de un badge pequeño o un tag compacto."],
        ["sm", "spacing/1", 4, "Padding vertical de un icono-botón o un chip pequeño."],
        ["md", "spacing/2", 8, "Padding vertical por defecto de inputs y botones medianos."],
        ["lg", "spacing/3", 12, "Padding vertical de botones primarios y tarjetas de contenido."],
        ["xl", "spacing/4", 16, "Padding vertical de tarjetas grandes o de un modal pequeño."],
        ["2xl", "spacing/5", 20, "Padding vertical de un panel lateral o un modal mediano."],
        ["3xl", "spacing/6", 24, "Padding vertical de un modal grande o un panel de contenido amplio."],
        ["4xl", "spacing/7", 28, "Padding vertical de un contenedor de sección en un layout denso."],
        ["5xl", "spacing/8", 32, "Padding vertical de un bloque hero pequeño."],
        ["6xl", "spacing/9", 36, "El paso más alto de inset-y antes de pasar a la escala de página."]
      ]
    },
    {
      key: "inset-page",
      label: "Inset-Page",
      scale: "Página",
      property: "Padding de página",
      scope: "GAP · padding de los 4 lados",
      intro: "Padding del contenedor de página o sección: separa el contenido del borde de la pantalla o de un panel grande. Otra escala, no una extensión de inset-x / inset-y.",
      note: "inset-page/xs (32 px) ya es más grande que el paso más alto de inset-x (36 px): son familias que no se cruzan.",
      tokens: [
        ["none", "spacing/none", 0, "Contenido de página sin padding: solo para fondos que deben llegar al borde, como un hero a sangre."],
        ["xs", "spacing/8", 32, "Padding de página en pantallas angostas o vistas embebidas."],
        ["sm", "spacing/10", 40, "Padding de página en mobile: separa el contenido de los bordes de la pantalla."],
        ["md", "spacing/12", 48, "Padding de página estándar en tablet o layouts de ancho medio."],
        ["lg", "spacing/16", 64, "Padding de página en desktop: el valor más común para el contenedor principal."],
        ["xl", "spacing/24", 96, "Padding de página en layouts anchos, como dashboards o pantallas de administración."],
        ["2xl", "spacing/32", 128, "Padding de página en pantallas muy anchas, para que el contenido no se pegue a los bordes en monitores grandes."]
      ]
    },
    {
      key: "gap-page",
      label: "Gap-Page",
      scale: "Página",
      property: "Gap entre secciones",
      scope: "GAP · itemSpacing entre secciones",
      intro: "Gap entre bloques grandes de layout: secciones de una pantalla, columnas de un grid de página, separación entre widgets.",
      note: "gap-page no tiene paso none: si dos bloques de layout no tienen gap, en realidad son un solo bloque.",
      tokens: [
        ["sm", "spacing/10", 40, "Gap entre secciones en mobile, donde el espacio vertical es más limitado."],
        ["md", "spacing/12", 48, "Gap estándar entre secciones de una pantalla de producto."],
        ["lg", "spacing/16", 64, "Gap entre columnas de un grid de página en desktop."],
        ["xl", "spacing/20", 80, "Separación entre bloques grandes de un landing o una pantalla de marketing."],
        ["2xl", "spacing/24", 96, "Gap entre módulos independientes dentro de un dashboard amplio."],
        ["3xl", "spacing/32", 128, "El paso más alto: separación entre secciones completamente distintas de una misma pantalla larga."]
      ]
    }
  ];

  var APPLY = [
    ["Gap vertical", "spacing/stack/…", "Auto layout en columna → ritmo entre elementos apilados."],
    ["Gap horizontal", "spacing/inline/…", "Auto layout en fila → ritmo entre elementos en línea."],
    ["Padding horizontal", "spacing/inset-x/…", "Left / Right de un frame."],
    ["Padding vertical", "spacing/inset-y/…", "Top / Bottom de un frame."],
    ["Padding de página", "spacing/inset-page/…", "Padding del contenedor de pantalla o panel grande."],
    ["Gap de página", "spacing/gap-page/…", "Gap entre secciones, columnas de grid o widgets."]
  ];

  var COLLECTIONS = [
    {
      name: "Tier 1: Core Primitives",
      mode: "Default",
      total: 224,
      spacing: 19,
      role: "Los 19 pasos de spacing, de 0 a 128 px. Comparte colección con color y tipografía. Solo se edita cuando cambia la escala base."
    },
    {
      name: "Tier 2: Spatial & Shape",
      mode: "Theme 1",
      total: 96,
      spacing: 57,
      role: "stack, inline, inset-x, inset-y, inset-page y gap-page. Convive con radios y grosores: las tres familias resuelven forma y espacio."
    }
  ];

  var UPDATES = [
    {
      goal: "Cambiar el ritmo de un rol",
      where: "Edita Tier 2",
      text: "Reapunta el alias del token semántico a otro paso de la escala. Todos los componentes que lo usan lo reciben."
    },
    {
      goal: "Cambiar la escala base",
      where: "Edita Tier 1",
      text: "Cambia el valor del primitivo. Afecta a todos los tokens que lo referencian: conviene revisar antes cuáles son."
    },
    {
      goal: "Nunca en el nodo",
      where: "Prohibido",
      text: "Escribir 16 en el Gap o el Padding desenlaza la variable. El layout se mantiene visualmente igual y deja de heredar."
    }
  ];

  var BREAKPOINTS = [
    {
      key: "sm",
      label: "Mobile · SM",
      range: "0 – 767 px",
      columns: 4,
      gutter: 20,
      margin: 20,
      note: "El único nivel con una grilla de 4 columnas."
    },
    {
      key: "md",
      label: "Tablet · MD",
      range: "768 – 1279 px",
      columns: 12,
      gutter: 20,
      margin: 32,
      note: "Adopta las 12 columnas de desktop: solo cambia el margin."
    },
    {
      key: "lg",
      label: "Desktop · LG",
      range: "1280 px o más",
      columns: 12,
      gutter: 20,
      margin: 64,
      note: "El gutter se mantiene en 20 px; el margin sube a 64 px."
    }
  ];

  var MAX_PX = 128;

  /* --- Índices ----------------------------------------------------------- */

  var ALIAS_COUNT = {};

  FAMILIES.forEach(function (family) {
    family.tokens.forEach(function (t) {
      ALIAS_COUNT[t[1]] = (ALIAS_COUNT[t[1]] || 0) + 1;
    });
  });

  function rem(px) {
    if (px === 0) {
      return "0";
    }
    var value = px / 16;
    return (Math.round(value * 1000) / 1000).toString().replace(".", ",") + " rem";
  }

  function token(name) {
    return '<button type="button" class="ty-token" title="Copiar token">' + name + "</button>";
  }

  function badge(text, kind) {
    return '<span class="ty-badge ty-badge--' + kind + '">' + text + "</span>";
  }

  function bar(px) {
    var width = Math.max(px === 0 ? 0 : (px / MAX_PX) * 100, px === 0 ? 0 : 1.2);
    return (
      '<span class="sp-bar" title="' +
      px +
      ' px"><span class="sp-bar__fill" style="width:' +
      width +
      '%"></span></span>'
    );
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

  function zoneOf(step, px) {
    if (step === "none" || px === 0) {
      return "Cero";
    }
    if (px === 2) {
      return "Ajuste fino";
    }
    if (px <= 36) {
      return "Componente";
    }
    if (px === 44 || px === 52) {
      return "Reserva";
    }
    return "Página";
  }

  function zoneKind(label) {
    if (label === "Reserva") {
      return "var";
    }
    if (label === "Página") {
      return "brand";
    }
    if (label === "Ajuste fino") {
      return "neutral";
    }
    return "neutral";
  }

  /* --- Renderers --------------------------------------------------------- */

  function renderPrimitives(host) {
    var rows = PRIMITIVES.map(function (step) {
      var path = "spacing/" + step[0];
      var count = ALIAS_COUNT[path] || 0;
      var zone = zoneOf(step[0], step[1]);

      return (
        "<tr><td>" +
        token(path) +
        "</td><td>" +
        bar(step[1]) +
        '</td><td class="ty-num">' +
        step[1] +
        " px</td><td class=\"ty-num\">" +
        rem(step[1]) +
        "</td><td>" +
        badge(zone, zoneKind(zone)) +
        "</td><td>" +
        (count
          ? badge(count + (count === 1 ? " token" : " tokens"), "on")
          : '<span class="ty-muted">—</span>') +
        "</td></tr>"
      );
    });

    host.innerHTML =
      table(["Token", "Escala", "Px", "Rem", "Zona", "Alias Tier 2"], rows) +
      '<p class="ty-caption">spacing/0,5 es el único paso fuera del múltiplo de 4: existe para ajustes finos de 2 px en iconos y bordes. Los pasos 11 (44 px) y 13 (52 px) no tienen alias en Tier 2: son reserva. Ningún componente pequeño debería usar los pasos de layout (64–128 px) directo: si necesita ese espacio, probablemente sea un layout de página.</p>';
  }

  function renderFamilies(host) {
    var tabs = FAMILIES.map(function (family, i) {
      return (
        '<button type="button" class="ty-tab' +
        (i === 0 ? " ty-tab--active" : "") +
        '" data-scale="' +
        family.key +
        '">' +
        family.label +
        '<span class="ty-tab__count">' +
        family.tokens.length +
        "</span></button>"
      );
    });

    var panels = FAMILIES.map(function (family, i) {
      var samples = family.tokens
        .map(function (t) {
          return sampleRow(family, t);
        })
        .join("");

      return (
        '<div class="ty-panel"' +
        (i === 0 ? "" : " hidden") +
        ' data-panel="' +
        family.key +
        '"><p class="ty-panel__intro">' +
        family.intro +
        '</p><p class="ty-panel__meta">' +
        family.property +
        " · " +
        family.scale +
        " · scope " +
        family.scope +
        "</p>" +
        '<div class="sp-samples">' +
        samples +
        "</div>" +
        '<p class="ty-caption">' +
        family.note +
        "</p></div>"
      );
    });

    host.innerHTML = '<div class="ty-tabs">' + tabs.join("") + "</div>" + panels.join("");
    wireTabs(host);
  }

  function sampleRow(family, t) {
    var path = "spacing/" + family.key + "/" + t[0];
    var label = demoLabel(family.key, t[2]);

    return (
      '<article class="sp-sample">' +
      '<div class="sp-sample__info">' +
      "<h4>" +
      token(path) +
      "</h4>" +
      '<p class="sp-sample__alias">→ ' +
      t[1] +
      " · " +
      t[2] +
      " px · " +
      rem(t[2]) +
      "</p>" +
      "<p>" +
      t[3] +
      '</p><p class="sp-sample__prop">Propiedad: ' +
      family.property +
      "</p></div>" +
      '<div class="sp-sample__visual">' +
      sampleDemo(family.key, t[2]) +
      '<p class="sp-sample__label">' +
      label +
      "</p></div></article>"
    );
  }

  function demoLabel(key, px) {
    if (key === "stack") {
      return "Gap vertical · " + px + " px";
    }
    if (key === "inline") {
      return "Gap horizontal · " + px + " px";
    }
    if (key === "inset-x") {
      return "Padding horizontal · " + px + " px";
    }
    if (key === "inset-y") {
      return "Padding vertical · " + px + " px";
    }
    if (key === "inset-page") {
      return "Padding de página · " + px + " px";
    }
    return "Gap de página · " + px + " px";
  }

  function sampleDemo(key, px) {
    if (key === "stack") {
      return (
        '<div class="sp-viz sp-viz--stack" style="gap:' +
        px +
        'px"><span class="sp-viz__block sp-viz__block--wide"></span><span class="sp-viz__block sp-viz__block--wide"></span></div>'
      );
    }
    if (key === "inline") {
      return (
        '<div class="sp-viz sp-viz--inline" style="gap:' +
        px +
        'px"><span class="sp-viz__block sp-viz__block--chip"></span><span class="sp-viz__block sp-viz__block--chip"></span></div>'
      );
    }
    if (key === "inset-x") {
      return (
        '<div class="sp-viz sp-viz--inset" style="padding-left:' +
        px +
        "px;padding-right:" +
        px +
        'px"><span class="sp-viz__block sp-viz__block--fill"></span></div>'
      );
    }
    if (key === "inset-y") {
      return (
        '<div class="sp-viz sp-viz--inset sp-viz--inset-y" style="padding-top:' +
        px +
        "px;padding-bottom:" +
        px +
        'px"><span class="sp-viz__block sp-viz__block--fill-y"></span></div>'
      );
    }
    if (key === "inset-page") {
      var scaled = Math.round(px * 0.35);
      return (
        '<div class="sp-viz sp-viz--page" style="padding:' +
        scaled +
        'px" title="Escala visual ×0,35 · valor real ' +
        px +
        ' px"><span class="sp-viz__block sp-viz__block--page"></span></div>'
      );
    }
    var gapScaled = Math.max(Math.round(px * 0.35), px === 0 ? 0 : 8);
    return (
      '<div class="sp-viz sp-viz--gap-page" style="gap:' +
      gapScaled +
      'px" title="Escala visual ×0,35 · valor real ' +
      px +
      ' px"><span class="sp-viz__block sp-viz__block--section"></span><span class="sp-viz__block sp-viz__block--section"></span></div>'
    );
  }

  function renderCompare(host) {
    var rows = [
      ["inset-x/md", 8, "Padding horizontal de un componente mediano — un botón, un input."],
      ["inset-page/md", 48, "Padding de un contenedor de página — seis veces más grande, mismo nombre de paso."],
      ["inline/sm", 4, "Gap por defecto entre icono y label. El paso más usado del kit."],
      ["gap-page/sm", 40, "Gap entre secciones en mobile. El primer paso de la escala de página."]
    ].map(function (row) {
      return (
        "<tr><td>" +
        token("spacing/" + row[0]) +
        "</td><td>" +
        bar(row[1]) +
        '</td><td class="ty-num">' +
        row[1] +
        " px</td><td class=\"ty-muted\">" +
        row[2] +
        "</td></tr>"
      );
    });

    host.innerHTML =
      '<div class="ty-info-grid">' +
      '<div class="ty-info"><span class="ty-info__tag">Componente</span><h4>0 – 36 px</h4><p>stack, inline, inset-x e inset-y comparten los mismos 11 pasos: none a 6xl.</p></div>' +
      '<div class="ty-info"><span class="ty-info__tag">Página</span><h4>0 – 128 px</h4><p>inset-page y gap-page comparten una escala aparte, pensada para bloques, no para contenido.</p></div>' +
      '<div class="ty-info"><span class="ty-info__tag">Inset vs gap</span><h4>Cómo elegir</h4><p>¿Se separa el contenido del borde? Es inset. ¿Se separan dos bloques entre sí? Es gap.</p></div>' +
      '<div class="ty-info"><span class="ty-info__tag">Ante la duda</span><h4>inset-page o gap-page</h4><p>Determinar si se está aplicando padding a un contenedor o separando dos contenedores entre sí.</p></div>' +
      "</div>" +
      table(["Token", "Escala", "Px", "Qué resuelve"], rows);
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

    host.innerHTML = table(["Propiedad en edición", "Familia", "Cómo se aplica"], rows, "ty-table--roles");
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
        c.spacing +
        '</td><td class="ty-muted">' +
        c.role +
        "</td></tr>"
      );
    });

    host.innerHTML = table(
      ["Colección", "Modo", "Variables", "De spacing", "Rol"],
      rows,
      "cl-table--last-wide"
    );
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

  function renderGrid(host) {
    var rows = BREAKPOINTS.map(function (bp) {
      return (
        "<tr><td><strong>" +
        bp.label +
        "</strong></td><td class=\"ty-num\">" +
        bp.range +
        '</td><td class="ty-num">' +
        bp.columns +
        '</td><td class="ty-num">' +
        bp.gutter +
        " px</td><td class=\"ty-num\">" +
        bp.margin +
        " px</td><td class=\"ty-muted\">" +
        bp.note +
        "</td></tr>"
      );
    });

    var previews = BREAKPOINTS.map(function (bp) {
      var cols = "";
      var i;
      for (i = 0; i < bp.columns; i += 1) {
        cols += '<span class="sp-grid__col"></span>';
      }
      return (
        '<article class="sp-grid">' +
        "<header><h4>" +
        bp.label +
        "</h4><p>" +
        bp.range +
        " · " +
        bp.columns +
        " columnas · gutter " +
        bp.gutter +
        " px · margin " +
        bp.margin +
        " px</p></header>" +
        '<div class="sp-grid__frame" style="padding-left:' +
        bp.margin +
        "px;padding-right:" +
        bp.margin +
        'px"><div class="sp-grid__cols" style="grid-template-columns:repeat(' +
        bp.columns +
        ",minmax(0,1fr));gap:" +
        bp.gutter +
        'px">' +
        cols +
        "</div></div></article>"
      );
    });

    host.innerHTML =
      table(["Breakpoint", "Ancho", "Columnas", "Gutter", "Margin", "Qué cambia"], rows, "cl-table--last-wide") +
      '<p class="ty-caption">El ancho de columna es siempre automático (stretch): se reparte el espacio disponible. El gutter es un canal que no debe contener ningún elemento; si un contenedor abarca varias columnas, los gutters internos pueden ignorarse.</p>' +
      '<div class="sp-grids">' +
      previews.join("") +
      "</div>";
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
    primitives: renderPrimitives,
    families: renderFamilies,
    compare: renderCompare,
    apply: renderApply,
    collections: renderCollections,
    updates: renderUpdates,
    grid: renderGrid
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-sp]")) {
      return;
    }

    document.querySelectorAll("[data-sp]").forEach(function (host) {
      var renderer = RENDERERS[host.getAttribute("data-sp")];
      if (renderer) {
        renderer(host);
      }
    });

    enableTokenCopy();
  });
})();
