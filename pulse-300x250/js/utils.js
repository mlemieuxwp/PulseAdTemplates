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

    function trackingPixel(url) {
        var img = document.createElement('img');
        img.src = url + '?' + Math.floor(Math.random() * 10000000000);
        img.alt = "";
        img.border = 0;
        img.height = 1;
        img.width = 1;
        img.style.display = "none";
        document.body.appendChild(img);
    };

    function appendStyle(css, _document) {
        var head = _document.getElementsByTagName("head")[0];
        var style = _document.createElement("style");
        style.type = "text/css";

        style.appendChild(_document.createTextNode(css));
        head.appendChild(style);
    };

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

    function htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    return {
        advClickThru: advClickThru,
        checkImgSrc: checkImgSrc,
        trackingPixel: trackingPixel,
        shuffleArray: shuffleArray,
        appendStyle: appendStyle,
        htmlUnescape : htmlUnescape,
        elementInViewport : elementInViewport,
        htmlDecode : htmlDecode
    }


})();
