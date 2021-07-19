// pages/my/my.js
var $ = require("../../../../../utils/api.js");
import router from "../../../../../utils/router";
Page({

  /**
   * 页面的初始数据
   */
  data: {
		saveH:getApp().globalData.bottomTabbarSaveHeight,

		t1:[],
    t2:[],
    t2ActKey:0,
    
    t3:[],
    t3ActKey:0,

		host:$.host,
    prod:[],//右侧产品列表
	},
  t3SessionKey:[0],
	sid:0,
	t1code:"",
	onDelete(e){
		const {id,idx,name} = e.currentTarget.dataset; 
		var $this = this;
		wx.showModal({
			title:"是否删除",
			content:"商品："+name,
			success (res) {
				if (res.confirm) {
					$.ajax({
						url:router.P_DELETE+"?id="+id
					}).then(res=>{
						$this.data.prod[$this.data.t2ActKey][$this.data.t3ActKey].splice(idx,1);
						$this.setData({
							["prod["+$this.data.t2ActKey+"]["+$this.data.t3ActKey+"]"]:$this.data.prod[$this.data.t2ActKey][$this.data.t3ActKey]
						})
					})
				}
			},
			fail(){
				console.log(111)
			},
		})

	},
	goDetail(e){
		wx.navigateTo({
			url: '../edit/edit',
			success:(res)=>{
				// 通过eventChannel向被打开页面传送数据
				res.eventChannel.emit('fromData', { data: this.data.prod[this.data.t2ActKey][this.data.t3ActKey][e.currentTarget.dataset.idx] })
			}
		})
	},
	changeNav(e){
		this.t1code=e.detail.id;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
  },
	addProduct(){
		wx.navigateTo({
			url: '../add/add?code='+this.t1code,
		})
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		this._onInit()
	},
	
	_onInit(){
		$.ajax({
      url:router.S_STATUS
    }).then(r=>{
			this.sid=r.data.id;
			$.ajax({
				url:router.S_VISIT+"?id="+r.data.id
			}).then(res=>{
				this.t1code = res.data.t1[0].id;
				this.setData({
					t1:res.data.t1,
					t2:res.data.t2,
					["t3[0]"]:res.data.t3,
					["prod[0][0]"]:res.data.prod,
				})
			})
    })
	},

})