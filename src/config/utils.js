export const getTerminal = () => {
  // 获取终端的相关信息
  var Terminal = {
    // 辨别移动终端类型
    platform: function () {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        // android终端或者uc浏览器
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        // 是否为iPhone或者QQHD浏览器
        iPhone: u.indexOf('iPhone') > -1,
        // 是否iPad
        iPad: u.indexOf('iPad') > -1
      };
    }(),
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  // 根据不同的终端，跳转到不同的地址
  if (Terminal.platform.android) {
    return 'android';
  } else if (Terminal.platform.iPhone) {
    return 'ios';
  }
}

// 让元素在屏幕居中显示
export const attrCenter = (ele) => {
  $(ele).css({
    position: 'absolute',
    left: (document.body.clientWidth - $(ele).width()) / 2 + document.body.scrollLeft,
    top: ((document.body.clientHeight - $(ele).height()) / 2 + $(document).scrollTop()) <
      0 ? 0 : (document.body.clientHeight - $(ele).height()) / 2 + $(document).scrollTop(),
  });
}

// 获取地址栏参数
export const getUrlParam = (para, callback) => {
  let search = location.hash.split('?')[1]
  if (search != undefined) {
    let paraArr = search.split('&')
    for (let i = 0; i < paraArr.length; i++) {
      if (para === paraArr[i].split('=')[0]) {
        return window.decodeURIComponent(paraArr[i].split('=')[1])
      }
    }
  }
  return ''
}

// 处理数组中超过10000的数字显示处理——数字过万，则四舍五入显示多少万
export const numFixed = (num) => {
  // Math.floor(num * 10) / 10
  let newNum = (num / 10000).toFixed(1)
  return newNum
}

// 下载APP
export const dowmloadApp = () => {
  var data = {};
  linkedme.init("99fbdc474cea39f4e2c83ecd87e958ee", data, function () {});
  data.params = '{"path":"run/malasong","id":"123456"}';
  data.type = "live";
  data.tags = "a";
  data.ios_custom_url = "https://www.marathonbm.com/down/marathon";
  //data.ios_direct_open = "true"; 
  data.android_custom_url = "https://www.marathonbm.com/down/marathon";
  //data.android_direct_open = "true";    
  linkedme.link(data, function (err, response) {
    if (err) {
      // 生成深度链接失败，返回错误对象err                    
    } else {
      // document.getElementById("openAPP1").href=response.url;
      window.location.href = response.url
    }
  }, false);
}

// 判断是否为微信浏览器
export const isWechatWeb = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
