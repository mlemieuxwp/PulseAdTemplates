getScript([
    'jquery'
], function() {
    $ = typeof $ !== 'undefined' ? $ : top.jQuery;
    var _$ = $.proxy($.fn.find, $(document));

    var PulsePlayer = (function() {

        var video = document.getElementById('pulse-player'),
            click_thru = _$('.pulse-wrapper').data('click');

        var track_play = (_$('.pulse-player-wrapper').data('video-track-play') || _$('.pulse-wrapper').data('track')) || false;
        var track_end = _$('.pulse-player-wrapper').data('video-track-end') || false;

        var $video_play_button = _$('.pulse-player-play'),
            $video_mute_button = _$('.pulse-player-volume'),
            $video_wrapper = _$('.pulse-player-wrapper'),
            $has_video_ctrls = _$('.pulse-player-no-ctrls').length > 0 ? false : true,
            isFirstClick = true;

        function setTrackPixel(url) {
            if (url) {
                url = url.replace(/%%CACHEBUSTER%%/gi, '');
                url += Math.floor(1E12 * Math.random()) + '?';
                _$('.pulse-tracking-wrapper').append('<img src="' + url + '" alt="" border="0" height="1" width="1" style="display:none;" />');
            }
        }

        function setStartTime() {
            if ($(video).data('current-time')) {
                // video.play();
                // video.pause();
                video.currentTime = $(video).data('current-time');
            }
        }

        function advClickThru(event) {
            event.preventDefault();
            window.open(click_thru);
        }

        function muteBtnClick(event) {
            event.preventDefault();
            if (video.muted) {
                video.muted = false;
                _$(this).removeClass('fa-volume-off');
            } else {
                video.muted = true;
                _$(this).addClass('fa-volume-off');

            }
        }

        function playBtnClick(event) {
            event.preventDefault();
            if ($video_wrapper.length && isFirstClick) {
                $video_wrapper.off('click');
                isFirstClick = false;
                _$(video).on('click', advClickThru);
            }

            if (video.paused || video.ended) {
                //setTrackPixel(track_play);
                video.play();
                _$(video).parent().addClass('pulse-player-active');
                _$(video).css('visibility', 'visible');
                _$(this).addClass('fa-pause-circle-o pulse-player-pause');
            } else {
                video.pause();
                _$(this).removeClass('fa-pause-circle-o pulse-player-pause');
            }
        }

        function videoEndEvents() {
            //setTrackPixel(track_end);
            //video.load();
            if ($has_video_ctrls) {
                $video_play_button.removeClass('fa-pause-circle-o pulse-player-pause').show();
            }
        }

        function videoBtnEffects() {
            _$(".pulse-wrapper").on("mouseenter", ".pulse-player-active", function() {
                $video_play_button.fadeIn();
            });
            _$(".pulse-wrapper").on("mouseleave", ".pulse-player-active", function() {
                $video_play_button.fadeOut();
            });
        }

        function bindVideoWrapper() {
            if ($video_wrapper.length && !video.hasAttribute('autoplay')) {
                $video_wrapper.on('click', function(e) {
                    $video_play_button.click();
                });
            } else {
                _$(video).on('click', advClickThru);
            }
        }

        function isAutoPlay(){ 
            if(video && video.autoplay){
                video.muted = true;
                $video_wrapper.addClass('pulse-player-active');
                $video_play_button.hide().addClass('fa-pause-circle-o pulse-player-pause');
                $video_mute_button.addClass('fa-volume-off');
            }
        }

        function bindFunctions() {
            _$('.pulse-player-poster').on('click', advClickThru);
            $video_mute_button.on('click', muteBtnClick);
            $video_play_button.on('click', playBtnClick);
            setStartTime();
            bindVideoWrapper();
            isAutoPlay();
            _$(video).on('ended', videoEndEvents);
        }

        function init() {
            bindFunctions();
            videoBtnEffects();
        }

        return {
            init: init
        };

    })();

    PulsePlayer.init();

});
