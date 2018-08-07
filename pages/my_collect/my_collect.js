// pages/my_collect/my_collect.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let current = Bmob.User.current();
    const query = Bmob.Query("collect");
    //下面参数为Pointer字段名称， 可以一次查询多个表
    query.include('couse_id','user_id' )
    query.find().then(res => {
      that.setData({
        teacher_list:res,
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  toNext:function(e){
    let id=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../teacher_detail/teacher_detail?id='+id,
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