webpackJsonp([18],{Faw6:function(t,e){},eqhL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("0xDb"),n=a("vMJZ"),o={name:"CourseOrder",data:function(){return{hasToken:-1,page:1,pageCount:1,paystatus:-1,loaded:!1,datas:[],refund:!1,tel:"",wechat:"",tuikuanindex:-1}},methods:{changeTab:function(t){this.paystatus=t,this.pageCount=null,this.loaded=!1,this.getOrderList()},delorder:function(t,e){var a=this;this.$confirm("确定要删除该订单吗？").then(function(){var o={ordersn:e},i=Object(s.e)();i.h5token&&(o.h5token=i.h5token),Object(n.c)(o).then(function(e){a.$toast(e.msg,"success").then(function(){a.datas.splice(t,1)})})})},open:function(t){location.href=t},openView:function(t,e){if(9!=t.type){var a=Object(s.g)(t,"courseid");location.href=e+"/#"+a}},chakanDetail:function(t){this.$router.push({name:"UserOrderInfo",params:{id:t}})},pay:function(t){location.href=t},getOrderList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$showLoading(),this.page=e;var a={paystatus:this.paystatus,p:this.page,maxperpage:10},o=Object(s.e)();o.h5token?(a.h5token=o.h5token,this.hasToken=1):this.hasToken=0,Object(n.n)(a).then(function(e){1===t.page?t.datas=e.values:t.datas=t.datas.concat(e.values),t.pageCount=e.page.total_pages,t.loaded=!0,t.$hideLoading()})}},mounted:function(){this.getOrderList()},activated:function(){document.title="我的订单"}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ktj-tabs",{on:{"tab-click":t.changeTab},model:{value:t.paystatus,callback:function(e){t.paystatus=e},expression:"paystatus"}},[a("ktj-tab-pane",{attrs:{label:"全部",name:-1}}),t._v(" "),a("ktj-tab-pane",{attrs:{label:"已付款",name:1}}),t._v(" "),a("ktj-tab-pane",{attrs:{label:"未付款",name:2}})],1),t._v(" "),t.datas.length?a("ktj-page-scroll-container",{staticClass:"my-order-list",attrs:{page:t.page,"page-count":t.pageCount},on:{"page-change":t.getOrderList}},t._l(t.datas,function(e,s){return a("div",{key:s,staticClass:"item"},[a("div",{staticClass:"myList-time line"},[a("span",{staticClass:"status",class:0==e.paystatus&&"ktj-color-error"},[t._v(t._s((0==e.paystatus?"待付款":1==e.paystatus&&"已付款")||2==e.paystatus&&"退款中"||3==e.paystatus&&"已退款")+" ")]),t._v(" "),0==e.paystatus?a("span",{staticClass:"order-time"},[t._v("下单时间："+t._s(e.adddate))]):1==e.paystatus?a("span",{staticClass:"order-time"},[t._v("付款时间："+t._s(e.paydate))]):t._e()]),t._v(" "),t._l(e.courseOrder,function(s,n){return a("div",{key:n,staticClass:"order-body line",on:{click:function(a){return t.openView(s,e.storeinfo.storeurl)}}},[a("ktj-create-bg",{staticClass:"defaultpic",attrs:{src:s.defaultpic}}),t._v(" "),a("div",{staticClass:"order-body-info"},[a("div",{staticClass:"order-body-info-title"},[t._v("\n\t\t\t\t\t\t\t"+t._s(s.title)+"\n\t\t\t\t\t\t")]),t._v(" "),0==s.type&&1==s.coursetype?a("div",{staticClass:"order-info__type"},[t._v("点播课程")]):0==s.type&&2==s.coursetype?a("div",{staticClass:"order-info__type"},[t._v("语音直播")]):0==s.type&&3==s.coursetype?a("div",{staticClass:"order-info__type"},[t._v("音频课程")]):0==s.type&&4==s.coursetype?a("div",{staticClass:"order-info__type"},[t._v("图文课程")]):1==s.type?a("div",{staticClass:"order-info__type"},[t._v("直播课程")]):7==s.type?a("div",{staticClass:"order-info__type"},[t._v("\n\t\t\t\t\t\t\t专栏\n\t\t\t\t\t\t")]):9==s.type?a("div",{staticClass:"order-info__type"},[t._v("\n\t\t\t\t\t\t\t会员卡\n\t\t\t\t\t\t")]):10==s.type?a("div",{staticClass:"order-info__type"},[t._v("\n\t\t\t\t\t\t\t社群\n\t\t\t\t\t\t")]):t._e(),t._v(" "),a("div",{staticClass:"price"},[a("span",{staticClass:"ktj-color-error"},[t._v("￥"+t._s(s.price))])])])],1)}),t._v(" "),a("div",{staticClass:"order-bottom"},[a("div",{staticClass:"ktj-fr"},[0==e.paystatus?a("ktj-button",{staticClass:"ktj-ml5",attrs:{size:"small"},on:{click:function(a){return t.delorder(s,e.ordersn)}}},[t._v("删除订单")]):t._e(),t._v(" "),0==e.paystatus?a("ktj-button",{staticClass:"ktj-ml5",attrs:{size:"small",type:"primary"},on:{click:function(a){return t.pay(e.payurl)}}},[t._v("立即付款")]):t._e(),t._v(" "),1==e.paystatus||3==e.paystatus?a("ktj-button",{staticClass:"ktj-ml5",attrs:{size:"small"},on:{click:function(a){return t.chakanDetail(e.ordersn)}}},[t._v("查看订单")]):t._e()],1),t._v(" "),1===t.hasToken?a("div",{on:{click:function(a){return t.open(e.storeinfo.storeurl)}}},[a("ktj-create-bg",{staticClass:"ktj-fl",attrs:{src:e.storeinfo.storelogo,type:"logo"}}),t._v("\n\t\t\t\t\t\t"+t._s(e.storeinfo.storename)+"\n\t\t\t\t\t")],1):t._e()])],2)}),0):t.loaded?a("ktj-empty",{attrs:{type:"noorder",msg:"暂时没有订单~"}}):t._e(),t._v(" "),0===t.hasToken?a("store-footer"):t._e()],1)},staticRenderFns:[]};var r=a("C7Lr")(o,i,!1,function(t){a("Faw6")},"data-v-f58a1b6c",null);e.default=r.exports}});