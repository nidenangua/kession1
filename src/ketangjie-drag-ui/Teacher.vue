<template>
	<div class="teacher-list">
	    <div class="item" @click="open(item.id)" v-for="(item,i) in dataList" :key="i">
			<ktj-create-bg class="item_img" src="" type="user"><img :src="item.head" /></ktj-create-bg>
	        <div class="name">{{item.name}}</div> 
	        <div class="introduce">{{item.shortIntro}}</div>
	    </div>
	</div>
</template>

<script>
	export default {
	    name:'Teacher',
	    props:['dataList'],
	    methods:{
	        open(id){
	            // this.$router.push({
	            //     name:'GroupDetail',
	            //     params:{
	            //         id:id
	            //     }
	            // })
	        }
	    }
	}
</script>

<style>
	.teacher-list{
		width: 100%;
		display: flex;
		flex-wrap:wrap;
		margin-bottom: 2%;
		background: #fff;
	}
	.item{
		width: 42%;
		height: 160px;
		margin: 2% 2% 0 2%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 2%;
		box-shadow: 0 0 10px #dedede;
					
	}
	.item_img{
		margin: 13px 0;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
	}
	.item_img img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
	}
	
	.name{
		color: #333;
		font-size: 14px;
	}
	.introduce{
		color: #999999;
		font-size: 11px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 10px;
	}
</style>
