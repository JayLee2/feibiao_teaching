// pages/my_wallect/addcard/addcard.js
var util = require('../../../utils/cardcheck.js');
var Bmob = require('../../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankname:"",
    banktype:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  getUserIdCardNumber: function (e) {
    this.setData({
      bankNumber: e.detail.value
    })
    var temp = util.bankCardAttribution(e.detail.value)
    console.log(temp)
    if (temp == Error) {
      temp.bankName = '';
      temp.cardTypeName = '';
    }
    else {
      this.setData({
        bankname: temp.bankName,
        banktype: temp.cardTypeName,
      })
    }
  },

  formSubmit: function (e) {
    var detail = e.detail.value;
    var name = detail.input1;
    var banknumber = detail.input2;
    var bankname = detail.input3;
    var banktype = detail.input4;
    var phone = detail.input5;
  },

})