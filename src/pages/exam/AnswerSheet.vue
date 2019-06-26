<template>
  <div>
    <!-- <div class="paper__header">
            <div class="paper__header-second">15秒</div>
            <div class="paper__header-day">1/31</div>
            <div class="paper__header-card"><img src="@/assets/exam/exam_card.png"></div>
            <div class="paper__header-right">正确率：3%</div>
    </div>-->
    <div class="paper__contianer">
      <div class="paper__option">
        <div class="paper__answer">
          <div
            class="paper__answer-item"
            v-for="(item,i) in answerSheet"
            :key="i"
            @click="skipTm(item.bindTmIndex)"
            :class="{active:item.answered,signed:item.sign}"
          >{{item.num}}</div>
        </div>
      </div>
      <div class="paper__opear">
        <div class="paper__icon-sign paper__color_1">
          <i></i>已做
        </div>
        <div class="paper__icon-sign paper__color_3">
          <i></i>未做
        </div>
        <div class="paper__icon-sign paper__color_4">
          <i></i>标记
        </div>
      </div>
    </div>
    <div class="paper__submit" @click="submit()">交卷</div>
  </div>
</template>
<script>
export default {
  name: "answersheet",
  data() {
    return {
      /**
       * 题数集合
       */
      answerSheet: [],
      /**
       * 题目跳转
       */
      skip: ""
    };
  },
  methods: {
    reset(params) {
      this.answerSheet = params.answerList;
    },
    skipTm(index) {
      this.$emit("callback", index);
      this.$emit("update:Visabled", false);
    },
    submit() {
      this.$emit("submit");
    }
  },
  activated() {
    this.answerSheet = [];
    document.title = "答题卡";
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
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  position: absolute;
  top: 2.8rem;
  background: #fff;
  width: 100%;
  z-index: 99;
  left: 0;
  height: 100%;
  box-sizing: border-box;
}
.paper__contianer-title {
  font-size: 14px;
  color: #3e4754;
  line-height: 24px;
}
.paper__option {
  margin: 20px 0;
}
.paper__answer {
  display: flex;
  flex-wrap: wrap;
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
.paper__submit {
  line-height: 51px;
  text-align: center;
  background: #5185f7;
  color: #fff;
  width: 100%;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.paper__icon-sign {
  display: inline-block;
  padding-left: 20px;
  font-size: 15px;
  color: #8f8f8f;
  position: relative;
  margin-left: 5px;
}
.paper__icon-sign i {
  position: absolute;
  left: 0;
  top: 3px;
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
.paper__opear {
  float: right;
  padding-right: 20px;
}

.active {
  background: #5185f7;
  color: #fff;
}
.signed {
  background: #dcdcdc;
  border-color: #dcdcdc;
  color: #8f8f8f;
}
</style>
