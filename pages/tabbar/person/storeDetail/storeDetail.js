// pages/my/my.js
var $ = require("../../../../utils/api.js");
import router from "../../../../utils/router";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    t1:[],
    t2:[],
    t2ActKey:0,
    
    t3:[],
    t3ActKey:0,

    host:$.host,
    prefix:$.prefix,
    prod:[],//右侧产品列表
    cartNum:0,
    cartList:[],

    showChoose:false,
    form:{
      color:[],
      size:[],
      colorAct:0,
      sizeAct:0,
    },
    send:{},
    pnumber:1,
  },
  t3SessionKey:[0],
  sid:0,
  handlerColor(e){
    const {idx,value} = e.currentTarget.dataset;
    this.setData({
      ["form.colorAct"]:idx,
      ["send.color"]:value
    })
  },
  handlerSize(e){
    const {idx,value} = e.currentTarget.dataset;
    this.setData({
      ["form.sizeAct"]:idx,
      ["send.size"]:value
    })
  },
  onStepper(e){
    this.setData({
      pnumber:e.detail
    })
  },
  addCartSpec(){
    this.onCart(this.data.send, this.data.pnumber, ()=>{
      this.setData({
        //pnumber:1,
        showChoose:false
      })
    });
  },
  onChooseSpec(e){
    let {item}=e.currentTarget.dataset;
    let color=item.color.split(",");
    let size=item.size.split(",");
    item.color = color[0];
    item.size = size[0];
    this.setData({
      showChoose:true,
      ['form.color']:color,
      ['form.size']:size,
      send:item,
    })
  },
  goDetail(e){
    wx.navigateTo({
      url: '../../../product/detail/detail?id='+e.currentTarget.dataset.id,
    })
  },
  changeNav(e){
    $.ajax({
      url:router.S_VISIT_CHANGE+"?id="+this.sid+"&parentcode="+e.detail.id
    }).then(res=>{
      this.setData({
        t2:res.data.t2,
        t3:[res.data.t3],
        prod:[[res.data.prod]],
        t3SessionKey:[0],
        t2ActKey:0,
        t3ActKey:0,
      })
    })
  },
  onSideChange2({detail}){
		if(this.data.t3[detail]){
      this.setData({
        t2ActKey:detail,
        t3ActKey:this.t3SessionKey[detail],
      })
			return;
    }
    $.ajax({
      url:router.S_VISIT2+'?sid='+this.sid+'&pid='+this.data.t2[detail].id
    }).then(res=>{
      this.t3SessionKey[detail]=0;
      this.setData({
        ["t3["+detail+"]"]:res.data.t3,
        t3ActKey:0,
        t2ActKey:detail,
        ["prod["+detail+"][0]"]:res.data.prod,
      });
    })
  },
  onSideChange3({detail}){
    this.t3SessionKey[this.data.t2ActKey] = detail;
		if(this.data.prod[this.data.t2ActKey][detail]){
      this.setData({
        t3ActKey:detail,
      })
			return;
    }
    $.ajax({
      url:router.S_VISIT3+'?sid='+this.sid+'&pid='+this.data.t3[this.data.t2ActKey][detail].id
    }).then(res=>{
      this.setData({
        t3ActKey:detail,
        ["prod["+this.data.t2ActKey+"]["+detail+"]"]:res.data,
      });
    })
  },
  onLoad: function (options) {
		wx.setNavigationBarTitle({
      title: options.name,
    });
    this.sid = options.id;
    $.ajax({
      url:router.S_VISIT+"?id="+options.id
    }).then(res=>{
      this.setData({
        t1:res.data.t1,
        t2:res.data.t2,
        ["t3[0]"]:res.data.t3,
        ["prod[0][0]"]:res.data.prod
      })
    })

  },
  goCart(){
    wx.navigateTo({
      url: '../../my/cart/cart',
    })
  },
  getCartNum(fn,prod){
    $.ajax({
      url:router.S_VISIT_CART
    }).then(res=>{
      const cartList = {};
      //let count =0
      for (let index = 0; index < res.list.length; index++) {
        if(cartList[res.list[index].pid]){
          cartList[res.list[index].pid]+=(+res.list[index].count);
        }else{
          cartList[res.list[index].pid]=(+res.list[index].count);
        }

        //count += res.list[index].count;
        
      }
      this.setData({
        cartNum:res.list.length,
        cartList:cartList
      });
      if(fn){
        fn(prod);
      }
    })
  },
  onAddCart(e){
    const prod = this.data.prod[this.data.t2ActKey][this.data.t3ActKey][e.currentTarget.dataset.idx];
    this.onCart(prod);
  },
  onCart(prod,pnumber,callback){
    const obj = {};
    obj.size = prod.size;
    obj.color = prod.color;
    obj.count = pnumber||1;
    obj.pid = prod.id;
    //obj.sid = this.sid;
    //obj.pcode = prod.code;
    obj.imgUrl = prod.imgUrl.split(",")[0];
    obj.name = prod.name;
    obj.price = prod.priceDiscount>0?prod.priceDiscount:prod.price
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
        //cartNum:this.data.cartNum+obj.count,
        ["cartList."+prod.id]:(this.data.cartList[prod.id]?(+this.data.cartList[prod.id])+obj.count: obj.count)
      });

      this.getCartNum();
      
      if(callback){
        callback();
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(!app.globalData.userInfo.token){
      $.wxLogin(code=>{
        $.ajax({
          url:router.USER_LOGIN,
          method:"GET",
          data:{code}
        }).then(res=>{
          app.globalData.userInfo.token=res.message;
          this.getCartNum()
        })
      })
    }else{
      this.getCartNum()
    }
  },

	/**
	 * 页面上拉触底事件的处理函数
	 */

})