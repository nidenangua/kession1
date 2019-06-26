<template>

    <div class="course_container" v-if="loaded">

        <item-header :info="classInfo" info-type="class" />
        
        <!-- info -->
        <div class="box_info" v-if="classInfo.classintro">
            <div class="ktj-content">
                <div class="ktj-content__head">课堂简介</div>
                <div v-html="classInfo.classintro" ref="classIntro"></div>
            </div>

            <!--打赏-->
            <reward type="classReward" :info-id="classid" v-if="classInfo.chargetype == 2" />

        </div>
        
        
        <store-info class="ktj-mt10" />
        <store-footer />
        
        <div class="button-container">
            <ktj-button class="buy-btn" type="primary" v-if="isCanLearn" @click="showWechatCode">进入直播</ktj-button>
            <ktj-button class="buy-btn" type="primary" @click="buy" v-else>报名课程</ktj-button>
        </div>
        <div class="ktj-masked" v-if="isCanLearn" v-show="codeFlag" @click="codeFlag = false"></div>
        <div class="codewrap" v-if="isCanLearn" v-show="codeFlag">
            <img :src="codeImg" />                      
            <p>长按识别二维码进入小程序学习</p>
        </div>


    </div>
        

</template>

<script>
import Reward from './compoents/Reward'
import ItemHeader from './compoents/ItemHeader'
import {getClassDetail,getXCXQRcode} from '@/api/class';
export default {
  name: 'ClassView',
  data () {
    return {
        loaded:false,
        isCanLearn:false,
        classInfo:{},
        classid:this.$route.params.id,
        isFree:false,
        codeImg:'',
        codeFlag:false
        
    }
  },
  methods:{
     /**
       * 购买
       */
      buy(){
          this.$showPay({
                payid:this.classid,
                price:this.classInfo.price,
                msg:'购买直播',
                type:'class'
          })
        
      },
 
      /**
       * 进入学习
       */
      showWechatCode(){
          this.codeFlag = true;
          
      }
  },
  activated(){
    this.$showLoading()
    document.title = '课堂详情'
    /**
     * 默认数据初始化
     */
    
    this.loaded = false
    this.isCanLearn = false
    this.classInfo = {}
    this.classid = this.$route.params.id
    this.isFree = false
    this.codeImg = ''
    this.codeFlag = false
    /**
     * 获取课堂详情
     */

    getClassDetail({
        id:this.classid
    }).then(res=>{
        
        let classInfo = res.classinfo;
        classInfo.studentcount = parseInt(classInfo.studentcount);
        classInfo.livehours = parseFloat(classInfo.livehours);
        /**
         * 开启防复制
         */
        if(classInfo.iscopy == 1){
            this.$antiCopy(true)
        }
        this.classInfo = classInfo;
        if(classInfo.price == '0.00' || classInfo.chargetype != 1){
            this.isFree = true
        }
        if(classInfo.price == '0.00' || classInfo.isbuy == 1 || classInfo.chargetype != 1){
            this.isCanLearn = true
            getXCXQRcode({
                id:this.classid
            }).then(res=>{
                this.codeImg = res.imgurl
            })
        }
        /**
         * 配置微信分享
         */
        this.$wxShare({
            title:classInfo.title,
            desc:classInfo.shortdesc,
            imgUrl:classInfo.defaultpic
        })
        this.loaded = true
        this.$nextTick(()=>{
            this.$hideLoading()
            /**
             * 设置图片点击放大
             */
            this.$setPreview(this.$refs.classIntro)
            
        })
    })
  },
  deactivated(){
      /**
       * 取消防复制
       */
      this.$antiCopy(false)
      
  },
  components:{
      ItemHeader,
      Reward
  }

}

</script>
<style scoped>
.box_info{background-color:#fff;padding:0 15px}
.button-container{
    height: 49px;
    overflow: hidden;
}
.button-container .buy-btn{
    width: 100%;
    height:49px;
    line-height:49px;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 480px;
    bottom: 0;
    z-index: 9;
    border-radius: 0px;
}

.codewrap {
    padding: 10px;
    text-align: center;
    width: 220px;
    background: #FFF;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 50%;
    margin-top: -140px;
    position: fixed;
    z-index: 100;
}
.codewrap img{
    width: 100%;
    display: block
}
.codewrap p{
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    font-weight: bold;
    font-size: 14px;
}
</style>
