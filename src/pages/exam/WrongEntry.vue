<template>
  <div>
    <div class="paper__point">
      <div class="paper__point-img">
        <div class="paper__point-score">
          <span>{{errorobj.error_num}}</span>题
        </div>
        <div class="paper__point-info"></div>
      </div>
    </div>
    <div class="paper__contianer">
      <button class="paper__container-btn" @click="check">查看错题</button>
      <div class="paper__container-entro">
        <div class="paper__container-number">
          <p>今日错题：{{errorobj.today_error}}</p>
          <p>正确率：{{errorobj.zhengquelv}}%</p>
        </div>
        <div class="paper__container-start">
          <button class="paper__container-btn paper__contianer-radius" @click="doexam()">开始练习</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPerformance, errorHome } from "@/api/exam";
export default {
  name: "viewanswer",
  data() {
    return {
      categoryid: this.$route.query.categoryid,
      errorobj: {}
    };
  },
  methods: {
    check() {
      this.$router.push({
        path: "/exam/ErrorAnaysis",
        query: {
          categoryid: this.categoryid
        }
      });
    },
    doexam() {
      this.$router.push({
        path: "/exam/DoError",
        query: {
          categoryid: this.categoryid,
          type: 2
        }
      });
    }
  },
  activated() {
    this.categoryid = this.$route.query.categoryid;
    this.errorobj = {};
    errorHome({
      categoryid: this.categoryid
    }).then(res => {
      this.errorobj = res;
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
  text-align: center;
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
  bottom: 32px;
  text-align: center;
  width: 100%;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1px;
}
.paper__container-btn {
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
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.paper__container-entro {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 50px;
}
.paper__contianer-radius {
  border-radius: 20px;
  padding: 10px 20px;
}
.paper__container-number p {
  margin: 10px 0;
}
</style>
