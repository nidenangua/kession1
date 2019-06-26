<template>
    <div class="footer" v-if="show">
        <div class="footer-bar line line-top" :class="'footer-bar-style'+$store.state.footjson.style">
            <ul>
                <li :class="$route.path === item.url && 'active'" v-for="(item,index) in list" :key="index" @click="$navigateTo(item.url)">
                    <div class="icon" :class="item.icon"></div>
                    <div class="name" :style="{color:$route.path === item.url ? $store.state.footjson.selectedTextColor : $store.state.footjson.defaultTextColor}">{{item.name}}</div>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
import {getParams} from '@/utils'
export default {
    name:'FooterBar',
    data(){
        return {
            show:false,
            list:[
                {
                  "url":"/",
                  "name":"首页",
                  "icon":"icon-index"
                },
                {
                  "url":"/course",
                  "name":"发现",
                  "icon":"icon-course"
                },
                {
                  "url":"/user/course",
                  "name":"已购",
                  "icon":"icon-learn"
                },
                {
                  "url":"/user",
                  "name":"我的",
                  "icon":"icon-me"
            }]
        }
    },
    watch:{
        '$route.path'(){
            this.footerShow()
        }
    },
    methods:{
        footerShow(){
            let show = false
            let params = getParams()
            this.list.map(item=>{
                if(item.url === this.$route.path && !params.h5token){
                    show = true
                }
            })
            this.show = show
        }
    },
    mounted(){
      this.$store.ready(()=>{
        this.footerShow()
      })
       
    }
}
</script>
<style scoped>
/*底部菜单*/

.footer,
.footer-bar{
  height: 49px;
  overflow: hidden;
}
.footer-bar{
  width: 100%;
  max-width: 480px;
  background: #fff;
  position: fixed;
  left: auto;
  bottom: 0;
  z-index: 90;
}
.footer-bar li{
  width: 25%;
  float: left;
  text-align: center;
}
.footer-bar .icon{
  width: 23px;
  height: 23px;
  display: block;
  margin: 0 auto;
  margin-top: 6px;
  background-size: 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat
}
.footer-bar .name{
  line-height: 20px;
  color: #999;
  font-size: 10px
}

.footer-bar-style1 .icon-index{
  background-image: url(../assets/footer-bar/style1/nav_icon_index_n.png)
}
.footer-bar-style1 .icon-course{
  background-image: url(../assets/footer-bar/style1/nav_icon_lesson_n.png);
}
.footer-bar-style1 .icon-learn{
  background-image: url(../assets/footer-bar/style1/nav_icon_buy_n.png);
}
.footer-bar-style1 .icon-me{
  background-image: url(../assets/footer-bar/style1/nav_icon_me_n.png)
}
.footer-bar-style1 .active .name{
  color:#333232;
}
.footer-bar-style1 .active .icon-index{
  background-image: url(../assets/footer-bar/style1/nav_icon_index_s.png)
}
.footer-bar-style1 .active .icon-course{
  background-image: url(../assets/footer-bar/style1/nav_icon_lesson_s.png)
}
.footer-bar-style1 .active .icon-learn{
  background-image: url(../assets/footer-bar/style1/nav_icon_buy_s.png);
}

.footer-bar-style1 .active .icon-me{
  background-image: url(../assets/footer-bar/style1/nav_icon_me_s.png)
}


.footer-bar-style2 .icon-index{
  background-image: url(../assets/footer-bar/style2/nav_icon_index_n.png)
}
.footer-bar-style2 .icon-course{
  background-image: url(../assets/footer-bar/style2/nav_icon_lesson_n.png);
}
.footer-bar-style2 .icon-learn{
  background-image: url(../assets/footer-bar/style2/nav_icon_buy_n.png);
}
.footer-bar-style2 .icon-me{
  background-image: url(../assets/footer-bar/style2/nav_icon_me_n.png)
}

.footer-bar-style2 .active .icon-index{
  background-image: url(../assets/footer-bar/style2/nav_icon_index_s.png)
}
.footer-bar-style2 .active .icon-course{
  background-image: url(../assets/footer-bar/style2/nav_icon_lesson_s.png)
}
.footer-bar-style2 .active .icon-learn{
  background-image: url(../assets/footer-bar/style2/nav_icon_buy_s.png);
}

.footer-bar-style2 .active .icon-me{
  background-image: url(../assets/footer-bar/style2/nav_icon_me_s.png)
}


.footer-bar-style3 .icon-index{
  background-image: url(../assets/footer-bar/style3/nav_icon_index_n.png)
}
.footer-bar-style3 .icon-course{
  background-image: url(../assets/footer-bar/style3/nav_icon_lesson_n.png);
}
.footer-bar-style3 .icon-learn{
  background-image: url(../assets/footer-bar/style3/nav_icon_buy_n.png);
}
.footer-bar-style3 .icon-me{
  background-image: url(../assets/footer-bar/style3/nav_icon_me_n.png)
}

.footer-bar-style3 .active .icon-index{
  background-image: url(../assets/footer-bar/style3/nav_icon_index_s.png)
}
.footer-bar-style3 .active .icon-course{
  background-image: url(../assets/footer-bar/style3/nav_icon_lesson_s.png)
}
.footer-bar-style3 .active .icon-learn{
  background-image: url(../assets/footer-bar/style3/nav_icon_buy_s.png);
}

.footer-bar-style3 .active .icon-me{
  background-image: url(../assets/footer-bar/style3/nav_icon_me_s.png)
}

.footer-bar-style4 .icon-index{
  background-image: url(../assets/footer-bar/style4/nav_icon_index_n.png)
}
.footer-bar-style4 .icon-course{
  background-image: url(../assets/footer-bar/style4/nav_icon_lesson_n.png);
}
.footer-bar-style4 .icon-learn{
  background-image: url(../assets/footer-bar/style4/nav_icon_buy_n.png);
}
.footer-bar-style4 .icon-me{
  background-image: url(../assets/footer-bar/style4/nav_icon_me_n.png)
}

.footer-bar-style4 .active .icon-index{
  background-image: url(../assets/footer-bar/style4/nav_icon_index_s.png)
}
.footer-bar-style4 .active .icon-course{
  background-image: url(../assets/footer-bar/style4/nav_icon_lesson_s.png)
}
.footer-bar-style4 .active .icon-learn{
  background-image: url(../assets/footer-bar/style4/nav_icon_buy_s.png);
}

.footer-bar-style4 .active .icon-me{
  background-image: url(../assets/footer-bar/style4/nav_icon_me_s.png)
}


</style>
