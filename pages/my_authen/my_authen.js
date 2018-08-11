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
    chi_name:'',
    chi_grade_list: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'],
    chi_grade:'',//孩子年级
    chi_sex:'男',
    chi_addr:'',
    chi_phone:'',//家长电话
    send_chi:'获取验证码',
    chi_codes:'',
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
  //学生地址选择
  chi_addr:function(e){
    let chi_addr = e.detail.value.join('-');
    this.setData({
      chi_addr: chi_addr
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
            });
          });
      }
    }else{
      wx.showToast({
        title: '请输入电话号',
        icon:'none'
      })
    }
  },
  //家长电话
  get_code_chi:function(){
    let that = this;
    if (that.data.chi_phone != '') {
      console.log(that.data.phone)

      if (this.data.send_chi == '获取验证码' || this.data.send_chi == '重新获取') {
        let num = 60;
        setInterval(() => {

          if (num == 1) {
            that.setData({
              send_chi: '重新获取'
            })
          } else {
            that.setData({
              send_chi: --num + 's'
            })
          }
        }, 1000)
        //todo
        let params = {
          mobilePhoneNumber: that.data.chi_phone //string
        }
        Bmob.requestSmsCode(params).then(function (response) {
          console.log(response);
          
        })
          .catch(function (error) {
            console.log(error);
            wx.showToast({
              title: error.error,
              icon: 'none'
            })
          });
      }
    } else {
      wx.showToast({
        title: '请输入电话号',
        icon: 'none'
      })
    }
  },
  bind_name:function(e){
    console.log(e)
      this.setData({
        name:e.detail.value
      })
  },
  //学生姓名
  bind_chi_name:function(e){
    console.log(e)
    this.setData({
      chi_name: e.detail.value
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
  //学生
  bind_chi_phone:function(e){
    this.setData({
      chi_phone: e.detail.value
    })
  },
  bind_codes: function (e) {
    this.setData({
      codes: e.detail.value
    })
  },
  //学生验证码
  bind_chi_codes:function(e){
    this.setData({
      chi_codes: e.detail.value
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
    } 
    // else if (phone == '' || phone == undefined || phone == null) {
    //   wx.showToast({
    //     title: '请填写手机号',
    //     icon: 'none'
    //   })
    //   return;
    // }
    // else if (codes == '' || codes == undefined || codes == null) {
    //   wx.showToast({
    //     title: '请填写验证码',
    //     icon: 'none'
    //   })
    //   return;
    // }
    else{
      let smsCode = that.data.codes;
      let data = {
        mobilePhoneNumber: that.data.phone
      }
      console.log(smsCode,data)
      Bmob.verifySmsCode(smsCode, data).then(function (response) {
        console.log(response);
        if(response.msg=='ok'){
          //todo
          wx.showModal({
            title: '提示',
            content: '确认是教师身份后将不可更改',
            success: function (res) {
              if (res.confirm) {
                //获取当前登陆用户
                let current = Bmob.User.current();
                //修改当前用户的身份
                const querySetIdentity = Bmob.Query('_User');
                querySetIdentity.set('id', current.objectId) //需要修改的objectId
                querySetIdentity.set('identity', 'teacher');
                querySetIdentity.set('sex', sex);
                querySetIdentity.set('name', name);
                querySetIdentity.set('grade', diploma);
                querySetIdentity.set('addr', native_place);
                querySetIdentity.set('phone', phone);
                querySetIdentity.set('school', school);

                querySetIdentity.save().then(ress => {
                  console.log(ress);
                  wx.switchTab({
                    url: '../photo/photo',
                  })
                }).catch(err => {
                  console.log(errr)
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
        .catch(function (error) {
          console.log(error);
          wx.showToast({
            title: error.error,
          });
          that.setData({

          })
        });
    }
  },
  chi_next:function(){
    let that = this;
    let name = that.data.chi_name;
    let chi_phone = that.data.chi_phone;
    let sex = that.data.chi_sex;
    let chi_addr = that.data.chi_addr;
    let chi_grade = that.data.chi_grade;
    let chi_codes = that.data.chi_codes;
    if (name == '' || name == undefined || name == null) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return;
    } else if (chi_addr == '' || chi_addr == undefined || chi_addr == null) {
      wx.showToast({
        title: '请选择区域',
        icon: 'none'
      })
      return;
    } else if (chi_grade == '' || chi_grade == undefined || chi_grade == null) {
      wx.showToast({
        title: '请填写孩子年级',
        icon: 'none'
      })
      return;
    } else if (chi_phone == '' || chi_phone == undefined || chi_phone == null) {
      wx.showToast({
        title: '请填写电话号',
        icon: 'none'
      })
      return;
    } else if (chi_codes == '' || chi_codes == undefined || chi_codes == null) {
      wx.showToast({
        title: '请填写验证码',
        icon: 'none'
      })
      return;
    }  else {
      let smsCode = that.data.chi_codes;
      let data = {
        mobilePhoneNumber: that.data.chi_phone
      }
      console.log(smsCode, data)
      Bmob.verifySmsCode(smsCode, data).then(function (response) {
        console.log(response);
        if (response.msg == 'ok') {
          //todo
          wx.showModal({
            title: '提示',
            content: '确认是家长身份后将不可更改',
            success: function (res) {
              if (res.confirm) {
                //获取当前登陆用户
                let current = Bmob.User.current();
                //修改当前用户的身份
                const querySetIdentity = Bmob.Query('_User');
                querySetIdentity.set('id', current.objectId) //需要修改的objectId
                querySetIdentity.set('identity', 'children');
                querySetIdentity.set('sex',sex);
                querySetIdentity.set('name', name);                
                querySetIdentity.set('grade', chi_grade);
                querySetIdentity.set('addr', chi_addr);
                querySetIdentity.set('phone', chi_phone);
                
                querySetIdentity.save().then(ress => {
                  console.log(ress);
                  wx.showToast({
                    title: '身份验证成功',
                    success:function(){
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }
                  });
                  
                }).catch(err => {
                  console.log(errr)
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          wx.showToast({
            title: '验证码不正确',
            icon: 'none'
          })
        }
      })
        .catch(function (error) {
          console.log(error);
          wx.showToast({
            title: '验证码失效请重新获取',
            icon:'none'
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