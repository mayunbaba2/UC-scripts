//防止因加载延迟而没有显示(_addMenu.js和 moveButton的)菜单
//重复加载2次，防止第1次未加载成功

(function() {
setTimeout(function() {addMenu.rebuild(true);}, 1000); //1秒
setTimeout(function() {addMenu.rebuild(true);}, 2500);
setTimeout(function() {MyMoveButton.delayRun();}, 2000);//2秒
setTimeout(function() {MyMoveButton.delayRun();}, 3000);//3秒
})();