/**
* A user script for userChrome.js extension.
* @name titlebar-close plus
* @description 右击关闭按钮 重启 ，中键点击 最大化和还原
* @compatibility Firefox 13.0-
* @author nhnhwsnh
* @version
*/
//
var titlebarclose = document.getElementById("titlebar-close");
if (titlebarclose) {
titlebarclose.addEventListener("click", function(event){
if (event.button==2) Application.restart();
if (event.button==1) onTitlebarMaxClick();
}, true);
titlebarclose.setAttribute("context", "");
}