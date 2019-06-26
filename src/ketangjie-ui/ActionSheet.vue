<template>
    <div class="ktj-action-sheet" v-if="visible">
        <div class="ktj-action-sheet__list" v-if="list.length">
            <div class="ktj-action-sheet__item" :class="index < list.length-1 && 'line'" v-for="(item,index) in list" :key="index" @click="change(item)">
                {{item.name}}
            </div>
        </div>
        <div class="ktj-action-sheet__cancel ktj-color-primary ktj-mt10" @click="cancel">
            取消
        </div>
    </div>
</template>
<script>
export default {
    name:'ActionSheet',
    data(){
        return {
            visible:false,
            list:[]
        }
    },
    /**
     * 预留函数，核心函数控制在ketangjie-ui index.js
     */
    methods:{
        change(item){
            //...
        },
        cancel(){
            //...
        }
    }
}
</script>
<style scoped>
.ktj-action-sheet{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 999;
}
.ktj-action-sheet__item,
.ktj-action-sheet__cancel{
    height: 49px;
    line-height: 49px;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
    background: #fff;
}

</style>

