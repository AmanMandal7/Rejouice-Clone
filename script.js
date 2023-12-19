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
        console.log(xVal);

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





