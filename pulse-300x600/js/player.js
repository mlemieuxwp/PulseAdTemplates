(function($) {

        var PulsePlayer = (function() {

            var _$ = $.proxy($.fn.find, $(document));

            var video = document.getElementById('pulse-player'),
                click_thru = _$('.pulse-wrapper').data('click'),
                $video_play_button = _$('.pulse-player-play'),
                $video_mute_button = _$('.pulse-player-volume'),
                $video_poster = _$('.pulse-player-poster');


            function advClickThru(event) {
                event.preventDefault();
                top.window.open(click_thru);
            };

            function muteBtnClick(event) {
                event.preventDefault();
                if (video.muted) {
                    video.muted = false;
                    _$(this).removeClass('fa-volume-off');
                } else {
                    video.muted = true;
                    _$(this).addClass('fa-volume-off');

                }
            };

            function playBtnClick(event) {
                event.preventDefault();
                if (video.paused || video.ended) {
                    video.play();
                    _$(video).parent().addClass('pulse-player-active');
                    $video_poster.css('visibility', 'hidden');
                    _$(video).css('visibility', 'visible');
                    _$(this).addClass('fa-pause-circle-o pulse-player-pause');
                } else {
                    video.pause();
                    _$(this).removeClass('fa-pause-circle-o pulse-player-pause');
                }
            };

            function videoEndEvents() {
                _$(video).css('visibility', 'hidden');
                $video_poster.css('visibility', 'visible');
                $video_play_button.removeClass('fa-pause-circle-o pulse-player-pause').show();
            };

            function videoBtnEffects() {
                _$(".pulse-wrapper").on("mouseenter", ".pulse-player-active", function() {
                    $video_play_button.fadeIn();
                });
                _$(".pulse-wrapper").on("mouseleave", ".pulse-player-active", function() {
                    $video_play_button.fadeOut();
                });
            };

            function bindFunctions() {
                _$(video).on('click', advClickThru);
                _$('.pulse-player-poster').on('click', advClickThru);
                $video_mute_button.on('click', muteBtnClick);
                $video_play_button.on('click', playBtnClick);
                _$(video).on('ended', videoEndEvents);
            };

            function init() {
                bindFunctions();
                videoBtnEffects();
            };

            return {
                init: init
            };

        })();

        PulsePlayer.init();

    })(parent.window.jQuery);