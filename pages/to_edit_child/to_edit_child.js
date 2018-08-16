// pages/to_edit_child/to_edit_child.js
var that;
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade:'',
    weak:'',
    knowledge_degree:'一般',
    school:'',
    need:'',//课程需求
    class_plane:'',//课程安排
    sex:'',
    diploma_list:["专科","本科","硕士","博士"],
    addr:'',
    other:'',
    diploma:'',
    id:'',
    detail:{},
    addrs:''//但令存放地址
  },
  bind_grade:function(e){
    this.setData({
      grade: e.detail.value
    })
  },
  bind_knowledge_degree:function(e){
    console.log(e)
    this.setData({
      knowledge_degree: e.detail.value
    })
  },
  change_weak:function(e){
      console.log(e);
      this.setData({
        weak: e.detail.value.join(',')
      })
  },
  change_couse:function(e){
    this.setData({
      need: e.detail.value
    })
  },
  bind_school:function(e){
    this.setData({
      school: e.detail.value
    })
  },
  bind_class_plane:function(e){
    this.setData({
      class_plane : e.detail.value
    })
  },
  bind_sex:function(e){
    this.setData({
      sex: e.detail.value
    })
  },
  bind_diploma:function(e){
    let that=this;
    this.setData({
      diploma: that.data.diploma_list[e.detail.value]
    })
  },
  bind_addr:function(e){
    var that=this;
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          addrs: res.address,
        })
      },
    })
    
  },
  bind_other:function(e){
    this.setData({
      other: e.detail.value
    })
  },
  publish:function(){
    let current = Bmob.User.current();//当前用户
    let grade=this.data.grade;
    let knowledge_degree = this.data.knowledge_degree;
    let weak = this.data.weak;
    let school = this.data.school;
    let need = this.data.need;
    let class_plane = this.data.class_plane;
    let sex = this.data.sex;
    let diploma = this.data.diploma;
    let addr = this.data.addrs;
    let other = this.data.other;
    if(grade==''){
      wx.showToast({
        title: '请填写年纪情况',
        icon:'none',
      });
      return;
    } else if (weak == '') {
      wx.showToast({
        title: '请选择弱势学科',
        icon: 'none',
      });
      return;
    } else if (school == '') {
      wx.showToast({
        title: '请选择所在学校',
        icon: 'none',
      });
      return;
    } else if (need == '') {
      wx.showToast({
        title: '请选择课程需求',
        icon: 'none',
      });
      return;
    } else if (class_plane == '') {
      wx.showToast({
        title: '请填写课程安排',
        icon: 'none',
      });
      return;
    } else if (diploma == '') {
      wx.showToast({
        title: '请选择学历要求',
        icon: 'none',
      });
      return;
    } else if (addr == '') {
      wx.showToast({
        title: '请填写授课地点',
        icon: 'none',
      });
      return;
    } else if (other == '') {
      wx.showToast({
        title: '请填写其他信息',
        icon: 'none',
      });
      return;
    }else{
      if(that.data.id==''){
        //增加方法
        console.log('添加')        
        let pointer = Bmob.Pointer('_User')
        let poiID = pointer.set(current.objectId)

        const queryAdd = Bmob.Query('user_student');
        queryAdd.set("grade", grade)
        queryAdd.set("knowledge_degree", knowledge_degree);
        queryAdd.set("bad_thing", weak);
        queryAdd.set("school", school);
        queryAdd.set("need", need);
        queryAdd.set("class_plane", class_plane);
        queryAdd.set("sex", sex);
        queryAdd.set("low_education", diploma);
        queryAdd.set("addr", addr);
        queryAdd.set("others", other);
        queryAdd.set("user_id", poiID);
        queryAdd.set("by_collect", 0);
        queryAdd.set("img", getApp().globalData.user_img);
        queryAdd.set("user_name", getApp().globalData.userInfo); 
        queryAdd.save().then(res => {
          console.log(res);
          wx.showToast({
            title: '发布成功',
            success:function(){
              wx.navigateTo({
                url: '../my_publish_chi/my_publish_chi',
              })
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }else{
        //编辑方法
        console.log('编辑')
        const querySet = Bmob.Query('user_student');
        querySet.set('id', that.data.id) //需要修改的objectId
        querySet.set("grade", grade)
        querySet.set("knowledge_degree", knowledge_degree);
        querySet.set("bad_thing", weak);
        querySet.set("school", school);
        querySet.set("need", need);
        querySet.set("class_plane", class_plane);
        querySet.set("sex", sex);
        querySet.set("low_education", diploma);
        querySet.set("addr", addr);
        querySet.set("others", other);
        querySet.set("img", getApp().globalData.user_img);
        querySet.set("user_name", getApp().globalData.userInfo);        
        querySet.save().then(res => {
          console.log(res);
          wx.showToast({
            title: '修改成功',
            success:function(){
              wx.navigateTo({
                url: '../my_publish_chi/my_publish_chi',
              })
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    that=this;
    if (options.id){
      let id = options.id;
      that.setData({
        id: id
      });
      const queryFinde = Bmob.Query('user_student');
      queryFinde.get(id).then(res => {
        that.setData({
          detail: res,
          grade: res.grade,
          schoole: res.school,
          class_plane: res.class_plane,
          diploma: res.low_education,
          addr: res.addr,
          other: res.others,
          addrs:res.addr
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
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