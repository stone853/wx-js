// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
    showCart:false,
    list:[],
    detail:[],
    status:0,
  },
  current:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		$.ajax({
			url:router.RE_LIST+"?status=0"
		}).then(res=>{
      this.setData({
        list:res.data
      })
    })
  },
  getDetail(e){
    this.current = e.currentTarget.dataset.idx;
    $.ajax({
      url:router.RE_DETAIL+this.data.list[this.current].out_trade_no
    }).then(res=>{
      this.setData({
        showCart:true,
        status:this.data.list[this.current].status,
        detail:res.data,
      })
    })
  },
  goBack(){
    this.setData({
      showCart:false,
    })
  },
  toRefund(e){
    const amount = this.data.detail.amount;
    $.ajax({
      url:router.PAY_REFUND_AGREE,
      data:{
        no:this.data.list[this.current].out_trade_no,
        amount:+amount
      }
    }).then(res=>{
      wx.showToast({
        title: res.message,
      })
      this.goBack();
      this.onShow();
    })
  },
})