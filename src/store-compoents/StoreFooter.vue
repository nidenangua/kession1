<template>
    <div class="footer-container">
        <div class="complain-link" v-if="showLink">
            <span @click="$navigateTo('/')">店铺主页</span>
            <span @click="$navigateTo('/course')">发现</span>
            <span @click="$navigateTo('/user/course')">我的课程</span>
            <span @click="$navigateTo('/user')">个人中心</span>
        </div>
        <div class="complain-footer" v-if="$store.state.info.version === 'v1'">联系电话：{{$store.state.info.tel}}<br />{{$store.state.info.sitename}}</div>
        <div class="complain-footer" v-else>课堂街提供技术支持<br />www.ketangjie.com</div>
    </div> 
</template>
<script>
export default {
    name:'StoreFooter',
    data(){
        return{
            showLink:false
        }
    },
    mounted(){
        if(window.__wxjs_environment === 'miniprogram'){
            this.showLink = false
        }else{
            this.showLink = true
        }
    }
}
</script>
<style scoped>
.footer-container{
    padding:15px 10px;
    text-align: center;
    line-height: 20px;
    color: #999
}
.footer-container .complain-footer span{
    color:#41679f
}
.footer-container .complain-link span{
    color: #999;
    padding: 0 8px;
    position: relative;
}
.footer-container .complain-link span::before{
    content:'';
    width: 1px;
    height: 12px;
    background: #999;
    position: absolute;
    left: -4px;
    top: 3px;
}
.footer-container .complain-link span:first-child::before{
    display: none
}
</style>
