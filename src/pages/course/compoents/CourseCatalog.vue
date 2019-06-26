<template>
    <div>
        <div v-if="chapter.length">
            
            <!--纯课时结构-->
            <div class="keshi-box" v-if="chapterType == 2">
                <div class="keshi-item" v-for="(item,i) in chapter" :key="i" @click="play(item)" :class="currentPlayId == item.chapterid && 'on'">
                    <i class="eva-icon lock-outline" v-if="!isCanLearn && item.freeplay != 1"></i>
                    <span class="free" v-else-if="!isCanLearn">免费</span>
                    <span class="type" v-if="courseType == 1">视频</span>
                    <span class="type" v-else-if="courseType == 2">直播</span>
                    <span class="type" v-else-if="courseType == 3">音频</span>
                    <span class="type" v-else-if="courseType == 4">图文</span>
                    {{item.title}}
                </div>
            
            </div>
            <div v-else>
                <div class="chapter-box" v-for="(item,i) in chapter" :key="i">
                    
                    <div class="chapter-name" @click="item.slideShow = item.slideShow ? false : true">
                        <i class="eva-icon arrow-ios-downward-outline" :class="item.slideShow && 'arrow-up'">
                        </i>
                        {{item.title}}
                    </div>
                    <!--章节时结构-->
                    <div class="section-box" v-if="item.Section" v-show="item.slideShow">
                        <div class="section-item" v-for="(section,k) in item.Section" :key="k">
                            <div class="section-name" @click="section.slideShow = section.slideShow ? false : true">
                                <i v-if="section.keshi && section.keshi.length" class="eva-icon arrow-ios-downward-outline" :class="section.slideShow && 'arrow-up'">
                                </i>
                                {{section.title}}
                            </div>
                            <div class="keshi-box" v-if="section.keshi" v-show="section.slideShow">
                                <div class="keshi-item" v-for="(keshi,s) in section.keshi" :key="s" @click="play(keshi,section)" :class="currentPlayId == keshi.chapterid && 'on'">
                                    <i class="eva-icon lock-outline" v-if="!isCanLearn && keshi.freeplay != 1"></i>
                                    <span class="free" v-else-if="!isCanLearn">免费</span>
                                    <span class="type" v-if="courseType == 1">视频</span>
                                    <span class="type" v-else-if="courseType == 2">直播</span>
                                    <span class="type" v-else-if="courseType == 3">音频</span>
                                    <span class="type" v-else-if="courseType == 4">图文</span>
                                    {{keshi.title}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--章时结构-->
                    <div class="keshi-box" v-else-if="item.keshi" v-show="item.slideShow">
                        <div class="keshi-item" v-for="(keshi,s) in item.keshi" :key="s" @click="play(keshi,item)" :class="currentPlayId == keshi.chapterid && 'on'">
                            <i class="eva-icon lock-outline" v-if="!isCanLearn && keshi.freeplay != 1"></i>
                            <span class="free" v-else-if="!isCanLearn">免费</span>
                            <span class="type" v-if="courseType == 1">视频</span>
                            <span class="type" v-else-if="courseType == 2">直播</span>
                            <span class="type" v-else-if="courseType == 3">音频</span>
                            <span class="type" v-else-if="courseType == 4">图文</span>
                            {{keshi.title}}
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
        <ktj-empty msg="该课程下暂无课时～" type="nolesson" v-else />
    </div>
</template>
<script>
/**
 * 字段说明
 * courseType:1点播 2语音直播 3音频 4图文
 */
export default {
    name:'CourseCatalog',
    props:['chapter','chapterType','isCanLearn','currentPlayId','courseType'],
    methods:{
        play(item,parentItem){
            if(this.courseType == 1 || this.courseType == 3){
                this.$emit('play',item,parentItem)
            }else if(this.courseType == 2){

                location.href = `/h5market/audioin?infoid=${item.courseid}&cid=${item.chapterid}`
            
            }else if(this.courseType == 4){
               this.$router.push({
                    name:'GraphicLearn',
                    params:{
                        id:item.courseid
                    },
                    query:{
                        chapterid:item.chapterid
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.chapter-name,
.section-name{
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    padding:0 30px 0 15px;
    font-size: 14px;
    position: relative;
    border-bottom: 1px solid #fff;
}
.chapter-name .arrow-ios-downward-outline,
.section-name .arrow-ios-downward-outline{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top:-9px;
    transition: .4s;
}
.chapter-name .arrow-up,
.section-name .arrow-up{
    transform: rotate(-180deg)
}
.chapter-name{
    background: #f5f5f5;
}
.section-name{
    background: #fafafa;
    color:#555;
}
.keshi-box{
    padding: 0 15px;
}
.keshi-item{
    padding: 12px 45px 12px 0;
    line-height: 20px;
    font-size: 14px;
    position: relative;
    color:#555;    
}
.keshi-item.on{
    color: #e64a3b
}
.keshi-item .type{
    border: 1px solid #555;
    font-size: 10px;
    padding: 1px 2px;
    border-radius: 3px;
    margin-right: 5px;
    color:#555;
}
.keshi-item .free{
    position: absolute;
    right: 0;
    font-size: 12px;
    top: 12px;
    color: #2fca4a;
    border-radius: 3px;
}
.keshi-item .lock-outline{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 0;
    top: 13px;
}
.keshi-item:last-child::after{
    display: none
}
</style>
