var PulseArticles = (function() {

    var template =
        '<%if(this.showArticles) {%>' +
        '<%for(var index in this.articles) {%>' +
        '<li class="pulse-article-list-item <% this.sponCheck(index) %>">' +
        '<div class="pulse-article-wrapper cf">' +
        '<div class="pulse-article-thumb-wrapper">' +
        '<a href="<%this.articles[index].url%><%this.url_param%>" target="_top">' +
        '<%if(this.articles[index].src) {%>' +
        '<img src="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&h=61&w=61" border="0" class="pulse-article-thumbnail" />' +
        '<%}%>' +
        '</a>' +
        '</div>' +
        '<div class="pulse-article-number"><% this.addOne(index) %></div>' +
        '<div class="pulse-article-desc-wrapper">' +
        '<p class="pulse-article-desc">' +
        '<a href="<%this.articles[index].url%><%this.url_param%>" class="pulse-article-desc-link" target="_top">' +
        '<%if(this.articles[index].sponsor && this.articles[index].content_from) {%>' +
        '<label class="pulse-article-desc-label">' +
        'content from <%this.articles[index].content_from%>' +
        '</label>' +
        '<%}%>' +
        '<%this.articles[index].title%>' +
        '</a>' +
        '</p>' +
        '</div>' +
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
        if (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    }


    function loadArticles() {

        if (document.getElementById('articles')) {

            var articleDiv = document.getElementById('articles');
            var articles = articleDiv.getAttribute('data-articles');
            var shuffle = articleDiv.getAttribute('data-shuffle');
            var url_param = articleDiv.getAttribute('data-urlparam');
            var linkClickPixel = articleDiv.getAttribute('data-clicktrack');
            var sel_articles;
            var rand_articles;
            var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];

            if (articles) {

                articles = JSON.parse(articles);

                if (shuffle) {
                    sel_articles = shuffleArray(articles).slice(0, 3);
                } else {
                    sel_articles = articles.slice(0, 3);
                }

                var html = TemplateEngine(template, {
                    articles: sel_articles,
                    showArticles: true,
                    addOne: function(i) {
                        return parseInt(i, 10) + 1;
                    },
                    sponCheck: function(i) {
                        var classes = '';
                        if (this.articles[i].sponsor && this.articles[i].content_from) {
                            classes = 'sponsor'
                        }
                        return classes;
                    },
                    url_param: url_param ? '?spon_con=' + url_param : ''
                });

                articleDiv.innerHTML = html;

                // Add tracker for clicks
                function clickTrackHandler(link) {
                    link.onclick = function(event) {
                        if (linkClickPixel) {
                            var img = document.createElement("img");
                            img.alt = "";
                            img.border = 0;
                            img.src = linkClickPixel;
                            img.style.width = "1px";
                            img.style.height = "1px";
                            img.style.display = "none";
                            pulseTrackingWrapper.appendChild(img);
                        }
                    };
                };

                if (articleDiv.querySelectorAll) {
                    var links = articleDiv.querySelectorAll("a");
                    for (i = 0; i < links.length; i++) {
                        clickTrackHandler(links[i]);
                    }
                }


            }

        }

    }

    return {
        loadArticles: loadArticles
    };

})();

PulseArticles.loadArticles();
