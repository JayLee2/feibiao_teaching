// pages/pub_look_child/pub_look_child.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    be_good_like:'',
    can_teached:'',
    have_time:"",
  },
  edit:function(e){
    let id=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../to_edit_teac/to_edit_teac?id='+id,
    })
  },
  look:function(){
    wx.navigateTo({
      url: '../apply_list/apply_list'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    const queryFind = Bmob.Query('user_teacher');
    queryFind.get(options.id).then(res => {
      console.log(res)
      that.setData({
        info:res,
        be_good_like: res.be_good_like.join(','),
        can_teached: res.can_teached.join(','),
        have_time: res.have_time.join(','),
      })
    }).catch(err => {
      console.log(err)
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