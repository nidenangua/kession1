import axios from 'axios'
import main from '@/main'
import {getParams} from '@/utils'

/**
 * 错误处理
 */
function dealError(res,key){
    
    if(key === 'getUserInfo' || key === 'getMyPurchase'){
        return true
    }
    switch(res.code){
        case 'nologin':
            main.$toast('请先登录').then(()=>{
                main.$router.push({
                    name:'UserLogin'
                })
            })
            break
        case 'notfound':
            main.$toast(res.msg).then(()=>{
                history.back()
            })
            break
        default:
            main.$toast(res.msg)
    }
    
}


export function $post(act,params = {},config = {}){
    return new Promise((resolve)=>{
        let wxid = getParams().wxid
        if(wxid){
            wxid = '&wxid='+wxid
        }else{
            wxid = ''
        }
        let url = config.isFullUrl ? act : `/Json/index.php?act=${act}${wxid}`;
        axios.post(url,params).then(res=>{
            
            let keys = act.match(/\w+/g);
            let key = keys[keys.length-1];
            res = res.data[key] ? res.data[key] : res.data;
            if(config.isErrorCall){
                resolve(res)
            }else{
                if(res.result === 'error'){
                    if(dealError(res,key)){
                        resolve(res)
                    }
                    
                }else{
                    resolve(res)
                }
            }
        })
        .catch(error=>{
            console.error(error)
        })
    })
} 

export function $get(act,params = {},config = {}){
    
    return new Promise(resolve=>{
        let wxid = getParams().wxid
        if(wxid){
            params.wxid = wxid
        }
        let _params = {
            "params":params
        }
        let url = config.isFullUrl ? act : `/Json/index.php?act=${act}`;
        axios.get(url,_params).then(res=>{
            let keys = act.match(/\w+/g);
            let key = keys[keys.length-1];
            res = res.data[key] ? res.data[key] : res.data;
            
            if(config.isErrorCall){
                resolve(res)
            }else{
                if(res.result === 'error'){
                    if(dealError(res,key)){
                        resolve(res)
                    }
                    
                }else{
                    resolve(res)
                }
            }
        })
        .catch(error=>{
            console.error(error)
        })
    })
} 