var PulseAd = (function() {

    var articles = bsAd.articles;
    var articleFeed = bsAd.feedUrl == 'false' ? '' : bsAd.feedUrl ;
    bsAd.headerScripts = bsAd.headerScripts ? Utils.htmlUnescape(bsAd.headerScripts) : '';
    bsAd.trackingScripts = bsAd.trackingScripts ? Utils.htmlUnescape(bsAd.trackingScripts) : '';
    bsAd.sponsorLogo = !bsAd.sponsorLogo.search(/^http[s]?/i) ? bsAd.sponsorLogo : false;
    bsAd.sponsorAll = bsAd.sponsorAll=="true" || bsAd.sponsorAll==true ? true : false;

    //var articles_spoonsored = Utils.filterSponsorContent(articles);
    //console.log(articles);
    //var sponsorAny = articles_spoonsored.length>0 ? true : false;
    //bsAd.sponsorAny = sponsorAny;

    function iniAdBase() {
        if (articleFeed) {
            xmlHttp.get(articleFeed, function(xhr) {
                // initializing slider base template
                articles = JSON.parse(xhr.responseText);
                applyBaseTemplate(articles);
                PulseArticles.init(articles);
            });

        } else if (articles) {
            // initializing slider base template
            articles = JSON.parse(articles);
            applyBaseTemplate(articles);
            PulseArticles.init(articles);
        }
    }

    function applyBaseTemplate(articles) {
        var articles_sponsored = Utils.filterSponsorContent(articles);
        var sponsorAny = articles_sponsored.length>0 ? true : false;
        var sponsorNone = articles_sponsored.length==0 ? true : false;

        bsAd.sponsorAny = sponsorAny;
        bsAd.sponsorNone = sponsorNone;

        var html = Templates.engine(Templates.types['base'],bsAd);
        document.body.insertAdjacentHTML("beforeend", html);
    }

    function applyStyles() {
        styles = Styles["main"];
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
