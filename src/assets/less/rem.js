(function (doc, win) {
  if ((navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    ))) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        var fs = 100 * (clientWidth / 750);
        docEl.style.fontSize = fs + 'px';
        var realfs = ~~(+window.getComputedStyle(document.documentElement).fontSize.replace('px', '') * 10000) /
          10000;
        if (fs !== realfs) {
          docEl.style.fontSize = fs * (fs / realfs) + 'px';
        }
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
})(document, window);