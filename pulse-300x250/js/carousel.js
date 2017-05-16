var PulseCarousel = (function() {

    var adPosition = bsAd.adPosition || 'last';
    var autoPlay = bsAd.autoPlay || 0;

    function headerFooterSlide(swiper) {

        var slide_count = swiper.slides.length - 1;
        var pulseWrapper = document.getElementsByClassName('pulse-mobile-wrapper')[0];


        swiper.on('onSlideChangeStart', function(swiper) {
            toggleHeaderFooter(swiper);
        });

        swiper.on('onInit', function(swiper) {
            console.log("init");
        });

        swiper.on('onSlideChangeEnd', function(swiper) {
            if (!swiper.slides[swiper.activeIndex].classList.contains('slick-sponsor') && pulseWrapper.classList.contains('pulse-sponsored')) {
                pulseWrapper.classList.remove('pulse-sponsored');
            }
        });
    }

    function toggleHeaderFooter(swiper) {
        var pulseHeader = document.getElementsByClassName('js-pulse-animate')[0];
        var pulseFooter = document.getElementsByClassName('js-pulse-animate')[1];
        var pulseWrapper = document.getElementsByClassName('pulse-mobile-wrapper')[0];
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
    }

    function loadCarousel(pulse_selector) {

        // Adding next, prev buttons to slider
        var pulse_wrapper = document.getElementsByClassName(pulse_selector)[0];
        var next = document.createElement('a');
        next.classList.add('pulse-next');
        autoPlay = autoPlay*1000;

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


        var timer = false,
            parent = window.parent,
            frame = window.frameElement;

        if (autoPlay){
            parent.addEventListener('scroll',function(){
                 if ( Utils.elementInViewport(frame,parent) && !timer ) {
                     setTimeout(function(){
                         swiper.slideNext();
                     }, autoPlay);
                     timer = true;
                 }

            });
        }

        return swiper;
    }


    function videoSlide(swiper) {
        if (adPosition=='first') {
            initActiveSlideVideo(swiper);
        }
        swiper.on('onSlideChangeStart', function(swiper) {
            initActiveSlideVideo(swiper);
            // Pause Videos when sliding
            var videos = document.getElementsByTagName('video');
            for ( i=0; i < videos.length ; i++  ) {
                if ( !videos[i].paused ) {
                    videos[i].pause();
                    videos[i].removeAttribute('playing');
                    videos[i].parentNode.classList.remove('pulse-player-active');
                }
            }
        });
    }

    function initActiveSlideVideo(swiper) {
        var slide = swiper.slides[swiper.activeIndex];
        if ( slide.classList.contains('pulse-slide--video') ) {
            var video = slide.getElementsByTagName('video')[0];
            var poster_url = video.getAttribute('data-poster');
            video.setAttribute('poster',poster_url);

            // Get Video Source
            var source = video.getElementsByTagName('source')[0];
            var src = source.getAttribute('data-src');
            source.setAttribute('src',src);

            // Autoplay videos
            if ( video.hasAttribute('autoplay') ) {
                video.load();
                video.parentNode.classList.add('pulse-player-active');
                video.muted = true;
                video.parentNode.classList.add('pulse-player-muted');
            }
        }
    }

    function iframeSlide(swiper) {
        swiper.on('onSlideChangeStart', function(swiper) {
            var slide = swiper.slides[swiper.activeIndex];
            if ( slide.classList.contains('pulse-slide--iframe') ) {
                var iframe = slide.getElementsByTagName('iframe')[0];
                var url = iframe.getAttribute('data-src');
                iframe.setAttribute('src',url);
            }
            // when previously active slide is an iframe - reset URL
            var prev_slide = swiper.slides[swiper.previousIndex];
            if ( prev_slide.classList.contains('pulse-slide--iframe') ) {
                var iframe = prev_slide.getElementsByTagName('iframe')[0];
                iframe.setAttribute('src','');
            }
        });
    }

    function imgAdSlide(swiper) {
        swiper.on('onSlideChangeStart', function(swiper) {
            var slide = swiper.slides[swiper.activeIndex];
            if ( slide.classList.contains('pulse-slide--image') ) {
                var image = slide.getElementsByTagName('img')[0];
                var url = image.getAttribute('data-src');
                image.setAttribute('src',url);
            }
        });
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
            click_thru = bsAd.clickThruURL;

        var swiper = loadCarousel(pulse_selector);

        headerFooterSlide(swiper);
        videoSlide(swiper);
        iframeSlide(swiper);
        imgAdSlide(swiper);
        lazyLoadAdIframeTag(swiper);
    }

    return {
        init: init
    };

})();
