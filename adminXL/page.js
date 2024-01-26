/**
 * *******************************
 * adminXL - 这里禁止改动
 * *******************************
 */
import { config } from '../config.js';
if(sessionStorage.adminTab !== undefined) config.tab = sessionStorage.adminTab == 'true' ? true : false;
if (!config.tab) {
    window.location.href = config.host + '?__path=' + encodeURIComponent((window.location.pathname + window.location.search).slice(config.host.length));
}
var loadJsX = function(options) {
    var script = document.createElement('script');
    if(options.type) script.type = options.type;
    if(options.code){
        script.innerHTML = options.code;
        document.head.appendChild(script);
        options.callback && options.callback();
    }else{
        var s = document.getElementsByTagName('script');
        for(var i=0;i<s.length;i++){
            if(s[i].src && s[i].src.indexOf(options.src) !== -1){
                return options.callback && options.callback();
            }
        }
        script.src = options.src;
        script.onload = function() {
            options.callback && options.callback();
        };
        document.head.appendChild(script);
    }
};
var loadJs = function(callback) {
    var script = document.getElementsByTagName('script');
    var jsObj = [];
    for(var i=0;i<script.length;i++){
        if (script[i].getAttribute('data-page') != 'true') {
            jsObj.push({
                src: script[i].src.length ? 1 : 0,
                type: script[i].type,
                content: script[i].src.length ? script[i].src : script[i].innerHTML,
            })
        }
    }
    !function runJs(fn, i = 0) {
        if (i < jsObj.length) {
            var s = jsObj[i++];
            var p = {
                type: s.type,
                callback() {
                    runJs(fn, i);
                }
            };
            if (s.src) {
                //如果已存在该js，删掉重建，不然不执行里面的代码
                for(var a=0;a<script.length;a++){
                    if (script[a].src == s.content && script[a].parentNode)script[a].parentNode.removeChild(script[a])
                }
                p.src = s.content;
            }else{
                p.code = s.content;
            }
            //重建js
            loadJsX(p)
        } else {
            fn && fn();
        }
    }(callback, 0);
}

//设置标题
adminTab.setTitle(document.getElementsByTagName('title')[0].innerHTML);
//加载框架css和js
for(var el of window.top.document.head.children){
    if(el.tagName == 'LINK' || el.tagName == 'STYLE' || el.tagName == 'SCRIPT'){
        var obj = el.cloneNode();
        obj.innerHTML = el.innerHTML;
        document.head.appendChild(obj);
    }
}
// document.head.innerHTML += window.top.document.head.innerHTML;
window.addEventListener('load', function () {
    document.body.className = 'adminXL-tab-body';
    var content = document.getElementsByClassName('adminXL-content');
    if (content.length && content[0].tagName == 'TEMPLATE') {
        var div = document.createElement('div');
        div.className = 'adminXL-content';
        div.innerHTML = content[0].innerHTML;
        document.body.appendChild(div);
    }
    loadJs(function(){
        ui.init();
        if(window.top.adminXLCallback){
            var fn = ice.obj2str(window.top.adminXLCallback);
            eval(`!${fn}()`);
        }
    });
}, false);
