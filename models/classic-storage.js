class ClassicStorage{
  static prefix ='classic'
  constructor(eposide){
    this.key = ClassicStorage.prefix + '-' +eposide
  }
  get(eposide){
    return wx.getStorageSync(this.key)
  }
  set(eposide,classic){
    wx.setStorageSync(this.key, classic)
  }
}