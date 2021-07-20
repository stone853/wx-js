var $ = require("../../../../utils/api.js")
import router from '../../../../utils/router.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    total:0,
    phone:0,
    userPhone:"",

    host:$.host,
    prefix:$.prefix,
    imageUrl:$.host+$.prefix_img,

    amount:0,

    showAddressPopup:false,
    showAddress:false,
    submitDisabled:false,
    addressList:app.globalData.userAddress,
    address:{name:"到店自提",address:""},
    addrIsYH:false,

    showYH:false,
    yh:"",

    stores:[],
    actIdx:0,

    _coupon:{
      id:"",price:"",moneyoff:""
    },
    _integral:{
      price:"", use:false, total:0, usePoint:0,
    },
    showCP:false,
    CP_list:[],
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
          phone:"1",
        })
      })
    })
  },
  noop(){},
  toggle(event) {
    //---------------积分不足200
    if(this.data._integral.total<200){
      wx.showToast({
        title: '当前积分不足200，无法使用积分',
        icon:"none"
      })
      return;
    }

    //---------------积分大于200
    // 可抵金额
    var __money = (this.data.amount - this.data._coupon.price)/2
    var money = parseInt(__money);

    // 当前优惠不足1元
    if(__money<=1){
      wx.showToast({
        icon:"none",
        title: '当前可优惠金额不足，无法使用积分。',
      })
      return;
    }

    var use = !this.data._integral.use;
    // 取消 勾选状态
    if(!use){
      this.setData({
        ["_integral.price"]:"",
        ["_integral.use"]:use,
        ["_integral.usePoint"]:0,
      });
      return;
    }

    // 可用最大优惠积分
    var max = money*200;
    // 用户现有积分
    var have = this.data._integral.total;

    //拥有积分>=可用最大优惠积分，直接最大优惠
    if(have>=max){
      this.setData({
        ["_integral.price"]:money,
        ["_integral.use"]:use,
        ["_integral.usePoint"]:max,
      });
      return;
    }

    //拥有积分<可用最大优惠积分，使用200的最大整数倍积分
    var usePoint = have - have%200;
    this.setData({
      ["_integral.price"]:usePoint/200,
      ["_integral.use"]:use,
      ["_integral.usePoint"]:usePoint,
    });
    return;

  },
  goPage(){
    wx.navigateTo({
      url: '../../../coupon/coupon',
    })
  },
  chooseCP(e){
    var cp = this.data.CP_list[e.currentTarget.dataset.index];
    if(cp.moneyoff>this.data.amount){
      return;
    }

    if(this.data._coupon.id == cp.id){
      this.setData({
        _coupon:{
          id:"",price:"",moneyoff:""
        },
        showCP:false,
      })
    }else{
      this.setData({
        _coupon:{
          id:cp.id,
          price:cp.price,
          moneyoff:cp.moneyoff
        },
        showCP:false,
      })
    }
    
    wx.nextTick(()=>{
      if(this.data._integral.use){
        this.toggle();
        wx.nextTick(()=>{this.toggle()})
      }
    })
  },
  chooseCoupon(e){
    $.ajax({
      url:router.C_SEARCH+"?status=1&pageNum=1&pageSize=45"
    }).then(res=>{
      this.setData({
        CP_list:res.data,
        showCP:true
      })
    })
  },
  changeNav(e){
    this.setData({
      actIdx:e.detail.index,
      total:this.data.list.length,
      address:this.data.addressList[this.data.addressList.length-1],
      addrIsYH:false,
    });
    wx.nextTick(() => {
      this.setData({ amount: this.setAmount() })
    })
  },


  showYH(){
    this.setData({
      showYH:true
    })
  },
  setYHtext(e){
    this.setData({
      yh:e.detail.value
    })
  },
  setYH(){
    if(this.data.phone!=1){
      wx.showToast({
        title: '请先绑定手机号，以免送货出现问题',
        icon:"none"
      })
      return;
    }
    var a = this.data.yh.split("#");
    this.setData({
      showYH:false,
      addrIsYH:true,
      address:{address:"雅惠"+a[0]+"楼"+a[1]+"号桌"},
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
      })
      this.setData({
        address:form,
        addressList:[form],
        showAddress:false,
        showAddressPopup:false,
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
  showAddressPopup(e){
    this.setData({
      showAddressPopup:true
    })
  },
  showAddress(e){
    this.setData({
      showAddress:true
    })
  },
  onPopupClose(){
    this.setData({
      showAddressPopup:false
    })
  },
  //选择收货地址
  toSetCk(e){
    this.setData({
      address:this.data.addressList[e.currentTarget.dataset.index],
      showAddressPopup:false,
      addrIsYH:false,
    })
  },
  toPay(e){
    if(this.data.amount<=0){
      return;
    }
    let desc = "";
    let pcover = "";
    let pprice = "";
    let oids = [];
    let index=  this.data.actIdx;
    let sl = this.data.list[index].order.length;
    for (let sidx = 0; sidx < sl; sidx++) {
      let order =this.data.list[index].order[sidx];
      if(!order.notChecked){
        if(!desc) desc = order.pname;
        if(!pprice) pprice = order.pprice;
        if(!pcover) pcover = order.pcover;
        oids.push(order.id);
      }
    }

    let _data = {
      sid:this.data.list[index].id,
      oids:oids.join(","),
      _amount:this.data.amount*100,
      amount:(this.data.amount-this.data._coupon.price-this.data._integral.price)*100,
      description:desc,
      integral:0,
      coupon:0,
    }
    if(this.data._coupon.id){
      _data.couponId = this.data._coupon.id;
      _data.coupon = this.data._coupon.price;
    }
    if(this.data._integral.use){
      _data.integral = this.data._integral.usePoint;
    }
    
    var addr = this.data.address;
    _data.address=(addr.name?addr.name+' ':"")+addr.address+(addr.phone?' '+addr.phone:"");

    if(addr.type=="ddzt"){
      _data.addrType = "ddzt";
    }

    if(app.globalData.userInfo && app.globalData.userInfo.shareUserId && this.data.addrIsYH){
      _data.shareUserId = app.globalData.userInfo.shareUserId;
    }

    $.ajax({
      url:router.PAY_CART_1,
      method:"POST",
      data:_data
    }).then(res=>{
      wx.requestPayment({
        ...res.data,
        success (pay) {
          $.ajax({
            url:router.O_PAYCARTSUCCESS,
            method:"POST",
            data:{
              out_trade_no:res.data.out_trade_no,
              pname:desc,
              pcover,pprice,
              ..._data
            }
          }).then(res=>{
            wx.showToast({
              title: '支付成功！',
            });
            setTimeout(()=>{
              wx.reLaunch({
                url: '../../my/my',
              })
            },2000)
          })
        },
        fail (r) {
          $.ajax({
            url:router.PAY_DELETE_ORDER_CACHE,
            data:{
              out_trade_no:res.data.out_trade_no
            }
          })
        }
      })
    })
  },
  onClickLinkHome(){
    wx.reLaunch({
      url: '../../home/index',
    })
  },
  //选择店铺
  onStoreChange(e){
    const sidx = e.currentTarget.dataset.sidx;
    const order = this.data.list[sidx].order;
    const l = order.length;
    const flag = this.data.list[sidx].checked;
    if(flag){
      this.data.list[sidx].count=0;
    }else{
      this.data.list[sidx].count=l;
    }
    this.data.list[sidx].checked = !flag;
    for (let index = 0; index < l; index++) {
      order[index].notChecked = flag;
    }
    this.setData({
      ["list["+sidx+"]"]:this.data.list[sidx],
      amount:this.setAmount()
    })
  },
  onOrderDelete(e){
    //const { position, instance } = e.detail;
    const { instance } = e.detail;
    const { sidx, oidx } = e.currentTarget.dataset;
    $.ajax({
      //url:router.O_DELCART+'?id='+this.data.list[sidx].order[oidx].id
      url:router.O_DELCART,
      data:{"id":this.data.list[sidx].order[oidx].id}
    }).then(res=>{
      this.data.list[sidx].order.splice(oidx,1);
      this.setData({
        ["list["+sidx+"].order"]:this.data.list[sidx].order,
        total:this.data.list[sidx].order.length,
        amount:this.setAmount()
      })
      instance.close();
    })
  },
  //选择商品
  onOrderChange(e){
    const sidx = e.currentTarget.dataset.sidx;
    const oidx = e.currentTarget.dataset.oidx;
    const key = `list[${sidx}].order[${oidx}].notChecked`;
    const flag = !!this.data.list[sidx].order[oidx].notChecked;
    if(flag){
      //选
      this.data.list[sidx].count++;
    }else{
      this.data.list[sidx].count--;
    }
    this.data.list[sidx].order[oidx].notChecked=!flag;
    this.setData({
      [key]:this.data.list[sidx].order[oidx].notChecked,
      ["list["+sidx+"].checked"]:this.data.list[sidx].count>0,
      amount:this.setAmount()
    })
  },
  //合计：
  setAmount(){
    let amount = 0;
    let oids = [];
    const l = this.data.list.length;
    for (let index = 0; index < l; index++) {
      let sl = this.data.list[index].order.length;
      for (let sidx = 0; sidx < sl; sidx++) {
        let order =this.data.list[index].order[sidx];
        if(!order.notChecked){
          amount += order.price*order.count;
          oids.push(order.id);
        }
      }
    }
    // var index = this.data.actIdx;
    // let sl = this.data.list.length;
    // for (let sidx = 0; sidx < sl; sidx++) {
    //   let order =this.data.list[index].order[sidx];
    //   if(!order.notChecked){
    //     amount += order.price*order.count;
    //     oids.push(order.id);
    //   }
    // }
   

    this.oids = oids;
    if(amount == this.data.amount){
      return;
    }
    // this.setData({
    //   amount
    // });
    if(this.data._coupon.id){
      if(amount<=this.data._coupon.moneyoff){
        this.setData({
          _coupon:{
            id:"",price:"",moneyoff:""
          }
        })
      }
    }

    wx.nextTick(()=>{
      if(this.data._integral.use){
        this.toggle();
        wx.nextTick(()=>{this.toggle()})
      }
    })
    

    return amount;
  },
  onStepper(e){
    const {currentTarget, detail}=e;
    const {oidx,sidx}=currentTarget.dataset;
    this.data.list[sidx].order[oidx].pnumber = detail;
    this.setData({
      ["list["+sidx+"].order["+oidx+"].pnumber"]:detail,
      amount:this.setAmount()
    });
   
    $.ajax({
      //url:router.O_SETCARTNUM+"?id="+this.data.list[sidx].order[oidx].id+"&pnumber="+detail,
      url:router.O_SETCARTNUM,
      data:{"id":this.data.list[sidx].order[oidx].id,"count":detail}
    }).then(res=>{

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
    this.oids = [];
    this.init();
  },
  init(){

    if(!app.globalData.userInfo.token){
      wx.switchTab({
        url: '../my',
      })
      return;
    }

    $.ajax({
      url:router.O_USERCART
    }).then(res=>{
      if(res && res.list && res.list.length>0){

        this.setData({
          list:res.list,
          phone:app.globalData.userInfo.phone,
          total:res.list.length,
          ["_integral.total"]:res.message
        });

        wx.nextTick(() => {
          this.setData({ amount: this.setAmount() })
        })
        
        if(app.globalData.userAddress.length==0){
          $.ajax({
            url:router.U_GETUSERADDRESS
          }).then(res2=>{
            app.globalData.userAddress = res2.list[0].address;
            this.setData({
              //address:{name:"到店自提",address:res.list.address, type:"ddzt"},
              address:res2.list[0],
              addressList:[].concat(res2.list[0],[{name:"到店自提",address:res.list.address, type:"ddzt"}]),
            })
          })
        }else{
          this.setData({
            address:{name:"到店自提",address:res.list[0].address, type:"ddzt"},
            addressList:[].concat(app.globalData.userAddress,[{name:"到店自提",address:res.list[0].address, type:"ddzt"}]),
          })
        }
      }
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