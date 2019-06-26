<template>
  <div>
    
    <div class="component-box" v-for="(item,i) in components" :key="i" :drag="item.type" :drag-index="i" :class="item.title && item.title.style == 3 && item.title.more && item.title.more.length && 'component-by-FT'">

        <!--标题-->
        <kd-title v-if="item.title" :data-title="item.title" />
        
        <kd-store-info  v-if="item.type === 'storeinfo'" />

        <!--搜索条-->
        <kd-search v-else-if="item.type === 'search'" @enter="goSearch" />

        <!--轮播图-->
        <kd-carousel v-else-if="item.type === 'swiper'" :data-list="item.list" :data-ratio="item.ratio" :style="item.style" />

        <!--富文本-->
        <kd-richtext v-else-if="item.type === 'richtext'" :data-code="item.code" />
        
        <!--banner-->
        <kd-banner v-else-if="item.type === 'banner'" :data-src="item.src" :data-url="item.url" />

        <!--导航-->
        <kd-nav v-else-if="item.type === 'nav'" :data-list="item.list" :data-style="item.style" />

        <!--会员卡-->

        <kd-vip-card v-else-if="item.type === 'vipcard'" :data-list="item.list" :data-style="item.style" />

        <!--新闻-->
        <kd-news v-else-if="item.type === 'news'" :data-list="item.list" :data-style="item.style" />

        <!--课程、直播、专栏-->
        <kd-course v-else-if="item.type === 'course' || item.type === 'class' || item.type === 'column'" :data-type="item.type" :data-list="item.list" :data-style="item.style" />
				
        <!-- 名师大咖 -->
				<kd-teacher v-else-if="item.type === 'teacher'" :data-list="item.list" :data-style="item.style" />
    </div>
    
  </div>
</template>

<script>

import {getStoreData,getStoreInfo} from '@/api/store'

export default {
  name: 'index',
  data () {
    return {
      loaded:false,
      components:[]
    }
  },
  methods:{
    goSearch(key){
      this.$router.push({
        path:'/course',
        query:{
          key:key
        }
      })
    },
    loadComponents(){
      this.loaded = false;
      this.$showLoading();
    
      /**
       * 获取配置信息
       */
      this.$store.ready(()=>{
        /**
         * 请求对应数据
         */
        let params = [];
        let components = [];
        this.$store.state.configjson.map(item=>{
          let keys = Object.keys(item);
          let obj = {};
          keys.map(k=>{
            obj[k] = item[k]
          });
          components.push(obj);
          if(item.api){
            params.push(item.api)
          }
        })
        /**
         * 获取数据
         */
        getStoreData(params).then(res=>{
					console.log(res)
          let keys = Object.keys(res);
          keys.map(k=>{
            components.map(item=>{
              if(item.api && item.api.callKeyName === k){
                item.list = res[k].list
								console.log(item.list)
              }
            })
          });
          this.components = components;
					console.log(this.components)
          this.loaded = true;
          this.$hideLoading()
        })
      })
    }
  }, 
  mounted(){
    
    this.loadComponents()
		
    if(window.name === 'mphone'){
      window.APP = this
    }

  },
  activated(){
    if(this.$route.query.reload == 1 && this.loaded){
      this.loadComponents()
    }
    this.$store.ready(()=>{
      document.title = this.$store.state.info.wititle
    })

  }
}
</script>
<style scoped>
.component-by-FT{
 position: relative;
 padding-bottom: 44px;
}
</style>
