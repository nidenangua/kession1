<template>
    <div class="ktj-preview-bg" v-if="visible && dataList.length">
        <div class="ktj-preview__pagination">
            {{current}}/{{dataList.length}}
        </div>
        <ktj-swiper class="ktj-preview__swiper" :options="swiperOption" ref="previewSwiper">
            <ktj-swiper-slide v-for="(item,index) in dataList" :key="index" :style="{height:windowHeight+'px'}">
                <div class="swiper-zoom-container" @click="visible = false">
                    <img :src="item.src" /> 
                </div>
            </ktj-swiper-slide>
        </ktj-swiper>
    </div>
</template>
<script>
export default {
    name:'Preview',
    data(){
        let _this = this
        return {
            visible:false,
            current:1,
            windowHeight:window.innerHeight,
            swiperOption:{
                initialSlide:0,
                zoom: true,
                lazy: {
                    // 设置图片懒加载
                    loadPrevNext: true
                },
                on:{
                    slideChangeTransitionStart(){
                        _this.current = this.realIndex + 1
                    }
                }
            },
            dataList:[]
        }
    },
    mounted(){
        window.addEventListener('resize',()=>{
            this.windowHeight = window.innerHeight
        })
    }
}
</script>
<style scoped>
.ktj-preview-bg{
    background: #000;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    overflow: hidden;
}
.ktj-preview__pagination{
    position: fixed;
    left: 0;
    width: 100%;
    height: 32px;
    line-height: 32px;
    top: 0;
    text-align: center;
    color:#fff;
    z-index: 11;
    background:rgba(0,0,0,0.5)
}

.swiper-zoom-container img{
    max-width: 100%;
    max-height: 100%;
    position: relative;
    z-index: 10;
}

</style>

