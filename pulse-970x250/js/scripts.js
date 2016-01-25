(function(factory){
    var url = 'https://www.washingtonpost.com/wp-stat/advertising/PostPulse/js/jquery-1.11.0.min.js';

    function isJQueryLoaded(url) {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            var tag = scripts[i];
            if (tag.src == url) return tag;
        }
        return false;
    }

    function loadJQuery (url){
        if(typeof parent.window.jQuery === 'undefined') {
            var headTag = document.getElementsByTagName("head")[0];
            var jqTag = document.createElement('script');
            jqTag.type = 'text/javascript';
            jqTag.src = url;
            headTag.appendChild(jqTag);
            jqTag.onload = function(){
                factory(jQuery);
            };
        } else {
            factory(parent.window.jQuery);
        }
    }

    var tag = isJQueryLoaded(url);
    if(tag){
        var onload = tag.onload;
        tag.onload = function(){
            onload(jQuery);
            factory(jQuery);
        };
    }else{
        loadJQuery(url);
    }
}(function($) {

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

}));

// $(document).ready(function() {
//     $('.pulse-bb-slides').slick({
//         lazyLoad: 'ondemand',
//         slidesToShow: 2,
//         slidesToScroll: 1
//     });
// });
