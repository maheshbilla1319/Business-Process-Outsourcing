/* =====================================================
   STACKLY WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", function () {

    const preloader = document.querySelector(".preloader");

    if (!preloader) {
        return;
    }

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

    }, 700);

});


/* =====================================================
   AOS INITIALIZATION
===================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        delay: 50
    });

}


/* =====================================================
   HEADER SCROLL
===================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) {
        return;
    }

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const navMenu =
    document.querySelector(".nav-menu");

const navActions =
    document.querySelector(".nav-actions");

let menuOpen = false;


if (menuToggle && navMenu && navActions) {

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
            navActions.style.padding =
                "20px 30px 30px";
            navActions.style.background = "#07343D";

        } else {

            navMenu.style.display = "";
            navActions.style.display = "";

        }

    });

}


/* =====================================================
   MOBILE NAV CLOSE
===================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth <= 900 &&
                navMenu &&
                navActions
            ) {

                navMenu.style.display = "";
                navActions.style.display = "";

                menuOpen = false;

            }

        });

    });


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(".counter");


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.target
                        );


                    let value = 0;

                    const duration = 1800;

                    const startTime =
                        performance.now();


                    function updateCounter(
                        currentTime
                    ) {

                        const progress =
                            Math.min(
                                (currentTime -
                                    startTime) /
                                    duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        value =
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


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.6
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =====================================================
   GSAP HERO ANIMATION
===================================================== */

window.addEventListener("load", () => {

    if (typeof gsap === "undefined") {
        return;
    }


    const heroTimeline =
        gsap.timeline({

            defaults: {
                ease: "power3.out"
            }

        });


    heroTimeline

        .from(".hero-content .eyebrow", {

            y: 25,
            opacity: 0,
            duration: 0.6

        })

        .from(".hero-content h1", {

            y: 50,
            opacity: 0,
            duration: 0.9

        }, "-=0.3")

        .from(".hero-description", {

            y: 30,
            opacity: 0,
            duration: 0.7

        }, "-=0.4")

        .from(".hero-buttons", {

            y: 25,
            opacity: 0,
            duration: 0.6

        }, "-=0.3")

        .from(".hero-image", {

            scale: 0.92,
            opacity: 0,
            duration: 1

        }, "-=0.7")

        .from(".floating-card", {

            scale: 0.7,
            opacity: 0,
            stagger: 0.2,
            duration: 0.7

        }, "-=0.5");

});


/* =====================================================
   GSAP FLOATING CARDS
===================================================== */

if (typeof gsap !== "undefined") {


    if (
        document.querySelector(".card-location")
    ) {

        gsap.to(".card-location", {

            y: -8,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"

        });

    }


    if (
        document.querySelector(".card-users")
    ) {

        gsap.to(".card-users", {

            y: 8,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"

        });

    }

}


/* =====================================================
   IMAGE PARALLAX
===================================================== */

window.addEventListener("scroll", () => {

    const heroImage =
        document.querySelector(
            ".hero-image img"
        );


    if (!heroImage) {
        return;
    }


    const scrollValue =
        window.scrollY;


    if (scrollValue < 800) {

        heroImage.style.transform =
            `scale(1.03) translateY(${scrollValue * 0.025}px)`;

    }

});


/* =====================================================
   BUTTON HOVER MAGNETIC EFFECT
===================================================== */

const buttons =
    document.querySelectorAll(".primary-btn");


buttons.forEach(button => {


    button.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            if (typeof gsap !== "undefined") {

                gsap.to(button, {

                    x: x * 0.08,
                    y: y * 0.08,
                    duration: 0.25

                });

            }

        }
    );


    button.addEventListener(
        "mouseleave",
        function () {

            if (typeof gsap !== "undefined") {

                gsap.to(button, {

                    x: 0,
                    y: 0,
                    duration: 0.35

                });

            }

        }
    );

});


/* =====================================================
   SMOOTH ANCHOR SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {


        anchor.addEventListener(
            "click",
            function (event) {


                const targetId =
                    this.getAttribute("href");


                if (targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        );

    });


/* =====================================================
   NEWSLETTER VALIDATION
   SUBMIT → 404.HTML
===================================================== */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


if (newsletterForm) {


    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "footer-email"
                );


            if (!emailInput) {
                return;
            }


            const emailValue =
                emailInput.value.trim();


            /* =========================================
               EMAIL PATTERN
            ========================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            /* =========================================
               EMPTY EMAIL
            ========================================= */

            if (emailValue === "") {

                emailInput.focus();

                emailInput.setCustomValidity(
                    "Please enter your email address."
                );

                emailInput.reportValidity();

                return;

            }


            /* =========================================
               INVALID EMAIL
            ========================================= */

            if (
                !emailPattern.test(
                    emailValue
                )
            ) {

                emailInput.focus();

                emailInput.setCustomValidity(
                    "Please enter a valid email address."
                );

                emailInput.reportValidity();

                return;

            }


            /* =========================================
               CLEAR VALIDATION
            ========================================= */

            emailInput.setCustomValidity("");


            /* =========================================
               SUBMIT BUTTON
            ========================================= */

            const submitButton =
                newsletterForm.querySelector(
                    "button[type='submit']"
                );


            if (submitButton) {

                submitButton.disabled = true;


                const buttonText =
                    submitButton.querySelector(
                        "span"
                    );


                if (buttonText) {

                    buttonText.textContent =
                        "Submitting...";

                }

            }


            /* =========================================
               REDIRECT TO 404
            ========================================= */

            setTimeout(function () {

                window.location.href =
                    "404.html";

            }, 700);

        }
    );


    /* =========================================
       CLEAR VALIDATION WHILE TYPING
    ========================================= */

    const emailInput =
        document.getElementById(
            "footer-email"
        );


    if (emailInput) {

        emailInput.addEventListener(
            "input",
            function () {

                emailInput.setCustomValidity("");

            }
        );

    }

}