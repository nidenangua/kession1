<template>
    <div class="ktj-tabs">
        <div class="ktj-tabs__header">
            <div class="ktj-tab__item" v-for="item in tabs" :key="item._uid" :class="item.name === activeName && 'ktj-color-primary'" @click="slideTab(item.name)">
                <span>
                    <i class="ktj-tab__info" v-if="item.info">{{item.info}}</i>
                    <i class="ktj-tab__active_line ktj-bg-primary" v-if="item.name === activeName"></i>
                    {{item.label}}
                </span>
            </div>
        </div>
        <div class="ktj-tabs-content">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name:'KtjTabs',
    props:[
        'activeName'
    ],
    data(){
        return {
            tabs:[]
        }
    },

    model:{
        prop: 'activeName',
        event: 'change'
    },
    methods:{
        slideTab(name){
            this.$emit('change',name)
            this.$emit('tab-click',name)
        },
        setTabs(){
            
            let tabs = []
            this.$children.map(child=>{
                tabs.push({
                    _uid:child._uid,
                    label:child.label,
                    name:child.name,
                    info:child.info
                })
            })
            this.tabs = tabs
        }
    },
    mounted(){
        this.setTabs()
    }
}
</script>

