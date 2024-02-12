function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco()

function page1Animation(){
    gsap.to("video", {
        filter: "blur(20px)",
        transform: "scaleX(0.85)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            markers: true,
            start: "top 0",
            end: "top -50%",
            scrub: true
        }
    })

    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            top: dets.y,
            left: dets.x,
            duration: 1
        })
    })
}

page1Animation()

function navAnimation() {

    gsap.to("#nav-part2", {
        y: -100,
        duration: 1,
        scrollTrigger: {
            trigger: "#nav",
            scroller: "#main",
            start: "top 0",
            end: "top -10%",
            scrub: true
        }
    })

    gsap.to("#nav i", {
        display: "block",
        scrollTrigger: {
            trigger: "#nav",
            scroller: "#main",
            start: "top -15%",
            end: "top -20%",
            scrub: true
        }
    })

}

navAnimation()



gsap.to("#page2 img",{
    transform:"translateY(-50%) translateX(69%)",
    duration:10,
    repeat:-1,
    ease:"none"
})