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

function page1Animation() {
    gsap.to("#page1 video", {
        filter: "blur(20px)",
        transform: "scaleX(0.85)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            // markers: true,
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

    document.querySelector("#nav i").addEventListener("mouseenter", function () {
        gsap.to("#cursor", {
            scale: 2,
            backgroundColor: "black",
            mixBlendMode: "darken"
        })
        gsap.to("#nav i", {
            color: "white"
        })
        gsap.to("#nav", {
            mixBlendMode: "normal"
        })
    })
    document.querySelector("#nav i").addEventListener("mouseleave", function () {
        gsap.to("#cursor", {
            scale: 1,
            backgroundColor: "white",
            mixBlendMode: "difference"
        })
        gsap.to("#nav i", {
            color: "white"
        })
        gsap.to("#nav", {
            mixBlendMode: "difference"
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


function page3Animation() {

    gsap.to("#page2 img", {
        transform: "translateY(-50%) translateX(69%)",
        duration: 10,
        repeat: -1,
        ease: "none"
    })
    


    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3-content-1 h2",
            scroller: "#main",
            start: "top 50%",
            end: "top -10%",
            scrub: 2
        }
    })

    tl2.from("#page3-content-1 h2", {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 0.8
    })
    tl2.from("#page3-content-1 p", {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 0.8

    })
    tl2.from("#page3-content-1 button", {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 0.8

    })
    tl2.from("#page3-content-2 h5", {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 0.8

    })
    tl2.from("#page3-content-2 video", {
        y: 50,
        scale: 1.15,
        opacity: 0,
        duration: 0.8

    })
}

page3Animation()


function page4page5Animation() {

    var tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 0",
            end: "top -70%",
            scrub: 3,
            pin: true
        }
    })
    tl4.to("#page4-content", {
        transform: "translateX(-50%)",
    }, "okay")
    tl4.to("#page4 #slider-in", {
        x: 650,
    }, "okay")


    document.querySelector("#page5").addEventListener("mousemove", function (dets) {
        document.querySelector("#page5").style.background = `conic-gradient(at ${dets.x}px ${dets.y}px,rgb(255, 228, 233),aliceblue,rgb(205, 243, 255),rgb(195, 255, 195),lightyellow,rgb(251, 226, 230))`
    })
}

page4page5Animation()



var text = "We are brain.space     The brain data company"


var splittedText = text.split("")

var clutter = ""

splittedText.forEach(function(elem){
    clutter += `<span>${elem}</span>`
})

var h1Text = document.querySelector("#page1 h1")
h1Text.innerHTML = clutter

gsap.to("#page1 h1 span",{
    display:"initial",
    stagger:0.1
})
