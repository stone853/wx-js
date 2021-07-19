Page({
	data: {
		navH:"0",
		headerBtnPosi:"0",
		saveH:getApp().globalData.bottomTabbarSaveHeight,
	},
	onLoad: function(options) {
		wx.getSystemInfo({
      success: res => {
        //导航高度
        this.setData({
          navH: res.statusBarHeight + 46,
          headerBtnPosi: wx.getMenuButtonBoundingClientRect(),
        })
      }
		});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		if (typeof this.getTabBar === 'function' &&
			this.getTabBar()) {
			this.getTabBar().setData({
				selected: 2
			})
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
})
