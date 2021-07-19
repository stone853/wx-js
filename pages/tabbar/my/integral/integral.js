var $ = require("../../../../utils/api.js");
import router from "../../../../utils/router";
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix_img:$.host+$.prefix_img,
    price:[]
  },
    
  toPay(e){
    const {id}=e.currentTarget.dataset;
    $.ajax({
      url:router.PAY_CART_1_integral,
      data:{
        description:"积分储值",
        id
      }
    }).then(res=>{
      const {nonceStr,out_trade_no,paySign,signType,timeStamp, amount} = res.data;
      wx.requestPayment({
        nonceStr,out_trade_no,paySign,signType,timeStamp,
        package:res.data.package,
        success (pay) {
          $.ajax({
            url:router.O_PAYCARTMonthSUCCESS,
            method:"POST",
            data:{
              out_trade_no,
              amount
            }
          }).then(res=>{
            wx.showToast({
              title: '支付成功！',
            });
            setTimeout(()=>{
              wx.reLaunch({
                url: '../tabbar/my/my',
              })
            },2000)
          })
        },
        fail (res) {
          wx.showToast({
            title: '支付失败',
            icon:"none"
          })
        }
      })
    })
  },
  goPage(){
    wx.navigateTo({
      url: '../ibill/ibill',
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
      url:router.I_LIST
    }).then(res=>{
      this.setData({
        price:res.data
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