var xmlHttp = (function() {

    var XMLHttpFactories = [
        function() {
            return new XMLHttpRequest()
        },
        function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        },
        function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        },
        function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    ];

    function createXMLHTTPObject() {
        var xmlhttp = false;
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try { xmlhttp = XMLHttpFactories[i](); } catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }

    function get(url, callback) {
        var req = createXMLHTTPObject();
        if (!req) return;
        req.open("GET", url, true);
        req.onreadystatechange = function() {
            if (req.readyState != 4) {
                return;
            }
            if (req.status != 200 && req.status != 304) {
                return;
            }
            callback(req);
        }
        req.send();
    }

    return {
        get: get
    };


})();
