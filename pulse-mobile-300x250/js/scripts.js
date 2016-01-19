(function($) {

    // set jquery scope for ad iframe
    var _$ = $.proxy($.fn.find, $(document)),
        $pulse = _$('.pulse-mobile');

    var PulseTracking = (function() {

        function setTrackingPixel(url) {
            _$('.pulse-mobile-tracking').append('<img src="' + url + '" alt="" height="1" width="1" style="display:none;" />');
        }

        function init() {
            var tracking_url = $pulse.attr('data-tracking');
            $pulse.on('afterChange', function(event, slick, currentSlide) {
                setTrackingPixel(tracking_url);
            });
        }

        return {
            init: init
        };

    })();

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

        function loadSlick() {

            //use parent jquery scope
            return $.ajax({
                url: 'https://www.washingtonpost.com/wp-stat/advertising/PostPulse/js/mobile-300x250/slick.min.js',
                dataType: "script",
                cache: true,
                success: function(results) {}
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
                    }
                    else {
                        if (video.hasAttribute('playing')) {
                            video.pause();
                            video.removeAttribute('playing');
                        }
                    }
                });

            }

        }

        function init() {

            loadSlick().done(function(data, textStatus, jqXHR) {
                loadCarousel();
                headerFooterSlide();
                videoSlide();
                //autoPlayVideoOnSlide();
                //playVideoOnSlide();
                //PulseTracking.init();
            });

        }

        return {
            init: init
        };

    })();


    PulseCarousel.init();

})(parent.window.jQuery);
