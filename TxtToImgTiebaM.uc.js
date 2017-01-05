// ==UserScript==
// @name           TxtToImg_tieba
// @namespace      TxttoImg@tieba.xx
// @description    百度贴吧文字图片化多颜色按钮版
// @version        2012.9.5.3
// @updateURL     https://j.mozest.com/ucscript/script/74.meta.js
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && gBrowser.addEventListener("DOMContentLoaded", function (e) {
	if (/^http:\/\/tieba.baidu.com/.test(e.originalTarget.baseURI) && !e.originalTarget.toImg && e.originalTarget.querySelector(".subbtn_bg")) {
		e.originalTarget.toImg = true;
		
		var Select = e.originalTarget.querySelector(".subbtn_bg").parentNode.appendChild(e.originalTarget.createElement("select"));
		var input = e.originalTarget.querySelector(".subbtn_bg").parentNode.appendChild(e.originalTarget.createElement("input"));
		
		function gowork() {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			var ctx = canvas.getContext("2d");
			content.document.querySelector(".tb-editor-editarea").innerHTML = content.document.querySelector(".tb-editor-editarea").innerHTML.replace(/^(<br>)*|(<br>)*$/g, "");
			//主函数
			var yon = new Boolean();
			function xhr(nco) {
				//加CSS改颜色
				var addCSS = content.document.createElement("style");
				addCSS.id = "newCss01";
				addCSS.type = "text/css";
				addCSS.innerHTML = ".tb-editor-editarea{resize: vertical !important;max-height: none !important; color:" + nco + " !important; max-width:550px !important; padding-bottom:2px !important; padding-right:8px !important; background-color:#FFFFFF !important;}";
				content.document.querySelector("head").appendChild(addCSS);
				
				var rect = content.document.querySelector(".tb-editor-editarea").getClientRects()[0];
				var brNums = content.document.querySelector(".tb-editor-editarea").innerHTML.split("<br>");
				var lines = 0;
				var maxlength = 0;
				for (x in brNums) {
					var potss = brNums[x].match(/[\.\-\s]/g);
					var potlong = (potss) ? potss.length : 0;
					var littlelets = brNums[x].match(/[a-z0-9\+\=\*]/g);
					var litterlong = (littlelets) ? littlelets.length : 0;
					var biglets = brNums[x].match(/[A-Z]/g);
					var biggerlong = (biglets) ? biglets.length : 0;
					thiswidth = potlong * 3 + litterlong * 8 + biggerlong * 10 + (brNums[x].length - potlong - litterlong - biggerlong) * 14 + 10;
					maxlength = Math.max(maxlength, thiswidth);
					lines += (brNums[x].length == 0) ? 1 : Math.ceil(thiswidth / 550);
				}
				heightt = (lines > 7) ? (rect.height - 2) : (lines * 24 + 3);
				canvas.width = (maxlength >= 560) ? 560 : maxlength;
				canvas.height = heightt;
				
				//开始截图
				var str1=randomString(41);
				var str2=randomString(41);
				yon = false;
				var req = new XMLHttpRequest();
				ctx.drawWindow(content, content.pageXOffset + rect.left + 2, content.pageYOffset + rect.top + 2, canvas.width, canvas.height - 1, "rgb(255,255,255)");
				req.open("POST", "http://upload.tieba.baidu.com/upload/pic", false);
				req.setRequestHeader("Content-Type", "multipart/form-data; charset=ascii; boundary=----------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6", false);
				req.sendAsBinary(decodeURIComponent('------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Filename%22%0A%0A'+ str1 +'.jpg%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22tbs%22%0A%0A5b67dcdf42424dd2013257610020125500_1%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22file%22%3B%20filename%3D%22' + str2 + '.jpg%22%0AContent-Type%3A%20application%2Foctet-stream%0A%0Aimagedata%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Upload%22%0A%0ASubmit%20Query%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6--%0A').replace("imagedata", (atob(canvas.toDataURL().replace(/.+?base64,/, "")))));
				//删除CSS恢复编辑窗原样
				content.document.querySelector("head").removeChild(content.document.getElementById("newCss01"));
				if (JSON.parse(req.responseText).info.pic_id_encode != null) {
					content.document.querySelector(".tb-editor-editarea").innerHTML = "<img  class='BDE_Image' src =http://imgsrc.baidu.com/forum/pic/item/" + JSON.parse(req.responseText).info.pic_id_encode + ".jpg><br><br>";
					yon = true;
				}
			}
			
			//获得选择的颜色值
			var colorVal = content.document.querySelector("#seleceor").value;
			var wgee = toRGB(colorVal);
			var clearC = wgee.toString().replace(/rgb\(/, "").replace(/\)/, "");
			
			var kaisi = clearC.split(",");
			if (kaisi[0] == "0") {
				redbig = 0;
			} else {
				redbig = Number(kaisi[0]) - 8;
			}
			if (kaisi[1] == "0") {
				greenbig = 0;
			} else {
				greenbig = Number(kaisi[1]) - 8;
			}
			if (kaisi[2] == "0") {
				bluebig = 0;
			} else {
				bluebig = Number(kaisi[2]) - 8;
			}
			var tittle = content.document.title;
			for (i = 0; i < 30; i++) {
				//获取随机近似色
				var redran = Math.floor(redbig + Math.random() * 8);
				var greran = Math.floor(greenbig + Math.random() * 8);
				var bluran = Math.floor(bluebig + Math.random() * 8);
				var colo = "rgb(" + redran + "," + greran + "," + bluran + ")";
				
				content.document.title = "\u6B63\u5728\u5C1D\u8BD5\u989C\u8272\uFF1A" + colo;
				
				xhr(colo); //执行图片化函数
				
				if (yon) {
					content.document.title = tittle;
					break;
				}
			}
			if (!yon) {
				content.document.title = tittle;
				alert("\u5DF2\u7ECF\u8BD5\u8FC730\u79CD\u914D\u8272\uFF0C\u56FE\u7247\u5316\u6700\u7EC8\u5931\u8D25\n\n\u4F60\u53EF\u4EE5\u70B9\u51FB\u6309\u94AE\u7EE7\u7EED\u5C1D\u8BD5\uFF0C\u4E5F\u53EF\u4EE5\u6362\u4E2A\u989C\u8272\u518D\u8BD5");
			}
			
		}
		//生成随机字符串
		function randomString(length) {
			var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
			if (!length) {
				length = Math.floor(Math.random() * chars.length);
			}
			var str = '';
			for (var i = 0; i < length; i++) {
				str += chars[Math.floor(Math.random() * chars.length)];
			}
			return str;
		}
		
		//16进制颜色转10进制颜色函数
		function toRGB(serd) {
			var reg = /^#([\da-fA-F]{6})$/;
			var rs = serd.match(reg);
			var arr = rs[1].split("");
			var str = "rgb(";
			var len = arr.length;
			
			for (var i = 0; i < 3; i++) {
				str += parseInt(len != 3 ? arr[2 * i] + arr[2 * i + 1] : arr[i] + arr[i], 16) + (i < 2 ? "," : "");
			}
			str += ")";
			return str;
		}
		
		var selectInner = "" +
			'<option style="color:#000000" value="#000000">\u9ED1</option>' +
			'<option style="color:#0000FF" value="#0000FF">\u84DD</option>' +
			'<option style="color:#FF0000" value="#FF0000">\u7EA2</option>' +
			'<option style="color:#008000" value="#008000">\u7EFF</option>' +
			'<option style="color:#8A2BE2" value="#8A2BE2">\u7D2B</option>' +
			'<option style="color:#A52A2A" value="#A52A2A">\u68D5</option>' +
			'<option style="color:#D2691E" value="#D2691E">\u8910</option>' +
			'<option style="color:#008B8B" value="#008B8B">\u9752</option>';
		Select.innerHTML = selectInner;
		Select.id = "seleceor";
		
		input.setAttribute("type", "button");
		input.setAttribute("id", "TxttoImg");
		input.setAttribute('class', 'subbtn_bg');
		input.setAttribute("value", "\u56fe\u7247\u5316");
		input.addEventListener("click", gowork, false);
	}
}, false)