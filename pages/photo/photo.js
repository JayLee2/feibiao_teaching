// pages/photo/photo.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envelop:'',//存放封皮图片地址
    cont:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //选择学生证封皮
  add_envelop:function(){
    let that=this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        that.setData({
          envelop: res.tempFilePaths[0]
        })
      },
    })
  },
  //选择身份证内页
  add_cont:function(){
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          cont: res.tempFilePaths[0]
        })
      },
    })
  },
  send:function(){
    let that=this;
    console.log()
    if(this.data.envelop!='' && this.data.cont!=''){
      const query = Bmob.Query('_User');
      let current = Bmob.User.current();
      console.log(current.objectId)
      query.set('id', current.objectId) //需要修改的objectId
      query.set('envelop', that.data.envelop);
      query.set('cont', that.data.cont); 
      query.set('identity', 'teacher')
      query.save().then(res => {
        wx.showToast({
          title: '认证成功',
          duration:2000,
        });
        wx.switchTab({
          url: '../index/index',
        })
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '认证失败',
          icon:'none'
        })
      })
    }else{
      wx.showToast({
        title: '请选择学生证信息照片',
        icon:'none'
      })
    }
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