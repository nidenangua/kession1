import Toast from './toast'
import Empty from './empty'
import Tab from './Tab'
import CreateBg from './create-bg'
import Button from './Button'
import Dialog from './Dialog'
import ActionSheet from './ActionSheet'
import Masked from './Masked'
import Checkbox from './Checkbox'
import pageScrollContainer from './pageScrollContainer'
import Confirm from '@/ketangjie-ui/Confirm'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Preview from './Preview'
import list from './list'
import form from './form'
import tabs from './tabs'
import radio from './radio'

const components = {
    install(Vue){
        Vue.component('KtjEmpty',Empty)
        Vue.component('KtjButton',Button)
        Vue.component('KtjTab',Tab)
        Vue.component('KtjCreateBg',CreateBg)
        Vue.component('KtjDialog',Dialog)
        Vue.component('KtjCheckbox',Checkbox)
        Vue.component('KtjPageScrollContainer',pageScrollContainer)
        Vue.component('KtjSwiper',swiper)
        Vue.component('KtjSwiperSlide',swiperSlide)
        Vue.component('KtjPreview',Preview)
        Vue.use(list)
        Vue.use(form)
        Vue.use(radio)
        Vue.use(tabs)
        /**
         * 遮罩层
         */
        const maskedConstructor = Vue.extend(Masked)
        const maskedInstance = new maskedConstructor()
        maskedInstance.$mount(document.createElement('div'))
        
        document.body.appendChild(maskedInstance.$el)
        Vue.prototype.$showMask = (params = {})=>{
            maskedInstance.visible = true
            maskedInstance.params = params
        }
        Vue.prototype.$hideMask = ()=>{
            maskedInstance.visible = false
        }
        
        /**
         * 提示框组件
         */
        const confirmConstructor = Vue.extend(Confirm)
        const confirmInstance = new confirmConstructor()
        confirmInstance.$mount(document.createElement('div'))
        document.body.appendChild(confirmInstance.$el)

        /**
         * confirm组件
         */
        Vue.prototype.$confirm = function(msg){
            this.$showMask({
                click:()=>{
                    confirmInstance.visible = false
                    this.$hideMask()
                }
            })
            return new Promise(resolve=>{
                
                confirmInstance.visible = true
                confirmInstance.msg = msg
                confirmInstance.sure = (()=>{
                    confirmInstance.visible = false
                    this.$hideMask()
                    resolve()
                })
                confirmInstance.cancel = (()=>{
                    confirmInstance.visible = false
                    this.$hideMask()
                })
                
            })
            
        }

        /**
         * 提示框组件
         */
        const toastConstructor = Vue.extend(Toast)
        const toastInstance = new toastConstructor()
        toastInstance.$mount(document.createElement('div'))
        document.body.appendChild(toastInstance.$el)
        
        /**
         * 显示信息提示框
         * @param {String} msg 
         * @param {String} type 
         * @param {Number} duration 
         */

        Vue.prototype.$toast = function(msg, type = 'tips', duration = 1500){
            return new Promise(resolve=>{
                toastInstance.duration = duration
                toastInstance.msg = msg
                toastInstance.show = true
                toastInstance.type = type
                setTimeout(() => {
                    toastInstance.duration = 0
                    toastInstance.show = false
                    resolve()
                }, duration)
            })
        }

        /**
         * 打开加载状态
         * @param {String} msg 
         */
        Vue.prototype.$showLoading = function(msg = '加载中'){
            toastInstance.duration = 0
            toastInstance.msg = msg
            toastInstance.show = true
            toastInstance.type = 'loading'
        }
        /**
         * 关闭加载状态
         */
        Vue.prototype.$hideLoading = function(){
            if(toastInstance.duration === 0){
                toastInstance.show = false
            }
        }
        /**
         * 弹出菜单组件
         */
        const actionSheetConstructor = Vue.extend(ActionSheet)
        const actionSheetInstance = new actionSheetConstructor()
        actionSheetInstance.$mount(document.createElement('div'))
        document.body.appendChild(actionSheetInstance.$el)
        
        Vue.prototype.$actionSheet = function(params = {}){
            this.$showMask({
                click:()=>{
                    actionSheetInstance.visible = false
                }
            })
            return new Promise(resolve=>{
                actionSheetInstance.visible = true
                actionSheetInstance.list = params.list || []
                actionSheetInstance.change = (info)=>{
                    actionSheetInstance.visible = false
                    this.$hideMask()
                    resolve(info)
                    
                }
                actionSheetInstance.cancel = ()=>{
                    actionSheetInstance.visible = false
                    this.$hideMask()
                }  
            })
        }
        
        /**
         * photoswipe组件
         */
        const PreviewConstructor = Vue.extend(Preview)
        const PreviewInstance = new PreviewConstructor()
        PreviewInstance.$mount(document.createElement('div'))
        document.body.appendChild(PreviewInstance.$el)

        Vue.prototype.$preview = (imgList = [],index = 0)=>{
            PreviewInstance.dataList = imgList
            PreviewInstance.current = parseInt(index) + 1
            PreviewInstance.swiperOption.initialSlide = index
            PreviewInstance.visible = true
            
          
        }
        
    }
}
export default components
