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
        x: lerp(-150, val.width + 150, xVal),
        y: lerp(-100, val.height + 100, yVal),
        duration: .3,
        ease: Power4,
    })

})



window.addEventListener("mouseleave", function (dets) {

})

