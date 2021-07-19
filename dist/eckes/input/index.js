Component({
	behaviors: ['wx://form-field'],
	options: {
		multipleSlots: true,
		styleIsolation: 'apply-shared'
  },
	properties: {
		noborder: {
			type: Boolean,
			value: false
		},
		label:{
			type: String,
			value:''
		},
		type:{
			type:String,
			value:'text'
		},
		password:{
			type:Boolean,
			value:false
		},
		placeholder:{
			type:String,
			value:''
		},
		focus:{
			type:Boolean,
			value:false
		},
		value:{
			type: String,
			observer(value) {
				if (value !== this.value) {
					this.setData({ initValue: value });
					this.value = value;
				}
			},
		},
		disabled:Boolean,
		readonly:Boolean,
		maxlength:{
			type:Number,
			value:100
		},
		useButtonSlot:Boolean,
		required:Boolean,
		name:String,
		nolabel:{
			type:Boolean,
			value:false
		},
		pickerArray:{
			type:Array,
			value:[]
		},
		pickerSplit:{
			type:String,
			value:" "
		},
		pickerIndex:{
			type:Array,
			value:[]
		},
		pickerColumn:{
			type:String,
			value:"value"
		},
		
	},
	ready(){
		var obj={};
		this.value = this.data.value;
		if(this.data.pickerIndex.length>0){
			obj.pickerIndex = this.data.pickerIndex;
			obj.initValue = []
			const pl = obj.pickerIndex.length;
			for(let i=0; i<pl;i++){
				obj.initValue.push(this.data.pickerArray[i][obj.pickerIndex[i]][this.data.pickerColumn]);
			}
			obj.initValue = obj.initValue.join(this.data.pickerSplit);
		}
		if(this.value){
			obj.initValue=this.value;
		}
		obj!={} && this.setData(obj);
	},
	created(){},
	data: {
		initValue: ""
	},
	methods: {
		emitChange(bind, data) {
      wx.nextTick(() => {
        this.triggerEvent(bind, data)
      });
		},
		onTap(event) {
			this.emitChange("click", event)
		},
		onBlur(event) {
      this.value = event.detail.value;
      this.setData({ value: this.value });
			this.emitChange("blur", {name:this.data.name||'',value:this.value})
		},
		onInput(event) {
      const { value = '' } = event.detail || {};
      this.value = value;
      this.setData({ value: this.value });
			this.emitChange("input", {name:this.data.name||'',value})
		},
		bindPickerChange(e){
			var value = e.detail.value;
			var initValue = [];
			var picker=[];
			var arr = this.data.pickerArray;
			const pl = value.length;
			for(let i=0; i<pl;i++){
				let v=value[i]||0;
				picker.push(arr[i][v]);
				initValue.push(arr[i][v][this.data.pickerColumn]);
			}
			initValue = initValue.join(this.data.pickerSplit);
	
			this.setData({
				initValue,
				value:initValue
			})
			this.emitChange("picker",picker)
		},
		bindPickerColumnChange(e){
			this.emitChange("pickercolumnchange",e.detail)
		}
	}
})