// pages/teacher_detail/teacher_detail.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_collect:'收藏',
    by_collect:0,    //用于显示收藏人数
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
        detail:res,
        by_collect: res.by_collect
      })
    }).catch(err => {
      console.log(err)
    })
    this.compute_price();
    //检查是否已经收藏
    let current = Bmob.User.current()
    const queryHas = Bmob.Query("collect");
    queryHas.equalTo("user_id", "==", current.objectId);
    queryHas.equalTo("couse_id", "==", id);    
    queryHas.find().then(res => {
      console.log()
      console.log(res)
      if(res.length>0){
        that.setData({
          is_collect:'已收藏',
        })
      }
    });
  },
  //点击收藏的方法
  collect:function(e){
    let couse_id= e.currentTarget.dataset.index;
    let current = Bmob.User.current();
    if(that.data.is_collect=='收藏'){
      const queryAdd = Bmob.Query('collect');
      queryAdd.save().then(res => {
        console.log(res)

        const pointer = Bmob.Pointer('users')
        const poiID = pointer.set(current.objectId)
        const pointer_couse = Bmob.Pointer('user_teacher')
        const poiID_couse = pointer_couse.set(couse_id)
        queryAdd.get(res.objectId).then(ress => {
          ress.set('user_id', poiID)
          ress.set('couse_id', poiID_couse)
          ress.save().then(() => {
            wx.showToast({
              title: '收藏成功',
            });
            that.setData({
              is_collect: '已收藏',
            })
          })
        })
      }).catch(err => {
        console.log(err)
      })
      const teac_collectEdit = Bmob.Query('user_teacher');     
      teac_collectEdit.get(couse_id).then(ress=>{
         ress.set('by_collect', ress.by_collect+1);
        ress.save();    
        let countCollect = that.data.by_collect + 1;
        that.setData({
        by_collect: countCollect
        })          
      }).catch(err => {
        console.log(err)
      })
    }else{
      const queryDel = Bmob.Query("collect");
      queryDel.equalTo("user_id", "==", current.objectId);
      queryDel.equalTo("couse_id", "==", couse_id);
      queryDel.find().then(res => {
        queryDel.destroy(res[0].objectId).then(ress => {
          wx.showToast({
            title: '已取消',
          });
          that.setData({
            is_collect:'收藏'
          })
        }).catch(err => {

        })
      })
      const teac_collectEdit = Bmob.Query('user_teacher');
      teac_collectEdit.get(couse_id).then(ress => {
        ress.set('by_collect', ress.by_collect - 1);
        ress.save();
        let countCollect = that.data.by_collect - 1;
        that.setData({
          by_collect: countCollect
        })  
      }).catch(err => {
        console.log(err)
      })
    }
    
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
  
  },
wxpay:function(){
  var openId = wx.getStorageSync('openid');
  //传参数金额，名称，描述,openid
  Bmob.Pay.weApp(0.01, '哇哈哈1瓶', '哇哈哈饮料，杭州生产', openId).then(function (resp) {
    console.log(resp);

    that.setData({
      loading: true,
      dataInfo: resp
    })

    //服务端返回成功
    var timeStamp = resp.timestamp,
      nonceStr = resp.noncestr,
      packages = resp.package,
      orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
      sign = resp.sign;

    //打印订单号
    console.log(orderId);

    //发起支付
    wx.requestPayment({
      'timeStamp': timeStamp,
      'nonceStr': nonceStr,
      'package': packages,
      'signType': 'MD5',
      'paySign': sign,
      'success': function (res) {
        //付款成功,这里可以写你的业务代码
        console.log(res);
      },
      'fail': function (res) {
        //付款失败
        console.log('付款失败');
        console.log(res);
      }
    })

  }, function (err) {
    console.log('服务端返回失败');
    console.log(err);
  });
}
})
