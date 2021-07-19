var $ = require("../../../utils/api.js");
import router from "../../../utils/router";
const a = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
    //-----------
    imageUrl:$.host+$.prefix_img,
    item:{},
  },
 
  // ----------------------
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.id = options.id||0;
    $.ajax({
      url:router.O_SEARCH+"?id="+options.id
    }).then(res=>{
      this.setData({
        item:res.data
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
  goBack(){
    if(getCurrentPages().length==1){
      wx.switchTab({
        url: '../../tabbar/home/index',
      })
      return;
    }
    wx.navigateBack()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})