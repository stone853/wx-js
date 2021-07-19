const host ="https://csh111.top";
const prefix = "/crm";
const prefix_img = "/crm/product_image/v1/getImage?path=";
const imageCdn = "https://eckes.gitee.io/eckes.top.images/imgs/csh111";

function ajax(model) {
  // 控制是否显示加载动画
  if (model.noloading !== true) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
  //请求方式
  model.method = model.method?model.method:(model.data?'POST':'GET');
  
  //返回Promise对象
  return new Promise(
    function(resolve, reject) {
      var fn = function(){
        const a =getApp();
        var header = {};
        if(a.globalData.cookie){
          header['Cookie'] = a.globalData.cookie;
        }
        if (a.globalData.userInfo.token) {
          header['token'] = a.globalData.userInfo.token;
        }
        header.token = header.token || "234";

        
        wx.request({
          method: model.method,
          url: host+prefix+model.url,
          data: model.data,
          header: header,
          success: (res) => {
            // 是否关闭loading
            if (model.hide !== false) {
              wx.hideLoading()
            }
            if (res.statusCode == 200) {
              if (!a.globalData.cookie) {
                a.globalData.cookie=res.header['Set-Cookie'];
              }
              if ( (res.data.code == 0 || res.data.code >=300) && !model.noErrMsg) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none'
                });
                if(res.data.code==401){
                  a.globalData.userInfo.token="";
                }
                reject(res.data.message,res.data)
              }else if (res.data.code > 0) {
                resolve(res.data);
              }
  
            } else {
              if(res.data.code==401){
                a.globalData.userInfo={};
                wx.switchTab({
                  url: '/pages/tabbar/my/my',
                })
                // wxLogin(code=>{
                //   ajax({
                //     url:"/login.php",
                //     method:"POST",
                //     data:{code}
                //   }).then(res=>{
                //     a.globalData.userInfo.token= res.data.token;
                //     resolve(res.data);;
                //     return;
                //   })
                // })
              }
              reject(res.data.message||"网络异常，请重试",res.data)
              if(model.noErrMsg)return;
              //错误信息处理
              wx.showToast({
                title: (res.data.message||"网络异常，请重试"),
                icon: 'none'
              })
            }
          },
          fail: (err) => {
            if(model.nofail){
              return;
            }
            err = Object.prototype.toString.call(err) === '[object Object]'? err.errMsg : err
            wx.hideLoading()
            wx.showToast({
              title: "网络异常，请重试",
              icon: 'none'
            })
            reject();
          }
        })
      };
      //if(wx.getStorageSync('token')){
        fn()
      //}else{
      //  a.getToken(fn);
      //}
    }
  )
}
var wxLogin = function(fn){
  wx.login({
    success (res) {
      if (res.code) {
        fn && fn(res.code);
      } else {
        wx.showToast('登录失败！' + res.errMsg)
      }
    }
  })
}
module.exports = {
  ajax,
  host,
  prefix,
  prefix_img,
  imageCdn,
  wxLogin
}