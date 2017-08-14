var PulseTracking = (function() {

    // get tracking object
    var videoTrackingUrl = new Array();
    var trackFlag = new Array();

    // set up tracking variables


    // create tracking pixel

    function initTrackingUrls() {
        var pulsePlayerWrapper = document.getElementsByClassName('pulse-player-wrapper')[0];
        var videoTracking = pulsePlayerWrapper && pulsePlayerWrapper.getAttribute('data-videotracking');
        videoTracking = videoTracking && JSON.parse(videoTracking);
        if (typeof videoTracking !== 'undefined' && videoTracking) {
            videoTrackingUrl[0] = videoTracking.startTrack || null,

            videoTrackingUrl[100] = videoTracking.track100 || null,

            videoTrackingUrl[25] = videoTracking.track25 || null,
            trackFlag[25] = false;

            videoTrackingUrl[50] = videoTracking.track50 || null,
            trackFlag[50] = false;

            videoTrackingUrl[75] = videoTracking.track75 || null;
            trackFlag[75] = false;
        }
    }

    function setTrackPixel(position) {
        var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];
        var url = videoTrackingUrl[position];
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

        sessionStorage.setItem('key', 'value');
        var quarter = (duration / 4).toFixed(1);
        sessionStorage.setItem('one', quarter);
        sessionStorage.setItem('two', (quarter * 2).toFixed(1));
        sessionStorage.setItem('three', (quarter * 3).toFixed(1));
    }

    // check video time and set tracking pixels

    function videoTimeUpdate(video) {

        var curTime = video.currentTime.toFixed(1);

        if (curTime >= parseInt(sessionStorage.getItem('one')) && !trackFlag[25] ) {
            setTrackPixel(25);
            sessionStorage.setItem('one', null);
            trackFlag[25] = true;
        } else if ( curTime >= parseInt(sessionStorage.getItem('two')) && !trackFlag[50] ) {
            setTrackPixel(50);
            sessionStorage.setItem('two', null);
            trackFlag[50] = true;
        } else if ( curTime >= parseInt(sessionStorage.getItem('three')) && !trackFlag[75] ) {
            setTrackPixel(75);
            sessionStorage.setItem('three', null);
            trackFlag[75] = true;
        }

    }

    // event: video end

    function videoEnd() {
        setTrackPixel(100);
    }

    // event: video play

    function videoPlay(video) {
        setTrackPixel(0);
    }

    // event: video pause

    function videoPause() {
        console.log('video paused');
    }

    function bindEvents(video) {

        if (video) {
            video.addEventListener('ended', function(){videoEnd()}, false);
            video.addEventListener('timeupdate', function(){videoTimeUpdate(video)}, false);
            video.addEventListener('play', function(){videoPlay(video)}, false);
        }
    }

    function init() {
        //document.addEventListener("DOMContentLoaded", function(event) {
            var videos = document.getElementsByClassName('pulse-player-wrapper');
            Array.prototype.forEach.call(videos, function(el) {
                var video = el.getElementsByTagName('video')[0];
                bindEvents(video);
            })
            initTrackingUrls();
        //});
    }

    return {
        init: init
    };

})();
