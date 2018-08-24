// pages/my_wallect/my_wallect.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money_can:0,
    money_nocan:0,
    price:0,
    focus:true,    
    packages: [
      { text: "0.01", count: 0.01, isSelect: '' },
      { text: "200", count: 200, isSelect: '' },
      { text: "300", count: 300, isSelect: '' },    
      { text: "400", count: 400, isSelect: '' },
      { text: "800", count: 800, isSelect: '' },
      { text: "1000", count: 1000, isSelect: '' },
    ],
  },
  buy: function () {
    var openId = wx.getStorageSync('openid');
    //传参数金额，名称，描述,openid
    Bmob.Pay.weApp(0.01, '哇哈哈1瓶', '哇哈哈饮料，杭州生产', 'qwesadasd').then(function (resp) {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let current=Bmob.User.current();
    const query=Bmob.Query('_User');
    query.get(current.objectId).then(res=>{
      that.setData({
        money_can:res.money_can,
        money_nocan: res.money_nocan        
      })
    })
  },
  //输入充值金值的方法
  input_price: function (e) {
    let count = e.detail.value; 
    var that = this; 
    that.default_select() //先让所有选项初始默认颜色  
    that.setData({      
      price: count,
      focus:true,
    })
    /*wx.showToast({
      title: this.data.price,
    });*/
    //this.compute_price()
  },
  //金额选择方法
  couse_select: function (e) {
    var that = this;
    let count = e.target.dataset.count;
    let index = e.target.dataset.id;
    let item ='packages[' + index + '].isSelect';    

    that.default_select() //先让所有选项初始默认颜色
    if (count == 0) {
      that.setData({

      });

    } else {
      that.setData({
     //   hasCount: false,
        [item]: 'package_select',
        price: count,
      }); 
    }
  },
  //遍历金额全部变成白色
  default_select: function () {
    var that = this;
    that.data.packages.forEach(function (value, index) {
      let item = 'packages[' + index + '].isSelect';
      that.setData({
        [item]: '',
      })
    })
  },
    /**
   * 微信支付方法
   */
  buy: function () {
    var that=this;
    var price=that.data.price;
    var openId=app.globalData.openId;
    var userId=app.globalData.user_id;
    console.log(openId);
    console.log(userId);
    if(price==''){
      wx.showToast({
        title: '请输入充值金额',
        icon:'none',
      });
      return;
    }
    Bmob.Pay.weApp(parseFloat(price), '余额充值','飞镖家教充值',openId).then(function (resp) {
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
          const query = Bmob.Query('_User');
          query.get(userId).then(res => {
            let total=res.money_can+Number(price);
            res.set('money_can',total);
            res.save();
            console.log(res)
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              money_can:total,
              price:0
            })
          }).catch(err => {
            console.log('充值失败')
            console.log(err)
          })
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