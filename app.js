//app.js
var map = require('./utils/amap-wx.js');
var Bmob = require('utils/Bmob-1.6.2.min.js');
Bmob.initialize("27efa756cd68586870a00ef9b32012b6", "c4584f427c73fe10d388444f435b6309");
App({
  onLaunch: function () {
    var that=this;
    Bmob.User.auth().then(res => {
      console.log(res)
      that.globalData.user_id = res.objectId;
      var user_id = that.globalData.user_id;

      const queryFind = Bmob.Query('users');
      //下面参数为Pointer字段名称， 可以一次查询多个表
      queryFind.include('is_teacher')
      queryFind.find().then(res => {
        console.log(res)
        if (res[0].is_teacher.objectId != '') {
          that.globalData.is_teacher = '1'
        } else if (res[0].is_student.objectId != '') {
          that.globalData.is_teacher = '0'
        } else {
          that.globalData.is_teacher = ''
        }
      }).catch(err => {
        console.log(err)
      })


    }).catch(err => {
      console.log(err)
    });
    

  },
  getLogin:function(){
    var that=this;
    return new Promise(function(resove,rej){
      // 登录
      wx.login({
        success: res => {
          resove();
        }
      })
    })
  },
  getAddress:function(){
    var that=this;
    return new Promise(function(ress,rej){
      wx.getLocation({
        success: function(res) {
          var mapObj = new map.AMapWX({ key: '044aa4f78c98d8450a1711b4932bf857' });
          mapObj.getRegeo({
            success(data) {
              console.log(111)
              that.globalData.province = data[0].regeocodeData.addressComponent.province;
              ress(that.globalData)
            },
            fail(info) {
              console.log(info)
            }
          })
        },
        fail(info){
          console.log(info)
        }
      })
    })
  },
  getUser:function(){
    var that=this;
    return new Promise(function(res,req){
      wx.getUserInfo({
        success(data){
          console.log(data)
          that.globalData.userInfo = data.userInfo.nickName
        }
      })
    })
  },
  updata:function(){
    var that=this;
    return new Promise(function(res,req){
      that.getLogin().then(that.getUser().then(that.getAddress().then(function(){
        res(that.globalData)
      })))
    })
  },
  globalData: {
    user_id:'',
    user:{
        user_name:'李文杰',
        sex:'1',
        phone:110,
        native_place:'山西晋中',
        major:'英语',
        is_authen:1,
        grade:'25',
        experience:'充足'
    },
    userInfo: '',
    province:'',
    is_teacher:''
  }
})