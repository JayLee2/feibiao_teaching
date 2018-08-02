// pages/my_apply/my_apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: [
      { id: 'JY0934212', path: '../../img/timg1.jpg', name: '李先生', couse: '数学、英语', time: '2018-09-08 17:55', grade: '150/h', is_appr: false, is_read: true },
      { id: 'JY04213', path: '../../img/timg1.jpg', name: '李老师', couse: '体育、英语', time: '2018-09-08 17:55', grade: '510/h', is_appr: true, is_read: true },
      { id: 'JY42314', path: '../../img/timg1.jpg', name: '张老师', couse: '物理', time: '2018-09-08 17:55', grade: '220/h', is_appr: true, is_read: false },
      { id: 'JY032512', path: '../../img/timg1.jpg', name: '麻老师', couse: '数学、计算机', time: '2018-09-08 17:55', grade: '33/h', is_appr: false, is_read: true },
    ],
  },
  to_apply_detail: () => {
    wx.navigateTo({
      url: '../apply_detail_teac/apply_detail_teac',
    })
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