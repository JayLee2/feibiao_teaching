// pages/apply_detail_teac/apply_detail_teac.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    objectId:'',
    packages: [
      { text: "新课试听： 一节课", count: 2, isSelect: '' },
      { text: "套餐一： 三节课", count: 6, isSelect: 'package_select' },
      { text: "套餐二： 六节课", count: 12, isSelect: '' },
      { text: "套餐三： 自定义", count: 0, isSelect: '' },
    ],
    showModal: false,  //控制弹出框
    unit: 100,     //课程单价
    hasCount: false, //是否显示课程数量
    price: 0,    //总价
    count: 6,    //课程总数
    focus: false //自动获取焦点
  },
  //点击购买弹出框
  buy: function () {
    this.setData({
      showModal: true,
    })
  },
  //课程选择方法
  couse_select: function (e) {
    var that = this;
    let count = e.target.dataset.count;
    let index = e.target.dataset.id;
    let item = 'packages[' + index + '].isSelect';
    that.default_select() //先让所有选项初始默认颜色
    if (count == 0) {
      that.setData({
        hasCount: true,
        [item]: 'package_select',
        price: 0,
        focus: true,
      });

    } else {
      that.setData({
        hasCount: false,
        [item]: 'package_select',
        count: count,
      })
      that.compute_price();
    }
  },
  //计算价格的方法
  compute_price: function () {
    this.setData({
      price: this.data.unit * this.data.count
    })
  },
  //遍历课程全部变成白色
  default_select: function () {
    var that = this;
    that.data.packages.forEach(function (value, index) {
      let item = 'packages[' + index + '].isSelect';
      that.setData({
        [item]: '',
      })
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
  //点击不合适的错做
  remove:()=>{
    wx.showModal({
      title: '提示',
      content: '确定将该老师加入不合适列表吗.更改后将无法继续申请',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('applys');
          query.set('id', that.data.objectId) //需要修改的objectId
          query.set('is_appr', false)
          query.save().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          console.log('用户点击确定');
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    that=this;
    // let id ='6453792a10';
    const query = Bmob.Query('user_teacher');
    query.equalTo("user_id","==",id)
    query.find().then(res => {
      console.log(res);
      if(res.length>0){
        that.setData({
          detail: res[0],
          objectId: options.objectId
        })
      }
      
    }).catch(err => {
      console.log(err)
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