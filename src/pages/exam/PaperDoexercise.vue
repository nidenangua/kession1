<template>
  <div>
    <div class="paper__header">
      <div class="paper__header-second">{{time}}</div>
      <div class="paper__header-day">{{pageTuning}}/{{paperLength}}</div>
      <div class="paper__header-card" @click="sheetclick">
        <img src="@/assets/exam/exam_card.png">
      </div>
      <div class="paper__header-sumbit" @click="save">交卷</div>
    </div>
    <div class="paper__contianer" v-if="ParentTkList.length">
      <swiper :options="swiperOption" ref="choice">
        <swiper-slide v-for="(item,i) in ParentTkList" :key="i">
          <div v-if="item.type == 'dt'">
            <div class="paper__contianer-title">{{item.title}}</div>
          </div>
          <div v-if="item.type == 'xt'">
            
            <div class="paper__contianer-title">{{item.num}}、 {{item.tkinfo.title}}</div>
            <div
              class="paper__option-box"
              v-if="item.tkinfo.tktype == 1 || item.tkinfo.tktype == 6"
            >
              <div
                class="paper__option"
                v-for="(options,index) in item.tkinfo.tkinfo.content"
                :key="index"
              >
                <span
                  @click="next(item,item.num,letter[index])"
                  :class="{actived:item.answer == letter[index]}"
                >{{letter[index]}}</span>
                {{options}}
              </div>
            </div>
            <div class="paper__option-box" v-if="item.tkinfo.tktype == 2">
              <div
                class="paper__answer-area"
                v-for="(gap,index) in item.tkinfo.tkinfo.answer"
                :key="index"
              >
                <span>
                  答题区{{index+1}}:
                  <input type="text" class="paper__option-input" v-model="gap.options" @blur="submitAnswer(item)">
                </span>
              </div>
            </div>
            <div class="paper__option-box" v-if="item.tkinfo.tktype == 3">
              <div class="paper__option" @click=" multiple(item,i,1)">
                <span :class="{actived:item.answer == 1}">A</span>正确
              </div>
              <div class="paper__option" @click=" multiple(item,i,0)">
                <span :class="{actived:item.answer == 0}">B</span>错误
              </div>
            </div>
            <div class="paper__option-box" v-if="item.tkinfo.tktype == 4">
              <textarea
                v-model="item.answer"
                class="paper__option-textarea"
                placeholder="请输入答案"
                @blur="shortAnswer(item)"
              ></textarea>
            </div>
            <div class="paper__opear">
              <div class="paper__sign" @click="sign(i)" :class="{signed:item.signed}">
                <img src="@/assets/exam/exam_sign.png" v-if="item.signed==false">
                <img src="@/assets/exam/exam_active_sign.png" v-else-if="item.signed==true">标记此题
              </div>
              <div class="paper__collect" @click="collect(item)" :class="{collected:item.collect}">
                <img src="@/assets/exam/exam_collected.png" v-if="item.collect==false">
                <img src="@/assets/exam/exam_active_collected.png" v-if="item.collect==true">收藏此题
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <answer-sheet
        v-if="Visabled"
        :Visabled.sync="Visabled"
        ref="sheet"
        @callback="tkAnswer"
        @submit="save"
      />
    </div>
  </div>
</template>

