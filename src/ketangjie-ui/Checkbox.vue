<template>
    <div class="ktj-checkbox" @click="change" :class="checked && 'ktj-checked'">
        <i class="ktj-icon ktj-icon-checkmark-outline" v-if="checked"></i>
    </div>
</template>
<script>
export default {
    name:'Checkbox',
     props: {
        checked: Boolean
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    methods:{
        change(){
            let v = this.checked ? false : true
            this.$emit('change',v)
        }
    }
}
</script>
<style lang="scss" scoped>
.ktj-checkbox{
    width:14px;
    height: 14px;
    display: inline-block;
    overflow: hidden;
    background: #ccc;
    border-radius: 3px;
    border: 1px solid #e3e3e3;
    background: none;
    text-align: center;
    line-height: 14px;
}
.ktj-checkbox.ktj-checked{
    background: #e64a3b;
    border:1px solid #e64a3b;
}
.ktj-checkbox.ktj-checked .ktj-icon{
    color:#fff;
    font-size: 14px;
}
</style>

