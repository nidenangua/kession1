<template>
  <div>
    <!--
      type
      订单表里的分类
      0课程 1直播 7专栏

      ctype
      课程的子分类
      1点播 2语音 3音频 4图文
    -->
    <ktj-tabs v-model="tabActive" @tab-click="handleClick">
      <ktj-tab-pane label="课程" name="course"></ktj-tab-pane>
      <ktj-tab-pane label="专栏" name="column"></ktj-tab-pane>
      <ktj-tab-pane label="社群" name="team"></ktj-tab-pane>
    </ktj-tabs>

    <ktj-page-scroll-container v-if="list.length" :page="p" :page-count="pageCount" @page-change="getList">
        <div class="drag-course-default">
            <div class="course-item" v-for="(item,i) in list" :key="i" @click="open(item)">
                <ktj-create-bg class="course-item__image" :src="item.defaultpic">
                  <span class="course-item__type" v-if="item.type == 0 && item.coursetype == 1">点播课程</span>
                  <span class="course-item__type" v-else-if="item.type == 0 && item.coursetype == 2">语音直播</span>
                  <span class="course-item__type" v-else-if="item.type == 0 && item.coursetype == 3">音频课程</span>
                  <span class="course-item__type" v-else-if="item.type == 0 && item.coursetype == 4">图文课程</span>
                  <span class="course-item__type" v-else-if="item.type == 1">直播课程</span>
                </ktj-create-bg>
              
                <div class="main-con">
                    <div class="course-name">
                        {{item.title}}
                    </div>
                    <div class="course-num" v-if="tabActive === 'course'"><span v-if="item.coursehour == 1">已开课{{item.hourcount}}节 | 预计更新{{item.expecthour}}节课</span></div>
                    <div class="course-num" v-else-if="tabActive === 'column'">已更新{{item.nper}}期</div>
                    <div class="course-num" v-else-if="tabActive === 'team'">{{item.member_num}}成员 | {{item.topic_num}}话题</div>
                    <div class="last-con" v-if="hasToken">
                      知识店铺：{{item.storeinfo.storename}}
                    </div>
                    <div class="last-con" v-else>
                      <span v-if="tabActive === 'team'">{{item.description}}</span>
                      <span v-else>{{item.shortdesc}}</span>
                    </div>
                    
                </div>
            </div>
        </div>
        
      </ktj-page-scroll-container>
      
      <ktj-empty type="nolesson" :msg="'你还没有购买任何'+((tabActive === 'course' && '课程') || (tabActive === 'column' && '专栏') || (tabActive === 'team' && '社群'))+'哦~'" v-else-if="loaded" />

  </div>
</template>

<script>
import { getParams,getViewRoute } from '@/utils'
import { getMyPurchase } from '@/api/user'
export default {
  name: 'UserCourse',
  data () {
    return {
      loaded:false,
      pageCount:null,
      hasToken:-1,
      p:1,
      list:[],
      tabActive:'course'
    }
  },
  watch:{
    '$route.query.miniprogramHash'(){
      /**
       * 小程序tabBar切换传入hash值，监听此值对页面数据进行更新
       */
      if(window.__wxjs_environment === 'miniprogram'){
        this.getList()
      }
    }
  },
  methods:{
    open(item){
      let type = item.type
      /**
       * 课程
       */
      let params = getViewRoute(item)
      location.href = item.storeinfo.storeurl + '/#'+params

    },
    handleClick(name){
      this.getList()
    },
    getList(p=1){
      this.$showLoading()
      this.p = p
      if(p==1){
        this.list = []
      }
      let params = {
        p:p,
        maxperpage:10,
        gettype:this.tabActive
      }
      let par = getParams()
      if(par.h5token){
          params.h5token = par.h5token
          this.hasToken = 1
      }else{
          this.hasToken = 0
      }
      getMyPurchase(params).then(res=>{
        if(res.result === 'success'){
          this.list = this.list.concat(res.values)
          this.pageCount = res.page.total_pages
    
        }
        
        this.loaded = true
        this.$hideLoading()
      })
      
    }
  },
  activated(){
    document.title = '已购'
    this.getList()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>


/*默认样式*/
.drag-course-default{
    background: #fff;
    margin-top: 10px;
}
.drag-course-default .course-item {
  padding:10px 15px 10px 150px;
  position: relative;
  min-height: 74px;
}

.drag-course-default .course-item__image {
  height: 74px;
  width: 120px;
  position: absolute;
  left: 15px;
  top: 10px;
  overflow: hidden;
}

.drag-course-default .course-item__type {
  position: absolute;
  top: 5px;
  left: 5px;
  color: #fff;
  letter-spacing: 0;
  background: rgba(0,0,0,.5);
  border-radius: 30px;
  padding: 2px 6px;
  font-size: 10px;
}

.drag-course-default .main-con .course-name {
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bold;
  overflow: hidden;
  font-size: 14px;
  color: #424242
}
.drag-course-default .course-num{
  white-space: nowrap;
  text-overflow: ellipsis
}
.drag-course-default .course-num,
.drag-course-default .last-con{
  color:#b8b0b0;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  margin-top: 3px;
}

.drag-course-default .last-con .charge{
  float: right;
  color: #e64a3b
}

</style>
