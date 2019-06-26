<template>
  <div>
    <div class="paper__point">
      <div class="paper__point-img">
        <div class="paper__point-score">
          <span>{{sumscore || 0}}</span>
        </div>
        <div class="paper__point-info">得分</div>
      </div>
    </div>
    <div class="paper__opear clearfix">
      <div class="paper__opear-right">
        <div class="paper__icon-sign paper__color_1">
          <i></i>已做
        </div>
        <div class="paper__icon-sign paper__color_5">
          <i></i>正确
        </div>
        <div class="paper__icon-sign paper__color_2">
          <i></i>错误
        </div>
        <div class="paper__icon-sign paper__color_3">
          <i></i>未做
        </div>
        <div class="paper__icon-sign paper__color_4">
          <i></i>标记
        </div>
      </div>
    </div>
    <div class="paper__contianer">
      <div class="paper__option">
        <div class="paper__answer" v-if="answerSheet.length">
          <div
            class="paper__answer-item"
            v-for="(item,i) in answerSheet"
            :key="i"
            :class="{doing:item.doing==0,right:item.reply==1,error:item.reply==0,signed:item.signed==1}"
          >{{i+1}}</div>
        </div>
        <ktj-empty msg="试卷还未批卷，请耐心等待~" v-else-if="!answerSheet.length && loaded"/>
      </div>
    </div>
    <div class="paper__submit-box">
      <div class="paper__submit paper__default" @click="check()">查看解析</div>
      <div class="paper__submit" @click="practice">再次练习</div>
    </div>
  </div>
</template>

<script>
import { getPerformance } from "@/api/exam";
export default {
  name: "viewanswer",
  data() {
    return {
      /**
       * 题数集合
       */
      answerSheet: [],
      id: this.$route.query.id,
      paperId: this.$route.query.paperId,
      categoryid: this.$route.query.categoryid,
      loaded: false,
      /**
       * 试卷总分数
       */
      correctscore: 0,
      /**
       * 正确总分数
       */
      sumscore: 0
    };
  },
  methods: {
    check() {
      this.$router.push({
        path: "/exam/analysis",
        query: {
          id: this.id
        }
      });
    },
    /**
     * 再次练习
     */
    practice() {
      this.$router.push({
        path: "/exam/DoExercise",
        query: {
          paperId: this.paperId,
          categoryid: this.categoryid
        }
      });
    }
  },
  activated() {
    this.answerSheet = [];
    this.id = this.$route.query.id;
    this.paperId = this.$route.query.paperId;
    this.categoryid = this.$route.query.categoryid;
    let answerList = [];
    getPerformance({
      answerId: this.id
    }).then(res => {
      if (res.result == "success") {
        let tmarr = [];
        res.list.answer.map((item, i) => {
          if (item.tklist) {
            item.tklist.map(tm => {
              tmarr.push(tm);
            });
          }
        });
        this.answerSheet = tmarr;
        this.sumscore = res.list.sumscor;
      }
      this.loaded = true;
    });
    document.title = "查看答题情况";
  }
};
</script> 
<style scoped>
.paper__contianer {
  padding: 20px 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}
.paper__contianer-title {
  font-size: 14px;
  color: #3e4754;
  line-height: 24px;
}

.paper__answer {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.paper__answer-item {
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  border: 1px solid #5185f7;
  color: #5185f7;
  text-align: center;
  font-size: 15px;
  margin: 10px;
}
.paper__submit-box {
  line-height: 51px;
  width: 100%;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
}
.paper__submit {
  line-height: 51px;
  display: flex;
  flex: 1;
  background: #5185f7;
  color: #fff;
  align-items: center;
  justify-content: center;
}
.paper__default {
  background: #fff;
  color: #5185f7;
  text-align: center;
}
.paper__icon-sign {
  display: inline-block;
  padding-left: 20px;
  font-size: 13px;
  color: #8f8f8f;
  position: relative;
  margin-left: 5px;
}
.paper__icon-sign i {
  position: absolute;
  left: 0;
  top: 1px;
  width: 14px;
  height: 14px;
  display: block;
  border-radius: 50%;
}
.paper__color_1 i {
  background: #5185f7;
}
.paper__color_2 i {
  background: #ed7c78;
}
.paper__color_3 i {
  background: #fff;
  border: 1px solid #dcdcdc;
}
.paper__color_4 i {
  background: #dcdcdc;
}
.paper__color_5 i {
  background: #32d432;
  border: 1px solid #32d432;
}
.paper__opear {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 0;
  background: #f1f1f1;
}
.paper__color_4 {
  padding-right: 20px;
}

.active {
  background: #5185f7;
  color: #fff;
}
.active.signed {
  background: #dcdcdc;
  border-color: #dcdcdc;
}
.paper__point {
  background: #fff;
  padding: 20px 0;
}
.paper__point-img {
  background: url(../../assets/exam/exam_sheet_bg.png) no-repeat center;
  height: 8rem;
  padding: 1rem 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-size: contain;
  position: relative;
}
.paper__opear-right {
  float: right;
}

.right {
  background: #32d432;
  border: 1px solid #32d432;
  color: #fff;
}
.error {
  background: #ed7c78;
  border: 1px solid #ed7c78;
  color: #fff;
}
.doing {
  background: #fff;
  color: #5185f7;
  border: 1px solid #5185f7;
}
.signed {
  background: #ed7c78;
  border: 1px solid #dcdcdc;
  color: #dcdcdc;
}
.paper__point-score {
  font-size: 12px;
  color: #b0b0b0;
  text-align: center;
  padding-top: 25px;
}
.paper__point-score span {
  font-size: 28px;
  color: #ff7827;
}
.paper__point-info {
  position: absolute;
  bottom: 35px;
  text-align: center;
  width: 100%;
  color: #fff;
}
</style>
