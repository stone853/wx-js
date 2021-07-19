// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
var _util = require("../../../../../utils/util.js");
let date = new Date().getTime();
let timeId = "";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:$.host,
		pickerArray:[
			[
				{code:0,value:"服装"},
				{code:1,value:"副食"},
				{code:2,value:"其他"},
				{code:9,value:"通用"},
			]
		],
		ptype:"",
		imgs:[],

		dateTimeShow:false, 
		otherColumns:{
			endTimeTxt:"",
			startTimeTxt:"",
			endTime:"",
			startTime:"",
		},
		minDate:date,
		maxDate:date+3600*60*60*24*105,
		formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
	},
	onTimeClose(e) {
    this.setData({ dateTimeShow: false });
	},
	onTimeConfirm(e){
		const {detail} = e;
		const key = timeId=="endTime"? "otherColumns.endTime":"otherColumns.startTime";
		const key2 = timeId=="endTime"? "otherColumns.endTimeTxt":"otherColumns.startTimeTxt";
		this.setData({
			dateTimeShow: false,
			[key2]:_util.formatTime(new Date(detail)),
			[key]:detail,

		})
	},
	showCalendar(e){
		timeId = e.currentTarget.id;
		this.setData({
			dateTimeShow:true,
		})
	},
	radioChange(e){},
	pickerChange(e){
		this.setData({
			ptype:e.detail[0].code
		})
	},
  uploadFile(uploadFile) {
		return new Promise((resolve, reject) => {
			wx.uploadFile({
				url: $.host + $.prefix + router.F_UPLOAD,
				filePath: uploadFile,
				name: 'file', //上传的所需字段，后端提供
				header:{
					token:app.globalData.userInfo.token
				},
				success: (res) => {
					// 上传完成操作
					const data = JSON.parse(res.data)
					const url = $.host+ data.data
					resolve({
						url: url,
						urlapi: data.data
					})
				},
				fail: (err) => {
					//上传失败：修改pedding为reject
					reject(err)
				}
			});
		})
	},
  img_after(event){
    wx.showLoading({
			title: '上传中...'
		})
		const {file} = event.detail //获取所需要上传的文件列表
		let uploadPromiseTask = [] //定义上传的promise任务栈
		for (let i = 0; i < file.length; i++) {
			uploadPromiseTask.push(this.uploadFile(file[i].url)) //push进每一张所需要的上传的图片promise栈
		}
		Promise.all(uploadPromiseTask).then(res => {
			//全部上传完毕
			this.setData({
				imgs: this.data.imgs.concat(res)
			})
			wx.hideLoading()
		}).catch(error => {
			//存在有上传失败的文件
			wx.hideLoading()
			wx.showToast({
				title: '上传失败！',
				icon: 'none',
			})
		})
  },
  img_del(event) {
		const delIndex = event.detail.index
		const {
			imgs
		} = this.data
		imgs.splice(delIndex, 1)
		this.setData({
			imgs
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //提交
  submit_err(msg) {
		wx.showToast({
			title: msg || 'error',
			icon: 'none'
		});
		this.setData({
			submitDisabled: false
		})
		return false;
	},
	eckesFormSubmit(e) {
		
		this.setData({
			submitDisabled: true
		})
		var form = e.detail.value;
		
		console.log(form)
		if(!form.amount)return this.submit_err("amount is null");
		if(!form.price)return this.submit_err("price is null");
		if(!form.endTime)return this.submit_err("endTime is null");
		if(!form.moneyoff)return this.submit_err("moneyOff is null");
		if(!form.startTime)return this.submit_err("startTime is null");

		form.amount = +form.amount;
		form.pcover =this.data.imgs.length>0 ? this.data.imgs[0].urlapi :"";
    
    $.ajax({
      url:router.C_INSERT,
      type:"post",
      data:form
    }).then(res=>{
			wx.showToast({
				title: res.message,
				icon:"none"
			});
			setTimeout(()=>{
				wx.navigateBack()
			},2000)
    })
	},

})