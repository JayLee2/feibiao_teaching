// pages/count_detail0/count_detail0.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      couse_data:[],
      showModal: false,  //控制弹出框-续费
      showReturn:false,   //控制弹出框退款
      unit: 100,     //课程单价
      hasCount: false, //是否显示课程数量
      price: 0,    //总价
      ret_price: 0,    //退款总价
      count: 0,    //课程总数
      ret_count:0,
      focus: false, //自动获取焦点
      ret_reason:'', //退款原因
      all_count:20,   //所有课程
  },
  //点击购买弹出框
  buy: function () {
    this.setData({
      showModal: true,
    })
  },


  
  //输入课程数量的方法
  changeCount: function (e) {
    let count = e.detail.value;
    this.setData({
      count: count * 2,
    })
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
  //点击退款弹出框
  ret: function () {
    this.setData({
      showReturn: true,
    })
  },
  /**
   * 退款对话框取消按钮点击事件
   */
  ret_onCancel: function () {
    this.ret_hideModal();
  },
  /**
   * 退款对话框确认按钮点击事件
   */
  ret_onConfirm: function () {
    this.ret_hideModal();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    let id = options.id;
    let seller = options.seller;
    let buyer=Bmob.User.current().objectId;
    console.log(options)
    const query = Bmob.Query('buy_record');
    query.include('seller')
    query.get(id).then(res => {
      that.setData({
        detail:res
      })
      console.log(res)
      
    }).catch(err => {
      console.log(err)
    })
    const record = Bmob.Query('record');
    record.equalTo('seller', '==', seller);
    record.equalTo('buyer', '==', buyer);
    record.equalTo('recordPoint', '==', id);
    record.equalTo('state', '==', '0');
    record.include('recordPoint')
    record.find().then(ress => {
      console.log(ress);
      that.setData({
        couse_data: ress,
      })
    })
  },
  finish(e){
    let that=this;
    let id=e.currentTarget.dataset.index;
  
    wx.showModal({
      title: '提示',
      content: '确认要完成该课程吗,',
      success(ed){
        if(ed.cancel){

        }else if(ed.confirm){
          const query = Bmob.Query('buy_record');
          query.set('id', id) //需要修改的objectId
          query.set('state', '1')
          query.save().then(res => {
            console.log(res);
            
          }).catch(err => {
            console.log(err)
          });

          const queryR = Bmob.Query('buy_record');
          queryR.include('seller')
          queryR.get(id).then(res => {

            let moneySet=res.seller.user_id.objectId;
            let money_can;
            let money_nocan;
            //获取售课者现在的余额
            const queryG = Bmob.Query('_User');
            queryG.get(moneySet).then(ress => {
              console.log(res)
              money_can = parseFloat(ress.money_can)
              money_nocan = parseFloat(ress.money_nocan);
              //获得信息后的操作
              const queryM = Bmob.Query('_User');
              console.log(money_can, res.num, res.seller.unit_price)
              queryM.set('id', moneySet) //需要修改的objectId
              queryM.set('money_can', parseFloat(money_can) + parseFloat(res.num) * parseFloat(res.seller.unit_price))
              queryM.set('money_nocan', parseFloat(money_nocan) - parseFloat(res.num) * parseFloat(res.seller.unit_price))
              queryM.save().then(res => {
                const queryF = Bmob.Query('buy_record');
                queryF.set('id', id) //需要修改的objectId
                queryF.set('state', '1')
                queryF.save().then(res => {


                  const queryA = Bmob.Query('record');
                  console.log(that.data.detail.objectId)
                  queryA.equalTo('recordPoint', '==', that.data.detail.objectId)
                  queryA.find().then(todos => {
                    todos.set('state', "1");
                    todos.saveAll().then(resd => {
                      // 成功批量修改
                      wx.navigateBack({
                        delta:1
                      })
                      console.log(resd, 'ok')
                    }).catch(err => {
                      console.log(err)
                    });
                  })


                  

                }).catch(err => {
                  console.log(err)
                });
                
              }).catch(err => {
                console.log(err)
              })
            }).catch(err => {
              console.log(err)
            })
            

          }).catch(err => {
            console.log(err)
          })
        }
        
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