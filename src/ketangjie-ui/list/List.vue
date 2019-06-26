<template>
    <div class="ktj-list">
        <div class="ktj-list__title" v-if="title">{{title}}</div>
        <slot />
    </div>
</template>
<script>
export default {
    name:'KtjList',
    props:['title','itemHeight']
}
</script>
<style scoped>

.ktj-list__title{
    height: 44px;
    line-height: 44px;
    color:#666;
    font-size: 14px;
    overflow: hidden;
    padding: 0 15px;
}
</style>
