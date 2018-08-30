// pages/student_detail/student_detail.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_collect: '收藏',
    by_collect: 0,   //用于显示收藏人数
    has_apply: '发起申请',
    detail: {},
    origin:'',
    packages: [
      { text: "新课试听： 一节课", count: 2, isSelect: '' },
      { text: "套餐一： 三节课", count: 6, isSelect: 'package_select' },
      { text: "套餐二： 六节课", count: 12, isSelect: '' },
      { text: "套餐三： 自定义", count: 0, isSelect: '' },
    ]
  },
  onShareAppMessage: function () {
    return {

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    let id = options.id;
    let origin;
    if(options.origin){
      origin=options.origin;
      that.setData({
        origin:'apply'
      })
    }
    const query = Bmob.Query('user_student');
    query.include('user_id')
    query.get(id).then(res => {
      console.log(res)
      that.setData({
        detail: res,
        by_collect: res.by_collect
      })
    }).catch(err => {
      console.log(err)
    })
    //检查是否已经收藏
    let current = Bmob.User.current()
    const queryHas = Bmob.Query("s_collect");
    queryHas.equalTo("user_id", "==", current.objectId);
    queryHas.equalTo("couse_id", "==", id);
    queryHas.find().then(res => {
      console.log()
      console.log(res)
      if (res.length > 0) {
        that.setData({
          is_collect: '已收藏',
        })
      }
    });
    //检查是否已经申请
    const queryHasApply = Bmob.Query("applys");
    console.log(current.objectId, id)
    queryHasApply.equalTo("user_id", "==", current.objectId);
    queryHasApply.equalTo("couse_id", "==", id);
    queryHasApply.find().then(res => {
      console.log(res)
      if (res.length > 0) {
        that.setData({
          has_apply: '已申请',
        })
      }
    });
  },
  call: function (e) {
    let phone_num = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone_num, //仅为示例，并非真实的电话号码
      success: function () {

      }
    })
  },
  //点击收藏的方法
  collect: function (e) {
    let couse_id = e.currentTarget.dataset.index;
    let current = Bmob.User.current();
    if (that.data.is_collect == '收藏') {
      const queryAdd = Bmob.Query('s_collect');
      queryAdd.save().then(res => {
        console.log(res)
        const pointer = Bmob.Pointer('users')
        const poiID = pointer.set(current.objectId)
        const pointer_couse = Bmob.Pointer('user_student')
        const poiID_couse = pointer_couse.set(couse_id)
        queryAdd.get(res.objectId).then(ress => {
          ress.set('user_id', poiID)
          ress.set('couse_id', poiID_couse)
          ress.save().then(() => {
            wx.showToast({
              title: '收藏成功',
            });

            that.setData({
              is_collect: '已收藏',

            })
          })
        })
      }).catch(err => {
        console.log(err)
      })
      const stud_collectEdit = Bmob.Query('user_student');
      stud_collectEdit.get(couse_id).then(ress => {
        ress.set('by_collect', ress.by_collect + 1);
        ress.save();
        let countCollect = that.data.by_collect + 1;
        that.setData({
          by_collect: countCollect
        })
      }).catch(err => {
        console.log(err)
      })

    } else {
      const queryDel = Bmob.Query("s_collect");
      queryDel.equalTo("user_id", "==", current.objectId);
      queryDel.equalTo("couse_id", "==", couse_id);
      queryDel.find().then(res => {
        queryDel.destroy(res[0].objectId).then(ress => {
          wx.showToast({
            title: '已取消',
          });
          that.setData({
            is_collect: '收藏'
          })
        }).catch(err => {
        })
      })
      const stud_collectEdit = Bmob.Query('user_student');
      stud_collectEdit.get(couse_id).then(ress => {
        ress.set('by_collect', ress.by_collect - 1);
        ress.save();
        let countCollect = that.data.by_collect - 1;
        that.setData({
          by_collect: countCollect
        })
      }).catch(err => {
        console.log(err)
      })
      3421
    }

  },
  //发起申请
  apply: function (e) {
    if (getApp().globalData.User.identity == 'children') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '申请失败，只有老师身份才可以向家长发起申请',
      })
      return;
    } 
    let current = Bmob.User.current().objectId;
    let result;
    const queryApply = Bmob.Query("user_teacher");
    queryApply.equalTo("user_id", "==", current);
    queryApply.find().then(res => {
      console.log(res)
      result = res.length;
      console.log(getApp().globalData.User.identity)
     if (result == 0) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '你还没有发布您的职位，请在首页中发布职位后再来申请',
        });
        return;
      } else {
        let id = e.currentTarget.dataset.index;
        let current = Bmob.User.current();
        const pointer = Bmob.Pointer('applys')
        const poiId = pointer.set(id)
        const poiCurrent = pointer.set(current.objectId)
        if (that.data.has_apply == '发起申请') {
          const queryP = Bmob.Query('applys')
          queryP.set('user_id', poiCurrent)
          queryP.set('couse_id', poiId);
          queryP.set('is_appr', true);
          queryP.set('is_read', false);
          queryP.save().then(resd => {
            console.log(resd);
            wx.showToast({
              title: '申请成功',
            });
            that.setData({
              has_apply: '已申请'
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          const queryDelApply = Bmob.Query('applys');
          queryDelApply.equalTo("user_id", "==", current.objectId);
          queryDelApply.equalTo("couse_id", "==", id);
          queryDelApply.find().then(res => {
            queryDelApply.destroy(res[0].objectId).then(ress => {
              wx.showToast({
                title: '已取消',
              });
              that.setData({
                has_apply: '发起申请'
              })
            }).catch(err => {
            })
          })
        }
      }
    });

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