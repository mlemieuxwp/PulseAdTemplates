var PulseSlides = (function() {

    function loadArticles(articles) {
        
        var linkClickPixel = bsAd.client_tracking;
        var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];
        var selArticles;
        var shuffle = bsAd.shuffle;
        var sponsorAll = bsAd.sponsorAll || false;
        var urlParam = bsAd.urlParam ? '?spon_con=' + bsAd.urlParam : '';
        var ad = bsAd.ad;
        var articleDiv = document.getElementById('articles');

        if (shuffle == 'true') {
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
            url_param: urlParam
        });

        ad = JSON.parse(ad);

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
                Utils.clickTrackHandler(links[i], linkClickPixel, pulseTrackingWrapper);
            }
        }
    }

    function init(articles) {
        loadArticles(articles);
    }

    return {
        init: init
    };

})();
