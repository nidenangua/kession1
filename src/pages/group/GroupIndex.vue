<template>
  <div>
      <kd-search @enter="getList()" :value="key" />    

      <div v-if="list.length">
        <kd-group :data-list="list" />
        <div class="ktj-nomore" v-if="pageCount !== null && p >= pageCount" >
            没有更多社群了~
        </div>
        <div class="ktj-nomore" v-else>
            上拉加载更多
        </div>
      </div>
      <ktj-empty msg="没有找到任何社群~" v-else-if="!list.length && loaded" />
      
      <store-footer />
 </div>

</template>

<script>
import {getIsScrolltolower} from '@/utils'
import {getGroupList} from '@/api/group'

export default {
  name: 'GroupIndex',
  data () {
    return {
      loaded:false,
      list:[],
      pageCount:null,
      key:this.$route.query.key,
      p:1
    }
  },
  watch:{
    '$route.query.key'(){
      this.getList()
    }
  },
  methods:{
    getList (p=1) {
      this.$showLoading() 
      this.key = this.$route.query.key;
      let params = {
        p:p,
        maxperpage:10,
        data:{
          sql_or_like:{
            status:1
          }
        }
      }
      if(this.key){
       params.data.sql_or_like.title = this.key
      }
      /**
       * 获取社群列表
       */
      getGroupList(params).then(res=>{
          if(res && res.list){
           
            if(p === 1){
              this.list = res.list;
            }else{
              this.list = this.list.concat(res.list)
            }
            this.pageCount = res.page.total_pages
          }
          this.loaded = true
          this.$hideLoading()
          
      })
    }
  },
  mounted() {
    
    this.getList()
    /**
     * 监听滚动事件
     */
    window.addEventListener('scroll',e=>{
        let scrollFlag = getIsScrolltolower();
        if (scrollFlag &&  this.p < this.pageCount){
            this.p++;
            this.getList(this.p)
        }
    })
  },

 activated() {
   document.title= '社群中心'
 }

}

</script>
