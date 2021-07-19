var $ = require("../../utils/api.js")
import router from "../../utils/router";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
    list:[]
  },
  currentId:"",
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
      url:router.H5_LIST
    }).then(res=>{
      this.setData({
        list:res.data
      })
    })
  },
  goPage(e){
    if(app.globalData.userInfo.phone!=1){
      wx.showToast({
        title: '绑定手机才可享受通关积分',
        icon:"none"
      })
      return;
    }
    this.currentId = e.currentTarget.dataset.id;
    $.ajax({
      url:router.H5_SETPLAY+"?id="+e.currentTarget.dataset.id
    }).then(res=>{
      wx.navigateTo({
        url: 'h5?url='+e.currentTarget.dataset.url
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