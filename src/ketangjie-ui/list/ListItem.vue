<template>
    <div class="ktj-list-item" :style="getStyle()" ref="listItem" @click="$emit('click')">
        <slot name="icon" />
        {{title}}
        <i class="ktj-icon ktj-icon-arrow-ios-forward-outline" v-if="showArrow !==undefined && showArrow !== false"></i>
        <div class="ktj-list-item__after">
            <slot />
        </div>
        
    </div>
</template>
<script>
export default {
    name:'KtjListItem',
    props:['title','showArrow'],
    methods:{
        /**
         * 获取样式
         */
        getStyle(){
            let itemHeight = this.$parent.itemHeight;
            if(itemHeight){
                return {
                    height:itemHeight,
                    lineHeight:itemHeight
                }
            }
        }
    }
}
</script>
<style scoped>

.ktj-list-item{
    height: 44px;
    line-height: 44px;
    overflow: hidden;
    background: #fff;
    padding: 0 15px;
    position: relative;
    font-size: 16px;
}
.ktj-list-item::after{
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
	left: 15px;
	right: 0;
    z-index: 1;
}
.ktj-list-item:last-child::after{
    display: none
}
.ktj-list-item__after{
    float: right;
    font-size: 14px;
    color: #999;
    
}
.ktj-list-item .ktj-icon-arrow-ios-forward-outline{
    float: right;
    color:#b3b3b3;
    margin-left: 15px;
}

</style>


