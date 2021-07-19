# 属性
```js
properties: {
		noborder: { // 底部边框线
			type: Boolean,
			value: false
		},
		label:{  // 标题label
			type: String,
			value:''
		},
		type:{ //表单type ： text，picker，checkbox，radio，textarea
			type:String,
			value:'text'
		},
		password:{ // 是否是password
			type:Boolean,
			value:false
		},
		placeholder:{ // 
			type:String,
			value:''
		},
		focus:{ // 设置焦点
			type:Boolean,
			value:false
		},
		value:{ // 默认值
			type: String,
			observer(value) {
				if (value !== this.value) {
					this.setData({ initValue: value });
					this.value = value;
				}
			},
		},
		disabled:Boolean, // 只读
		readonly:Boolean, // 只读
		maxlength:{ //最大长度
			type:Number,
			value:100
		},
		useButtonSlot:Boolean,// input右侧slot
		required:Boolean,// 必填
		name:String, // 表单name
		nolabel:{  // 没有label标题
			type:Boolean,
			value:false
		},
		pickerArray:{ //picker数据
			type:Array,
			value:[]
		},
		pickerIndex:{ //picker默认的index值
			type:Array,
			value:[]
		},
		pickerColumn:{ //picker显示在页面上的key字段名
			type:String,
			value:"value"
		},
		
	},
```

# 使用方法

### text
```html
		<eckes-input 
			label="联系方式" 
			name="tel"
			required
			value="{{otherColumns.tel}}"
			focus="{{otherColumns.telFocus}}"
			bindinput="setColumn"
			placeholder="请输入您的常用的手机号"
		/>
```

### radio
```html
		<eckes-input 
			label="来源地区" 
			type="radio"
			required
		>
			<radio-group name="areaFlag" bindchange="areaFlagRadioChange">
				<label><radio value="中国" checked/>中国</label>
				<label><radio value="海外"/>海外</label>
			</radio-group>
		</eckes-input>
```

### checkbox
```html
		<eckes-input 
			label="选择地区" 
			name="areaText"
			required
			value="{{otherColumns.areaText}}"
			placeholder="请选择您的所在地区"
			type="picker"
			pickerArray="{{pickerArray}}"
			pickerIndex="{{pickerIndex}}"
			pickerColumn="name"
			bindpicker="pickerChange"
			bindpickercolumnchange="pickerColumnChange"
		/>
		<input hidden name="city" value="{{otherColumns.city}}" />
		<input hidden name="country" value="{{otherColumns.country}}" />
		<input hidden name="province" value="{{otherColumns.province}}" />
		<input hidden name="sourceArea" value="{{otherColumns.sourceArea}}" />
```
```js
		pickerArray:[
			__json.sheng,
			__json.shi["745922886337830234"], //北京市
			__json.qu["745922886337830235"] // 北京市下的区
		],
		pickerIndex:[0,0,0], //默认选择
```


### checkbox + input
```html
		<eckes-input 
			label="关注领域" 
			type="checkbox"
			required
		>
			<checkbox-group name="focusAreaArray" bindchange="gzlyChange">
				<label wx:for="{{fieldcolumns}}"><checkbox value="{{item.id}}"/>{{item.name}}</label>
			</checkbox-group>

			<eckes-input 
				nolabel="{{true}}"
				noborder="{{true}}"
				name="otherFocusArea"
				required
				placeholder="请输入其他领域"
				wx:if="{{otherColumns.gzlyOther}}"
			/>
		</eckes-input>
```

### textarea
```html
		<eckes-input 
			label="留言" 
			name="leavingMessage"
			type="textarea"
			maxlength="{{500}}"
			placeholder="如果有其他需求,请在此填写"
		/>
```