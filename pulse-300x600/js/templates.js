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
        base: '<div class="pulse-wrapper <%if(this.sponsorAll) {%>sponsor-all<%}%>">' +
            '<%if(this.headerScripts) {%>' +
            '<div className="pulse-header-scripts" style="display:none"><%this.headerScripts%></div>'+
            '<%}%>'+
            '<div class="pulse-media">' +
            '</div>' +
            '<div id="articles" class="pulse-article-list-wrapper" style="display:none;">' +
            '<%if(this.sponsorAny) {%>' +
            '<div class="pulse-label-sponsor">' +
            '<div class="pulse-article-label-small">Content from <%this.sponsorLabel%></div><i class="pulse-info-icon"></i><span class="pulse-info-popup">This content is paid for by an advertiser and published by WP BrandStudio. The Washington Post newsroom was not involved in the creation of this content. <a href="http://www.washingtonpost.com/sf/brand-connect/" rel="nofollow" target="_blank">Learn more about WP BrandStudio.</a></span>' +
            '</div>' +
            '<%}%>'+
            '<ul id="sponsored-article-list" class="pulse-article-list pulse-sponsor-article-list"></ul>' +
            '<%if(!this.sponsorAll) {%>' +
            '<div class="pulse-article-label">' +
            '<div class="pulse-article-label-small">Washington Post content selected by <%this.sponsorLabel%></div>' +
            '</div>' +
            '<%}%>'+
            '<ul id="article-list" class="pulse-article-list"></ul>' +
            '<%if(this.sponsorLogo && ( this.sponsorAll || this.sponsorNone ) ) {%>' +
            '<div class="pulse-footer">'+
            '<a href="<% this.clickThruURL %>" class="pulse-mobile-desc-link" target="_blank">'+
            '<img src="<%this.sponsorLogo%>" alt="" class="pulse-mobile-footer-logo" style="border: 0px; width: <%this.sponsorLogoWidth%>%;">'+
            '</a>'+
            '</div>' +
            '<%}%>'+
            '</div>' +
            '<div class="pulse-tracking-wrapper" style="display:none;">'+
            '<%if(this.trackingScripts) {%>' +
            '<%this.trackingScripts%>'+
            '<%}%>'+
            '</div>' +
            '</div>',

        articles: '<%if(this.showArticles) {%>' +
            '<%for(var index in this.articles) {%>' +
            '<li class="pulse-article-list-item">' +
            '<div class="pulse-article-wrapper cf">' +
            '<div class="pulse-article-thumb-wrapper">' +
            '<a href="<%this.articles[index].url%><%this.urlParam%>" class="pulse-article-link" target="<% this.linkTarget(index) %>">' +
            '<%if(this.articles[index].src) {%>' +
            '<img src="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&h=61&w=61" border="0" class="pulse-article-thumbnail" />' +
            '<%}%>' +
            '</a>' +
            '</div>' +
            '<div class="pulse-article-number"></div>' +
            '<div class="pulse-article-desc-wrapper">' +
            '<p class="pulse-article-desc">' +
            '<a href="<%this.articles[index].url%><%this.urlParam%>" class="pulse-article-link pulse-article-desc-link" target="<% this.linkTarget(index) %>">' +
            '<% unescape(this.articles[index].title)%>' +
            '</a>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '<%}%>' +
            '<%} else {%>' +
            '<p>none</p>' +
            '<%}%>',

        html: '<div>' +
            '<%this.ad.html%>' +
            '</div>',

        iframe: '<div>' +
            '<a href="<% this.ad.url %>" target="_blank" style="width: 300px; height: 250px; position: absolute;"></a>' +
            '<iframe src="<%this.ad.src%>" border="0" frameBorder="0" height="250" scrolling="no" width="300" style="border:0"></iframe>' +
            '</div>',

        image: '<div>' +
            '<a href="<% this.ad.url %>" target="_blank">' +
            '<%if(this.ad.src) {%>' +
            '<img src="<% this.checkImgSrc(this.ad.src) %>" alt="" border="0" style="border:0" />' +
            '<%}%>' +
            '</a>' +
            '</div>',

        video: '<div>' +
            '<div class="pulse-player-wrapper" data-videotracking=\'<% this.ad.videoTracking %>\'>' +
            '<i class="pulse-player-play-toggle"></i>' +
            '<i class="pulse-player-volume-toggle"></i>' +
            '<video class="pulse-player" data-current-time="0.25" data-poster="<% this.ad.poster_url %>" <%if(this.ad.autoplay){%>autoplay playsinline<%}%> >' +
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

var Styles = {};
