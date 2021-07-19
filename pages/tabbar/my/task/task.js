var $ = require("../../../../utils/api.js")
import router from '../../../../utils/router.js';
const app = getApp();
Page({

  percents:{},
  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    active:0,

    host:$.host,
    imageUrl:$.host+$.prefix_img,

    showTimeAll:false,
    isVip:false,
  },
  goPage(){
    wx.navigateTo({
      url: '../../../coupon/coupon',
    })
  },
  notVip(e){
    if(!this.data.isVip){
      wx.showToast({
        title: '未开通满月祝福',
        icon:"none",
      })
      return;
    }
    let idx = e.currentTarget.dataset.idx;
    if(this.percents.t6[idx]>100){
      return;
    }
    $.ajax({
      url:router.T_SETVIP
    }).then(res=>{
      wx.showToast({
        title: `积分+${this.data.list.t6[idx].rewards}`,
        icon:"none"
      })
      this.percents.t6[idx]=200;
      this.setData({
        ["list.t6["+idx+"].percent"]:200,
      });
    })
  },
  showMore(e){
    this.setData({
      showTimeAll:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      //别人的每日分享
      let id = options.id;
      $.ajax({
        url:router.T_SETDS,
        data:{
          id
        }
      })
    }
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
      url:router.T_ALL,
    }).then(res=>{

      $.ajax({
        url:router.T_USER
      }).then(res_user=>{
        //resident常驻
        // 1：每日，2：每周，4：常驻，5：限时，6：vip
        let d = res_user.data;
        let percents = {
          t1:d.daily.split(","),
          t2:d.weekly.split(","),
          t4:d.resident.split(","),
          t5:d.time.split(","),
          t6:d.vip.split(","),
        }

        let length = res.data.length;
        let list = {
          t1:[],
          t2:[],
          t4:[],
          t5:[],
          t6:[],
        };
        for (let index = 0; index < length; index++) {
          let current = list["t"+res.data[index].type].length;
          res.data[index].percent = percents["t"+res.data[index].type][current];
          list["t"+res.data[index].type].push(res.data[index]);
        }
        this.percents = percents;
        this.uid = res.data.id;
        this.setData({
          list,
          isVip: app.globalData.userInfo.u_isVip==1
        });
      })


    })
  },
  residentClick(e){
    let idx = e.currentTarget.dataset.idx;
    if(this.percents.t4[idx]>100){
      return;
    }


    const tid = this.data.list.t4[idx].id;
    if(this.percents.t4[idx]==100){
      this.percents.t4[idx]==200;
      let params = {
        idx,
        tid,
      };
      $.ajax({
        url:router.T_SETR,
        data:params
      }).then(res=>{
        wx.showToast({
          title: `积分+${this.data.list.t4[idx].rewards}，经验+${this.data.list.t4[idx].rewards}`,
          icon:"none"
        })
        this.setData({
          ["list.t4["+idx+"].percent"]:200,
        });
      })
      return;
    }

    if(idx==0){
      wx.navigateTo({
        url: '../setting/setting',
      });
      return;
    }

  },
  weekClick(e){
    let idx = e.currentTarget.dataset.idx;
    const tid = this.data.list.t2[idx].id;
    if(this.percents.t2[idx]!=100){
      return;
    }
    this.percents.t2[idx]=200;
    $.ajax({
      url:router.T_SETW,
      data:{
        idx,tid,
      }
    }).then(res=>{
      wx.showToast({
        title: `积分+${this.data.list.t2[idx].rewards}，经验+${this.data.list.t2[idx].rewards}`,
        icon:"none"
      })
      this.setData({
        ["list.t2["+idx+"].percent"]:200,
      });
    })
    return;
  },
  dailyClick(e){
    let idx = e.currentTarget.dataset.idx;
    let od = this.percents.t1.join(",");
    let ow = this.percents.t2.join(",");
    const tid = this.data.list.t1[idx].id;
    if(this.percents.t1[idx]>100){
      return;
    }
    if(idx==0){
      //签到，点击就能完成
      this.percents.t1[0]=200;
      this.percents.t2[0]=+this.percents.t2[0]+20;
      $.ajax({
        url:router.T_SETD,
        data:{
          od,
          nd:this.percents.t1.join(","),
          ow,
          nw:this.percents.t2.join(","),
          tid
        }
      }).then(res=>{
        wx.showToast({
          title: `积分+${this.data.list.t1[idx].rewards}，经验+${this.data.list.t1[idx].rewards}`,
          icon:"none"
        })
        this.setData({
          ["list.t1[0].percent"]:this.percents.t1[0],
          ["list.t2[0].percent"]:this.percents.t2[0],
        });
      })
    }else{
      //领取完成的任务的积分
      if(this.percents.t1[idx]==100){
        this.percents.t1[idx]=200;
        let params = {
          idx,
          tid,
        };
        $.ajax({
          url:router.T_SETD,
          data:params
        }).then(res=>{
          wx.showToast({
            title: `积分+${this.data.list.t1[idx].rewards}，经验+${this.data.list.t1[idx].rewards}`,
            icon:"none"
          })
          this.setData({
            ["list.t1["+idx+"].percent"]:200,
          });
        })
        return;
      }
      // <100 去做任务
      if(idx==4){
        $.ajax({
          url:router.T_SETD,
          data:{
            idx_:idx,
            tid,
          }
        }).then(res=>{
          wx.navigateTo({
            url: '../../../coupon/coupon',
          });
        })
        return;
      }
      
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
  onShareAppMessage(obj){
    this.percents.t1[3]=100;
    return {
      title: '捌柒陆叁',
      path: '/pages/tabbar/my/task/task?id='+this.uid,
      //promise 
    }
  },
})