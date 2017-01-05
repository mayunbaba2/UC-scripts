// ==UserScript==
// @name UserAgentChangeModLite.uc.js
// @namespace http://www.sephiroth-j.de/mozilla/
// @charset     utf-8
// @note  modify by lastdream2013 at 20130616 mino fix
// @note  modify by lastdream2013 at 20130409 sitelist : change SITELIST idx to Name
// @note  modify by lastdream2013 for navigator.userAgent https://g.mozest.com/thread-43428-1-2
// @include chrome://browser/content/browser.xul
// ==/UserScript==
var ucjs_UAChanger = {

	DISPLAY_TYPE : 1, // 0显示列表为radiobox, 1显示为ua图标列表

	//（1）在url后面添加网站，注意用正则表达式
	SITE_LIST : [

		// 在 http://www.google.co.jp/m 伪装成日本DoCoMo手机
		{
			url : "http://www\\.google\\.co\\.jp/m/",
			Name : "iPhone"
		}, //此处添加你需要的useragent的名称
		{
			url : "https?://www\\.icbc\\.com\\.cn/",
			Name : "Firefox10.0"
		}, {
			url : "https?://(?:mybank1?|b2c1)\\.icbc\\.com\\.cn/",
			Name : "Firefox10.0"
		},{
			url : "http://vod\\.kankan\\.com/",
			Name : "Safari - Mac"
		}, //直接可以看kankan视频，无需高清组件

		//添加网站到此结束
	],

	//现有版本firefox的图标
	NOW_UA_IMG : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADZklEQVQ4jW1TbUxTZxh9kZBtkizLBgPcRGFtuW1vC+3lw35RaG9LPyxt0cIopbKGsTggLEjIhgtWZp0sGSqi0tAJaUei+JnUIgYHxkbZ2EeIDjOzZInbfizG+GNLtgx779mPTYZs59fzPDnn/Hie5xDyN9KCweAGQkjaPz2Zmpp6JZFIVMTjn5XPzMzkPZmv5/0X6Rtdm/LzZ2l5yaNabwu0JisvpKQPc7eIpgkh1jXMf03qEj9scYQuWjMzMo4UFYlQaXOC9TTD//Y78LZ1oEKnh9a9C/quMNRd0RM5PdHMp0yU3dd81oHLcHTtg6P7A87/ydVUTVOAZ612aFkLNAYzX1ZpTCnrOlJsaBH6/oVkYUtcuGog833cvf/zBziw9OufA7d/x5uxBVSYfTC4fTDYnGBrd6LSbAdNi8EYPCu63uugAlcuP1lWetOZ2wttF+7xgck7XNuF79AcuYWmE1/D1XMYOqMJKkMNSio00LA2MCodX/ZGmBP6zz0Ifjr9PIl98XOx5v3rnHvkKzhHvkRN6AYcR++ioT+MKpMJ2wwWCCVSFAiLoFRpUaLSg2mJ8oWeCDcYu+Uiw5e+dTDtCZj2J3lL6CYaJ+7C3H0cTJULqioWKr0RtIJBfqEAWwUC0CozSv3jqYLtR3Fo4loviVy5t0v5VhxK/3lu+0eL2D37CxT2VgiEIkjLNFDXBSAp0yI7Nw9Z2S9CbNmDEl+M32wcwODobB05lbxfyLTHf5M5o1C3J3j/xfvY1jEJuXcMtsNLaIgug7Y0IPO5Z5H18kuQ2Pogrz+JTdrePz6MTAkIIYSwh27OyN3jPO0YS2k649D3zYN+/Rgk9k7k5hfgmXSCF7JyIKreDco5yFHWEJ9X3plcPaNheMls7JuF3BVeodghyGpHofCNY6u6BZvpauRRlRDV7EVx4ylQloMrwupeZMuaPWt/m9iHvpnQvzcHxht9LPOMcVLrMBTe0yhujELmCUOyY5gTW0OPX9P3QKTrvLRWm0aCwQ1MWzhDv28hpn03CfWeOZS2noW8fhRS1xAo2wFQtoMQsf2gjHvjOeaeTELIU6FaLRSt0zvlgXNzsubJR+L6CF+0Y4QTu48/LHYdmy91H/H/b5jWRZoQQsj0/Pev3lj6qXz+zo+li8vLueuEq+K/AHDdk4qpwGoWAAAAAElFTkSuQmCC",
	EXT_FX_LIST_IMG : "data:image/png;base64,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NrxQX7/gomXsmKUQkZKtW7fctnz58n8JhyPTrbVDX5n5A1He7I0xpNPp1n379n355ptv/jHQM5bx43ljKfvYYz87unr16s4ZM6pXua5bXNBq+oMIn8/1ec3v2bPnK+vWrXt0rMKPFwCsJbNly5Yjq1atapoxo/qKcDg8LV8jvJUg5E0+L3yqL3WioWH3l2+99baf+b6fZIz9sXEDAOD7NvPYY48fr62tfbW2tnZeNBqtFRF504qlYYIXah2wHR0dv922bds/3XHHxid93+8dj/ATAiBH2Weffbaxt7fnpdraedmysrKFrusW5SuwqQZiuODGGLLZbOupUycfvPe+e+/+xr99Yx/QPxHek3lr0T9w4ED7E0880TBnzuxDVVVVsVgsOtdxnHAeiMnUDHkewwW31va0tbU9/cwzT39106Y7f9ywu6EJmMgbVsE8kwCgkEfkyitXzvzMZz6zdtmy5R+tqqq6znXdgY6SqgZ2mf+dixf577zF5Ls3w/8HfYlsor098btXXjmw9b77vrtz7969cYIW/qSCz1TaqgGi9fX1MzZu3LhyxYoVa2bNmvknRUXFda7rlkqBX4wWMAtdR1XV87zuVCp1LB4/+8KePXt2Pvjgv7987NixcwTmPiX5982IWgYIASVr176n5qabPnRZfX3d4qqqqoWlpWULotFIjeO4pWIkZMREAay1/aqa9TyvO51Ot3Z3d59KJNpPHDly5NCTTz559Ne/3hEHeglMfUoLjze7nHMIuk4RY0ysrq6udMWK5RXV1TUlFRVlRVVVM0oAzp1r6+nq6k7F4/Ge/fv3dx4/fjxpre0jMHEPeBOaEW8NAMPnEgILyX8XUv6l4/z322uz8Uf6P0r/A2dfqScXSdDKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA3LTI1VDIxOjQ5OjI5KzA4OjAwt5ZBtAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wOS0xMFQxMDoyMzoxMyswODowMBjC87UAAABOdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTEwIFExNiB4ODZfNjQgMjAxNS0wNy0xOSBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZwUMnDUAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAZdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADEwMjTnJti9AAAAGHRFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADEwMjTybwSkAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE0MTAzMTU3OTMh/QAhAAAAEnRFWHRUaHVtYjo6U2l6ZQAxNzdLQkKmeapVAAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE3NTEvMTE3NTE4OS5wbmfoikjUAAAAAElFTkSuQmCC",

	//自己在底下添加ua
	UA_LIST : [{
			name : "分隔线",
		}, {
			name : "Firefox10.0",
			ua : "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6",
			label : "Firefox10.0",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADiklEQVQ4jV2Tf1DTdRjHP2pwV+Y348KUozGswYRlhECCGv5Iwx8zNhhQEXGpgIi6pBCQ8EfC6LgGnvJLL5ER4l0dQv5CLIQIaMeGMGQ4lMXmd8N5/JRCD/b5vvtDIeP553n+eL/ueZ6795uQ/2rusz5PItkuTcvJK2R2l1x+Ka6kxlH8tYLwVq56TjuPzKqnMM9v1bnrf7YBQF3fKILPGyG+yGJ1hRExP96gW5P31zAMI3jGzJmG56TLRIdOZcQVRqnaJ8u1LEYaiulR1UV7fHUv3abqospGk33EqMX4H1/AdG3jaOR7TNT/FlfFirQjZ2PQXbyDM+ZuoT8dliGo/C/ILvQgtFSDSvVdVGuMGLTdm5pgs4DOj5AsfjV1+oIFrenB5uHSGLutUEZHT4eh6eAHKM6QIznvB6RV30KD3oz7Q48w/AQwsw/pWEsCbHXrRhiGOBH5BteUv8uiwZ4Mo5aTElgKpLAqgtF/JglJ+SoUNdxBZbMe1271oUptwGWNHoafP+amWkO5EL+X15KqOO/64SIJWOVW+uCUGNYT2/Awyx/S42cR9H0TWm7fQ35tB+SqRvzaZUKncQCmS+EUunDkSF7JJTU7320dLAiFVbmR6tPW4ZfNIoQnfgPPA2VQXOrAoB2wjD3Gg9FxNOpZ3Lx6AdZza+1ol+JErFsBqVjvrh7M3wT2uzX094h30BzigpR9iXhrzxkcyTsNU20pdDodeqxD6GT/geFGCsZKl9u5+hDIP+XtJan8hUpbhj/MOYH2u/uXo/+zJWiPcsP1MC+0yfgoCvVFZnYeeoefoE7TD23t55go88FEywYa5M/4E5GDg1935DLKZvtQ81FfWA56oWsnH2kfrkZgSDyIOBdL95Sj7bYemsJoWCsDqP3mGq7zykodIeQFQgghCqHb+fs73kZfpteU+bAIA8e8oTm0ApkJEkR+Eo2vdkXAoAjAULYLbCWiSXS8j32S1xJmbOxMyOLaFUJrj8wTul2CScNeD86SuhSPMnkYyxJgPIuPgSOu1HTMfZKrEKLpuLuaEOI47cS5hBDiPd/B54qvm6l7/RvQbHKFNoIHXfybtOdLT86YLsDQtzxMKXmoP+DS7DyfLJ4VwKfD64QsSvVwUl4NcurXbHHm7sTyYZQL0Zvi8fi33a7qpGAmcebv58I0O87EiRAmYNGLgdsFC6WbhQvEoiWOy2ZpZ+B/AT1n+R4PGm8BAAAAAElFTkSuQmCC"
		}, {
			name : "分隔线",
		},

		//伪装 IE8 - Windows7
		{
			name : "IE8 - Win7", //此处文字显示在右键菜单上，中文字符请转换成javascript编码，否则乱码(推荐http://rishida.net/tools/conversion/)
			ua : "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
			label : "IE8", //此处文字显示在状态栏上，如果你设置状态栏不显示图标
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADL0lEQVQ4jYWTa0iTURjHj61NoyghuyBiRRZNgtQ3nbNs5jT1i/RB0DIFQ8UUiUmrKLrKQryQVjrHnNSmqGlheL+Q8zZ1ur2a7VbN65q5pvMWXta7pw/TZZH0wIHD8z//HzyXg9CfsQ39P7Z8sy5gZOSVGu0akV1Cv1bc7ZcskLhG5IiQz/XLCGHkrSDWhG+K14lEoaKoYQhUk0bQGRdAZ1yA4VED8OoG4WSScAj5sE7/DbFezqad8mJVrOBfvppGDHMTTfi4uVqqhWqpFpoGx3/2aKbMzXIt+LEr5pEf22PdS0IIITvkQt/hGCcck2p08t7P07Ks2kEQdmgWJZ+mZWKFXsFtVRLPGodB0KZcy6/D4WC8SIncwuwRQnZWTvDdGP57dblUa6hJFkrgafPHbwRBsAEgAQDiRr/PF9yulBG3Xw9Y0qtl5mBOLaDQR5c2SiA5XX3u/BYfuxEj6IRIQbclo0X1Qa4zpfeMGvP6x2ZyeseNuUnlAz9iXkosia961kIz6wnSFV7ZBsAOhd85cDqnzRTKFVtCeN3EeZ4EfAu6gM6VWE9BFzAKu+BcfjswX7QBxqkFcqJQ/nsEqeUlB+7VgPczsfnUi07w4/ctMkW47kIJrg8uxb8Gi2T68FL5yEWRVBspkn45fP+dhpRS9toGoLAq32y/W0Psy2hdcczugLg6dT0AOC6urlLnV1aOLS8vH+qZnA9rnzCF8/snA1wf12Ionn/EBiAlcKMoHDGQnrxfI+VILHt58plixZT7hp4t04c45PWZyVldBHrQtEp62AqUZEH07x64hdmT83AlJasD9hTKzDv5Q2DPww1RLaO8yKaRIgoPn9vFH4LdBf1mh0wxUHJlKhQQ4LAxRusipXI9EV9jcinVAL1KZaZVqYFargRqmRJ8qtTgW6n66VyiBlSoMKG0V56bF8kGOR6Vwtyf1bB0pnEKEqWzcAufJW7KZ4mEvhmgN+rBKbN+iXo5Nehvsw2CYYjsz2Cw3WNZuAdHZAgqalkKLGpZ8uCIDNRYFu7PYLAxDCP/6zPZ+oFhGDkQw476e3syaTRaBI1Gi/D39mQGYtjRdbPdZsMvtAyiG2p6whQAAAAASUVORK5CYII="
		}, {
			name : "分隔线",
		},

		// 伪装 Chrome22.0.1219.0 - Windows7
		{
			name : "Chrome - Win7",
			ua : "Mozilla/5.0 (Windows NT 6.1;) AppleWebKit/537.3 (KHTML, like Gecko) Chrome/22.0.1219.0 Safari/537.3",
			label : "Chrome Win7",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOklEQVQ4jY3Sz2vTYBjA8QeEwkBsU2iTJW+Cdnkz19r546Jr3Vh7E08DR8GT4F+gIMybh0JhUGkt7Zt/wEsPngbzoqmehkwt2rTdUuZhHWt3EGVQKCR9vNhuqavsgc/tfb/wwAMwNp2laLSTjBa6ieh2JzHf6ybnf3UT0e1O8lpufzmijr8fjRmJeNqL4ezBUsQ+WIrgJPuLkfUywIWxz+DZu61t/Lgzi+ejbboi1etEatwMHTdvhfC86jeupAEAQMyHFLk4k/pylaxVwwSrYYLVObL3eU5MfbocECbuPBxFp+syo+3Vx8S/NRO0tlR+j2kLkjdmpLmY0eZiRtsbM9JGeVlwakHLqfE4ZNf4AiiMmoquIWFa5gPhHn6U/A+4uJHh4hV0MzL29+CKY/I4UuNNkBntKbqGiq71xXxIKQN4fPHK0XjAF68c/dzmvI4p4EhN6IOia/2/AZQZfQ0AMCnw27zkd+oCjpj8MciMWsOAomuoFEN3z1xh4f26XedTg8Y0jtQFE2RGS64Ao6bw/F7AF6tkubhxyMWNQ1+skl1dfTI1aIjfBk0Rh5z6dA4EXQ3LOrXdEa1JmLZCXpIp4ZUaCBQDF+2G8GiwI+KJabvf4KMAACAzteAKnCIzapXfEv9gR2oPdiUccnal3MkxvACPzOibswJSid7HHTGDFsFTNtEEz79HxdQ19zp0A1sBFS3SxxZBbJEeWtLT/16mmA8ppESfKUx7R4ozKrbIBlrkK1pyFpvi7Pj7PzASq+Abn5PIAAAAAElFTkSuQmCC"
		}, {
			name : "分隔线",
		},
		// 伪装 Chrome -mac
		{  
		  name: "Chrome - Mac",
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36",
      label: "Chrome Mac",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7UlEQVQ4jWNgoDYwZmBgXaqjGPvIWnfdCzv96y/tDG4/s9Xfuc1ApcBTiIEPr+YmJXHd57Z6117aGfzHhl/Y6r9cqavkhVVzkoiI1Etb/Xe4NCPh3+t1lQPQ9TM/sNb1fG6jdxrNxnsv7AxOv7AzOP3S1uAMDL+w1d/ry8DABdc9Q10u5IWt/ssnVjreL231/72w039x00LL84ChauRyLaWkCjl+wV2GqpF7DFWbYHilrgLCFTcsdBa/tDP4/9RWr+u5jf6qm5a6AciueWGr/+immZbtSzuD30hiV+AGvLAzOPXSzuD/Czv9H9dMNe126KkGo/v9iJFG1XMbveNwMVuDX8gGwG17YK23dpmOYhi6ASdMNepeIBtgZ/CHgYGBEeoF7RUIk/X/PbLW83tpq38D7lw7gzd3rLSdkL3w0lb/JtwFs7XkYtDj+5mtbsA5U628kybqZbNVpGXuW+utRVZzwUyzD26ANgMD2wtb/dsozrbV//fSzuDWS1v9nQ8tdXygfKiL9L+kSQnKoSSENgUZ8xe2Bl/R/f7ESjfhha3eJWSDtxuoxWNNjf3KUtYv7fQfI7yid+yprX4uwkD9z1v1VWKxaoYBBwYGng26SoXPbPQO3zPXcX1hq3/vpZ3+uSMmaq1JIiJSeDWTAwBf3VAlT96iJAAAAABJRU5ErkJggg=="
   }, {
		 name : "分隔线",
	 },
	 
	 // 伪装 Chrome -mac
   { 
	   name: "Chrome - linux",
     ua: "Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.462.0 Safari/534.3",
     label: "Chrome linux",
     img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB50lEQVQ4jWNgoD4wZlWLWBVrWvVinXndh+vmdR9um9W83amZtLdASMWTD69WGZcOXbOad9fM6z78x4FfqkVt8MKqWcQwScq89sM7PJph+LdmwrYAdP3MJuXPPU1r3p9GVmxW+/6eWd2H02Z1H06b1344A8Nmte/3Mkj5csF1KwbNCzGv+/DSuOq1t1nth3/mtR9eGBY/8NROPxapErEmid+mQlA75UCkdtqhJhhWi1yDcIVRyb3F5nUf/pvVvO0yq327yrjsfgCya8xq3z8yKr1na1734TeS2BW4AWa1H05BBD/8MCy+ZaedtC8Y3e962aerzGreHkcY8OEXwoC6D3DbTCqfr1WPXBOGboB+9rk6s5p3cAPMaz/8YWBgYIR4ofT+CiST/5lUvvAzq/1wA0nsjVHFEycUL9R9uAl3gUrwwhj0+DaueRNgmH85TzfnbJl00GwZk8pna5HVGORf60OKRW02s9r3t1Gj8MM/89oPt8xqP+w0qnzhY1b74R9SAH4RNM6XQ02Fbt3mZnXvv6L73bTqVYJpzbtLyAZrJ++Jx5oa5fwmW5vVvX8M11z77phZzatchIHvP2sm7IrFqhkORB14NOO3F5rVvDtsUvbQ1az2/T2z2vfndDJPtooYJknh10wGAACB6IAc8VaKWAAAAABJRU5ErkJggg=="
   }, {
		 name : "分隔线",
	 },
   
   //伪装 Opera 10.60
		{
			name : "Opera",
			ua : "Opera/9.80 (Windows NT 6.1; U) Presto/2.6.30 Version/10.60",
			label : "Opera",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbElEQVQ4jW2SX0hbdxTHf1FWBhuIpQnkYR34MKRZt0JcXw2UyfQSNIYQd5tax3RRVJS6VVMZJSvUbSkpltY5IrTXtVqwbF3dFvXqbVozTdC7mOr1ahvaqfmjSW6axja58Sb37EXDKv0+HM7D93POF85B6HXl7TUymezjQqm0QiqXf1ZQUFD0Js9+5SGEUHFxcanh1CnHhfPnU9d7eqDv4kVoP3MmXlVVdUsul7+/681/I1xSUvL51b6+7CpNQ9zlAj/DZLdoOrs1Owv2sTFoaGjYKCoqOro/yd5mpcViefmYZbPR0VFhmSSFB24375yZ4QMjI9mg08nbSRK+OH16WavVFu+yklypNRiGRu7eFXx2e3rdaoXp8fHYFEVFJhyO8OLgYHK9t1ek3e5oZ1dX0mAw/KZWqw/l8mu12o++M5t9xNCQ/2l//85jk0l46HCs3qcodmp6eokmiMBaezvM37u39sPly97Os2d9OI5X5waYzebWW8PDz34dHh5f0GqTTEvLqwWPh6Ln5iZphrF779z5h1GpYLa7e/53khwavHGDbWxs/FahUBxACCHJ1StXvvcyjGttZcXmyMvLzJeWhp5vb9uiW1vX46lU/8bo6J9TCMFSU5OLSyYtix7P/Y6Ojh8xDCtECoXigM1m640nEjM7L1788iA/X6SPHw8BwABkMoMAYOPs9rFxhOBpd7cHAH5+znFTJpPJolarDyGVSvW21Wq1pnh+VeB50imT8XPHjiUAgBQFgQKAic2bNxcnJBIIXLu2LIriWCwS8ba2tpoxDCtESqXyrba2to4YxwVFUXzkPXEi4ZRKBVEQliCbXQJR9K5brUESIYi73U9EUWRWWfYRjuNNZWVl7yCEENLpdJ86KGoBALgAQUQohIAPhTbFTMYPABvLtbWvZg8fFjLp9DoAxAYGBv6orq7Gcs9UXl4ubW5uvhCLxeIAkHIdObLj6+xMAUA8HQ4nHh48mAndvr0NAOlFr3elpqbmXGVl5Xt7V5Tspjh6rqvrpyjHvYTNTWA1GvBfupR9Ul8PUYIAAACWZZ/V1dX14Diu/D+bG6TRaD4wGo1f2ycn/w4Eg5zf6UxHfD7+33A4RBDEX3q9/hv9yZOf7Adfk0qlehfDsA9xHK+sb2n5st5o/KpGp9NXVFSUaDQa2X7/f7oO8ld2yvCoAAAAAElFTkSuQmCC"
		}, {
			name : "分隔线",
		},

		//伪装 Safari - Mac OS X
		{
			name : "Safari - Mac",
			ua : "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
			label : "Safari",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCUlEQVQ4jX2T70uTARDHL2sJwUNI/gdhWtkPQrMSlH44KbLIepWVGSauzDRr5SSI1H7IqF5kZRbOtbJsqWWa5dbSMnQ2dVtu89mz5lxNl85FQqF73LcX6Qiz7tXB3efDcdwR/R1ziGgewzChEonkuFgszmYYJpSIBFO1/0bQdMIwzCKZTHZPrlDIGYZZNFvPrHBISMjCU2fO5DY1PH819GUAbpcTjfV1TWKxOJuImH9JgoiINgmFcdY+i+2bx42Oj3aotKy/Wcv6O3v7MeYdhsXUy8bHb14/UxJERBQbGxs1OuL+YTRzOC03TOyQGvjdVw1IvqLHvhsm/oLS5DNaPsEz7B6LiYlZOcXOnV7a/LetLb0WzoEMGetLumbGtgs6JBZ3Qlj8AWm3TEi9aUaewuzj7E5o1KquKfj3FBsTEnZ8dTmQ/8DIJ2U9Qfrld4gvdeCE0onztf04ImNRUG3DofI+3Giw8q4BOzbExQkDCzh2LPu6wcz5N10y+FJK3uPK/gJUpJ1F/cte1HaP4lydA5mVVmRWsDha2eczWTj/ofQMaUAgEh2p1Ro57C018IdlLEpaPDAUXkRrugiqj0N4w47hlNKBlFI9chQsrzdxyMgUVQUEu5L3VLV06LHnpsUnkrMoahqEkuPxsK0fOvMnOD67IH31Bal3WeQ8tPNt2h4k7UyuCAiWRa7Or6t7hlzlgO+A3I5ilRuSF4Oot/7EI+N3SOrtKG1mce6pDdLmIb768RMsXb4iNyAQCBZE5ebk+Z+1s5OFao+/UDOMAo0HJe3fINV+R77GixONbuQ8daGhvW/yaNZxXiAQrP7zkIIjIlfV3L9fhWa9c+Jsi9cvNYzjZOMg8hoHUaIfx/lWr7+hy+mrrFQgLGJ5FREFT8PTD7IiYev27tdqDbqsTtSYRyYfm0b5atMoX2Memey2OqFWqbF5y9ZOIoqcwQaSxdFr15XfKS/39uh0sHFW2DgrenQfcLuszLMmKrqMiBbPhGdKiIjCw8LD04SJiUVCYWJRWFjEQSJaMlvvLwJ0xKwgmMgDAAAAAElFTkSuQmCC"
		}, {
			name : "分隔线",
		},

		//伪装 iPhone，查询http://www.zytrax.com/tech/web/mobile_ids.html
		{
			name : "iPhone",
			ua : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16",
			label : "iPhone",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADLSURBVCiRddA/C0FRGMfxc4UyGdQNpQzIKzDhFViNZvKn7y5loow3Ay/AaLQpeQUMkkWhjBbFonQM13X9efRM5/l9zjlPj9Lqu4hSJeycfuMUKy5E/wB8TNEM3I4beTHxE+HIiBjBD4BBhSVH1lj0mbDlwJgMhlZKKzw00ULNMG2Q4yzEOxLPL2iL91uvGRiKoOSCjggsFxS5C+BCAY8NYizFN26UnT3URHAi74AAcwE03lZNkg0azZ4F168hnyRNjypxQmTpUsdr9x/STR736IkaIQAAAABJRU5ErkJggg=="
		}, {
			name : "分隔线",
		},

		//伪装 Apple iPad 2
		{
			name : "Apple iPad 2",
			ua : "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
			label : "Apple iPad 2",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADG0lEQVQ4jW3R708TdxwH8HPGB0fLj0TguN5dCxkLiUSDOrLExDAXf8RHOjKJmTEKrcUftKUdlLrVWQwI18QZ2Nwsa7vatBRaaHtnqdIqFIzgZtzOLtb4wGV/h7lv33uwLIuh7z/glc/7/aGof7Otq6vrF4NeX2rmeaVFEIoCpyt+fuJE0Ts5WbzmdhfdV13FEeeQ4rDbSy6XK+LxeD6g/ks8Ht8ucFyplmHR1L4bDR+1YeeHbdhz8FOM3boN9/gEnNc9sLu/Rb/FAqPR+Nbn8+14D+B1uj+Omy6VZ5Zy6mg0UZ7KyGVvMlWOrq2XpY2NsvT8RTn/8pU65vOXu0+eLG0BdCyrfNl/GbnlHAnML2JubgaR2D3IhSyevVhB/skaXhafk/Hb0/js0KHXWwCWZRXboAOp5QKJLspISmkkMzIyS6tYX/sN+fVNFH4tkQnRi086O7cCDMsqww47Ftb/JDG5gHQijGQ6hmxiBfn5x5BWn2Jh8y8yNjqKXe3tlQBGcdhHUHgYJXImguXlVeTyjyDJElL37yObXMTjWJhc99xAc7OhUgVGGfpqBIn4PJEWQ0iml5B9kMXcXByhcBSZRAKZoJ98/c018DxfeQPLgAW53ApJxFOQ0hLSqRRkWYaUlrCQTCFfeEJs1kFwlQCdTqcY+0y4e9dHfvj+DkKhewgGgwgEAggEgpiZ+Rmz0RgxGk2VL+A4Tunu/gI/3vmJTEyK8Hq9EEUvRFHEpOjFzfEJTE1Nk1OneqDX6ysDhw8fgcvpJDarDVaLBTabFTbbICwWKwasVjiGRsjRI8dgMFQYURAEZW9HBy5ZnaTn9Bn0mi7iXJ8ZvefPwnShD2dO92BooJ907N0HQ6UvcBz/+8cde9SLwdy73uFRdco/q96YDqk3x4dV8TuP6nGcU1dD5nf7Ow+oer3wagvQ0tLyRqvVoJFtAtPEgGEY8IIAXtBjZ0MjGpkGsLpGVFdXo7W19W+z2fw/QFEUpdVqr9TW1vo1VVV+mqbDNE1HampqonV1dRENTUdoWhOuqtL4NRqNv76+3k5R1DaKoqh/AOus3HSfnM0iAAAAAElFTkSuQmCC"
		}, {
			name : "分隔线",
		},
// 伪装 Android Droid
    { 
      name: "Android",
      ua: "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
      label: "Android",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgQANLjln+RxcjRg5D4apTrv+XHLNEwURrhtHomgkagq4JF6adAWQBdD8S6wI4e9SA/1gDdODTAbpCkhMQXQ0AAEsuZja4+pi7AAAAAElFTkSuQmCC"
    }, {
			name : "分隔线",
		},
		//伪装 Android 4.4.2
		{
		  name : "Android 4.4.2",
			ua : "SAMSUNG-SM-T537A Build/KOT49H) AppleWebKit/537.36 (KHTML like Gecko) Chrome/35.0.1916.141 Safari/537.36",
			label : "Android 4.4.2",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABlVBMVEUAAACh446U3oCU3n+O3HmO3Xj///+O3HiJ2nQ/xilDyC6116u416+nqKSmp6Ozs7Gzs7KCkXyDkX10dXFzdXCn5ZST3n+O3Hqo5ZSg4oyL23aD2W5912d61mR912eV34CG2nF71mSV3oCG2nJ31WCL23d71mSE2W6T3H991meS236M2Hh61WOM2HiK1Xd51WODzG+E1m+E1nCCzG6V1oWX1oenzpzb39rc39upz58aHBDZ19nI3cLG3cEPEwS8pb+0z63T3dDT3dGzz6u8pcBdcFXCw8DV1dTb3Nvd3d3b29vV1dXCw8Fdb1ZaW1ehoZ+1tbS0tbOfoZ1ZW1Zw01hs0VNr0VJq0VF20mBt0VRq0VCB1G2i2JWw2aWC1G1502O62rLV3tPh3+Ks2aLZ3tfK3Mbg3+Hh3+HL3cbY3tat2aJv0VZz0ly62rHQ3c3P3czP3cu627Jv0Ve02qur2aC12qzE3L/E3L2q2Z/V39LJ3MTO3cvH3MLW39PI3MPO3crg3+Df39/N3crG3MHh4OHg4OD///98MaWIAAAAVHRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAABECIBAS+Jx97GBWfjBWfzMOKJEcYQI94iI94SyMcSjYwz5OQzAW719QEHcOfncAcDN5PN4s2TNwMDFysrFwMbo/uRAAAAAWJLR0QGYWa4fQAAAAlwSFlzAABHgwAAR4MBlpZr6AAAAP1JREFUGNNjYAACRlExcXExCUYGCGCSlJKWkZWVk5aSZAbxWeQVFENCw8JCQxQVlFgYGFjZlFVCw8OAIDxURZmNnYFDVS00LCIyPDwyIixUTYqDgVM9JCwqOiY2NiYuKixEmotBQzM0PD4hMSkpMSE+PFRTi0FbJywsOSU1LT0jMyssTEeXQU8/Oyc3L7+gID+vMKdIX4/BwLC4pLSsHAjKSitKjYwZ2EwqqwqS0oAgqbqm1pSNgdvMvK6+oREIGpqaLSx5GHitrG2qIQLVttZ2fAwM/PYOji2tjY2tLU7OLgIgzwi6url7eHp6efv4CkH9K+znHxAYFCwCYgMAIElBmLJCG4EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDctMjVUMjE6NDk6MjkrMDg6MDC3lkG0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA5LTEwVDEwOjIzOjA0KzA4OjAwEc/NpQAAAE50RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi44LjgtMTAgUTE2IHg4Nl82NCAyMDE1LTA3LTE5IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3JnBQycNQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABl0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTAyNOcm2L0AAAAYdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTAyNPJvBKQAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQxMDMxNTc4NKaCpMMAAAASdEVYdFRodW1iOjpTaXplADE1N0tCQty5+TUAAABadEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTc1MS8xMTc1MTgzLnBuZ6I6UHUAAAAASUVORK5CYII="
		}, {
			name : "分隔线",
		},
		// 伪装 Nokia E72
    { name: "Nokia",
    ua: "Mozilla/5.0 (SymbianOS/9.3; Series60/3.2 NokiaE72-1/021.021; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Version/3.0 BrowserNG/7.1.16352",
    label: "Nokia",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jaXTTUzTdwDG8e6ymO0wjdE5rPZf+f/+f0p9x2haeVkt4EsDCMqLOkAgWFGIOxg1MwozzrEpFCxvFYpS0FCoSGs0S8BNtxBFUEzIdBU06RZC0gU1btnFw9db1cRdtsNzeC6f0/NogA/+TzRvF9fAk0/sLSMlOTVD7rRTt4YtlTeC1sofgylVP41lnxnq3e28c8Decke8F+j5JRRnOTrwq1oWINruR7b7UfcFEGUB1LIAyl4/8l4/5kM/zGw9eTP/HSAUejHHVjkQXFzow2jvR190Gbm4D32RD22+F6nQR8yeKxjt/ailfawqv/oq88SgKQIcbBku0X/hxVDsQ93dQ0H1ILYjVyn8bpC26w8pd95CLvBiKO7FUOIjpqiXdeX+zgiws2rw/JK8SxgKupFyPNx/+JS//n5JeCbM71NTwD80+O4i5XSh5nej5ncTV+p7FAE+3+8bETmdqHldSJnnGR6f5PnLZ2yuuMiCTY10XhshPBMmdocHJfciSm4XKwovTUWAVbs8E0rWBWK2dyCltTL26ClXbtxnfmozC21uDpy+znR4muV57chZHajbOjDmembeANnuCTXDjZrhRtrUzOh4EE//baKSm9FudFFxKkDojxBLs84h0tyIDDexWe1vgOXpzjHZ1opic6FLdnJ7dJz23p9ZaHGitTay/+s+Hk8+Zml6M/JmF8LmIja9bToCGCxVXpHqQkltYlFSHXdHH+Dpucln8XVoE+upON7Dk8nfMG5xEm1tQk5pwrilJRgB5kXbKmJSWhGWsyxJdFB68ALZ9lZ0CXXok85iyW6g/CsP6gYHssWJYm1CWV/ljQAazSydMJ/8UyQ1IBJq0a6pRrv2e0SCA5HgQDKdISquGjm+FpFYj5pUz3x528Z3pvzRbDUjet03z9X4RpT19cgmB4qpBsVUgzDXIsx1qPENCHMNn+ozj773TJoP5xrmRCV/qzXuG9KtOByUVh8LSauPh3Qrj0wsWvblvXm6rY2zPl5s/dc3/pe8BiACa2LAfOYnAAAAAElFTkSuQmCC"
    }, {
			name : "分隔线",
		},
		//伪装 日本DoCoMo手机
    { name: "DoCoMo",
    ua: "DoCoMo/1.0/P502i/c10 (Google CHTML Proxy/1.0)",
    label: "DoCoMo",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWM4w2D8nxLMMGoAwoCXk1f+P8Ng/P//////X05c/v+2Zy5pBvz//598F7ycuPw/DMDY14xjUPjYaLgBMHDbMxcrfcsDuzhRLoApRKYxXDA4onEEGwAAOydBL6/POBgAAAAASUVORK5CYII="
    }, {
			name : "分隔线",
		},
		//伪装 UC 浏览器
    { 
      name: "UcBrowser",
      ua: "NOKIA5700/ UCWEB7.0.2.37/28/999",
      label:"UcBrowser",
      img:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAADJUlEQVQ4jXWTT2xUVRTGj4kCVRIXZsK8c2PcdCMsuqhgumLivHNXLpQEbfyTGBaamCY+6p8BlVCbJkaNUyTWOJpQnb5zQ2KoQILd4DhQChptmaQOlQ61tTQMndc359ZqYNXrhqntKGd1F+f73ZPzfQegqQZSia3so8+ExwzhFaOxZjTWDOEVQ/jVUBppIJXY2qxbqzCd3MlaFQzhKmtVYVJ5JsyEhG8xqTxrVTGEq0yqGKaTO/8DYN/bY7S6zYRzoe8FgynY0txztBU2h74XGI2zRqvb7Ht7/gVor90QrjDh5TCd3L5Od8//vcN0crvRqsQa/8yT9xj07IBNTKpoNM4PpRKtAADZDmi5M8kGyI2r5YM3rpYPikgwfe67PkN4kwlHYSiNxKRu/TRwaFhKhTkRCQZTsKUeR1/Y6V9mlheujYpIICLBwvj5Y5P9gbs+1OdseWyi2Pvyt0YrB3dc+Fl+PXe59uxDTqJqLwDA8spfR5YO7HZy6hMnIoEU2F1/4WE39e7T7mb4nouz+1x15rcME/4BhtQkE35qy2MTd4PYSmmk1plwMjbsourC6yIS2JWVV0QkMISngAkXjcY37fR48W6Q+vE+F3W1uYZwg6ukjgATLhlfvWOnLm6YxFqbW4N8/bZb6t7lmgEAAEarfmDCMmv8zE6PF2t7H3R2fsqISGCtzUVdbU7OfO7shROu1plwtlIaiaPF7qg6/0Zj2azxJDDhl0x4WkSCpQO7XfxBp5NSYa4+mHG1lx5xDXfij190UVebi74PXfXSmUv10W9cdbaSYcI5YB99Q+rH3y+e7ZWo2ls/8ZGLs/tcPTzslheujVprc41fpcCu9uFzLnr/GVcPD7ti36vDRisH2Q5oYY0hkzq01iwSxHG0vzZbyfSk4F4AAJE4iKPF7jiO9jfCdvzJ1mUmvLAu9uoH9rEr1w73NZaWa8f783rbAz07YNP69OZ971FDOMEa/95wiCaNTxlSk0bjCKe954+2wuZmJ7Id0MLkvbZ2gKT2NvdAXm97nAnPMqlbTGqGCU8brfrZV1nWeJJJzRjCVaPxPD+R3NXQ/QNwDAodRa2GoQAAAABJRU5ErkJggg=="
    }, {
			name : "分隔线",
	  },
		//伪装 Google 爬虫
		{
			name : "Googlebot",
			ua : "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
			label : "Googlebot",
			img : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACxklEQVQ4jb2TW0hTARjHj1j0kiXdL/YSCdJDF4qECsGSQJOeWgVFrCItug260LrASaY2llvbWm6i6damZbZZbEuns9Uu7tY2d87Z2c7Z2XrxIaiwl6DA/j1Uq4guT/1fvpf///d9H3wfQfwHFfWYTK4Rt2fS5XKVK5XK5X90kyRZo9Foyq4rFAdUqtsrT5yRViYoBrzwcspqtS6SyWQbfwldukSuEYslpSRJrhoYsJ3xj4dedXUHIWsdmNq2XTe1ZasdbTeHPvb32zaYzGZJa6ty1Y8dZ5AkOc/nD5k9Xh8diSffmSyJt3v2qcDyOQSjHErmWmDoegp/KPomwWQQo1mtSCQqbmw8XU5YLJaV32CO4RFlRngJydkg6uo1YLN5sNk8anYM4NzFW2D4PBguj2Q6+2nY/cwh12qXEcbe3jVGo6Var++s6uq5a0tl89B1+DGntAlDYwnQXA519So8fOwClckhmckhmRbeaDTOWYU1RCJRscM1xtJcDjSXB83lcEPdB/ERNXbu6oWm/R4mWAETaQGJtIAEK+CJ61ldAaDW3VYEY9T09w45TKQFBOMcFiy+ioOH+xClecTYLGKpLF6ksgjEaDQ3q5YSBEEU9w/aJ3+kO0YYSM514FqLGRcu67BoyTEcONSBKMMjyvCIfKl0YQL70Gh1OMlGYqksnodZrFt/Eg63txC4/8iHshX74YsxCFM8QhQ/7XtBnf/pFrQGQ4V91Bt/aA9jdsleDA4FEKZ5hKjMa3eAel9bfwr+OItQkhO6u22l+k5LlVwuLykApNKWhQ8eDw+HKA6Np+SoWC3C8dMqyBRmtfjwlaNmq1Pmjafehhle+tszbmhomGkw9VU6PYGwJ0J9eDTqg30s0EQQBNGsUi1t0+jXEgRR9Mdf+Kqiuw8GN7uej2+5Z3PWtncaN+nvmHffMhrn/0v4J9DfDJ8BKCTDLoGbeskAAAAASUVORK5CYII="
		}, {
			name : "分隔线",
		},
		//伪装 BaiduYun
    {  
      name: "BaiduYun",//此处文字显示在右键菜单上，中文字符请转换成javascript编码，否则乱码(推荐http://rishida.net/tools/conversion/)
      ua: "netdisk;4.4.0.6;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia",
      label: "BaiduYun",//此处文字显示在状态栏上，如果你设置状态栏不显示图标
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAARldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRldsRlduHtWONAAAAIHRSTlMABPtN8o+AMOqpoVVAIOXWzsS1i4V0bV4QCfXSmEYpFlLU/usAAAB7SURBVBjTjY83EsQwDAOpZEXnfBH/f+VR8ozPpbfAACAa0l3WYOw1e3ROxn9+I5LwTpxF1bAk1GexZD/jeyRROaBdjAaeqez1GHswRnlpeaAnol1DKvbdi2gDO+qxlnVgaQdBFjNl6nxMj2aQExWM3Fk/Y1B0sNkbb/4A72EF1CHAmjQAAAAASUVORK5CYII="
    }, {
			name : "分隔线",
		},  
		// 添加ua，到此结束
	],

	UANameIdxHash : [],

	// ----- 下面设置开始 -----
	// defautl: ステータスバーの右端に表示する
	TARGET : null, // 定义一个target，用来调整状态栏顺序,null为空

	ADD_OTHER_FX : true, // true:自动添加其他版本firefox的ua  false:不添加
	
	//2种版本firefox，下面请勿修改
	EXT_FX_LIST : [{
			name : "Firefox4.0",
			ua : "Mozilla/5.0 (Windows; Windows NT 6.1; rv:2.0b2) Gecko/20100720 Firefox/4.0b2",
			label : "Fx4.0",
			img : ""
		}, {
			name : "Firefox3.6",
			ua : "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
			label : "Fx3.6",
			img : ""
		},
	],
	// ----------------------
	// UA リストのインデックス
	def_idx : 0,
	Current_idx : 0,

	// 初期化
	init : function () {
		this.mkData(); // UA データ(UA_LIST)を作る
		this.mkPanel(); // パネルとメニューを作る
		this.setSiteIdx();
		// Observer 登録
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);
		// イベント登録
		var contentArea = document.getElementById("appcontent");
		contentArea.addEventListener("load", this, true);
		contentArea.addEventListener("select", this, false);
		var contentBrowser = this.getContentBrowser();
		contentBrowser.tabContainer.addEventListener("TabClose", this, false);
		window.addEventListener("unload", this, false);
	},
	onDocumentCreated : function (aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader("User-Agent");
			if (navigator.userAgent != userAgent)
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), "userAgent", {
					value : userAgent,
					enumerable : true
				});
		}
	},
	// UA データを作る
	mkData : function () {
		var ver = this.getVer(); // 現在使っている Firefox のバージョン
		// 現在使っている Firefox のデータを作る
		var tmp = [];
		tmp.name = "Firefox" + ver;
		tmp.ua = "";
		tmp.img = this.NOW_UA_IMG;
		tmp.label = "Fx" + (this.ADD_OTHER_FX ? ver : "");
		this.UA_LIST.unshift(tmp);
		// Fx のバージョンを見て UA を追加する
		if (this.ADD_OTHER_FX) {
			if (ver == 3.6) { // Fx3.6 の場合 Fx4 を追加する
				this.EXT_FX_LIST[0].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[0]);
			} else { // Fx3.6 以外では Fx3.6 を追加する
				this.EXT_FX_LIST[1].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[1]);
			}
		}
		// 起動時の UA を 初期化 (general.useragent.override の値が有るかチェック 07/03/02)
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (preferencesService.getPrefType("general.useragent.override") != 0) {
			for (var i = 0; i < this.UA_LIST.length; i++) {
				if (preferencesService.getCharPref("general.useragent.override") == this.UA_LIST[i].ua) {
					this.def_idx = i;
					break;
				}
			}
		}
	},
	// UA パネルを作る
	mkPanel : function () {
		var uacPanel = document.createElement("toolbarbutton");
		uacPanel.setAttribute("id", "uac_statusbar_panel");
		uacPanel.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		uacPanel.setAttribute("type", "menu");
		// css 解决按钮定义在urlbar-icons撑大地址栏，变宽……
		document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
		'\
		#uac_statusbar_panel {\
		  -moz-appearance: none !important;\
		  border-style: none !important;\
		  border-radius: 0 !important;\
		  padding: 0 3px !important;\
		  margin: 0 !important;\
		  background: transparent !important;\
		  box-shadow: none !important;\
		  -moz-box-align: center !important;\
		  -moz-box-pack: center !important;\
		  min-width: 18px !important;\
		  min-height: 18px !important;\
		          }\
		#uac_statusbar_panel > .toolbarbutton-icon {\
			max-width: 18px !important;\
		    padding: 0 !important;\
		    margin: 0 !important;\
		}\
		#uac_statusbar_panel dropmarker{display: none !important;}\
		    ') + '"'), document.documentElement);

		uacPanel.setAttribute("image", this.UA_LIST[this.def_idx].img);
		uacPanel.style.padding = "0px 2px";

		var toolbar = document.getElementById("urlbar-icons");
		if (this.TARGET != null) { // default から書き換えている場合
			this.TARGET = document.getElementById(this.TARGET);
		}
		toolbar.insertBefore(uacPanel, this.TARGET);
		// UA パネルのコンテクストメニューを作る
		var PopupMenu = document.createElement("menupopup");
		PopupMenu.setAttribute("id", "uac_statusbar_panel_popup");
		for (var i = 0; i < this.UA_LIST.length; i++) {
			if (this.UA_LIST[i].name == "分隔线") {
				var mi = document.createElement("menuseparator");
				PopupMenu.appendChild(mi);
			} else {
				var mi = document.createElement("menuitem");

				mi.setAttribute('label', this.UA_LIST[i].name);
				mi.setAttribute('tooltiptext', this.UA_LIST[i].ua);
				mi.setAttribute('oncommand', "ucjs_UAChanger.setUA(" + i + ");");

				if (this.DISPLAY_TYPE) {
					mi.setAttribute('class', 'menuitem-iconic');
					mi.setAttribute('image', this.UA_LIST[i].img);
				} else {
					mi.setAttribute("type", "radio");
					mi.setAttribute("checked", i == this.def_idx);
				}
				if (i == this.def_idx) {
					mi.setAttribute("style", 'font-weight: bold;');
					mi.style.color = 'red';
				} else {
					mi.setAttribute("style", 'font-weight: normal;');
					mi.style.color = 'black';
				}
				mi.setAttribute("uac-generated", true);
				PopupMenu.appendChild(mi);
			}
		}
		uacPanel.addEventListener("popupshowing", this, false);
		uacPanel.appendChild(PopupMenu);

		// パネルの変更を可能にする
		uacPanel.setAttribute("context", "uac_statusbar_panel_popup");
		uacPanel.setAttribute("onclick", "event.stopPropagation();");
	},
	// URL 指定で User-Agent の書き換え(UserAgentSwitcher.uc.js より)
	observe : function (subject, topic, data) {
		if (topic != "http-on-modify-request")
			return;
		var http = subject.QueryInterface(Ci.nsIHttpChannel);
		for (var i = 0; i < this.SITE_LIST.length; i++) {
			if (http.URI && (new RegExp(this.SITE_LIST[i].url)).test(http.URI.spec)) {
				var idx = this.SITE_LIST[i].idx;
				http.setRequestHeader("User-Agent", this.UA_LIST[idx].ua, false);
			}
		}
	},
	// イベント・ハンドラ
	handleEvent : function (aEvent) {
		var contentBrowser = this.getContentBrowser();
		var uacPanel = document.getElementById("uac_statusbar_panel");
		var uacMenu = document.getElementById("uac_statusbar_panel_popup");
		switch (aEvent.type) {
		case "popupshowing": // コンテクスト・メニュー・ポップアップ時にチェック・マークを更新する
			var menu = aEvent.target;
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (i == ucjs_UAChanger.Current_idx) {
					menu.childNodes[i].setAttribute("style", 'font-weight: bold;');
					menu.childNodes[i].style.color = 'red';
					if (!this.DISPLAY_TYPE)
						menu.childNodes[i].setAttribute("checked", true);
				} else {
					menu.childNodes[i].setAttribute("style", 'font-weight: normal;');
					menu.childNodes[i].style.color = 'black';
				}
			}
			break;
		case "load": // SITE_LIST に登録された URL の場合
		case "select":
		case "TabClose":
			for (var i = 0; i < ucjs_UAChanger.SITE_LIST.length; i++) {
				if ((new RegExp(this.SITE_LIST[i].url)).test(contentBrowser.currentURI.spec)) {
					var idx = this.SITE_LIST[i].idx;
					this.setImage(idx);
					return;
				}
			}
			this.setImage(this.def_idx);

			break;
		case "unload": // 終了処理
			var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
			os.removeObserver(this, "http-on-modify-request");
			os.removeObserver(this.onDocumentCreated, "content-document-global-created");
			var contentArea = document.getElementById("appcontent");
			contentArea.removeEventListener("load", this, true);
			contentArea.removeEventListener("select", this, false);
			if (contentBrowser)
				contentBrowser.tabContainer.removeEventListener("TabClose", this, false);
			uacMenu.removeEventListener("popupshowing", this, false);
			window.removeEventListener("unload", this, false);
			break;
		}
	},
	// 番号を指定して UA を設定
	setUA : function (i) {
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (i == 0) { // オリジナル UA にする場合
			// 既にオリジナル UA の場合は何もしない
			if (preferencesService.getPrefType("general.useragent.override") == 0)
				return;
			preferencesService.clearUserPref("general.useragent.override");
		} else { // 指定した UA にする場合
			preferencesService.setCharPref("general.useragent.override", this.UA_LIST[i].ua);
		}
		this.def_idx = i;
		this.setImage(i);
	},
	// UA パネル画像とツールチップを設定
	setImage : function (i) {
		var uacPanel = document.getElementById("uac_statusbar_panel");

		uacPanel.setAttribute("image", this.UA_LIST[i].img);
		uacPanel.style.padding = "0px 2px";

		this.Current_idx = i;
	},
	// アプリケーションのバージョンを取得する(Alice0775 氏のスクリプトから頂きました。)
	getVer : function () {
		var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
		var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
		return ver;
	},
	setSiteIdx : function () {
		for (let i = 0; i < this.UA_LIST.length; i++) {
			this.UANameIdxHash[this.UA_LIST[i].name] = i;
		}
		for (let j = 0; j < this.SITE_LIST.length; j++) {
			var uaName = this.SITE_LIST[j].Name;
			if (this.UANameIdxHash[uaName]) {
				this.SITE_LIST[j].idx = this.UANameIdxHash[uaName];

			} else {
				this.SITE_LIST[j].idx = this.def_idx;

			}
		}
	},
	// 現在のブラウザオブジェクトを得る。
	getContentBrowser : function () {
		var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"]
			.getService(Ci.nsIWindowMediator);
		var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
		if (topWindowOfType)
			return topWindowOfType.document.getElementById("content");
		return null;
	}
}
ucjs_UAChanger.init();
