var PulseArticles = (function() {

    function initArticles(articles) {

        //console.log(articles);

        var linkClickPixel = bsAd.client_tracking;
        var maxLength = bsAd.maxLength || 3;
        var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];
        var pulseMediaContainer = document.getElementsByClassName('pulse-media')[0];
        var selArticles;
        var shuffle = bsAd.shuffle;
        var sponsorAll = bsAd.sponsorAll || false;
        var urlParam = bsAd.urlParam;
        var ad = bsAd.ad;
        var articlesList =  document.getElementById('article-list');
        var articlesListSponsored =  document.getElementById('sponsored-article-list');
        var articleWrapper =  document.getElementById('articles');

        articles_spoonsored = Utils.filterSponsorContent(articles);
        articles = Utils.removeSponContent(articles);

        if (shuffle) {
            selArticles = Utils.shuffleArray(articles).slice(0, maxLength);
        } else {
            selArticles = articles.slice(0, maxLength);
        }

        var html = Templates.engine(Templates.types['articles'], {
            articles: selArticles,
            showArticles: true,
            sponsorAll: sponsorAll,
            linkTarget: function(i) {
                return sponsorAll || this.articles[i].sponsor ? '_blank' : '_top';
            },
            urlParam: urlParam ? '?spon_con=' + urlParam : ''
        });

        var html_sponsored = Templates.engine(Templates.types['articles'], {
            articles: articles_spoonsored,
            showArticles: true,
            sponsorAll: sponsorAll,
            linkTarget: function(i) {
                return sponsorAll || this.articles[i].sponsor ? '_blank' : '_top';
            },
            urlParam: urlParam ? '?spon_con=' + urlParam : ''
        });

        articlesList.innerHTML = html;
        articlesListSponsored.innerHTML = html_sponsored;

        if (articleWrapper.querySelectorAll) {
            var links = articleWrapper.querySelectorAll("a");
            for (i = 0; i < links.length; i++) {
                Utils.clickTrackHandler(links[i],linkClickPixel,pulseTrackingWrapper);
            }
        }

        articleWrapper.style.display = "block";
        Utils.setArticleNum();

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
            pulseMediaContainer.innerHTML = adHtml;
        }


    }


    function init(articles) {
            initArticles(articles);
    }

    return {
        init: init
    };

})();
