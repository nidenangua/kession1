<template>
   <div class="admire-wrap">
        <div class="title">
            <span>感觉还不错，给点打赏吧</span>
        </div>
        <div class="admire" @click="admireFlag = true">
            打赏
        </div>
        <div class="admire-title"><span>{{admireCount}}</span>人赞赏</div>
        <div class="admire-list">
            <div class="admire-list__item" v-for="(item,i) in admire" :key="i">
				<ktj-create-bg :src="item.userhead" type="user"></ktj-create-bg>
                
            </div>
        </div>
		<ktj-dialog title="打赏作者" :visible.sync="admireFlag">
			<div v-show="admireTab == 1">
				<div class="admire-options clearfix">
					<div class="item" v-for="(money,i) in moneySelectList" :key="i">
						<div class="inner" @click="rewardPay(money)">
							￥<span>{{money}}</span>
						</div>
					</div>
				</div>
                <div align="center">
					<div class="admire__text_btn ktj-mt10 ktj-color-primary" @click="other">其他金额</div>
				</div>
            </div>
            <div class="clearfix" v-show="admireTab == 2">
                <div class="ktj-mt30 input-wrap"><span>￥</span><input type="number"  v-model="finallyMoney" @keyup="finallyMoneyCheck" ref="monryInput" /></div>
                <ktj-button class="ktj-mt30" width="100%" type="primary" @click="selectMoneyed(finallyMoney)">确定</ktj-button>
				<div align="center">
					<div class="admire__text_btn ktj-mt10 ktj-primary-color" @click="admireTab = 1">固定金额</div>
				</div>
            </div>
		</ktj-dialog>
        
    </div>
    
</template>
<script>
import {getAdmireList} from '@/api/course'
export default {
	name:'Reward',
	props:[
		'infoId',
		'type'
	],
    data(){
        return {
			/** 
			 * 打赏列表
			*/
            admire:[],
            admireCount:0,
            admireTab:1,
            finallyMoney:0,
            admireFlag:false,
            moneySelectList:[1,2,5,10,20,50]
        }
    },
    methods:{
		/**
		 * 确定打赏
		 */
		selectMoneyed(price){
			if(!price){
				this.$toast('请输入打赏金额')
				return false
			}
			let payInfo = {
				payid:this.infoId,
				price:price,
				msg:'打赏',
				type:this.type
			}
			this.$showPay(payInfo,false)
		},
		/**
		 * 快速打赏
		 */
		rewardPay(price){
			this.selectMoneyed(price)
		},
		other(){
			this.admireTab = 2
			this.$nextTick(()=>{
				this.$refs.monryInput.focus()
			})
		},
		/**
		 * 价格校验，保留小数点后两位
		 */
		finallyMoneyCheck(){
			let check = this.finallyMoney.toString().match(/\d+\.?\d{0,2}/)
			if(check){
				this.finallyMoney = check[0]
			}
		}
	},
	mounted(){
		let _type
		switch (this.type) {
			case 'exam':
				_type = 3
				break
			case 'courseReward':
				_type = 4
				break
			case 'classReward':
				_type = 6
				break
			case 'columnReward':
				_type = 8
				break
		}
		
		getAdmireList({
			id:this.infoId,
			type:_type
		}).then(res=>{
			this.admireCount = res.count
			this.admire = res.list
		})
	}

}
</script>
<style scoped>

.admire-wrap{
	padding: 15px 0;
}
.admire-wrap .title{height: 44px; line-height: 44px; position: relative; text-align: center; margin: 0 15px;}
.admire-wrap .title:after{content: '';width:100%;height: 1px; background: #eef2f5; position: absolute;top:50%;left:0; overflow: hidden;}
.admire-wrap .title span{ position: relative;background: #fff; z-index: 9; padding: 0 20px; font-size: 14px;}
.admire{
	width: 70px;
	height: 34px;
	margin: auto;
	margin-top: 10px;
	background: #DD5E4D;
	text-align: center;
	border-radius: 4px;
	color: #fff;
	font-size: 14px;
	line-height: 34px;
}
.admire__text_btn{
	text-align: center;
	height: 44px;
	line-height: 44px;
	display: inline-block;
	padding: 0 15px;
	text-align: center;
	font-size: 14px;
}
.admire-list{
	overflow: hidden;
}
.admire-list__item{
	float: left;
	width: 12.5%;
	margin-top:10px;
}
.admire-list__item .ktj-create-bg{
	width: 30px;
	height: 30px;
	display: block;
	margin: 0 auto;
	border-radius: 50%
}
.admire-title{
	text-align: center;
	margin:10px 0;
	font-size: 14px;
	color:#999;
}
.admire-list .item .inner{
	margin:0 5px;
}
.admire-list .item .inner img{
	width: 100%;
	height: auto;
	border-radius: 50%;
}

.admire-options .head>img{
	display: inline-block;
	height: 24px;
}
.admire-options .item{
	width: 33.3%;
	float: left;
	margin-bottom: 10px;
}
.admire-options .item .inner{
	margin: 0 5px;
	overflow: hidden;
	border:1px solid #e85c4a;
	border-radius: 5px;
	color: #e85c4a;
	text-align: center;
	font-size:16px;
	padding: 7px 0;  
}
.admire-options .item .inner span{
	font-size: 20px;
}


.input-wrap{
	display: flex;
	justify-content: center;
	position: relative;
}
.input-wrap span{
	font-weight: bold;
	font-size: 24px;
	line-height: 44px;
	
}
.input-wrap input{
	height: 44px;
	font-size: 36px;
	border: 0;
	box-sizing: border-box;
	width: 120px;
	border-radius: 4px;
	background: none;
}

</style>
