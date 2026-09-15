/* =========================================================
   STACKLY BPO ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= AOS ================= */

  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 70
  });


  /* ================= ELEMENTS ================= */

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const menuToggle = document.getElementById("menuToggle");

  const links = document.querySelectorAll(".sidebar-link");

  const pages = document.querySelectorAll(".page");

  const pageTitle = document.getElementById("pageTitle");


  /* ================= PAGE TITLES ================= */

  const pageNames = {

    dashboard: "Dashboard",

    customers: "Customers",

    services: "Services",

    reports: "Reports",

    messages: "Messages",

    team: "Team",

    settings: "Settings"

  };


  /* ================= SIDEBAR TOGGLE ================= */

  function openSidebar() {

    sidebar.classList.add("open");

    overlay.classList.add("active");

  }


  function closeSidebar() {

    sidebar.classList.remove("open");

    overlay.classList.remove("active");

  }


  menuToggle.addEventListener("click", () => {

    if (sidebar.classList.contains("open")) {

      closeSidebar();

    } else {

      openSidebar();

    }

  });


  overlay.addEventListener("click", closeSidebar);


  /* ================= PAGE NAVIGATION ================= */

  function showPage(pageName) {

    /* Hide all pages */

    pages.forEach(page => {

      page.classList.remove("active-page");

    });


    /* Show selected page */

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {

      selectedPage.classList.add("active-page");

    }


    /* Update sidebar */

    links.forEach(link => {

      link.classList.remove("active");

      if (link.dataset.page === pageName) {

        link.classList.add("active");

      }

    });


    /* Update header */

    pageTitle.textContent =
      pageNames[pageName] || "Dashboard";


    /* Update URL */

    history.replaceState(
      null,
      "",
      "#" + pageName
    );


    /* Close mobile menu */

    closeSidebar();


    /* Scroll top */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    /* Refresh AOS */

    setTimeout(() => {

      AOS.refresh();

    }, 100);

  }


  /* ================= SIDEBAR CLICK ================= */

  links.forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      const pageName = link.dataset.page;

      showPage(pageName);

    });

  });


  /* ================= DASHBOARD INTERNAL LINKS ================= */

  document.querySelectorAll("[data-page]").forEach(element => {

    element.addEventListener("click", event => {

      if (
        element.classList.contains("sidebar-link")
      ) {
        return;
      }

      const pageName = element.dataset.page;

      if (pageName) {

        event.preventDefault();

        showPage(pageName);

      }

    });

  });


  /* ================= URL HASH ================= */

  const currentHash =
    window.location.hash.replace("#", "");


  if (
    currentHash &&
    pageNames[currentHash]
  ) {

    showPage(currentHash);

  } else {

    showPage("dashboard");

  }


  /* ================= GSAP ================= */

  if (typeof gsap !== "undefined") {

    const timeline = gsap.timeline();


    timeline.from(".sidebar", {

      x: -30,

      opacity: 0,

      duration: 0.6,

      ease: "power3.out"

    });


    timeline.from(".dashboard-header", {

      y: -20,

      opacity: 0,

      duration: 0.5,

      ease: "power3.out"

    }, "-=0.3");


    timeline.from(".stat-card", {

      y: 30,

      opacity: 0,

      duration: 0.5,

      stagger: 0.1,

      ease: "power3.out"

    }, "-=0.2");


    /* Number animation */

    gsap.from(".stat-number", {

      scale: 0.8,

      opacity: 0,

      duration: 0.7,

      delay: 0.5,

      stagger: 0.12,

      ease: "back.out(1.7)"

    });

  }


  /* ================= PROGRESS ANIMATION ================= */

  if (typeof gsap !== "undefined") {

    gsap.from(".progress-bar span", {

      scaleX: 0,

      transformOrigin: "left center",

      duration: 1.2,

      delay: 0.8,

      stagger: 0.15,

      ease: "power3.out"

    });

  }


  /* ================= NOTIFICATION ================= */

  const notification =
    document.querySelector(".notification");


  if (notification) {

    notification.addEventListener("click", () => {

      alert("You have 8 new notifications.");

    });

  }


  /* ================= SEARCH ================= */

  const searchButton =
    document.querySelector(".header-icon");


  if (searchButton) {

    searchButton.addEventListener("click", () => {

      alert("Search functionality can be connected here.");

    });

  }


  /* ================= ESC KEY ================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeSidebar();

    }

  });

});