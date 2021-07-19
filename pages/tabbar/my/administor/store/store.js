// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
Page({

  /**
   * 页面的初始数据
   */
  data: {
		host:$.host,
		list:[],
		hiddenDetail:true,
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.init();
	},
	init(){
		$.ajax({
			url:router.S_ALL+"?status=0"
		}).then(res=>{
			this.setData({
				list:res.data
			})
		});
	},
	handlerClick(e){
		console.log(e)
		const {idx, type}= e.currentTarget.dataset;
		$.ajax({
			url:router.S_SET+"?status="+type+"&o="+this.data.list[idx].openid
		}).then(res=>{
			wx.showToast({
				title: '修改成功！',
			})
			this.init();
		})
	},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})