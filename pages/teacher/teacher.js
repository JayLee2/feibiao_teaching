// pages/teacher/teacher.js
var Bmob=require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:[
      '天津'
    ],
    couse:[
      '全部课程','语文','数学','物理','化学'
    ],
    school:[
      // '全部学校','天津第三中学','实验小学','天津大学'
    ],
    teacher_list:[],
    defalt_city:'天津',
    defalt_couse:'全部课程',
    defalt_school:'全部学校',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    var user_id=getApp().globalData.user_id;

    const queryFind = Bmob.Query("user_teacher");
    queryFind.equalTo("is_show", "==", '1');
    queryFind.find().then(res => {
      that.setData({
        teacher_list:res,
        use_list:res,
      })
    });
    //初始化学校
    const querySchool = Bmob.Query("school");
    querySchool.find().then(res => {
      console.log(res)
      let schoolArr=['全部学校'];
      new Set(res).forEach((value)=>{
        schoolArr.push(value.school);
      })
      that.setData({
        school:schoolArr
      })
      
    });
    
  },

  //自定义函数
  //城市选择改变后的操作
  bindPickerChangeCity(e){
    // console.log(this.data)
    // var that=this;
    // let new_list=that.data.teacher_list.filter((value)=>{
    //   return value.native_place == that.data.city[e.detail.value] && value.can_teached.indexOf(that.data.defalt_couse) != -1 && value.school == that.data.defalt_school
    // })
    // that.setData({
    //   defalt_city:that.data.city[e.detail.value],
    //   use_list:new_list
    // })
  },
  //课程改编后的操作
  bindPickerChangeCouse(e) {
    console.log(this.data)
    
    console.log(e)
    var that = this;
    if(e.detail.value!=0){
      let new_list = that.data.teacher_list.filter((value) => {
        console.log(value)
        if(that.data.defalt_school!='全部学校'){
          return value.can_teached.indexOf(that.data.couse[e.detail.value]) != -1  && value.school == that.data.defalt_school
        }else{   
          console.log('sssssssss')      
          return value.can_teached.indexOf(that.data.couse[e.detail.value]) != -1
        }
        
      })
      console.log(new_list)
      that.setData({
        defalt_couse: that.data.couse[e.detail.value],
        use_list: new_list
      })
    }else{
      let all_list ;
      if(that.data.defalt_school=='全部学校'){
        console.log('全部学校')
        all_list=that.data.teacher_list
      }else{
        console.log('不是学校')        
        all_list = that.data.teacher_list.filter((value) => {
          console.log(value)
          return  value.school == that.data.defalt_school
        })
      }
     
      that.setData({
        use_list:all_list,
        defalt_couse: that.data.couse[e.detail.value],
      })
    }
  },
  //学校改变后的操作
  bindPickerChangeSchool(e) {
    console.log(this.data)
    
    var that = this;
    if (e.detail.value != 0) {
      let new_list = that.data.teacher_list.filter((value) => {
        if (that.data.defalt_couse!='全部课程'){
          return value.school == that.data.school[e.detail.value]  && value.can_teached.indexOf(that.data.defalt_couse) != -1
        }else{
          return value.school == that.data.school[e.detail.value] 
        }
      })
      that.setData({
        defalt_school: that.data.school[e.detail.value],
        use_list: new_list
      })
    } else {
      let all_list;
      if(that.data.defalt_couse=='全部课程'){
        all_list=that.data.teacher_list
      }else{
        all_list = that.data.teacher_list.filter((value) => {
          return  value.can_teached.indexOf(that.data.defalt_couse) != -1
        }); 
      }
      that.setData({
        use_list: all_list,
        defalt_school: that.data.school[e.detail.value],
      })
    }
  },
  toNext(e){
    var index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../teacher_detail/teacher_detail?id='+index,
    })
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
    var user_id = getApp().globalData.user_id;

    const queryFind = Bmob.Query("user_teacher");
    queryFind.equalTo("is_show", "==", '1');
    queryFind.find().then(res => {
      that.setData({
        teacher_list: res,
        use_list: res,
      })
    });
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