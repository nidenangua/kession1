webpackJsonp([35],{Rmv8:function(t,e){},r8XE:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("0xDb"),a=i("vMJZ"),s={name:"vouceher",data:function(){return{list:[],loaded:!1,current_id:0,p:1,tabActive:1,pageCount:null,informationNum:0,noticeNum:0}},methods:{slideTab:function(t){this.current_id=0,this.pageCount=null,this.loaded=!1,this.getList()},getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$showLoading(),this.p=e,1==e&&(this.list=[]),(0==this.tabActive?a.g:a.k)({p:this.p,maxperpage:15}).then(function(e){var i=e.list;i.map(function(t){t.content="",t.getDetail=!1}),t.list=t.list.concat(i),t.pageCount=e.page.total_pages,t.loaded=!0,t.$hideLoading()})},getDetail:function(t){var e=this;t.getDetail?this.current_id=t.id:(t.getDetail=!0,(0==this.tabActive?a.f:a.j)({id:t.id}).then(function(i){"success"===i.result&&(0==t.isread&&(0==e.tabActive?e.informationNum--:e.noticeNum--,t.isread=1),t.content=Object(n.c)(i.detail.content),e.current_id=t.id)}))}},activated:function(){var t=this;document.title="消息",this.getList(),Object(a.h)().then(function(e){"success"===e.result&&(t.informationNum=e.informationNum,t.noticeNum=e.noticeNum)})}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ktj-tabs",{on:{"tab-click":t.slideTab},model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},[i("ktj-tab-pane",{attrs:{label:"公告",name:1,info:t.noticeNum}}),t._v(" "),i("ktj-tab-pane",{attrs:{label:"消息",name:0,info:t.informationNum}})],1),t._v(" "),t.list.length?i("ktj-page-scroll-container",{staticClass:"myMsg-list",attrs:{page:t.p,"page-count":t.pageCount},on:{"page-change":t.getList}},[i("ul",t._l(t.list,function(e,n){return i("li",{key:n,staticClass:"myMsg-lstbox",class:{isread:e.isread},on:{click:function(i){return t.getDetail(e)}}},[i("div",{staticClass:"myMsg-title",class:t.current_id==e.id&&"active"},[i("span",{staticClass:"myMsg-time"},[t._v(t._s(e.adddate))]),t._v("\n\t\t\t\t\t\t"+t._s(e.title)+"\n\t\t\t\t\t\t"),i("i",{staticClass:"myicon"})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.current_id==e.id,expression:"current_id == item.id"}],staticClass:"myMsg-content",domProps:{innerHTML:t._s(e.content)}})])}),0)]):t.loaded?i("ktj-empty",{attrs:{type:"nomessage",msg:"还没有任何消息呢~"}}):t._e(),t._v(" "),i("store-footer")],1)},staticRenderFns:[]};var o=i("C7Lr")(s,c,!1,function(t){i("Rmv8")},"data-v-384007da",null);e.default=o.exports}});