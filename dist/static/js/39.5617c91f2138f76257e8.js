webpackJsonp([39],{jgRf:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("rVsN"),s=i.n(n),r=i("60kx");var d={name:"SetStoreStyle",data:function(){var t=this;return{loaded:!1,currentid:null,mydiyid:null,swiperOption:{slidesPerView:1.5,centeredSlides:!0,initialSlide:null,on:{transitionEnd:function(){t.$nextTick(function(){var e=t.$refs.styleSwiper.swiper.snapIndex;t.currentid=t.list[e].tempid})}}},list:[]}},methods:{useStyle:function(){var t,e=this;this.$showLoading("正在切换风格"),(t={tempid:this.currentid},new s.a(function(e){Object(r.b)("Drag.Store.wx_SaveChangeTemp",t,{isErrorCall:!0}).then(function(t){e(t)})})).then(function(t){"success"===t.result?e.$store.dispatch("updateStoreInfo").then(function(){e.$hideLoading(),e.$toast("设置成功","success").then(function(){e.$router.push({name:"Index",query:{reload:1}})})}):e.$toast(t.msg)})}},activated:function(){var t,e=this;this.loaded=!1,this.$showLoading(),new s.a(function(e){Object(r.b)("Drag.Store.wx_GetTemplist",t).then(function(t){e(t)})}).then(function(t){e.mydiyid=t.mydiyid,e.currentid=t.mydiyid,e.list=t.values,t.values.map(function(i,n){i.tempid==t.mydiyid&&(e.swiperOption.initialSlide=n)}),e.loaded=!0,e.$hideLoading()})}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.loaded?i("div",{staticClass:"select-style"},[i("ktj-swiper",{ref:"styleSwiper",attrs:{options:t.swiperOption}},t._l(t.list,function(e,n){return i("ktj-swiper-slide",{key:n},[i("div",{staticClass:"phone"},[i("img",{attrs:{src:e.defaultpic}}),t._v(" "),e.tempid==t.mydiyid?i("div",{staticClass:"current"},[t._v("正在使用")]):e.isedit?i("div",{staticClass:"isedit"},[t._v("已修改")]):t._e()])])}),1),t._v(" "),i("div",{staticClass:"select-style__button ktj-mt30"},[i("ktj-button",{attrs:{type:"primary",disabled:t.mydiyid==t.currentid,round:!0},on:{click:t.useStyle}},[t._v(t._s(t.mydiyid==t.currentid?"正在使用":"使用该风格"))])],1),t._v(" "),i("store-footer")],1):t._e()},staticRenderFns:[]};var o=i("C7Lr")(d,a,!1,function(t){i("yl7K")},"data-v-2089eb8a",null);e.default=o.exports},yl7K:function(t,e){}});