<template>
  <div>
    <div class="paper__header">
      <div class="paper__header-second">{{time}}</div>
      <div class="paper__header-day">{{pageTuning}}/{{paperList.length}}</div>
      <div class="paper__header-card" @click="sheetclick">
        <img src="@/assets/exam/exam_card.png">
      </div>
      <div class="paper__header-sumbit" @click="save">结束练习</div>
    </div>
    <div class="paper__contianer">
      <swiper :options="swiperOption" ref="choice" v-if="paperList">
        <swiper-slide v-for="(item,i) in paperList" :key="i">
          <div class="paper__contianer-title">{{i+1}}、 {{item.title}}</div>
          <div class="paper__option-box" v-if="item.tktype!=4">
            <div class="paper__option" v-for="(options,index) in item.tkinfo.content" :key="index">
              <span
                @click="next(item,i,letter[index])"
                :class="{actived:item.answer == letter[index]}"
              >{{letter[index]}}</span>
              {{options}}
            </div>
          </div>
          <div class="paper__option-box" v-if="item.tktype == 3">
            <div class="paper__option" @click=" multiple(item,i,1)">
              <span :class="{actived:item.answer == 1}">A</span>正确
            </div>
            <div class="paper__option" @click=" multiple(item,i,0)">
              <span :class="{actived:item.answer == 0}">B</span>错误
            </div>
          </div>
          <div class="paper__option-box" v-else-if="item.tktype == 4">
            <textarea v-model="item.answer" class="paper__option-textarea" placeholder="请输入答案"></textarea>
          </div>
          <div class="papper__check-analysis clearfix" @click="checkVisabled(item)">
            <button class="paper__check-btn ktj-fr" v-if="item.checkVisable">查看解题思路</button>
          </div>
          <div class="paper__check-analysis-content" v-if="item.analiysisiAble">
            <h5 class="paper__check-h5">答案解析</h5>
            <div class="paper__check-info">{{item.tkinfo.analysis}}</div>
          </div>
        </swiper-slide>
      </swiper>
      <ktj-empty msg="暂无随机练习" v-else-if="paperList.length == 0 && loaded"/>
      <answer-sheet v-if="Visabled" :Visabled.sync="Visabled" ref="sheet" @callback="tkAnswer"/>
    </div>
  </div>
</template>

