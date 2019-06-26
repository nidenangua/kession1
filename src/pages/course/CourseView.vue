<template>

    <div class="course_container" v-if="loaded">
        <div class="course_content">

            <item-header :info="courseInfo" info-type="course" :err-tips="errTips" ref="itemHeader" />
            
            <!-- tab -->
            <div class="tab line" v-if="courseInfo.coursehour == 1">
                <div class="tab-item on-log" :class="tab == 0 && 'active'" @click="tab = 0" >课程介绍</div>
                <div class="tab-item on-log" :class="tab == 1 && 'active'" @click="tab = 1">目录</div>
                <div class="tab-item on-log" :class="tab == 2 && 'active'" @click="tab = 2">用户评论</div>
            </div>
            <!-- tab -->
            
            <!-- Anchor -->
            <div class="intro-anchor" v-show="tab == 0">
                
                <!--图文-->
                <div class="ktj-content" v-if="courseInfo.courseType == 4">
                    <!--连载图文、免费、已购买显示详细内容-->
                    <div v-if="courseInfo.coursehour == 1 || isCanLearn">
                        <div v-html="courseInfo.content" ref="content"></div>
                    </div>

                    <!--未购买-->
                    <div v-else>
                        <div v-html="courseInfo.announce" ref="skContent"></div>
                        <div class="buy-article-tips line line-top">本内容需要购买之后才能阅读全文</div>
                        
                    </div>
                </div>
                <div class="ktj-content" v-else>
                    <div class="ktj-content__head">课程简介</div>
                    <div v-html="courseInfo.content"></div>
                </div>
                
                <!--打赏-->
                <reward type="courseReward" :info-id="courseid" v-if="courseInfo.chargetype == 2" />
                
            </div>    
            <!-- Anchor -->
            <!-- Anchor -->
            <div class="catalog-anchor" v-if="courseInfo.coursehour == 1" v-show="tab == 1">
                <course-catalog :course-type="courseInfo.courseType" :current-play-id="currentPlayId" :is-can-learn="isCanLearn" :chapter="chapter" :chapter-type="chapterType" @play="play" />
            </div>   
            <!-- Anchor -->
            <div class="comment-anchor" v-show="tab == 2 || courseInfo.coursehour != 1" :class="courseInfo.coursehour != 1 && 'ktj-mt10'">
                <comment :comment-switch="isCanLearn" appid="6" :info-id="courseid" v-if="courseid" />

            </div>

            <!--main-->
        </div>

        <!--店铺信息-->
        <store-info class="ktj-mt10" />
        <!--底部-->
        <store-footer />


        <div class="footer-button" v-if="!isCanLearn">
            <div class="footer-button__fixed">
                
                <ktj-button type="primary" @click="buy">购买课程</ktj-button>
            </div>
        </div>
        <div class="footer-button" v-else-if="isCanLearn && courseInfo.courseType == 2">
            <div class="footer-button__fixed">
                <ktj-button type="primary" @click="open(courseInfo.liveurl)">进入直播</ktj-button>
            </div>
        </div>
    
    </div>
 

</template>

<script>
import ItemHeader from './compoents/ItemHeader'
import CourseCatalog from './compoents/CourseCatalog'
import Reward from './compoents/Reward'
import Comment from '@/pages/comment/Comment'
import {getCourseDetail,getCoursePlayVod} from '@/api/course'

