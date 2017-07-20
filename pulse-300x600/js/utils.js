var Utils = (function() {

    function isTouchDevice() {
        return 'ontouchstart' in window // works on most browsers
            ||
            navigator.maxTouchPoints; // works on IE10/11 and Surface
    };

    function setArticleNum() {
        var articleWrapper = document.getElementById('articles');
        if (articleWrapper.querySelectorAll) {
            var articleNums = articleWrapper.querySelectorAll(".pulse-article-number");
            for (i = 0; i < articleNums.length; i++) {
                articleNums[i].innerText = i + 1;
            }
        }
    }

    function htmlUnescape(str){
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    }

    function appendStyle(css, _document) {
        var head = _document.getElementsByTagName("head")[0];
        var style = _document.createElement("style");
        style.type = "text/css";

        style.appendChild(_document.createTextNode(css));
        head.appendChild(style);
    };

    function shuffleArray(array) {
        if (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    }

    function checkImgSrc(src) {
        if (src && !/.gif/i.test(src)) {
            src = 'https://img.washingtonpost.com/wp-apps/imrs.php?src=' + src + '&h=250&w=300';
        }
        return src;
    }

    function filterSponsorContent(contents) {
        var sponsorArray = [];
        contents.forEach(function(item, index) {
            if (item.hasOwnProperty('sponsor') && item.sponsor == true) {
                sponsorArray.push(item);
            }
        });
        return sponsorArray;
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

    function removeSponContent(content) {
        var contentArray = [];
        content.forEach(function(item, index) {
            if (!item.hasOwnProperty('sponsor') || item.sponsor != true) {
                contentArray.push(item);
            }
        });
        return contentArray;
    }

    function htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    return {
        setArticleNum: setArticleNum,
        shuffleArray: shuffleArray,
        isTouchDevice: isTouchDevice,
        appendStyle: appendStyle,
        trackingPixel: trackingPixel,
        checkImgSrc: checkImgSrc,
        filterSponsorContent: filterSponsorContent,
        removeSponContent: removeSponContent,
        htmlUnescape : htmlUnescape,
        htmlDecode : htmlDecode
    }


})();
