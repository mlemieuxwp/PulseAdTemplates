var PulseAd = (function() {

    // if there's atleast one sponsored article
    var sponsorAny = false;
    // if the first article is sponsored
    var sponsorFirst = false;

    var articles = bsAd.articles;
    var articleFeed = bsAd.feedUrl == 'false' ? '' : bsAd.feedUrl ;
    bsAd.headerScripts = bsAd.headerScripts ? Utils.htmlUnescape(bsAd.headerScripts) : '';
    bsAd.trackingScripts = bsAd.trackingScripts ? Utils.htmlUnescape(bsAd.trackingScripts) : '';


    function iniAdBase() {
        if (articleFeed) {
            xmlHttp.get(articleFeed, function(xhr) {
                // initializing slider base template
                articles = JSON.parse(xhr.responseText);
                applyBaseTemplate(articles);
                // initializing slides
                PulseSlides.init(articles);
            });

        } else if (articles) {
            // initializing slider base template
            articles = JSON.parse(articles);
            applyBaseTemplate(articles);
            // initializing slides
            PulseSlides.init(articles);
        }
    }

    function applyBaseTemplate(articles) {

        if ( articles[0] != undefined && articles[0].sponsor == 'true' ) {
            sponsorFirst = true;
        }
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].sponsor){
                sponsorAny = true;
            }
        }

        bsAd.sponsorAny = sponsorAny;
        bsAd.sponsorFirst = sponsorFirst;

        var html = Templates.engine(Templates.types['base'],bsAd);
        document.body.insertAdjacentHTML("beforeend", html);
    }

    function applyStyles() {
        var styles = Styles["main"];
        Utils.appendStyle(styles, document);
    }

    function init() {
        iniAdBase();
        applyStyles();
    }

    return {
        init: init
    };

})();
