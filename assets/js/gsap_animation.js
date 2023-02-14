import gsap from "gsap";
import { Elastic } from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register the ScrollTrigger plugin from GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Background bounce effect
 * 1. We select background element of the text
 * 2. Set min width of background element
 * 3. From 0 width go to 290
 */
export const horizontalBounceEffect = (ele, fromWidth, toWidth) => {
    // Set the minimum width of the selected element to 290px
    gsap.set(profession, { width: toWidth });

    // Animate the selected element with GSAP
    gsap.from(profession, {
        // Start the animation with the minimum width set to 0px
        width: fromWidth,
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
};

export const elasticAnimation = (element) => {
    let splitElement = new SplitType(element, { types: "words, chars" });
    // let elements = element.querSelectorAll(".chars");
    gsap.set(element, { perspective: 400 });

    gsap.from(splitElement.chars, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        ease: "back",
        stagger: 0.02,
        scrollTrigger: {
            trigger: element,
            start: "bottom 90%",
        },
    });
};

export const revealTextAnimation = (text) => {
    let splitText = new SplitType(text, { types: "lines" });
    gsap.set(text, { perspective: 400 });
    gsap.from(splitText.lines, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        ease: "back",
        stagger: 0.1,
        scrollTrigger: {
            trigger: text,
            start: "bottom 90%",
        },
        // onComplete: allDone,
    });
};

export const scaleTextAnimation = (
    element,
    scale = 8,
    endBounce = false,
    bounceDelay = 100,
    visibilityDelay = 900
) => {
    visibilityDelay = visibilityDelay / 1000; // change miliseconds for gsap
    gsap.set(element, { visibility: "visible", delay: visibilityDelay });
    setTimeout(() => {
        const splitType = new SplitType(element);
        gsap.set(element, { autoAlpha: 1 });
        gsap.from(splitType.chars, {
            autoAlpha: 0,
            scale: scale,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
                trigger: element,
                start: "bottom 90%",
            },
        });
        if (endBounce) {
            setTimeout(() => {
                rubberBandAnimation(splitType.chars, 100);
            }, bounceDelay);
        }
    }, visibilityDelay);
};

export const rubberBandAnimation = (elements, delayPlus = 200) => {
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

export const scrollToggle = (elem, cls, position = "top 70%") => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: position,
            toggleClass: cls,
        },
    });
};

export const dropHeightAnimation = (elements, triggerElement) => {
    elements.forEach((el) => {
        gsap.from(el, {
            height: 10,
            stagger: 0.1,
            ease: "expo.out",
            delay: 0.5,
            scrollTrigger: {
                trigger: triggerElement,
                start: "top 50%",
            },
        });
    });
};

// Select the element with class "slide-bg" inside an element with class "profession"
let profession = document.querySelector(".profession .slide-bg");

// Select the span element inside the profession element
let text = profession?.querySelector("span");

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
 * Join Name text animation
 */

// Define a function that takes an element as an argument
export const slideJoinAnimation = (elem) => {
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
