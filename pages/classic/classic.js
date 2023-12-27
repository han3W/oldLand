// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import { LikeModel} from '../../models/like.js'
let  classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    like:false,
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    classicModel.getLatest((data)=>{
      this._getLikeStatus(data.id,data.type)
      this.setData({
        classic:data
      })
    })
  },
  onPrevious:function(event){
    let index= this.data.classic.index
    classicModel.getPrevious(index,(data)=>{
      if(data){
        this._getLikeStatus(data.id.data.type)
        this.setData({
          classic:data,
          latest:classicModel.isLatest(data.index),
          first:classicModel.isFirst(data.index)
        })
      }
      else{
        console.log('not more classic')
      }
    })
  },
  onNext:function(event){
    let index =this.data.classic.index
    classicModel.getNext(index,(data=>{
      if(data){
        this._getLikeStatus(data.id,data.type)
        this.setData({
          classic:data,
          latest:classicModel.isLatest(data.index),
          first:classicModel.isFirst(data.index)
        })
      }
      else{
        console.log('not more classic')
      }
    }))
  },
  onLike:function(event){
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel,this.data.classic.id,this.data.classic.type)
  },
  _getLikeStatus:function(cid,type){
    likeModel.getClassicLikeStatus(cid,type,(data)=>{
      this.setData({
        like:data.like_status,
        count:data.fav_nums
      })
    })
  },
  inShareAppMesage(){
    
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})