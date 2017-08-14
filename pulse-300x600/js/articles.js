var PulseArticles = (function() {

    function initArticles(articles) {

        //console.log(articles);

        var linkClickPixel = bsAd.client_tracking;
        var maxLength = bsAd.maxLength || 3;
        var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];
        var pulseMediaContainer = document.getElementsByClassName('pulse-media')[0];
        var selArticles;
        var shuffle = bsAd.shuffle=="true" || bsAd.shuffle==true ? true : false ;
        var sponsorAll = bsAd.sponsorAll || false;
        var urlParam = bsAd.urlParam;
        var ad = bsAd.ad;
        var articlesList =  document.getElementById('article-list');
        var articlesListSponsored =  document.getElementById('sponsored-article-list');
        var articleWrapper =  document.getElementById('articles');

        articles_spoonsored = Utils.filterSponsorContent(articles);
        articles = Utils.removeSponContent(articles);

        var sponsorAny = bsAd.sponsorAny;
        var sponsorNone = bsAd.sponsorNone;

        //console.log(bsAd);

        if (shuffle) {
            selArticles = Utils.shuffleArray(articles).slice(0, maxLength);
        } else {
            selArticles = articles.slice(0, maxLength);
        }

        var html = Templates.engine(Templates.types['articles'], {
            articles: selArticles,
            showArticles: true,
            sponsorAll: sponsorAll,
            client_tracking : bsAd.client_tracking,
            linkTarget: function(i) {
                return sponsorAll || this.articles[i].isSponsorContentEnabled ? '_blank' : '_top';
            },
            urlParam: urlParam ? '?spon_con=' + urlParam : ''
        });

        var html_sponsored = Templates.engine(Templates.types['articles'], {
            articles: articles_spoonsored,
            showArticles: true,
            sponsorAll: sponsorAll,
            client_tracking : bsAd.client_tracking,
            linkTarget: function(i) {
                return sponsorAll || this.articles[i].isSponsorContentEnabled ? '_blank' : '_top';
            },
            urlParam: urlParam ? '?spon_con=' + urlParam : ''
        });

        articlesList.innerHTML = html;
        articlesListSponsored.innerHTML = html_sponsored;

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
        if (ad && ad.type === 'html') {
            ad.snippet = Utils.htmlDecode(ad.snippet);
        }

        if (ad) {
            var adHtml = Templates.engine(Templates.types[ad.type], {
                ad: ad,
                clickThruURL : bsAd.clickThruURL,
                setAdClick: Utils.setAdClick,
                checkImgSrc: Utils.checkImgSrc,
                client_tracking : bsAd.client_tracking
            });
            pulseMediaContainer.innerHTML = adHtml;
        }

        // Tracking
        var trackItems = document.querySelectorAll('.track-click');
        for (var i = 0; i < trackItems.length; i++) {
            var pixel = trackItems[i].getAttribute('data-track');
            trackItems[i].addEventListener('click',function(){
                Utils.trackingPixel(pixel);
            })
        }

    }

    function init(articles) {
            initArticles(articles);
    }

    return {
        init: init
    };

})();
