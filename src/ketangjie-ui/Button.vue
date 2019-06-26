<template>
    <button type="button" class="ktj-button" ref="ktjButton" :style="getStyle()" :class="buttonClass" @click="click">
        <i class="ktj-icon" :class="icon" v-if="icon"></i>
        <slot />
    </button>
</template>
<script>
export default {
    name:'KtjButton',
    props:[
        'type',
        'size',
        'icon',
        'width',
        'height',
        'disabled',
        'round',
        'plain'
    ],
    data(){
        return {
            buttonStyle:{},
            buttonClass:''
        }
    },
    watch:{
        size(){
            this.getClass()
        },
        width(){
            this.getClass()
        },
        height(){
            this.getClass()
        },
        icon(){
            this.getClass()
        },
        disabled(){
            this.getClass()
        },
        type(){
            this.getClass()
        }
    },
    methods:{
        /**
         * 获取按钮样式名
         */
        getClass(){
            let buttonClass = []
            if(this.size){
                buttonClass.push('ktj-button-'+this.size)
            }
            if(this.type){
                buttonClass.push('ktj-button-'+this.type)
            }else{
                buttonClass.push('ktj-button-default')
            }
            
            if(this.disabled){
                buttonClass.push('ktj-button-disabled')
            }
            if(this.round !== undefined){
                buttonClass.push('ktj-button-round')
            }
            if(this.plain !== undefined){
                buttonClass.push('ktj-button-plain')
            }
            this.buttonClass = buttonClass.join(' ')
        },
        /**
         * 获取额外样式
         */
        getStyle(){
            let style = {};
            if(this.width){
                style.width = this.width
            }
            if(this.height){
                style.height = this.height
            }
            return style
        },
        /**
         * 点击回调
         */
        click(){
            if(!this.disabled){
                this.$emit('click')
            }
        },

    },
    mounted(){
        this.getClass()
    }
    
}
</script>

<style scoped>
.ktj-button{
	display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    cursor: pointer;
    background-color: #fff;
    border-width: 1px;
    border-style: solid;
    border-color: #ebedf0;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    outline: none;
    transition: .1s;
    font-weight: 500;
    padding: 0 15px;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    opacity: 0.95;
    font-weight: bold;
}

.ktj-button:focus{
    opacity:1
}
.ktj-button-default:focus{
    background: #f9f9f9
}
.ktj-button-primary{
    background: #e64a3b;
    color: #fff;
    border-color: #e64a3b;
}
.ktj-button-success{
    background: #36b04e;
    color: #fff;
    border-color: #36b04e;
}
.ktj-button-gray{
    background: #999;
    color: #fff;
    border-color: #999;
}
.ktj-button-plain{
    background: none;
    color:#e64a3b;
    border-color: #e64a3b;
}

.ktj-button-medium{
    height: 36px;
    line-height: 36px;
    font-size: 14px;
}
.ktj-button-small{
    height: 32px;
    line-height: 32px;
    font-size: 13px;
}
.ktj-button-mini{
    height: 28px;
    line-height: 28px;
    font-size: 12px;
}

.ktj-button-disabled,
.ktj-button-disabled:focus{
    opacity: 0.6;
    cursor: no-drop
}
.ktj-button .ktj-icon{
    font-size: 18px;
    position: relative;
    float: left;
    position: relative;
    top: -1px;
    margin-right: 5px;
}
.ktj-button-round{
    border-radius: 44px;
}

</style>

