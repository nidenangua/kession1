<template>
    <div>
        <div class="course_container" v-if="loaded">
            <div class="course_content">
                <div class="share-tag">
                    <div class="final-tag"></div>
                </div>
                <!-- info -->
                <div class="course_info">
                    <div class="title">{{paperInfo.title}}</div>
                    <div class="content">
                        <div class="head">课程简介</div>
                        <div v-html="paperInfo.content"></div>
                    </div>
                </div>
                <!-- info -->
            </div>
            <div class="footer-container">
                <div class="complain-footer">课堂街提供技术支持</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPaperInfo } from "@/api/exam";
export default {
  name: "ExamView",
  data() {
    return {
      loaded: false,
      paperInfo: {}
    };
  },
  activated() {
    this.paperInfo = {};
    this.$showLoading();
    let id = this.$route.params.id;
    /**
     * 获取课程详情
     */
    getPaperInfo({
      id: id
    }).then(res => {
      this.paperInfo = res.msg;
      this.loaded = true;
      this.$hideLoading();
    });
  }
};
</script>
<style scoped>
.course_container {
  position: relative;
}
.share-tag {
  cursor: pointer;
  width: 2rem;
}
.share-tag .final-tag {
  position: absolute;
  width: 2rem;
  height: 2rem;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  left: 0;
  z-index: 2;
}
.course_header {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 62.5%;
}
.course_header .head-icon-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.course_header .head-icon-wrap .head-icon {
  width: 100%;
  height: 100%;
}
.header-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
}

.head-bottom-box {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  overflow: hidden;
  position: relative;
  bottom: 0;
  left: 0;
  position: absolute;
}
.head-bottom-box::after {
  content: "";
  height: 2.2rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 8;
}
.head-bottom-box .course_count {
  position: relative;
  z-index: 9;
  background: url(../../assets/course/count.png) no-repeat 0.5rem 50%;
  background-size: auto 0.7rem;
  padding-left: 1rem;
}
.joined-wrap {
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  -moz-box-flex: 1;
  flex: auto;
  margin-left: 0.4rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
}
.joined-wrap .pic {
  display: inline-block;
  width: 0.666667rem;
  height: 0.666667rem;
  -webkit-border-radius: 1.333333rem;
  border-radius: 1.333333rem;
  border: 0.1rem solid #fff;
  -webkit-background-size: 100% 100%;
  background-size: 100%;
  position: relative;
}
.joined-wrap .num-tip {
  margin-left: 0.133333rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  font-size: 0.6rem;
}

.specials-count-down {
  -webkit-background-size: cover;
  background-size: cover;
  height: 1.2rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  padding: 0 0.373333rem;
}
.specials-count-down .sale {
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  color: #e64a3b;
  margin-right: 0.213333rem;
  font-weight: 700;
  font-size: 1.55rem;
}
.specials-count-down .price-box .price {
  font-size: 0.55rem;
  line-height: 0.75rem;
  text-decoration: line-through;
}
.specials-count-down .price-box .title {
  font-weight: 500;
  border: 0.013333rem solid #e64a3b;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -moz-inline-box;
  display: inline-flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -webkit-border-radius: 0.08rem;
  border-radius: 0.08rem;
  padding: 0 0.133333rem;
  margin-bottom: 0.026667rem;
  font-size: 0.5rem;
  height: 0.8rem;
}
.specials-count-down .right.special-price {
  -webkit-background-size: 2.186667rem 0.533333rem;
  background-size: 2.186667rem 0.533333rem;
  height: 0.8rem;
  display: block;
  margin-right: 0.466667rem;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  text-align: right;
}
.course_info {
  background-color: #fff;
  padding: 0.75rem;
}
.course_info .title {
  color: #424242;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 700;
  margin-bottom: 0.213333rem;
  font-size: 0.8rem;
  text-align: left;
}
.course_info .title .is-relay {
  font-size: 0.7rem;
  margin-right: 0.25rem;
  padding: 0 0.2rem;
  color: #fff;
  background: #e64a3b;
  border-radius: 0.15rem;
  position: relative;
  top: -0.1rem;
}
.course_info .flex-con {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  margin-bottom: 0;
}
.course_info .topic-count {
  color: #b8b0b0;
  margin-bottom: 0.213333rem;
  max-height: 13.333333rem;
  font-size: 0.6rem;
  margin-bottom: 0.75rem;
}
.course_info .price-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
}
.price-wrap .price {
  font-size: 0.8rem;
  margin-right: 0.5rem;
  color: #e64a3b;
  font-weight: 700;
}
.price-wrap .price-market {
  text-decoration: line-through;
  color: #b5b5b5;
  font-weight: normal;
  font-size: 0.65rem;
  margin-left: 0.25rem;
}

