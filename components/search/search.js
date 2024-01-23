// components/search/search.js
import {HTTP} from '../../utils/http.js'
import {KeywordModel} from 'keyword.js'
import {paginationBev} from '../behaviors/pagination.js'
let http =new HTTP()
let keyModel =new KeywordModel()
Component({

  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more:{
      type:String,
      observer:'_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys:[],
    hotKey:[],
    finished:false,
    q:'',
    loading:false,
    loadingCenter:false
  },
  attached:function(){
    this.setData({
      historyKeys:keyModel.getHistory()
    })
    keyModel.getHot((data)=>{
      this.setData({
        hotKey:data.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore:function(){
      if(!this.data.q){
        return
      }
      let hasMore =this.hasMore()
      if(!hasMore){
        return
      }
      this.setData({
        loading:true
      })
      http.request({
        url:'book/search?summary=1',
        data:{
          q:this.data.q,
          star:this.getCurrentStart()
        },
        success:(data)=>{
          this.setMoreData(data.books)
          this.setData({
            loading:false
          })
        }
      })
    },
    onCancel:function(event){
      this.triggerEvent('cancel',{},{})
    },
    onDelete:function(event){
      this.setData({
        finished:false,
        empty:false,
        q:''
      })
    },
    onConfirm:function(event){
      this.setData({
        finished:true,
        loadingCenter:true
      })
      this.initPagination()
      let q=event.detail.value || event.detail.text
      http.request({
        url:'book/search?summary=1',
        data:{
          q:q,
          start:this.getCurrentStart()
        },
        success:(data)=>{
          if(!(data.books==false)){
            keyModel.addToHistory(q)
          }
          this.setMoreData(data.books)
          this.setData({
            q:q,
            loadingCenter:false
          })
        }
      })
    }
  }
})