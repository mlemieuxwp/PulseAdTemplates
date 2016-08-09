var PulseArticles = (function() {

    var template =
        '<%if(this.showArticles) {%>' +
        '<%for(var index in this.articles) {%>' +
        '<li class="pulse-article-list-item">' +
        '<div class="pulse-article-thumb-wrapper">' +
        '<a href="<%this.articles[index].url%>" target="_top">' +
        '<img src="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&h=60&w=60" border="0" class="pulse-article-thumbnail" />' +
        '</a>' +
        '</div>' +
        '<div class="pulse-article-number"><% this.addOne(index) %></div>' +
        '<div class="pulse-article-desc-wrapper">' +
        '<p class="pulse-article-desc">' +
        '<a href="<%this.articles[index].url%>" class="pulse-article-desc-link" target="_top">' +
        '<%this.articles[index].title%>' +
        '</a>' +
        '</p>' +
        '</div>' +
        '</li>' +
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
            rand_articles = shuffleArray(articles);
            sel_articles = rand_articles.slice(1, 4);

            var html = TemplateEngine(template, {
                articles: sel_articles,
                showArticles: true,
                addOne: function(i) {
                    return parseInt(i, 10) + 1;
                }
            });

            var elem = document.createElement('ul');
            elem.className = 'pulse-article-list';
            elem.innerHTML = html;

            articleDiv.parentNode.insertBefore(elem, articleDiv);

            var parent = articleDiv.parentNode;
            parent.removeChild(articleDiv);

        }

    }

    return {
        loadArticles: loadArticles
    };

})();

PulseArticles.loadArticles();
