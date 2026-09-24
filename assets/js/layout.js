(function () {
  "use strict";

  var STORAGE_KEY = "jetsmart-nav-expanded";

  function getBasePath() {
    return window.JETSMART_BASE || "./";
  }

  function resolveHref(href) {
    return getBasePath() + href;
  }

  function getCurrentPageId() {
    return document.body.getAttribute("data-page-id") || "";
  }

  function getExpandedSections() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      /* ignore */
    }

    var expanded = {};
    var pageId = getCurrentPageId();
    if (pageId && window.JETSMART_NAV) {
      var found = window.JETSMART_NAV.findItemById(pageId);
      if (found) {
        expanded[found.section.id] = true;
      }
    }

    if (Object.keys(expanded).length === 0) {
      expanded.foundations = true;
      expanded.components = true;
    }

    return expanded;
  }

  function saveExpandedSections(expanded) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expanded));
    } catch (e) {
      /* ignore */
    }
  }

  function createChevronSvg(isOpen) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "nav-chevron" + (isOpen ? " nav-chevron--open" : ""));
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "none");
    svg.innerHTML =
      '<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
    return svg;
  }

  function renderSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar || !window.JETSMART_NAV) {
      return;
    }

    var nav = window.JETSMART_NAV;
    var base = getBasePath();
    var currentPageId = getCurrentPageId();
    var expanded = getExpandedSections();

    sidebar.innerHTML = "";

    var inner = document.createElement("div");
    inner.className = "sidebar-inner";

    var brand = document.createElement("a");
    brand.className = "sidebar-brand";
    brand.href = base + "index.html";
    brand.innerHTML =
      '<img class="sidebar-brand__logo" src="' +
      base +
      'assets/img/logo-jetsmart.png" alt="JetSmart" width="180" height="40">' +
      '<span class="sidebar-brand__text">' +
      '<span class="sidebar-brand__subtitle">UI Kit v1.0</span>' +
      "</span>";
    inner.appendChild(brand);

    var homeLink = document.createElement("a");
    homeLink.className = "sidebar-home" + (currentPageId === "home" ? " sidebar-link--active" : "");
    homeLink.href = base + "index.html";
    homeLink.textContent = "Introducción";
    inner.appendChild(homeLink);

    var navEl = document.createElement("nav");
    navEl.className = "sidebar-nav";
    navEl.setAttribute("aria-label", "Documentation");

    nav.sections.forEach(function (section) {
      var isOpen = !!expanded[section.id];
      var hasActiveChild = section.items.some(function (item) {
        return item.id === currentPageId;
      });

      if (hasActiveChild) {
        isOpen = true;
        expanded[section.id] = true;
      }

      var sectionEl = document.createElement("div");
      sectionEl.className = "nav-section";
      sectionEl.setAttribute("data-section-id", section.id);

      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "nav-section__toggle";
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.innerHTML = '<span class="nav-section__label">' + section.label + "</span>";
      toggle.appendChild(createChevronSvg(isOpen));

      var list = document.createElement("ul");
      list.className = "nav-section__list" + (isOpen ? " nav-section__list--open" : "");

      section.items.forEach(function (item) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.className = "sidebar-link" + (item.id === currentPageId ? " sidebar-link--active" : "");
        link.href = resolveHref(item.href);
        link.textContent = item.label;
        li.appendChild(link);
        list.appendChild(li);
      });

      toggle.addEventListener("click", function () {
        var nowOpen = !list.classList.contains("nav-section__list--open");
        list.classList.toggle("nav-section__list--open", nowOpen);
        toggle.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        toggle.querySelector(".nav-chevron").classList.toggle("nav-chevron--open", nowOpen);

        var state = getExpandedSections();
        state[section.id] = nowOpen;
        saveExpandedSections(state);
      });

      sectionEl.appendChild(toggle);
      sectionEl.appendChild(list);
      navEl.appendChild(sectionEl);
    });

    inner.appendChild(navEl);
    sidebar.appendChild(inner);
    saveExpandedSections(expanded);
  }

  function renderTopbar() {
    var topbar = document.getElementById("topbar");
    if (!topbar) {
      return;
    }

    topbar.innerHTML =
      '<button type="button" id="sidebar-toggle" class="topbar-menu-btn" aria-label="Open navigation">' +
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      "</svg>" +
      "</button>" +
      '<div class="topbar-title">JetSmart UI Kit</div>';
  }

  function renderInPageNav() {
    var container = document.getElementById("page-toc");
    if (!container) {
      return;
    }

    var headings = document.querySelectorAll("main [id^='doc-']");
    if (!headings.length) {
      container.style.display = "none";
      return;
    }

    var list = document.createElement("ul");
    list.className = "page-toc__list";

    headings.forEach(function (heading) {
      var li = document.createElement("li");
      /* El nivel del heading permite anidar el índice en las páginas que
         documentan varios componentes (h2 = componente, h3 = subsección). */
      li.className = "page-toc__item page-toc__item--" + heading.tagName.toLowerCase();
      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      li.appendChild(link);
      list.appendChild(li);
    });

    container.innerHTML = "<p class=\"page-toc__title\">En esta página</p>";
    container.appendChild(list);
  }

  window.JETSMART_LAYOUT = {
    render: function () {
      renderTopbar();
      renderSidebar();
      renderInPageNav();
    },
    resolveHref: resolveHref,
    getBasePath: getBasePath
  };

  document.addEventListener("DOMContentLoaded", function () {
    window.JETSMART_LAYOUT.render();
  });
})();
