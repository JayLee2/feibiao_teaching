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
    xsprice:0,

    withdraw:"none",
    inputValue:"",
    packages: [
      { text: "0.01", count: 0.01, isSelect: '' },
      { text: "200", count: 200, isSelect: '' },
      { text: "300", count: 300, isSelect: '' },    
      { text: "400", count: 400, isSelect: '' },
      { text: "800", count: 800, isSelect: '' },
      { text: "1000", count: 1000, isSelect: '' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let current=Bmob.User.current();
    const query=Bmob.Query('_User');
    query.get(current.objectId).then(res=>{
      if(res.money_can ==null && res.money_nocan ==null){}
      else{
        that.setData({
          money_can: res.money_can,
          money_nocan: res.money_nocan
        })
      }
    })
  },
  //输入充值金值的方法
  input_price: function (e) {
    let count = e.detail.value; 
    var that = this; 
    that.default_select() //先让所有选项初始默认颜色  
    if(count>=0){
    that.setData({      
      price: count,
      xsprice:count,
    })
    }
    else{
      wx.showToast({
        title: '请输入正确金额',
        icon: 'none',        
      });
      that.setData({
        price: 0,
        xsprice: count,
      })
    }
    
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
        [item]: 'package_select',
        price: count,
        xsprice:0
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

  ret:function()
  {
    var that = this;

    if (that.data.money_can == 0)
    {
      wx.showToast({
        title: '当前余额为0',
        icon:"none",
      })
    }else{
      that.setData({
        withdraw:"block",
      })
    }
  },

  hidden:function()
  {
    var that = this;
    that.setData({
      withdraw: "none",
    })
  },

  bindmoneyInput:function(e)
  {
    var that = this;
    this.setData({
      inputValue: e.detail.value
    });

    if (that.data.inputValue>that.data.money_can){
      that.setData({
        inputValue: that.data.money_can
      });
      wx.showToast({
        title: '已超过最大金额',
        icon:'none'
      })
    }
  },

  submit:function()
  {
    var that = this;
    let current = Bmob.User.current();
    var id = current.objectId;

    if (that.data.inputValue <=50)
    {
      wx.showToast({
        title: '最低50元取现',
        icon:'none',
      })
    }else{
      const query = Bmob.Query('_User');
      query.get(id).then(res => {
        res.set('money_can', that.data.money_can - that.data.inputValue)
        res.save()
      }).then(res => {
        that.hidden();
        that.onLoad();
        wx.showToast({
          title: '提现成功',
          icon: "none"
        });
        var money = parseInt(that.data.inputValue, 10)
        const query = Bmob.Query('withdraw');
        const pointer = Bmob.Pointer('_User')
        const poiID = pointer.set(id);
        query.set("money", money);
        query.set("parent", poiID);
        query.save();
      })
    }
  }
})