<template>
    <div v-if="dataList.length">
        <!--
            字段说明
            courseType:1点播 2直播 3音频 4图文
        -->
        <!--默认样式-->
        <div class="drag-course-default" v-if="!dataStyle || dataStyle == 1 ">
            <div class="course-item" v-for="(item,i) in dataList" :key="i" @click="open(item)">
                <ktj-create-bg :src="item.defaultpic" class="item-images">
                    <span class="is-relay" v-if="item.coursehour == 1 && dataType === 'course'">连载</span>
                    <span class="is-relay" v-else-if="dataType === 'class'">
                        {{(item.classlevel == 0 && '大班课') || (item.classlevel == 1 && '小班课') || (item.classlevel == 2 && '一对一') || ''}}
                    </span>
                </ktj-create-bg>
                <div class="main-con">
                    <div class="course-name">
                        {{item.title}}
                    </div>

                    <div class="course-num" v-if="dataType === 'course'">
                        <span v-if="item.coursehour == 1">已开课{{item.hourcount}}节 | 预计更新{{item.expecthour}}节课</span>
                    </div>
                    <div class="course-num" v-else-if="dataType === 'class'">
                        开始时间：{{item.timeSlotStart}}
                    </div>
                    <div class="course-num" v-else-if="dataType === 'column'">{{item.shortdesc}}</div>
                    <div class="last-con">
                        <span class="learning-num" v-if="dataType === 'column'">已更新{{item.qs}}期</span>
                        <span class="learning-num" v-else>{{item.studentcount}}人报名</span>
                        <span class="charge">{{item.price}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!--样式2-->
        <div class="drag-course-style2" v-else-if="dataStyle == 2">

            <div class="item-first" @click="open(dataList[0])">
                <ktj-create-bg :src="dataList[0].defaultpic" class="item-images">
                    <div class="info">
                        <div class="name">{{dataList[0].title}}</div>
                        <div class="sen">{{dataList[0].shortdesc}}</div>
                    </div>
                </ktj-create-bg>
            </div>
            <div class="item-wrap">
                <div :class="index > 0 && 'item'" v-for="(item,index) in dataList" :key="index" @click="open(item)">
                    <div v-if="index > 0">
                        <ktj-create-bg class="item-images" :src="item.defaultpic" />
                        <div class="name">{{item.title}}</div>
                        <div class="sen">{{item.shortdesc}}</div>
                    </div>
                </div>
            </div>

        </div>
        
        <!--样式3-->
        <div class="drag-course-style3" v-else-if="dataStyle == 3">

           <div class="item" v-for="(item,index) in dataList" :key="index" @click="open(item)">
                <ktj-create-bg :src="item.defaultpic" class="item-images">
                    <div class="item-type" v-if="item.courseType == 1">
                        <i class="eva-icon play-circle-outline"></i>
                    </div>
                    <div class="item-type" v-else-if="item.courseType == 2">
                        <i class="eva-icon video-outline"></i>
                    </div>
                    <div class="item-type" v-else-if="item.courseType == 3">
                        <i class="eva-icon headphones-outline"></i>
                    </div>
                    <div class="item-type" v-else-if="item.courseType == 4">
                        <i class="eva-icon image-outline"></i>
                    </div>
                    
                </ktj-create-bg>
                <div class="name">{{item.title}}</div>
                <div class="sen" v-if="dataType === 'column'">已更新{{item.qs}}期</div>
                <div class="sen" v-else>{{item.studentcount}}人报名</div>
                <div class="sen"><span class="charge">{{item.price}}</span></div>
            </div>
        </div>
        <!--样式4-->
        <div class="drag-course-style4" v-else-if="dataStyle == 4">
            <div class="item" v-for="(item,index) in dataList" :key="index" @click="open(item)">
                <div class="item-inner">
                    <ktj-create-bg class="item-images" :src="item.defaultpic" />

                    <div class="name">{{item.title}}</div>
                    <div class="sen" v-if="dataType === 'course' && item.coursehour == 1">已开课{{item.hourcount}}节 | 预计更新{{item.expecthour}}节课</div>
                    <div class="sen" v-else-if="dataType === 'class'">
                        <span v-if="item.classlevel == 0">大班课堂</span>
                        <span v-else-if="item.classlevel == 1">小班课堂</span>
                        <span v-else-if="item.classlevel == 2">一对一课堂</span>
                        | 线上课堂
                    </div>
                    <div class="sen" v-else-if="dataType === 'column'">
                        专栏 | 已更新{{item.qs}}期
                    </div>
                    <div class="sen" v-else>
                        {{item.shortdesc}}
                    </div>
                    <div class="bm"><span class="num">已有<font>{{item.studentcount || item.soldnum}}</font>人报名</span><span class="charge" :class="item.price === '免费' && 'charge-free'"><span class="rmb" v-if="item.price.indexOf('￥') !== -1">￥</span>{{item.price.replace('￥','')}}</span></div>
                </div>
            </div>
        </div>
        <!--样式5-->
        <div class="drag-course-style5" v-else-if="dataStyle == 5">
            <swiper :options="swiperOption">
                <swiper-slide class="item" v-for="(item,index) in dataList" :key="index">
                    <ktj-create-bg class="item-images" :src="item.defaultpic" @click="open(item)" />
                    <div class="name" @click="open(item)">
                        <div class="type" v-if="dataType === 'course'">
                            <span v-if="item.courseType == 1">点播</span>
                            <span v-else-if="item.courseType == 2">语音</span>
                            <span v-else-if="item.courseType == 3">音频</span>
                            <span v-else-if="item.courseType == 4">图文</span>
                        </div>
                        <div class="type" v-else-if="dataType === 'class'">
                            <span v-if="item.classlevel == 0">大班</span>
                            <span v-else-if="item.classlevel == 1">小班</span>
                            <span v-else-if="item.classlevel == 2">一对一</span>
                        </div>
                        <div class="type" v-else-if="dataType === 'column'">
                            <span>专栏</span>
                        </div>
                        {{item.title}}
                        
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <!--样式6-->
        <div class="drag-course-style6" v-else-if="dataStyle == 6">
            <div class="item" v-for="(item,index) in dataList" :key="index" @click="open(item)">
                <div class="item-info">
                    <ktj-create-bg class="item-images" :src="item.defaultpic" />
                    <div class="type" v-if="dataType === 'course'">
                        <span v-if="item.courseType == 1">点播</span>
                        <span v-else-if="item.courseType == 2">语音</span>
                        <span v-else-if="item.courseType == 3">音频</span>
                        <span v-else-if="item.courseType == 4">图文</span>
                    </div>
                    <div class="type" v-else-if="dataType === 'class'">
                        <span v-if="item.classlevel == 0">大班</span>
                        <span v-else-if="item.classlevel == 1">小班</span>
                        <span v-else-if="item.classlevel == 2">一对一</span>
                    </div>
                    <div class="type" v-else-if="dataType === 'column'">
                        <span>专栏</span>
                    </div>
                    <div class="sen">
                        <i class="eva-icon user-outline"></i>{{item.studentcount || item.soldnum}}
                        <span class="price">{{item.price}}</span>
                    </div>
                    
                </div>
                <div class="name">{{item.title}}</div>
            </div>
            
        </div>
    </div>
</template>
<script>
import {getViewRoute} from '@/utils'
export default {
    name:'Course',
    props:[
        'dataList',
        'dataStyle',
        'dataType'
    ],
    data(){
        return {
            swiperOption:{
                slidesPerView:1.7,
                spaceBetween:15
            }
        }
    },
    methods:{
        open(item){

            if(this.dataType === 'course'){
                this.$navigateTo('/course/'+item.courseid)
            }else if(this.dataType === 'class'){
                this.$navigateTo('/class/'+item.classid)
            }else if(this.dataType === 'column'){
                this.$navigateTo('/column/'+item.columnid)
            }
            
        }
    }
}
</script>

<style scoped>
/*通用*/
.item-images{
    overflow: hidden;
    border-radius: 0.15rem;
    position: relative;
}

.item-type{
    width: 24px;
    height: 18px;
    background: rgba(0,0,0,0.6);
    position: absolute;
    right: 10px;
    bottom: 10px;
    border-radius: 3px;
    text-align: center;
}
.item-type .eva-icon{
    width: 16px;
    height: 16px;
    display: block;
    margin:.05rem auto;
}

/*默认样式*/
.drag-course-default{
    background: #fff;
}
.drag-course-default .course-item {
  padding:10px 15px 10px 150px;
  position: relative;
  min-height: 74px;
  border-radius: 3px;
}

.drag-course-default .item-images {
  height: 74px;
  width: 120px;
  position: absolute;
  left: 15px;
  top: 10px;
}

.drag-course-default .is-relay {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  letter-spacing: 0;
  background: rgba(0,0,0,.5);
  border-radius: 4px 0 0 0;
  padding: 0 5px;
  font-size: 10px;
}

.drag-course-default .main-con .course-name {
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bold;
  overflow: hidden;
  font-size: 14px;
  color: #424242
}
.drag-course-default .course-num{
  white-space: nowrap;
  text-overflow: ellipsis
}
.drag-course-default .course-num,
.drag-course-default .last-con{
  color:#b8b0b0;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  margin-top: 3px;
}

.drag-course-default .last-con .charge{
  float: right;
  color: #e64a3b
}

/*样式2*/
.drag-course-style2{background: #fff;}

.drag-course-style2 .name,
.drag-course-style2 .sen{
 overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.drag-course-style2 .item-first{padding:10px 15px 15px 15px;  }
.drag-course-style2 .item-first .info{  position: absolute;width:100%; z-index: 2; padding: 0 10px;box-sizing: border-box;top:50%;margin-top:-40px;  color:#fff;}
.drag-course-style2 .item-first .name{font-size:20px;font-weight: bold;}
.drag-course-style2 .item-first .sen{font-size:14px; }
.drag-course-style2 .item-first .name,
.drag-course-style2 .item-first .sen{line-height: 40px;height: 40px;margin:0 10px}
.drag-course-style2 .item-first .item-images{height: 10.5rem; text-align: center;color:#fff; }
.drag-course-style2 .item-first .item-images::before{content: '';width:100%;height: 100%; position: absolute;left:0;top:0;background: rgba(0,0,0,0.4); z-index: 1;}

.drag-course-style2 .item-wrap{ white-space: nowrap; padding: 0 15px 0 0; overflow-x: auto; -webkit-overflow-scrolling: touch;}
.drag-course-style2 .item-wrap .item{width:55%; box-sizing: border-box;padding: 0 0 15px 15px; display: inline-block; vertical-align: top}
.drag-course-style2 .item-wrap .item .item-images{height: 5.5rem;}
.drag-course-style2 .item-wrap .item .name{font-size:14px;height: 22px;line-height: 22px;margin-top:7px;}
.drag-course-style2 .item-wrap .item .sen{color:#999;height: 22px; line-height: 22px;}

/*样式3*/
.drag-course-style3{
    background: #fff;
    padding-right: 15px
}

.drag-course-style3 .name,
.drag-course-style3 .sen{
 overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.drag-course-style3 .item{width:50%; box-sizing: border-box;padding: 10px 0 10px 15px; display: inline-block; }
.drag-course-style3 .item .item-images{height:5.3rem}
.drag-course-style3 .item .name{font-size:14px;height: 22px;line-height: 22px;margin-top:7px;}
.drag-course-style3 .sen{color:#999;height: 22px; line-height: 22px;}

.drag-course-style3 .sen .charge{
  color: #e64a3b
}

/*样式4*/
.drag-course-style4{
    background: #fff;
    padding-bottom: 15px;
}
.drag-course-style4 .item-images {
  height: 100%;
  width: 110px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0px;

}
.drag-course-style4 .item{
    padding: 10px 15px 5px 15px;
    
}
.drag-course-style4 .item-inner{
    position: relative;
    height: 100px;
    padding:10px 20px 0 125px;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    color:#787878;
}
.drag-course-style4 .item .name{
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    font-weight: bold;
    color:#777;
    white-space: nowrap;
    text-overflow: ellipsis
}
.drag-course-style4 .item .sen{
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    font-size: 14px;
}
.drag-course-style4 .item .bm{
    margin-top: 10px;
    
}
.drag-course-style4 .item .bm .num{
    float: right;
}
.drag-course-style4 .item .bm .num font{
    color:#fb7901
}
.drag-course-style4 .item .bm .charge{
    font-size: 18px;
    color:#fb7901;
}
.drag-course-style4 .item .bm .charge-free{
    font-size: 14px;
}
.drag-course-style4 .item .bm .rmb{
    font-size: 14px;
    position: relative;
    top: -2px;
}
/*样式5*/
.drag-course-style5 {
    background: #fff;
   
}
.drag-course-style5 .item{
    padding: 10px 0;
}
.drag-course-style5 .swiper-container{
    padding: 0 15px;
}
.drag-course-style5 .item-images {
    height: 5.8rem
}

.drag-course-style5 .name{
    height:40px;
    line-height: 40px;
    overflow: hidden;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #5a5a5a;
}
.drag-course-style5 .name .type{
    float: right;
    color:#999;
    margin-left: 20px;
}
/*样式6*/
.drag-course-style6{
    background: #fff;
    padding-right: 15px
}

.drag-course-style6 .item{width:50%; box-sizing: border-box;padding: 10px 0 10px 15px; display: inline-block; }
.drag-course-style6 .item-info{
    position: relative;
    overflow: hidden;
}
.drag-course-style6 .item-images{height:5.3rem}
.drag-course-style6 .type{
    min-width: 30px;
    height: 20px;
    padding: 0 5px;
    position:absolute;
    background: linear-gradient(to right,#599fe0,#7a78e5);
    text-align: center;
    border-radius: 3px;
    line-height: 20px;
    left: 0;
    top: 0;
    color:#fff;
    z-index: 9;
}
.drag-course-style6 .sen{
    height: 20px;
    line-height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background:rgba(0,0,0,0.4);
    width:100%;
    color:#fff;
    padding: 0 10px;
    box-sizing: border-box
}
.drag-course-style6 .sen .eva-icon{
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 3px;
}
.drag-course-style6 .sen .price{
    float: right
}
.drag-course-style6 .name{
    height:40px;
    line-height: 40px;
    overflow: hidden;
    font-size: 14px;
    color: #5a5a5a;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
