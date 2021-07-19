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
		otherForm:{
			cover:[],
			banner:[],
			status:"",
		},
		pickerArray:[],
		typeCode:"",
    fieldcolumnsList:[],
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
					token:app.globalData.userInfo.token//wx.getStorageSync('token')
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
		const key = event.currentTarget.id||"cover";
    wx.showLoading({
			title: '上传中...'
		})
		const {file} = event.detail //获取所需要上传的文件列表
		let uploadPromiseTask = [] //定义上传的promise任务栈
		uploadPromiseTask.push(this.uploadFile(file.url)) //push进每一张所需要的上传的图片promise栈
		Promise.all(uploadPromiseTask).then(res => {
			//全部上传完毕
			this.setData({
				["otherForm."+key]: this.data.otherForm[key].concat(res)
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
		const key = event.currentTarget.id||"cover";
		const delIndex = event.detail.index
		const cover = this.data.otherForm[key]
		cover.splice(delIndex, 1)
		this.setData({
			["otherForm."+key]:cover
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $.ajax({
      url:router.D_GET+'?pid=1'
    }).then(res=>{
      this.setData({
        fieldcolumnsList:res.data
			});
			this.init();
    })
  },
	init(){
		$.ajax({
      url:router.S_STATUS
    }).then(res=>{
			//res.data==false, res.data.status
			if(res.data){
				this.setData({
					["otherForm.status"]:res.data.status
				});
			}
    })
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		
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
		form.cover=this.data.otherForm.cover.length>0?this.data.otherForm.cover[0].urlapi:"";
		form.bg =this.data.otherForm.banner.length>0?this.data.otherForm.banner[0].urlapi:"";
		
		const level = app.globalData.userInfo.u_level;
		if(app.globalData.userInfo.u_isVip==1 || level>=40){
			if(form.type.length>3){
				return this.submit_err("店铺分类不可大于3个");
			}
		}
		if(level<20 && form.type.length>1){
			return this.submit_err("当前用户等级 店铺分类不可大于1个");
		}
		if(level<40 && form.type.length>2){
			return this.submit_err("当前用户等级 店铺分类不可大于2个");
		}
		
		form.type = form.type.join(",")
    if(!form.name)return this.submit_err("店铺名称不能为空");
    if(!form.subtitle)return this.submit_err("店铺描述不能为空");
    if(!form.address)return this.submit_err("店铺地址不能为空");
    if(!form.cover)return this.submit_err("店铺Logo不能为空");
    if(!form.bg)return this.submit_err("店铺banner不能为空");
    if(!form.type)return this.submit_err("请选择店铺分类");
    
    $.ajax({
      url:router.S_INSERT,
      type:"post",
      data:form
    }).then(res=>{
			wx.showToast({
				title: res.message,
				icon:"none"
			});
			setTimeout(()=>{
				wx.navigateBack();
			},1500)
    }).catch(res=>{
			this.setData({
				submitDisabled: false
			})
		})
	},

})