// pages/teacher_detail/teacher_detail.js
var Bmob = require('../../utils/Bmob-1.6.2.min.js');
Bmob.initialize("27efa756cd68586870a00ef9b32012b6", "c4584f427c73fe10d388444f435b6309", "c322eabc762d349d78a42705011af761");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_collect:'收藏',
    by_collect:0,    //用于显示收藏人数
    detail:{},
    packages:[
      {text:"新课试听： 一节课",count:2,isSelect:''},
      { text: "套餐一： 三节课", count: 6, isSelect: 'package_select' },
      { text: "套餐二： 六节课", count: 12, isSelect: '' },
      { text: "套餐三： 自定义", count: 0, isSelect: '' },
    ],
    showModal: false,  //控制弹出框
    unit:100,     //课程单价
    hasCount:false, //是否显示课程数量
    price:0,    //总价
    count:6,    //课程总数
    focus:false //自动获取焦点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    var id=options.id;
    const query = Bmob.Query('user_teacher');
    query.get(id).then(res => {
      that.setData({
        detail:res,
        by_collect: res.by_collect
      })
      that.compute_price();
      
    }).catch(err => {
      console.log(err)
    })
    //检查是否已经收藏
    let current = Bmob.User.current()
    const queryHas = Bmob.Query("collect");
    queryHas.equalTo("user_id", "==", current.objectId);
    queryHas.equalTo("couse_id", "==", id);    
    queryHas.find().then(res => {
      console.log()
      console.log(res)
      if(res.length>0){
        that.setData({
          is_collect:'已收藏',
        })
      }
    });
  },
  //点击收藏的方法
  collect:function(e){
    let couse_id= e.currentTarget.dataset.index;
    let current = Bmob.User.current();
    if(that.data.is_collect=='收藏'){
      const queryAdd = Bmob.Query('collect');
      queryAdd.save().then(res => {
        console.log(res)
        const pointer = Bmob.Pointer('users')
        const poiID = pointer.set(current.objectId)
        const pointer_couse = Bmob.Pointer('user_teacher')
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
      const teac_collectEdit = Bmob.Query('user_teacher');     
      teac_collectEdit.get(couse_id).then(ress=>{
         ress.set('by_collect', ress.by_collect+1);
        ress.save();    
        let countCollect = that.data.by_collect + 1;
        that.setData({
        by_collect: countCollect
        })          
      }).catch(err => {
        console.log(err)
      })
    }else{
      const queryDel = Bmob.Query("collect");
      queryDel.equalTo("user_id", "==", current.objectId);
      queryDel.equalTo("couse_id", "==", couse_id);
      queryDel.find().then(res => {
        queryDel.destroy(res[0].objectId).then(ress => {
          wx.showToast({
            title: '已取消',
          });
          that.setData({
            is_collect:'收藏'
          })
        }).catch(err => {

        })
      })
      const teac_collectEdit = Bmob.Query('user_teacher');
      teac_collectEdit.get(couse_id).then(ress => {
        ress.set('by_collect', ress.by_collect - 1);
        ress.save();
        let countCollect = that.data.by_collect - 1;
        that.setData({
          by_collect: countCollect
        })  
      }).catch(err => {
        console.log(err)
      })
    }
    
  },
  //点击购买弹出框
  buy:function(){
    let current=Bmob.User.current();
    if(current.identity=='teacher'){
      wx.showModal({
        title: '提示',
        content: '老师不可以购买课程',
      })
    }else if(current.identity=='children'){
      this.setData({
        showModal: true,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '身份认证后可购买此课程',
      })
    }
    
  },
  //课程选择方法
  couse_select:function(e){
    var that=this;
    let count=e.target.dataset.count;
    let index = e.target.dataset.id;
    let item = 'packages[' + index +'].isSelect';
    that.default_select() //先让所有选项初始默认颜色
    if(count==0){
      that.setData({
        hasCount:true,
        [item]:'package_select',
        price:0,
        focus:true,
      });
      
    }else{
      that.setData({
        hasCount: false,
        [item]: 'package_select',
        count:count,
      })
      that.compute_price();
    }
  },
  //计算价格的方法
  compute_price:function(){
    var that=this;
    this.setData({
      price: that.data.detail.unit_price * that.data.count
    })
    console.log(this.data.detail)
  },
  //遍历课程全部变成白色
  default_select:function(){
    var that=this;
    that.data.packages.forEach(function(value,index){
      let item='packages['+index+'].isSelect';
      that.setData({
        [item]:'',
      })
    })
  },
  //输入课程数量的方法
  changeCount:function(e){
    let count=e.detail.value;
    this.setData({
      count:count*2,
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
  
  },
  wxpay:function(e){
    let current = Bmob.User.current();//当前用户
    let publisher = e.currentTarget.dataset.index;//发布者
    let couse_id = e.currentTarget.dataset.id;//课程编号
    //判断是否实名认证
    if(current.identity){
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
        success: function () {
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

            //数据库中没存
            queryBuyRecord.set("buyer", poiID2)
            queryBuyRecord.set("seller", poiID1)
            queryBuyRecord.set("num", that.data.count)
            queryBuyRecord.set('state', '0')   //表示状态为进行中  


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
          }
        }
      })
    } else {
      //没有认证
      wx.showToast({
        title: '认证后再操作',
      })
    }
    
  }
})
