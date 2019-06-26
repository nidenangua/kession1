<template>
  <div>
		<ktj-tabs v-model="paystatus" @tab-click="changeTab">
			<ktj-tab-pane label="全部" :name="-1">
			</ktj-tab-pane>
			<ktj-tab-pane label="已付款" :name="1">
			</ktj-tab-pane>
			<ktj-tab-pane label="未付款" :name="2">
			</ktj-tab-pane>
		</ktj-tabs>
		<ktj-page-scroll-container class="my-order-list" :page="page" :page-count="pageCount" @page-change="getOrderList"  v-if="datas.length">
			<div class="item" v-for="(item,i) in datas" :key="i">
				<div class="myList-time line">
					<span class="status" :class="item.paystatus == 0 && 'ktj-color-error'">{{(item.paystatus == 0 && '待付款') || (item.paystatus == 1 && '已付款') || (item.paystatus == 2 && '退款中') || (item.paystatus == 3  && '已退款')}} </span>
					<span class="order-time" v-if="item.paystatus == 0">下单时间：{{item.adddate}}</span>
					<span class="order-time" v-else-if="item.paystatus == 1">付款时间：{{item.paydate}}</span>
				</div>
				
				<div class="order-body line" v-for="(order,index) in item.courseOrder" :key="index" @click="openView(order,item.storeinfo.storeurl)">
					<ktj-create-bg :src="order.defaultpic" class="defaultpic" />
					<div class="order-body-info">
						<div class="order-body-info-title">
							{{order.title}}
						</div>
						<div class="order-info__type" v-if="order.type == 0 && order.coursetype == 1">点播课程</div>
						<div class="order-info__type" v-else-if="order.type == 0 && order.coursetype == 2">语音直播</div>
						<div class="order-info__type" v-else-if="order.type == 0 && order.coursetype == 3">音频课程</div>
						<div class="order-info__type" v-else-if="order.type == 0 && order.coursetype == 4">图文课程</div>
						<div class="order-info__type" v-else-if="order.type == 1">直播课程</div>
						<div class="order-info__type" v-else-if="order.type == 7">
							专栏
						</div>
						<div class="order-info__type" v-else-if="order.type == 9">
							会员卡
						</div>
						<div class="order-info__type" v-else-if="order.type == 10">
							社群
						</div>
						<div class="price">
							<span class="ktj-color-error">￥{{order.price}}</span>
						</div>
					</div>
				</div>
				
				<div class="order-bottom">
					<div class="ktj-fr">         
						<ktj-button class="ktj-ml5" size="small" v-if="item.paystatus == 0" @click="delorder(i,item.ordersn)">删除订单</ktj-button>
						<ktj-button class="ktj-ml5" size="small" type="primary" v-if="item.paystatus==0" @click="pay(item.payurl)">立即付款</ktj-button>
						<ktj-button class="ktj-ml5" size="small" v-if="item.paystatus == 1 ||item.paystatus==3" @click="chakanDetail(item.ordersn)">查看订单</ktj-button>
						<!-- <ktj-button class="ktj-ml5" size="medium" v-if="items.groupid  && item.paystatus==1" @click="mycollage(item.lookurl)">我的拼团</ktj-button>
						<ktj-button class="ktj-ml5" size="medium" v-if="items.groupid && item.paystatus==1 && item.successful==0" @click="tuikuan(index,item.ordersn)">等待退款</ktj-button>
						<ktj-button class="ktj-ml5" size="medium" v-else-if="items.groupid && item.paystatus==1 && item.successful==2" @click="tuikuan(index,item.ordersn)">拼团中</ktj-button> -->
					</div>
					<div v-if="hasToken === 1" @click="open(item.storeinfo.storeurl)">
						<ktj-create-bg :src="item.storeinfo.storelogo" class="ktj-fl"  type="logo" />
						{{item.storeinfo.storename}}
					</div>
					
				</div>

					
			</div>
		</ktj-page-scroll-container>
		
		<ktj-empty type="noorder" msg="暂时没有订单~" v-else-if="loaded" />

		<!-- <ktj-dialog title="申请退款" :visible.sync="refund">
			<div class="ktj-alert">为保证您的资金安全，请填写以下信息，我们到时候会与您联系确认。</div>
			<ktj-form label-width="70px">
				<ktj-form-item label="手机号">
					<input class="ktj-input" ref="tel" type="number" v-model="tel" placeholder="请输入您的手机号">
				</ktj-form-item>
				<ktj-form-item label="微信号">
				<input class="ktj-input" type="text" ref="wechat" v-model="wechat" placeholder="请输入您的微信号">
				</ktj-form-item>
			</ktj-form>
			<div class="ktj-text-center ktj-mt15">
				<ktj-button size="medium" @click="refund = false">取消</ktj-button>
				<ktj-button size="medium" type="primary" @click="confirmsure">确认</ktj-button>
				
			</div>
		</ktj-dialog> -->
		
		<store-footer v-if="hasToken === 0" />
  </div>
</template>

