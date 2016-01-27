getScript([
        'jquery',
        'slick'
    ], function() {
    // set jquery scope for ad iframe
    var _$ = $.proxy($.fn.find, $(document)),
        $pulse = _$('.pulse-mobile');


    var PulseCarousel = (function() {

        function headerFooterSlide() {
            var _slick = $pulse.slick('getSlick');
            var slide_count = _slick.slideCount - 1;

            $pulse.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                if (slide_count === nextSlide) {
                    _$('.js-pulse-animate').slideUp();
                }

                if (!_$('.js-pulse-animate').is(':visible')) {
                    _$('.js-pulse-animate').slideDown();
                }
            });
        }

        function loadCarousel() {
            $pulse.slick({
                lazyLoad: 'ondemand',
                rtl: false
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

        function init() {
            loadCarousel();
            headerFooterSlide();
            videoSlide();
            iframeSlide();
        }

        return {
            init: init
        };

    })();

    PulseCarousel.init();

});
