var PulseAd = (function() {

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
