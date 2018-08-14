// pages/to_edit/to_edit.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diploma:'',//学历
    school:'',
    be_good_like:'',//擅长科目
    self_introduction:'',
    grades:'',
    can_teached:'',//可教课程
    unit_price:'',
    teach_addr:'',
    other:'',
    is211:'',
    is985:'',
    id:'',//看是否传入id，编辑还是添加
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    if (options.id) {
      that.setData({
        id: options.id
      });
      const queryFind = Bmob.Query('user_teacher');
      queryFind.get(options.id).then(res => {
        console.log(res)
        that.setData({
          diploma:res.diploma,
          school:res.school,
          self_introduction:res.other_info[0],
          grades: res.grades,
          unit_price: res.unit_price,
          teach_addr: res.teach_addr,
          other:res.other_info[1]
        })
      }).catch(err => {
        console.log(err)
      })
    }
    // //获取学校数据
    // const queryFindAll = Bmob.Query("school");
    // queryFindAll.find().then(res => {
    //   var schoolArr=[];
    //   res.forEach((value)=>{
    //     schoolArr.push(value.school);
    //   })
    //   that.setData({
    //     schools: schoolArr
    //   })
    // });
  },
  //输入框事件
  bind_diploma:(e)=>{
    that.setData({
      diploma: e.detail.value
    })
  },
  Trim:function (str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
  },

  bind_school: (e) => {
    let value = that.Trim(e.detail.value);
    const queryFindSchool = Bmob.Query('school');
    queryFindSchool.equalTo("school", "==", value);
    queryFindSchool.find().then(res => {
      if(res.length!=0){
        that.setData({
          is211: res[0].is211,
          is985: res[0].is985,
        })
      }
     
    });
    that.setData({
      school: e.detail.value
    })
  },
  bind_intrpduction: (e) => {
    that.setData({
      self_introduction: e.detail.value
    })
  },
  bind_grades: (e) => {
    that.setData({
      grades: e.detail.value
    })
  },
  bind_unit: (e) => {
    that.setData({
      unit_price: e.detail.value
    })
  },
  bind_addr: (e) => {
    that.setData({
      teach_addr: e.detail.value
    })
  },
  bind_other: (e) => {
    that.setData({
      other: e.detail.value
    })
  },
  //多选框德改变
  change_check:function(e){
      var arr_check=e.detail.value
      that.setData({
        be_good_like: arr_check
      })
  },
  change_check_can:function(e){
    var arr_check = e.detail.value
    that.setData({
      can_teached: arr_check
    })
  },
  //发布方法
  send:function(){
    if (this.data.diploma == '') {
      wx.showToast({
        title: '请输入学籍情况',
        icon: 'none',
        duration: 2000
      })
    } else
    if (this.data.school == '') {
      wx.showToast({
        title: '请输入就读学校',
        icon: 'none',
        duration: 2000
      })
    } else
    if (this.data.be_good_like == '') {
      wx.showToast({
        title: '请选择擅长科目',
        icon: 'none',
        duration: 2000
      })
    } else
      if (this.data.self_introduction == '') {
      wx.showToast({
        title: '请输入自我介绍',
        icon: 'none',
        duration: 2000
      })
    } else
    if (this.data.grades == '') {
      wx.showToast({
        title: '请输入可教年级',
        icon: 'none',
        duration: 2000
      })
    } else
      if (this.data.can_teached == '') {
        wx.showToast({
          title: '请选择可教课程',
          icon: 'none',
          duration: 2000
        })
      }else
    if (this.data.unit_price == '') {
      wx.showToast({
        title: '请输入课时费用',
        icon: 'none',
        duration: 2000
      })
    }else
    if (this.data.teach_addr == '') {
      wx.showToast({
        title: '请输入授课地点',
        icon: 'none',
        duration: 2000
      })
    }else{
      if(that.data.id!=''){
        const query = Bmob.Query('user_teacher');
        query.set('id', that.data.id) //需要修改的objectId
        query.set("diploma", that.data.diploma)
        query.set("school", that.data.school);
        query.set("can_teached", that.data.can_teached);
        query.set("be_good_like", that.data.be_good_like);
        query.set("other_info", [that.data.self_introduction, that.data.other]);
        query.set("grades", that.data.grades);
        query.set("unit_price", that.data.unit_price);
        query.set("teach_addr", that.data.teach_addr);
        query.save().then(res => {
          wx.navigateTo({
            url: '../my_publish/my_publish',
          })
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }else{
        const queryAdd = Bmob.Query('user_teacher');
        queryAdd.set("user_name", getApp().globalData.user.user_name)
        queryAdd.set("be_good_like", that.data.be_good_like);
        queryAdd.set("unit_price", that.data.unit_price);
        queryAdd.set("teach_addr", that.data.teach_addr);
        queryAdd.set("sex", getApp().globalData.user.sex);
        queryAdd.set("other_info", [that.data.self_introduction, that.data.other]);
        queryAdd.set("diploma", that.data.diploma)
        queryAdd.set("school", that.data.school);
        queryAdd.set("phone", getApp().globalData.user.phone);
        queryAdd.set("major", getApp().globalData.user.major);
        queryAdd.set("is_show", '0');
        queryAdd.set("is", [that.data.is211, that.data.is985, getApp().globalData.user.is_authen]);
        queryAdd.set("by_collect",0);
        queryAdd.set("grades", that.data.grades);
        queryAdd.set("can_teached", that.data.can_teached);
        queryAdd.set("grade", getApp().globalData.user.grade);
        queryAdd.set("experience", getApp().globalData.user.experience);
        queryAdd.set("user_id", getApp().globalData.user_id);
        queryAdd.set("img", getApp().globalData.user_img);       
        queryAdd.save().then(res => {
          console.log(res)
          wx.showToast({
            title: '发布成功',
            success() {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../my_publish/my_publish',
                })
              }, 1000)
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }
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