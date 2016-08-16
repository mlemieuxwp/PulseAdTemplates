var PulseTracking = (function() {

    // get video element and tracking object

    var videoId = document.getElementById('pulse-player');
    var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];

    // set up tracking variables
    if (typeof PulseVideoTracking !== 'undefined') {
        var trackStart = PulseVideoTracking && PulseVideoTracking.trackStart || null,
            track100 = PulseVideoTracking && PulseVideoTracking.track100 || null,
            track25 = PulseVideoTracking && PulseVideoTracking.track25 || null,
            track50 = PulseVideoTracking && PulseVideoTracking.track50 || null,
            track75 = PulseVideoTracking && PulseVideoTracking.track75 || null;
    }

    // create tracking pixel

    function setTrackPixel(url) {

        var img = new Image();
        img.alt = '';
        img.border = 0;
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';

        if (url) {
            url = url.replace(/%%CACHEBUSTER%%/gi, '');
            url += Math.floor(1E12 * Math.random()) + '?';
            img.src = url;
            pulseTrackingWrapper.appendChild(img);
        }

    }

    // calculate key frame quartiles and store using local storage

    function setKeyFrames(duration) {
        var quarter = (duration / 4).toFixed(1)
        sessionStorage.setItem('one', quarter)
        sessionStorage.setItem('two', (quarter * 2).toFixed(1))
        sessionStorage.setItem('three', (quarter * 3).toFixed(1))
    }

    // check video time and set tracking pixels 

    function videoTimeUpdate() {

        var curTime = videoId.currentTime.toFixed(1);

        if (track25 && (curTime >= parseInt(sessionStorage.getItem('one')))) {
            setTrackPixel(track25);
            sessionStorage.setItem('one', null);
        } else if (track50 && (curTime >= parseInt(sessionStorage.getItem('two')))) {
            setTrackPixel(track50);
            sessionStorage.setItem('two', null);
        } else if (track75 && (curTime >= parseInt(sessionStorage.getItem('three')))) {
            setTrackPixel(track75);
            sessionStorage.setItem('three', null);
        }

    }

    // event: video end

    function videoEnd() {
        setTrackPixel(track100);
    }

    // event: video play

    function videoPlay() {
        setTrackPixel(trackStart);
        setKeyFrames(this.duration)
    }

    // event: video pause

    function videoPause() {
        console.log('video paused');
    }

    function bindEvents() {
        if (videoId) {
            videoId.addEventListener('ended', videoEnd, false);
            videoId.addEventListener('timeupdate', videoTimeUpdate, false);
            videoId.addEventListener('play', videoPlay, false);
            //videoId.addEventListener('pause', videoPause, false);
        }
    }

    function init() {
        bindEvents();
    }

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', PulseTracking.init(), false);
