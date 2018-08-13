// pages/apply_list/apply_list.js
var that;
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    list: [],
  },
  to_apply_detail:(e)=>{
    let id=e.currentTarget.dataset.index;
    let objectId = e.currentTarget.dataset.object;    
    wx.navigateTo({
      url: '../apply_detail_teac/apply_detail_teac?id=' + id + '&objectId=' + objectId,
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
    let current = Bmob.User.current();
    // let id=current.objectId;
    let id ='72da063444';
    const query = Bmob.Query("applys");
    query.include('user_id','couse_id')
    query.equalTo("couse_id", "==", id);
    query.find().then(res => {
      console.log(res)
      that.setData({
        list:res
      })
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