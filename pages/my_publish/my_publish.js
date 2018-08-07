// pages/my_publish/my_publish.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_list: [],
    show_bar:true,
    is_empty:false,
    user_img:''
  },
  to_edit:function(){
    wx.navigateTo({
      url: '../to_edit_teac/to_edit_teac',
    })
  },
  look_detail:function(e){
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../pub_look_teac/pub_look_teac?id=' + e.currentTarget.dataset.index,
    })
  },
  applys:function(){
    wx.navigateTo({
      url: '../apply_list/apply_list',
    })
  },
  //是否展示此条数据
  show_list:function(e){
    console.log(e)
    if(e.type=='change'){
      let showValue=e.detail.value==true?'1':'0';
      let showId=e.currentTarget.dataset.index;
      console.log(showValue)
      const querySet = Bmob.Query('user_teacher');
      querySet.set('id', showId) //需要修改的objectId
      querySet.set('is_show', showValue)
      querySet.save().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.setData({
      user_img:getApp().globalData.user_img
    })
    that=this;
    var objectId = getApp().globalData.user_id;

    //获取当前登陆id的发布
    const queryFind = Bmob.Query("user_teacher");
    queryFind.equalTo("user_id", "==", objectId);
    queryFind.find().then(res => {
      console.log(res)
      if(res.length!=0){
        that.setData({
          show_bar: false,
          teacher_list:res,
          is_empty: true,
        })
      }
      
    }).catch(err => {

    });
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