App({
  onLaunch: function () {
    let _self = this;
    wx.getSystemInfo({
      success: res => {
        _self.globalData.saveArea = res.safeArea;
        _self.globalData.windowWidth = res.windowWidth;
        _self.globalData.windowHeight = res.windowHeight;
        var l = wx.getMenuButtonBoundingClientRect();
		    // 头部宽度
        _self.globalData.navBarHeight = 3 * (l.top - res.statusBarHeight) + l.height + res.statusBarHeight;
        _self.globalData.menuHeight = l.height;
        _self.globalData.menuBottom = 2*(l.top - res.statusBarHeight);
        if (typeof __wxConfig =="object"){
          let version = __wxConfig.envVersion;
          if (version =="develop"){
            //工具或者真机 开发环境
            _self.globalData.plf = 'dev';
            //_self.globalData.platform = 'devtools';
          }else if (version =="trial"){
            //测试环境(体验版)
            _self.globalData.plf = 'devtools';
          }else if (version =="release"){
            //正式环境
            _self.globalData.plf = 'release';
          }
        }else{
          _self.globalData.plf = res.platform;
        }
      
        var bottomTabbarSaveHeight = res.screenHeight - res.safeArea.bottom;
        if(bottomTabbarSaveHeight>0){
          _self.globalData.bottomTabbarSaveHeight = res.screenHeight - res.safeArea.bottom;
        }

      }
    });
  },
  getToken(fn){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://eckes.top/eckes_admin/php/wxapi/login.php',
            method:"POST",
            data:{code:res.code},
            header: {
              token:"token_test"
            },
            success(res){
              wx.setStorageSync('token', res.data.message);
              fn();
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: {},
    platform:'',
    saveArea:{},
    navBarHeight:0,
    menuBottom:0,
    menuHeight:0,
    windowWidth:0,
    windowHeight:0,
    bottomTabbarSaveHeight:0,

    userAddress:[],
  },
})