<script>
import { errorTest, endTest } from "@/api/exam";
import AnswerSheet from "./AnswerSheet";
export default {
  name: "",
  data() {
    return {
      isSwiperFirsetEnd: false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      categoryid: this.$route.query.categoryid,
      /**
       * 1随机 2 错题
       */
      type: this.$route.query.type,
      paperList: [],
      /**
       * 选项字母
       */
      letter: [],
      /**
       * 记录题目选中数组
       */
      recode: [],
      /**
       * 答题卡选中
       */
      Visabled: false,
      /**
       * 计时器
       */
      time: "",
      pageTuning: 0,
      loaded: false,
      /**
       * 解析显示隐藏
       */
      analiysisiAble: false,
      /**
       * 查看解析按钮显示隐藏
       */
      checkVisable: true
    };
  },
  activated() {
    this.paperList = [];
    this.recode = [];
    this.categoryid = this.$route.query.categoryid;

    this.start(true);
    this.getlist();
    document.title = "错题练习";
  },
  methods: {
    getlist(parame) {
      this.$showLoading();
      errorTest({
        categoryid: this.categoryid
      }).then(res => {
        if (res.list) {
          let answerSheet = [];
          res.list.map((arr, i) => {
            /**
             * 是否已做
             */
            arr.doing = 0;
            /**
             * 是否已标记
             */
            arr.signed = false;
            /**
             * 是否已收藏
             */
            arr.collect = false;
            /**
             *当前选中的答案
             */
            arr.answer = "";
            /**
             * 答题卡信息
             */
            /**
             * 解析显示隐藏
             */
            arr.analiysisiAble = false;
            /**
             * 查看解析按钮显示隐藏
             */
            arr.checkVisable = true;
            answerSheet.push({
              bindTmIndex: i + 1,
              num: i,
              sign: false,
              answered: false,
              collected: false
            });
          });
          this.paperList = res.list;
          this.recode = answerSheet;
          this.getEN();
          this.loaded = true;
          this.$hideLoading();
        } else {
          this.$toast(res.msg, "error");
          this.loaded = true;
        }
      });
    },
    /**
     * 字母26
     */
    getEN(index) {
      var arr = [];
      for (var i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i));
      }
      this.letter = arr;
    },
    /**
     * 点击下一题 index 当前题数 answerid答案序号
     */
    next(arr, index, options) {
      this.$refs.choice.swiper.slideNext(); //跳转下一页
      this.recode[index].answered = true; //答题卡存储答案
      this.pageTuning = index + 1; //当前做题页数
      arr.answer = options; //答案
      arr.doing = 1; //是否已做
    },
    /**
     * 答题卡回调跳转当前选中题
     */
    tkAnswer(index) {
      this.$refs.choice.swiper.slideTo(index - 1, 500, false);
    },
    /**
     * 答题卡信息传值
     */
    sheetclick() {
      if (this.Visabled) {
        this.Visabled = false;
      } else {
        this.Visabled = true;
        this.$nextTick(() => {
          this.$refs.sheet.reset({
            answerList: this.recode,
            swiperChoice: this.$refs.choice
          });
        });
      }
    },
    /**
     * 选择题提交答案
     */
    multiple(arr, i, index) {
      arr.answer = index;
      arr.doing = 1;
    },
    /**
     * 计时器
     */
    start(bolean) {
      let timer, hour, minute, second;
      hour = minute = second = 0;
      if (bolean === true) {
        let timer = setInterval(() => {
          if (second >= 0) {
            second = second + 1;
          }
          if (second >= 60) {
            second = 0;
            minute = minute + 1;
          }
          if (minute >= 60) {
            minute = 0;
            hour = hour + 1;
          }
          this.time = hour + ":" + minute + ":" + second;
        }, 1000);
      } else {
        clearInterval(timer);
      }
    },
    ChangeStrToMinutes(str) {
      var arrminutes = str.split(":");
      if (arrminutes.length == 3) {
        var minutes = parseInt(arrminutes[0]) * 60 + parseInt(arrminutes[1]);
        return minutes;
      } else {
        return 0;
      }
    },
    save() {
      let tmlist = []; //返回题目数组
      let errortk = []; //错题数组
      let do_tk = [];
      let answerList = [];
      this.start(false); //计时结束
      this.$showLoading();
      this.paperList.map((tkArr, i) => {
        let signed = tkArr.signed ? 1 : 0; //是否已标记
        let answerArr = []; //答案数组
        answerArr.push(tkArr.answer);
        if (tkArr.answer) {
          do_tk.push(tkArr.tkid);
          if (tkArr.answer != tkArr.tkinfo.answer) {
            errortk.push(tkArr.tkid);
          }
        }
        answerList.push({
          tkid: tkArr.tkid,
          useranswer: answerArr
        });
      });
      endTest({
        categoryid: this.categoryid,
        do_tk: do_tk, //正确题数组
        errortk: errortk, //错题数组,
        answer: answerList,
        examtime: this.ChangeStrToMinutes(this.time),
        type: this.type
      }).then(res => {
        console.log;
        if (res.result == "success") {
          this.$toast("保存成功", "success");
          // this.$router.push({
          //   path:'/exam/result',
          //   query:{
          //      id:res.id
          //   }
          // })
        } else {
          this.$toast(res.msg, "error");
        }
      });
    },

    /**
     * 查看解题思路
     */
    checkVisabled(arr) {
      arr.analiysisiAble = true;
      arr.checkVisable = false;
    }
  },

  components: {
    AnswerSheet
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
}
.paper__check-btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #5185f7;
  border: 1px solid #5185f7;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
}
.papper__check-analysis {
  margin-top: 25px;
}
.paper__check-info {
  padding: 15px 0;
  font-size: 14px;
  line-height: 22px;
}
.paper__check-h5 {
  font-size: 14px;
  color: #666;
  font-weight: normal;
  margin-top: 15px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}
</style>


