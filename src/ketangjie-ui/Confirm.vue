<template>
    <transition name="fade-up">
        <div class="ktj-confirm" v-if="visible">
            <div class="ktj-confirm-title ktj-line">
                <div class="ktj-confirm__close ktj-info-color ktj-fr" @click="cancel">
                    <i class="ktj-icon ktj-icon-close ktj-fz22"></i>
                </div>
                提示
            </div>
            <div class="ktj-confirm-text">
                {{msg}}
            </div>
            <div class="ktj-confirm-button">
                <ktj-button size="medium" type="primary" @click="sure">确定</ktj-button>
                <ktj-button size="medium ktj-ml5" @click="cancel">取消</ktj-button>
            </div>
        </div>
    </transition>
</template>
<script>
import Vue from 'vue'
export default {
    name:'Confirm',
    data(){
        return {
            visible:false,
            msg:'您确定要这样做吗？'
        }
    },
    methods:{
        sure(){
            //...
        },
        cancel(){
            //...
        }
    }
}
</script>

<style scoped>

.ktj-confirm{
    width: 80%;
    max-width: 400px;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 20%;
    background: #fff;
    border-radius: 4px;
    position: fixed;
    z-index: 999;
    box-sizing: border-box;
    padding: 20px;
}
.ktj-confirm-title{
    font-size: 16px;
    padding-bottom: 15px;
}
.ktj-confirm__close{
    width: 32px;
    text-align: center;
    color:#aaa;
}

.ktj-confirm-text{
    font-size: 16px;
    line-height: 22px;
    padding: 20px 0 30px 0;
}
.ktj-confirm-button{
    float:right;
}
</style>
