var Utils = (function() {


    // Add tracker for clicks
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
    };

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

    function removeSponContent(content) {
        var contentArray = [];
        content.forEach(function(item, index) {
            if (!item.hasOwnProperty('sponsor') || item.sponsor != true) {
                contentArray.push(item);
            }
        });
        return contentArray;
    }

    return {
        clickTrackHandler: clickTrackHandler,
        setArticleNum: setArticleNum,
        shuffleArray: shuffleArray,
        isTouchDevice: isTouchDevice,
        appendStyle: appendStyle,
        checkImgSrc: checkImgSrc,
        filterSponsorContent: filterSponsorContent,
        removeSponContent: removeSponContent
    }


})();
