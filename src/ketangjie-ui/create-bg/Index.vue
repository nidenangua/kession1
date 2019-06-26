<template>
    <div class="ktj-create-bg" :class="type && 'ktj-create-bg-'+type" :style="style" @click="click" ref="ktjCreateBg">
        <div class="ktj-create-bg__image" :style="{backgroundImage:'url('+src+')'}">
            <slot />
        </div>
    </div>
</template>
<script>

export default {
    name:'KtjCreateBg',
    props:[
        'src',
        'type',
        'ratio',
        'borderRadius'
    ],
    data(){
        return {
            style:{}
        }
    },
    methods:{
        /**
         * 添加事件
         */
        click(){
            this.$emit('click')
        }
    },
    mounted(){
        let style = {
        }
        if(this.ratio){
            let width = this.$refs.ktjCreateBg.offsetWidth
            style.height = width*this.ratio+'px'
        }
        if(this.borderRadius){
            style.borderRadius = this.borderRadius
        }
        this.style = style
        window.addEventListener('resize',e=>{
            let width = this.$refs.ktjCreateBg.offsetWidth
            this.style.height = width*this.ratio+'px'
        })
    }
}
</script>
<style scoped>
.ktj-create-bg{
    position: relative;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    border-radius: 4px;
    background-image:url('./images/img-icon.png')
}
.ktj-create-bg-logo{
    background-image:url('./images/default-logo.png')
}

.ktj-create-bg-user{
    background-image:url('./images/default-avatar.jpg')
}
.ktj-create-bg__image{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover
}
.ktj-create-bg-logo .ktj-create-bg__image{
    background-size:contain
}
</style>


