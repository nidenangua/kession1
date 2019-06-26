import {$post,$get} from './main.entrance'


/**
 * 个人会员 我的已购
 */
export function getMyPurchase(params){
    return new Promise((resolve)=>{
        $get(`Users.User.getMyPurchase`,params).then(data=>{
            resolve(data)
        })
    })
}

/**
 * 个人会员 我的订单
 */
export function getUserCourseOrder(params){
    return new Promise((resolve)=>{
        $get(`Users.User.getOrderList`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 个人会员 订单详情
 */
export function getOrderDetail(params){
    return new Promise((resolve)=>{
        $get(`Users.User.getOrderDetail`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 个人会员 删除订单
 */
export function deleteOrder(params){
    return new Promise((resolve)=>{
        $get(`Users.User.delOrder`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 申请退款
 */
export function refundOrder(params){
    return new Promise((resolve)=>{
        $get(`Users.Common.refundOrder`,params).then(data=>{
            resolve(data)
        })
        
    })
}


/**
 * 我的优惠券
 */
export function getUserVouceher(params){
    return new Promise((resolve)=>{
        $post(`Users.User.myVoucherList`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 领取优惠券
 */
export function getVoucher(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getVoucher`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 赠送记录
 */
export function getGiftRecord(params){
    return new Promise((resolve)=>{
        $post(`Users.User.myGiftList`,params).then(data=>{
            resolve(data)
        })
        
    })
}


/**
 * 获取礼物信息
 */
export function getGiftShare(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getGiftShare`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 领取赠礼
 */
export function receiveGifts(params){
    return new Promise((resolve)=>{
        $post(`Users.User.receiveGifts`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 个人会员 我的消息
 */
export function getInformationList(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getInformationList`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 个人会员 我的消息详情
 */
export function getInformationDetail(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getInformationDetail`,params).then(data=>{
            resolve(data)
        })
        
    })
}


/**
 * 我的公告
*/
export function getNoticeList(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getNoticeList`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 公告详情
 */
export function getNoticeDetail(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getNoticeDetail`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 获取消息数量
 */
export function getMessageNum(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getMessageNum`,params,{
            isErrorCall:true
        }).then(data=>{
            resolve(data)
        })
        
    })
}


/**
 * 基本信息
 */
export function getUserInfo(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getUserInfo`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 个人设置
 */
export function savePersonMsg(params){
    return new Promise((resolve)=>{
        $post(`Users.User.savePersonMsg`,params).then(data=>{
            resolve(data)
        })
        
    })
}


/**
 * 修改头像
 */
export function changeHead(params){
    return new Promise((resolve)=>{
        $post(`Users.User.changeHead`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 获取我的优惠券，带账户余额
 */
export function getUserWealth(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getUserWealth`,params).then(data=>{
            resolve(data)
        })
        
    })
}

/**
 * 用户登录
 */
export function checkLogin(params){
    return new Promise((resolve)=>{
        $post(`Users.Common.checkLogin`,params).then(data=>{
            resolve(data)
        })
        
    })
}
/**
 * 用户退出
 */
export function loginOut(params){
    return new Promise((resolve)=>{
        $post(`Users.Common.loginOut`,params).then(data=>{
            resolve(data)
        })

    })
}
/**
 * 获取会员卡列表
 */
export function getUserCards(params){
    return new Promise((resolve)=>{
        $post(`Users.User.getUserGroupList`,params).then(data=>{
            resolve(data)
        })
        
    })
}