<script>
import {getParams,getViewRoute} from '@/utils'
import {getUserCourseOrder,deleteOrder} from '@/api/user'
export default {
  name: 'CourseOrder',
  data () {
    return {
		hasToken:-1,
		/**
		 * 分页信息
		 */
		page:1,
		pageCount:1,
		/**
		 * 当前筛选类型
		 */
		paystatus:-1,

		/**
		 * 数据信息
		 */
		loaded:false,
		datas:[],
		/**
		 * 退款信息
		 */
		refund:false,
		tel:'',
		wechat:'',
		tuikuanindex:-1
	}
  },
  methods:{
	  	/**
		 * 选项卡切换回调
		 */
		changeTab (pay) {
			this.paystatus = pay
			this.pageCount = null
			this.loaded = false
			this.getOrderList()
		},

		/**
		 * 删除订单
		 */
		delorder (index,sn) { 
			this.$confirm('确定要删除该订单吗？').then(()=>{
				let params = {
					ordersn:sn
				}
				let par = getParams()
				if(par.h5token){
					params.h5token = par.h5token
				}
				deleteOrder(params).then(res=>{
					this.$toast(res.msg,'success').then(()=>{
						this.datas.splice(index,1)
					})
					
					
				})
			})
			
		},
		/**
		 * 跳链接
		 */
		open(url){
			location.href = url
		},
		/**
		 * 打开详情页
		 */
		openView(item,storeUrl){
				if(item.type != 9){
					let params = getViewRoute(item,'courseid')
					location.href = storeUrl + '/#'+params
				}
			
		},
		/**
		 * 跳转我的拼团
		 */
		// mycollage (url) {
		// 	location.href=url
		// },
		
		/**
		 * 退款
		 */
		// tuikuan(index,ordersn){
		// 	this.refund = true;
		// 	this.sn = ordersn;
		// 	this.tuikuanindex = index;
		// },
		/**
		 * 确认申请退款
		 */
		// confirmsure(param){
		// 	if(!this.tel.replace(/\s+/g, "").length){
		// 		this.$toast('手机号不能为空')
		// 		this.$refs.tel.focus()
		// 		return false
		// 	}else if(!isPoneAvailable(this.tel)){
		// 		this.$toast('请输入正确的手机号')
		// 		this.$refs.tel.focus()
		// 		return false
		// 	}else if(!this.wechat.replace(/\s+/g, "").length){
		// 		this.$toast('微信号不能为空')
		// 		this.$refs.wechat.focus()
		// 		return false
		// 	}
		// 	refundOrder({
		// 		ordersn:this.sn,
		// 		wxnum:this.wechat,
		// 		phone:this.tel
		// 	}).then(res=>{
		// 		if(res.errCode==200){
		// 			this.$toast('申请退款成功','success')
		// 			this.datas[this.tuikuanindex].paystatus = 3
					
		// 		}else{
		// 			this.$toast(res.msg)
		// 		}
		// 	})

		// },
		/**
		 * 查看订单
		 */
		chakanDetail (sn) {
			this.$router.push({
				name:'UserOrderInfo',
				params:{
					id:sn
				}
			})
		},
		/**
		 * 支付
		 */
		pay (url) {
			location.href=url
		},
		/**
		 * 获取订单列表
		 */
		getOrderList(page=1){
			this.$showLoading()
			this.page = page
			let params = {
				paystatus:this.paystatus,
				p:this.page,
				maxperpage:10
			}
			let par = getParams()
			if(par.h5token){
				params.h5token = par.h5token
				this.hasToken = 1
			}else{
				this.hasToken = 0
			}
			getUserCourseOrder(params).then(res=>{
				if(this.page === 1){
					this.datas = res.values
				}else{
					this.datas = this.datas.concat(res.values)
				}
				
				this.pageCount = res.page.total_pages
				this.loaded = true
				this.$hideLoading()
			})
		}
  },
  mounted(){
		this.getOrderList()
		
  },
  activated(){
		document.title = '我的订单'
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.my-order-list .item{width:100%;font-size:14px;color:#353535;margin-top:10px;background:#fff;padding-left:10px;box-sizing:border-box}
.my-order-list .item:last-child{margin-bottom:10px}
.my-order-list .item .i-head{flex:1;overflow:hidden}
.my-order-list .item .i-body{margin-left:10px}
.my-order-list .item .teacher{font-size:16px;color:#353535}

.myList-time{font-size:12px; color: #999; height: 36px; line-height: 36px; overflow: hidden; padding-right: 10px}
.myList-time .status{float: right}

.order-body{
	display:flex;
	align-items:flex-start;
	padding:10px 10px 10px 0;
}
.order-body .defaultpic{
	width:140px;
	height:80px;
	display:block;
	margin-right:10px;
	border-radius:5px;
	position:relative;
}

.order-body .defaultpic .status{
	width:40px;
	height:20px;
	line-height:20px;
	font-size:13px;
	color:#fff;
	background:rgba(0,0,0,.3);
	position:absolute;
	top:2px;
	right:2px;
	text-align:center;
	border-radius:4px;
}
.order-body .order-body-info{
	flex:1;
	height:80px;
	position:relative;
	overflow:hidden; 
}
.order-body-info-title{
	font-size:14px;

	line-height:20px;
	height: 40px;
	margin-bottom:5px;
	overflow: hidden;
}
.price{
	position:absolute;
	bottom:0;
	right:0;
}

.order-info__type{
    color:#999;
	margin-top: 6px;
	font-size: 12px;
}
.order-bottom{
	padding:6px 10px 6px 0;
	height: 32px;
	line-height: 32px;
	font-size: 13px;
	overflow: hidden;
	
}
.order-bottom .ktj-create-bg{
	width: 26px;
	height: 26px;
	position: relative;
	top: 3px;
	margin-right: 10px;
	border-radius: 50%;
}




  </style>
