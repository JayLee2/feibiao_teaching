// pages/my_wallect/my_wallect.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money_can:0,
    money_nocan:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let current=Bmob.User.current();
    const query=Bmob.Query('_User');
    query.get(current.objectId).then(res=>{
      that.setData({
        money_can:res.money_can,
        money_nocan: res.money_nocan        
      })
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
  
  }
})