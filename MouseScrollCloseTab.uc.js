// ==UserScript==
// @name           mousescroll-closetab
// @namespace      zhaibr@163.com
// @description    鼠标悬停标签滚轮上下关闭该标签
// @version        1.2012.1126.1
// @include        chrome://browser/content/browser.xul
// @updateURL      https://j.mozest.com/ucscript/script/87.meta.js
// ==/UserScript==
 var time = 1;
 gBrowser.mTabContainer.addEventListener('DOMMouseScroll', function(event) {
   if (event.target.localName == "tab"){
     if(time){
       gBrowser.removeTab(event.target);
       event.stopPropagation();
       event.preventDefault();
       time = 0;
       setTimeout('time=1',400);
     }
   }
 }, true);