<template>
  <div>
      <div class="newslist" v-if="list.length > 0">
		
          <a class="newslist-item line" @click="open(item.id)" v-for="(item,i) in list" :key ="i">
              <div class="img-wrap">
                <img :src="item.defaultpic">
              </div>
              <div class="info">
                  <div class="title">{{item.title}}</div>
                  <div class="infos">{{item.abstract}}</div>
              </div>
          </a>

          <div class="ktj-nomore" v-if="pageCount !== null && params.p >= pageCount">
              没有更多新闻了~
          </div>
          <div class="ktj-nomore" v-else>
              上拉加载更多
          </div>

        </div>
     	<ktj-empty msg="暂时没有找到相关的文章~" type="notest" v-else-if="loaded" />

        <store-footer />
    
  </div>
</template>

<script>
import {getIsScrolltolower} from '@/utils'
import {getNews} from '@/api/news'
export default {
  name: 'news',
  data () {
    return {
        pageCount:null,
        loaded:false,
        params:{
            p:1,
            maxperpage:10
        },
        list:[]
    }
  },
  methods:{
    getList(){
        this.$showLoading()
        getNews(
            this.params
        ).then(res=>{
            this.pageCount = res.page.total_pages;
            this.list = this.list.length ? this.list.concat(res.list) : res.list;
            this.loaded = true;
            this.$hideLoading();
        })
    },
    open(id){
        this.$router.push(`/news/${id}`)
    }
  },
  mounted(){
        this.getList()
        /**
         * 监听滚动事件
         */
        window.addEventListener('scroll',e=>{
            let scrollFlag = getIsScrolltolower()
            if (scrollFlag &&  this.params.p < this.pageCount){
                this.params.p++
                this.getList()
            }
        })
  },
  activated(){
      document.title = '新闻'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
.newslist-item{
	display: flex;
	padding: 15px;
	background: #fff;
}
.newslist-item:first-child{
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.newslist-item:last-child::after{
    display: none
}
.newslist-item .img-wrap{
	width:110px;
	height: 80px;
	margin-right: 10px;
}
.newslist-item .img-wrap img{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 5px;
}
.newslist-item .info{
	flex: 1;
	overflow: hidden;
	height: 80px;
	position: relative;
}
.newslist-item .info .title{
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	width: 100%;
	font-size: 16px;
	font-weight: bold;
	line-height: 24px;
}
.newslist-item .info .infos{
	width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
	font-size: 12px;
	color: #aaa;
	line-height: 1.8;
	margin-top: 10px;

}
</style>
