<template>
    <transition name="fade">
        <div class="ktj-masked" v-show="visible" @click="click"></div>
    </transition>
</template>
<script>
export default {
    name:'Masked',
    data(){
        return{
            visible:false,
            params:{

            }
        }
    },
    methods:{
        click(){
            if(typeof this.params.click === 'function'){
                this.params.click()
            }
        }
    }
}
</script>
<style scoped>
.ktj-masked{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top: 0;
    left: 0;
    z-index: 99;
}
</style>
