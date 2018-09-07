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
   mask:'none',
   directory:[
     { path: '../../img/icon2-01.png',name:'我的收藏' ,taped:'to_collect'},
     { path: '../../img/icon2-02.png', name: '我的发布',taped:'to_publish' },
     { path: '../../img/icon2-03.png', name: '我的钱包',taped:'to_wallect'},
     { path: '../../img/icon2-05.png', name: '申请列表' ,taped:'to_apply'},
     { path: '../../img/icon2-06.png', name: '身份认证' ,taped:'to_authen'},
     { path: '../../img/contact_us.png', name: '意见反馈', taped: 'contact_us' },
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
      let current = Bmob.User.current();
      const query = Bmob.Query('_User');
      query.set('id', current.objectId) //需要修改的objectId
      query.set('img', hasUserInfo.avatarUrl )
      query.save().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      getApp().globalData.user_img = hasUserInfo.avatarUrl
    }

  },
  to_wallect: function () {
    wx.navigateTo({
      url: '../my_wallect/my_wallect',
    })
  },
  to_apply: function () {
    let url;
    if (getApp().globalData.User.identity=='children'){
      url='../apply_list/apply_list'
    }else{
      url = '../my_apply/my_apply';      
    }
    wx.navigateTo({
      url: url,
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
      that.setData({
        user:data.userInfo,
        address:data.province
      })
    });
    let current = Bmob.User.current();
    console.log(current)
    if (current==null){
      that.setData({
        authorize:false,
      })
    }else{
      wx.getUserInfo({
        success(e){
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

  formSubmit:function(e)
  {
    var value = e.detail.value.input;
    var that = this;
    if(value.length == 0 ||value.length <10)
    {
      wx.showToast({
        title: '不能少于10个字',
        icon:'none',
      })
    }else{
      let current = Bmob.User.current();
      var userid = current.objectId;
      const pointer = Bmob.Pointer('_User');
      const poiID = pointer.set(userid);

      const query = Bmob.Query('suggestions');
      query.set("content", value);
      query.set("parent", poiID);
      query.save().then(res => {
        that.hidden();
        wx.showToast({
          title: '提交成功',
          icon:"none"
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  hidden:function(){
    var that = this;
    that.setData({
      mask:"none"
    })
  },

  contact_us:function(){
    var that = this;
    that.setData({
      mask: "block"
    })
  },
  
})
