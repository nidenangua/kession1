<template>
    <div>
        <ktj-swiper :options="swiperOption" :style="{height:swiperHeight+'px'}">
            <ktj-swiper-slide v-for="(item,index) in dataList" :key="index">
                <ktj-create-bg style="height:100%;" :src="item.img" @click="open(item.url)" /> 
            </ktj-swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </ktj-swiper>
    </div>
</template>
<script>
export default {
    name:'Carousel',
    props:[
        'dataList',
        'dataRatio'
    ],
    data(){
        return {
            swiperHeight:document.body.offsetWidth * parseFloat(this.dataRatio),
            swiperOption:{
                autoplay:{
                    disableOnInteraction:false
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    methods:{
        open(url){
           if(url)
                location.href = url
            
        }
    }
}
</script>

<style scoped>

.swiper-slide{
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size:cover
}

.swiper-slide .ktj-create-bg{
    border-radius: 0px;
}

</style>
