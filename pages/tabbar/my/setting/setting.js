var $ = require("../../../../utils/api.js");
import router from "../../../../utils/router";
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasPhone:"",
    phone:"",



    //address
    address:[],
    showAddress:false,

    form:{
      address:"",
      name:"",
      phone:"",
      isMain:1,
      id:""
    },
    active:"",
    btn:"添加",
    submitDisabled:false,

    referentCode:"",
    referentFlag:false,
    showRF:false,
  },
  inputReferent(e){
    this.setData({
      referentCode: e.detail.value
    })
  },
  setReferent(e){
    if(!this.data.referentCode){
      wx.showToast({
        title: '未填写推荐码',
        icon:"none"
      })
      return;
    }
    this.setData({
      showRF:true
    })
  },
  onConfirm(){
    $.ajax({
      url:router.U_GETRF+"?rf="+this.data.referentCode
    }).then(res=>{
      wx.showToast({
        title:"绑定成功~",
      })
      this.setData({
        referentFlag:true
      })
    })
  },
  onClose(){
    this.setData({
      showRF:false
    })
  },
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
  eckesFormSubmit(e){
    const {value} = e.detail;
    this.setData({
			submitDisabled: true
    })

    if (!value.name) return this.submit_err("请输入收货人姓名");
		if (!/1[0-9]{10}/.test(value.phone)) return this.submit_err('请输入收货人正确的手机号');
    if (!value.address) return this.submit_err("请输入收货地址");

    $.ajax({
      url:router.U_ADDADDRESS,
      method:"POST",
      data:value
    }).then(res=>{
      wx.showToast({
        title: this.data.btn+'成功！',
        icon:"none"
      })
      this.setData({
        showAddress:false,
        submitDisabled: false
      });
      this.searchAddress();
    })
  },
  onAdd(){
    this.setData({
      btn:"添加",
      showAddress:true,
      active:"",
      form:{
        address:"",
        name:"",
        phone:"",
        isMain:1,
        id:""
      }
    })
  },
  onEdit(e){
    this.setData({
      btn:"修改",
      active:e.currentTarget.dataset.index,
      showAddress:true,
      form:this.data.address[e.currentTarget.dataset.index]
    })
  },
  searchAddress(){
    $.ajax({
      url:router.U_GETUSERADDRESS
    }).then(res=>{
      if (res && res.code && res.code ===1) {
        app.globalData.userAddress = res.list[0].address;
        this.setData({
          address:res.list[0].address,
        })
      }
      })
  },
  getphonenumber(e){
    $.ajax({
      url:router.W_CRYPT,
      data:e.detail
    }).then(r=>{
      $.ajax({
        url:router.U_ADDPHONE+"?phone="+r.data
      }).then(res=>{
        app.globalData.userInfo.phone="1";
        this.setData({
          phone:"已绑定",
          hasPhone:true,
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasPhone:app.globalData.userInfo.phone==1,
      phone:app.globalData.userInfo.phone==1?"已绑定":""
    });
    this.searchAddress();
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
      url:router.U_GETRF
    }).then(res=>{
      this.setData({
        referentCode: res.data.referentId?res.data.referentId:"",
        referentFlag: !!res.data.referentId,
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