<template>
  <div>
      <kd-search @enter="goSearch" />
      <ktj-tabs v-model="tabActive" @change="slideTab">
        <ktj-tab-pane :label="item.name" :name="i" v-for="(item,i) in $store.state.module" :key="i"></ktj-tab-pane>
      </ktj-tabs>
      
      <ktj-page-scroll-container v-if="list.length" :page="params.p" :page-count="pageCount" @page-change="getList">
          <kd-course data-type="course" :data-list="list" v-if="params.act === 'appCourse'" />
          <kd-course data-type="class" :data-list="list" v-else-if="params.act === 'appClass'" />
          
      </ktj-page-scroll-container>
      <ktj-empty msg="没有找到任何课程~" type="nogift" v-else-if="loaded" />
      
  </div>
</template>

<script>
import {cloneArray} from '@/utils'
import {getStoreData} from '@/api/store'
/**
 * 存储数据
 */
let dataStorage = {};
export default {
  name: 'CourseList',
  data () {
    return {
      loaded:false,
      pageCount:null,
      tabActive:0,

      /**
       * courseType  课程{type = 2}下的4个类型 1点播 2语音 3音频 4图文 
       */
      params:{
        act:'appCourse',
        callKeyName:'courseList',
        p:1,
        data:{
          //...
        },
        maxperpage:1
      },
      list:[]
    }
  },

  methods:{
    
    /**
     * 搜索
     */
    goSearch(keyword){
      dataStorage = {};
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
      this.loaded = params.loaded || false;
    },
    /**
     * 重置条件
     */
    resetFilter(){
      let M = this.$store.state.module;
      let type = this.$route.query.type || M[0].type;
      let courseType = this.$route.query.courseType;
      let params = {};
      let current;
      for(var i=0;i<M.length;i++){
          let item = M[i];
          
          if(item.type == type){
            
            if(type == 2){
              if(courseType && courseType == item.courseType){
                params = item;
                current = i
                break
              }else if(!courseType){
                params = item;
                current = i
                break
              }
              
            }else{
              params = item;
              current = i
              break
            }
            
          }
      }
      this.tabActive = current || 0;
      if(params.type == 2){
        this.params.act = 'appCourse';
        this.params.data = {
          courseType:params.courseType
        }
        

      }else if(params.type == 1){
        this.params.act = 'appClass'
        this.params.data = {}
      }
      
      /**
       * 查出数据存储的数据列表
       */
      let currentItem = this.$store.state.module[this.tabActive];
      let storage = dataStorage[`data${currentItem.type}${currentItem.courseType}`];

      if(storage){
         this.resetParams(storage)
      }else{
        this.resetParams();
        this.getList()
      }
    },
    /**
     * 选项卡切换
     */
    slideTab(index){
      let params = this.$store.state.module[index];
      
      let queryData = {
        type:params.type
      }
      if(params.type == 2){
        queryData.courseType = params.courseType
      }
      let keyword = this.$route.query.key || ''
      if(keyword){
        queryData.key = keyword
      }
      this.$router.push({
        name:'CourseList',
        query: queryData
      })
      this.$store.ready(()=>{
        this.resetFilter()
      })
    },
    /**
     * 获取数据列表
     */
    getList(p=1){

      this.$showLoading()
      this.params.p = p
      let keyword = this.$route.query.key || '';
     
      this.params.data.sql_or_like = {
        title:keyword
      }
      
      getStoreData([this.params]).then(data=>{
				console.log(data)
        let res = data.courseList;
        this.pageCount = res.page.total_pages;
        this.list = this.list.concat(res.list);
        this.loaded = true;
        let currentItem = this.$store.state.module[this.tabActive];
        dataStorage[`data${currentItem.type}${currentItem.courseType}`] = {
          loaded:true,
          list:cloneArray(this.list),
          p:this.params.p,
          pageCount:this.pageCount
        }
        this.$hideLoading()
      })
    }
  },

  activated(){
    document.title = '发现'
    this.$store.ready(()=>{

      /**
       * 初始化条件，获取课程
       */
      this.resetFilter()

      
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
