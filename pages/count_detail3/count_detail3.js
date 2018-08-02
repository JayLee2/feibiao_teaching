// pages/count_detail0/count_detail0.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couse_data: [
      { name: '新课试听(一节课)', count: '已确认', time: '2018-08-08 20:09' },
      { name: '套餐一(三节课)', count: '已确认', time: '2018-08-08 20:09' },
      { name: '套餐二(六节课)', count: '已确认', time: '2018-08-08 20:09' },
      { name: '自定义(二十节课)', count: '已确认', time: '2018-08-08 20:09' },
    ],

  },
  cancel: function () {
    wx.showModal({
      title: '提示',
      content: '确定要取消课程吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
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