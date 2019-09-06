var cunovs = {
  cnGlobalIndex: 0,
  cnhtmlSize: 0,
  cnhtmlHeight: document.documentElement.clientHeight,
  cnId: function () {
    return cnGlobalIndex++
  },
  cnIsArray: function (o) {
    if (cnIsDefined(o)) {
      return cnIsDefined(Array.isArray) ? Array.isArray(o) : Object.prototype.toString.call(o) == '[object Array]'
    }
    return false
  },
  cnIsDefined: function (o) {
    return (typeof (o) != 'undefined' && o != 'undefined' && o != null)
  },
  cnIsDevice: function () {
    return typeof (device) != 'undefined'
  },
  cnSetStatusBarStyle: function () {
    if (typeof (StatusBar) != 'undefined') {
      StatusBar.styleLightContent()
      StatusBar.backgroundColorByHexString('#000')
    }
  },
  cnTakePhoto: function (cb, type) {
    var onSuccess = function (cb, dataurl) {
      cb(cnCreateBlob(dataurl), dataurl)
    }
    var onFail = function () {
    }
    navigator.camera.getPicture(onSuccess.bind(null, cb), onFail, {
      //allowEdit: true //运行编辑图片
      destinationType: Camera.DestinationType.DATA_URL,
      PictureSourceType: type,
    })
  },
  cnCreateBlob: function (data, name, type) {
    var arr = data.split(',')
      ,
      bstr = atob(arr.length > 1 ? arr[1] : data)
      ,
      n = bstr.length
      ,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var blob = new Blob([u8arr], {
      type: type || 'image/jpeg',
    })
    blob.name = name || 'img_' + (cnGlobalIndex++) + '.jpg'
    return blob
  },
  cnDecode: function (json) {
    try {
      return eval('(' + json + ')')
    } catch (e) {
      try {
        return JSON.parse(json)
      } catch (e) {
        return json
      }
    }
  },
  cnShowToast: function (d, time) {
    //退出提示
    var dialog = document.createElement('div')
    dialog.style.cssText = 'position:fixed;' + 'font-size:12px;' + 'left:50%;' + 'bottom:5%;' + 'background-color:rgba(0,0,0,0.5);' + 'z-index:9999;' + 'padding:5px 10px;' + 'color:#fff;' + 'border-radius:5px;' + 'transform:translate(-50%,-50%);' + '-webkit-transform:translate(-50%,-50%);' + '-moz-transform:translate(-50%,-50%);' + '-ms-transform:translate(-50%,-50%);' + '-o-transform:translate(-50%,-50%);'
    dialog.innerHTML = d
    document.getElementsByTagName('body')[0].appendChild(dialog)
    setTimeout(function () {
      if (dialog) {
        document.getElementsByTagName('body')[0].removeChild(dialog)
      }
    }, time || 2000)
  },
}

window.cnApply = cunovs.cnIsDefined(Object.assign) ? Object.assign : function (target, source) {
  if (target && source && typeof source == 'object') {
    for (var att in source) {
      target[att] = source[att]
    }
    return target
  }
  return target || {}
}
cnApply(window, cunovs)

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0
  }
}

(function () {
  var onDeviceReady = function () {
      try {
        if (cnIsDefined(StatusBar) != 'undefined') {
          StatusBar.overlaysWebView(false)
          cnSetStatusBarStyle()
        }
      } catch (exception) {
      }
    },
    exitApp = function () {
      navigator.app.exitApp()
    },
    onExitApp = function () {
      if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined') {
        var curHref = window.location.href
        if (curHref.indexOf('/login') != -1) {
          navigator.app.exitApp()
        } else if (curHref.indexOf('/?_k') != -1) {
          cnShowToast('再按一次退出APP')
          document.removeEventListener('backbutton', onExitApp, false)
          document.addEventListener('backbutton', exitApp, false)
          var intervalID = window.setTimeout(function () {
            window.clearTimeout(intervalID)
            document.removeEventListener('backbutton', exitApp, false)
            document.addEventListener('backbutton', onExitApp, false)
          }, 2000)
        } else {
          navigator.app.backHistory()
        }
      }
    }
  document.addEventListener('deviceready', onDeviceReady, false)
  document.addEventListener('backbutton', onExitApp, false)

  function resizeBaseFontSize () {
    var rootHtml = document.documentElement
      ,
      deviceWidth = rootHtml.clientWidth
    if (deviceWidth > 1024) {
      deviceWidth = 1024
    }
    cnhtmlSize = deviceWidth / 7.5
    rootHtml.style.fontSize = cnhtmlSize + 'px'
  }

  resizeBaseFontSize()
  window.addEventListener('resize', resizeBaseFontSize, false)
  window.addEventListener('orientationchange', resizeBaseFontSize, false)
})()
