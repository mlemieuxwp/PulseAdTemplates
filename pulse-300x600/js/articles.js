var PulseArticles = (function() {

    function loadArticles(articlesElem) {

        if (articlesElem) {

            var articles = articlesElem.getAttribute('data-articles');
            var articleFeed = articlesElem.getAttribute('data-feed');
            var linkClickPixel = articlesElem.getAttribute('data-clicktrack');
            var maxLength = articlesElem.getAttribute('data-maxlength') || 3;
            var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];
            var selArticles;
            var shuffle = articlesElem.getAttribute('data-shuffle');
            var sponsorAll = articlesElem.getAttribute('data-sponsorall') || false;
            var urlParam = articlesElem.getAttribute('data-urlparam');
            function initArticles(articles) {

                articles = JSON.parse(articles);

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

                articlesElem.innerHTML = html;

                if (articlesElem.querySelectorAll) {
                    var links = articlesElem.querySelectorAll("a");
                    for (i = 0; i < links.length; i++) {
                        Utils.clickTrackHandler(links[i],linkClickPixel,pulseTrackingWrapper);
                    }
                }

                Utils.setArticleNum();

            }

            if (articleFeed) {

                xmlHttp.get(articleFeed, function(xhr) {
                    initArticles(xhr.responseText);
                });

            } else if (articles) {

                initArticles(articles);

            }

        }

    }

    function init() {

        var articleWrapper = document.getElementById('articles');
        var articles = document.getElementsByClassName('pulse-article-list');
        var i = articles.length;

        while (i--) {
            loadArticles(articles[i]);
        }

        articleWrapper.style.display = 'block';

    }

    return {
        init: init
    };

})();

PulseArticles.init();
