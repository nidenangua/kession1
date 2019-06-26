<template>
  <div v-if="$store.state.isLogin != -1">
     <div @click="open({url:'/user/setting'})" class="user_header" :class="!isStudent && 'line'">
        <div class="user_id" v-if="$store.state.isLogin == 0">  

            <ktj-create-bg class="user_img" src="../../assets/common/default-avatar.jpg" type="user" />
            <div class="user_name">
              <i class="ktj-icon ktj-icon-arrow-ios-forward-outline"></i>
              <h3>请先登录</h3>
              <p><i class="ktj-icon ktj-icon-smartphone-outline"></i>未填写</p>
            </div>
        </div>
        <div class="user_id" v-else-if="$store.state.isLogin == 1">
            <ktj-create-bg class="user_img" :src="$store.state.userInfo.headimg" type="user" />
            <div class="user_name">
              <i class="ktj-icon ktj-icon-arrow-ios-forward-outline"></i>
              <h3>{{$store.state.userInfo.name || $store.state.userInfo.username}}</h3>
              <p><i class="ktj-icon ktj-icon-smartphone-outline"></i>{{$store.state.userInfo.mobile || '未填写'}}</p>
            </div>
        </div>
     </div>
     <!--个人会员-->
     <div class="user_menu" v-if="isStudent">
        <ktj-list  class="ktj-mt10" v-for="(list,index) in menu" :key="index">
            <ktj-list-item :title="item.name" v-for="(item,i) in list" :key="i" @click="open(item)" show-arrow>
              <div class="ktj-list-item__icon" slot="icon">
                <img :src="item.icon" />
              </div>
              <div class="ktj-list-item__num" v-if="item.message">{{item.message}}
              </div>
            </ktj-list-item>
        </ktj-list>

     </div>
     
     <!--机构或教师-->
     <div v-else>
        <div class="userlist clearfix" v-if="$store.state.userInfo.schoolinfo">
          <ul> 
            <li @click="open({url:'/home.html/default/WeChat/stuadmin',type:'location'})">
              <div class="number">{{$store.state.userInfo.schoolinfo.payorderuser}}</div>
              <div class="item">总付费学员</div>
            </li>
            <li @click="open({url:'/home.html/default/WeChat/stuadmin',type:'location'})">
              <div class="number">{{$store.state.userInfo.schoolinfo.daypayuser}}</div>
              <div class="item">今日付费学员</div>
            </li>
            <li @click="open({url:'/home.html/default/WeChat/order',type:'location'})">
              <div class="number">{{$store.state.userInfo.schoolinfo.ordernum || '0.00'}}</div>
              <div class="item">今日总销售额(元)</div>
            </li>
          </ul>
        </div>

        <div class="menu-tab line">
          <ul>
            <li :class="tab == 0 && 'curr'" @click="tab = 0">微门户</li>
            <li :class="tab == 1 && 'curr'" @click="tab = 1">财务结算</li>
        
          </ul>
        </div>
        
        <div class="tab-box" v-show="tab == 0">
          <div class="menu-cont-li">
            <div class="menu-title line">
              知识管理
            </div>
            <ul class="clearfix">
              <li v-for="(item,i) in moduleList" :key="i" @click="open(item)" v-show="item.isopen">
                <i class="icon-box">
                  <img :src="item.icon" />
                </i>{{item.name}}
              </li>
              
              <li @click="addModule">
                <i class="icon-box">
                    <img src="@/assets/user/epicon/me_add@2x.png">	
                  </i>
                  添加模块
              </li>
            
            </ul>
          </div>
          <div class="menu-cont-li">
            <div class="menu-title line">
              设置管理
            </div>
            <ul class="clearfix">
              <li v-for="(item,i) in setMenu" :key="i" @click="open(item)">
                <i class="icon-box">
                  <img :src="item.icon" />
                </i>{{item.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-box" v-show="tab == 1">
					<ul class="menu-cont-list">
						<li @click="open({url:'//test.ketangjie.com/home.html/default/WeChat/order',type:'location'})" class="line"><i class="icon me_order"></i>订单管理</li>
						<li @click="open({url:'//test.ketangjie.com/home.html/default/WeChat/incomedetails',type:'location'})" class="line"><i class="icon me_enter"></i>收入明细</li>
						<li @click="open({url:'//test.ketangjie.com/home.html/default/WeChat/withdraw',type:'location'})" class="line"><i class="icon me_balance"></i>提现管理</li>
						
					</ul>
				</div>

     </div>
    
    <ktj-dialog title="模块设置" :visible.sync="visible">
      <div class="module-list">
          <ul>
            <li class="line" v-for="(item,i) in moduleList" :key="i">
              <span class="switch" :class="moduleSwitch['module'+item.bindIndex] == 1 && 'on'" @click="changeSwitch(item.bindIndex)"></span>开通{{item.name}}
            </li>
           
          </ul>
        </div>
      <div class="module-button">
        <div class="button line line-top" @click="hideMpopup">取消</div>
        <div class="button determine" @click="sureToChangeSwitch">确认</div>
      </div>
    </ktj-dialog>
    
     
  </div>
</template>

<script>

import {cloneData} from '@/utils'
import {saveModuleSwitch} from '@/api/store'
import {getMessageNum} from '@/api/user'
let originalSwitch;
export default {
 
  name: 'user',
  data () {
    return {
      tab:0,
      isStudent:true,
      moduleList:[],
      moduleSwitch:{},
      visible:false,
      menu:[
        [
          {
            icon:require('@/assets/user/me_icon_order.png'),
            name:'我的订单',
            url:'/user/order'
          },
          {
            icon:require('@/assets/user/me_icon_gift.png'),
            name:'赠送记录',
            url:'/user/giftrecode'
          },
        ],
        [
          {
            icon:require('@/assets/user/me_icon_card.png'),
            name:'我的会员卡',
            url:'/user/mycard'
          },
          {
            icon:require('@/assets/user/me_icon_coupon.png'),
            name:'领券中心',
            url:'/user/getVouceher'
          },
          {
            icon:require('@/assets/user/me_icon_coupon.png'),
            name:'我的优惠券',
            url:'/user/vouceher'
          }
        ],
        [
          {
            icon:require('@/assets/user/me_icon_share.png'),
            name:'我的分销',
            url:'/user/distribution'
          },
          {
            icon:require('@/assets/user/me_icon_distribute.png'),
            name:'我的社群',
            url:'/user/group'
          }
        ],
        [
          {
            icon:require('@/assets/user/me_icon_message.png'),
            name:'消息',
            url:'/user/notice',
            message:0
          },
          {
            icon:require('@/assets/user/me_icon_setting.png'),
            name:'设置',
            url:'/user/setting'
          }
        ]
      ],
      setMenu:[
        {
          icon:require('@/assets/user/epicon/me_student@2x.png'),
          name:'学员管理',
          url:'/home.html/default/WeChat/stuadmin',
          type:'location'
        },
        {
          icon:require('@/assets/user/epicon/me_wechat@2x.png'),
          name:'微门户设置',
          url:'/home.html/default/WeChat/gateset',
          type:'location'
        },
        {
          icon:require('@/assets/user/epicon/me_banner@2x.png'),
          name:'banner设置',
          url:'/home.html/default/WeChat/bannerset',
          type:'location'
        },
        {
          icon:require('@/assets/user/epicon/me_style@2x.png'),
          name:'切换风格',
          url:'/user/storestyle'
        },
        {
          icon:require('@/assets/user/epicon/me_pic@2x.png'),
          name:'新闻管理',
          url:'/home.html/default/WeChat/gateNews',
          type:'location'
        }
      ]
    }
  },
  watch:{
    '$route.query.miniprogramHash'(){
      /**
       * 小程序tabBar切换传入hash值，监听此值对页面数据进行更新
       */
      if(window.__wxjs_environment === 'miniprogram'){

        this.$store.dispatch('updateUserInfo')
        this.userload()
      }
    }
  },
  methods:{
    open(item){
      let isLogin = this.$store.state.isLogin;
      if(isLogin == -1){
        return false
      }else if(isLogin == 0){
          this.$navigateTo('/user/login')
          
      }else{
          if(item.type === 'location'){
              location.href = item.url
          }else{
              this.$navigateTo(item.url)
          }
      }
    },
    /**
     * 开关变化
     */
    changeSwitch(bindIndex){
      this.moduleSwitch[`module${bindIndex}`] = this.moduleSwitch[`module${bindIndex}`] == 1 ? 0 : 1
    },
    /**
     * 添加模块
     */
    addModule(){
      originalSwitch = cloneData(this.moduleSwitch);
      this.visible = true;
    },
    /**
     * 关闭模块配置窗口
     */
    hideMpopup(){
      this.visible = false
      /**
       * 点击了取消，将变化的开关恢复
       */
      this.moduleSwitch = originalSwitch
    },

    /**
     * 确认改变开关状态
     */
    sureToChangeSwitch(){
      this.$showLoading();
      let newSwitch;
      Object.keys(this.moduleSwitch).map((key,i)=>{
        let v = this.moduleSwitch[key] ? 1 : 0
        i === 0 ? newSwitch = v : newSwitch += `|${v}`
        
      })
      saveModuleSwitch({
        module:newSwitch
      }).then(res=>{
        if(res.result === 'success'){
          this.updateModule()
          this.visible = false
          
        }else{
          this.$toast('保存失败')
          this.hideMpopup()
        }
        this.$hideLoading()
      })
    },

    updateModule(){
        /**
         * 更新店铺信息
         */
        this.$store.dispatch('updateStoreInfo').then(state=>{
          this.showModule(state)
        })

    },
    showModule(state){
        let _module = cloneData(state.moduleSwitch);
        let moduleSwitch = {};
        let data = new Array();  
        _module.map((item,i)=>{
          moduleSwitch[`module${i}`] = item.isopen
          
          /**
           * 暂时不显示试卷 0图文 1音频 2点播 3语音 4直播 5试卷 6分销
           */
          if(i <= 6 && i != 5){
              item.type = 'location';
              item.bindIndex = i;
              switch(i){
                case 0:
                  item.icon = require('@/assets/user/epicon/me_pic@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=2&livetype=1';
                  break
                case 1:
                  item.icon = require('@/assets/user/epicon/me_audio@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=3';
                  break
                case 2:
                  item.icon = require('@/assets/user/epicon/me_lesson@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=1';
                  break
                case 3:
                  item.icon = require('@/assets/user/epicon/me_audiolive@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=2&livetype=0';
                  break
                case 4:
                  item.icon = require('@/assets/user/epicon/me_live@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=5';
                  break
                case 5:
                  item.icon = require('@/assets/user/epicon/me_test@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=6';
                  break
                case 6:
                  item.icon = require('@/assets/user/epicon/me_test@2x.png');
                  item.url = '/home.html/default/WeChat/gateCourse?coursetype=6';
                  break
              }
              data.push(item)
          }
        })
        this.moduleList = data
        this.moduleSwitch = moduleSwitch
    },
    /**
     * 更新消息数量
     */
    updateMessageNum(num){
      this.menu.map(arr=>{
        arr.map(item=>{
          if(item.message !== undefined){
            item.message = num
            
          }
        })
        
      })
    },
    userload(){
      
      this.$store.ready(state=>{
        if(state.isLogin == 1){
          let usertype = state.userInfo.usertype

          /**
           * 机构或教师
           */
          if(usertype == 1 || usertype == 2){
            this.isStudent = false
            this.showModule(state)
          }else{
            /**
             * 学员获取消息数量
             */
            getMessageNum().then(res=>{
              
              if(res.result === 'success'){
                this.updateMessageNum(res.informationNum + res.noticeNum)
              }
            })
          }

        }else{
          this.isStudent = true
          this.updateMessageNum(0)
        }
        
      })
    }

  },

  activated(){
    document.title = '我的';
    this.userload()
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
 .user_header {
   background: #fff;
   padding:15px;
   
   min-height: 60px;
   position: relative;
  }
 .user_header .user_img {
   height:60px;
   width: 60px;
   overflow: hidden;
   border-radius: 50%;
   position: absolute;
   left: 15px;
   top: 15px;
  }
 .user_header .user_img img {max-width: 100%;height: auto;}
 .user_header .ktj-icon-arrow-ios-forward-outline{
    position: absolute;
    right: 15px;
    width: 16px;
    height: 16px;
    top:50%;
    margin-top:-8px;
    color:#b3b3b3
}


.user_id .user_name {
  padding:7px 0 0 75px
}

.user_id  h3 {
  font-size: 16px;
}
.user_id  p {
  font-size: 12px;
  color:#999;
  margin-top: 7px;
  line-height: 16px;
}
.user_id .ktj-icon-smartphone-outline{
  width: 14px;
  height: 14px;
  float:left;
  margin-right: 2px;
  font-size: 14px;
  
}
.user_id .user_code {
  position: absolute;
  right: 25px;
  width: 20px;
  height: 20px;
  padding: 10px;
  top:50%;
  margin-top: -20px;

}
.user_id .user_code img{
  width: 20px
}


/*机构会员*/

.menu-tab{height: 49px;line-height: 49px; background: #fff; margin-top:10px; overflow: hidden; position: relative;}
.menu-tab ul{overflow-x: auto;margin-right: 44px; -webkit-overflow-scrolling: touch; white-space: nowrap;}
.menu-tab li{margin: 0 15px;font-size:16px;  box-sizing: border-box;color:#5b6067; display: inline-block;}
.menu-tab .curr{position: relative;color:#e64a3b;}
.menu-tab .curr:after{content: '';height:2px; background: #e64a3b; position: absolute;bottom:0;left:0;width:100%}

.userlist{
	overflow: hidden;
	padding: 10px 0;
	text-align: center;
	background: #fff;
}
.userlist li{
	float: left;
	width: 33.3%;
}
.userlist li .number{
	font-size: 20px;
	line-height: 20px;
}
.userlist li .item{
	font-size: 11px;
	line-height: 14px;
	color: #999;
	margin-top: 6px;
}


/*list*/
.menu-cont-list{
  background: #fff;
  margin-top: 10px;
}
.menu-cont-list li{ height: 44px; line-height: 44px; position: relative; padding-left: 36px;margin-left:15px;font-size:14px}
.menu-cont-list li .icon{width:32px;height: 44px; position: absolute;left:0;top:0; background-size:18px; background-repeat: no-repeat; background-position: 50% 50%;}
.menu-cont-list li .me_order{
  background-image: url(../../assets/user/epicon/me_order.png)
}
.menu-cont-list li .me_enter{
  background-image: url(../../assets/user/epicon/me_enter.png)
}
.menu-cont-list li .me_balance{
  background-image: url(../../assets/user/epicon/me_balance.png)
}

.menu-cont-list .set{padding-left:0; text-align: center;color:#37a7ed;margin-left:0;}

.menu-cont-li{
  background: #fff;
  margin-top:10px;
}
.menu-cont-li .icon-box {position: absolute;top: 0;left: 50%;width:30px;height: 30px;margin-left: -15px}
.menu-cont-li .icon-box img {width: 100%;}
.menu-cont-li ul{
  padding-top: 15px;
}
.menu-cont-li li{ position: relative; padding-top: 35px;margin-bottom:15px;font-size:15px;box-sizing: border-box;text-align: center;
width: 33.3333%;float: left;color:#777}
.menu-cont-li .menu-title{
    background: #fff;
    font-size: 16px;
    height: 49px;
    line-height: 49px;
    padding: 0 15px;
}

/*窗口*/

.mpopup{width:92%; position: fixed;left:0; right:0;margin:0 auto;top:30%; background: #fff; z-index: 100;border-radius: 6px; overflow: hidden; max-width: 400px;}
.mpopup-title{height: 44px; line-height: 44px; text-align: center; font-size:16px;}
.switch{width:50px;height: 28px; background:#eaeef1; position: relative; border-radius: 600px;box-shadow: 0 1px 5px rgba(0,0,0,0.05) inset;-webkit-transition: .4s;transition: .4s;} 
.switch:after{content: '';width:26px;height: 26px; position: absolute;left:1px;top:1px; background: #fff;border-radius: 50%; box-shadow: 0 1px 8px rgba(0,0,0,0.05); -webkit-transition: .4s;transition: .4s;}
.switch.on{background: #33c276;}
.switch.on:after{left:23px;}

.module-list{padding: 10px 0;}
.module-list li{height: 44px; line-height: 44px; font-size:14px;margin-left:15px; position: relative;}
.module-list li:last-child::after{
  display: none
}
.module-list .switch,.erpbox .switch{position: absolute;right: 15px;top:50%;margin-top:-14px;}
.module-button .button{width:50%;float:left; text-align: center; font-size: 16px;height: 44px; line-height: 44px;color:#545a5e}
.module-button .determine{ background: #e64a3b;color:#fff;}

  </style>
