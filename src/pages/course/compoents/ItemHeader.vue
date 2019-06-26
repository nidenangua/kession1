<template>
    <div>
        <div class="course_header">
            <div class="course-defaultpic" v-if="playMediaType === 'video'" ref="videoContainer">
                <!--点播视频-->
            </div>
        
            <ktj-create-bg border-radius="0px" class="course-defaultpic" :src="info.defaultpic" v-else>
                <span class="err-tips" v-if="errTips">
                    {{errTips}}
                </span>
                <!--
                    学员人数对应字段
                    studentcount 课程
                    soldnum 专栏
                -->
                <div class="head-bottom-box" v-if="info.studentcount > 0 || info.soldnum > 0">
                    <div class="course_count">
                        <div class="joined-wrap">
                            <div class="num-tip">
                                <span class="num">{{info.studentcount || info.soldnum}}人学习</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ktj-create-bg>

        </div>
        <!-- info -->
        
        <div class="course_info">
            <div class="gift-btn ktj-fr" @click="share" v-if="$store.state.userInfo.usertype == 1 || info.chargetype != 1">
                <i class="ktj-icon ktj-icon-share-outline"></i>
                <p>分享</p>
            </div>
            <div class="gift-btn ktj-fr" @click="gift" v-else>
                <i class="ktj-icon ktj-icon-gift-outline"></i>
                <p>送好友</p>
            </div>
            <div class="title">
                <span class="is-relay" v-if="infoType == 'class'">直播</span>
                <span class="is-relay" v-else-if="infoType == 'course'">{{(info.courseType == 1 && '点播') || (info.courseType == 2 && '语音') || (info.courseType == 3 && '音频') || (info.courseType == 4 && '图文')}}</span>
                {{info.title}}
            </div>
            
            <div class="topic-count" v-if="infoType == 'course' && info.coursehour == 1">
                <span v-if="info.hourcount < info.expecthour">已开课{{info.hourcount}}节</span><span v-else>更新完结</span>  |  共{{info.expecthour}}节课
            </div>
            <div class="topic-count" v-else-if="infoType == 'class'">
                开课时间：{{info.timeSlotStart}}<br />
                直播时长：{{info.livehours}}小时
            </div>
            <div class="topic-count" v-else-if="infoType == 'column'">
                {{info.shortdesc}}
            </div>
            <div class="course-price-box">
                <div class="price-wrap">
                    <div class="price" v-if="info.chargetype == 1 && info.isbuy == 1">
                        {{(info.buytype == 1 && '享全站免费特权') || (info.buytype == 2 && '专栏免费') || '已购买'}}
                        
                    </div>

                    <div class="price" v-else-if="info.chargetype == 1">
                        ￥{{info.price}}
                        <span class="price-market" v-if="info.price_market">￥{{info.price_market}}</span>
                    </div>
                    <div class="price" v-else-if="info.chargetype == 0">免费</div>
                    
                </div>
            </div>
        
        </div>
        <!-- info -->
        
        <div ref="audio" v-if="playMediaType === 'audio'">
            <!--音频-->
        </div>

       
    </div>
