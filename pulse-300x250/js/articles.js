var PulseArticles = (function() {

    var template =
        '<%if(this.showArticles) {%>' +
        '<%for(var index in this.articles) {%>' +
        '<div>' +
        '<div class="pulse-mobile-desc-wrapper">' +
        '<div class="pulse-mobile-desc">' +
        '<a href="<%this.articles[index].url%>" class="pulse-mobile-desc-link" target="_top">' +
        '<p class="pulse-mobile-desc-text"><%this.articles[index].title%></p>' +
        '<p class="pulse-mobile-article-readmore">READ MORE <i class="fa fa-angle-double-right fa-1"></i></p>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '<%if(this.articles[index].src) {%>' +
        '<img class="pulse-mobile-slide-img" data-lazy="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&w=300">' +
        '<%}%>' +
        '</div>' +
        '<%}%>' +
        '<%} else {%>' +
        '<p>none</p>' +
        '<%}%>';


    // Javascript template engine by http://krasimirtsonev.com/
    function TemplateEngine(html, options) {
        var re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0,
            match;
        var add = function(line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


    function loadArticles() {

        if (document.getElementById('articles')) {

            var articleDiv = document.getElementById('articles');
            var articles = articleDiv.getAttribute('data-articles');
            var shuffle = articleDiv.getAttribute('data-shuffle');
            var sel_articles;
            var rand_articles;

            articles = JSON.parse(articles);

            if (shuffle) {
                rand_articles = shuffleArray(articles);
                sel_articles = rand_articles.slice(1, 4);
            } else {
                sel_articles = articles;
            }

            // while (articleDiv.firstChild) {
            //     articleDiv.removeChild(articleDiv.firstChild);
            // }

            var html = TemplateEngine(template, {
                articles: sel_articles,
                showArticles: true
            });

            var elem = document.createElement('div');
            elem.innerHTML = html;

            for (i = 0; i < elem.childNodes.length;) {

                el = elem.childNodes[i];
                elem.removeChild(el);
                articleDiv.insertBefore(el, articleDiv.firstChild);
            
            }


            // var parent = articleDiv.parentNode;
            // parent.removeChild(articleDiv);

        }
    }

    return {
        loadArticles: loadArticles
    };

})();

PulseArticles.loadArticles();
