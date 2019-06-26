// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

/**
 * 安装组件
 */
import './ketangjie-ui/ketangjie-ui.css'
import KetangjieUi from './ketangjie-ui'
import StoreComponents from './store-compoents'


/**
 * 拖拽UI组件
 */
import DragComponents from './ketangjie-drag-ui'
/**
 * 阿里云上传（用于图片、音频上传）
 */
import AliOSS from './plugins/alioss'
/**
 * 微信js sdk （用于微信分享）
 */
import WeixinJsSDK from './plugins/wxjs'
const wx = WeixinJsSDK.wx
Vue.use(KetangjieUi)
Vue.use(DragComponents)
Vue.use(StoreComponents)
Vue.use(AliOSS)
Vue.use(WeixinJsSDK.wxShare)
Vue.config.productionTip = false


/**
 * 防复制
 */
function antiCopyFn(){
  return false
}

Vue.prototype.$antiCopy = function (flag){
  
  let antiCopyStyle = document.getElementById('antiCopyStyle');
  let body = document.body;
  if(flag && !antiCopyStyle){
    let style = document.createElement('style');
    style.id = "antiCopyStyle";
    let css = document.createTextNode('*{-webkit-touch-callout:none; -webkit-user-select:none;-khtml-user-select:none; -moz-user-select:none; -ms-user-select:none;   user-select:none;}input{ -webkit-user-select: auto;}img{  -webkit-user-select: none;-moz-user-select: none; -webkit-user-select:none; -o-user-select:none; user-select:none;}');
    style.appendChild(css);
    body.appendChild(style);
    body.addEventListener('contextmenu',antiCopyFn)
    body.addEventListener('dragstart',antiCopyFn)
    body.addEventListener('selectstart',antiCopyFn)
  }else if(!flag && antiCopyStyle){
    antiCopyStyle.remove()
    body.removeEventListener('contextmenu',antiCopyFn)
    body.removeEventListener('dragstart',antiCopyFn)
    body.removeEventListener('selectstart',antiCopyFn)
  }
}

/**
 * 设置图片放大
 */
Vue.prototype.$setPreview = function(el){
  let imgs = el.querySelectorAll('img')
  let imgArr = []
  for(var i=0;i<imgs.length;i++){
      let imgItem = imgs[i]
      imgArr.push({
          src:imgItem.src
      })
      imgItem.setAttribute('preview-index',i)
      imgItem.onclick = ()=>{
        this.$preview(imgArr,imgItem.getAttribute('preview-index'))
      }
  }
}


/**
 * 处理小程序链接跳转与路由跳转兼容
 */
Vue.prototype.$navigateTo = function(h5Path){
  // if(window.__wxjs_environment === 'miniprogram'){
  //     let fullPath = h5Path.split('?')
  //     let _path = fullPath[0]
  //     let _params = fullPath[1] || ''
  //     if(_params){
  //       _params = _params.replace(/\=/g,'-').replace(/&/g,',')
  //     }
  //     let _url = `/pages/web/webView?path=${_path}&params=${_params}`
  //     if(_path === '/'){
  //       wx.miniProgram.switchTab({
  //         url:'/pages/index/index'
  //       })
  //     }else if(_path === '/course'){
  //       wx.miniProgram.switchTab({
  //         url:'/pages/find/courseList/courseList'
  //       })
  //     }else if(_path === '/user/course'){
  //       wx.miniProgram.switchTab({
  //         url:'/pages/user/myPurchased/myPurchased'
  //       })
  //     }else if(_path === '/user'){
  //       wx.miniProgram.switchTab({
  //         url:'/pages/user/userIndex/userIndex'
  //       })
  //     }else{
  //       wx.miniProgram.navigateTo({
  //         url:_url
  //       })
  //     }
  // }else{
      
  // }
  this.$router.push(h5Path)
}

Vue.prototype.$navigateBack = function(){
  if(window.__wxjs_environment === 'miniprogram'){
    
    wx.miniProgram.navigateBack({
      delta: 1
    })
    
    let fullPath = this.$route.fullPath.split('?')
    let _path = fullPath[0]
    let _params = fullPath[1] || ''
    if(_params){
      _params = _params.replace(/\=/g,'-').replace(/&/g,',')
    }
    
    wx.miniProgram.postMessage({
      data:{
        path:_path,
        params:_params
      }
    })
  }else{
    history.back()
  }
}

/**
 * 导航首页
 */


router.beforeEach((to,from, next)=>{
  
  if(to.name === 'Index' || to.name === 'CourseList' || to.name === 'UserCourse' || to.name === 'UserIndex' || to.query.miniprogram == 1){
      next()
     
  }else{
      
      if(window.__wxjs_environment === 'miniprogram'){
        let fullPath = to.fullPath.split('?')
        let _path = fullPath[0]
        let _params = fullPath[1] || ''
        if(_params){
          _params = _params.replace(/\=/g,'-').replace(/&/g,',')
        }
        let _url = `/pages/web/webView?path=${_path}&params=${_params}`
        wx.miniProgram.navigateTo({
          url:_url
        })
      }else{
        next()
      }
      
  }
  
})

/**
 * 创建vue对象
 */
const main = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default main