</template>
<script>
require('@/assets/wx-audio/wx-audio.css')
import WxAudio from '@/assets/wx-audio/wx-audio.js'
export default {
    name:'ItemHeader',
    props:[
        'info',
        'infoType',
        'errTips'
    ],
    data(){
        return {
            audioPlayer:null,
            playMediaType:''
        }
    },
    methods:{
        /**
         * 赠送
         */
        gift(){
            this.$showPay({
                payid:this.info[`${this.infoType}id`],
                type:this.infoType,
                msg:'送好友',
                giftNum:1,
                price:this.info.price
            })
        },
        /**
         * 分享
         */
        share(){
            this.$showShareBg()
        },
        playMedia(info){
			console.log(info)
            this.playMediaType = info.mediaType
            this.$nextTick(()=>{
                if(info.mediaType === 'video'){
                
                    switch(info.vdoService){
                        case 'tencent':
                            this.$refs.videoContainer.innerHTML = '<video id="player-container-id" preload="auto" style="position: absolute; width: 100%;height: 100%;left: 0;top: 0;" webkit-playsinline playsinline x5-playsinline></video>'
                            break
                        case 'aliyun':
                            this.$refs.videoContainer.innerHTML = '<div class="prism-player" id="playercontainer"></div>'
                            break
                    }
                    if(info.play){
                        
                        if((info.vdoService === 'aliyun' && !document.getElementById('prismplayer')) || (info.vdoService === 'tencent' && !document.getElementById('tencent'))){
                            let script = document.createElement('script');
                            let style = document.createElement('link');
                            style.rel = 'stylesheet';
                            switch (info.vdoService) {
                                case "aliyun":
                                
                                    script.id = 'prismplayer';
                                    script.src = '//g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js';
                                    style.href = '//g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css';
                                    
                                    break;
                                case "tencent":
                                    script.id = 'tcplayer';
                                    script.src = '//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.min.js';
                                    style.href = '//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css';
                                    break;	
                            };
                            document.head.appendChild(style);
                            style.addEventListener('load',e=>{
                                document.body.appendChild(script);
                                script.addEventListener('load',()=>{
                                    new Function(info.play)()
                                })
                            })
                            
                        }else{
                            
                            new Function(info.play)()
                        }
                        
                    }  
                }else if(info.mediaType === 'audio'){
                    if(!info.videoid){
                        this.$toast('音频地址无效')
                        return false
                    }
                    this.$nextTick(()=>{
                        if(!this.audioPlayer){
                            let audioParams = {
                                ele: this.$refs.audio,
                                src: info.videoid,
                                width: '100%',
                                loop: false
                            }
                            
                            if(info.parentTitle){
                                audioParams.title = info.parentTitle
                                audioParams.disc = info.title
                            }else{
                                audioParams.title = info.title
                                audioParams.disc = ''
                            }
                            this.audioPlayer = new WxAudio(
                                audioParams
                            )
                        }else{
                            if(info.parentTitle){
                                this.audioPlayer.audioCut(
                                    info.videoid,
                                    info.parentTitle,
                                    info.title
                                )
                            }else{
                                this.audioPlayer.audioCut(
                                    info.videoid,
                                    info.title,
                                    ''
                                )
                            }
                        }
                        this.audioPlayer.audioPlay()
                    })
                }
            })
            
        }
    }
}
</script>
<style scoped>

.gift-btn{
    width: 50px;
    text-align: center;
}
.gift-btn .ktj-icon{
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    color:#e64a3b;
    display: block;
    margin: 0 auto;
}
.gift-btn p{
    color:#e64a3b;
    line-height: 20px;
}
.course_header{position:relative;overflow:hidden;width:100%;height:0;height: 11.5rem}
.course_header .course-defaultpic{position:absolute;top:0;left:0;z-index:1;width:100%;height:100%}
.course_header .course-defaultpic .head-icon{width:100%;height:100%}
.course_header .course-defaultpic .err-tips{
    width:90px;
    height: 30px;
    border-radius: 50px;
    background: rgba(0,0,0,0.4);
    color: #fff;
    left: 50%;
    margin-left: -45px;
    top: 50%;
    margin-top: -15px;
    text-align: center;
    position: absolute;
    z-index: 9;
    line-height: 30px;
}

.head-bottom-box{
    width:100%;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    position: relative;
    bottom: 0;
    left: 0;
    position: absolute
}
.head-bottom-box::after{
    content: '';
    height: 44px;
    background: linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.4));
    position: absolute;
    width:100%;
    bottom: 0;
    left: 0;
    z-index: 8;
}
.head-bottom-box .course_count{
    position: relative;
    z-index: 9;
    background: url(../../../assets/course/count.png) no-repeat 10px 50%;
    background-size:auto 14px;
    padding-left: 20px;
}
.joined-wrap{-webkit-box-flex:1;-webkit-flex:auto;-moz-box-flex:1;flex:auto;margin-left:8px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;align-items:center}
.joined-wrap .pic{display:inline-block;width:14px;height:14px;-webkit-border-radius:27px;border-radius:27px;border:2px solid #fff;-webkit-background-size:100% 100%;background-size:100%;position:relative}
.joined-wrap .num-tip{margin-left:3px;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;font-weight:700;color:#fff;font-size:12px}

.course_info{background-color:#fff;padding:15px}
.course_info .title{color:#424242;display:-webkit-box; line-height:24px; -webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;font-weight:700;margin-bottom:5px;font-size:16px;text-align:left}
.course_info .title .is-relay{
    font-size:14px;
    margin-right:5px;
    padding:2px 4px;
    color:#fff;
    background:#e64a3b;
    border-radius:3px;
    position: relative;
    top:0
}
.course_info .flex-con{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:flex;margin-bottom:0}
.course_info .topic-count{color:#b8b0b0;font-size:12px;margin-bottom:15px; line-height: 20px;}
.course_info .price-wrap{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;align-items:center}
.price-wrap .price{font-size:16px;margin-right:10px;color:#e64a3b;font-weight:700}
.price-wrap .price-market{
    text-decoration: line-through;
    color: #b5b5b5;
    font-weight: normal;
    font-size: 13px;
    margin-left: 5px;
}

#audio{
    background: #fff;
    padding:15px 10px 10px 10px;
    margin-top:10px;
    margin-bottom: 10px;
}

</style>

