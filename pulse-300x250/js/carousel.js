var PulseCarousel = (function() {

    function headerFooterSlide($pulse,_$) {

        var swiper = $pulse[0].swiper;
        var slide_count = swiper.slides.length - 1;

        var pulseHeader = document.getElementsByClassName('js-pulse-animate')[0];
        var pulseFooter = document.getElementsByClassName('js-pulse-animate')[1];

        swiper.on('onSlideChangeStart', function(swiper) {
            //console.log("start:"+swiper.activeIndex);
            if (swiper.slides[swiper.activeIndex].classList.contains('slick-sponsor') && !_$('.pulse-mobile-wrapper').hasClass('pulse-sponsored')) {
                _$('.pulse-mobile-wrapper').addClass('pulse-sponsored');
            }

            if (_$('.js-pulse-animate').hasClass('closed')) {
                //_$('.js-pulse-animate').slideDown();
                pulseHeader.classList.toggle('closed');
                pulseFooter.classList.toggle('closed');
            }


            if (swiper.slides[swiper.activeIndex].hasAttribute('data-animate')) {
                //_$('.js-pulse-animate').slideUp();
                pulseHeader.classList.toggle('closed');
                pulseFooter.classList.toggle('closed');
                
            }

        });

        swiper.on('onSlideChangeEnd', function(swiper) {
            if (!swiper.slides[swiper.activeIndex].classList.contains('slick-sponsor') && _$('.pulse-mobile-wrapper').hasClass('pulse-sponsored')) {
                _$('.pulse-mobile-wrapper').removeClass('pulse-sponsored');
            }
        });
    }

    function loadCarousel($pulse) {
        /*$pulse.slick({
            lazyLoad: 'ondemand',
            rtl: false
        })*/

        // Adding next, prev buttons to slider 
        $pulse.append('<a class="pulse-prev"></a><a class="pulse-next"></a>');

        new Swiper($pulse,{
            slideClass      : 'pulse-slide',
            wrapperClass    : 'pulse-mobile',
            preloadImages   : false,
            lazyLoading     : true,
            loop            : true,
            nextButton      : '.pulse-next',
            prevButton      : '.pulse-prev'
        });
    }

    function autoPlayVideoOnSlide() {
        var $pulseVideo = $pulse.find('.pulse-video').not(".slick-cloned");
        if (!$pulseVideo.length) {
            return;
        }
        var videoSlideIndex = $pulseVideo.data('slick-index'),
            pulseVideo = $pulseVideo.find('#pulse-player').get(0);
        $pulse.on('afterChange', function(event, slick, currentSlide) {
            if (currentSlide === videoSlideIndex) {
                pulseVideo.play();
            } else {
                pulseVideo.pause();
            }
        });
        $(pulseVideo).on('ended', function() {
            pulseVideo.play();
        });
    }

    function setVideoPoster(video) {
        var poster = _$(video).data('poster');
        if (poster) {
            video.setAttribute('poster', poster);
        }
    }

    function setVideoSrc(video) {
        var src = _$(video).data('src'),
            source = document.createElement('source');
        source.setAttribute('src', src);
        video.appendChild(source);
    }

    function playVideoOnSlide() {
        if (document.getElementById('pulse-player')) {

            var video = document.getElementById('pulse-player'),
                video_parent = video.parentNode.parentNode,
                slick_index = _$(video_parent).data('slick-index');

            $pulse.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if (nextSlide === slick_index) {
                    setVideoPoster(video);
                    setVideoSrc(video);
                    video.play();
                    video.setAttribute('playing', 'true');
                } else {
                    if (video.hasAttribute('playing')) {
                        video.pause();
                        video.removeAttribute('playing');
                    }
                }
            });

        }

    }

    function videoSlide() {
        if (document.getElementById('pulse-player')) {

            var video = document.getElementById('pulse-player'),
                video_parent = video.parentNode.parentNode,
                slick_index = _$(video_parent).data('slick-index');

            $pulse.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if (nextSlide === slick_index) {
                    setVideoPoster(video);
                    setVideoSrc(video);
                } else {
                    if (video.hasAttribute('playing')) {
                        video.pause();
                        _$('.pulse-player-active').removeClass('pulse-player-active');
                        _$('.pulse-player-pause').show();
                        video.removeAttribute('playing');
                    }
                }
            });

        }

    }

    function iframeSlide() {
        if (document.getElementById('pulse-mobile-ad')) {

            var adv = document.getElementById('pulse-mobile-ad'),
                adv_parent = adv.parentNode.parentNode,
                slick_index = _$(adv_parent).data('slick-index');

            $pulse.on('beforeChange', function(event, slick, currentSlide, nextSlide) {

                if (!_$(adv).hasClass('js-pulse-mobile-ad-active') && nextSlide === slick_index) {

                    var iframe_src = _$(adv).data('iframe');
                    _$(adv).append('<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" height="250" width="300" src="' + iframe_src + '" topmargin="0" leftmargin="0" allowtransparency="1"></iframe>').addClass('js-pulse-mobile-ad-active');

                }

            });

        }

    }

    function imgAdSlide(click_thru) {
        if (click_thru && document.getElementById('js-pulse-mobile-img-ad')) {
            var ad = document.getElementById('pulse-mobile-ad'),
                ad_click = _$('.pulse-mobile-wrapper').data('click');

            _$('#js-pulse-mobile-img-ad').on('click', Utils.advClickThru);

        }

    }

    function lazyLoadAdIframeTag() {
        var adContainer = document.getElementById('pulse-mobile-ad-iframe');
        if (adContainer) {
            var slick_index = _$(adContainer).data('slick-index'),
                adContent = _$(adContainer).children(':first')[0],
                isNoScriptContent = _$(adContent).is('NOSCRIPT') ? true : false,
                isLoaded = false;

            if (slick_index && isNoScriptContent) {
                $pulse.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    if (nextSlide === slick_index && !isLoaded) {
                        var noscriptContent = _$(adContent).text();
                        _$(adContainer).append(noscriptContent);
                        isLoaded = true;
                    }
                });
            }
        }
    }

    function init() {

        var _$ = $.proxy($.fn.find, $(document)),
        $pulse = _$('.pulse-mobile-wrapper'),
        click_thru = _$('.pulse-mobile-wrapper').data('click');

        loadCarousel($pulse);
        headerFooterSlide($pulse,_$);
        videoSlide();
        iframeSlide();
        imgAdSlide(click_thru);
        lazyLoadAdIframeTag();
    }

    return {
        init: init
    };


})();
