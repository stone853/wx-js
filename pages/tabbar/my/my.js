// pages/my/my.js
var $ = require("../../../utils/api.js");
import router from "../../../utils/router";
var app = getApp();
Page({
	data: {
		host:$.host,
		navH:"0",
		headerBtnPosi:"0",
		saveH:app.globalData.bottomTabbarSaveHeight,

		signOut:true,
		apiInfo:{},

		others:{
			hasRegister:false,
			userId:''
		},

		showQR:false,
	},
	toContact(e){
		$.ajax({
      url:router.Achieve_SET+"?id=10",
      noloading:true,
    })
	},
	getQrcode(){
		if(this.data.apiInfo.phone!=1){
			wx.showToast({
				title: '分享前请先 设置 授权绑定手机号~',
				icon:"none"
			});
			return;
		}
		if(!this.data.apiInfo.qrcode){
			$.ajax({
				url:router.U_GETQRCODE+"?id="+this.data.apiInfo.id
			}).then(res=>{
				this.setData({
					["apiInfo.qrcode"]:res.data.img
				})
			})
			return;
		}
		this.setData({
			showQR:true
		})
	},
	tips(){
		wx.showToast({
			title: '即将发布，尽情期待~',
			icon:"none"
		})
	},
	toGetUser(userInfo){
		const data=userInfo?{nickName:userInfo.nickName,avatarUrl:userInfo.avatarUrl}:{};
		//data.plf = app.globalData.plf;
		$.ajax({
			url:router.USER_UPD,
			method:"POST",
			data
		}).then(res=>{
			app.globalData.userInfo.u_isVip=res.data.isVip;
			app.globalData.userInfo.u_level=res.data.level;
			app.globalData.userInfo.id=res.data.id;
			app.globalData.userInfo.levelTime=res.data.levelTime;
			app.globalData.userInfo.phone=res.data.phone;
			this.setData({
				signOut:!res.data.nickName,
				apiInfo:res.data
			});
		})

		// //获取购物车
		// $.ajax({
		// 	url:router.O_USERCART
		//   }).then(res=>{
		// 	  console.log(res);
		// 	this.data.apiInfo.carNum=res.list[0].order.length
			
		//   })

	},
	toSignIn(userInfo){
		$.wxLogin(code=>{
			$.ajax({
				url:router.USER_LOGIN,//+"?code="+code,
				method:"GET",
				data:{code}
			}).then(res=>{
				app.globalData.userInfo.token=res.message;
				this.toGetUser(userInfo);
			})
		})
	},

	// 
	showrequestSubscribeMessage(){

		wx.requestSubscribeMessage({
			tmplIds: ['4Y5yAJbw6AmV981huGgmSR3Lg5mxBl5GKwwz0Iqi_JQ','N0LO1lYQzJSzXgZPr9ikl_qPScd5VHsNhwhxuhyFyIk','gCofxflKMwt3Z_x2AeuAiVNM4lPEVZ_V0YnjsNYhcQU'],
			success (res) {
				console.log(res)
			},
			fail (res){
				console.log("error")
				console.log(res)
			}
		})
	},

	onLoad: function(options) {

		if(options.userid){
			//送 雅慧 的user分享id
			app.globalData.shareUserId=options.id;
		}

		if(options.id){
			app.globalData.referrerId=options.id;
		}

		wx.getSystemInfo({
      success: res => {
        //导航高度
        this.setData({
          navH: res.statusBarHeight + 46,
          headerBtnPosi: wx.getMenuButtonBoundingClientRect(),
        })
      }
		});

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 2
			})
		}
		if(app.globalData.userInfo.token){
			this.toGetUser()
		}else{
			this.toSignIn();
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},
	getUserInfo(e){
		wx.getUserProfile({
			desc: '用于完善会员资料',
			success: ({userInfo}) =>{
				if(app.globalData.userInfo.token){
					this.toGetUser(userInfo);
					return;
				}
				this.toSignIn(userInfo);
			}
		})
	},

	

	goPage(e){
		if(this.data.signOut){
			wx.showToast({
				title: '请先授权登录',
				icon:"none"
			})
			return;
		}
		let url = e.currentTarget.dataset.url;
		if(url=="store/open/open" && this.data.apiInfo.phone==0){
			wx.showToast({
				title: '请先在设置里绑定手机号~',
				icon:"none"
			})
			return;
		}
		wx.navigateTo({
			url: url,
		})
	},
	goScan(e){
		wx.scanCode({
			success(res){
				// res.result ： code
				if(res.result){
					$.ajax({
						url:router.COUPON_USER_DELETE,
						method:"POST",
						data:{
							couponCode:res.result
						}
					}).then(res=>{
						wx.navigateTo({
							url: 'administor/scan/scan',
						})
					})
				}
			},
			fail(res){
				console.log(res)
			},
		})
	}
})
