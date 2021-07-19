var $ = require("../../utils/api.js");
import router from "../../utils/router";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
    imageUrl:$.host+$.prefix_img,
    list:[],
  },
  onclickHomeTap(){
    wx.switchTab({
      url: '../tabbar/home/index',
    })
  },
  onClickTakeCoupon(e) {
    $.ajax({
      url:router.C_ADD+'?id='+e.currentTarget.dataset.item
    }).then(res=>{
      this.setData({
        ["list["+e.currentTarget.dataset.index+"].isUserHas"]:true
      })
      wx.showToast({
        title: res.message,
      })
    })
  },
	goMyCoupon(e){
    if(app.globalData.userInfo.u_level){
      wx.navigateTo({
        url: '../tabbar/my/coupon/coupon',
      });
      return;
    }
		wx.switchTab({
      url: '../tabbar/my/my',
    })
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      url:router.C_ALL+'?status=1'
    }).then(res=>{
      this.setData({
        list:res.data
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})