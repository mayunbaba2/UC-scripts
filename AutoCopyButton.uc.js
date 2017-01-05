// ==UserScript==
// @name           autoCopy.uc.js
// @namespace      ithinc#mozine.cn
// @description    自动复制按钮版（切换图标蓝色复制，绿色复制并粘贴到搜索栏，红色禁用）
// @include        main
// @compatibility  Firefox 3.0.x
// @author         ithinc
// @updator       iwo
// @update        2013-01-21 21:30 respected ctrl or alt Key
// @update        2013-01-06 10:00 excluding input area
// @version        LastMod 2009/3/1 22:30 Initial release
// @Note           https://g.mozest.com/redirect.php?goto=findpost&pid=299093&ptid=42980
// ==/UserScript==

/* :::: AutoCopy with AutoPaste to search bar :::: */

(function() {
  var lastSelection = "";
  var autocopyImages = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAABt0lEQVQ4jbXSzUtVURQF8N8TC7SgJjUvyYSyGlVDR80Kgp4N8oXpu/v8EUWBHxEFDbQGWkHN+ysKa9SkMqGBOhCCZx8I0SOoZ5Pz4imXokEHNtx7WGvtvfZZ/K8T9BXcSiwmviU+B68KZsY5+kdylZ5gLmgFy4mbiZHESDAdLAetxHyVnrLuvcFCYqPOZXSV9OkqqCU2goWgd7vIXLAeDECN/cHtxMtMmL7CvowdCBrBg06BwTzmRSg4kvgQ/AieBy8SPxNrBf0ZM5xtD8oXM8ESKkN0JxaDRsGJdqNxTiY+Bjfad4k3wWx7knfBVP4+k9gsqJXsbc+2/6ncnKDZJiWuJTZH2Vuy2C0nv1rzt0hiJFu7ntissetfRZaCiSxyLts5X0I6G1ytsjvzJjrtzAZvUamyM7GSWKlzoMP/QGIt8X6IblSC14n7bcBg0CoYhjqnc6C+Bk9zfQ++BKcy5kLQqnOsc9T5YH2Mw1m4L3gcrAariSdjHMyW+4NG4uEWv0Fv4lnwKYeuUrbMPEGjNPZZaEdwN6d3sWCy4FKuyRyuVvDor683yqHEnRzCZq6l4N4Yx7fjfwHRJJzDNGKTGwAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAB8UlEQVQ4jbWSzUuUURTGfyMW6cx7Tpval2RCWa2qpat2BUFji2bCdN7n/BFFgR8RBS20FlpB7f0rCmvVpjKhhboQAvtCiCSoscV9cdQGpEUX7uJyz/md85zzwH87rh48v4PFPB4/8PiK6zWWT1IZOb5LdrUL1zSmJq5FsriNRQ2LGpkmcC2mv5iBalcbgLoxzeGxhjWuAh1tgjqwvJ5iNAfq3ilhGtMnMvUBUKkfxHUXi1eY5sg0QeXaAQAy9WFaxfWoBSirv2jzcgLkx7D4iOkXpheYXmLxG48Vsrw3Fc0HMTUpqz9BLJ/EtACUYKATi3lMq5TzU5uFbOQ0Fp8x3Wp1H28xTRUBeo9pvJB1Do8NLK+3mZtve5rGi+KAaX0zyeIGHhswtL/NYLcfixqm9S2QqBXSbiZIvfyvkAVMowBk+QU8Nsjyi38lZXEe13WoVoq80a1ypjC9A0pQ3YvHEh5L7GscagHUh8cKFh9goBMo4XqDxcMUsLnifDBBG2fxWMP1HdcsrllMP3F9w3QGgErjUlpx40SrVY+ZZLbho+mtHkxPcS3jWsbiGT58uJDcm8wWj3cIVjcWzzF9KUxXajvM1MFqe9sn0B5M9zE1k+HyMSy/UtyxwlxNXE92354NHcHjXmHC9eIuYHpAefjkzvA/r7ik1xPBchwAAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAABUElEQVQ4jbXTPU4bQBAF4A+bpHYgB7DMHSBpIA0/EYaCCiGUIidAoCiCIgaSLmDjBDgCPwUFiCpFIkVyhMCHotgxmJXBElJeszO7O2/fzM7wn1DAOL7jHP9ibWAKxX4EZRzhLzYwiTHMoYYWjlF5jKCC39jFUKasg1dx/gcjOUExFBxGUAEfcYl2pPOh66yB0zy16ZA6HP52BH/DIr7iBptdiloRd4dm5Axvg2ApU7uAZQyEX8OP7gu/UA37Cy6yWvRCNeLucI03Yf/EXh8Ccf8mVzIb9hbOegQNePi1s7mSupQGvJNqMpWRzMf+aPifZTUZl6pdihebUoprmMEnXGEnzktSQ77vJilIfbIT9kusxsV2rCuxXwjlJ3qMwIjUsQfu++UFXmMw/CHse6RjOyhLs9GZnTnpF6pYj/0nZ6eDYtRhT6p+O9Y6JvTvn+fhFk/kQaG0FNdHAAAAAElFTkSuQmCC"];
  var autocopyTooltips = ["自动复制禁用", "自动复制\n不开启自动粘贴", "自动复制\n开启自动粘贴"];

  var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
  if(!prefs.getPrefType("userChrome.autocopy.autocopyState")) prefs.setIntPref("userChrome.autocopy.autocopyState", 2);

  function autocopyStart(e) {
    lastSelection = getBrowserSelection();
  }

  function autocopyStop(e) {
    var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
    var autocopyState = prefs.getIntPref("userChrome.autocopy.autocopyState");
    var selection = getBrowserSelection();
//增加判断是否在输入框或按下功能键	
	var exceptTarget = (e.target.nodeName == "TEXTAREA" || e.target.type == "textarea" || e.target.type == "text" || e.target.type == "password" || e.target.type == "email");
	var exceptoriginalTarget = (!e.originalTarget.ownerDocument || e.originalTarget.ownerDocument.designMode == "off" || e.originalTarget.ownerDocument.designMode == "undefined");
	var exceptAlternativeKey = (e.ctrlKey || e.altKey);
	var except = (exceptTarget && exceptoriginalTarget && !exceptAlternativeKey);//

    if(autocopyState>0 && selection && selection!=lastSelection && !except) {//
      goDoCommand('cmd_copy');

      if(autocopyState>1) {
        var searchbar = document.getElementById('searchbar');
        searchbar.removeAttribute("empty");
        searchbar.value = selection;

        var evt = document.createEvent("Events");
        evt.initEvent("oninput", true, true);
        searchbar.dispatchEvent(evt);
      }
    }
  }

  gBrowser.mPanelContainer.addEventListener("mousedown", autocopyStart, false);
  gBrowser.mPanelContainer.addEventListener("mouseup", autocopyStop, false);

  var statusbarpanel = document.getElementById("urlbar-icons").appendChild(document.createElement("statusbarpanel"));;
  statusbarpanel.setAttribute("id", "autocopy-statusbarpanel");
  statusbarpanel.setAttribute("class", "statusbarpanel-iconic");
  // statusbarpanel.insertBefore(newItem refChild);//
  statusbarpanel.setAttribute("onclick", '\
    if(event.button==0) {\
      var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);\
      var autocopyState = prefs.getIntPref("userChrome.autocopy.autocopyState");\
      prefs.setIntPref("userChrome.autocopy.autocopyState", (autocopyState+1)%3);\
    }\
  ');

  function refreshStatus() {
    var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
    var autocopyState = prefs.getIntPref("userChrome.autocopy.autocopyState");
    var statusbarpanel = document.getElementById("autocopy-statusbarpanel");

    statusbarpanel.setAttribute("src", autocopyImages[autocopyState%3]);
    statusbarpanel.tooltipText = autocopyTooltips[autocopyState%3];
  }
  refreshStatus();

  var observer = {
    observe:function(subject, topic, prefName) {refreshStatus();}
  };
  prefs.QueryInterface(Ci.nsIPrefBranchInternal).addObserver("userChrome.autocopy.autocopyState", observer, false);
})();