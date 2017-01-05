// ==UserScript==
// @description  AutoSelectTab
// @description  鼠标在tab上悬停200毫秒后激活该tab
// @include        main
// @version      1.1
// ==/UserScript==
(function () {
	gBrowser.mTabContainer.addEventListener('mouseover', function self(event) {
		if ((self.target = event.target).localName === 'tab'
			&& !self.target.selected
			&& !self.target.pinned) {

		if (!self.timeoutID) {
			this.addEventListener('mouseout', function () {
				clearTimeout(self.timeoutID)
				self.timeoutID = null;
			}, false);
		}
		self.timeoutID = setTimeout(function () {
			gBrowser.selectedTab = self.target;
		}, 200);
	}
}, false)
}());
