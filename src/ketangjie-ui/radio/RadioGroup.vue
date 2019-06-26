<template>
    <div class="ktj-radio-group">
        <slot />
    </div>
</template>
<script>
import KtjRadio from './Radio'
export default {
    name:'RadioGroup',
    props:[
        'value'
    ],
    mounted(){
        // let radios = []
        // this.$slots.default.map(slot=>{
        //     if(slot.componentOptions && slot.componentOptions.tag === 'ktj-radio'){
        //         let props = slot.componentOptions.propsData
        //         radios.push({
        //             label:props.label
        //         })
        //     }
            
        // })
        // this.radios = radios
    },
    components:{
        KtjRadio
    }
}
</script>
<style scoped>

</style>

