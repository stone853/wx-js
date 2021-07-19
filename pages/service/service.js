// pages/vip/vip.js
var $ = require("../../utils/api.js");
import router from "../../utils/router";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix_img:$.host+$.prefix_img,
    isPhone:false,
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
      isPhone: app.globalData.userInfo.phone==1,
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
  
})