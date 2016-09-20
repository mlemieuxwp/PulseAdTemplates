var PulseSlides = (function() {

    // Create template for html, iframe, image and video
    var Templates = {
        articles: '<%if(this.showArticles) {%>' +
            '<%for(var index in this.articles) {%>' +
            '<div class="js-pulse-mobile-article <%if(this.articles[index].sponsor && this.articles[index].content_from) {%>slick-sponsor<%}%>">' +
            '<div class="pulse-mobile-desc-wrapper">' +
            '<div class="pulse-mobile-desc">' +
            '<a href="<%this.articles[index].url%><%this.url_param%>" class="pulse-mobile-desc-link" target="_top">' +
            '<%if(this.articles[index].sponsor && this.articles[index].content_from) {%>' +
            '<label class="pulse-mobile-desc-label">' +
            'content from <%this.articles[index].content_from%>' +
            '</label>' +
            '<%}%>' +
            '<p class="pulse-mobile-desc-text"><%this.articles[index].title%></p>' +
            '<p class="pulse-mobile-article-readmore">READ MORE <i class="fa fa-angle-double-right fa-1"></i></p>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '<%if(this.articles[index].src && !this.articles[index].sponsor) {%>' +
            '<img class="pulse-mobile-slide-img" data-lazy="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&w=300">' +
            '<%}%>' +
            '</div>' +
            '<%}%>' +
            '<%} else {%>' +
            '<p>none</p>' +
            '<%}%>',

        html: '<div data-animate="true">' +
            '<%this.ad.html%>' +
            '</div>',

        iframe: '<div data-animate="true">' +
            '<iframe src="<%this.ad.src%>" border="0" frameBorder="0" height="250" scrolling="no" width="300" style="border:0"></iframe>' +
            '</div>',

        image: '<div data-animate="true">' +
            '<%if(this.ad.url) {%>' +
            '<a href="<%this.ad.url%>">' +
            '<%}%>' +
            '<%if(this.ad.src) {%>' +
            '<img src="<%this.ad.src%>" alt="" border="0" style="border:0" />' +
            '<%}%>' +
            '<%if(this.ad.url) {%>' +
            '</a>' +
            '<%}%>' +
            '</div>',

        video: '<div data-animate="true">' +
            '<div class="pulse-player-wrapper" data-videotracking=\'<% this.ad.videoTracking %>\'>' +
            '<i class="fa fa-4x fa-play-circle-o pulse-player-play"></i>' +
            '<i class="fa fa-volume-up pulse-player-volume"></i>' +
            '<video id="pulse-player" class="pulse-player" data-current-time="0.25">' +
            '<source src="<%this.ad.src%>" type="video/mp4" />' +
            '</video>' +
            '</div>' +
            '</div>'
    }



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


    function load() {

        if (document.getElementById('articles')) {

            var articleDiv = document.getElementById('articles');
            var articles = articleDiv.getAttribute('data-articles');
            var shuffle = articleDiv.getAttribute('data-shuffle');
            var url_param = articleDiv.getAttribute('data-urlparam');
            var linkClickPixel = articleDiv.getAttribute('data-clicktrack');
            var sel_articles;
            var rand_articles;
            var pulseTrackingWrapper = document.getElementsByClassName('pulse-tracking-wrapper')[0];

            articles = JSON.parse(articles);

            if (articles) {

                if (shuffle) {
                    sel_articles = shuffleArray(articles).slice(0, 3);
                } else {
                    sel_articles = articles.slice(0, 3);
                    sel_articles.reverse(); //need to reverse to keep article order when we insertBefore below.
                }

                var html = TemplateEngine(Templates['articles'], {
                    articles: sel_articles,
                    showArticles: true,
                    url_param: url_param ? '?spon_con=' + url_param : ''
                });

                // var elem = document.createElement('div');
                // elem.innerHTML = html;

                // for (i = 0; i < elem.childNodes.length;) {
                //     el = elem.childNodes[i];
                //     elem.removeChild(el);
                //     articleDiv.insertBefore(el, articleDiv.firstChild);
                // }


            }


            var ad = articleDiv.getAttribute('data-ad');
            ad = JSON.parse(ad);

            if (ad.type==='video') {
                ad.videoTracking = {};
                ad.videoTracking.trackStart = ad.trackstart || null;
                ad.videoTracking.track25 = ad.track25 || null;
                ad.videoTracking.track50 = ad.track50 || null;
                ad.videoTracking.track75 = ad.track75 || null;
                ad.videoTracking.track100 = ad.track100 || null;
                ad.videoTracking = JSON.stringify(ad.videoTracking);
            }

            if (ad) {
                var adHtml = TemplateEngine(Templates[ad.type], {
                    ad: ad
                });
                html = adHtml + html;
            }

            var elem = document.createElement('div');
            elem.innerHTML = html;

            for (i = 0; i < elem.childNodes.length;) {
                el = elem.childNodes[i];
                elem.removeChild(el);
                articleDiv.insertBefore(el, articleDiv.firstChild);
            }

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

    return {
        load: load
    };

})();

PulseSlides.load();