<script>
import { getExamDetail, setCollect, setPaperAnswer } from "@/api/exam";
import AnswerSheet from "./AnswerSheet";
export default {
  name: "",
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 15
      },
      /**
       * 试卷列表
       */
      ParentTkList: [],
      /**
       * 试卷id
       */
      paperId: this.$route.query.paperId,
      /**
       * 选项字母
       */
      letter: [],
      /**
       * 题目选中
       */
      active: 0,
      /**
       * 答题卡选中
       */
      Visabled: false,
      /**
       * 记录题目选中数组
       */
      recode: [],
      /**
       * 是不是已答过题
       */
      signed: false,
      /**
       * 试卷长度
       */
      paperLength: 0,
      /**
       * 试卷翻页记录长度
       */
      pageTuning: 0,

      /**
       * 考试时间
       */
      time: "",
      /**
       * 阅卷类型
       * 1自动阅卷
       * 2手动阅卷
       */
      scoreout: null,
      categoryid: this.$route.query.categoryid,
      /**
       * 试卷总数
       */
      tk_num: null
    };
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
    },
    /**
     * 点击下一题 index 当前题数 answerid答案序号
     */
    next(arr, index, options) {
      this.$refs.choice.swiper.slideNext();
      console.log(index)
      this.recode[index - 1].answered = true;
      this.pageTuning = index;
      arr.answer = options;
      arr.doing = 1;
    },
    /**
     * 填空题提交答案
     */
    submitAnswer(arr) {
      let anserArr = [];
      arr.tkinfo.tkinfo.answer.map(res => {
        anserArr.push(res.options);
      });
      arr.answer = anserArr;
      arr.doing = 1;
      arr.tktype = arr.tkinfo.tktype;
    },
    /**
     * 选择题提交答案
     */
    multiple(arr, i, index) {
      arr.answer = index;
      arr.doing = 1;
      arr.tktype = arr.tkinfo.tktype;
      this.recode[i - 1].answered = true;
    },
    /**
     *简答题提交答案
     **/
    shortAnswer(arr) {
      let short = [];
      arr.doing = 1;
      arr.tktype = arr.tkinfo.tktype;
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
     * 答题卡回调跳转当前选中题
     */
    tkAnswer(index) {
      this.$refs.choice.swiper.slideTo(index, 500, false);
    },
    /**
     * 标记当前题目
     */
    sign(index) {
      this.recode[index - 1].sign = true;
      this.ParentTkList.map((item, i) => {
        if (i == index) {
          item.signed = true;
        }
      });
    },
    collect(data) {
      setCollect({
        type: 2,
        categoryid: this.categoryid,
        infoid: data.tkid
      }).then(res => {
        if (res.result == "success") {
          data.collect = true;
        }
      });
    },
    save() {
      let sumscore = 0;
      let dtscores = {};
      let tmlist = [];
      let tkDepot = {};
      let errortk = [];
      let do_tk = [];
      let do_num = 0;
      this.start(false);
      this.ParentTkList.map((tkArr, i) => {
        if (tkArr.type == "dt") {
          tmlist.push({
            tmtype: tkArr.tmtype,
            dtscore: 0,
            tklist: []
          });
        }
      });
      this.ParentTkList.map((tkArr, i) => {
        if (tkArr.type == "xt") {
          let signed = tkArr.signed ? 1 : 0;
          let reply = 0;
          if (this.scoreout == 1) {
            if (tkArr.answer) {
              do_tk.push(tkArr.tkid);
              if (tkArr.answer == tkArr.tkinfo.tkinfo.answer) {
                ++do_num;
                sumscore += Number(tkArr.score);
                if (dtscores[tkArr.tktype]) {
                  dtscores[tkArr.tktype] += Number(tkArr.score);
                } else {
                  dtscores[tkArr.tktype] = 0;
                }
                reply = 1;
              } else if (
                tkArr.answer != tkArr.tkinfo.tkinfo.answer ||
                tkArr.answer == 0
              ) {
                ++do_num;
                errortk.push(tkArr.tkid);
              }
            }
          } else {
            if (tkArr.answer) {
              do_num++;
              sumscore: null;
              errortk: null;
              reply = 1;
            }
          }
          if (tkArr.tktype === tkArr.tkinfo.tktype) {
            if (!tkDepot[tkArr.tktype]) {
              tkDepot[tkArr.tktype] = [];
            }
            tkDepot[tkArr.tktype].push({
              tkid: tkArr.tkinfo.tkid,
              useranswer: tkArr.answer,
              score: tkArr.score,
              reply: reply,
              signed: signed,
              doing: tkArr.doing
            });
          }
        }
      });

      
      tmlist.map(item => {
        if (dtscores[item.tmtype]) {
          item.dtscore = dtscores[item.tmtype];
        }
        if (tkDepot[item.tmtype]) {
          item.tklist = tkDepot[item.tmtype];
        }
      });
      //    if(this.tk_num != do_num) {
      //   this.$confirm('你当前题目还未做完确认交卷吗？',()=>{

      //   })
      //  }

      setPaperAnswer({
        categoryid: this.categoryid,
        paperId: this.paperId,
        do_num: do_num, //做题总数
        sumscore: sumscore, //正确总分
        tk_num: this.tk_num, //总题数
        answer: tmlist, //正确题数组
        errortk: errortk, //错题数组
        do_tk: do_tk,
        time: this.ChangeStrToMinutes(this.time)
      }).then(res => {
        if (res.setPaperAnswer.result == "success") {
          this.$router.push({
            path: "/exam/result",
            query: {
              id: res.setPaperAnswer.id,
              paperId: this.paperId,
              categoryid: this.categoryid
            }
          });
        } else {
          this.$toast(res.setPaperAnswer.msg, "error");
        }
      });
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
    }
  },
  activated() {
    this.ParentTkList = [];
    this.paperId = this.$route.query.paperId;
    /**
     * 试卷详情
     */
    this.$showLoading();
    getExamDetail({
      paperId: this.paperId
    }).then(res => {
      let ParentTkList = res.list.tmlist;
      let tkList = [];
      let answerSheet = [];
      let i = 0;
      ParentTkList.map(dt => {
        dt.type = "dt";
        tkList.push(dt);
        if (dt.tklist) {
          dt.tklist.map(xt => {
            i++;
            /**
             * 大题或小题
             */
            xt.type = "xt";
            /**
             * 是否已做
             */
            xt.doing = 0;
            /**
             * 是否已标记
             */
            xt.signed = false;
            /**
             * 是否已收藏
             */
            xt.collect = false;
            /**
             *当前选中的答案
             */
            xt.answer = ""
            /**
             * 当前大题类型
             */
            xt.tktype = xt.tkinfo.tktype;
            /**
             * 
             */
            xt.num = i
            tkList.push(xt);
            
            /**
             * 答题卡信息
             */
            answerSheet.push({
              bindTmIndex: tkList.length - 1,
              num: i,
              sign: false,
              answered: false,
              collected: false
            });
          });
        }
      });

      this.recode = answerSheet;
      this.ParentTkList = tkList;
      console.log(this.ParentTkList)
      this.paperLength = this.recode.length;
      this.scoreout = res.list.scoreout;
      this.tk_num = res.list.tk_num;
      this.getEN();
      this.$hideLoading();

      /**
       * 构建填空题答案
       */
      this.ParentTkList.map(arr => {
        if (arr.type == "xt" && arr.tkinfo.tktype == 2) {
          arr.tkinfo.tkinfo.answer.map(arrItems => {
            arrItems.options = "";
          });
        }
      });
    });

    /**
     * 计时器
     */
    this.start(true);
    document.title = "真题练习";
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
  margin: 10px 0;
}
.paper__option-input {
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
  border: 0px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  width: 75%;
}
</style>
