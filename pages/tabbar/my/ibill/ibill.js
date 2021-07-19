var $ = require("../../../../utils/api.js");
import router from "../../../../utils/router";
const now = new Date().getTime();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    date:"",
    minDate:new Date(2021, 5, 1).getTime(),
    defaultDate:[ now, now+86400000],

    list:[],
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    let [start, end] = event.detail;
    start = this.formatDate(start);
    end = this.formatDate(end);
    this.setData({
      show: false,
      date: `${start} ~ ${end}`,
    });
    this.onSearch(start,end)
  },
  onDisplay(){
    this.setData({ show: true });
  },

  onSearch(){

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
  onDelete(e){
    const { id,idx } = e.currentTarget.dataset;
    const { instance } = e.detail;
    $.ajax({
      url:router.L_INTEGRAL_DEL+'?id='+id
    }).then(res=>{
      this.data.list.splice(idx,1);
      this.setData({
        ["list"]:this.data.list,
      });
      instance.close();
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let n = new Date();
    let t = new Date(n.getTime()+86400000);
    let start = n.getFullYear()+"/"+(n.getMonth()+1)+"/"+n.getDate();
    let end = t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate();
    this.setData({
      date: `${start} ~ ${end}`,
    });
    this.onSearch(start,end);
  },
  onSearch(start,end){
    $.ajax({
      url:router.L_INTEGRAL,
      data:{
        end,start
      }
    }).then(res=>{
      this.setData({
        list:res.data
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