// pages/my_apply/my_apply.js
var that;
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    has_data:true
  },
  to_apply_detail: (e) => {
    wx.navigateTo({
      url: '../student_detail/student_detail?id='+e.currentTarget.dataset.index+'&origin=apply',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
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
    let current=Bmob.User.current();

    const pointerUser = Bmob.Pointer('_User')
    const poiID = pointerUser.set(current.objectId)

    const query = Bmob.Query('applys')
    //userId 字段名称关联用户表 ，类型Pointer
    query.equalTo("user_id", "==", poiID);
    query.include('couse_id')
    query.find().then(res => {
      console.log(res)
      if (res.length > 0) {
        that.setData({
          list: res,
        })
      } else {
        that.setData({
          has_data: false,
        })
      }
    });
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