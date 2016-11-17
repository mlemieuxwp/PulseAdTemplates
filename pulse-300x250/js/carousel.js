var PulseCarousel = (function() {

    function headerFooterSlide(swiper) {

        var slide_count = swiper.slides.length - 1;

        var pulseHeader = document.getElementsByClassName('js-pulse-animate')[0];
        var pulseFooter = document.getElementsByClassName('js-pulse-animate')[1];
        var pulseWrapper = document.getElementsByClassName('pulse-mobile-wrapper')[0];

        swiper.on('onSlideChangeStart', function(swiper) {
            
            if (swiper.slides[swiper.activeIndex].classList.contains('slick-sponsor') && !pulseWrapper.classList.contains('pulse-sponsored') ) {
                pulseWrapper.classList.add('pulse-sponsored');
            }

            if ( pulseHeader.classList.contains('closed') && pulseFooter.classList.contains('closed') ) {
                pulseHeader.classList.toggle('closed');
                pulseFooter.classList.toggle('closed');
            }

            if (swiper.slides[swiper.activeIndex].hasAttribute('data-animate')) {
                pulseHeader.classList.toggle('closed');
                pulseFooter.classList.toggle('closed');
            }

        });

        swiper.on('onSlideChangeEnd', function(swiper) {
            if (!swiper.slides[swiper.activeIndex].classList.contains('slick-sponsor') && pulseWrapper.classList.contains('pulse-sponsored')) {
                pulseWrapper.classList.remove('pulse-sponsored');
            }
        });
    }

    function loadCarousel(pulse_selector) {

        // Adding next, prev buttons to slider 
        var pulse_wrapper = document.getElementsByClassName(pulse_selector)[0];
        var next = document.createElement('a');
        next.classList.add('pulse-next');

        var prev = document.createElement('a');
        prev.classList.add('pulse-prev');

        pulse_wrapper.append(next);
        pulse_wrapper.append(prev);

        var swiper = new Swiper('.' + pulse_selector,{
            slideClass      : 'pulse-slide',
            wrapperClass    : 'pulse-mobile',
            preloadImages   : false,
            lazyLoading     : true,
            loop            : true,
            nextButton      : '.pulse-next',
            prevButton      : '.pulse-prev'
        });

        return swiper;
    }


    function videoSlide(swiper) {            
        swiper.on('onSlideChangeStart', function(swiper) {
            // Pause Videos when sliding
            var videos = document.getElementsByTagName('video');
            for ( i=0; i < videos.length ; i++  ) {
                if ( !videos[i].pasued ) {
                    videos[i].pause();
                    videos[i].removeAttribute('playing');
                    videos[i].parentNode.classList.remove('pulse-player-active');
                }
            }
        });
    }

    function iframeSlide(swiper) {
        if (document.getElementById('pulse-mobile-ad')) {

            var adv = document.getElementById('pulse-mobile-ad'),
                adv_parent = adv.parentNode.parentNode,
                slick_index = adv_parent.getAttribute('data-swiper-slide-index');

            swiper.on('onSlideChangeStart', function(swiper) {

                if (!adv.classList.contains('js-pulse-mobile-ad-active') && nextSlide === slick_index) {

                    var iframe_src = adv.getAttribute('data-iframe');
                    adv.append('<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" height="250" width="300" src="' + iframe_src + '" topmargin="0" leftmargin="0" allowtransparency="1"></iframe>');
                    adv.classList.add('js-pulse-mobile-ad-active');
                }

            });

        }

    }

    function imgAdSlide(click_thru) {
        if (click_thru && document.getElementById('js-pulse-mobile-img-ad')) {
            var ad = document.getElementById('pulse-mobile-ad'),
                ad_click = document.getElementsByClassName('pulse-mobile-wrapper')[0].getAttribute('data-click');

            document.getElementById('js-pulse-mobile-img-ad').addEventListener('click',function(){
                Utils.advClickThru;
            });

        }

    }

    function lazyLoadAdIframeTag(swiper) {
        var adContainer = document.getElementById('pulse-mobile-ad-iframe');
        if (adContainer) {
            var slide_index = adContainer.getAttribute('data-swiper-slide-index'),
                adContent = adContainer.firstChild,
                isNoScriptContent = adContent.tagName == 'NOSCRIPT' ? true : false,
                isLoaded = false;

            if (slide_index && isNoScriptContent) {
                swiper.on('onSlideChangeStart', function(swiper) {
                    if (swiper.activeIndex === slide_index && !isLoaded) {
                        var noscriptContent = adContent.textContent;
                        adContainer.append(noscriptContent);
                        isLoaded = true;
                    }
                });
            }
        }
    }

    function init() {

        var pulse_selector = 'pulse-mobile-wrapper',
            click_thru = document.getElementsByClassName(pulse_selector)[0].getAttribute('data-click');

        var swiper = loadCarousel(pulse_selector);

        headerFooterSlide(swiper);
        videoSlide(swiper);
        iframeSlide(swiper);
        imgAdSlide(click_thru);
        lazyLoadAdIframeTag(swiper);
    }

    return {
        init: init
    };

})();