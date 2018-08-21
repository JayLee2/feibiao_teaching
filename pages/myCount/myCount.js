// pages/myCount/myCount.js
var that;
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//存放老师
    list_student:[],//存放学生
    show_teacher:true,
    show_student:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    let current=Bmob.User.current();
    console.log(current)
    if(!current.identity){
      //没认证
    }else if(current.identity=='teacher'){
      //是老师
      const query = Bmob.Query("buy_record");
      const pointer = Bmob.Pointer('_User')
      const poiID = pointer.set(current.objectId)
      query.equalTo("seller", "==", poiID);
      query.include('seller')      
      query.find().then(res => {
        console.log(res)
        that.setData({
          list_student:res,
          show_student:true,
          show_teacher:false,
        })
      });
    }else{
      //是家长
      const query = Bmob.Query("buy_record");
      const pointer = Bmob.Pointer('_User')
      const poiID = pointer.set(current.objectId)
      query.equalTo("buyer", "==", poiID);
      query.include('seller')
      query.find().then(res => {
        console.log(res)
        that.setData({
          list: res,
          show_student: false,
          show_teacher: true,
        })
      });
    }
  },
  //前往详情页的方法
  toNext:function(e){
    console.log(e)
    let state = e.currentTarget.dataset.state;
    let id = e.currentTarget.dataset.index;    
    let url = `../count_detail${state}/count_detail${state}?id=${id}`;
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