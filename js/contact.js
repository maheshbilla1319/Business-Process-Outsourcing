/* =====================================================
   STACKLY BPO WEBSITE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.classList.add("hide");

                setTimeout(function () {
                    preloader.style.display = "none";
                }, 500);

            }, 700);

        });

    }


    /* =================================================
       AOS INITIALIZATION
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            delay: 50
        });

    }


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const header = document.querySelector(".header");

    function headerScroll() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        headerScroll,
        { passive: true }
    );

    headerScroll();


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileNavigation =
        document.querySelector(".mobile-navigation");


    if (menuToggle && mobileNavigation) {


        function openMenu() {

            mobileNavigation.classList.add("open");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

            document.body.classList.add(
                "mobile-menu-open"
            );

        }


        function closeMenu() {

            mobileNavigation.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            document.body.classList.remove(
                "mobile-menu-open"
            );

        }


        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    mobileNavigation.classList.contains(
                        "open"
                    )
                ) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );


        /* ---------------------------------------------
           MOBILE LINKS
        --------------------------------------------- */

        const mobileLinks =
            mobileNavigation.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {
                    closeMenu();
                }
            );

        });


        /* ---------------------------------------------
           CLICK OUTSIDE
        --------------------------------------------- */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mobileNavigation.classList.contains(
                        "open"
                    )
                ) {
                    return;
                }

                const insideMenu =
                    mobileNavigation.contains(
                        event.target
                    );

                const insideButton =
                    menuToggle.contains(
                        event.target
                    );

                if (!insideMenu && !insideButton) {
                    closeMenu();
                }

            }
        );


        /* ---------------------------------------------
           ESC KEY
        --------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );


        /* ---------------------------------------------
           DESKTOP RESIZE
        --------------------------------------------- */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {
                    closeMenu();
                }

            }
        );

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    const allNavigationLinks =
        document.querySelectorAll(
            ".nav-link, .mobile-nav-link"
        );


    allNavigationLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (!href) return;


        if (
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .toLowerCase();


        if (linkPage === currentPage) {

            link.classList.add("active");


            if (
                link.classList.contains("nav-link")
            ) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        } else {

            link.classList.remove("active");


            if (
                link.classList.contains("nav-link")
            ) {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }

    });


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {


        const counterObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            Number(
                                counter.dataset.target
                            );


                        if (
                            Number.isNaN(target) ||
                            target < 0
                        ) {

                            observer.unobserve(
                                counter
                            );

                            return;

                        }


                        const duration = 1800;

                        const startTime =
                            performance.now();


                        function updateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) / duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const value =
                                Math.floor(
                                    target * eased
                                );


                            counter.textContent =
                                value.toLocaleString();


                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    target.toLocaleString();

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        observer.unobserve(
                            counter
                        );

                    });

                },

                {
                    threshold: 0.6
                }

            );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });


    } else {


        /* ---------------------------------------------
           COUNTER FALLBACK
        --------------------------------------------- */

        counters.forEach(function (counter) {

            const target =
                Number(
                    counter.dataset.target
                );


            if (!Number.isNaN(target)) {

                counter.textContent =
                    target.toLocaleString();

            }

        });

    }


    /* =================================================
       ENQUIRY FORM
       VALIDATION → REDIRECT 404
    ================================================= */

    const enquiryForm =
        document.querySelector(".enquiry-form");


    if (enquiryForm) {


        enquiryForm.addEventListener(
            "submit",
            function (event) {

                /*
                 * IMPORTANT:
                 * Browser HTML validation runs first.
                 *
                 * If required fields are empty
                 * or email is invalid,
                 * this submit event will NOT
                 * continue to redirect.
                 */


                if (!enquiryForm.checkValidity()) {

                    event.preventDefault();

                    /*
                     * Show browser's native
                     * validation message.
                     */

                    enquiryForm.reportValidity();

                    return;

                }


                /*
                 * All required fields are valid.
                 * Stop normal form submission.
                 */

                event.preventDefault();


                /*
                 * Redirect to 404 page.
                 */

                window.location.href =
                    "404.html";

            }
        );

    }


    /* =================================================
       CONTACT LINKS
       CLOSE MOBILE MENU
    ================================================= */

    const contactLinks =
        document.querySelectorAll(
            'a[href="contact.html"]'
        );


    contactLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (mobileNavigation) {

                    mobileNavigation.classList.remove(
                        "open"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }


                document.body.classList.remove(
                    "mobile-menu-open"
                );

            }
        );

    });


    /* =================================================
       GSAP ANIMATION
    ================================================= */

    if (typeof gsap !== "undefined") {


        /* ---------------------------------------------
           ABOUT HERO CONTENT
        --------------------------------------------- */

        const aboutHeroContent =
            document.querySelector(
                ".about-hero-content"
            );


        if (aboutHeroContent) {

            gsap.from(
                aboutHeroContent,
                {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.3
                }
            );

        }


        /* ---------------------------------------------
           ABOUT HERO IMAGE
        --------------------------------------------- */

        const aboutHeroImage =
            document.querySelector(
                ".about-hero-image"
            );


        if (aboutHeroImage) {

            gsap.from(
                aboutHeroImage,
                {
                    opacity: 0,
                    x: 40,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.45
                }
            );

        }

    }

});