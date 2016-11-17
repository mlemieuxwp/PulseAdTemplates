var PulseSlides = (function() {

    function loadArticles(articleDiv) {

        if (articleDiv) {

            var articles = articleDiv.getAttribute('data-articles');
            var articleFeed = articleDiv.getAttribute('data-feed');
            var linkClickPixel = articleDiv.getAttribute('data-clicktrack');
            var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];
            var selArticles;
            var shuffle = articleDiv.getAttribute('data-shuffle');
            var sponsorAll = articleDiv.getAttribute('data-sponsorall') || false;
            var urlParam = articleDiv.getAttribute('data-urlparam');

            function initArticles(articles) {
                
                articles = JSON.parse(articles);

                if (shuffle) {
                    selArticles = Utils.shuffleArray(articles).slice(0, 3);
                } else {
                    selArticles = articles.slice(0, 3);
                    selArticles.reverse(); //need to reverse to keep article order when we insertBefore below.
                }

                var html = Templates.engine(Templates.types['articles'], {
                    articles: selArticles,
                    linkTarget: function(i) {
                        return !this.articles[i].sponsor ? '_top' : '_blank';
                    },
                    showArticles: true,
                    sponsorAll: sponsorAll,
                    urlParam: urlParam ? '?spon_con=' + urlParam : ''
                });
                //console.log(html);

                var ad = articleDiv.getAttribute('data-ad');
                ad = JSON.parse(ad);
                //console.log(ad.type);
                if (ad && ad.type === 'video') {
                    ad.videoTracking = {};
                    ad.videoTracking.trackStart = ad.trackstart || null;
                    ad.videoTracking.track25 = ad.track25 || null;
                    ad.videoTracking.track50 = ad.track50 || null;
                    ad.videoTracking.track75 = ad.track75 || null;
                    ad.videoTracking.track100 = ad.track100 || null;
                    ad.videoTracking = JSON.stringify(ad.videoTracking);
                }

                if (ad) {
                    var adHtml = Templates.engine(Templates.types[ad.type], {
                        ad: ad,
                        setAdClick: Utils.setAdClick,
                        checkImgSrc: Utils.checkImgSrc
                    });
                    html = adHtml + html;
                }

                var elem = document.createElement('div');
                elem.innerHTML = html;

                for (i = 0; i < elem.childNodes.length;) {
                    el = elem.childNodes[i];
                    elem.removeChild(el);
                    articleDiv.insertBefore(el, articleDiv.firstChild);
                }

                if (articleDiv.querySelectorAll) {
                    var links = articleDiv.querySelectorAll("a");
                    for (i = 0; i < links.length; i++) {
                        Utils.clickTrackHandler(links[i]);
                    }
                }

            }


            if (articleFeed) {
                
                xmlHttp.get(articleFeed, function(xhr) {
                    initArticles(xhr.responseText);
                    PulseCarousel.init();
                });

            } else if (articles) {

                initArticles(articles);
                PulseCarousel.init();

            }


        }
    }

    function init() {

        var articles = document.getElementById('articles');
        loadArticles(articles);

    }

    return {
        init: init
    };

})();
