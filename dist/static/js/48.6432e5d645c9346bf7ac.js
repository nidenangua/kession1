webpackJsonp([48],{mATy:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("0xDb"),s=n("COTu"),a={name:"GroupIndex",data:function(){return{loaded:!1,list:[],pageCount:null,key:this.$route.query.key,p:1}},watch:{"$route.query.key":function(){this.getList()}},methods:{getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$showLoading(),this.key=this.$route.query.key;var n={p:e,maxperpage:10,data:{sql_or_like:{status:1}}};this.key&&(n.data.sql_or_like.title=this.key),Object(s.e)(n).then(function(n){n&&n.list&&(t.list=1===e?n.list:t.list.concat(n.list),t.pageCount=n.page.total_pages),t.loaded=!0,t.$hideLoading()})}},mounted:function(){var t=this;this.getList(),window.addEventListener("scroll",function(e){Object(i.d)()&&t.p<t.pageCount&&(t.p++,t.getList(t.p))})},activated:function(){document.title="社群中心"}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("drag-search",{attrs:{value:t.key},on:{enter:function(e){return t.getList()}}}),t._v(" "),t.list.length?n("div",[n("drag-group",{attrs:{"data-list":t.list}}),t._v(" "),null!==t.pageCount&&t.p>=t.pageCount?n("div",{staticClass:"ktj-nomore"},[t._v("\n           没有更多社群了~\n       ")]):n("div",{staticClass:"ktj-nomore"},[t._v("\n           上拉加载更多\n       ")])],1):!t.list.length&&t.loaded?n("ktj-empty",{attrs:{msg:"没有找到任何社群~"}}):t._e(),t._v(" "),n("store-footer")],1)},staticRenderFns:[]},r=n("C7Lr")(a,o,!1,null,null,null);e.default=r.exports}});