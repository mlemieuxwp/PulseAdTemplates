
var Tracking = (function() {

    function setTrackingPixel(url) {
        $('.pulse-mobile-tracking').append('<img src="' + url + '" alt="" height="1" width="1" style="display:none;" />');
    }

    function init() {
        $pulse = $('.pulse-mobile');

        var tracking_url = $pulse.attr('data-tracking');
        $pulse.on('afterChange', function(event, slick, currentSlide) {
            setTrackingPixel(tracking_url);
        });
    }

    var $pulse;

    return {
        init: init
    };

})();

$.getScript("https://www.washingtonpost.com/wp-stat/advertising/WellsFargo/WF_300x250_Mobile/js/slick.min.js", function(data, textStatus, jqxhr) {

    $('.pulse-mobile').slick({
        lazyLoad: 'ondemand',
        rtl: false
    });

    //Tracking.init();

    var _slick = $('.pulse-mobile').slick('getSlick');
    var slide_count = _slick.slideCount - 1;

    $('.pulse-mobile').on('beforeChange', function(event, slick, currentSlide, nextSlide) {

        if (slide_count === nextSlide) {
            $('.pulse-mobile-header,.pulse-mobile-footer').slideUp();
        }

        if (!$('.pulse-mobile-header').is(':visible')) {
            $('.pulse-mobile-header,.pulse-mobile-footer').slideDown();
        }

    });

});
