Component({
	options: {
		styleIsolation: 'apply-shared'
  },
	properties: {
		currentNavIndex:{
			type:Number,
			value:0
		},
		list:{
			type:Array,
			value:[
				{"name": "第一届","id": "934298ceffd4f77978e6d57e7620917"},
				{"name": "第二届","id": "934298ceffd4f77978e6d57e7620918"}
			]
		}
	},
	methods: {
		emitChange(bind, data) {
      wx.nextTick(() => {
        this.triggerEvent(bind, data)
      });
		},
		totap(e){
			this.setData({
				currentNavIndex:e.currentTarget.dataset.idx
			})
			this.emitChange("totap", {id:e.currentTarget.dataset.id,index:e.currentTarget.dataset.idx})
		}
	}
})