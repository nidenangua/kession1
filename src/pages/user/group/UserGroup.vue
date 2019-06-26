<template>
  <div class="ktj-mt10">
    <ktj-page-scroll-container :page="p" :page-count="pageCount" @page-change="getList" v-if="list.length">
        <drag-group :data-list="list" />
    </ktj-page-scroll-container>
    <ktj-empty class="ktj-bg-white" msg="暂时还没有加入任何社群~" type="notest" v-else-if="loaded" />   
  </div>

</template>

<script>

import {getMyTeamList} from '@/api/group'
export default {
  name: 'UserGroup',
  data () {
    return {
      list:[],
      pageCount:null,
      loaded:false,
      p:1
    }
  },
  methods:{
    getList (p=1) {
       if(p == 1){
        this.loaded = false
        this.list = []
      }
      this.p = p
      this.$showLoading() 
      getMyTeamList({
          p:this.p,
          maxperpage:10
      }).then(res=>{ 
          this.list = this.list.concat(res.list)
          this.pageCount = res.page.total_pages
          this.loaded = true
          this.$hideLoading()
      })
    }

  },
  mounted() {
    this.getList()
    
  }
 
}

</script>



