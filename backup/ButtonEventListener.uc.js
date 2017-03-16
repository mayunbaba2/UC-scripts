// ==UserScript==
// @name           ButtonEventListener.uc.js
// @description    为工具栏图标增加点击功能
// @author          runningcheese
// @reference       zbinlin, skofkyo, 小蛐蛐
// @update         2017-02-09
// @license          MIT License
// @compatibility  Firefox 29+
// @charset         UTF-8
// @reviewURL     http://www.runningcheese.com
// ==/UserScript==



// 自动恢复地址栏地址显示
if (location == "chrome://browser/content/browser.xul") {
    var ub = document.getElementById("urlbar");
    ub.addEventListener("blur", function () {
        this.handleRevert();
    }, false);
}


//左键点击书签后不关闭菜单 
//location == "chrome://browser/content/browser.xul" && //document.querySelector("#personal-bookmarks").addEventListener("mouseover", function (event) {
//event.originalTarget.classList.contains("bookmark-item") && event.originalTarget.setAttribute('closemenu', "none")
//}, true);


//GM 中键切换开关不关闭下拉菜单
eval('GM_popupClicked = ' + GM_popupClicked.toString().replace(/\'command\' \=\= aEvent\.type/, "$& \|\| aEvent\.button \=\= 1").replace(/\=\! script\.enabled\;\n/, "$&aEvent.target.setAttribute('checked',script.enabled);\n").replace(/closeMenus/, "if(aEvent\.button \!\= 1) $&"));


//stylish 中键切换开关不关闭下拉菜单和右键直接打开编辑
eval("stylishOverlay.popupShowing = " + stylishOverlay.popupShowing.toString().replace(/menuitem\.addEventListener.*/, '\
menuitem.addEventListener("click", function(event) {\
if(event.button != 2) {\
stylishOverlay.toggleStyle(this.stylishStyle);\
event.target.setAttribute("checked",this.stylishStyle.enabled);\
event.stopPropagation();\
}else{\
stylishCommon.openEditForStyle(this.stylishStyle);\
closeMenus(this);\
event.preventDefault();\
}\
}, false);'));


//显示下载速度
(function() {
    eval("DownloadsViewItem.prototype._updateProgress = " + DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
})();


//移动添加书签图标到地址栏
location == 'chrome://browser/content/browser.xul' && (function () {
	var uIcon = document.getElementById('urlbar-icons'),
		bmbtn = document.getElementById('bookmarks-menu-button');
	if (!bmbtn) return;
uIcon.appendChild(bmbtn);
})();

//移动RSS图标到地址栏
location == 'chrome://browser/content/browser.xul' && (function () {
	var uIcon = document.getElementById('urlbar-icons'),
		bmbtn = document.getElementById('feed-button');
	if (!bmbtn) return;
uIcon.appendChild(bmbtn);
})();


	//右键  GM图标  切换  GM状态
	(function(doc) {
		var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
		if (!greasemonkeyTBB) return;
		var menupopup = greasemonkeyTBB.firstChild;
		greasemonkeyTBB.addEventListener("click", function(e) {
			if (e.button == 2) {
				e.preventDefault();
				GM_util.setEnabled(!GM_util.getEnabled());
				GM_BrowserUI.refreshStatus();
			}
		}, false);
	})(document);


	//右键  记事本图标  在侧边栏中打开
	(function(doc) {
		var quicknotebuttonSB = doc.getElementById('quicknote-button');
		if (!quicknotebuttonSB) return;
		var menupopup = quicknotebuttonSB.firstChild;
		quicknotebuttonSB.addEventListener("click", function(e) {
			if (e.button == 2) {
				e.preventDefault();
				QNover.openQNFloat();
			}
		}, false);
	})(document);



	//右键  Pocket图标 在侧边栏中打开Pocket
	(function(doc) {
		var Openpocketonlielist = doc.getElementById('RIL_toolbar_button');
		if (!Openpocketonlielist) return;
		var menupopup = Openpocketonlielist.firstChild;
		Openpocketonlielist.addEventListener("click", function(e) {
			if (e.button == 2) {
				e.preventDefault();
				openWebPanel('稍后阅读', 'chrome://isreaditlater/content/list.xul');
			}
		}, false);
	})(document);

	//左键Identity-Box图标 弹出 EvernoteCleary
	(function(doc) {
		var Evernotcleary = doc.getElementById('identity-box');
		if (!Evernotcleary) return;
		var menupopup = Evernotcleary.firstChild;
		Evernotcleary.addEventListener("click", function(event) {
			if (event.button == 0) {
				event.preventDefault();
				ReaderParent.toggleReaderMode(event);
			}
		}, false);
	})(document);


	//右键Identity-Box图标 弹出 选项菜单
	(function() {

		var faviconContextMenu = {

			init: function() {
				this.additem();
				//$("identity-box").setAttribute("context", "faviconContextMenu");
				//$("notification-popup-box").setAttribute("context", "faviconContextMenu");
				$("urlbar").setAttribute("context", "faviconContextMenu");
				$("urlbar").setAttribute('class', 'menu-iconic');
			},

			additem: function() {
				var mp = $C("menupopup", {
					id: "faviconContextMenu",
				});
				$('mainPopupSet').appendChild(mp);
				var menues = [
          {
					label: "地址根目录",
					oncommand:function() { gBrowser.loadURI("javascript:document.location.href=window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/'");},
				},
          {
					label: "地址上一层",
					oncommand:function() { gBrowser.loadURI("javascript:window.location.href=window.location.href.substring(0,window.location.href.substring(0,window.location.href.length-1).lastIndexOf('/')+1);");},
				},{
					label: "http转https",
					oncommand:function() { gBrowser.loadURI("javascript:(function(){document.location.href=document.location.href.replace('http:','https:')})();");},
				},{
					label: "生成短网址",
          tooltiptext: "已复制到粘贴板",
					oncommand: "SinaShortURL();",
				},{
					label: "生成二维码",
					oncommand: function() { gBrowser.loadURI("javascript:(function(){if(document.getElementById){var%20x=document.body;var%20o=document.createElement('script');if(typeof(o)!='object')%20o=document.standardCreateElement('script');o.setAttribute('src','https://git.oschina.net/runningcheese/JiathisQR.js/raw/master/jiathisqr.js');o.setAttribute('type','text/javascript');x.appendChild(o);}})();");},
				},{
					label: "IP地址查询",
					oncommand: "gBrowser.addTab('http://ip.chinaz.com/' + decodeURIComponent(gBrowser.currentURI.spec));",
				}, {
					label: "sep",
				}, {
					label: "查看页面信息",
					oncommand: "BrowserPageInfo();",
        }, {
					label: "一键站长工具",
          tooltiptext: "包括SEO,Alexa,Whois,Builtwhith查询",
					oncommand: function () {var eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService); gBrowser.addTab('http://seo.chinaz.com/?q=' + decodeURIComponent(gBrowser.currentURI.spec)); gBrowser.addTab('http://www.alexa.com/siteinfo/' + decodeURIComponent(gBrowser.currentURI.spec)); gBrowser.addTab('http://whois.chinaz.com/' + eTLDService.getBaseDomain(makeURI(gBrowser.selectedBrowser.currentURI.spec)));}
				}, {
					label: "谷歌缓存查询",
					oncommand: "gBrowser.addTab('https://webcache.googleusercontent.com/search?q=cache:' + decodeURIComponent(gBrowser.currentURI.spec));",
				}, {
					label: "搜索共享帐号",
					oncommand: function () {var eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService); gBrowser.addTab('http://bugmenot.com/view/' + eTLDService.getBaseDomain(makeURI(gBrowser.selectedBrowser.currentURI.spec)))}
				}, {
					label: "sep",
				}, {
					label: "复制图标地址",
					oncommand: "faviconContextMenu.Copy(gBrowser.selectedTab.image);",
				}, {
					label: "复制图标编码",
					oncommand: "faviconContextMenu.toBase64(gBrowser.selectedTab.image);",
				}, ];
				var i, item, menue;
				for (i = 0; i < menues.length; i++) {
					menue = menues[i];
					if (menue.label == "sep") {
						item = $C('menuseparator');
					} else {
						item = $C('menuitem', {
							label: menue.label,
							class: "menuitem-iconic",
							oncommand: menue.oncommand,
						});
					}
					mp.appendChild(item);
				}
			},

			//command命令指定   

			Copy: function(string) {
				Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(string);
			},

			toBase64: function(icon) {
				const NSURI = "http://www.w3.org/1999/xhtml";
				var img = new Image();
				var that = this;
				img.onload = function() {
					var width = this.naturalWidth,
						height = this.naturalHeight;
					var canvas = document.createElementNS(NSURI, "canvas");
					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(this, 0, 0);
					that.Copy(canvas.toDataURL("image/png"));
				};
				img.onerror = function() {
					Components.utils.reportError("Count not load: " + icon);
				};
				img.src = icon;
			},

		};

		faviconContextMenu.init();
		window.faviconContextMenu = faviconContextMenu;

		function $(id) document.getElementById(id);

		function $C(name, attr) {
			var el = document.createElement(name);
			if (attr) Object.keys(attr).forEach(function(n) {
				if (typeof attr[n] === 'function') {
					el.setAttribute(n, '(' + attr[n].toSource() + ').call(this, event);');
				} else {
					el.setAttribute(n, attr[n]);
				}
			});
			return el;
		}
	}());


	//右键  地址栏刷新图标 强制刷新页面（跳过缓存）
	(function() {
		var UndoClosedTabs = document.getElementById('urlbar-reload-button');
		if (!UndoClosedTabs) return;
		UndoClosedTabs.addEventListener("click", function(event) {
			if (event.button == 2) {
				event.preventDefault();
				BrowserReloadSkipCache();
			}
		}, false);
	})();



//右键 新建标签按钮访问剪切板内容
location=="chrome://browser/content/browser.xul" &&
window.addEventListener("click", function(e) {
    if (e.button === 2 && e.originalTarget.matches(".tabs-newtab-button")) {
        let url = readFromClipboard();
        try {
            switchToTabHavingURI(url, true);
        } catch (ex) {
            url = 'https://www.baidu.com/s?wd='+ encodeURIComponent(url);
            switchToTabHavingURI(url, true);
        }
        e.preventDefault();
        e.stopPropagation();
    }
}, false);



//左键 PanelUI-help图标 弹出 about:memory
	(function(doc) {
		var AboutMemory = doc.getElementById('PanelUI-help');
		if (!AboutMemory) return;
		var menupopup = AboutMemory.firstChild;
		AboutMemory.addEventListener("click", function(e) {
			if (e.button == 0) {
				e.preventDefault();
				gBrowser.addTab('about:memory');
			}
		}, false);
	})(document);



//左键 新建标签按钮如果已经打开则切换过去
//location=="chrome://browser/content/browser.xul" &&
//window.addEventListener("click", function(e) {
//    if (e.button === 0 && e.originalTarget.matches(".tabs-newtab-button")) {
//        switchToTabHavingURI("about:superstart", true);
//        e.preventDefault();
//        e.stopPropagation();
//    }
//}, false);


//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e) {
	if (e.button == 1) goDoCommand('cmd_copy');
}, false);


