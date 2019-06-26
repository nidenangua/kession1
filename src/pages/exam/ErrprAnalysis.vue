<template>
  <div>
    <div class="paper__contianer">
      <swiper :options="swiperOption" ref="choice">
        <swiper-slide v-for="(item,i) in list" :key="i">
          <div class="paper__contianer-title">{{i+1}}、{{item.title}}</div>
          <div class="paper__option-box" v-if="item.tktype==1 ||item.tktype==6">
            <div class="paper__option" v-for="(options,index) in  item.tkinfo.content" :key="index">
              <span>{{letter[index]}}</span>
              {{options}}
            </div>
          </div>
          <div class="paper__answer">
            <div class="paper__answer-box paper__answer-line">参考答案
              <div class="ktj-mt20">
                <span
                  class="paper__option-answer"
                  v-if=" item.tktype != 3"
                  v-for="(answers,i) in item.tkinfo.answer"
                  :key="i"
                >{{answers[0]}}</span>
                <p v-else>{{(list.answer==1&&'正确') ||(list.answer==0&&'错误')}}</p>
              </div>
            </div>
            <!-- <div class="paper__answer-box">
                    您的答案
                    <p>{{list.tkinfo.answer}}</p>
            </div>-->
          </div>
          <div class="paper__answer-analysis">
            <div class="paper__answer-analysis-title">答案解析</div>
            <div class="paper__answer-analysis-content">{{item.tkinfo.analysis}}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { errorTest } from "@/api/exam";

export default {
  name: "",
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      /**
       * 答题id
       */
      categoryid: this.$route.query.categoryid,
      /**
       * 解析列表
       */
      list: {},
      title: "",
      tktype: "",
      /**
       * 选项字母
       */
      letter: []
    };
  },
  activated() {
    this.categoryid = this.$route.query.categoryid;
    this.list = {};
    this.title = "";
    this.tktype = "";
    this.$showLoading();
    errorTest({
      categoryid: this.categoryid
    }).then(res => {
      this.list = res.list;
      this.$hideLoading();
      this.getEN();
    });
    document.title = "查看解析";
  },
  methods: {
    /**
     * 字母26
     */
    getEN(index) {
      var arr = [];
      for (var i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i));
      }
      this.letter = arr;
    }
  }
};
</script>
<style scoped>
.paper__header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.paper__header-second,
.paper__header-day {
  font-size: 13px;
  color: #525b67;
  padding-right: 10px;
}
.paper__header-day {
  display: flex;
  flex: 2;
}
.paper__header-card {
  padding-right: 15px;
}
.paper__header-card img {
  width: 20px;
  margin-top: 2px;
}
.paper__header-sumbit {
  padding: 5px 20px;
  background: #5185f7;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.paper__contianer {
  padding: 20px 15px;
}
.paper__contianer-title {
  font-size: 14px;
  color: #3e4754;
  line-height: 24px;
}
.paper__option,
.paper__answer-area {
  margin: 20px 0;
  line-height: 32px;
  color: #3e4754;
  font-size: 14px;
}
.paper__option span {
  width: 32px;
  height: 32px;
  text-align: center;
  font-size: 15px;
  color: #3e4754;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  margin-right: 20px;
}
.paper__opear {
  float: right;
}
.paper__sign {
  display: inline-block;
}
.paper__sign img {
  width: 11px;
  padding-right: 5px;
  position: relative;
  top: 2px;
}
.paper__collect {
  display: inline-block;
  margin-left: 10px;
}
.paper__collect img {
  width: 11px;
  padding-right: 5px;
}
.paper__contianer {
  position: relatives;
}
.actived {
  background: #5185f7;
  color: #fff !important;
}
.signed,
.collected {
  color: #5185f7;
}
.paper__option-textarea {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  height: 10rem;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin: 10px 0;
}
.paper__answer {
  padding: 15px;
  background: #f5f5f5;
  font-size: 14px;
  margin-top: 10px;
}

.paper__answer p {
  text-align: center;
  line-height: 22px;
}
.paper__answer-analysis-title {
  padding: 20px 0 15px;
  font-size: 14px;
}
.paper__answer-analysis-content {
  font-size: 14px;
}
.error {
  background: #ed7c78 !important;
  color: #fff !important;
}
.right {
  background: #32d432 !important;
  color: #fff !important;
}
.paper__option-answer {
  padding: 0 10px;
}
</style>
