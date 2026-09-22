(function () {
  "use strict";

  function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    var overlay = document.getElementById("sidebar-overlay");
    if (overlay) {
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  function openSidebar() {
    document.body.classList.add("sidebar-open");
    var overlay = document.getElementById("sidebar-overlay");
    if (overlay) {
      overlay.setAttribute("aria-hidden", "false");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
      var toggle = event.target.closest("#sidebar-toggle");
      if (toggle) {
        if (document.body.classList.contains("sidebar-open")) {
          closeSidebar();
        } else {
          openSidebar();
        }
        return;
      }

      var overlay = event.target.closest("#sidebar-overlay");
      if (overlay) {
        closeSidebar();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeSidebar();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) {
        closeSidebar();
      }
    });
  });
})();
