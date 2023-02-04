// Load the particles.js library with a JSON configuration file
// and pass a callback function to log a message when the configuration has loaded
particlesJS.load("particles-js", "assets/particles.json", function () {
    console.log("callback - particles.js config loaded");
});

// Register the ScrollTrigger plugin from GSAP
gsap.registerPlugin(ScrollTrigger);

const toggleSidebar = (ham) => {
    let sidebar = document.querySelector(".sidebar");
    ham.classList.toggle("menu-hamberger");
    sidebar.classList.toggle("show-sidebar");
    document.body.classList.toggle("overlay");
};
let nav = document.querySelector(".fixed-nav");
const handleSidebar = (nav) => {
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
            return;
        }

        if (event.target.closest(".ham")) toggleSidebar(hamberger);
        console.log("test1");

        toggleSidebar(hamberger);
    });
};

handleSidebar(nav);
/**
 * Background bounce effect
 * 1. We select background element of the text
 * 2. Set min width of background element
 * 3. From 0 width go to 290
 */
// Select the element with class "slide-bg" inside an element with class "profession"
const profession = document.querySelector(".profession .slide-bg");

// Set the minimum width of the selected element to 290px
gsap.set(profession, { width: 250 });

// Animate the selected element with GSAP
gsap.from(profession, {
    // Start the animation with the minimum width set to 0px
    width: 0,
    // Use the Bounce.easeOut easing function
    ease: "Bounce.easeOut",
    // Set the duration of the animation to 1 second
    duration: 1,
    // Uncomment the scrollTrigger block to trigger the animation when the textEl element is scrolled to the bottom 90%
    // scrollTrigger: {
    //     trigger: textEl,
    //     start: "bottom 90%",
    // },
});

// Select the span element inside the profession element
const text = profession?.querySelector("span");

// Split the text of the span element into individual characters
const chars = new SplitType(text, { type: "chars" });

// Set the opacity and display style of each character in the text
gsap.set(chars.chars, {
    // Set the opacity of each character to 1
    autoAlpha: 1,
    // Set the display style of each character to "inline-block"
    display: "inline-block",
});

// Animate each character in the text
gsap.from(chars.chars, {
    // Start the animation with the opacity of each character set to 0
    autoAlpha: 0,
    // Start the animation with the display style of each character set to "none"
    display: "none",
    // Start the animation with each character scaled up by a factor of 5
    scale: 5,
    // Stagger the animation of each character by 0.1 seconds
    stagger: 0.1,
    // Use the "expo.out" easing function
    ease: "expo.out",
    // Delay the start of the animation by 1.5 seconds
    delay: 1.5,
});

/**
 * Slide text animation
 */

// Define a function that takes an element as an argument
const slideJoinAnimation = (elem) => {
    // Create a new instance of SplitType and store it in a variable called "word"
    const word = new SplitType(elem, { types: "words" });

    // Use GSAP to animate the first word in the "word" instance
    // Start the animation from the left side of the screen with a position of -2000
    // Apply the "Bounce.easeOut" easing function to the animation
    // Set the duration of the animation to 1 second
    gsap.from(word.words[0], {
        left: -2000,
        ease: "Bounce.easeOut",
        duration: 1,
    });

    // Use GSAP to animate the second word in the "word" instance
    // Start the animation from the right side of the screen with a position of 2000
    // Apply the "Bounce.easeOut" easing function to the animation
    // Set the duration of the animation to 1 second
    gsap.from(word.words[1], {
        left: 2000,
        ease: "Bounce.easeOut",
        duration: 1,
    });
};

const userName = document.querySelector(".name");
slideJoinAnimation(userName);

/**
 * It will give the same effect as the first scale animation
 * The only defirence is that it will take effect only at given scroll position
 */
// 2 second of background is completed now add all text with Scale animation
const textEls = document.querySelectorAll('[text-data="scale-text"');

textEls.forEach((textEl) => {
    const splitType = new SplitType(textEl, { type: "chars" });
    gsap.set(textEl, { autoAlpha: 1 });
    gsap.from(splitType.chars, {
        autoAlpha: 0,
        scale: 8,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
            trigger: textEl,
            start: "bottom 90%",
        },
    });
    setTimeout(() => {
        rubberBandAnimation(splitType.chars, 100);
    }, 100);
});
/**
 * Create rubber band animation for each element
 */
const rubberBandAnimation = (elements, delayPlus = 200) => {
    let animationDelay = 1;
    elements.forEach((el) => {
        // add each element animation duration

        setTimeout(() => {
            el.classList.add("rubber-band");
        }, animationDelay);

        animationDelay += delayPlus;

        setTimeout(() => {
            el.classList.remove("rubber-band");
        }, animationDelay + 500);
    });
};

// const introBgSlide = document.querySelector("slide-bg");

const aboutSection = document.querySelector(".about-section");
const workSections = document.querySelectorAll(".about-work > .sect");
workSections.forEach((el) => {
    gsap.from(el, {
        height: 10,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
        },
    });
});

// // Tech section animation
let techHolder = document.querySelector(".tech-holder");
gsap.from(techHolder, {
    scrollTrigger: {
        trigger: techHolder,
        start: "top 70%",
        toggleClass: "active",
    },
});


/**
 *
 */

/**
 * To all the element that is having attribute mouse-effect-data="rubber-band"
 * Add mouseover effect and mouseout effect
 */
document
    .querySelectorAll('[mouse-effect-data="rubber-band"] .char')
    .forEach((el) => {
        el.addEventListener("mouseover", (e) => {
            el?.classList.add("rubber-band");
            el.classList.add("white");
        });
        el.addEventListener("mouseout", (e) => {
            setTimeout(() => {
                el.classList.remove("rubber-band");
                el.classList.remove("white");
            }, 500);
        });
    });
