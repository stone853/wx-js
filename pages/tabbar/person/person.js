var $ = require("../../../utils/api.js");
import router from "../../../utils/router";
Page({
  data: {
    store:[],
    host:$.host,
    prefix_img:$.host+$.prefix_img,
  },
  goStore(e){
    const {dataset}=e.currentTarget;
    wx.navigateTo({
      url: 'storeDetail/storeDetail?name='+dataset.name+'&id='+dataset.id,
    })
  },
  goPage(){
    wx.switchTab({
      url: '../my/my',
    })
  },
  onLoad: function (options) {
    $.ajax({
      //url:router.S_ALL+"?status=1&plf="+getApp().globalData.plf
      url:router.S_ALL
    }).then(res=>{
      this.setData({
        store: res.list
      })
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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