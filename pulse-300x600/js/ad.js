var PulseAd = (function() {

    var articles = bsAd.feedUrl || bsAd.articles;
    var articleFeed = bsAd.feedUrl;

    function iniAdBase() {
        if (articleFeed) {
            xmlHttp.get(articleFeed, function(xhr) {
                // initializing slider base template
                articles = JSON.parse(xhr.responseText);
                applyBaseTemplate(articles);
                // initializing slides
                //PulseSlides.init(articles);
            });

        } else if (articles) {
            // initializing slider base template
            articles = JSON.parse(articles);
            applyBaseTemplate(articles);
            // initializing slides
            //PulseSlides.init(articles);
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
