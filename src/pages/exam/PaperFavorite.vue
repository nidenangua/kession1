<template>
  <div>
    <ktj-tab :tab-info="tabInfo" @change="changeTab"/>
    <ktj-page-scroll-container
      v-if="list.length"
      :page="p"
      :page-count="pageCount"
      @page-change="getlist"
    >
      <div class="paper__list">
        <div class="paper__item" v-for="(item,i) in list" :key="i">
          <div class="paper__item-icon">
            <img src="@/assets/exam/exam_position.png">
          </div>
          <div class="paper__item-txt">
            <div class="paper__item-tit">{{item.tk.title}}</div>
          </div>
          <div class="paper__item-cancle" @click="check(item.tkid)">
            <span>查</span>
          </div>
        </div>
      </div>
    </ktj-page-scroll-container>
    <ktj-empty msg="暂无数据~" v-else-if="!list.length && loaded"/>
  </div>
</template>

<script>
import { getIsScrolltolower } from "@/utils";
import { getMyCollect } from "@/api/exam";
export default {
  name: "",
  data() {
    return {
      tabInfo: {
        options: ["单题收藏", "整卷收藏"],
        current: 0,
        values: [2, 1]
      },
      type: 2,
      categoryid: this.$route.query.categoryid,
      list: [],
      p: 1,
      pageCount: null,
      maxpage: 10,
      loaded: false
    };
  },
  methods: {
    changeTab(val) {
      console.log(val);
      this.type = val;
      this.getlist();
    },
    getlist(p = 1) {
      this.p = p;
      this.$showLoading();
      getMyCollect({
        type: this.type,
        categoryid: this.categoryid,
        p: p
      }).then(res => {
        this.list = this.recodeList.concat(res.list);
        this.p = res.page.now_page;
        this.pageCount = res.total_pages;
        this.loaded = true;
        this.$hideLoading();
      });
    },
    check(tkid) {
      this.$router.push({
        path: "/exam/CvAnalysis",
        query: {
          tkid: tkid
        }
      });
    }
  },
  activated() {
    (this.type = 2),
      (this.categoryid = this.$route.query.categoryid),
      (this.list = []);
    this.p = 1;
    (this.pageCount = null), this.getlist();
    /**
     * 监听滚动事件
     */
    window.addEventListener("scroll", e => {
      let scrollFlag = getIsScrolltolower();
      if (scrollFlag && this.p < this.pageCount) {
        this.p++;
        this.getList(this.p);
      }
    });
    document.title = "收藏夹";
  }
};
</script>
<style scoped>
.paper__list {
  padding: 0 10px;
  background: #fff;
}
.paper__item {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.paper__item-icon {
  flex: 1;
}
.paper__item-txt {
  flex: 8;
}
.paper__item-cancle {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.paper__item-cancle span {
  display: inline-block;
  border: 1px solid #80c269;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #80c269;
  border-radius: 50%;
  font-size: 14px;
}
.paper__item-icon img {
  width: 20px;
  float: right;
  padding-right: 10px;
  padding-top: 8px;
}
.paper__item-tit {
  font-size: 15px;
  color: #3e4754;
  line-height: 38px;
}
.paper__item-info {
  font-size: 14px;
  color: #999;
}
.paper__item-info i {
  color: rgb(75, 185, 169);
  font-style: normal;
  font-size: 14px;
}

</style>