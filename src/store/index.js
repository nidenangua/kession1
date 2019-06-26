import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {getStoreInfo} from '@/api/store'
import {getUserInfo} from '@/api/user'
import {getParams} from '@/utils'
const store = new Vuex.Store({
    state:{
        /**
         * 店铺状态
         */
        storeInfoReady:false,
        module:[],
        moduleSwitch:[],
        info:{},
        footjson:{},
        configjson:[],
        stylecolor:null,
        /**
         * 会员状态
         */
        userReady:false,
        isLogin:-1, // 0未登录 1已登录
        userInfo:{}
    },
    mutations:{
        /**
         * 设置店铺基本信息
         */
        setStoreInfo(state,data){
            let arr = new Array();
            data.moduleSwitch.map(item=>{
                if(item.isopen && item.type != 3 && item.type != 4 && item.type != 5){
                    arr.push(item)
                }
            });
            /**
             * 设置配置config
             */
            state.configjson = JSON.parse(data.storeConfig.configjson);
            state.footjson = JSON.parse(data.storeConfig.footjson);
            state.stylecolor = data.storeConfig.stylecolor;
            state.module = arr;
            state.moduleSwitch = data.moduleSwitch;
            state.info = data.websiteInfo;
            state.storeInfoReady = true
        },

        /**
         * 设置单个状态
         */
        setState(state,data){
            state[data.key] = data.value
        }
    },
    actions:{
        /**
         * 更新店铺信息
         */
        updateStoreInfo(store){
            return new Promise(resolve=>{
                store.commit('setState',{
                    key:'storeInfoReady',
                    value:false
                })

                let params = {}
                if(getParams().drag === 'on'){
                    params.drag = 'on'
                }
                getStoreInfo(params).then(res=>{
                    store.commit('setStoreInfo',res)
                    resolve(store.state)
                })
            })
        },
        /**
         * 更新会员信息
         */
        updateUserInfo(store){
            return new Promise(resolve=>{
                store.commit('setState',{
                    key:'userReady',
                    value:false
                })
                getUserInfo().then(res=>{
                    console.log('1')
                    if(res.result === 'success'){
                        let rand = Math.ceil(Math.random() * 10000000000);
                        res.memberinfo.headimg = `${res.memberinfo.headimg}?${rand}`;
                 
                        store.commit('setState',{
                            key:'userInfo',
                            value:res.memberinfo
                        })
                        store.commit('setState',{
                            key:'isLogin',
                            value:1
                        })
                        
                    }else{
                        /**
                         * 未登录
                         */
                        store.commit('setState',{
                            key:'isLogin',
                            value:0
                        })
                    }
                    store.commit('setState',{
                        key:'userReady',
                        value:true
                    })
                    resolve(res)
                })
            })
        }
        

    }
})
/**
 * 添加ready事件
 */
store.ready = function(callback){
    if(this.state.storeInfoReady && this.state.userReady){
        callback(this.state)
    }else{
        setTimeout(()=>{
            this.ready(callback)
        },100)
    }
}
store.dispatch('updateStoreInfo')
store.dispatch('updateUserInfo')
export default store