// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/utils.js'
let bookModel =new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel:false,
    books:Object,
    more:false
  },
  onReachBottom:function(event){
    this.setData({
      more:random(16)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    bookModel.getHotList((data)=>{
      this.setData({
        books:data
      })
    })
  },
  onActivateSearch:function(event){
    this.setData({
      searchPanel:true
    })
  },
  onCancel:function(event){
    this.setData({
      searchPanel:false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})