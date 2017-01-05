// ==UserScript==
// @name           RemovableButton.uc.js
// @namespace   1518290217@qq.com
// @description    自定义可移动按钮
// @author          RunningCheese
// @license          MIT License
// @compatibility  Firefox 29+
// @charset         UTF-8
// ==/UserScript==
//------------重新启动------------
(function () {
	CustomizableUI.createWidget({
		id : "ReStartBtn",
		defaultArea : CustomizableUI.AREA_NAVBAR,
		label : "重启",
		tooltiptext : "左键：重新启动\n右键：重新启动并清除缓存",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				// 左键：重新启动
				Application.restart();
				break;
			case 1:
				// 中键：
       
			case 2:
				// 右键：重新启动并清除缓存
        event.preventDefault();
        userChromejs.rebuild();
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#ReStartBtn[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABj0lEQVQ4jY2TMWtUURCFr01C/oD+gWchz5AUgeUteGe+U6mwjSAWIVYWsZL8kEiEjVm1tLSzFrQXbDRqQsAqlY0QDKzJuhbOLm8vWXHgFve9cw5n5p5JqShgBRgAR5LOgVNJB8Bzd18t8dOqqmoR6EsaSRrPOSPgaVVVizPkuq4XgDcBGkracfe1nPM14I67b0p6CZxJGgNv67peaNveDfJxznm59f29pH0z65lZD7gPfA/s3gRUR69nQKftbGJ9ImBmPUkPgd+SRu5+PQGPA/iinMtFAiHyOv7tJOBjXPS/AsBWzOJTkvRD0rjT6VyZJ9A6++FgIwROpgLdbvdywb8k6UMh8LktIGk4bcHMbrTZ7l65+83Svpn13P1ROPiSgO247LbJwO2LyOHgVXuItaRzSUN3X805XzWzW/PI7v4g8H+fMbLQDxffJN39B/mepOOZIJVRBk6AJ+6+XiSwH4s1Bt7NRDmllJqmWQIGxTINgV/FMg2aplkqn3xaOedlSXuSDqPXn8BX4BmwUuL/AFIFDai8yv1/AAAAAElFTkSuQmCC)'
		 + '}}'
     + '#ReStartBtn[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #ReStartBtn .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABj0lEQVQ4jY2TMWtUURCFr01C/oD+gWchz5AUgeUteGe+U6mwjSAWIVYWsZL8kEiEjVm1tLSzFrQXbDRqQsAqlY0QDKzJuhbOLm8vWXHgFve9cw5n5p5JqShgBRgAR5LOgVNJB8Bzd18t8dOqqmoR6EsaSRrPOSPgaVVVizPkuq4XgDcBGkracfe1nPM14I67b0p6CZxJGgNv67peaNveDfJxznm59f29pH0z65lZD7gPfA/s3gRUR69nQKftbGJ9ImBmPUkPgd+SRu5+PQGPA/iinMtFAiHyOv7tJOBjXPS/AsBWzOJTkvRD0rjT6VyZJ9A6++FgIwROpgLdbvdywb8k6UMh8LktIGk4bcHMbrTZ7l65+83Svpn13P1ROPiSgO247LbJwO2LyOHgVXuItaRzSUN3X805XzWzW/PI7v4g8H+fMbLQDxffJN39B/mepOOZIJVRBk6AJ+6+XiSwH4s1Bt7NRDmllJqmWQIGxTINgV/FMg2aplkqn3xaOedlSXuSDqPXn8BX4BmwUuL/AFIFDai8yv1/AAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();
//------------Profiles------------
(function () {
	CustomizableUI.createWidget({
		id : "ProfilesButton",
		defaultArea : CustomizableUI.AREA_NAVBAR,
		label : "配置文件夹",
		tooltiptext : "左键：打开配置文件夹\n中键：打开油猴文件夹\n右键：打开UC文件夹",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				// 左键：打开配置文件夹
       var canvas = Components.classes["@mozilla.org/file/directory_service;1"].	getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();
return file;
				break;
			case 1:
				// 中键：打开油猴文件夹
        event.preventDefault(); 
var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile);
file.appendRelativePath("gm_scripts"); 
file.launch();
	   break;
			case 2:
				// 右键：打开UC文件夹
     event.preventDefault();
     var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
       return file;
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
	   + '#ProfilesButton[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAr0lEQVQ4ja2SwQ2DMAxF3wJMwwJdoAsxAyN0At975laIBKcu1EPtKjEOBKlf+iLE0dOPY/ijBkAqHoO9nUZgVb/V9i/Z2ur3WpIeSOr+oB7VmIIEUyvACgJsagkOnwIGd4VE2Z9qD/IEqwMI8OLkFezwAjz1myihhzLABtyALkjVBHhQDtBlQD40QgwQYK4BeucaYJcon0Bv/wq2LtTx7bxPsGhtzq7mp7OAtOz99AG3RFyDP0yc7gAAAABJRU5ErkJggg==)'
		 + '}}'
     + '#ProfilesButton[cui-areatype="menu-panel"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAr0lEQVQ4ja2SwQ2DMAxF3wJMwwJdoAsxAyN0At975laIBKcu1EPtKjEOBKlf+iLE0dOPY/ijBkAqHoO9nUZgVb/V9i/Z2ur3WpIeSOr+oB7VmIIEUyvACgJsagkOnwIGd4VE2Z9qD/IEqwMI8OLkFezwAjz1myihhzLABtyALkjVBHhQDtBlQD40QgwQYK4BeucaYJcon0Bv/wq2LtTx7bxPsGhtzq7mp7OAtOz99AG3RFyDP0yc7gAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();