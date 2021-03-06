// pages/detail/selectAddress/selectAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    selectId: ""        //选中的自提点
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.jsonStr);
    data.forEach(function(e){
      if(!e.selectVal){
        e.selectVal = false;
      }
    })
    this.formatData(data);
    this.setData({
      addressList:data
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //确认自提点
  sureAddr:function(){
    var _this = this;
    var page = getCurrentPages();
    var prePage = page[page.length - 2];
    if (prePage.data.selectAddresses != "查看并选择取货点及时间" || _this.data.selectId){
      this.data.addressList.forEach(function(e){
        if (e.id == _this.data.selectId){
          prePage.data.selectAddresses = "取货点：" + e.detail;
          prePage.setData({
            selectAddrId: _this.data.selectId,
            selectAddresses: prePage.data.selectAddresses,
            selectAddrDetail:e.detail
          })
        }
      })
          wx.navigateBack({
            delta: 1
          })
    }
  },

  //切换自提点
  radioChange:function(e){
    this.data.selectId = e.detail.value;
  },

  //格式化数据
  formatData: function (res) {
    res.map(function (item, index) {
      var detailTime = item.detail.split("***");
      if (detailTime.length == 2) {
        item.detail = detailTime[0] + "(取货时间:" + detailTime[1]+")";
        item.claimTime = detailTime[1];
      } else {
        item.detail = detailTime[0];
        item.claimTime = "";
      }
      return item;
    })
    return res;
  }

})