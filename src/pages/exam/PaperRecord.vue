<template>
  <div>
    <ktj-tab :tab-info="tabInfo" @change="changeTab"/>
    <ktj-page-scroll-container
      v-if="recodeList.length"
      :page="p"
      :page-count="pageCount"
      @page-change="getlist"
    >
      <div class="paper__list">
        <div class="paper__item" v-for="(item,i) in recodeList" :key="i" @click="doRecode(item)">
          <div class="paper__item-title" v-if="type==1">{{item.title}}</div>
          <div class="paper__item-title" v-if="type==4">{{item.type}}</div>
          <div class="paper__item-txt">
            <span class="paper__item-staus checked" :class="{iscorrected:item.iscorrect == 1}" v-if="type==1" >{{(item.iscorrect == 0 && '未批改') || (item.iscorrect == 1 && '已批改')}}</span>
            <span >
              总题数{{item.tk_num}}，已答
              <i>{{item.do_num}}</i>题;&nbsp;&nbsp;答题时长
              <i>{{item.time || 0}}</i>分
            </span>
          </div>
        </div>
      </div>
    </ktj-page-scroll-container>
    <ktj-empty msg="暂无数据~" v-else-if="!recodeList.length && loaded"/>
  </div>
</template>
<script>
import { getExamRecordList,getTestRecordList } from "@/api/exam";
export default {
  name: "",
  data() {
    return {
      tabInfo: {
        options: ["整卷练习", "随机练习"],
        current: 0,
        values: [1, 2]
      },
      p: 1,

      pageCount: null,
      categoryid: this.$route.query.categoryid,
      type: 1,
      recodeList: [],
      loaded: false
    };
  },
  methods: {
    changeTab(key) {
      this.type = key;
      this.recodeList = [];
      this.getlist();
    },
    getlist(p = 1) {
      let variable = getExamRecordList
      this.$showLoading();
      this.p = p;
      console.log(this.type)
      if(this.type == 1) {
        variable = getExamRecordList
      }else {
       variable = getTestRecordList  
      }
      variable({
        categoryid: this.categoryid,
        p:p
      }).then(res=>{
        this.recodeList = this.recodeList.concat(res.list);
        this.pageCount = res.page.total_pages;
        this.loaded = true;
        this.$hideLoading();
      })
      // getExamRecord({
      //   categoryid: this.categoryid,
      //   type: this.type,
      //   maxperpage: 10,
      //   p:p
      // }).then(res => {
      
      //   console.log(res.page);
      // });
    },
    doRecode(arr){
      this.$router.push({
        path:'/exam/DoRecord',
        query:{
          id:arr.id,
          type:this.type
        }
      })
    }
  },
  activated() {
    this.pageCount = null;
    this.categoryid = this.$route.query.categoryid;
    this.type = 1;
    this.recodeList = [];
    this.getlist();
    document.title = "做题记录";
  }
};
</script>
<style scoped>
.paper__list {
  padding: 0 10px;
  background: #fff;
}
.paper__item {
  padding: 20px 0;
}
.paper__item-title {
  font-size: 15px;
  color: #1e4754;
  margin-bottom: 10px;
}
.paper__item-txt span {
  font-size: 12px;
  color: #97a0ab;
}
.paper__item-txt span i {
  font-style: normal;
  color: #444c59;
  padding: 0 1px;
}
.paper__item-txt .paper__item-staus {
  display: inline-block;
  padding: 2px 10px;
  line-height: 16px;
  text-align: center;
  color: #fff;
  background: #eb6100;
}
.paper__item-txt .iscorrected {
  background: #5185F7
}
</style>