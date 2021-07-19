var $ = require("../../../utils/api.js");
import router from "../../../utils/router";
const app = getApp();
Page({
  data: {
    prefix:$.prefix,
    prefix_img:$.host+$.prefix_img,
    host:$.host,

    adv:[{cover:"/opt/rh/images/adv/adv3.jpg",name:"测试3"},{cover:"/opt/rh/images/adv/adv1.jpg",name:"测试1"},{cover:"/opt/rh/images/adv/adv2.jpg",name:"测试2"}],
    store:[],
    goods:[],

  },
  goDetail(e){
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../product/detail/detail?id='+id,
    })
  },
  fromBanner(e){
    const {url} = e.currentTarget.dataset;
    if(url=="null")return;
    if(url=="vip"){
      if(app.globalData.userInfo.id){
        wx.navigateTo({
          url: '../../vip/vip',
        })
      }else{
        wx.switchTab({
          url: '../my/my',
        })
      }
    }else{
      wx.navigateTo({
        url: url,
      })
    }
  },
  getPublishData(){
    $.ajax({
      url:router.H_ALL,
      header:{token:'234'}
    }).then(res=>{
      this.setData({
        //adv:res.data.adv,
        //store:res.data.store,
        goods:res.list
      })
    })
  },
 
  onLoad() {

  },
  onShow(){
    this.getPublishData();
  },

  //滚动到底部
  onReachBottom(){

  }
})
