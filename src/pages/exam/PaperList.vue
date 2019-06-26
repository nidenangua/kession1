<template>
  <div>
    <div class="paper" ref="bodyHeight">
      <div class="paper__click">戳我切换科目</div>
      <div class="paper__menu">
        <swiper :options="swiperOption">
          <swiper-slide>
            <div class="paper__item">
              <div class="paper__count">
                <span class="paper__bule">{{information.doNum || 0}}</span>道
                <div class="paper_item-name">做题总数</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="paper__item">
              <div class="paper__count">
                <span class="paper__green">{{information.zhunquelv || 0}}</span>%
                <div class="paper_item-name">正确率</div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="paper__item">
              <div class="paper__count">
                <span class="paper__red">{{information.errorNum || 0}}</span>道
                <div class="paper_item-name">错题数</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="paper__bar">
        <div class="paper__bar-item" @click="error">
          <img src="@/assets/exam/exam_error.png">错题集
        </div>
        <div class="paper__bar-item" @click="collect">
          <img src="@/assets/exam/exam_collect.png">收藏夹
        </div>
        <div class="paper__bar-item" @click="recode">
          <img src="@/assets/exam/exam_edit.png">做题记录
        </div>
      </div>
      <div class="paper__menu">
        <div class="paper__menu-item" @click="Random()">
          <div class="paper__menu-circle paper__menu-icon1"></div>
          <div class="paper__menu-num">1</div>
          <div class="paper__menu-txt">
            <h3>随机练习</h3>
            <p>颗粒度测试，以练为学，各个击破</p>
          </div>
          <div class="paper__menu-right">
            <img src="@/assets/exam/exam_right.png">
          </div>
        </div>
        <div class="paper__menu-item" @click="open()">
          <div class="paper__menu-circle paper__menu-icon2"></div>
          <div class="paper__menu-num paper__menu-num2">2</div>
          <div class="paper__menu-txt">
            <h3>整卷练习</h3>
            <p>颗粒度测试，以练为学，各个击破</p>
          </div>
          <div class="paper__menu-right">
            <img src="@/assets/exam/exam_right.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryAll, subjectStatistics } from "@/api/exam";
export default {
  name: "category",
  data() {
    return {
      menuData: [],
      active: 0,
      categoryid: this.$route.params.id,
      swiperOption: {
        slidesPerView: 2.5,
        spaceBetween: 15
      },
      information: {}
    };
  },
  methods: {
    /**
     * 整卷练习
     */
    open() {
      this.$router.push({
        path: "/exam/tklist",
        query: {
          categoryid: this.categoryid
        }
      });
    },
    /**
     * 收藏记录
     */
    collect() {
      this.$router.push({
        path: "/exam/favorite",
        query: {
          categoryid: this.categoryid
        }
      });
    },
    /**
     * 错题集
     */
    error() {
      this.$router.push({
        path: "/exam/WrongEntro",
        query: {
          categoryid: this.categoryid
        }
      });
    },
    /**
     * 做题记录
     */
    recode() {
      this.$router.push({
        path: "/exam/record",
        query: {
          categoryid: this.categoryid
        }
      });
    },
    /**
     * 随机练习
     */
    Random() {
      this.$router.push({
        path: "/exam/DoRadom",
        query: {
          categoryid: this.categoryid,
          type: 1
        }
      });
    }
  },
  activated() {
    /**
     * 首页信息
     */
    this.menuData = [];
    this.active = 0;
    this.categoryid = this.$route.params.id;

    this.information = {};
    subjectStatistics({
      categoryid: this.categoryid
    }).then(res => {
      this.information = res.subjectStatistics;
      console.log(this.information);
    });
    this.$refs.bodyHeight.style.height = document.body.offsetHeight + "px";
    document.title = "试卷列表";
  }
};
</script>
<style scoped>
.paper {
  background: #fff;
}
.paper__click {
  width: 6rem;
  height: 0;
  line-height: 1.6rem;
  background: #fff;
  border-radius: 0 16px 16px 0;
  text-align: center;
  color: #fff;
  font-size: 13px;
}
.paper__menu {
  margin: 20px 0;
}
.paper__item {
  text-align: center;
  color: #666;
  font-size: 14px;
}
.paper__item span {
  font-size: 45px;
  padding-right: 5px;
}
.paper__bule {
  color: #5185f7;
}
.paper__green {
  color: #80c269;
}
.paper__red {
  color: #f55959;
}
.paper_item-name {
  font-size: 13px;
  color: #999;
}
.paper__menu-item {
  display: flex;
  padding: 20px 0;
  border-top: 1px solid #eee;
  justify-content: space-between;
  position: relative;
}
.paper__menu-num {
  display: flex;
  flex: 20%;
  align-items: center;
  justify-content: center;
}
.paper__menu-txt {
  flex: 70%;
}
.paper__menu-txt h3 {
  font-size: 20px;
  color: #333;
  font-weight: normal;
  margin-bottom: 10px;
}
.paper__menu-txt p {
  font-size: 13px;
  color: #999;
}
.paper__menu-right {
  flex: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.paper__menu-right img {
  width: 10px;
}
.paper__menu-num {
  font-size: 45px;
  color: #5185f7;
}
.paper__menu-num2 {
  color: #80c269;
}
.paper__menu-circle {
  position: absolute;
  top: 0;
  left: 20px;
  width: 30px;
  height: 10px;
}
/* .paper__menu-icon1 {
    background: url(../../assets/exam/exam_circle2.png) no-repeat;
    background-size: contain
  }
  .paper__menu-icon2 {
    background: url(../../assets/exam/exam_circle1.png) no-repeat;
    background-size: contain
  } */
.paper__bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.paper__bar-item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #666;
}
.paper__bar-item img {
  padding-right: 8px;
  width: 20px;
}

.paper__bar-item i {
  padding-left: 20px;
  font-size: 13px;
  color: #666;
}
</style>