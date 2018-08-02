// pages/teacher_detail/teacher_detail.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    packages:[
      {text:"新课试听： 一节课",count:2,isSelect:''},
      { text: "套餐一： 三节课", count: 6, isSelect: 'package_select' },
      { text: "套餐二： 六节课", count: 12, isSelect: '' },
      { text: "套餐三： 自定义", count: 0, isSelect: '' },
    ],
    showModal: false,  //控制弹出框
    unit:100,     //课程单价
    hasCount:false, //是否显示课程数量
    price:0,    //总价
    count:6,    //课程总数
    focus:false //自动获取焦点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    var id=options.id;
    const query = Bmob.Query('user_teacher');
    query.get(id).then(res => {
      that.setData({
        detail:res
      })
    }).catch(err => {
      console.log(err)
    })
    this.compute_price()
  },
  //点击购买弹出框
  buy:function(){
    this.setData({
      showModal:true,
    })
  },
  //课程选择方法
  couse_select:function(e){
    var that=this;
    let count=e.target.dataset.count;
    let index = e.target.dataset.id;
    let item = 'packages[' + index +'].isSelect';
    that.default_select() //先让所有选项初始默认颜色
    if(count==0){
      that.setData({
        hasCount:true,
        [item]:'package_select',
        price:0,
        focus:true,
      });
      
    }else{
      that.setData({
        hasCount: false,
        [item]: 'package_select',
        count:count,
      })
      that.compute_price();
    }
  },
  //计算价格的方法
  compute_price:function(){
    this.setData({
      price: this.data.unit * this.data.count
    })
  },
  //遍历课程全部变成白色
  default_select:function(){
    var that=this;
    that.data.packages.forEach(function(value,index){
      let item='packages['+index+'].isSelect';
      that.setData({
        [item]:'',
      })
    })
  },
  //输入课程数量的方法
  changeCount:function(e){
    let count=e.detail.value;
    this.setData({
      count:count*2,
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