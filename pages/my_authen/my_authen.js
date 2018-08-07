// pages/my_authen/my_authen.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tea:true,
    chi:false,
    native_place:'',//存储籍贯
    diploma_list:['本科','硕士','博士','专科'],
    diploma:'',//存储学历
    send:'获取验证码',
    name:'',//存储姓名
    sex:'男',//存储性别
    major:'',
    school:'',
    phone:'',
    codes:'',
    ret_code:"",//发短信返回的code
    chi_grade_list: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'],
    chi_grade:'',//孩子年级
    chi_sex:'男',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //切换
  chi:function(){
    this.setData({
      tea:false,
      chi:true
    })
  },
  tea: function () {
    this.setData({
      tea: true,
      chi: false
    })
  },
  native_place:function(e){ 
    let native_place = e.detail.value.join('-');
    this.setData({
      native_place:native_place
    })
  },
  picker_diploma:function(e){
    var that=this;
    console.log(e)
    let diploma = e.detail.value
    this.setData({
      diploma: that.data.diploma_list[diploma]
    })
  },
  //年纪选择
  picker_chi_grade: function (e) {
    var that = this;
    console.log(e)
    let chi_grade = e.detail.value
    this.setData({
      chi_grade: that.data.chi_grade_list[chi_grade]
    })
  },
  get_code:function(){
    let that=this;
    if (that.data.phone != '' ){
      console.log(that.data.phone)
      
      if (this.data.send == '获取验证码' || this.data.send == '重新获取') {
        let num = 60;
        setInterval(() => {

          if (num == 1) {
            that.setData({
              send: '重新获取'
            })
          } else {
            that.setData({
              send: --num + 's'
            })
          }
        }, 1000)
        //todo
        let params = {
          mobilePhoneNumber: that.data.phone //string
        }
        Bmob.requestSmsCode(params).then(function (response) {
          console.log(response);
          that.setData({
            ret_code: response.smsId
          })
        })
          .catch(function (error) {
            console.log(error);
            wx.showToast({
              title: error.error,
              icon:'none'
            })
          });
      }
    }else{
      wx.showToast({
        title: '请输入电话号',
        icon:'none'
      })
    }
    
  },
  bind_name:function(e){
    console.log(e)
      this.setData({
        name:e.detail.value
      })
  },
  bind_sex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  //学生性别改变方法
  bind_chi_sex: function (e) {
    this.setData({
      chi_sex: e.detail.value
    })
  },
  bind_major:function(e){
    this.setData({
      major:e.detail.value
    })
  },
  bind_school: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  bind_phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  bind_codes: function (e) {
    this.setData({
      codes: e.detail.value
    })
  },
  //下一步
  next:function(){
    let that=this;
    let name=that.data.name;
    let phone = that.data.phone;
    let sex = that.data.sex;
    let native_place = that.data.native_place;
    let school = that.data.school;
    let major = that.data.major;
    let diploma = that.data.diploma;
    let codes = that.data.codes;
    if(name==''||name==undefined||name==null){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return;
    } else if (native_place == '' || native_place == undefined || native_place == null){
      wx.showToast({
        title: '请选择籍贯',
        icon: 'none'
      })
      return;
    } else if (school == '' || school == undefined || school == null) {
      wx.showToast({
        title: '请选择学校',
        icon: 'none'
      })
      return;
    } else if (major == '' || major == undefined || major == null) {
      wx.showToast({
        title: '请选择专业',
        icon: 'none'
      })
      return;
    } else if (diploma == '' || diploma == undefined || diploma == null) {
      wx.showToast({
        title: '请选择学历',
        icon: 'none'
      })
      return;
    }else{
      let smsCode = that.data.codes;
      let data = {
        mobilePhoneNumber: that.data.phone
      }
      console.log(smsCode,data)
      Bmob.verifySmsCode(smsCode, data).then(function (response) {
        console.log(response);
        if(response.msg=='ok'){
          //todo
        }
      })
        .catch(function (error) {
          console.log(error);
          wx.showToast({
            title: error.error,
          })
        });
    }

    
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