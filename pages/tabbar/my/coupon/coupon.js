var $ = require("../../../../utils/api.js")
import router from '../../../../utils/router.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    active:0,

    navs:[
      {name:"未使用",id:1},
      {name:"已使用",id:0},
      {name:"已失效",id:2},
    ],

    host:$.host,
    imageUrl:$.host+$.prefix_img,
  },
  onClickToJoin(){
    wx.switchTab({
      url: '../../person/person',
    })
  },
  goPage(){
    wx.navigateTo({
      url: '../../../coupon/coupon',
    })
  },
  changeNav(e){
    this.init(e.detail.id, e.detail.index)
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
    this.init(1,0);
  },
  init(status,idx){
    $.ajax({
      url:router.C_SEARCH+"?status="+status+"&pageNum=1&pageSize=45"
    }).then(res=>{
      this.setData({
        ["list["+idx+"]"]:res.data,
        active:idx,
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

})