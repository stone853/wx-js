import router from "../utils/router";
var $ = require("../utils/api.js");
const app = getApp();
Component({
  data: {
    show:false,
    bottomTabbarSaveHeight:app.globalData.bottomTabbarSaveHeight,
    selected: 0,
    color:"#999",
    selectedColor:"#279cff",
    list: [{
      pagePath: "/pages/tabbar/home/index",
      iconPath:'/assets/images/h11.png',
      selectedIconPath:'/assets/images/h1.png',
      text: "首页"
    }, 
    {
      pagePath:"/pages/tabbar/person/person",
      iconPath:'/assets/images/h21.png',
      selectedIconPath:'/assets/images/h2.png',
      text: "商品"
    }, 
    // {
    //   pagePath:'/pages/blank/index',
    //   iconPath:'/pages/Resources/scanCode.png',
    //   selectedIconPath:'/pages/Resources/scanCode.png',
    //   text:'扫一扫'
    // },
    {
      pagePath:'/pages/tabbar/my/my',
      iconPath:'/assets/images/h31.png',
      selectedIconPath:'/assets/images/h3.png',
      text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const url =  e.currentTarget.dataset.path
      wx.switchTab({url})
    },
  },
  attached() {
    // wx.getSystemInfo({
    //   success:res=>{
    //     const bottom =res.screenHeight - res.safeArea.bottom//无home键手机下面多出来的高度
    //     console.log(res,bottom)
    //   }
    // })
  }
})