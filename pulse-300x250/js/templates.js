// Templates for articles, html, iframe, image and video
var Templates = (function() {

    // Javascript template engine by http://krasimirtsonev.com/
    function engine(html, options) {
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

    var types = {
        articles: '<%if(this.showArticles) {%>' +
            '<%for(var index in this.articles) {%>' +
            '<div class="js-pulse-mobile-article <%if(this.sponsorAll || this.articles[index].sponsor) {%>slick-sponsor<%}%>">' +
            '<div class="pulse-mobile-desc-wrapper">' +
            '<div class="pulse-mobile-desc">' +
            '<a href="<%this.articles[index].url%><%this.url_param%>" class="pulse-mobile-desc-link" target="<% this.linkTarget(index) %>">' +
            '<p class="pulse-mobile-desc-text"><%this.articles[index].title%></p>' +
            '<p class="pulse-mobile-article-readmore">READ MORE <i class="fa fa-angle-double-right fa-1"></i></p>' +
            '</a>' +
            '</div>' +
            '<span class="pulse-mobile-logo"></span>' +
            '</div>' +
            '<img class="pulse-mobile-slide-img" data-lazy="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&w=300">' +
            '</div>' +
            '<%}%>' +
            '<%} else {%>' +
            '<p>none</p>' +
            '<%}%>',

        html: '<div data-animate="true">' +
            '<%this.ad.html%>' +
            '</div>',

        iframe: '<div data-animate="true">' +
            '<iframe src="<%this.ad.src%>?clickTag=<% this.setAdClick(this.ad.url) %>" border="0" frameBorder="0" height="250" scrolling="no" width="300" style="border:0"></iframe>' +
            '</div>',

        image: '<div data-animate="true">' +
            '<a href="<% this.setAdClick(this.ad.url) %>" target="_blank">' +
            '<%if(this.ad.src) {%>' +
            '<img src="<% this.checkImgSrc(this.ad.src) %>" alt="" border="0" style="border:0" />' +
            '<%}%>' +
            '</a>' +
            '</div>',

        video: '<div data-animate="true">' +
            '<div class="pulse-player-wrapper" data-videotracking=\'<% this.ad.videoTracking %>\'>' +
            '<i class="fa fa-4x fa-play-circle-o pulse-player-play"></i>' +
            '<i class="fa fa-volume-up pulse-player-volume"></i>' +
            '<video id="pulse-player" class="pulse-player" data-current-time="0.25" poster="<% this.ad.poster_url %>">' +
            '<%if(this.ad.src) {%>' +
            '<source src="<%this.ad.src%>" type="video/mp4" />' +
            '<%}%>' +
            '</video>' +
            '</div>' +
            '</div>'
    }

    return {
        engine: engine,
        types: types
    };


})();
