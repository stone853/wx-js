var $ = require("../../utils/api.js");
import router from "../../utils/router";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",

    host:$.host,
    prefix:$.prefix,

    search:{
      pageNum:1,
      totalPages:1,
    },
    list:[],
  },
  goDetail(e){
    wx.navigateTo({
      url: '../product/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  onSearch({detail}){
    $.ajax({
      url:router.PRO_SEARCH_PAGE+`?name=${detail}&pageNum=1&pageSize=12`
    }).then(res=>{
      this.setData({
        list:res.list,
        ["search.pageNum"]:2,
        ["search.totalPages"]:res.totalPages,
        value:detail
      });
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
    if(this.data.search.pageNum <= this.data.search.totalPages){
      $.ajax({
        url:router.PRO_SEARCH_PAGE+`?name=${this.data.value}&pageNum=${this.data.search.pageNum}&pageSize=12`
      }).then(res=>{
        this.setData({
          list:this.data.list.concat(res.list),
          ["search.pageNum"]:(this.data.search.pageNum+1)
        });
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})