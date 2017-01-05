// ==UserScript==
// @name           tabDblclick.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    双击标签刷新当前页面
// @include        chrome://browser/content/browser.xul
// @compatibility  Firefox 4.0 5.0 6.0 7.0
// @author         Alice0775
// @version        2012/12/08 22:30 Bug 788290 Bug 788293 Remove E4X 
// ==/UserScript==

(function(){
  function dclick(aEvent) {
   var  reloadFlags;
    if (!(aEvent.button == 0 && aEvent.detail == 2)) return;
    if (aEvent.originalTarget.className == 'tab-close-button' ||
        aEvent.originalTarget.className == 'toolbarbutton-icon')
      return ;
    var tab = document.evaluate(
                'ancestor-or-self::*[local-name()="tab"]',
                aEvent.originalTarget,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              ).singleNodeValue;
    if (!tab)
      return;

    aEvent.stopPropagation();
    //aEvent.preventDefault();

    //load home if blank
    if (!tab.linkedBrowser.docShell.busyFlags
        && !tab.linkedBrowser.docShell.restoringDocument
        && ("isBlankPageURL" in window ? isBlankPageURL(tab.linkedBrowser.contentDocument.URL) : tab.linkedBrowser.contentDocument.URL == "about:blank")){
      document.getElementById("Browser:Home").doCommand();
      return;
    }

    var icon = document.getAnonymousElementByAttribute(
                 tab, 'class', 'tab-icon') ||
               document.getAnonymousElementByAttribute(
                 tab, 'class', 'tab-icon-image');
    var iconX = icon.boxObject.screenX;
    var iconW = icon.boxObject.width;

    var x = aEvent.screenX;
    var y = aEvent.screenY;
    var tabx = iconX;
    var taby = tab.boxObject.screenY;
    var tabw = tab.boxObject.width - (tab.boxObject.screenX - iconX + iconW);
    var tabh = tab.boxObject.height;

    if (x < tabx) {
      return;
    } else if (x < iconW + tabx && y < taby + tabh / 2) {
      if (typeof gBrowser.lockTab != 'undefined') {
        //タブをロック
        gBrowser.lockTab(tab);
      }else {
        return;
      }
    } else if (x < iconW + tabx && taby + tabh / 2 < y && y < taby + tabh) {
      if (typeof gBrowser.protectTab != 'undefined') {
        //タブを保護
        gBrowser.protectTab(tab);
      } else {
        return;
      }
    } else if (x < iconW + tabx + tabw * 0.3) {
      //fabicon右端～タブ幅の0.3倍の範囲
      //タブを再読み込み
      if (aEvent.altKey) {
        // Bypass proxy and cache.
        tab.linkedBrowser.reloadWithFlags(nsIWebNavigation.LOAD_FLAGS_BYPASS_PROXY | nsIWebNavigation.LOAD_FLAGS_BYPASS_CACHE);
      } else {
        gBrowser.reloadTab(tab);
      }
    } else if (x <= tab.boxObject.screenX + tab.boxObject.width - 18) {
      //タブ幅の0.3倍～右端から18pxの範囲
      //タブを再読み込み
      if (aEvent.altKey) {
        // Bypass proxy and cache.
        tab.linkedBrowser.reloadWithFlags(nsIWebNavigation.LOAD_FLAGS_BYPASS_PROXY | nsIWebNavigation.LOAD_FLAGS_BYPASS_CACHE);
      } else {
        if (/^moz-neterror/.test(tab.linkedBrowser.contentWindow.document.documentURI)) {
          tab.linkedBrowser.reloadWithFlags(nsIWebNavigation.LOAD_FLAGS_BYPASS_PROXY | nsIWebNavigation.LOAD_FLAGS_BYPASS_CACHE);
        } else {
          gBrowser.reloadTab(tab);
        }
      }
    } else if (x > tab.boxObject.screenX + tab.boxObject.width - 18) {
      //右端から18pxの範囲
      //すべてのタブを再読み込み
      if (aEvent.altKey) {
        // Bypass proxy and cache.
        var l = gBrowser.mPanelContainer.childNodes.length;
        for (var i = 0; i < l; i++) {
          if (gBrowser.mPanelContainer.childNodes[i].getAttribute("hidden"))
            continue;
          try {
            gBrowser.getBrowserAtIndex(i).reloadWithFlags(nsIWebNavigation.LOAD_FLAGS_BYPASS_PROXY | nsIWebNavigation.LOAD_FLAGS_BYPASS_CACHE);
          } catch (e) {
            // ignore failure to reload so others will be reloaded
          }
        }
      } else {
        gBrowser.reloadAllTabs();
      }
    }
  }
  gBrowser.tabContainer.addEventListener("click", dclick, true);

  // xxx Tree Style Tab
  window.tabDblclickTimeWait = 800;
  window.tabDblclickmousedownTime = 0;
  window.addEventListener("mousedown", mousedown, true);
  function mousedown(aEvent) {
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                       .getService(Components.interfaces.nsIWindowMediator);
    var mainWindow = wm.getMostRecentWindow("navigator:browser");
    mainWindow.tabDblclickmousedownTime = new Date().getTime();
  }

  window.tabDblclickisIcon = function isIcon(aEvent) {
    var tab = aEvent.originalTarget.ownerDocument.evaluate(
                'ancestor-or-self::*[local-name()="tab"]',
                aEvent.originalTarget,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              ).singleNodeValue;
    if (!tab)
      return false;

    var icon = aEvent.originalTarget.ownerDocument.getAnonymousElementByAttribute(
                 tab, 'class', 'tab-icon') ||
               aEvent.originalTarget.ownerDocument.getAnonymousElementByAttribute(
                 tab, 'class', 'tab-icon-image');
    var iconX = icon.boxObject.screenX;
    var iconW = icon.boxObject.width;
    var x = aEvent.screenX;
    return ( iconX < x && x < iconX + iconW);
  }
  if ("TreeStyleTabBrowser" in window) {
    var func = TreeStyleTabBrowser.prototype.onClick.toString();
    if(!/mainWindow\.tabDblclickisIcon/.test(func)) {

      func = func.replace(
        /{/,
        '{ \
          var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"] \
                         .getService(Components.interfaces.nsIWindowMediator); \
          var mainWindow = wm.getMostRecentWindow("navigator:browser"); \
          if(!mainWindow.tabDblclickisIcon(aEvent) || new Date().getTime() - mainWindow.tabDblclickmousedownTime > mainWindow.tabDblclickTimeWait){ \
          } else { \
            return; \
          }'
      );
      eval("TreeStyleTabBrowser.prototype.onClick = " + func);
    }
  }
  
})();
