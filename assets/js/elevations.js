/**
 * Datos y renderizado de Foundations · Elevations.
 *
 * Valores del archivo "Jetsmart UI Kit v1.0": 20 primitivos en Tier 1
 * (color/shadow, shadow/offset-y, shadow/blur, shadow/spread), 21 tokens
 * semánticos repartidos entre Tier 2: Color y Tier 2: Spatial & Shape,
 * y 5 estilos de efecto Elevation-xs → Elevation-xl.
 */
(function () {
  "use strict";

  var SHADOW_RGB = "152, 170, 192"; /* #98AAC0 */

  /* [token, valor, grupo, consumido por] */
  var PRIMITIVES = [
    ["color/shadow/base-14", "#98AAC0 · 14%", "Color", "color/effect/elevation-xs"],
    ["color/shadow/base-18", "#98AAC0 · 18%", "Color", "color/effect/elevation-sm"],
    ["color/shadow/base-24", "#98AAC0 · 24%", "Color", "color/effect/elevation-md"],
    ["color/shadow/base-32", "#98AAC0 · 32%", "Color", "color/effect/elevation-lg"],
    ["color/shadow/base-42", "#98AAC0 · 42%", "Color", "color/effect/elevation-xl"],
    ["shadow/offset-y/4", "4 px", "Offset Y", "elevation/xs/offset-y"],
    ["shadow/offset-y/8", "8 px", "Offset Y", "elevation/sm/offset-y"],
    ["shadow/offset-y/12", "12 px", "Offset Y", "elevation/md/offset-y"],
    ["shadow/offset-y/16", "16 px", "Offset Y", "elevation/lg/offset-y"],
    ["shadow/offset-y/24", "24 px", "Offset Y", "elevation/xl/offset-y"],
    ["shadow/blur/12", "12 px", "Blur", "elevation/xs/blur"],
    ["shadow/blur/24", "24 px", "Blur", "elevation/sm/blur"],
    ["shadow/blur/32", "32 px", "Blur", "elevation/md/blur"],
    ["shadow/blur/48", "48 px", "Blur", "elevation/lg/blur"],
    ["shadow/blur/64", "64 px", "Blur", "elevation/xl/blur"],
    ["shadow/spread/-1", "-1 px", "Spread", "elevation/xs/spread"],
    ["shadow/spread/-2", "-2 px", "Spread", "elevation/sm/spread"],
    ["shadow/spread/-3", "-3 px", "Spread", "elevation/md/spread"],
    ["shadow/spread/-4", "-4 px", "Spread", "elevation/lg/spread"],
    ["shadow/spread/-6", "-6 px", "Spread", "elevation/xl/spread"]
  ];

  /* [nivel, offsetY, blur, spread, alpha, uso] */
  var LEVELS = [
    ["xs", 4, 12, -1, 14, "Superficie apenas despegada del fondo: el primer escalón sobre la página."],
    ["sm", 8, 24, -2, 18, "Elementos que se separan del flujo sin bloquearlo."],
    ["md", 12, 32, -3, 24, "Nivel de panel: contenido que se abre sobre la página y la tapa en parte."],
    ["lg", 16, 48, -4, 32, "Contenedores que toman el foco de la pantalla."],
    ["xl", 24, 64, -6, 42, "El nivel más alto de la rampa, para el overlay principal."]
  ];

  /* [dimensión, rango, categoría, cómo se lee] */
  var RAMP = [
    ["Offset Y", "4 → 24", "Altura", "Sube de a 4 px hasta lg y salta a 24 en xl. Es la distancia percibida entre la superficie y el fondo."],
    ["Blur", "12 → 64", "Difusión", "Siempre entre 2,7× y 3× el offset. Mantener esa proporción al agregar un paso nuevo."],
    ["Spread", "-1 → -6", "Contención", "Negativo y creciente: contrae la sombra para que el blur no la haga asomar por los costados del nodo."],
    ["Alpha", "14% → 42%", "Opacidad", "Sube con la altura. El tono base es siempre #98AAC0, un azul grisáceo, nunca negro puro."],
    ["Regla única", "Tier 1 → Tier 2", "Herencia", "Un primitivo nunca se aplica a un nodo ni a un estilo. Solo alimenta un token semántico."]
  ];

  /* [campo, scope, token, descripción] */
  var ANATOMY = [
    ["Color", "EFFECT_COLOR", "color/effect/elevation-md", "Aliasa color/shadow/base-24. El alpha va incorporado en el primitivo."],
    ["Offset Y", "EFFECT_FLOAT", "elevation/md/offset-y = 12 px", "Desplaza la sombra hacia abajo: la luz del sistema es cenital."],
    ["Offset X", "EFFECT_FLOAT", "elevation/offset-x = 0 px", "Compartido por los cinco niveles; las sombras nunca se desplazan en X."],
    ["Blur", "EFFECT_FLOAT", "elevation/md/blur = 32 px", "Radio de difusión; crece más rápido que el offset en toda la rampa."],
    ["Spread", "EFFECT_FLOAT", "elevation/md/spread = -3 px", "Negativo: contrae la sombra para que no asome por los costados."]
  ];

  /* [dónde, tipo, contenido] */
  var COLLECTIONS = [
    ["Assets → Effect styles", "Estilos", "Elevation-xs a Elevation-xl. Es lo único que se aplica sobre un nodo."],
    ["Tier 1: Core Primitives", "Primitivo", "color/shadow/base-*, shadow/offset-y/*, shadow/blur/*, shadow/spread/*. 20 variables con scope vacío, ocultas de los pickers."],
    ["Tier 2: Color", "Semántico", "color/effect/elevation-*. El color vive con los demás colores para poder rematizarse por mode."],
    ["Tier 2: Spatial &amp; Shape", "Semántico", "elevation/{nivel}/{offset-y, blur, spread} más elevation/offset-x. 16 variables de geometría."]
  ];

  /* [acción, correcto, detalle] */
  var APPLY = [
    ["Aplicar", true, "Seleccionar el nodo, ir al panel Effects y aplicar el estilo Elevation-* desde la librería."],
    ["Cambiar de nivel", true, "Subir o bajar la elevación es cambiar de estilo, no ajustar el blur ni la opacidad a mano."],
    ["Bindear tokens sueltos", false, "Vincular elevation/md/blur directamente en un nodo rompe la trazabilidad del nivel completo."],
    ["Editar el estilo", false, "Sobrescribir un valor en el estilo desvincula la variable. El cambio se hace en el token."],
    ["Apilar elevaciones", false, "Un solo nivel por capa: no combinar dos estilos en el mismo nodo ni en padre e hijo directos."]
  ];

  /* [token, tipo, valor, muestra] */
  var SCRIM_PRIMITIVES = [
    ["color/alpha/ink/ink-60", "Color", "#0B1624 · 60%", "rgba(11, 22, 36, 0.6)"],
    ["color/alpha/ink/ink-40", "Color", "#0B1624 · 40%", "rgba(11, 22, 36, 0.4)"],
    ["blur/24", "Float", "24 px", null],
    ["blur/16", "Float", "16 px", null]
  ];

  /* [token semántico, alias, uso] */
  var SCRIM_SEMANTIC = [
    ["color/background/scrim", "color/alpha/ink/ink-60", "Overlay oscuro estándar: modales, bottom sheets."],
    ["color/background/scrim-subtle", "color/alpha/ink/ink-40", "Overlay oscuro liviano: tooltips, popovers."],
    ["blur/background/scrim", "blur/24", "Desenfoque de fondo del overlay estándar."],
    ["blur/background/scrim-subtle", "blur/16", "Desenfoque de fondo del overlay liviano."]
  ];

  function shadow(level) {
    return (
      "0 " + level[1] + "px " + level[2] + "px " + level[3] + "px rgba(" +
      SHADOW_RGB + ", " + level[4] / 100 + ")"
    );
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

  /* Padding fijo para las cinco muestras: el nivel xl (blur 64, offset 24) es el
     que más espacio necesita, y así todas las filas y tarjetas miden igual. */
  function swatch(level, size) {
    var px = size || 88;
    return (
      '<span class="el-swatch-wrap"><span class="el-swatch" style="width:' + px +
      "px;height:" + px + "px;box-shadow:" + shadow(level) + '"></span></span>'
    );
  }

  function renderPrimitives(host) {
    var rows = PRIMITIVES.map(function (p) {
      return (
        "<tr><td>" + token(p[0]) +
        '</td><td class="ty-num">' + p[1] +
        "</td><td>" + badge(p[2], "neutral") +
        "</td><td><code>" + p[3] + "</code></td></tr>"
      );
    });

    host.innerHTML =
      table(["Primitivo", "Valor", "Grupo", "Consumido por"], rows) +
      '<p class="ty-caption">Los 20 primitivos tienen scope vacío: no aparecen en ningún picker de Figma. ' +
      "Cada uno alimenta exactamente un token semántico de Tier 2, nunca un nodo ni un estilo.</p>";
  }

  function renderRamp(host) {
    var rows = RAMP.map(function (r) {
      return (
        "<tr><td><strong>" + r[0] + "</strong></td>" +
        '<td class="ty-num">' + r[1] + "</td>" +
        "<td>" + badge(r[2], "neutral") + "</td>" +
        '<td class="ty-muted">' + r[3] + "</td></tr>"
      );
    });
    host.innerHTML = table(
      ["Dimensión", "Rango", "Qué controla", "Cómo se lee"],
      rows,
      "cl-table--last-wide"
    );
  }

  function renderLevels(host) {
    var rows = LEVELS.map(function (l) {
      return (
        "<tr><td>" + token("Elevation-" + l[0]) + "</td>" +
        '<td class="el-cell-swatch">' + swatch(l, 88) + "</td>" +
        '<td class="ty-num">y ' + l[1] + " · blur " + l[2] + " · spread " + l[3] + "</td>" +
        '<td class="ty-num">' + l[4] + "%</td>" +
        "<td><code>elevation/" + l[0] + "/*</code><br><code>color/effect/elevation-" + l[0] +
        "</code></td></tr>"
      );
    });

    host.innerHTML =
      table(
        ["Token", "Sombra — real, sin escalar", "Offset · Blur · Spread", "Opacidad", "Tokens Tier 2"],
        rows
      ) +
      '<p class="ty-caption">Las sombras se muestran a tamaño real sobre un cuadrado blanco. La opacidad crece ' +
      "con la altura y el tono base es siempre #98AAC0. Cada nivel resuelve cuatro tokens de Tier 2: offset-y, " +
      "blur y spread en Spatial &amp; Shape, y el color en Tier 2: Color.</p>";
  }

  function renderLevelUses(host) {
    host.innerHTML =
      '<div class="el-grid">' +
      LEVELS.map(function (l) {
        return (
          '<article class="el-card">' +
          '<div class="el-card__demo">' + swatch(l, 64) + "</div>" +
          '<div class="el-card__body"><h4>' + token("Elevation-" + l[0]) + "</h4>" +
          '<p class="el-card__meta">y ' + l[1] + " · blur " + l[2] + " · spread " + l[3] +
          " · " + l[4] + "%</p>" +
          '<p class="el-card__desc">' + l[5] + "</p></div></article>"
        );
      }).join("") +
      "</div>";
  }

  function renderAnatomy(host) {
    var rows = ANATOMY.map(function (a) {
      return (
        "<tr><td><strong>" + a[0] + "</strong></td>" +
        "<td>" + badge(a[1], "var") + "</td>" +
        "<td><code>" + a[2] + "</code></td>" +
        '<td class="ty-muted">' + a[3] + "</td></tr>"
      );
    });
    host.innerHTML = table(
      ["Campo del efecto", "Scope", "Token vinculado", "Qué hace"],
      rows,
      "cl-table--last-wide"
    );
  }

  function renderCollections(host) {
    var rows = COLLECTIONS.map(function (c) {
      return (
        "<tr><td><strong>" + c[0] + "</strong></td>" +
        "<td>" + badge(c[1], "neutral") + "</td>" +
        '<td class="ty-muted">' + c[2] + "</td></tr>"
      );
    });
    host.innerHTML = table(["Dónde", "Tipo", "Qué contiene"], rows, "cl-table--last-wide");
  }

  function renderApply(host) {
    host.innerHTML =
      '<ul class="ty-rules">' +
      APPLY.map(function (a) {
        return (
          '<li class="ty-rules__' + (a[1] ? "do" : "dont") + '"><strong>' + a[0] + ".</strong> " +
          a[2] + "</li>"
        );
      }).join("") +
      "</ul>";
  }

  function renderScrimPrimitives(host) {
    var rows = SCRIM_PRIMITIVES.map(function (s) {
      var sample = s[3]
        ? '<span class="el-scrim-chip" style="background:' + s[3] + '"></span>'
        : '<span class="ty-muted">—</span>';
      return (
        "<tr><td>" + token(s[0]) + "</td>" +
        "<td>" + badge(s[1], "neutral") + "</td>" +
        '<td class="ty-num">' + s[2] + "</td>" +
        "<td>" + sample + "</td></tr>"
      );
    });
    host.innerHTML = table(["Token", "Tipo", "Valor", "Muestra"], rows);
  }

  function renderScrimSemantic(host) {
    var rows = SCRIM_SEMANTIC.map(function (s) {
      return (
        "<tr><td>" + token(s[0]) + "</td>" +
        "<td><code>" + s[1] + "</code></td>" +
        '<td class="ty-muted">' + s[2] + "</td></tr>"
      );
    });
    host.innerHTML =
      table(["Token semántico", "Alias a primitivo", "Uso"], rows, "cl-table--last-wide") +
      '<p class="ty-caption">blur/background/scrim y blur/background/scrim-subtle todavía no tienen una ' +
      "propiedad compuesta con su color: aplica ambos tokens por separado sobre el mismo elemento.</p>";
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
    primitives: renderPrimitives,
    ramp: renderRamp,
    levels: renderLevels,
    "level-uses": renderLevelUses,
    anatomy: renderAnatomy,
    collections: renderCollections,
    apply: renderApply,
    "scrim-primitives": renderScrimPrimitives,
    "scrim-semantic": renderScrimSemantic
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-el]")) return;
    document.querySelectorAll("[data-el]").forEach(function (host) {
      var renderer = RENDERERS[host.getAttribute("data-el")];
      if (renderer) renderer(host);
    });
    enableTokenCopy();
  });
})();
