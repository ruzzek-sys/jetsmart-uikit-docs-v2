/**
 * Datos y renderizado de Foundations · Icons.
 *
 * Fuente: página Icons del archivo "Jetsmart UI Kit v1.0"
 * (node 5467:14480): librería Font Awesome 7 y Round World Flags.
 */
(function () {
  "use strict";

  var CORE_PACKS = [
    ["Brands", "fab", "font-awesome", "Logotipos de marcas y redes."],
    ["7 Free", "fas", "house", "Set gratuito de Font Awesome 7."],
    ["7 Pro", "fas", "house", "Set Pro de Font Awesome 7 (requiere licencia)."]
  ];

  var PRO_PLUS = [
    "Chisel",
    "Etch",
    "Graphite",
    "Jelly",
    "Mosaic",
    "Notdog",
    "Pixel",
    "Slab",
    "Thumbprint",
    "Utility",
    "Vellum",
    "Whiteboard"
  ];

  var STEPS = [
    {
      n: "01",
      title: "Instalar las fuentes OTF",
      text: "Descarga los archivos de escritorio de los paquetes Font Awesome 7 elegidos e instala los OTF en el sistema. Sin eso, el componente no renderiza el glifo en Figma."
    },
    {
      n: "02",
      title: "Elegir el paquete",
      text: "Selecciona el paquete preferido: Core (Brands, 7 Free, 7 Pro) o uno de los packs Pro+."
    },
    {
      n: "03",
      title: "Ajustar propiedades",
      text: "Con el componente Font Awesome Icon seleccionado, cambia familia, estilo, relleno y escala desde la barra lateral derecha."
    },
    {
      n: "04",
      title: "Escribir el icon-name",
      text: "Escribe el nombre del ícono en el campo de texto icon-name. Los nombres se consultan en el catálogo de Font Awesome."
    }
  ];

  var PROPERTIES = [
    ["Padding", "Square u otras opciones de caja del componente."],
    ["Scale", "1x por defecto; también .75x y 1.25x."],
    ["Icon Pack", "Paquete activo, por ejemplo v7-icon (pro)."],
    ["Family", "Classic, Classic Duotone u otras familias del pack."],
    ["Style", "Solid, Regular, Light, Thin, según el pack."],
    ["icon-name", "Nombre del glifo. En Duotone: icon-name# y icon-name##."]
  ];

  var SAMPLE_ICONS = [
    ["plane", "fas", "plane"],
    ["suitcase", "fas", "suitcase"],
    ["ticket", "fas", "ticket"],
    ["user", "fas", "user"],
    ["calendar", "fas", "calendar"],
    ["map-marker-alt", "fas", "location-dot"],
    ["check", "fas", "check"],
    ["xmark", "fas", "xmark"],
    ["chevron-down", "fas", "chevron-down"],
    ["search", "fas", "magnifying-glass"],
    ["bell", "fas", "bell"],
    ["heart", "fas", "heart"]
  ];

  /* Muestra representativa; el set completo vive en la librería de Figma (~260). */
  var FLAG_SAMPLES = [
    ["chile", "cl", "Chile"],
    ["argentina", "ar", "Argentina"],
    ["peru", "pe", "Perú"],
    ["colombia", "co", "Colombia"],
    ["brazil", "br", "Brasil"],
    ["uruguay", "uy", "Uruguay"],
    ["paraguay", "py", "Paraguay"],
    ["bolivia", "bo", "Bolivia"],
    ["ecuador", "ec", "Ecuador"],
    ["mexico", "mx", "México"],
    ["spain", "es", "España"],
    ["united states", "us", "Estados Unidos"],
    ["united kingdom", "gb", "Reino Unido"],
    ["france", "fr", "Francia"],
    ["germany", "de", "Alemania"],
    ["italy", "it", "Italia"],
    ["canada", "ca", "Canadá"],
    ["australia", "au", "Australia"],
    ["japan", "jp", "Japón"],
    ["china", "cn", "China"],
    ["south korea", "kr", "Corea del Sur"],
    ["india", "in", "India"],
    ["south africa", "za", "Sudáfrica"],
    ["new zealand", "nz", "Nueva Zelanda"]
  ];

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

  function faIcon(style, name, size) {
    return (
      '<i class="' +
      style +
      " fa-" +
      name +
      ' ic-fa" style="font-size:' +
      (size || 20) +
      'px" aria-hidden="true"></i>'
    );
  }

  function renderCore(host) {
    host.innerHTML =
      '<div class="ic-pack-grid">' +
      CORE_PACKS.map(function (p) {
        return (
          '<article class="ic-pack">' +
          '<div class="ic-pack__preview">' +
          faIcon(p[1], p[2], 28) +
          "</div>" +
          "<h4>" +
          p[0] +
          "</h4>" +
          "<p>" +
          p[3] +
          "</p></article>"
        );
      }).join("") +
      "</div>";
  }

  function renderProPlus(host) {
    host.innerHTML =
      '<div class="ic-style-grid">' +
      PRO_PLUS.map(function (name) {
        return (
          '<div class="ic-style">' +
          '<div class="ic-style__preview">' +
          faIcon("fas", "house", 22) +
          "</div>" +
          "<span>" +
          name +
          "</span></div>"
        );
      }).join("") +
      "</div>" +
      '<p class="ty-caption">Las muestras usan el glifo house a modo ilustrativo. En Figma cada pack Pro+ renderiza su tipografía de ícono instalada.</p>';
  }

  function renderSteps(host) {
    host.innerHTML = STEPS.map(function (s) {
      return (
        '<div class="ty-item"><div class="ty-item__head"><h4>' +
        s.title +
        "</h4>" +
        badge(s.n, "neutral") +
        "</div><p>" +
        s.text +
        "</p></div>"
      );
    }).join("");
  }

  function renderProperties(host) {
    var rows = PROPERTIES.map(function (p) {
      return (
        "<tr><td><code>" +
        p[0] +
        '</code></td><td class="ty-muted">' +
        p[1] +
        "</td></tr>"
      );
    });
    host.innerHTML = table(["Propiedad", "Qué controla"], rows, "ty-table--roles");
  }

  function renderSamples(host) {
    host.innerHTML =
      '<div class="ic-sample-grid">' +
      SAMPLE_ICONS.map(function (i) {
        return (
          '<button type="button" class="ic-sample" data-icon-name="' +
          i[0] +
          '" title="Copiar icon-name">' +
          faIcon(i[1], i[2], 22) +
          "<span>" +
          i[0] +
          "</span></button>"
        );
      }).join("") +
      "</div>" +
      '<p class="ty-caption">Ejemplos frecuentes en producto. Clic copia el icon-name. Catálogo completo: fontawesome.com/search.</p>';
  }

  function renderFlags(host) {
    host.innerHTML =
      '<div class="ic-flag-grid">' +
      FLAG_SAMPLES.map(function (f) {
        return (
          '<div class="ic-flag" title="' +
          f[2] +
          '">' +
          '<img class="ic-flag__img" src="https://flagcdn.com/w80/' +
          f[1] +
          '.png" alt="' +
          f[2] +
          '" width="40" height="40" loading="lazy">' +
          "<span>" +
          f[0] +
          "</span></div>"
        );
      }).join("") +
      "</div>" +
      '<p class="ty-caption">Muestra de 24 banderas. En Figma el set Round World Flags supera las 250 instancias (países, territorios y organizaciones).</p>';
  }

  function enableCopy() {
    document.addEventListener("click", function (event) {
      var chip = event.target.closest(".ic-sample");
      if (!chip || !navigator.clipboard) return;
      var name = chip.getAttribute("data-icon-name");
      var label = chip.querySelector("span");
      navigator.clipboard.writeText(name).then(function () {
        var original = label.textContent;
        label.textContent = "copiado";
        chip.classList.add("ic-sample--copied");
        setTimeout(function () {
          label.textContent = original;
          chip.classList.remove("ic-sample--copied");
        }, 900);
      });
    });
  }

  var RENDERERS = {
    core: renderCore,
    "pro-plus": renderProPlus,
    steps: renderSteps,
    properties: renderProperties,
    samples: renderSamples,
    flags: renderFlags
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector("[data-ic]")) return;
    document.querySelectorAll("[data-ic]").forEach(function (host) {
      var renderer = RENDERERS[host.getAttribute("data-ic")];
      if (renderer) renderer(host);
    });
    enableCopy();
  });
})();