// 失出焦点自动关闭查找栏
(function() {
	function closeFindbar(e) {
		if (!gFindBar.hidden) {
			if (e.target.id != "FindToolbar") {
				gFindBar.close();
			}
		}
	}
	addEventListener('blur', closeFindbar, false);
})();


//移除按鈕收合的功能
["overflowable", "overflowbutton", "overflowtarget", "overflowpanel"].forEach(function(n) {
    $("nav-bar").removeAttribute(n);
});
function $(id) {
    return document.getElementById(id);
}


//搜索后自动清除搜索栏内容
    (function () {
      var searchbar = document.getElementById("searchbar");
      if (isElementVisible(searchbar)) {
        eval("searchbar.doSearch = " + searchbar.doSearch.toString().replace(/}$/, "\
          setTimeout(function() {\
            var searchbar = document.getElementById('searchbar');\
            searchbar.value = '';\
          }, 500);\
        }"));
      }
    })();


//右键点击搜索按钮清除搜索框内容
(function() {
	var searchBar = document.getElementById("searchbar");
	document.getAnonymousElementByAttribute(searchBar, "anonid", "searchbar-search-button")
	.addEventListener("click", function(event) {
		if (event.button == 2) {
		    event.preventDefault();
            event.stopPropagation();
	        searchBar.value = "";
			searchBar.doCommand();
		}
	}, false);
}());



