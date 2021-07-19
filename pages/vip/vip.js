// pages/vip/vip.js
var $ = require("../../utils/api.js");
import router from "../../utils/router";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix_img: $.host+$.prefix_img,
    list:{
      special:[1,2,3,4,5,6,7,8],
      merchant:[1,2,3,4],
    },
    isVip:false,
  },

	goPage(e){
		let url = e.currentTarget.dataset.url;
		wx.navigateTo({
			url: url,
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isVip: app.globalData.userInfo.u_isVip==1,
      levelTime: app.globalData.userInfo.levelTime.split(" ")[0],
      id:app.globalData.userInfo?app.globalData.userInfo.id:"",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    $.ajax({
      url:router.Achieve_SET+"?id=15",
      noloading:true,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  
  toPay(e){
    const amount = 24.8*100;
    $.ajax({
      url:router.PAY_CART_1_month,
      data:{
        amount:amount,
        _amount:amount,
        description:"满月祝福"
      }
    }).then(res=>{
      wx.requestPayment({
        ...res.data,
        success (pay) {
          $.ajax({
            url:router.O_PAYCARTMonthSUCCESS,
            method:"POST",
            data:{
              out_trade_no:res.data.out_trade_no,
              _amount:amount,
              amount,
            }
          }).then(res=>{
            wx.showToast({
              title: '支付成功！',
            });
            setTimeout(()=>{
              wx.reLaunch({
                url: '../tabbar/my/my',
              })
            },2000)
          })
        },
        fail (res) {
          wx.showToast({
            title: '支付失败',
            icon:"none"
          })
        }
      })
    })
  },
})