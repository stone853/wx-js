// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
    list:[],
    open:[]
  },
  sid:"",
  setDeliver(e){
    $.ajax({
      url:router.S_DELIVER+"?no="+e.currentTarget.dataset.no
    }).then(res=>{
      this.init(this.sid);
      wx.showToast({
        title: res.message,
        icon:"none"
      })
    })
  },
  setOpen(e){
    this.setData({
      ["open["+e.currentTarget.dataset.index+"]"]:!this.data.open[e.currentTarget.dataset.index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  init(id){
    $.ajax({
      url:router.S_WAIT+"?id="+id
    }).then(res=>{
      this.sid = id;
      this.setData({
        list:res.data
      })
    })
  },
  onLoad: function (options) {
    this.init(options.id);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		
  },


})