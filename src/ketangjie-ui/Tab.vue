<template>
    <div class="ktj-tab">
        <ul>
            <li v-for="(name,i) in tabInfo.options" :key="i" :class="i == tabInfo.current && 'ktj-color-primary'" @click="slideTab(i)">
                <span><i class="ktj-bg-primary ktj-active__line" v-if="i == tabInfo.current"></i>{{name}} </span>
            </li>
        </ul>
    </div>    
</template>
<script>
export default {
    name:'KtjTab',
    props:[
        'tabInfo'
    ],
    methods:{
        slideTab(i){
            this.tabInfo.current = i
            let index = this.tabInfo.values ? this.tabInfo.values[i] : i
            this.$emit('change',index)
        }
    }
}
</script>
<style scope>
.ktj-tab ul{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.ktj-tab li {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    color: #666;
    position: relative
}
.ktj-tab li span {
    position: relative;
    display: inline-block;
}

.ktj-tab li span .ktj-active__line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    width: 100%;
}
</style>
