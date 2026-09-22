/**
 * Datos y renderizado de Foundations · Radius & Width.
 *
 * Valores de las variables FLOAT del archivo "Jetsmart UI Kit v1.0":
 * 21 primitivos de radius + 8 tokens semánticos, y 9 primitivos de
 * border width + 7 tokens semánticos en Tier 2: Spatial & Shape.
 */
(function () {
  "use strict";

  var RADIUS_PRIMITIVES = [
    ["0", 0],
    ["1", 2],
    ["2", 4],
    ["3", 6],
    ["4", 8],
    ["5", 12],
    ["6", 16],
    ["7", 24],
    ["8", 32],
    ["9", 40],
    ["10", 48],
    ["11", 56],
    ["12", 64],
    ["13", 72],
    ["14", 80],
    ["15", 96],
    ["16", 112],
    ["17", 128],
    ["18", 144],
    ["19", 160],
    ["full", 999]
  ];

  var RADIUS_SEMANTIC = [
    ["none", "border/radius/0", 0, "Sin curva", "Botones ghost/tertiary, links de texto y el shell del Navbar: elementos que no deben leerse como tarjeta ni botón."],
    ["extra-small", "border/radius/2", 4, "Uso muy acotado", "Poco frecuente en el kit; aparece en sub-frames internos como Notice Panel."],
    ["small", "border/radius/4", 8, "Tooltips y paneles", "Tooltips pequeños, Notification Item e Inline Message en layout Block."],
    ["medium", "border/radius/6", 16, "Paneles y tablas", "Tooltips grandes, Selection Table y paneles de contenido intermedio."],
    ["large", "border/radius/7", 24, "Contenedor estándar", "Modal, Alert Dialog, Notice Panel, Cards, Banner y Action Card: el radio más común para un contenedor."],
    ["large-increased", "border/radius/8", 32, "Overlay grande", "Accordion y Alert Dialog cuando ocupan la pantalla como overlay principal."],
    ["extra-large", "border/radius/9", 40, "Formas grandes", "Paneles y piezas decorativas de mayor escala."],
    ["full", "border/radius/full", 999, "Comportamiento circular", "Badge, Buttons, chips, avatares, Progress Bar, Page Indicator e Input: el token de mayor uso."]
  ];

  var RADIUS_ZONES = [
    ["0 – 8", "Micro", "Elementos compactos: tags, checkboxes e inputs. Incremento de 2 px."],
    ["12 – 24", "Estándar", "Tarjetas, botones y modales. Incremento de 4 a 8 px."],
    ["32 – 160", "Macro", "Paneles grandes y secciones hero. Incremento de 8 a 16 px; pocos alias."],
    ["999", "Centinela", "border/radius/full. No es un paso de la rampa: fuerza el límite circular de Figma."]
  ];

  var WIDTH_PRIMITIVES = [
    ["0", 0],
    ["1", 0.5],
    ["2", 0.75],
    ["3", 1],
    ["4", 1.5],
    ["5", 2],
    ["6", 3],
    ["7", 4],
    ["8", 5]
  ];

  var WIDTH_SEMANTIC = [
    ["none", "border/width/0", 0, "Sin borde", "La separación la resuelve el fondo, la sombra o el espaciado."],
    ["hairline", "border/width/1", 0.5, "Línea mínima", "Declarado en Tier 2; aún sin bindings en las páginas de componentes auditadas."],
    ["thin", "border/width/2", 0.75, "Línea fina", "Declarado en Tier 2; aún sin bindings en las páginas de componentes auditadas."],
    ["base", "border/width/3", 1, "Grosor por defecto", "Dominante del kit (~95% de los bindings): Buttons, Modal, Accordion, Dropdown, Input, Badge y Divider."],
    ["medium", "border/width/5", 2, "Estado", "Foco, error y selección. Duplica el grosor base para leerse sin depender solo del color."],
    ["thick", "border/width/6", 3, "Uso puntual", "Pocos bindings (Divider, Modal). Confirmar el rol antes de extenderlo."],
    ["heavy", "border/width/7", 4, "Acento gráfico", "Barras de acento y piezas promocionales; no para controles de formulario."]
  ];

  var WIDTH_ZONES = [
    ["0 – 1 px", "Zona fina", "Cuatro pasos (0, 0.5, 0.75 y 1 px) para divisores y bordes de controles en reposo."],
    ["1.5 – 2 px", "Zona de estado", "Dos pasos para foco, selección y error: duplican el grosor base."],
    ["3 – 5 px", "Zona gráfica", "Tres pasos para anillos, barras de acento y piezas promocionales. No se usan en controles de formulario."]
  ];

  var APPLY = [
    ["Corner radius (4 esquinas)", "border/radius/…", "Caso por defecto: un mismo token en las cuatro esquinas."],
    ["Corner radius individual", "border/radius/…", "Excepción: tabs activos o acordeones abiertos, solo en las esquinas visibles."],
    ["Elementos circulares", "border/radius/full", "Avatares, switches y dots de estado en un elemento de igual ancho y alto."],
    ["Stroke weight", "border/width/…", "Grosor de borde en Stroke. Scope: STROKE_FLOAT."]
  ];

  var COLLECTIONS = [
    {
      name: "Tier 1: Core Primitives",
      mode: "Default",
      radius: 21,
      width: 9,
      role: "Rampa cruda de radius (0–160 + full) y de border width (0–5 px). Solo se edita cuando cambia la escala base."
    },
    {
      name: "Tier 2: Spatial & Shape",
      mode: "Theme 1",
      radius: 8,
      width: 7,
      role: "Roles semánticos de radius y border width. Convive con spacing en la misma colección."
    }
  ];

  var UPDATES = [
    {
      goal: "Cambiar el rol de un radio o grosor",
      where: "Edita Tier 2",
      text: "Reapunta el alias del token semántico a otro paso de la rampa. Todos los componentes que lo usan lo reciben."
    },
    {
      goal: "Cambiar la escala base",
      where: "Edita Tier 1",
      text: "Cambia el valor del primitivo. Afecta a todos los tokens que lo referencian: conviene revisar antes cuáles son."
    },
    {
      goal: "Nunca en el nodo",
      where: "Prohibido",
      text: "Escribir un número en Corner radius o Stroke desenlaza la variable. El componente se mantiene visualmente igual y deja de heredar."
    }
  ];

  var ALIAS_COUNT = {};

  RADIUS_SEMANTIC.forEach(function (t) {
    ALIAS_COUNT[t[1]] = (ALIAS_COUNT[t[1]] || 0) + 1;
  });
  WIDTH_SEMANTIC.forEach(function (t) {
    ALIAS_COUNT[t[1]] = (ALIAS_COUNT[t[1]] || 0) + 1;
  });

  function rem(px) {
    if (px === 0) return "0";
    if (px === 999) return "—";
    var value = px / 16;
    return (Math.round(value * 1000) / 1000).toString().replace(".", ",") + " rem";
  }

  function pxLabel(px) {
    if (px === 999) return "999 (full)";
    if (px % 1 === 0) return px + " px";
    return String(px).replace(".", ",") + " px";
  }

  function token(name) {
    return '<button type="button" class="ty-token" title="Copiar token">' + name + "</button>";
  }

  function badge(text, kind) {
    return '<span class="ty-badge ty-badge--' + kind + '">' + text + "</span>";
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

  function radiusZone(px) {
    if (px === 0) return "Cero";
    if (px === 999) return "Centinela";
    if (px <= 8) return "Micro";
    if (px <= 24) return "Estándar";
    return "Macro";
  }

  function radiusDemo(px, compact, singleCorner) {
    var isFull = px === 999;
    var size;
    if (singleCorner) {
      /* Caja lo bastante grande para expresar el arco; tope para la tabla. */
      size = isFull ? 80 : Math.max(56, Math.min(px + 20, 96));
    } else {
      size = compact ? 72 : 110;
    }
    var radius = isFull ? "999px" : px + "px";
    /* Primitivos: una sola esquina (como en Figma), para que 9–19 no se lean como círculo. */
    var radiusStyle = singleCorner
      ? "border-top-left-radius:" + radius
      : "border-radius:" + radius;
    return (
      '<span class="rw-radius' +
      (isFull && !singleCorner ? " rw-radius--full" : "") +
      (singleCorner ? " rw-radius--corner" : "") +
      '" style="width:' +
      size +
      "px;height:" +
      size +
      "px;" +
      radiusStyle +
      '"></span>'
    );
  }

  function widthDemo(px) {
    if (px === 0) {
      return '<span class="rw-width rw-width--none" title="Sin borde"></span>';
    }
    return (
      '<span class="rw-width" style="border-width:' +
      px +
      'px" title="' +
      pxLabel(px) +
      '"></span>'
    );
  }

  function renderRadiusPrimitives(host) {
    var rows = RADIUS_PRIMITIVES.map(function (step) {
      var path = "border/radius/" + step[0];
      var count = ALIAS_COUNT[path] || 0;
      return (
        "<tr><td>" +
        token(path) +
        "</td><td>" +
        radiusDemo(step[1], true, true) +
        '</td><td class="ty-num">' +
        pxLabel(step[1]) +
        '</td><td class="ty-num">' +
        rem(step[1]) +
        "</td><td>" +
        badge(radiusZone(step[1]), "neutral") +
        "</td><td>" +
        (count ? badge(count + (count === 1 ? " token" : " tokens"), "on") : '<span class="ty-muted">—</span>') +
        "</td></tr>"
      );
    });

    host.innerHTML =
      table(["Token", "Muestra", "Px", "Rem", "Zona", "Alias Tier 2"], rows) +
      '<p class="ty-caption">13 de los 21 primitivos no tienen alias en Tier 2: son reserva para necesidades futuras, no un error de escala. Un primitivo nunca se aplica de forma directa a un componente.</p>';
  }

  function renderRadiusZones(host) {
    var rows = RADIUS_ZONES.map(function (z) {
      return (
        '<tr><td class="ty-num">' +
        z[0] +
        "</td><td>" +
        badge(z[1], "neutral") +
        '</td><td class="ty-muted">' +
        z[2] +
        "</td></tr>"
      );
    });
    host.innerHTML = table(["Pasos", "Zona", "Para qué sirve"], rows, "ty-table--roles");
  }

  function renderRadiusSemantic(host) {
    var cards = RADIUS_SEMANTIC.map(function (t) {
      return (
        '<article class="rw-card">' +
        radiusDemo(t[2], false) +
        '<div class="rw-card__body">' +
        "<h4>" +
        token("border/radius/" + t[0]) +
        "</h4>" +
        '<p class="rw-card__meta"><code>' +
        t[1] +
        "</code> · " +
        pxLabel(t[2]) +
        "</p>" +
        badge(t[3], "neutral") +
        '<p class="rw-card__desc">' +
        t[4] +
        "</p></div></article>"
      );
    }).join("");

    host.innerHTML = '<div class="rw-grid">' + cards + "</div>";
  }

  function renderWidthPrimitives(host) {
    var rows = WIDTH_PRIMITIVES.map(function (step) {
      var path = "border/width/" + step[0];
      var count = ALIAS_COUNT[path] || 0;
      return (
        "<tr><td>" +
        token(path) +
        "</td><td>" +
        widthDemo(step[1]) +
        '</td><td class="ty-num">' +
        pxLabel(step[1]) +
        "</td><td>" +
        (count ? badge(count + (count === 1 ? " token" : " tokens"), "on") : '<span class="ty-muted">—</span>') +
        "</td></tr>"
      );
    });

    host.innerHTML =
      table(["Token", "Muestra", "Px", "Alias Tier 2"], rows) +
      '<p class="ty-caption">border/width/4 (1,5 px) y border/width/8 (5 px) existen en Tier 1 sin rol semántico en Tier 2: son reserva de la rampa, no tokens de uso directo.</p>';
  }

  function renderWidthZones(host) {
    var rows = WIDTH_ZONES.map(function (z) {
      return (
        '<tr><td class="ty-num">' +
        z[0] +
        "</td><td>" +
        badge(z[1], "neutral") +
        '</td><td class="ty-muted">' +
        z[2] +
        "</td></tr>"
      );
    });
    host.innerHTML = table(["Pasos", "Zona", "Para qué sirve"], rows, "ty-table--roles");
  }

  function renderWidthSemantic(host) {
    var rows = WIDTH_SEMANTIC.map(function (t) {
      return (
        "<tr><td>" +
        token("border/width/" + t[0]) +
        "</td><td>" +
        widthDemo(t[2]) +
        "</td><td><code>" +
        t[1] +
        '</code></td><td class="ty-num">' +
        pxLabel(t[2]) +
        "</td><td>" +
        badge(t[3], "neutral") +
        '</td><td class="ty-muted">' +
        t[4] +
        "</td></tr>"
      );
    });

    host.innerHTML =
      table(["Token", "Muestra", "Primitivo Tier 1", "Px", "Rol", "Uso"], rows, "cl-table--last-wide") +
      '<p class="ty-caption">Las muestras muestran el grosor real, sin escalar. none no dibuja borde.</p>';
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
        c.radius +
        '</td><td class="ty-num">' +
        c.width +
        '</td><td class="ty-muted">' +
        c.role +
        "</td></tr>"
      );
    });
    host.innerHTML = table(
      ["Colección", "Modo", "Radius", "Width", "Rol"],
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

  function enableTokenCopy() {
    document.addEventListener("click", function (event) {
      var chip = event.target.closest(".ty-token");
      if (!chip || !navigator.clipboard) return;
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
    "radius-primitives": renderRadiusPrimitives,
    "radius-zones": renderRadiusZones,
    "radius-semantic": renderRadiusSemantic,
    "width-primitives": renderWidthPrimitives,
    "width-zones": renderWidthZones,
    "width-semantic": renderWidthSemantic,
    apply: renderApply,
    collections: renderCollections,
    updates: renderUpdates
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-rw]")) return;
    document.querySelectorAll("[data-rw]").forEach(function (host) {
      var renderer = RENDERERS[host.getAttribute("data-rw")];
      if (renderer) renderer(host);
    });
    enableTokenCopy();
  });
})();
