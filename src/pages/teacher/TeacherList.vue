<template>
	<div class="container">
		<div class="teacher-item" v-for="(item,i) in teacherList" :key="i">
			<ktj-create-bg class="teacher-img" src="" type="user">
				
			</ktj-create-bg>
			<div class="teacher-text">
				<div class="teacher-text_name">
					{{item.name}}<span>{{item.position}}</span>
				</div>
				<div class="teacher-text_introduce">{{item.shortIntro}}</div>
			</div>
		</div>
		<!-- 刷新插件 -->
		<ktj-page-scroll-container :page="params.p" :page-count="pageCount" @page-change="getList">  
		</ktj-page-scroll-container>
	</div>
</template>

<script>
	import {getStoreData} from '@/api/store'
	export default {
	    name:'TeacherList',
	    data(){
	        return {
				loaded:false,
				teacherList:[],
				params:{
				  act:'appTeacher',
				  callKeyName:'getTeacherList',
				  p:1,
				  data:{
				    //...
				  },
				  maxperpage:5
				},
				pageCount:null,
	        }
	    },
		methods: {
			getList(p=1){
				this.loaded = false;
				this.$showLoading();
				this.params.p = p
			/**
			 * 获取数据
			 */
			getStoreData([this.params]).then(res=>{
				console.log(res)
				this.teacherList = res.getTeacherList.list
				console.log(this.teacherList)
				this.pageCount = res.getTeacherList.page.total_pages
				console.log(this.pageCount)
			});  
			this.loaded = true;
			this.$hideLoading()   
			}
		},
		activated(){
		  document.title = '名师大咖'
		  
		},
		created(){
			this.getList() 
		}
	}
</script>
	
<style>
	.container{
		width: 100%;
		min-height: 100vh;
		padding-top: 20px;
		
	}
	.teacher-item{
		width: 85%;
		padding-right: 5%;
		margin: 0 auto;
		background: #fff;
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}
	.teacher-img{
		margin: 25px 20px;
		width: 55px;
		height: 55px;
		border-radius: 50%;
		overflow: hidden;
	}
	.teacher-img img{
		width: 55px;
		height: 55px;
		border-radius: 50%;
		overflow: hidden;
	}
	.teacher-text{
		flex: 1;
		height: 50px;
		overflow: hidden;
	}
	.teacher-text_name{
		color: #333;
		font-size: 16px;
	}
	.teacher-text_name span{
		color: #999999;
		font-size: 11px;
		margin-left: 20px;
	}
	.teacher-text_introduce{
		margin-top: 12px;
		font-size: 13px;
		color: #666666;
		display:block;
		white-space:nowrap;
		overflow:hidden; 
		text-overflow:ellipsis;
	}
</style>
