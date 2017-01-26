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
            '<li class="pulse-article-list-item">' +
            '<div class="pulse-article-wrapper cf">' +
            '<div class="pulse-article-thumb-wrapper">' +
            '<a href="<%this.articles[index].url%><%this.urlParam%>" class="pulse-article-link" target="<% this.linkTarget(index) %>">' +
            '<%if(this.articles[index].src) {%>' +
            '<img src="https://img.washingtonpost.com/wp-apps/imrs.php?src=<%this.articles[index].src%>&h=61&w=61" border="0" class="pulse-article-thumbnail" />' +
            '<%}%>' +
            '</a>' +
            '</div>' +
            //'<div class="pulse-article-number"><% this.addOne(index) %></div>' +
            '<div class="pulse-article-number"></div>' +
            '<div class="pulse-article-desc-wrapper">' +
            '<p class="pulse-article-desc">' +
            '<a href="<%this.articles[index].url%><%this.urlParam%>" class="pulse-article-link pulse-article-desc-link" target="<% this.linkTarget(index) %>">' +
            '<%this.articles[index].title%>' +
            '</a>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</li>' +
            '<%}%>' +
            '<%} else {%>' +
            '<p>none</p>' +
            '<%}%>'

    }

    return {
        engine: engine,
        types: types
    };


})();
