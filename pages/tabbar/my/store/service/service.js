// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:{},
    wait:0
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  goPage(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		$.ajax({
      url:router.S_INFO
    }).then(res=>{
      this.setData({
        store:res.data.store,
        wait:res.data.wait
      })
    })
  },


})