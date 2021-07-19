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
		},
		activeTypeIdx:"",
    firstList:[],
    secondList:[],
	},
	radioChange(e){
		let d = e.detail.value.split("_eckes_");
		this.setData({
			activeTypeIdx:d[0],
		})
		this.getRadioSecondList(d[0],d[1]);
	},
	getRadioSecondList(idx, code){
		if(!this.data.secondList[idx]){
			$.ajax({
				url:router.D_GET+'?pid='+code
			}).then(res=>{
				this.setData({
					["secondList["+idx+"]"]:res.data
				});
			})
		}
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
		const key = event.currentTarget.id||"cover";
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
      url:router.D_GET+'?pid='+options.code
    }).then(res=>{
      this.setData({
        firstList:res.data
			});
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
		console.log(form);
		form.cover = [];

		if(!form.typesecond)return this.submit_err("请选择商品分类");
		if(!form.name)return this.submit_err("商品名称不能为空");
		if(!form.price)return this.submit_err("商品单价不能为空");
		if(this.data.otherForm.cover.length==0)return this.submit_err("商品封面不能为空");
		
		const typefirst = form.typefirst.split("_eckes_");
		const typesecond = form.typesecond.split("_eckes_");
		form.typecode = typefirst[1]+","+typesecond[1];
		form.typedesc = typefirst[2]+","+typesecond[2];
		
		for (let index = 0; index < this.data.otherForm.cover.length; index++) {
			form.cover.push(this.data.otherForm.cover[index].urlapi);
		}
		form.cover = form.cover.join(",");
		form.sort = form.sort||"100";
		form.color = form.color||"默认";
		form.size = form.size||"均码";
		form.discount = form.discount||"NULL";

    $.ajax({
      url:router.P_INSERT,
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