// ==UserScript==
// @name           delayLoad.uc
// @namespace      delayLoad.xinggsf
// @description    延时加载FX扩展
// @include        chrome://browser/content/browser.xul
// @updateURL      https://raw.githubusercontent.com/xinggsf/uc/master/delayLoad.uc.js
// @compatibility  Firefox 34+
// @author         modify by xinggsf
// @version        2016.5.11
// ==/UserScript==
 
Cu.import("resource://gre/modules/AddonManager.jsm");
let timer, addons = [
    'jid0-DWmY4qIv4boTb7ebF9QVCAmlAu5@jetpack',//下载助手
    //'inspector@mozilla.org',//元素查看
    //'{e4a8a97b-f2ed-450b-b12d-ee082ba24781}',//油猴子
    //'{888d99e7-e8b5-46a3-851e-1ec45da1e644}',//定时重载网页
    //'lmnPopVideo@lshai.com',//视频独立窗口播放
    'jid1-cwbvBTE216jjpg@jetpack',//YouTube插件
];
 
function toggleDelay(disable) {
    for(let id of addons)
        AddonManager.getAddonByID(id, a => {
            //console.log(this, 'a.userDisabled :', a.userDisabled);
            a.userDisabled = disable;
        });
}
 
timer && clearTimeout(timer);
//启用 延迟加载扩展
timer = setTimeout(() => toggleDelay(!1), 1500);
 
window.addEventListener("unload", () => {
    if (!Application.windows.length) toggleDelay(true);
}, !1);