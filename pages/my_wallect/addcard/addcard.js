// pages/my_wallect/addcard/addcard.js
var util = require('../../../utils/cardcheck.js');
var Bmob = require('../../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankname:"",
    banktype:'',
    array: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '中国邮政储蓄银行','交通银行'],
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
    if (temp == "error") {
      this.setData({
        bankname: '暂不支持的银行',
        banktype: '暂不支持的类型',
      })
    }
    else {
      if (temp.bankName !=null)
      {
        this.setData({
          bankname: temp.bankName,
          banktype: temp.cardTypeName,
        })
      }
    }
  },

  bindPickerChange: function (e) {
    var that =this;
    var array1 = that.data.array;
    that.setData({
      bankname: array1[e.detail.value]
    })
  },

  formSubmit: function (e) {
    var that = this;
    var detail = e.detail.value;
    var name = detail.input1;
    var banknumber = detail.input2;
    var bankname = that.data.bankname;
    var banktype = detail.input4;
    var phone = detail.input5;
    if (bankname == "暂不支持的银行" || banktype =="暂不支持的类型")
    {
      wx.showToast({
        title: '暂未支持该银行的提现',
        icon:'none'
      })
    } else if (detail == "" || name == "" || banknumber=="" || bankname=="" || banktype==""||phone.length<11)
    {
      console.log(detail,name,bankname,banknumber,banktype,phone)
      wx.showToast({
        title: '请填写完成',
        icon: 'none'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请仔细核对检验后提交',
        success: function (res) {
          if (res.confirm) {
            let current = Bmob.User.current();
            let userid = current.objectId;
            const pointer = Bmob.Pointer('_User');
            const poiID = pointer.set(userid);
            const query = Bmob.Query('bank_card');
            query.set("user_id", poiID);
            query.set("phone", phone);
            query.set("name", name);
            query.set("card_type", banktype);
            query.set("card_name", bankname);
            query.set("card_no", banknumber);
            query.save().then(res => {
              var cardid = res.objectId;
              const query = Bmob.Query('_User');
              const pointer = Bmob.Pointer('bank_card');
              const poiID = pointer.set(cardid);
              query.get(userid).then(res => {
                res.set('bank_card_id', poiID);
                res.save();
                wx.showToast({
                  title: '绑定成功',
                  icon: 'success',
                });
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../my_wallect'
                  })
                },1000)
              })
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
      
    }
  },

})