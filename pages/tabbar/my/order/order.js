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
      {name:"全部",id:""},
      {name:"已付款",id:101},
      {name:"已完成",id:102},
    ],

    host:$.host,
    imageUrl:$.host+$.prefix_img,
  },
  handleRefund(e){
    const {out_trade_no} = this.data.list[this.data.active][e.currentTarget.dataset.idx];
    $.ajax({
      url:router.REFUND_INSERT,
      type:"post",
      data:{out_trade_no}
    }).then(res=>{
      wx.showToast({
        title: '申请成功，请等待商家确认',
        icon:"none"
      });
      this.setData({
        ["list["+this.data.active+"]["+e.currentTarget.dataset.idx+"].status"]:107
      })
    })
  },
  goPay(e){
    wx.navigateTo({
      url: "../../../product/order/order?id="+e.currentTarget.dataset.id,
    })
  },
  changeNav(e){
    this.setData({
      active:e.detail.index,
    })
    if(this.data.list[e.detail.index]){
      return;
    }
    this.init({status:e.detail.id})
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
    this.init();
  },
  init(status){
    var idx = this.data.active;
    $.ajax({
      url:router.O_USERALL,
      data:status||{}
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