import css from "../css/app.css";

import "particles.js/particles";

import {
    dropHeightAnimation,
    horizontalBounceEffect,
    scaleTextAnimation,
    scrollToggle,
    slideJoinAnimation,
} from "./gsap_animation";

let logo = document.querySelector(".logo");
window.onload = () => {
    document.body.style.overflow = "hidden";
    logo?.classList.add("animate");

    setTimeout(() => {
        logo.style.display = "none";
        document.body.style.overflow = "";
        const particlesJS = window.particlesJS;
        // Load the particles.js library with a JSON configuration file
        // and pass a callback function to log a message when the configuration has loaded
        particlesJS.load("particles-js", "../assets/particles.json");

        const toggleSidebar = (ham) => {
            let sidebar = document.querySelector(".sidebar");
            ham.classList.toggle("menu-hamberger");
            sidebar.classList.toggle("show-sidebar");
            document.body.classList.toggle("overlay");
        };
        const handleSidebar = () => {
            let nav = document.querySelector(".fixed-nav");

            let hamberger = nav.querySelector(".ham");
            let sidebar = nav.querySelector(".sidebar");
            /**
             * toggle hamberger menu
             */

            hamberger?.addEventListener("click", (el) => {
                toggleSidebar(hamberger);
            });
            document.addEventListener("click", function (event) {
                if (!sidebar.classList.contains("show-sidebar")) {
                    return;
                }
                if (event.target.closest(".show-sidebar")) {
                    if (event.target.closest(".show-sidebar ul li")) {
                        toggleSidebar(hamberger);
                    }
                    return;
                }

                if (event.target.closest(".ham")) {
                    toggleSidebar(hamberger);
                }
                toggleSidebar(hamberger);
            });
        };

        handleSidebar();

        // Full-stack animation
        const fullStack = document.querySelector(
            '.slide-bg span[text-data="scale-text"]'
        );
        scaleTextAnimation(fullStack);

        // Select the element with class "slide-bg" inside an element with class "profession"
        const profession = document.querySelector(".profession .slide-bg");
        horizontalBounceEffect(profession, 0, 250);

        // This animation is used for name
        const userName = document.querySelector(".name");
        slideJoinAnimation(userName);

        // Animation used for Titles
        const textEls = document.querySelectorAll(
            '[text-data="scale-text"]:not(.slide-bg > span[text-data="scale-text"])'
        );
        textEls.forEach((elem) => {
            scaleTextAnimation(elem, 8, true, 100);
        });

        const aboutSection = document.querySelector(".about-section");
        const workSections = document.querySelectorAll(".about-work > .sect");
        dropHeightAnimation(workSections, aboutSection);

        // // Tech section animation
        let techHolder = document.querySelector(".tech-holder");
        scrollToggle(techHolder, "active");

        /**
         * To all the element that is having attribute mouse-effect-data="rubber-band"
         * Add mouseover effect and mouseout effect
         */
        document
            .querySelectorAll('[mouse-effect-data="rubber-band"]')
            .forEach((el) => {
                el.addEventListener("mouseover", (e) => {
                    if (e.target.closest(".char")) {
                        e.target.classList.add("rubber-band");
                        e.target.classList.add("white");
                    }
                });
                el.addEventListener("mouseout", (e) => {
                    setTimeout(() => {
                        e.target.classList.remove("rubber-band");
                        e.target.classList.remove("white");
                    }, 500);
                });
            });

        // Events
        let navLogo = document.querySelector(".nav-logo");
        navLogo?.addEventListener("mouseover", (e) => {
            e.preventDefault();
            if (!navLogo?.classList.contains("logo-animated")) {
                navLogo?.classList.add("logo-animated");
            }
            return;
        });

        navLogo?.addEventListener("mouseout", (e) => {
            e.preventDefault();
            if (!navLogo?.classList.contains("logo-animated")) {
                return;
            }
            setTimeout(() => {
                navLogo?.classList.remove("logo-animated");
            }, 1000);
        });
    }, 1100);
};
