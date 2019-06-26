<template>
    <div class="ktj-search" :class="bg && 'ktj-search-'+bg">
        <div class="ktj-search__input_box">
            <input type="serach" class="ktj-search__input" v-model="keyword" id="search" :placeholder="placeholder || '请输入要搜索的内容~'" @keyup="goSearch">
        </div>
        
    </div>
</template>
<script>
import {cloneData} from '@/utils'
export default {
    name:'Search',
    props:['placeholder','type','bg'],
    data(){
        return {
            keyword:this.$route.query.key || ''
        }
    },
    watch:{
        "$route.query"(query){
            this.keyword = query.key || ''
        }
    },
    methods:{
        goSearch(e){
            if(e.keyCode === 13){
               
               let query = cloneData(this.$route.query);
               query.key = this.keyword;
               
               if(this.type){
                   let _name;
                   switch(this.type){
                       case 'course':
                       _name = 'CourseList'
                       break
                   }
                   if(_name){
                        this.$router.push({
                            name:_name,
                            query:query
                        })
                    }
               }else{
                    this.$router.push({
                        path:this.$route.path,
                        query:query
                    })
               }
               this.$emit('enter',this.keyword)
            } 
        }
    }
}
</script>
<style scoped>

/*搜索框*/
.ktj-search{ 
  padding: 10px;
}

.ktj-search__input_box{
  background: #fff;
  border-radius:40px;
  height: 18px;
  padding: 8px 15px;
  position: relative;
}
.ktj-search-gray .ktj-search__input_box{
    background: #f6f6f6
}
.ktj-search__input{
   width: 100%;
   border:0px;
    height: 18px;
    line-height: 18px;
    background: url(../assets/eva-icons/search-outline.png) no-repeat 0 50%;
    background-size: auto 18px;
    font-size: 12px;
    box-sizing: border-box;
    padding-left: 20px;
}

</style>
