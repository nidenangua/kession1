<template>
  <div>
    <div class="paper clearfix">
      <div class="papaer__classfiy">
        <div class="paper__leftside" ref="bodyHeight">
          <div class="paper__tab">
            <ul>
              <li
                :class="index === active && 'paper__active'"
                v-for="(firstList,index) in menuData"
                :key="index"
                @click="active = index"
              >{{firstList.categoryname}}</li>
            </ul>
          </div>
        </div>
        <div class="paper__right-content" v-if="menuData[active]">
          <div class="paper__name" v-for="item in menuData[active].child" :key="item.categoryid">
            <div class="paper__s-level" @click="open(item.categoryid)">{{item.categoryname}}</div>
            <div class="paper__t-level clearfix">
              <ul v-if="item.child">
                <li
                  v-for="child in item.child"
                  :key="child.categoryid"
                  @click="open(child.categoryid)"
                >{{child.categoryname}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categoryAll } from "@/api/exam";
export default {
  name: "category",
  data() {
    return {
      menuData: [],
      active: 0
    };
  },
  methods: {
    open(id) {
      this.$router.push({
        path: "/exam/" + id
      });
    }
  },
  activated() {
    categoryAll().then(res => {
      this.menuData = res;
      console.log(this.menuData);
    });
    this.$refs.bodyHeight.style.height = document.body.offsetHeight + "px";
    document.title = "试题分类";
  }
};
</script>
<style scoped>
.paper {
  background: #f7f7f7;
}
.paper__leftside {
  width: 30%;
  float: left;
  background: #ebebeb;
}
.paper__tab li {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
}

.paper__right-content {
  float: left;
  padding-left: 20px;
  width: 70%;
  box-sizing: border-box;
}
.paper__s-level {
  font-size: 14px;
  height: 3rem;
  line-height: 3rem;
  color: #666;
  position: relative;
  padding-left: 15px;
}
.paper__s-level::before {
  position: absolute;
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4e85f1;
  margin-top: -2px;
  top: 50%;
  left: 0;
}
.paper__t-level li {
  width: 40%;
  height: 3rem;
  line-height: 3rem;
  margin-right: 10%;
  background: #fff;
  float: left;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.paper__active {
  background: #f7f7f7;
}
</style>