//单独打开图片时的图像浏览增强 
//操作方法：按上下方向键放大或者缩小，按左右方向键旋转，按0恢复原大小，按1放大至窗口大小，按2切换背景为黑色或者白色。
location == "chrome://browser/content/browser.xul" && gBrowser.addEventListener("DOMWindowCreated", function (e) {
	if (e.originalTarget instanceof Ci.nsIImageDocument) {
		var sb = new(Components.utils.Sandbox)(e.originalTarget.defaultView.wrappedJSObject);
		sb.window = e.originalTarget.defaultView.wrappedJSObject;
		Components.utils.evalInSandbox("with(window){" + '(function(){var image=document.querySelector("body img:only-child");if(!image)return;document.body.appendChild(document.createElement("style")).innerHTML="img{display:block;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0}body{background-color:#222;margin:0}";window.addEventListener("keypress",function(event){switch(event.keyCode+event.charCode){case 39:if(!image.style.MozTransform)image.style.MozTransform="rotate(90deg)";else if(image.style.MozTransform=="rotate(90deg)")image.style.MozTransform="rotate(180deg)";else if(image.style.MozTransform=="rotate(180deg)")image.style.MozTransform="rotate(270deg)";else image.style.MozTransform="";break;case 37:if(!image.style.MozTransform)image.style.MozTransform="rotate(270deg)";else if(image.style.MozTransform=="rotate(90deg)")image.style.MozTransform="";else if(image.style.MozTransform=="rotate(180deg)")image.style.MozTransform="rotate(90deg)";else image.style.MozTransform="rotate(180deg)";break;case 38:if(!image.zoom)image.zoom=1.1;else image.zoom=image.zoom+0.1;image.style.height=image.naturalHeight*image.zoom;image.style.width=image.naturalWidth*image.zoom;break;case 40:if(!image.zoom)image.zoom=0.9;else image.zoom=image.zoom-0.1?image.zoom-0.1:0.1;image.style.height=image.naturalHeight*image.zoom;image.style.width=image.naturalWidth*image.zoom;break;case 48:image.zoom=0;image.style.height=image.naturalHeight;image.style.width=image.naturalWidth;break;case 49:image.style.height=window.innerHeight-10;image.style.width=image.naturalWidth/(image.naturalHeight/(window.innerHeight-10));if(window.innerWidth<parseInt(image.style.width)){image.style.width=window.innerWidth-10;image.style.height=image.naturalHeight/(image.naturalWidth/(window.innerWidth-10))}image.zoom=parseInt(image.style.width)/image.naturalWidth;break;case 50:document.body.style.backgroundColor=/255/.test(document.body.style.backgroundColor)?"#222":"#fff"}},false)})()' + "}", sb);
	}
}, false)



//防止因加载延迟而没有显示(_addMenu.js的)菜单
(function () {
  cars = ['2', '5', '10', '30', '60'];
  for (var i = 0; i < cars.length; i++)
  {
    //Addmenu 和 moveButton
    setTimeout(function () {
      addMenu.rebuild();
    }, cars[i] * 1000); //单位: 1秒
  }
}) ();



