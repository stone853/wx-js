var $ = require("../../../utils/api.js");
import router from "../../../utils/router";
const a = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{},
    host:$.host,
    prefix:$.prefix,
    prefix_img:$.host+$.prefix_img,
    sizeAct:0,
    colorAct:0,
    //-----------
    id:"",
    send:{},
    show:false,
    addressAct:0,
    subBtn:"去下单",
    //-----------
    showAddress:false,
    address:a.globalData.userAddress,
    remark:"",
    number:1,
    //-----------
    showSuccess:false,//下单成功，去支付的弹窗     
    cartNum:0,                                                                                                                                                                                                                           
  },
  handlerColor(e){
    const {idx,value} = e.currentTarget.dataset;
    this.setData({
      colorAct:idx,
      ["send.color"]:value
    })
  },
  handlerSize(e){
    const {idx,value} = e.currentTarget.dataset;
    this.setData({
      sizeAct:idx,
      ["send.size"]:value
    })
  },
  // ----------------------
  showAddress(){
    this.setData({
      showAddress:true
    })
  },
  eckesFormSubmit(e){
    this.setData({
			submitDisabled: true
		})
    var form = e.detail.value;
    if (!form.name) return this.submit_err("请输入收货人姓名");
		if (!/1[0-9]{10}/.test(form.phone)) return this.submit_err('请输入收货人正确的手机号');
    if (!form.address) return this.submit_err("请输入收货地址");

    form.isMain=1;
    
    $.ajax({
      url:router.U_ADDADDRESS,
      method:"POST",
      data:form
    }).then(res=>{
      wx.showToast({
        title: '添加成功！',
        icon:"none"
      })
      this.setData({
        address:[form],
        showAddress:false
      })
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
  // ----------------------
  onInput(e){
    this.setData({
      remark:e.detail.value
    })
  },
  searchAddress(){
    $.ajax({
      url:router.U_GETUSERADDRESS
    }).then(res=>{
      a.globalData.userAddress = res.data;
      this.setData({
        address:res.data,
        show:true,
        subBtn:"提交",
      })
    })
  },
  onPopupClose(){
    this.setData({
      show:false,
      subBtn:"去下单"
    })
  },
  showPopup(){
    this.setData({
      show:true,
      subBtn:"提交"
    })
  },
  onStepper(e){
    this.setData({
      number:e.detail
    })
  },
  goCart(){
    wx.navigateTo({
      url: '../../tabbar/my/cart/cart',
    })
  },
  getCartNum(fn){
    $.ajax({
      url:router.O_CARTNUM+"?pid="+this.data.id,
      method:"GET"
    }).then(res=>{
      if(res.code && res.code===1 && res.list){
        this.setData({
          cartNum:+res.list.length,
        });  
      } else {
        this.setData({
          cartNum:1,
        });
      }
      
      if(fn){
        fn();
      }
    })
  },
  onAddCart(){
    if(!a.globalData.userInfo.token){
      $.wxLogin(code=>{
        $.ajax({
          url:router.USER_LOGIN+"?code="+code,
          method:"GET"
        }).then(res=>{
          if (res && res.code &&res.code === 1) {
            a.globalData.userInfo.token=res.message;
            this.getCartNum(this.onCart);
          }
        })
      })
    }else{
      this.onCart();
    }
    return;
  },
  onCart(){
    const obj = {};
    //obj.remark = this.data.remark;
    const re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    // if ( re.test(obj.remark) ){
    //   wx.showToast({
    //     title: '禁止输入非法字符',
    //     icon:"none"
    //   })
    //   this.setData({
    //     remark:"",
    //   });
    //   obj.remark="";
    //   return;
    // }
    obj.size = this.data.send.size;
    obj.color = this.data.send.color.join(',');;
    obj.count  =this.data.number ;
    obj.pid = this.data.id;
    obj.imgUrl = this.data.form.imgUrl[0];
    obj.name = this.data.form.name;
    obj.price = this.data.form.priceDiscount>0?this.data.form.priceDiscount:this.data.form.price
    
    $.ajax({
      url:router.O_ADDCART,
      method:"POST",
      data:obj
    }).then(res=>{
      wx.showToast({
        title: '添加购物车成功！',
        icon:"none",
      });
      this.setData({
        cartNum:this.data.cartNum+1
      })
    })
  },
  onSubmit(){
    this.setData({
      subBtn: '提交中...'
    },()=>{
      const obj = {};
      obj.remark = this.data.remark;
      const re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
      if ( re.test(obj.remark) ){
        wx.showToast({
          title: '禁止输入非法字符',
          icon:"none"
        })
        this.setData({
          subBtn:"去下单",
          remark:"",
        });
        obj.remark="";
        return;
      }
      obj.size = this.data.send.size;
      obj.color = this.data.send.color;
      obj.pnumber  =this.data.number;
      obj.pid = this.data.id;
      obj.sid = this.data.form.sid;
      obj.pcode = this.data.form.code;
      obj.vipSort = this.data.form.vipSort;
      obj.pcover = this.data.form.cover[0];
      obj.pname = this.data.form.name;
      obj.pprice = this.data.form.discount>0?this.data.form.discount:this.data.form.price;
      $.ajax({
        url:router.O_INSERT,
        method:"POST",
        data:obj
      }).then(res=>{
        wx.showToast({
          title: '下单成功！',
          icon:"none"
        });
        this.setData({
          show:false,
          showSuccess:true,
          subBtn:"去下单"
        });
        wx.navigateTo({
          url: '../order/order',
        })
      })
    });
  },
  onSale(){

    if(this.data.subBtn != '去下单'){
      return;
    }

    if(!a.globalData.userInfo.token){
      $.wxLogin(code=>{
        $.ajax({
          url:router.USER_LOGIN,
          method:"GET",
          data:{code}
        }).then(res=>{
          a.globalData.userInfo.token=res.data.token;
          this.onSubmit();
        })
      })
    }else{
      this.onSubmit();
    }
    return;

    if(this.data.subBtn=="提交"){
      if(this.data.address.length==0){
        wx.showToast({
          title: '请添加并选择收货地址',
          icon:"none"
        })
        return;
      }
      this.setData({
        subBtn: '提交中...'
      },()=>{
        const obj = this.data.address[this.data.addressAct];
        obj.remark = this.data.remark;
        const re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
        if ( re.test(obj.remark) ){
          wx.showToast({
            title: '禁止输入非法字符',
            icon:"none"
          })
          this.setData({
            subBtn:"提交",
            remark:"",
          });
          obj.remark="";
          return;
        }
        obj.size = this.data.send.size;
        obj.color = this.data.send.color;
        obj.pnumber  =this.data.number;
        obj.pid = this.data.id;
        obj.sid = this.data.form.sid;
        obj.pcode = this.data.form.code;
        obj.vipSort = this.data.form.vipSort;
        obj.pcover = this.data.form.cover[0];
        obj.pname = this.data.form.name;
        obj.pprice = this.data.form.discount>0?this.data.form.discount:this.data.form.price
        $.ajax({
          url:router.O_INSERT,
          method:"POST",
          data:obj
        }).then(res=>{
          wx.showToast({
            title: '下单成功！',
            icon:"none"
          });
          this.setData({
            show:false,
            showSuccess:true,
            subBtn:"去下单"
          });
          wx.navigateTo({
            url: '../order/order',
          })
        })
      });
      
      return;
    }
    if(a.globalData.userAddress.length==0){
      $.wxLogin(code=>{
        $.ajax({
          url:router.USER_LOGIN,
          method:"POST",
          data:{code}
        }).then(res=>{
          a.globalData.userInfo.token=res.data.token;
          this.searchAddress();
        })
      })
    }else{
      this.setData({
        address:a.globalData.userAddress,
        show:true,
        subBtn:"提交",
      })
    }
  },
  //选择收货地址
  toSetCk(e){
    const idx = e.currentTarget.dataset.index;
    if(this.data.address[idx].isMain==0){
      this.setData({
        ["address["+this.data.addressAct+"].isMain"]:0,
        ["address["+idx+"].isMain"]:1,
        addressAct:idx,
      })
    }
  },
  // ----------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $.ajax({
      url:router.P_DETAIL+"?id="+options.id
    }).then(res=>{
      if (res && res.data) {
        res.data.imgUrl = res.data.imgUrl && res.data.imgUrl.split(",");
        res.data.size = res.data.size && res.data.size.split(/\s+/);
        res.data.color = res.data.color && res.data.color.split(/\s+/);
        this.setData({
          form:res.data,
          id:options.id,
          send:{
            color:res.data.color,
            size:res.data.size
          }
        })
      }
    })
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
    if(a.globalData.userInfo.token){
      this.getCartNum();

      // setTimeout(()=>{
      //   $.ajax({
      //     url:router.Achieve_SET+"?id=16",
      //     noloading:true,
      //   })
      // },1000*30)
    }
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
  goBack(){
    if(getCurrentPages().length==1){
      wx.switchTab({
        url: '../../tabbar/home/index',
      })
      return;
    }
    wx.navigateBack()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})