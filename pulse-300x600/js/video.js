var PulsePlayer = (function() {

    var pluse_main = document.getElementsByClassName('pulse-wrapper')[0],
        pulse_wrapper = document.getElementsByClassName('pulse-player-wrapper'),
        isFirstClick = true,
        click_thru = bsAd.clickThruURL,
        has_video_ctrls = document.getElementsByClassName('pulse-player-no-ctrls').length > 0 ? false : true;
        video_length = 0;

    function advClickThru() {
        if (click_thru && click_thru !== "") {
            window.open(click_thru);
        }
    }

    function muteVideo(video, wrapper) {
        if (video.muted) {
            video.muted = false;
            wrapper.classList.remove('pulse-player-muted');

        } else {
            video.muted = true;
            wrapper.classList.add('pulse-player-muted');
        }
    }

    function bindVideoWrapper(video, wrapper, button) {

        var eventName = "click";
        if (Utils.isTouchDevice()) {
            eventName = "touchstart";
        }

        if (wrapper.length && !video.hasAttribute('autoplay')) {
            wrapper.addEventListener(eventName, function() {
                button.click();
                return false;
            });
            wrapper.on(eventName, function(e) {
                $video_play_button.click();
            });
        } else {
            video.addEventListener(eventName, function() {
                advClickThru();
                return false;
            });
        }
        // Autoplay Video
        if (video.hasAttribute('autoplay')) {
            video.setAttribute('playsinline','')
            video.setAttribute('playing', 'true');
            video.parentNode.classList.add('pulse-player-active');
            muteVideo(video, wrapper);
        }
    }

    function playVideo(video, wrapper, button) {

        if (isFirstClick) {
            video.load(); // becase video src is set dynamically
            wrapper.removeEventListener('click', function() {
                button.click();
            });

            isFirstClick = false;
            /*if ( click_thru!= null ){
                video.addEventListener('click', function(){
                    advClickThru();
                    return false;
                });
            }*/
        }
        if (video.paused || video.ended) {
            video.play();
            video.setAttribute('playing', 'true');

            video.parentNode.classList.add('pulse-player-active');


        } else {
            video.pause();
            video.removeAttribute('playing');
            video.parentNode.classList.remove('pulse-player-active');
        }
    }

    function setStartTime(video) {
        if (!video.getAttribute('poster') && video.getAttribute('data-current-time')) {
            video.currentTime = video.getAttribute('data-current-time');
        }
    }

    function initTracking(v,data) {
        var tracked_25 = tracked_50 = tracked_75 = false;
        if (data.startTrack){
            v.addEventListener('playing',function(){
                Utils.trackingPixel(data.startTrack);
                tracked_25 = tracked_50 = tracked_75 = false;
            });
        }
        if (data.track100){
            v.addEventListener('ended',function(){
                Utils.trackingPixel(data.track100);
            })
        }
        v.addEventListener('timeupdate',function(){
            var time = v.currentTime;

            if ( time/video_length > .25  && data.track25 && !tracked_25 ) {
                tracked_25 = true;
                Utils.trackingPixel(data.track25);
            }
            if ( time/video_length > .5  && data.track50 && !tracked_50 ) {
                tracked_50 = true;
                Utils.trackingPixel(data.track50);
            }
            if ( time/video_length > .75  && data.track75 && !tracked_75 ) {
                tracked_75 = true;
                Utils.trackingPixel(data.track75);
            }
        });
    }

    function videoEndEvents(video, wrapper) {
        //video.load();
        if (!video.getAttribute('poster') && video.getAttribute('data-current-time')) {
            video.currentTime = video.getAttribute('data-current-time');
        }
        if (has_video_ctrls) {
            video.parentNode.classList.remove('pulse-player-active');
        }
    }

    function bindFunctions() {
        Array.prototype.forEach.call(pulse_wrapper, function(el) {
            var video = el.getElementsByTagName('video')[0];
            var btn_play = el.querySelector('.pulse-player-play-toggle');
            var btn_mute = el.querySelector('.pulse-player-volume-toggle');
            btn_play.addEventListener('click', function() {
                playVideo(video, el, this)
            });
            btn_mute.addEventListener('click', function() {
                muteVideo(video, el, this)
            });
            bindVideoWrapper(video, el, btn_play);
            setStartTime(video);
            video.addEventListener('ended', function() {
                videoEndEvents(video, el);
            });

            video.addEventListener('loadedmetadata', function() {
                video_length = video.duration;
            });
            var trackingData = JSON.parse(el.getAttribute('data-videotracking'));
            initTracking(video,trackingData);

        });
    }

    function init() {
        bindFunctions();
    }

    return {
        init: init
    };

})();
