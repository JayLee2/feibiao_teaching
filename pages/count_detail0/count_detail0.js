// pages/count_detail0/count_detail0.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      couse_data:[],
      showModal: false,  //控制弹出框-续费
      showReturn:false,   //控制弹出框退款
      unit: 100,     //课程单价
      hasCount: false, //是否显示课程数量
      price: 0,    //总价
      ret_price: 0,    //退款总价
      count: 0,    //课程总数
      ret_count:0,
      focus: false, //自动获取焦点
      ret_reason:'', //退款原因
      all_count:20,   //所有课程
  },
  //点击购买弹出框
  buy: function () {
    this.setData({
      showModal: true,
    })
  },


  
  //输入课程数量的方法
  changeCount: function (e) {
    let count = e.detail.value;
    this.setData({
      count: count * 2,
    })
  },
  /**
       * 弹出框蒙层截断touchmove事件
       */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  //点击退款弹出框
  ret: function () {
    this.setData({
      showReturn: true,
    })
  },
  /**
   * 退款对话框取消按钮点击事件
   */
  ret_onCancel: function () {
    this.ret_hideModal();
  },
  /**
   * 退款对话框确认按钮点击事件
   */
  ret_onConfirm: function () {
    this.ret_hideModal();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let id = options.id;
    let seller = options.seller;
    let buyer=Bmob.User.current().objectId;
    console.log(options)
    const query = Bmob.Query('buy_record');
    query.include('seller')
    query.get(id).then(res => {
      that.setData({
        detail:res
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const record=Bmob.Query('record');
    record.equalTo('seller','==',seller);
    record.equalTo('buyer','==',buyer);
    record.find().then(res=>{
      console.log(res);
      that.setData({
        couse_data:res,
      })
    })
  },
  finish(e){
    let id=e.currentTarget.dataset.index;
  
    wx.showModal({
      title: '提示',
      content: '确认要完成该课程吗,',
      success(ed){
        if(ed.cancel){

        }else if(ed.confirm){
          const query = Bmob.Query('buy_record');
          query.set('id', id) //需要修改的objectId
          query.set('state', '1')
          query.save().then(res => {
            console.log(res);
            wx.navigateTo({
              url: '../myCount/myCount',
            })
          }).catch(err => {
            console.log(err)
          })
        }
      }
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