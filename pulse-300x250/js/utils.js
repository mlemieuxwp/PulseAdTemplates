var Utils = (function() {

    function checkImgSrc(src) {
        if (src && !/.gif/i.test(src)) {
            src = 'https://img.washingtonpost.com/wp-apps/imrs.php?src=' + src + '&h=250&w=300';
        }
        return src;
    }

    function clickTrackHandler(link) {
        link.onclick = function(event) {
            if (linkClickPixel) {
                var img = document.createElement("img");
                img.alt = "";
                img.border = 0;
                img.src = linkClickPixel;
                img.style.width = "1px";
                img.style.height = "1px";
                img.style.display = "none";
                pulseTrackingWrapper.appendChild(img);
            }
        };
    }

    function setAdClick(url) {
        if (!url) {
            var mobileWrapper = document.getElementsByClassName('pulse-mobile-wrapper')[0];
            url = mobileWrapper.getAttribute('data-click');
        }
        return url;

    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    return {
        checkImgSrc: checkImgSrc,
        clickTrackHandler: clickTrackHandler,
        setAdClick: setAdClick,
        shuffleArray: shuffleArray
    }


})();
