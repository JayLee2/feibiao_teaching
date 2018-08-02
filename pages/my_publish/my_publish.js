// pages/my_publish/my_publish.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: [
      { id: 'JY0934212', path: '../../img/timg1.jpg', couse: '数学', addr: '北京市朝阳区宋家庄地铁站', unit:'100/h' ,isCheck:true},
      { id: 'JY04213', path: '../../img/timg1.jpg', name: '李老师', couse: '体育', addr: '北京市朝阳区宋家庄地铁站',unit:'200/h', isCheck: true},
      { id: 'JY42314', path: '../../img/timg1.jpg', name: '张老师', couse: '物理', addr: '北京市朝阳区宋家庄地铁站',unit:'300/h', isCheck: false },
      { id: 'JY42314', path: '../../img/timg1.jpg', name: '张老师', couse: '物理', addr: '北京市朝阳区宋家庄地铁站', unit: '200/h',isCheck: true},
    ],
  },
  to_edit:function(){
    wx.navigateTo({
      url: '../to_edit_teac/to_edit_teac',
    })
  },
  look_detail:function(){
    wx.navigateTo({
      url: '../pub_look_child/pub_look_child',
    })
  },
  applys:function(){
    wx.navigateTo({
      url: '../apply_list/apply_list',
    })
  },
  show_list:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    var objectId = getApp().globalData.user_id;
    console.log(objectId)
    const queryFind = Bmob.Query('user_teacher');
    queryFind.get(objectId).then(res => {
      console.log(res)
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