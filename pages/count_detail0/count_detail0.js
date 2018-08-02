// pages/count_detail0/count_detail0.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      couse_data:[
        {name:'新课试听(一节课)' ,count:1,time:'2018-08-08 20:09'},
        { name: '套餐一(三节课)', count: 3, time: '2018-08-08 20:09' },
        { name: '套餐二(六节课)', count: 6, time: '2018-08-08 20:09' },
        { name: '自定义(二十节课)', count: 20, time: '2018-08-08 20:09' },
      ],
      showModal: false,  //控制弹出框-续费
      showReturn:true,   //控制弹出框退款
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
  //加减法
  add:function(){
    let count=this.data.count;
    this.setData({
      count:++count,
    })
    this.compute_price();
  },
  minus:function(){
    let count = this.data.count;
    if(count>0){
      this.setData({
        count: --count,
      })
    }
    this.compute_price();
  },
  //计算价格的方法
  compute_price: function () {
    this.setData({
      price: this.data.unit * this.data.count
    })
  },
  
  //输入课程数量的方法
  changeCount: function (e) {
    let count = e.detail.value;
    this.setData({
      count: count * 2,
    })
    this.compute_price()
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
  * 隐藏模态对话框
  */
  ret_hideModal: function () {
    this.setData({
      showReturn: false
    });
  },
  //加减法
  ret_add: function () {
    let count = this.data.ret_count;
    let max=this.data.all_count;
    if(count<max){
      this.setData({
        ret_count: ++count,
      })
    }
    this.ret_compute_price();
  },
  ret_minus: function () {
    let count = this.data.ret_count;
    if (count > 0) {
      this.setData({
        ret_count: --count,
      })
    }
    this.ret_compute_price();
  },
  //计算价格的方法
  ret_compute_price: function () {
    this.setData({
      ret_price: this.data.unit * this.data.ret_count
    })
  },
  ret_all:function(){
    let all_count=this.data.all_count;
    this.setData({
      ret_count:all_count
    })
    this.ret_compute_price()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.compute_price();  
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