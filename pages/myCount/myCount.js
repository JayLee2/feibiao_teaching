// pages/myCount/myCount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: [
      { id: 'JY0934212', path: 'img/timg1.jpg', name: '李先生', couse: '数学', addr: '12节课（10/12）', grade: '￥1400.00' ,state:'0'},
      { id: 'JY04213', path: 'img/timg1.jpg', name: '李老师', couse: '体育', addr: '12节课（10/12）', grade: '￥400.00', state: '1' },
      { id: 'JY42314', path: 'img/timg1.jpg', name: '张老师', couse: '物理', addr: '12节课（10/12）', grade: '￥800.00', state: '2'},
      { id: 'JY42314', path: 'img/timg1.jpg', name: '张老师', couse: '物理', addr: '12节课（10/12）', grade: '￥800.00', state: '3' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //前往详情页的方法
  toNext:function(e){
    console.log(e)
    let state = e.currentTarget.dataset.state;
    let url = `../count_detail${state}/count_detail${state}`;
    wx.navigateTo({
      url:url
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