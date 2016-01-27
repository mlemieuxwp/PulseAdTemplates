getScript([
        'jquery'
    ], function() {

    var _$ = $.proxy($.fn.find, $(document));

    var PulsePlayer = (function() {

        var video = document.getElementById('pulse-player'),
            click_thru = _$('.pulse-wrapper').data('click'),
            tracking_url = _$('.pulse-wrapper').data('track') ? _$('.pulse-wrapper').data('track') : false;
            $video_play_button = _$('.pulse-player-play'),
            $video_mute_button = _$('.pulse-player-volume'),
            $video_wrapper = _$('.pulse-player-wrapper'),
            $has_video_ctrls = _$('.pulse-player-no-ctrls').length > 0 ? false : true;

        function playBtnTrack(tracking_url) {
            if (tracking_url) {
                var rand_num = Math.floor(Math.random() * 10000000) + '?';
                    tracking_url = tracking_url + rand_num;
                _$('.pulse-tracking-wrapper').append('<img src="' + tracking_url + '" alt="" border="0" height="1" width="1" style="display:none;" />');
            }
        }

        function advClickThru(event) {
            event.preventDefault();
            top.window.open(click_thru);
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
            if($video_wrapper.length){
                $video_wrapper.off('click');
            }
            if (video.paused || video.ended) {
                playBtnTrack(tracking_url);
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
            video.load();
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
            if($video_wrapper.length && !video.hasAttribute('autoplay')){
                $video_wrapper.on('click', function(e){
                    $video_play_button.click();
                    _$(video).on('click', advClickThru);
                });
            }else{
                _$(video).on('click', advClickThru);
            }
        }

        function bindFunctions() {
            _$('.pulse-player-poster').on('click', advClickThru);
            $video_mute_button.on('click', muteBtnClick);
            $video_play_button.on('click', playBtnClick);
            bindVideoWrapper();
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
