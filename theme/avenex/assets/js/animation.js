var scrollShow = $('.wrapper');

if(scrollShow.length){
    window.onload = function() {

        if (ScrollTrigger.isTouch !== 1) {

            gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

            ScrollSmoother.create({
                wrapper: '.wrapper',
                content: '.content',
                smooth: 1.5,
                effects: true
            });

            gsap.fromTo(".an_bar",{opacity: 0}, {
                opacity: 1,
                duration: 0.3,
                delay: 3,
                scrollTrigger: {
                    trigger: ".an_bar",
                    start: '-850',
                    scrub: false
                },
            });

        }

    };
}