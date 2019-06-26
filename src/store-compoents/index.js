
import StoreFooter from './StoreFooter'
import StoreInfo from './StoreInfo'
import OrderPay from './OrderPay'
import FooterBar from './FooterBar'
import ShareBg from './ShareBg'
const components = {
    install(Vue){
        
        Vue.component('StoreFooter',StoreFooter)
        Vue.component('StoreInfo',StoreInfo)
        Vue.component('FooterBar',FooterBar)
        
        /**
         * 分享提示组件
         */
        const ShareBgConstructor = Vue.extend(ShareBg)
        const ShareBgInstance = new ShareBgConstructor()
        ShareBgInstance.$mount(document.createElement('div'))
        document.body.appendChild(ShareBgInstance.$el)
        
        Vue.prototype.$showShareBg = function(type){
            ShareBgInstance.type =  type || ''
            ShareBgInstance.shareFlag = true
        }
        Vue.prototype.$hideShareBg = function(){
            ShareBgInstance.shareFlag = false
        }

        /**
         * 支付组件
         */
        const OrderPayConstructor = Vue.extend(OrderPay)
        const OrderPayInstance = new OrderPayConstructor()
        OrderPayInstance.$mount(document.createElement('div'))
        document.body.appendChild(OrderPayInstance.$el)

        /**
         * 拼团支付
         */
        Vue.prototype.$fightGroupPay = (payInfo)=>{
            OrderPayInstance.fightGroupPay(payInfo)
        }
        /**
         * 打开支付窗口
         * @param {Object} payInfo 
         * type  支付类型   0是课程（图文 点播 语音 音频） 1是直播（班级） 2充值 3试卷打赏 4 课程打赏 6是直播收益  5购买试卷 7专栏购买 8 专栏打赏 9用户会员购买 10 社群
         */
        Vue.prototype.$showPay = (payInfo = {})=>{

            let type = null;
            switch(payInfo.type){
                case 'course':
                    type = 0
                    break
                case 'class':
                    type = 1
                    break
                case 'recharge':
                    type = 2
                    break
                case 'examReward':
                    type = 3
                    break
                case 'courseReward':
                    type = 4
                    break
                case 'exam':
                    type = 5
                    break
                case 'classReward':
                    type = 6
                    break
                case 'column':
                    type = 7
                    break
                case 'columnReward':
                    type = 8
                    break
                case 'vipCard':
                    type = 9
                    break
                case 'group':
                    type = 10
                    break
            }
            
            if(type === null){
                alert('当前内容不在可支付的范围内！')
                return false
            }
            
            payInfo.type = type

            
            if(type === 3 || type === 4 || type === 6 || type === 8){
                /**
                 * 打赏
                 */
                OrderPayInstance.reward(payInfo)
            }else {
                
                /**
                 * 其他支付（课程、班级、专栏等）
                 */
                OrderPayInstance.updateData(payInfo).then(()=>{
                    OrderPayInstance.show = true
                })
                

         
            }
            
        }
        
        /**
         * 关闭支付窗口
         */
        Vue.prototype.$hidePay = ()=>{
            OrderPayInstance.show = false
            OrderPayInstance.resetData()
        }
    }
}
export default components