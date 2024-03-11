(function ($) {
    'use strict';
    // mainSlider
    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find(
                '[data-animation]'
            );
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on(
            'beforeChange',
            function (e, slick, currentSlide, nextSlide) {
                var $animatingElements = $(
                    '.single-slider[data-slick-index="' + nextSlide + '"]'
                ).find('[data-animation]');
                doAnimations($animatingElements);
            }
        );
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow:
                '<button type="button" class="slick-prev"><i class="icon dripicons-chevron-left"></i></button>',
            nextArrow:
                '<button type="button" class="slick-next"><i class="icon dripicons-chevron-right"></i></button>',
            responsive: [
                { breakpoint: 1200, settings: { dots: false, arrows: false } },
            ],
        });

        function doAnimations(elements) {
            var animationEndEvents =
                'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                });
                $this
                    .addClass($animationType)
                    .one(animationEndEvents, function () {
                        $this.removeClass($animationType);
                    });
            });
        }
    }
    mainSlider();
})(jQuery);