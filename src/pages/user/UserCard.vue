<template>
    <div v-if="loaded">
        <div v-if="groupList.length">
            <ktj-swiper :options="swiperOption" class="card-swiper" ref="cardSwiper">
                <ktj-swiper-slide v-for="(item,index) in groupList" :key="index"> 
                    <div class="card-item" :class="item.type == 2 && 'card-gold-item'">
                        <div class="card-item__have" v-if="item.hasbuy == 1"></div>
                        <div class="discount" v-if="item.other == 1" :class="item.hasbuy == 1 && 'discount__have'">*享受其他优惠</div>
                        <div class="discount" :class="item.hasbuy == 1 && 'discount__have'" v-else>*不享受其他优惠</div>
                        <div class="name">{{item.name}}</div>
                        <div class="price" v-if="item.hasbuy == 1">
                            {{selected.offer}}<br />
                            有效期至：{{item.expiretime}}
                        </div>
                        <div class="price" v-else>
                            {{selected.offer}}<br />
                            ￥{{item.price}}/ {{item.effectivemonth}}个月
                        </div>
                    </div>
                </ktj-swiper-slide>
            </ktj-swiper>

            <div class="card-intro">
                <h4>会员卡简介：</h4>
                <div class="intro">
                    1、购买该卡后，有效期为{{selected.effectivemonth}}个月<br />
                    2、该会员卡享{{selected.offer}}{{selected.other}}<br />
                    3、使用该卡{{selected.costlevel}}
                   
                </div>
            </div>
            <div class="card-button-footer">
                <ktj-button :type="selected.hasbuy == 1 ? 'success' : 'primary'" width="100%" class="card-button" @click="cardPay">{{selected.hasbuy == 1 ? '立即续费' : '立即开通'}}（¥{{selected.price}}）</ktj-button>
            </div>

        </div>
        <ktj-empty v-else-if="loaded" msg="没有找到会员卡～" />
        
    </div> 
</template>
<script>

import {getUserCards} from '@/api/user'

export default {
    name:'UserCard',
    data(){
        return {
            loaded:false,
            /**
             * 当前选择的会员卡信息
             */
            selected:{
                price:'',
                other:'',
                offer:'',
                costlevel:'',
                id:'',
                effectivemonth:''
            },
            mygroup:{},
            groupList:[],
            swiperOption:{
               slidesPerView : 1.1,
               centeredSlides:true,
               initialSlide:null,
               on:{
                   transitionEnd:()=>{
                       this.$nextTick(()=>{
                            let index = this.$refs.cardSwiper.swiper.snapIndex
                            this.setSelected(this.groupList[index])
                       })
                   }
               }
            }
        }
    },

    methods:{
        /**
         * 设置当前选中的会员卡信息
         */
        setSelected(item){
            
            if(item.type == 1){
                let costlevel = parseFloat(item.costlevel)
                let discount = parseFloat(item.discount)
                this.selected.other = item.other == 1 ? '，享受其他优惠' : '，不享受其他优惠'
                this.selected.offer =  `全场${discount}折优惠`
                this.selected.costlevel = costlevel ? `消费额度最高${costlevel}元，超出后不享受该优惠` : '不限消费额度'
            }else if(item.type == 2){
                this.selected.offer = '全站免费'
                this.selected.other = ''
                this.selected.costlevel = '不限消费额度'
            }
            this.selected.hasbuy = item.hasbuy
            this.selected.effectivemonth = item.effectivemonth
            this.selected.id = item.id
            this.selected.price = item.price
            
            
        },
        /**
         * 开通会员卡
         */
        cardPay(){
            this.$showPay({
                payid:this.selected.id,
                price:this.selected.price,
                msg:'购买会员卡',
                type:'vipCard'
            })
        }
    },
    activated(){
        this.$showLoading()
        this.loaded = false
        document.title = '我的会员卡';
        let id = this.$route.query.id;
        
        getUserCards({
            p:1,
            maxperpage:100
        }).then(res=>{
            if(res.grouplist.length){
                
                let selected;
                res.grouplist.map((item,i)=>{
                    
                    if(item.id == id){
                        selected = i
                    }
                })
                if(!selected){
                    selected = 0;
                }
                
                this.swiperOption.initialSlide = selected
                this.groupList = res.grouplist;
                this.setSelected(res.grouplist[selected])
                
            }
            if(res.mygroup){
                this.mygroup = res.mygroup
            }
            this.loaded = true
            this.$hideLoading()

        });
    }
}
</script>
<style scoped>
.card-swiper{
    padding:20px;
}
.card-item{
    height: 7rem;
    background: linear-gradient(to right, #97a0ab , #c9d3de);
    border-radius: 12px;
    padding: 20px 30px;
    position: relative;
}
.card-gold-item{
    background: linear-gradient(to right, #caa970 , #e8cf9a);
}
.card-item__have{
    width: 3rem;
    height: 3.2rem;
    background: url(../../assets/user/have.png) no-repeat;
    background-size: 100% auto;
    position: absolute;
    right: -.1rem;
    top: -.1rem;
}
.card-item::after{
    content: '';
    width: 3rem;
    height:3rem;
    background: url(../../assets/user/card-icon.png) no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: 20px;
    right: 30px;
}
.card-item .discount{
    text-align: right;
    color: rgba(255, 255, 255, 0.7)
}
.card-item .discount__have{
    padding-right: 30px;
}
.card-item .name{
    font-size: 20px;
    line-height: 32px;
    color: #fff;
    background-repeat: no-repeat;
    background-position: 0 6px;
    background-image: url(../../assets/user/v1.png);
    padding-left: 34px;
    background-size: auto 24px;
}
.card-item .price{
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    line-height: 24px;
    position: absolute;
    bottom: 20px;
    left: 20px;
}
.card-gold-item .name{
    background-image: url(../../assets/user/v2.png);
}
.card-intro{
    line-height: 2;
    padding: 20px;
}
.card-intro h4{
    font-size: 16px;
    font-weight: normal
}
.card-intro .intro{
    font-size: 14px;
    color:#999;
}
.card-button-footer{
    height: 49px;
    overflow: hidden;
    position: fixed;
    max-width: 480px;
    left:  auto;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
}

.swiper-slide{
    transform: scale(0.85);
    transition: .3s;
    opacity: 0.85;
}
.swiper-slide-active{
    transform: scale(1);
    opacity: 1;
}
</style>

