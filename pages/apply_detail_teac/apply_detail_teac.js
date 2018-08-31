// pages/apply_detail_teac/apply_detail_teac.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    objectId:'',
    packages: [
      { text: "新课试听： 一节课", count: 2, isSelect: '' },
      { text: "套餐一： 三节课", count: 6, isSelect: 'package_select' },
      { text: "套餐二： 六节课", count: 12, isSelect: '' },
      { text: "套餐三： 自定义", count: 0, isSelect: '' },
    ],
    showModal: false,  //控制弹出框
    unit: 100,     //课程单价
    hasCount: false, //是否显示课程数量
    price: 0,    //总价
    count: 6,    //课程总数
    focus: false //自动获取焦点
  },
  //点击购买弹出框
  buy: function () {
    this.setData({
      showModal: true,
    })
  },
  //课程选择方法
  couse_select: function (e) {
    var that = this;
    let count = e.target.dataset.count;
    let index = e.target.dataset.id;
    let item = 'packages[' + index + '].isSelect';
    that.default_select() //先让所有选项初始默认颜色
    if (count == 0) {
      that.setData({
        hasCount: true,
        [item]: 'package_select',
        price: 0,
        focus: true,
      });

    } else {
      that.setData({
        hasCount: false,
        [item]: 'package_select',
        count: count,
      })
      that.compute_price();
    }
  },
  //计算价格的方法
  compute_price: function () {
    this.setData({
      price: this.data.unit * this.data.count
    })
  },
  //遍历课程全部变成白色
  default_select: function () {
    var that = this;
    that.data.packages.forEach(function (value, index) {
      let item = 'packages[' + index + '].isSelect';
      that.setData({
        [item]: '',
      })
    })
  },
  //输入课程数量的方法
  changeCount: function (e) {
    let count = e.detail.value;
    this.setData({
      count: count * 2,
    })
    this.compute_price()
  },
  /**
       * 弹出框蒙层截断touchmove事件
       */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  //点击不合适的错做
  remove:()=>{
    wx.showModal({
      title: '提示',
      content: '确定将该老师加入不合适列表吗.更改后将无法继续申请',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('applys');
          query.set('id', that.data.objectId) //需要修改的objectId
          query.set('is_appr', false)
          query.save().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          console.log('用户点击确定');
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    that=this;
    // let id ='6453792a10';
    const query = Bmob.Query('user_teacher');
    query.equalTo("user_id","==",id);
    query.include('user_id')
    query.find().then(res => {
      console.log(res);
      if(res.length>0){
        that.setData({
          detail: res[0],
          objectId: options.objectId,
          unit: res[0].unit_price,
        });
        this.compute_price();
        
      }
      
    }).catch(err => {
      console.log(err)
    })
  },
  wxpay: function (e) {
    let current = Bmob.User.current();//当前用户
    let publisher = e.currentTarget.dataset.index;//发布者
    let couse_id = e.currentTarget.dataset.id;//课程编号
    //判断是否实名认证
    if (current.identity) {
      //让用户确认是否为误触


      let publisher_money;
      const query = Bmob.Query('_User');
      query.get(publisher).then(res => {
        console.log(res)
        publisher_money = res.money_nocan
      }).catch(err => {
        console.log(err)
      })
      wx.showModal({
        title: '提示',
        content: '你确定要购买此课程吗？',
        success: function (ed) {
          if (ed.confirm) {
            //检查是否有余额
            console.log(current.money_can, publisher_money)
            if (current.money_can < that.data.price) {
              wx.showToast({
                title: '余额不足',
                icon: 'none'
              })
            } else {
              //如果有余额
              console.log(parseInt(publisher_money) + parseInt(that.data.price))
              const queryCurrent = Bmob.Query('_User');
              queryCurrent.set('id', current.objectId) //需要修改的objectId
              queryCurrent.set('money_can', parseInt(current.money_can) - parseInt(that.data.price))

              const queryCurrent2 = Bmob.Query('_User');
              queryCurrent2.set('id', publisher) //需要修改的objectId
              queryCurrent2.set('money_nocan', parseInt(publisher_money) + parseInt(that.data.price))

              //添加一条购买记录
              const pointer1 = Bmob.Pointer('user_teacher')
              const poiID1 = pointer1.set(couse_id)
              const pointer2 = Bmob.Pointer('_User')
              const poiID2 = pointer2.set(current.objectId)
              const queryBuyRecord = Bmob.Query('buy_record');
              //如果表中有着一条记录累加
              const queryHas = Bmob.Query("buy_record");
              queryHas.equalTo("seller", "==", poiID1);
              queryHas.equalTo("buyer", "==", poiID2);
              queryHas.equalTo("state", "==", '0');

              queryHas.find().then(res => {
                console.log(res);
                if (res.length > 0) {
                  //说明数据库中有存，执行累加方法
                  queryBuyRecord.set('id', res[0].objectId) //需要修改的objectId
                  queryBuyRecord.set('num', res[0].num + that.data.count)
                  queryBuyRecord.set('state', '0')

                } else {
                  //数据库中没存
                  queryBuyRecord.set("buyer", poiID2)
                  queryBuyRecord.set("seller", poiID1)
                  queryBuyRecord.set("num", that.data.count)
                  queryBuyRecord.set('state', '0')   //表示状态为进行中          
                }
                //记录表里添加纪录
                const queryRecord = Bmob.Query('record');
                queryRecord.set("buyer", poiID2)
                queryRecord.set("seller", poiID1)
                queryRecord.set("num", that.data.count)
                queryRecord.set('state', '0') //表示状态为进行中 
                queryRecord.save().then()

                queryBuyRecord.save().then(res => {
                  console.log(res)
                  //添加记录后在改变金钱
                  queryCurrent.save().then(res => {
                    queryCurrent2.save().then(res => {
                      wx.showToast({
                        title: '购买成功',
                      });
                      that.setData({
                        showModal: false
                      })
                    }).catch(err => {
                      console.log(err)
                    })
                  }).catch(err => {
                    console.log(err)
                  })
                }).catch(err => {
                  console.log(err)
                })
              });
            }
          } else if (ed.cancel) {

          }
        }
      })
    } else {
      //没有认证
      wx.showToast({
        title: '认证后再操作',
      })
    }
  },

  call:function(e){
    let phone_num=e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone_num, 
      success:function(){

      }
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