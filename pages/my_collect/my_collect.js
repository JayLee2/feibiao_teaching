// pages/my_collect/my_collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: [
      { id: 'JY0934212', path: '../../img/timg1.jpg', teacher: '周老师', couse: '数学、英语', school: '天津大学', is211: true, is985: true,unit: '100/h'},
      { id: 'JY04213', path: '../../img/timg1.jpg', teacher: '李老师', couse: '体育、英语', school: '天津理工大学大学', is211: false, is985: false, unit: '100/h'},
      { id: 'JY42314', path: '../../img/timg1.jpg', teacher: '张老师', couse: '物理', school: '山西大学', is211: false, is985: true, unit: '100/h' },
      { id: 'JY032512', path: '../../img/timg1.jpg', teacher: '麻老师', couse: '数学、计算机', school: '北京大学', is211: true, is985: false, unit: '100/h'},
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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