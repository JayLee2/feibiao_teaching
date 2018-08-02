//index.js
//获取应用实例

const app = getApp()
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({
  data: {
   address:'',
   user:'',
   directory:[
     { path: '../../img/icon2-01.png',name:'我的收藏' ,taped:'to_collect'},
     { path: '../../img/icon2-02.png', name: '我的发布',taped:'to_publish' },
     { path: '../../img/icon2-03.png', name: '我的钱包',taped:'to_wallect'},
     { path: '../../img/icon2-05.png', name: '我的申请' ,taped:'to_apply'},
     { path: '../../img/icon2-06.png', name: '身份认证' ,taped:'to_authen'},
   ]
  },
  to_collect:function(){
    wx.navigateTo({
      url: '../my_collect/my_collect',
    })
  },
  to_publish: function () {
    var is_teacher=app.globalData.is_teacher;
    console.log(is_teacher)    
    if(is_teacher=='' || is_teacher==null || is_teacher== undefined){
      wx.showToast({
        title: '您还没有进行认证，认证之后即可发布',
        icon:'none'
      })
    }else if(is_teacher=='1'){
      wx.navigateTo({
         url: '../my_publish/my_publish',
      })
    }
    
  },
  to_wallect: function () {
    wx.navigateTo({
      url: '../my_wallect/my_wallect',
    })
  },
  to_apply: function () {
    wx.navigateTo({
      url: '../my_apply/my_apply',
    })
  },
  to_authen: function () {
    wx.navigateTo({
      url: '../my_authen/my_authen',
    })
  },
  onLoad: function () {
    var that=this;
    app.updata().then(function(data){
      console.log(data)
      that.setData({
        user:data.userInfo,
        address:data.province
      })
    });
    
  },
  
})