.tab {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  height: 2.2rem;
  background-color: #fff;
}
.tab .tab-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  color: #424242;
  text-align: center;
  height: 100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  font-size: 0.9rem;
}
.tab .tab-item.active {
  color: #e64a3b;
  font-weight: bolder;
}

.introAnchor {
  background: #fff;
  padding: 1rem;
}
.introAnchor .empty {
  margin-top: 0px;
}
.course {
  border-bottom: 0.05rem solid #e6e6e6;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  overflow: hidden;
  position: relative;
}
.course-img-con {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -moz-box-flex: 0;
  flex: none;
  width: 6rem;
  height: 3.7rem;
}
.course-img-con img {
  display: block;
  width: 100%;
  height: 100%;
  -webkit-border-radius: 0.053333rem;
  border-radius: 0.2rem;
}
.course-head {
  padding: 1rem 0;
  font-size: 0.8rem;
  font-weight: 600;
}
.course-detail {
  margin-left: 0.75rem;
  color: #b8b0bb;
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  padding-bottom: 1rem;
}
.course-detail .title {
  color: #424242;
  margin-right: 0.133333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  font-weight: 500;
  position: relative;
  margin-bottom: 0.4rem;
}
.course-list .course-detail {
  color: #b8b0b0;
  margin-bottom: 0.133333rem;
}
.status-info {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
}
.course-detail .second-con {
  color: #b8b0b0;
  margin-bottom: 0.4rem;
}

.footer-container {
  padding: 0.75rem 0.5rem;
  text-align: center;
  line-height: 1rem;
  color: #999;
}
.footer-container .complain-footer a {
  color: #41679f;
}
.courserview {
  padding-bottom: 2.5rem;
}
.tab .tab-item.active {
  font-size: 0.9rem;
}
.tab .tab-item.active:after {
  content: "";
  display: block;
  height: 0.15rem;
  border-radius: 0.15rem;
  background-color: #e64a3b;
  width: 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.button-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  background-color: #fafafa;
  color: #fff;
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  z-index: 2;
  -webkit-box-shadow: 0 -0.066667rem 0.266667rem rgba(0, 0, 0, 0.06);
  box-shadow: 0 -0.066667rem 0.266667rem rgba(0, 0, 0, 0.06);
}
.button-container .listen {
  display: inline-block;
  width: 35%;
  color: #8e8585;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  height: 2.5rem;
  line-height: 2.5rem;
}
.button-container .buy-btn {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  background-color: #e64a3b;
  letter-spacing: 0;
  color: #fff;
  text-align: center;
  height: 2.5rem;
  line-height: 2.5rem;
}
.music-plbox {
  background: #fff;
}
.music-plbox ul {
  padding: 0 0.75rem;
}
.music-plbox li {
  padding: 0.5rem 0 0.75rem 2.75rem;
  position: relative;
}
.music-plbox li:last-child {
  border: none;
}
.name .time {
  float: right;
  font-weight: normal;
  color: #999;
  font-size: 0.6rem;
}
.music-plbox li img {
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 0.5rem;
  left: 0rem;
  border-radius: 50%;
}
.music-plbox .li-title {
  font-size: 0.75rem;
}
.music-plbox .li-title span {
  float: right;
}
.music-plbox li .del-icon {
  position: static;
  border-radius: 0rem;
  width: 0.7rem;
  height: 0.7rem;
  margin-top: -0.3rem;
}
.music-plbox li .zan {
  vertical-align: super;
  font-size: 0.6rem;
  line-height: 1rem;
  height: 1rem;
}
.head {
  margin: 0.75rem 0 1rem;
  font-weight: 700;
  color: #424242;
  font-size: 0.7rem;
}
.music-plbox .name {
  margin-bottom: 0.3rem;
  font-size: 0.7rem;
  line-height: 1rem;
  height: 1rem;
  width: 100%;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}
.buy-article-tips {
  text-align: center;
  padding: 3.75rem 0 1.5rem 0;
  font-size: 0.7rem;
  letter-spacing: 0.05rem;
  background: url(../../assets/course/money.png) no-repeat 50% 1.5rem;
  background-size: auto 1.7rem;
  margin-top: 0.75rem;
}

.card-img {
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
}
</style>
