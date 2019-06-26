<template>
  <div>
      <kd-search @enter="goSearch" />
      <div v-if="list.length">
          <kd-course data-type="column" :data-list="list" />
          <div class="ktj-nomore" v-if="pageCount !== null && params.p >= pageCount">
              没有更多课程了~
          </div>
          <div class="ktj-nomore" v-else>
              上拉加载更多
          </div>
      </div>
      <ktj-empty msg="没有找到任何专栏~" type="nogift" v-else-if="loaded" />
      <store-footer />
  </div>
</template>

<script>
import {getColumnList} from '@/api/course'
import {getIsScrolltolower} from '@/utils';

/**
 * 存储数据
 */
export default {
  name: 'ColumnList',
  data () {
    return {
      loaded:false,
      pageCount:null,
      params:{
        p:1,
        maxperpage:10,
        data:{
          sql_or_like:{
            title:''
          }
        }
      },
      list:[]
    }
  },
  methods:{
    
    /**
     * 搜索
     */
    goSearch(key){
      this.params.data.sql_or_like.title = key;
      this.resetParams();
      this.getList()
    },
    /**
     * 重置参数
     */
    resetParams(params){
      params = params || {};
      this.pageCount = params.pageCount || null;
      this.params.p = params.p || 1;
      this.list = params.list || [];

    },
    
    /**
     * 获取数据列表
     */
    getList(){
      this.$showLoading()
      getColumnList(this.params).then(res=>{
    
        this.pageCount = res.page.total_pages;
        this.list = this.list.length ? this.list.concat(res.list) : res.list;
        this.loaded = true;
        this.$hideLoading()
      })
    }
  },
  activated(){
    document.title = '专栏'
    
  },
  mounted(){
    this.getList()
    /**
     * 监听滚动事件
     */
    window.addEventListener('scroll',e=>{
        let scrollFlag = getIsScrolltolower();
        if (scrollFlag &&  this.params.p < this.pageCount){
            this.params.p++;
            this.getList()
        }
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>


/*导航栏*/
.common-list{
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	background: #fff;
	display: -webkit-box;  
  display: -moz-box;  
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.common-list .list-item{
	-webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  color:#666
}

.common-list .list-item:last-child:after{
	display: none;
}
.common-list .list-item.active{
	color: #e64a3b;
}

.common-list .list-item.active span{
  position: relative;
  display: inline-block;
}
.common-list .list-item.active span:after{
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px; 
	background: #e64a3b;
	width:100%
}
</style>
