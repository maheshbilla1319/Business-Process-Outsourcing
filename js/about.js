/* =====================================================
   STACKLY WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", function () {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

    }, 700);

});


/* =====================================================
   AOS INITIALIZATION
===================================================== */

AOS.init({

    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 50

});


/* =====================================================
   HEADER SCROLL
===================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");

let menuOpen = false;


menuToggle.addEventListener("click", () => {

    menuOpen = !menuOpen;

    if (menuOpen) {

        navMenu.style.display = "flex";
        navActions.style.display = "flex";

        navMenu.style.position = "absolute";
        navMenu.style.top = "82px";
        navMenu.style.left = "0";
        navMenu.style.width = "100%";
        navMenu.style.padding = "30px";
        navMenu.style.background = "#07343D";
        navMenu.style.flexDirection = "column";
        navMenu.style.alignItems = "flex-start";

        navActions.style.position = "absolute";
        navActions.style.top = "350px";
        navActions.style.left = "0";
        navActions.style.width = "100%";
        navActions.style.padding = "20px 30px 30px";
        navActions.style.background = "#07343D";

    } else {

        navMenu.style.display = "";
        navActions.style.display = "";

    }

});


/* =====================================================
   MOBILE NAV CLOSE
===================================================== */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {

            navMenu.style.display = "";
            navActions.style.display = "";

            menuOpen = false;

        }

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let value = 0;

            const duration = 1800;
            const startTime = performance.now();


            function updateCounter(currentTime) {

                const progress =
                    Math.min((currentTime - startTime) / duration, 1);

                const eased =
                    1 - Math.pow(1 - progress, 3);

                value = Math.floor(target * eased);

                counter.textContent =
                    value.toLocaleString();


                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }


            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: 0.6
    }

);


counters.forEach(counter => {

    counterObserver.observe(counter);

});
/* =====================================================
   MOBILE MENU TOGGLE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) return;

    /* OPEN / CLOSE MENU */
    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        navMenu.classList.toggle("open");
        menuToggle.classList.toggle("active");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });


    /* CLOSE MENU AFTER CLICKING LINK */
    const navLinks = navMenu.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });

    });


    /* CLOSE WHEN CLICKING OUTSIDE */
    document.addEventListener("click", function (event) {

        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* CLOSE ON ESCAPE */
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* CLOSE WHEN RESIZING TO DESKTOP */
    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});