var $ = require("../../utils/api.js")
import router from "../../utils/router";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
    url:"",
  },
  h5Load(e){
    console.log(e)
  },
  h5PostMessage(e){
    console.log(e);
    var data = e.detail.data;
    data = data[data.length-1];
    $.ajax({
      url:router.H5_SETPOINT+"?id="+data.id+"&point="+data.RA_HIGHSCORE
    }).then(res=>{
      if(res.data.add>0){
        wx.showToast({
          title: res.data.desc+'+'+res.data.add,
          icon:"none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url:options.url
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})