<template>
    <div v-if="loaded">
        <div class="order-pay-status">
            <div class="order-pay-status__text">
                <span v-if="info.paystatus==0">待付款</span>
				<span v-else-if="info.paystatus==1">已付款</span>
				<span v-else-if="info.paystatus==3">退款中</span>
				<span v-else-if="info.paystatus==4">已退款</span>
                
            </div>
            <div class="order-pay-status__tip" v-if="info.paystatus == 0">
                赶快去付款吧~
            </div>
            <div class="order-pay-status__tip" v-else-if="info.paystatus == 1">
                赶快去吸取知识养分吧~
            </div>
        </div>
        <div class="order-info ktj-mt10">
            <div class="order-info__store ktj-line" @click="open(storeInfo.storeurl)" v-if="hasToken == 1">
                <i class="ktj-icon ktj-icon-arrow-ios-forward-outline"></i>
                <ktj-create-bg class="order-info__store_logo" :src="storeInfo.storelogo" type="logo" />{{storeInfo.storename}}
            </div>
            <div class="order-info__cont" v-for="item in values" :key="item.id" @click="openView(item)">
                <ktj-create-bg :src="item.defaultpic" class="order-info__image" />
                <div class="order-info__title">
                    {{item.title}}
                </div>
                
                <div class="order-info__type" v-if="item.type == 0 && item.coursetype == 1">点播课程</div>
                <div class="order-info__type" v-else-if="item.type == 0 && item.coursetype == 2">语音直播</div>
                <div class="order-info__type" v-else-if="item.type == 0 && item.coursetype == 3">音频课程</div>
                <div class="order-info__type" v-else-if="item.type == 0 && item.coursetype == 4">图文课程</div>
                <div class="order-info__type" v-else-if="item.type == 1">直播课程</div>
                <div class="order-info__type" v-else-if="item.type == 7">
                    专栏
                </div>
                <div class="order-info__type" v-else-if="item.type == 10">
                    社群
                </div>
                <div class="order-info__price">
                    ¥{{item.price}}
                </div>
            </div>
            <ktj-list class="order-info__list ktj-mt10">
                <ktj-list-item title="总价">
                    ¥{{info.original_amount}}
                </ktj-list-item>
                <ktj-list-item title="优惠券">
                    -¥{{info.vouchermoney || '0.00'}}
                </ktj-list-item>
                <ktj-list-item title="会员折扣" v-if="info.discount !== null">
                    {{info.discount+'折'}}
                </ktj-list-item>
                <ktj-list-item title="会员折扣" v-else>
                    无折扣
                </ktj-list-item>
                <ktj-list-item title="实付款">
                    <span class="ktj-color-primary ktj-fz18">
                        ¥{{info.order_amount}}
                    </span>
                </ktj-list-item>
            </ktj-list>
            <div class="order-info__other ktj-mt10">
                下单时间：{{info.adddate}}<br />
                订单编号：{{info.ordersn}}
            </div>
        </div>
        <store-footer v-if="hasToken === 0" />
    </div>
</template>
<script>
import {getParams,getViewRoute} from '@/utils'
import {getOrderDetail} from '@/api/user'
export default {
    name:'UserOrderInfo',
    data(){
        return {
            loaded:false,
            hasToken:-1,
            info:{},
            storeInfo:{},
            values:[]
        }
    },
    methods:{
        /**
         * 跳链接
         */
        open(url){
            location.href = url
        },
        /**
         * 打开详情页
         */
        openView(item){
           
           let storeUrl = this.storeInfo.storeurl
            
           let params = getViewRoute(item)
           
           location.href = storeUrl + '/#'+params
         
        }
    },
    activated(){
        this.$showLoading()
        this.loaded = false
        let params = {
            ordersn:this.$route.params.id
        }
        let par = getParams()
        if(par.h5token){
            params.h5token = par.h5token
            this.hasToken = 1
        }else{
            this.hasToken = 0
        }
        getOrderDetail(params).then(res=>{
            this.info = res.info
            this.storeInfo = res.storeinfo
            this.values = res.values
            this.loaded = true
            this.$hideLoading()
        })
    }
}
</script>
<style scoped>
.order-pay-status{
    padding: 15px;
    color:#fff;
    background: linear-gradient(to right,#e85b45,#ee7246)
}
.order-pay-status__text{
    font-size: 18px;
}

.order-pay-info,
.order-info__store,
.order-info__cont,
.order-info__list,
.order-info__other{
    background: #fff;
}

.order-info__store{
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    overflow: hidden;
    padding: 0 10px;
}
.order-info__store .ktj-icon{
    float:right;
    color:#999;
}
.order-info__store .order-info__store_logo{
    width: 28px;
    height: 28px;
    float:left;
    border-radius: 50%;
    margin:8px 7px 0 0;
}
.order-info__cont{
    padding: 10px 10px 10px 170px;
    min-height: 90px;
    position: relative;
   
}
.order-info__cont .order-info__image{
    width:140px;
    height: 80px;
    position: absolute;
    left: 10px;
    top: 10px;

}
.order-info__title{
    font-size: 14px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    
}
.order-info__type{
    color:#999;
    margin-top: 6px;
}
.order-info__price{
    font-size: 16px;
    text-align: right;
    margin-top: 6px;
}

.order-info__other{
    line-height: 24px;
    font-size: 14px;
    padding: 15px;
    color:#999;
}

</style>

