<template>
  <div>
    <div class="paper__header">
      <div class="paper__header-day">{{pageTuning}}/{{paperLength}}</div>
      <div class="paper__header-card" @click="sheetclick">
        <img src="@/assets/exam/exam_card.png">
      </div>
      <div class="paper__header-sumbit">交卷</div>
    </div>
    <div class="paper__contianer" v-if="ParentTkList.length">
      <swiper :options="swiperOption" ref="choice">
        <swiper-slide v-for="(item,i) in ParentTkList" :key="i">
        
          <div v-if="item.type == 'dt'">
            <div class="paper__contianer-title">{{item.title||'大题标题'}}</div>
          </div>
          <div v-if="item.type == 'xt'">
            <div class="paper__contianer-title">{{i}}、 {{item.tkinfo.title}}</div>
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
                  @click="next(item,i,letter[index])"
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
            <div class="papper__check-analysis clearfix" @click="checkVisabled(item)">
              <button class="paper__check-btn ktj-fr" v-if="item.checkVisable">查看解题思路</button>
            </div>
            <div class="paper__answer-analysis" v-if="item.analiysisiAble">
              <div class="paper__answer-analysis-title">答案解析</div>
              <div class="paper__answer-analysis-content">{{item.tkinfo.tkinfo.analysis}}</div>
          </div>
          </div>
        </swiper-slide>
      </swiper>
    
    </div>
  </div>
</template>

<script>
import { getRecordDetail} from "@/api/exam";
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
       * 试卷长度
       */
      paperLength: 0,
      /**
       * 试卷翻页记录长度
       */
      pageTuning: 0,

      id: this.$route.query.id,
      type:this.$route.query.type,
      /**
       * 试卷总数
       */
      tk_num: null,
        /**
       * 选项字母
       */
      letter: []
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
      arr.answer = options;
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
     * 查看解题思路
     */
    checkVisabled(arr) {
      arr.analiysisiAble = true;
      arr.checkVisable = false;
    }
  },
  activated() {
    this.ParentTkList = [];
    this.id = this.$route.query.id;
    /**
     * 试卷详情
     */

    this.$showLoading();
    getRecordDetail({
      id: this.id,
      type:this.type
    }).then(res => {
      let ParentTkList = res;
      let tkList = [];
      let answerSheet = [];
      let i = 0;
      ParentTkList.map(dt => {
        dt.type = "dt";
        tkList.push(dt);
        if (dt.tklist) {
          dt.tklist.map(xt => {
            xt.type = "xt";
            xt.tktype = xt.tkinfo.tktype;
            xt.analiysisiAble=false;
          
            xt.checkVisable= true;
                  tkList.push(xt);
            i++;
          });
        }
      });
      this.ParentTkList = tkList;
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
    document.title = "真题练习";
  }

}
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
.paper__answer-analysis-title {
  padding: 20px 0 15px;
  font-size: 14px;
}
.paper__answer-analysis-content {
  font-size: 14px;
}
</style>

