<template>
    <div>
        <div class="drag-nav">
            <ul class="clearfix">
                <li v-for="(item,i) in dataList" :key="i" @click="open(item.url)">
                    <img :src="item.icon" />
                    <p>{{item.name}}</p>
                    
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Nav',
    props:[
        'dataList',
        'dataStyle'
    ],
    methods:{
        open(url){
            if(url)
            location.href = url
        }
    }
}
</script>
<style scoped>
.drag-nav{
    padding: 10px 0;
    background: #fff
}
.drag-nav ul{
	text-align: center; 
	display: -webkit-box;  
    display: -moz-box;     
    display: -ms-flexbox; 
    display: -webkit-flex; 
	display: flex;
}
.drag-nav li{ 
	-webkit-box-flex: 1;
    -moz-box-flex: 1;     
    -webkit-flex: 1;  
    -ms-flex: 1;
	flex: 1;         
}
.drag-nav img{
    height: 32px;
}
.drag-nav p{
    line-height: 20px;
    height: 20px;
    overflow: hidden;
}
</style>
