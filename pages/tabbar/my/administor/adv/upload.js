// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		host:$.host,
		list:[],
		editFlag:false,
		form:{
			name:"",
			id:"",
			cover:"",
			sort:"",
			status:"",
			url:"",
		},

		imgs:[],
		pickerArray:[],
		typeCode:"",
		radioNode:"",
	},
	onBack(){
		this.setData({
			editFlag:false
		})
	},
	onEdit(e){
		const idx = e.currentTarget.dataset.idx;
		this.setData({
			form:this.data.list[idx],
			imgs:[{
				urlapi:this.data.list[idx].cover,
				url:$.host+this.data.list[idx].cover,
			}],
			editFlag:true,
		})

	},
	radioChange(e){
		this.setData({
			radioNode:e.detail.value
		})
	},
	pickerChange(e){
		this.setData({
			typeCode:e.detail[0].code
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
					const url = $.host + data.data
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
		$.ajax({
			url:router.A_LIST
		}).then(res=>{
			this.setData({
				list:res.data,
				editFlag:false,
				submitDisabled: false
			})
		})
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
		
		form.cover=this.data.imgs[0].urlapi
		
    if(!form.name)return this.submit_err("name is null");
    if(!form.sort)return this.submit_err("sort is null");
    if(!form.url)return this.submit_err("url is null");
    
    $.ajax({
      url:router.A_UPDATE,
      type:"post",
      data:form
    }).then(res=>{
			wx.showToast({
				title: res.message,
				icon:"none"
			});
			setTimeout(()=>{
			  this.onLoad();
			},2000)
    })
	},

})