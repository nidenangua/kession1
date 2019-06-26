<template>
  <div>
    <ktj-page-scroll-container
      v-if="tklist.length"
      :page="p"
      :page-count="pageCount"
      @page-change="getlist"
    >
      <div class="paper__list">
        <ul>
          <li v-for="(item,i) in tklist" :key="i" @click="doExerciese(item.paperId)">{{item.title}}</li>
        </ul>
      </div>
    </ktj-page-scroll-container>
    <ktj-empty msg="暂时还未有相关试卷" v-else-if=" !tklist.length && loaded"/>
  </div>
</template>

<script>
import { getIsScrolltolower } from "@/utils";
import { getPaperList } from "@/api/exam";
export default {
  name: "category",
  data() {
    return {
      tklist: [],
      categoryid: this.$route.query.categoryid,
      pageCount: null,
      p: 1,
      loaded: false
    };
  },
  activated() {
    this.tklist = [];
    this.getlist();
  },
  methods: {
    doExerciese(id) {
      this.$router.push({
        path: "/exam/DoExercise",
        query: {
          paperId: id,
          categoryid: this.categoryid
        }
      });
    },
    getlist(p = 1) {
      this.$showLoading();
      this.p = p;
      getPaperList({
        categoryid: this.categoryid
      }).then(res => {
        console.log(res);
        this.$showLoading();
        this.tklist = this.tklist.concat(res.list);
        this.loaded = true;
        this.p = res.page.now_page;
        this.pageCount = res.page.total_pages;
        this.$hideLoading();
      });
    }
  }
};
</script>
<style scoped>
.paper__list {
  padding: 0 10px;
}

.paper__list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paper__list ul {
  width: 100%;
}
.paper__list li {
  font-size: 14px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}
</style>
