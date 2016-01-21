(function($) {

    // set jquery scope for ad iframe
    var _$ = $.proxy($.fn.find, $(document)),
        $pulse = _$('.pulse-bb-slides');

    var PulseCarousel = (function() {

        function loadCarousel() {
            $pulse.slick({
                lazyLoad: 'ondemand',
                slidesToShow: 2,
                slidesToScroll: 1
            });
            _$('.pulse-bb-wrapper').show();
        }

        function init() {
            loadCarousel();
        }

        return {
            init: init
        };

    })();

    PulseCarousel.init();

})(parent.window.jQuery);

// $(document).ready(function() {
//     $('.pulse-bb-slides').slick({
//         lazyLoad: 'ondemand',
//         slidesToShow: 2,
//         slidesToScroll: 1
//     });
// });