export default {
  name: 'CourseView',
  data () {
    return {
        loaded:false,
        courseid:this.$route.params.id,
        errTips:null,
        h5Info:{},
        courseInfo:{},
        tab:0,
        isFree:false,
        isCanLearn:false,
        /**
         * 目录
         */
        currentPlayId:null,
        chapter:[],
        chapterType:null
    }
  },
  methods:{

      /**
       * 购买
       */
      buy(){
          this.$showPay({
              payid:this.courseid,
              msg:'购买课程',
              price:this.courseInfo.price,
              type:'course'
          })
      },
     /**
      * 播放
      */
      play(item,parentItem){
		console.log(item,parentItem)
        /**
        * courseType  1点播 2语音直播 3音频
        * freeplay 0付费 1试听
        * chapterid 章节时对应的唯一id
        */
        this.errTips = '';
        let freeplay = item.freeplay;
        let chapterid = item.chapterid;
        let courseType = this.courseInfo.courseType;
        /**
         * 如果不是免费课程  且不是试听课程
         */
        if (freeplay != 1 && !this.isCanLearn) {
            this.$toast('请先购买')
            return false;
        }
        
        /**
         * 获取课时播放信息
         */
        if(courseType == 1){
            
            getCoursePlayVod({
                courseid:this.courseid,
                chapterid:chapterid
            }).then(res=>{
                
                if(res.errcode === '10002'){
                    this.$toast('请先登录').then(()=>{
                        this.$router.push({
                            name:'UserLogin'
                        })
                    })
                    return false 
                }
                
                if(res.code == 10005){
                    this.$toast(res.msg)
                    return false
                }
                if(res.msg == "系统出错"){
                    this.errTips = '暂无视频'
                    return false
                }
                
                let mediaInfo = res
                mediaInfo.mediaType = 'video'
                this.$refs.itemHeader.playMedia(mediaInfo)
                /**
                 * 设置当前播放的视频id
                 */
                this.currentPlayId = chapterid;
            
            })
        }else if(courseType == 3){
            let mediaInfo = {
                videoid:item.videoId,
                title:item.title,
                mediaType:'audio'
            }
            
            if(parentItem){
                mediaInfo.parentTitle = parentItem.title
            }
           
            this.$refs.itemHeader.playMedia(mediaInfo)
            this.currentPlayId = chapterid
        }
        
      },
      setChapterData(data){
          data.map(item=>{
                if(item.depth == 1 || item.depth == 2){
                    item.slideShow = true
                }
                if(item.Section){
                    this.setChapterData(item.Section)
                }
          })
      },
      open(url){
          location.href = url
      }
  },

  activated(){
    this.$showLoading();
    document.title = '课程详情';
    /**
     * 默认数据初始化
     */
    this.loaded = false;
    this.tab = 0;
    this.isCanLearn = false;
    this.isFree = false;
    
    this.courseid = this.$route.params.id;
    /**
     * 获取课程详情
     */
    getCourseDetail({
        id:this.courseid
    }).then(res=>{
		console.log(res)
        let courseInfo = res.courseinfo;
        courseInfo.studentcount = parseInt(courseInfo.studentcount);
        courseInfo.hourcount = parseInt(courseInfo.hourcount);
        courseInfo.expecthour = parseInt(courseInfo.expecthour);
        /**
         * 开启防复制
         */
        if(courseInfo.iscopy == 1){
            this.$antiCopy(true)
        }
        this.courseInfo = courseInfo;
        this.h5Info = res.h5info;
        let chapterData = res.chapter.chapter;
        this.setChapterData(chapterData);
        this.chapter = chapterData;
        this.chapterType = res.chapter.istype;
        if(courseInfo.price == '0.00' || courseInfo.chargetype != 1){
            this.isFree = true
        }
        if(courseInfo.price == '0.00' || courseInfo.isbuy == 1 || courseInfo.chargetype != 1){
            this.isCanLearn = true
        }
        /**
         * 配置微信分享
         */
        this.$wxShare({
            title:courseInfo.title,
            desc:courseInfo.shortdesc,
            imgUrl:courseInfo.defaultpic
        })

        this.loaded = true
        
        this.$nextTick(()=>{
            /**
             * 满足播放权限直接进入播放
             */
			console.log(this.chapter[0])
            if(courseInfo.coursehour != 1 && this.isCanLearn){
                this.play(this.chapter[0])
            }else if(courseInfo.coursehour == 1 && this.isCanLearn){
                if(!this.chapter){
                    return false   
                }
                this.tab = 1
                
                if(this.chapterType == 2){
                    this.play(this.chapter[0])   
                }else{
                    let firstKeshi
                    let firstKeshiParent
                    for(let i=0;i<this.chapter.length;i++){
                        let c = this.chapter[i]
                        if(c.Section){
                            for(let ii=0;ii<c.Section.length;ii++){
                                let s = c.Section[ii]
                                if(s.keshi && !firstKeshi){
                                    firstKeshi = s.keshi[0]
                                    firstKeshiParent = s
                                    break
                                }
                            }
                            
                        }else if(c.keshi){
                            if(!firstKeshi){
                                firstKeshi = c.keshi[0]
                                firstKeshiParent = c
                                break
                            }
                        }
                    }
                    if(firstKeshi){
                        this.play(firstKeshi,firstKeshiParent)   
                    }
                }
            }
            /**
             * 设置图片放大预览
             */
            if(this.$refs.skContent){
                this.$setPreview(this.$refs.skContent)
            }else if(this.$refs.content){
                this.$setPreview(this.$refs.content)
            }
            this.$hideLoading()
        })
        
          
    })
  },
  deactivated(){
      /**
       * 取消防复制
       */
      this.$antiCopy(false);
      
  },
  components:{
      ItemHeader,
      Reward,
      CourseCatalog,
      Comment
  }

}

</script>
<style scoped>

.course_container{position:relative}

/*选项卡*/
.tab{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;align-items:center;-webkit-justify-content:space-around;justify-content:space-around;height:49px;background-color:#fff;}
.tab .tab-item{-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;flex:1;color:#424242;text-align:center;height:100%;position:relative;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;font-size:18px}
.tab .tab-item.active{color:#e64a3b;font-weight:bolder}
.tab .tab-item.active{font-size:18px}
.tab .tab-item.active:after{content:"";display:block;height:3px;border-radius:3px;background-color:#e64a3b;width:40px;position:absolute;bottom:0;left:0;right:0;margin:auto}
.intro-anchor,
.catalog-anchor,
.comment-anchor {
    background: #fff;
    
}
.comment-anchor{
    padding: 15px 15px 0 15px
}
.intro-anchor {
    padding: 20px
}
.intro-anchor .empty{
    margin-top: 0px;
}

.footer-button{
    height: 49px;
    overflow: hidden;
}
.footer-button__fixed{
    width: 100%;
    max-width: 480px;
    position: fixed;
    left: 0;
    margin: 0 auto;
    right: 0;
    bottom: 0;
    z-index: 9;
}
.footer-button__fixed .ktj-button{
    width: 100%;
    height: 49px;
    line-height: 49px;
    border-radius:0px;
}
.buy-article-tips{ 
    text-align: center;
    padding: 75px 0 30px 0;
    font-size: 14px;
    letter-spacing: 1px;
    background: url(../../assets/course/money.png) no-repeat 50% 30px;
    background-size:auto 34px;
    margin-top: 15px
}

</style>
