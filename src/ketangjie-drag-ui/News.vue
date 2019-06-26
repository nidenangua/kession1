<template>
    <div class="drag-news">
        <div class="item" @click="open(item.id)" v-for="(item,i) in dataList" :key="i">
            <ktj-create-bg class="images" :src="item.defaultpic" />
           
            <div class="name">{{item.title}}</div> 
            <div class="sen"><span>{{item.inputer || $store.state.info.wititle}}</span><span>{{item.adddate}}</span></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'News',
    props:[
        'dataList',
        'dataStyle'
    ],
    methods:{
        open(id){
            this.$navigateTo(`/news/${id}`)
        }
    }
}
</script>
<style scoped>
.drag-news{
    background: #fff;
}
.drag-news .item{ 
    padding:10px 150px 10px 15px;
    position: relative;
    min-height: 74px;
}
.drag-news .item .images{
    height: 74px;
    width: 120px;
    background-color: #f5f5f5;
    overflow: hidden;
    border-radius: 3px;
    position: absolute;
    right: 15px;
    top: 10px;
}
.drag-news .item .images img{
    width:100%;
    min-height: 100%;
}
.drag-news .item .name{
    line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bold;
  overflow: hidden;
  font-size: 14px;
  color: #424242
}
.drag-news .item .sen {
    color:#b8b0b0;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  margin-top: 10px;
}
.drag-news .item .sen span{
    margin-right: 10px
}
</style>

