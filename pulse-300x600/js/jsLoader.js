/**
* AMD lite javascript loader.
* @Author eric.lin@washpost.com
* Usage:
* 1: Added javascript url on the config object.
* 2: Use follow code as starting on your javascript file.
        getScript([
            'jquery'
        ], function() {
            // You code is her
        });
* 3: Remove parent jQuery codes if you don't use parent jQuery object.
**/

(function(global){
    "use strict";
    var
        config = {
            path:{
                'jquery': 'https://www.washingtonpost.com/wp-stat/advertising/PostPulse/js/jquery-1.11.0.min.js'
            },
            shim: {
                // 'slick':{deps: ['jquery']}
            }
        },
        doc = global.document,
        head = doc && (doc.head || doc.getElementsByTagName('head')[0]),
        activeScripts = {};

        /** Get jQuery from parent window. Remove if you don't have parent window. **/
        // if(global.parent.jQuery){
        //     global.$ = global.parent.jQuery;
        //     global.jQuery = global.parent.jQuery;
        // }
        /*******/

        function getScript(scripts, factory){
            var i;
            for(i in scripts){
                loadDeps(scripts[i], factory, i == scripts.length -1 );
            }
        }

        function attachOnload (el, factory, isEnd){
            var onloadfunc = el.onload;
            el.onload = function(){
                onloadfunc();
                if(factory && isEnd){
                    factory();
                }
            };
        }

        function mappingScript(script, factory, isEnd){
            var el = activeScripts[script];
            if(el){
                attachOnload(el, factory, isEnd);
            }else{
                loadScript(script, factory, isEnd);
            }
        }

        function loadDeps(script, factory, isEnd){
            var shim = config.shim[script];
            if(shim && shim.deps.length){
                getScript(shim.deps, function(){
                    loadScript(script, factory, isEnd);
                });
            }else{
                mappingScript(script, factory, isEnd);
            }
        }

        function loadScript(script, factory, isEnd){
            /** Get jQuery from parent window. Remove if you don't have parent window. **/
            // if(global.parent.jQuery && script === 'jquery'){
            //     if(isEnd){
            //         factory();
            //     }
            //     return;
            // }
            /********/
            var el = document.createElement('script');
            el.type = 'text/javascript';

            function process (ev) {
                delete activeScripts[script];
                el.onload = el.onreadystatechange = el.onerror = '';
                if(factory && isEnd) {
                    factory();
                }
            }
            function fail (e) {
                throw new Error('Syntax or http error: ' + script);
            }

            el.onload = el.onreadystatechange = process;
            el.onerror = fail;
            el.charset = 'utf-8';
            activeScripts[script] = el;
            el.src = config.path[script]? config.path[script] : script;
            head.appendChild(el);
            return el;
        }

        global.getScript = getScript;
}(this.window || (typeof global != 'undefined' && global) || this));