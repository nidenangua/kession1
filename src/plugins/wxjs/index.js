/**
 * 引入微信js sdk
 */
import wx from 'weixin-js-sdk'
import {getWechatConfig} from '@/api/store'

const wxShare = {
    install(Vue){
        /**
         * 配置微信分享
         */
        Vue.prototype.$wxShare = basicinfo=>{
            getWechatConfig({
                url:location.href.split('#')[0]
            }).then(res=>{
                if(!res){
                    return false
                }
                /**
                 * 配置微信基本信息
                 */
                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp:res.timestamp,
                    nonceStr:res.nonceStr,
                    signature:res.signature,
                    jsApiList: [
                        'onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ'
                    ]
                })
                wx.ready(()=>{
                    basicinfo.link = basicinfo.link || location.href
                    wx.onMenuShareAppMessage(basicinfo)
                    wx.onMenuShareTimeline(basicinfo)
                    wx.onMenuShareQQ(basicinfo)
                })
            })
        }
    }
}

export default {
    wx:wx,
    wxShare:wxShare
}

  