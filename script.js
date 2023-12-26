function locomotiveScroller() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveScroller();

function loaderAnimation() {
    var tl = gsap.timeline();

    tl.from(".loader h3", {
        x: 150,
        opacity: 0,
        delay: 1,
        duration: 2,
        stagger: 0.05,
        ease: 'expo.out',
    })
    tl.to(".loader h3", {
        x: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.in',
    })
    tl.to(".loader", {
        opacity: 0,
        duration: 2
    })
    tl.to(".loader", {
        display: "none"
    })
}
loaderAnimation();

function cursorAnimation() {
    const page1 = document.querySelector(".page1");
    const cursor = document.querySelector(".cursor");

    page1.addEventListener("mousemove", function (dets) {

        const lerp = (x, y, a) => x * (1 - a) + y * a;

        var val = page1.getBoundingClientRect();
        var xleft = Math.floor(val.left);
        var xright = Math.floor(val.right);
        var ytop = Math.floor(val.top);
        var ybottom = Math.floor(val.bottom);
        var xVal = gsap.utils.mapRange(xleft, xright, 0, 1, dets.clientX);
        var yVal = gsap.utils.mapRange(ytop, ybottom, 0, 1, dets.clientY);

        gsap.to(cursor, {
            opacity: 1,
            x: lerp(-150, val.width + 150, xVal),
            y: lerp(-100, val.height + 100, yVal),
            duration: .3,
            ease: Power4,
        })

    })

    page1.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })

    page1.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })
};
cursorAnimation();

function mainLettersAnimation() {
    const mainPageletters = document.querySelectorAll(".page1-content h1 span");

    gsap.from(".page1-content h3", {
        x: 100,
        opacity: 0,
        delay: 4,
        duration: 1,
        ease: 'power1'
    })

    gsap.from(mainPageletters, {
        y: 270,
        delay: 4,
        duration: 1,
        ease: 'power1',
        stagger: 0.08
    })
}
mainLettersAnimation();

function page2Animation() {
    var tl = gsap.timeline();
    tl.from(".page2 .upper p", {
        y: 120,
        duration: 0.6,
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 80%",
            end: "top 80%",
            scrub: 1
        }
    }).from(".page2 .content p", {
        y: 120,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 70%",
            end: "top 70%",
            scrub: 1,
        }
    })

    gsap.from(".page2 .line", {
        x: -800,
        duration: 0.1,
        ease: Power4,
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 80%",
            end: "top 80%",
            scrub: 10
        }
    })
}
page2Animation();


function page4Animation() {
    //UPPER TEXT ANIMATION
    var tl = gsap.timeline();
    tl.from(".page4 .upper p", {
        y: 120,
        duration: 0.6,
        scrollTrigger: {
            trigger: ".page4",
            scroller: ".main",
            start: "top 80%",
            end: "top 80%",
            scrub: 1
        }
    }).from(".page4 .content p", {
        y: 120,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".page4",
            scroller: ".main",
            start: "top 70%",
            end: "top 70%",
            scrub: 1,
        }
    })

    gsap.from(".page4 .line", {
        x: -800,
        duration: 0.1,
        ease: Power4,
        scrollTrigger: {
            trigger: ".page4",
            scroller: ".main",
            start: "top 80%",
            end: "top 80%",
            scrub: 10
        }
    });


    //cIRCLE ANIMATION
    const cursorField = document.querySelector(".cursorField");
    const circle = document.querySelector(".circle");

    cursorField.addEventListener("mousemove", function (dets) {

        gsap.to(circle, {
            x: dets.x,
            y: dets.y,
            duration: .3,
            ease: Power4,
        })

    });

    cursorField.addEventListener("mouseenter", function () {
        gsap.to(circle, {
            duration: 0.4,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: Power1,
        })
    })

    cursorField.addEventListener("mouseleave", function () {
        gsap.to(circle, {
            opacity: 0,
            scale: 0,
            rotate: -50,
            ease: Power1,
        })
    })

    //SEAT AVAILABLE ANIMATION
    const seatAvaNum = document.querySelectorAll(".page4 .animation .text h2 span p")

    gsap.to(seatAvaNum, {
        y: "-400%",
        scrollTrigger: {
            trigger: ".page4",
            scroller: ".main",
            start: "top 20%",
            end: "top 20%",
            scrub: 6
        }

    })
}
page4Animation();

function page5Animation() {
    var tl = gsap.timeline();
    tl.from(".page5 .upper p", {
        y: 120,
        duration: 0.6,
        scrollTrigger: {
            trigger: ".page5",
            scroller: ".main",
            start: "top 80%",
            end: "top 80%",
            scrub: 1
        }
    }).from(".page5 .content p", {
        y: 120,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".page5",
            scroller: ".main",
            start: "top 70%",
            end: "top 70%",
            scrub: 1,
        }
    })

    gsap.from(".page5 .line", {
        x: -800,
        duration: 0.1,
        ease: Power4,
        scrollTrigger: {
            trigger: ".page5",
            scroller: ".main",
            start: "top 80%",
            end: "top 80%",
            scrub: 10
        }
    });

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        freeMode: true
    });
}
page5Animation();


function footerAnimation() {
    gsap.from(".footer .upper", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".footer",
            scroller: ".main",
            start: "top 60%",
            end: "bottom 90%",
            scrub: 1
        }
    });

    gsap.from(".footer .lower", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
            trigger: ".footer",
            scroller: ".main",
            start: "top 60%",
            end: "bottom 90%",
            scrub: 1
        }
    });

    gsap.from(".footer-title h1 span", {
        y: -300,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".footer",
            scroller: ".main",
            start: "top 10%",
            end: "bottom 100%",
            scrub: 5
        }

    })
}
footerAnimation();