webpackJsonp([37],{"8+ob":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("7rGV"),i=e("6zNQ"),n=e("rVsN"),o=e.n(n),c=e("60kx");var r={name:"ClassView",data:function(){return{loaded:!1,isCanLearn:!1,classInfo:{},classid:this.$route.params.id,isFree:!1,codeImg:"",codeFlag:!1}},methods:{buy:function(){this.$showPay({payid:this.classid,price:this.classInfo.price,msg:"购买直播",type:"class"})},showWechatCode:function(){this.codeFlag=!0}},activated:function(){var t,s=this;this.$showLoading(),document.title="课堂详情",this.loaded=!1,this.isCanLearn=!1,this.classInfo={},this.classid=this.$route.params.id,this.isFree=!1,this.codeImg="",this.codeFlag=!1,(t={id:this.classid},new o.a(function(s){Object(c.b)("Microportal.Common.classDetail",t).then(function(t){s(t)})})).then(function(t){var e,a=t.classinfo;a.studentcount=parseInt(a.studentcount),a.livehours=parseFloat(a.livehours),1==a.iscopy&&s.$antiCopy(!0),s.classInfo=a,"0.00"!=a.price&&1==a.chargetype||(s.isFree=!0),"0.00"!=a.price&&1!=a.isbuy&&1==a.chargetype||(s.isCanLearn=!0,(e={id:s.classid},new o.a(function(t){Object(c.b)("Microportal.Common.getXCXQRcode",e).then(function(s){t(s)})})).then(function(t){s.codeImg=t.imgurl})),s.$wxShare({title:a.title,desc:a.shortdesc,imgUrl:a.defaultpic}),s.loaded=!0,s.$nextTick(function(){s.$hideLoading(),s.$setPreview(s.$refs.classIntro)})})},deactivated:function(){this.$antiCopy(!1)},components:{ItemHeader:i.a,Reward:a.a}},d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.loaded?e("div",{staticClass:"course_container"},[e("item-header",{attrs:{info:t.classInfo,"info-type":"class"}}),t._v(" "),t.classInfo.classintro?e("div",{staticClass:"box_info"},[e("div",{staticClass:"ktj-content"},[e("div",{staticClass:"ktj-content__head"},[t._v("课堂简介")]),t._v(" "),e("div",{ref:"classIntro",domProps:{innerHTML:t._s(t.classInfo.classintro)}})]),t._v(" "),2==t.classInfo.chargetype?e("reward",{attrs:{type:"classReward","info-id":t.classid}}):t._e()],1):t._e(),t._v(" "),e("store-info",{staticClass:"ktj-mt10"}),t._v(" "),e("store-footer"),t._v(" "),e("div",{staticClass:"button-container"},[t.isCanLearn?e("ktj-button",{staticClass:"buy-btn",attrs:{type:"primary"},on:{click:t.showWechatCode}},[t._v("进入直播")]):e("ktj-button",{staticClass:"buy-btn",attrs:{type:"primary"},on:{click:t.buy}},[t._v("报名课程")])],1),t._v(" "),t.isCanLearn?e("div",{directives:[{name:"show",rawName:"v-show",value:t.codeFlag,expression:"codeFlag"}],staticClass:"ktj-masked",on:{click:function(s){t.codeFlag=!1}}}):t._e(),t._v(" "),t.isCanLearn?e("div",{directives:[{name:"show",rawName:"v-show",value:t.codeFlag,expression:"codeFlag"}],staticClass:"codewrap"},[e("img",{attrs:{src:t.codeImg}}),t._v(" "),e("p",[t._v("长按识别二维码进入小程序学习")])]):t._e()],1):t._e()},staticRenderFns:[]};var l=e("C7Lr")(r,d,!1,function(t){e("rybM")},"data-v-2fdab019",null);s.default=l.exports},rybM:function(t,s){}});