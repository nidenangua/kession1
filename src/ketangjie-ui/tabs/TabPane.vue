<template>
    <div class="ktj-tab-pane" :style="{display:name === $parent.activeName ? 'block' : 'none'}">
        <slot />
    </div>
</template>
<script>
export default {
    name:'KtjTabPane',
    props:[
        'label',
        'name',
        'info'
    ],
    watch:{
        info(){
            this.$parent.setTabs()
        }
    },
    mounted(){
        this.$parent.setTabs()
    }
}
</script>

