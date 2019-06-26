<template>
    <div v-if="dataList.length">
        <div class="drag-exam">
           
        </div>
    </div>
</template>
<script>
import {domap} from '@/utils'
export default {
    name:'Course',
    props:[
        'dataList',
        'dataStyle'
    ],
    data(){
        return {

        }
    },
    methods:{
        open(item){
            this.$router.push('/course/'+item.courseid)   
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>


</style>
