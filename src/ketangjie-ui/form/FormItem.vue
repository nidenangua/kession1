<template>
    <div class="ktj-form-item ktj-line" ref="ktjFormItem" :style="{paddingLeft:labelWidth}">
        <div class="ktj-form-item__label">
            <i class="ktj-color-primary" v-if="required !== undefined && required !== false" >*</i>
            {{label}}
        </div>
        <slot />
    </div>
</template>
<script>
export default {
    name:'KtjFormItem',
    props:['label','required'],
    data(){
        return {
            labelWidth:'100px'
        }
    },
    watch:{
        '$parent.labelWidth':{
            handler(v){
                this.labelWidth = v || '100px'
            },
            immediate:true
        }
    }
}
</script>
<style scoped>

.ktj-form-item{
    min-height: 44px;
    position: relative;
    background: #fff;
    line-height: 44px;
    font-size: 14px;
}
.ktj-form-item__label{
    position: absolute;
    left: 0;
    top: 0;
    
}
.ktj-form-item__label i{
    position: absolute;
    left: -10px;
    top:0;
    font-style: normal
}
</style>


