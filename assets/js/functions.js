let scroll;

$(".main-banner").mousemove(function(e) {
    parallaxIt(e, ".bg-effect", -100);
    parallaxIt(e, ".bg-img", 100);
    parallaxIt(e, ".character-img", 20);
});

function parallaxIt(e, target, movement) {
    var $this = $(".main-banner");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
        x: (relX - $this.width() / 2) / $this.width() * movement,
        y: (relY - $this.height() / 2) / $this.height() * movement
    });
}

function nftSlider() {
    $('.nft-slider-js').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

function roadmapSlider() {
    $('.roadmapSlider-js').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

$('.tab-filter a').click(function(){
    $('.tab-filter a').removeClass('active');
    $(this).addClass('active');
    var tagid = $(this).data('tag');
    $('.tab-pane').removeClass('active').addClass('hide');
    $('#'+tagid).addClass('active').removeClass('hide');
    scroll.update()
});

$('.chartfunc').hover(function(){
    var chartId = $(this).data('tag');
    $('.chart-tab .chart-pane').removeClass('active').addClass('hide');
    $('#'+chartId).addClass('active').removeClass('hide');
}, function(){
    $('.chart-tab .chart-pane').removeClass('active').addClass('hide');
});

function locomotiveInitialze() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('main'),
        smooth: true
    });

    scroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) :    scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });

    var videoanimate = gsap.timeline()
        .fromTo(".video-thumb", {scale: 1.5}, {scale: 1})
        .fromTo(".video-box", {scale: 1.5}, {scale: 1})
        ScrollTrigger.create({
            trigger:".video-sec",
            pin:true,
            start: "center center",
            end:"+=500",
            scroller:"main",
            animation: videoanimate,
            scrub:true,
            //markers: true,
        })


    var workList = gsap.timeline({paused: true})
        .fromTo(".work-list-line", 10,{width: '0%'}, {width: '90%'}, 0.5)
        .staggerFromTo(".single-list", 2, {y: 60, autoAlpha:0}, {y: 0, autoAlpha:1}, 1)
        ScrollTrigger.create({
            trigger:".list-trigger",
            pin:true,
            start: "center center",
            end:"+=250",
            scroller:"main",
            animation: workList,
            scrub:true,
            //markers: true,
        });

    gsap.set(".scroll-text", {x: 0, y: 0});
    var scrollText = gsap.timeline()
        .staggerFromTo(".scroll-text", 2, {y: 0, x: 0}, {y: '13.75rem', x: '-31.25rem'}, 1)
    ScrollTrigger.create({
        trigger:".scroll-text",
        pin:true,
        pinSpacing: false,
        start: "bottom right",
        end:"+=800",
        scroller:"main",
        animation: scrollText,
        scrub:true,
        //markers: true,
    });


    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    // ScrollTrigger.refresh();

    scroll.on('scroll', (args) => {
        //console.log(args)
        var scrollPos = args.scroll.y;
        //$('header').addClass('scrollsticky');

        if (scrollPos > 50) {
            $('header').addClass('sticky');
        } else {
            $('header').removeClass('sticky');
        }
    });
}

function animateElements() {
    if ($('.animate').length > 0) {
        $('.animate').bind('inview', function (event, isInView) {
            if (isInView && !$("body").hasClass("dont-animate")) {
                var animate = $(this).attr('data-animation');
                var speedDuration = $(this).attr('data-duration');
                var $t = $(this);
                setTimeout(function () {
                    $t.addClass(animate + ' animated');
                }, speedDuration);
            }
        });
    }

}

$(document).ready(function() {
    nftSlider();
    roadmapSlider();
    setInterval(function(){
        scroll.update()
    }, 5000);
});

$( window ).on("load", function() {

    var loaderwrapper = gsap.timeline({paused: true});
    loaderwrapper.fromTo(".loader-effect-01", {y: 0}, {y: -2000, ease: "expo.out", duration: 1.5})
    loaderwrapper.fromTo(".loader-effect-02", {y: 0}, {y: -2000, ease: "expo.out", duration: 1})
    loaderwrapper.fromTo(".loader-wrapper", {y: 0}, {y: -2000, ease: "expo.out", duration: 0.5})
    loaderwrapper.play().then(function () {
        animateElements()
        locomotiveInitialze();
    });

});
