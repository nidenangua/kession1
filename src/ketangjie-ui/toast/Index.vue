<template>
    <div v-if="show">
        <div class="ktj-toast__mask"></div>
        <div class="ktj-toast-long" v-if="msg && msg.length >= 7">
            <span>
                {{msg}}
            </span>
        </div>
        <div class="ktj-toast" v-else>
            <i class="ktj-toast__icon ktj-toast__icon__loading" v-if="type === 'loading'"></i>
            <i class="ktj-toast__icon ktj-toast__icon__success" v-else-if="type === 'success'"></i>
            <i class="ktj-toast__icon ktj-toast__icon__error" v-else-if="type === 'error'"></i>
            <i class="ktj-toast__icon ktj-toast__icon__tips" v-else></i>
            <p class="ktj-toast__content">{{msg}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'ktjToast',
    data(){
        return {
            duration:0,
            show:false,
            msg:'',
            type:null
        }
    }
}
</script>
<style scoped>
.ktj-toast__mask{
    width: 100%;
    height: 100%;
    z-index: 5000;
    position: fixed;
    left: 0;
    top: 0
}
.ktj-toast {
    position: fixed;
    z-index: 5001;
    width: 7.6em;
    min-height: 7.6em;
    top: 40%;
    left: 50%;
    margin-left: -3.8em;
    margin-top:-3.8em;
    background: hsla(0,0%,7%,.7);
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
}
.ktj-toast__content {
    font-size: 14px;
    margin-top: 5px;
}


.ktj-toast__icon{
    margin: 25px 0 0;
    width: 44px;
    height: 44px;
    vertical-align: baseline;
    display: inline-block;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%
}
.ktj-toast__icon__success{
    background-image: url(./images/checkmark-circle-2-outline.png);
}
.ktj-toast__icon__error{
    background-image: url(./images/close-circle-outline.png);
}
.ktj-toast__icon__tips{
    background-image: url(./images/alert-circle-outline.png);
}
.ktj-toast__icon__loading {
    
    -webkit-animation: weuiLoading 1s steps(12, end) infinite;
    animation: weuiLoading 1s steps(12, end) infinite;
    background-image: url(./images/loding.svg);
    
}
@-webkit-keyframes weuiLoading{
   0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
   to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}
}
@keyframes weuiLoading {
   0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}
   to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}
}

/*长提示处理*/
.ktj-toast-long{
    max-width: 80%;
    position: fixed;
    z-index: 5001;
    top:40%;
    left: 0;
    right: 0;
    margin:0 auto;
    text-align:center
}
.ktj-toast-long span{
    line-height: 24px;
    background: rgba(0,0,0,0.6);
    color:#fff;
    padding: 8px 20px;
    border-radius: 4px;
    display: inline-block;
    font-size: 14px;
    text-align: left;
}

</style>

