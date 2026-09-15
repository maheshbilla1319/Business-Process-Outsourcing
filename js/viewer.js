document.addEventListener("DOMContentLoaded", () => {

    /* ================= AOS ================= */

    AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
    });


    /* ================= ELEMENTS ================= */

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const pages =
        document.querySelectorAll(".page");

    const pageTitle =
        document.getElementById("pageTitle");


    /* ================= PAGE NAMES ================= */

    const pageNames = {

        overview: "Overview",

        customers: "Customers",

        services: "Services",

        reports: "Reports",

        messages: "Messages",

        team: "Team"

    };


    /* ================= MOBILE MENU ================= */

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


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    /* ================= SHOW PAGE ================= */

    function showPage(pageName) {

        pages.forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


        const selectedPage =
            document.getElementById(pageName);


        if (selectedPage) {

            selectedPage.classList.add(
                "active-page"
            );

        }


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.dataset.page === pageName
            ) {

                link.classList.add("active");

            }

        });


        pageTitle.textContent =
            pageNames[pageName] ||
            "Overview";


        history.replaceState(
            null,
            "",
            "#" + pageName
        );


        closeSidebar();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        setTimeout(() => {

            AOS.refresh();

        }, 100);

    }


    /* ================= NAVIGATION ================= */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showPage(
                    link.dataset.page
                );

            }
        );

    });


    /* ================= INTERNAL LINKS ================= */

    document
        .querySelectorAll("[data-page]")
        .forEach(element => {

            element.addEventListener(
                "click",
                event => {

                    if (
                        element.classList.contains(
                            "nav-link"
                        )
                    ) {
                        return;
                    }


                    const pageName =
                        element.dataset.page;


                    if (pageName) {

                        event.preventDefault();

                        showPage(pageName);

                    }

                }
            );

        });


    /* ================= HASH ================= */

    const hash =
        window.location.hash.replace(
            "#",
            ""
        );


    if (pageNames[hash]) {

        showPage(hash);

    } else {

        showPage("overview");

    }


    /* ================= GSAP ================= */

    if (typeof gsap !== "undefined") {

        const timeline =
            gsap.timeline();


        timeline.from(".sidebar", {

            x: -25,

            opacity: 0,

            duration: 0.6,

            ease: "power3.out"

        });


        timeline.from(
            ".dashboard-header",
            {

                y: -15,

                opacity: 0,

                duration: 0.5,

                ease: "power3.out"

            },
            "-=0.3"
        );


        timeline.from(
            ".stat-card",
            {

                y: 25,

                opacity: 0,

                duration: 0.5,

                stagger: 0.1,

                ease: "power3.out"

            },
            "-=0.2"
        );


        /* Progress */

        gsap.from(
            ".progress span",
            {

                scaleX: 0,

                transformOrigin:
                    "left center",

                duration: 1.1,

                delay: 0.7,

                stagger: 0.15,

                ease: "power3.out"

            }
        );


        /* Stat numbers */

        gsap.from(
            ".stat-card strong",
            {

                scale: 0.8,

                opacity: 0,

                duration: 0.7,

                delay: 0.5,

                stagger: 0.1,

                ease: "back.out(1.7)"

            }
        );

    }


    /* ================= ESC ================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );

});