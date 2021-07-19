var $ = require("../../../../utils/api.js")
import router from '../../../../utils/router.js';
var a = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:[],
    host:$.host,
    prefix_img:$.prefix_img,
  },
  _complete(e){
    const a=e.currentTarget.dataset;
    $.ajax({
      url:router.Achieve_COMPLETE+"?id="+a.id
    }).then(res=>{
      wx.showToast({
        title: '积分+'+this.data.all[a.idx].integral,
      })
      this.setData({
        ["all["+a.idx+"].status"]:2
      })
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
      url:router.Achieve
    }).then(res=>{
      let user="";
      const pl = res.data.all.length;
      const ul = res.data.user.length;
      
      for (let index = 0; index < ul; index++) {
        for (let p = 0; p < pl; p++) {
          if(res.data.user[index].aid == res.data.all[p].id){
            res.data.all[p].status=res.data.user[index].status;
            break;
          }
        }
      }
      this.setData({
        all:res.data.all,
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