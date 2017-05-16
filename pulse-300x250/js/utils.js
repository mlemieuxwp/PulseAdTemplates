var Utils = (function() {

    function advClickThru(event) {
        event.preventDefault();
        window.open(click_thru);
    }

    function checkImgSrc(src) {
        if (src && !/.gif/i.test(src)) {
            src = 'https://img.washingtonpost.com/wp-apps/imrs.php?src=' + src + '&h=250&w=300';
        }
        return src;
    }

    function clickTrackHandler(link, linkClickPixel, trackingWrapper) {
        link.onclick = function(event) {
            if (linkClickPixel) {
                var img = document.createElement("img");
                img.alt = "";
                img.border = 0;
                img.src = linkClickPixel;
                img.style.width = "1px";
                img.style.height = "1px";
                img.style.display = "none";
                trackingWrapper.appendChild(img);
            }
        };
    }

    function appendStyle(css, _document) {
        var head = _document.getElementsByTagName("head")[0];
        var style = _document.createElement("style");
        style.type = "text/css";

        style.appendChild(_document.createTextNode(css));
        head.appendChild(style);
    };

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

    function htmlUnescape(str){
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    }

    function elementInViewport(el,parent) {
          var top = el.offsetTop;
          var left = el.offsetLeft;
          var width = el.offsetWidth;
          var height = el.offsetHeight;

          while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
          }

          return (
            top >= parent.pageYOffset &&
            left >= parent.pageXOffset &&
            (top + height) <= (parent.pageYOffset + parent.innerHeight) &&
            (left + width) <= (parent.pageXOffset + parent.innerWidth)
          );
    }

    return {
        advClickThru: advClickThru,
        checkImgSrc: checkImgSrc,
        clickTrackHandler: clickTrackHandler,
        setAdClick: setAdClick,
        shuffleArray: shuffleArray,
        appendStyle: appendStyle,
        htmlUnescape : htmlUnescape,
        elementInViewport : elementInViewport
    }


})();
