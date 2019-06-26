<template>
    <transition name="fade-up">
        <div class="ktj-dialog" :style="getStyle()" :class="position && 'ktj-dialog-'+position" v-show="visible">
            <div class="ktj-dialog__title">
                <div class="ktj-dialog__close ktj-info-color ktj-fr" @click="$emit('update:visible',false)">
                    <i class="ktj-icon ktj-icon-close"></i>
                </div>
                {{title}}
            </div>
            <div class="ktj-dialog__body">
                <slot />
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name:'Dislog',
    props:['visible','title','width','position','boxShadow','borderRadius'],
    watch:{
        visible:{
            handler(v){
                if(v){
                    this.$showMask({
                        click:()=>{
                            this.$emit('update:visible',false)
                        }
                    })
                }else{
                    this.$hideMask()
                }
            },
            immediate:true
        }
    },
    methods:{
        getStyle(){
            let style = {};
            if(this.width){
                style.width = this.width
            }
            if(this.boxShadow){
                style.boxShadow = this.boxShadow
            }
            if(this.borderRadius){
                style.borderRadius = this.borderRadius
            }
            return style
        }
    }
}
</script>
<style scoped>

.ktj-dialog{
	position: fixed;
    top: 25%;
    left:0;
    right: 0;
    max-width: 400px;
    margin:0 auto;
    overflow: hidden;
    transition: all .2s linear;
    width: 90%;
    border-radius: 4px;
    box-shadow: 0 2px 18px rgba(25,25,25,.1);
    background: #fff;
    z-index: 150;
}
.ktj-dialog-bottom{
    top: inherit;
    bottom: 0;
}
.ktj-dialog__title{
    height: 49px;
    line-height: 49px;
    font-size: 16px;
    padding:0 10px 0 15px;

}
.ktj-dialog__close{
    width: 32px;
    text-align: center;
}
.ktj-dialog__close .ktj-icon-close{
    font-size: 22px;
    color:#aaa;
}
.ktj-dialog__body{
    padding:10px 20px 20px 20px;
}
</style>


