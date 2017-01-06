var PulsePlayer = (function() {

    var pluse_main = document.getElementsByClassName('pulse-wrapper')[0],
        pulse_wrapper = document.getElementsByClassName('pulse-player-wrapper'),
        isFirstClick = true,
        click_thru = pluse_main.getAttribute('data-click'),
        has_video_ctrls = document.getElementsByClassName('pulse-player-no-ctrls').length > 0 ? false : true;

    function advClickThru() {
        window.open(click_thru);
    }

    function muteVideo(video,wrapper) {
        if (video.muted) {
            video.muted = false;
            wrapper.classList.remove('pulse-player-muted');

        } else {
            video.muted = true;
            wrapper.classList.add('pulse-player-muted');
        }
    }

    function bindVideoWrapper(video,wrapper,button) {
        var eventName = "click";
        if ( Utils.isTouchDevice() ) {
            eventName = "touchstart";
        }
        if (wrapper.length && !video.hasAttribute('autoplay')) {
            wrapper.addEventListener(eventName, function(){
                button.click();
                return false;
            });
            wrapper.on(eventName, function(e) {
                $video_play_button.click();
            });
        } else {
            video.addEventListener(eventName, function(){
                advClickThru();
                return false;
            });
        }
        // Autoplay Video
        if (video.hasAttribute('autoplay')) {
            video.setAttribute('playing', 'true');
            video.parentNode.classList.add('pulse-player-active');
            muteVideo(video,wrapper);
        }
    }

   function playVideo(video,wrapper,button) {

        if (isFirstClick) {
            video.load(); // becase video src is set dynamically
            wrapper.removeEventListener('click',function(){
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

    function videoEndEvents(video,wrapper) {
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
            btn_play.addEventListener('click', function(){
                playVideo(video,el,this)
            });
            btn_mute.addEventListener('click', function(){
                muteVideo(video,el,this)
            });
            bindVideoWrapper(video,el,btn_play);
            setStartTime(video);
            video.addEventListener('ended', function(){
                videoEndEvents(video,el);
            });
        });
    }

    function init() {
        bindFunctions();
    }

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', PulsePlayer.init(), false);
