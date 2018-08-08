//index.js
//获取应用实例

const app = getApp()
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({
  data: {
   address:'',
   user:'',
   user_img:'',
   authorize:true,//是否授权
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

    let current=Bmob.User.current();
    let auth ;
    if (current.identity){
      auth = current.identity;
    }else{
      auth=''
    }
    if(auth==''){
      wx.showToast({
        title: '您还没有进行认证，认证之后即可发布',
        icon:'none'
      })
    } else if (auth=='teacher'){
      wx.navigateTo({
         url: '../my_publish/my_publish',
      })
    }else if(auth=='children'){
      wx.navigateTo({
        url: '../my_publish_chi/my_publish_chi',
      })
    }
    
  },
  //授权方法
  userInfoHandler:function(e){
    var hasUserInfo=e.detail.userInfo
    if (!hasUserInfo){
      wx.showToast({
        title: '请授权登陆后使用',
      })
    }else{
      that.setData({
        user: hasUserInfo.nickName,
        user_img: hasUserInfo.avatarUrl,
        authorize:true,
      });
      getApp().globalData.user_img = hasUserInfo.avatarUrl
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
    let auth;
    let current = Bmob.User.current();
    console.log(current)
    if (current.identity){
      auth = getApp().globalData.User.identity;
    }else{
      auth='';
    }
    if (auth ==''){
      wx.navigateTo({
        url: '../my_authen/my_authen',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您已经进行过身份验证，不可以再次操作',
        showCancel: false,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  onLoad: function () {
    that=this;
    app.updata().then(function(data){
      console.log(data)
      that.setData({
        user:data.userInfo,
        address:data.province
      })
    });
    let current = Bmob.User.current();
    console.log(current)
    if (current.authorize == '' || current.authorize==false){
      that.setData({
        authorize:false,
      })
    }else{
      wx.getUserInfo({
        success(e){
          console.log(e)
          that.setData({
            user: e.userInfo.nickName,
            user_img: e.userInfo.avatarUrl,
            authorize: true,
          });
          getApp().globalData.user_img = e.userInfo.avatarUrl;
          console.log(getApp().globalData)
        }
      })
    }
  },
  
})
