webpackJsonp([28],{M80f:function(t,s){},hZ5w:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7rGV"),a=e("6zNQ"),n=e("h0S9"),c={name:"ClassView",data:function(){return{tab:0,loaded:!1,columnid:this.$route.params.id,isCanLearn:!1,chapter:[],columnInfo:{},isFree:!1}},methods:{buy:function(){this.$showPay({payid:this.columnid,msg:"购买专栏",price:this.columnInfo.price,type:"column"})},showWechatCode:function(){this.codeFlag=!0},open:function(t){var s=5==t.courseType?"class":"course";this.$router.push("/"+s+"/"+t.id)}},activated:function(){var t=this;this.$showLoading(),document.title="课堂详情",this.loaded=!1,this.columnInfo={},this.isCanLearn=!1,this.chapter=[],this.columnInfo={},this.isFree=!1,this.columnid=this.$route.params.id,Object(n.c)({id:this.columnid}).then(function(s){var e=s.info;1==e.iscopy&&t.$antiCopy(!0),e.soldnum=parseInt(e.soldnum),t.chapter=s.chapter.chapter,t.columnInfo=e,"0.00"!=e.price&&1==e.chargetype||(t.isFree=!0),"0.00"!=e.price&&1!=e.isbuy&&1==e.chargetype||(t.isCanLearn=!0),t.$wxShare({title:e.title,desc:e.shortdesc,imgUrl:e.defaultpic}),t.loaded=!0,t.$nextTick(function(){t.$hideLoading()})})},deactivated:function(){this.$antiCopy(!1)},components:{ItemHeader:a.a,Reward:i.a}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.loaded?e("div",{staticClass:"course_container"},[e("item-header",{attrs:{info:t.columnInfo,"info-type":"column"}}),t._v(" "),e("div",{staticClass:"tab line"},[e("div",{staticClass:"tab-item on-log",class:0==t.tab&&"active",on:{click:function(s){t.tab=0}}},[t._v("专栏介绍")]),t._v(" "),e("div",{staticClass:"tab-item on-log",class:1==t.tab&&"active",on:{click:function(s){t.tab=1}}},[t._v("连载内容")])]),t._v(" "),0==t.tab?e("div",{staticClass:"intro-anchor"},[e("div",{staticClass:"ktj-content"},[e("div",{domProps:{innerHTML:t._s(t.columnInfo.detailintro)}})]),t._v(" "),2==t.columnInfo.chargetype?e("reward",{attrs:{type:"columnReward","info-id":t.columnid}}):t._e()],1):1==t.tab?e("div",{staticClass:"column-anchor"},[t.chapter.length?e("div",{staticClass:"column-course"},[e("ul",t._l(t.chapter,function(s,i){return e("li",{key:i,on:{click:function(e){return t.open(s)}}},[e("ktj-create-bg",{staticClass:"item-images",attrs:{src:s.defaultpic}},[1==s.coursehour?e("span",{staticClass:"is-relay"},[t._v("连载")]):t._e()]),t._v(" "),e("div",{staticClass:"course-name"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"course-num"},[t._v(t._s(s.shortdesc))]),t._v(" "),e("div",{staticClass:"course-num"},[e("span",{staticClass:"learning-num"},[t._v(t._s(s.studentnum)+"次学习")])])],1)}),0)]):e("ktj-empty",{attrs:{msg:"暂无连载内容～",type:"nolesson"}})],1):t._e(),t._v(" "),e("store-info",{staticClass:"ktj-mt10"}),t._v(" "),e("store-footer"),t._v(" "),t.isCanLearn?t._e():e("div",{staticClass:"button-container"},[e("div",{staticClass:"buy-btn",on:{click:t.buy}},[t._v("购买专栏")])])],1):t._e()},staticRenderFns:[]};var r=e("C7Lr")(c,o,!1,function(t){e("M80f")},"data-v-58e36991",null);s.default=r.exports}});