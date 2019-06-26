<template>
  <div v-if="$route.name">
    <keep-alive><router-view></router-view></keep-alive>
    
    <footer-bar />

  </div>
</template>

<script>
import { getParams } from '@/utils'
export default {
  name: 'App',
  watch:{
    '$route.name'(){
      /**
       * 监听页面跳转，关闭可能未执行完的进程
       */
      this.$hideLoading()
      this.$hidePay()
    }
  },
  methods:{
    isWeiXin(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true
      }else{
          return false
      }
    }
  },
  mounted(){
    
    /**
     * 调取微信自动登录
     */
    this.$store.ready(state=>{
      if(state.isLogin !== 1){
        let par = getParams()
        if(!par.h5token && this.isWeiXin()){
          let turnurl = this.$route.fullPath.replace(/&/g,',').replace(/\=/g,'-')
          //location.href = '/Json/index.php?act=Users.Common.doWechatLogin&turnurl='+turnurl
      
        }
      }
    })

  }
  
}
</script>

<style>

@import url('/assets/reset/reset.css');
@import url('/assets/eva-icons/eva-icons.css');
/*通用*/
.line{ position:relative;}
.line:after{
	display: block;
	content: " ";
	height: 0px;
	width: 100%;
	box-sizing: border-box;
	border-bottom:1px solid #e3e3e3;
	-webkit-transform: scaleY(0.5);
	-ms-transform: scaleY(0.5);
	transform: scaleY(0.5);
	-webkit-transform-origin: 0 100%;
	-ms-transform-origin: 0 100%;
	transform-origin: 0 100%;
	position: absolute;
	bottom: 0px;
	left: 0;
	right: 0;
	z-index: 1;
}
.line-top:after{
  top:0;
  bottom:inherit;
  -webkit-transform-origin: 0 0;
	-ms-transform-origin: 0 0;
	transform-origin: 0 0;
}
.prism-player .prism-cover{
  background-size: cover !important
}

/*内容*/
.g-news-content p{
    color:#424242 !important;
    line-height:2 !important;
    
}
.g-news-content p,
.g-news-content span{
  font-size: 16px !important;
}
.g-news-content img{
    max-width:100%;
    height: auto !important;
}
.g-news-content__head{
    font-size: 14px;
    font-weight: bold;
    line-height: 34px
}

</style>
