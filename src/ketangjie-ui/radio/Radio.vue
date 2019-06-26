<template>
    <div class="ktj-radio" :class="value === label && 'ktj-radio-checked'" @click="radioClick">
        <span class="ktj-radio__inner"></span>
        <slot />
    </div>
</template>
<script>
export default {
    name:'KtjRadio',
    props:[
        'label',
        'value'
    ],
    model:{
        prop:'value',
        event:'change'
    },
    methods:{
        radioClick(){
            this.$emit('change',this.label)
        }
    }
}
</script>
<style scoped>
.ktj-radio{
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    margin-right: 30px;
    cursor: pointer;
    color:#666;
}

.ktj-radio__inner{
    width: 13px;
    height: 13px;
    display: inline-block;
    border:1px solid #e3e3e3;
    box-sizing: border-box;
    border-radius: 50%;
    position:relative;
    top: 2px;
    margin-right: 5px;
}
.ktj-radio-checked .ktj-radio__inner{
    border: 5px solid #e64a3b;
    position: relative;
}

</style>

