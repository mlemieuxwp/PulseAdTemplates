getScript([
    'jquery',
    'slick'
], function() {
    // set jquery scope for ad iframe
    var _$ = $.proxy($.fn.find, $(document));
    PulseSlides.init();
});
