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
        base: '<div class="pulse-mobile-wrapper <%if(this.sponsorFirst){%>pulse-sponsored<%}%>">' +
            '<%if(this.headerScripts) {%>' +
            '<div className="pulse-header-scripts" style="display:none"><%this.headerScripts%></div>'+
            '<%}%>'+
            '<i class="pulse-info-icon"></i><span class="pulse-info-popup">This content is paid for by an advertiser and published by WP BrandStudio. The Washington Post newsroom was not involved in the creation of this content. <a href="http://www.washingtonpost.com/sf/brand-connect/" rel="nofollow" target="_blank">Learn more about WP BrandStudio.</a></span>'+
            '<div class="pulse-mobile-header js-pulse-animate <%if(this.adPosition=="first") {%>closed<%}%>">' +
            '<div class="pulse-article-label">' +
            '<div class="pulse-article-label-text pulse-label-nonsponsor">Washington Post content selected by <% this.sponsorLabel %></div>' +
            '<div class="pulse-article-label-text pulse-label-sponsor">Content from <% this.sponsorLabel %></div>' +
            '</div>' +
            '</div>' +
            '<div class="pulse-mobile slick-slider" id="articles" data-urlparam="<% this.urlParam %>"></div>' +
            '<div class="pulse-mobile-footer pulse-mobile-footer-wrapper js-pulse-animate <%if(this.adPosition=="first") {%>closed<%}%>">' +
            '<div class="pulse-mobile-footer-client-logo">'+
            '<%if(this.sponsorLogo) {%>' +
            '<a href="<% this.clickThruURL %>" class="pulse-mobile-desc-link track-click" data-track="<% this.track_pixel %>" target="_blank">'+
            '<img src="<%this.sponsorLogo%>" alt="" class="pulse-mobile-footer-logo" style="border: 0px; width: <%this.sponsorLogoWidth%>%;">'+
            '</a>'+
            '<%}%>'+
            '</div>' +
            '</div>' +
            '<div class="pulse-tracking-wrapper" style="display:none;">'+
            '<%if(this.trackingScripts) {%>' +
            '<%this.trackingScripts%>'+
            '<%}%>'+
            '</div>' +
            '</div>',

        articles: '<%if(this.showArticles) {%>' +
            '<%for(var index in this.articles) {%>' +
            '<div class="js-pulse-mobile-article pulse-slide swiper-lazy <%if(this.sponsorAll=="true" || this.articles[index].sponsor) {%>slide-sponsor<%}%>" data-background="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&w=300" >' +
            '<div class="pulse-mobile-desc-wrapper">' +
            '<div class="pulse-mobile-desc">' +
            '<a href="<%this.articles[index].url%><%if(!this.articles[index].sponsor){%><%this.url_param%><%}%>" class="pulse-mobile-desc-link track-click" data-track="<% this.client_tracking %>"  target="<% this.linkTarget(index) %>">' +
            '<p class="pulse-mobile-desc-text"><% unescape(this.articles[index].title)%></p>' +
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

        html: '<div data-animate="true" class="pulse-slide pulse-slide--html">' +
            '<%this.ad.html%>' +
            '</div>',

        iframe: '<div data-animate="true" class="pulse-slide pulse-slide--iframe">' +
            '<a href="<% this.clickThruURL %>" data-track="<% this.client_tracking %>" class="track-click" target="_blank" style="width: 300px; height: 250px; position: absolute;"></a>' +
            '<iframe data-src="<%this.ad.src%>" border="0" frameBorder="0" height="250" scrolling="no" width="300" style="border:0"></iframe>' +
            '</div>',

        image: '<div data-animate="true" class="pulse-slide pulse-slide--image">' +
            '<a href="<% this.clickThruURL %>" data-track="<% this.client_tracking %>" class="track-click" target="_blank">' +
            '<%if(this.ad.src) {%>' +
            '<img data-src="<% this.checkImgSrc(this.ad.src) %>" alt="" border="0" style="border:0" />' +
            '<%}%>' +
            '</a>' +
            '</div>',

        video: '<div data-animate="true" class="pulse-slide pulse-slide--video">' +
            '<div class="pulse-player-wrapper" data-videotracking=\'<% this.ad.videoTracking %>\'>' +
            '<i class="pulse-player-play-toggle"></i>' +
            '<i class="pulse-player-volume-toggle"></i>' +
            '<video class="pulse-player" data-current-time="0.25" data-poster="<% this.ad.poster_url %>" <%if(this.ad.autoplay){%>autoplay playsinline<%}%> >' +
            '<%if(this.ad.src) {%>' +
            '<source data-src="<%this.ad.src%>" type="video/mp4" />' +
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
