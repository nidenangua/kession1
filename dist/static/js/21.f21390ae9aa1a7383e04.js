webpackJsonp([21],{"3f4B":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("g+M4"),a={name:"",data:function(){return{isSwiperFirsetEnd:!1,swiperOption:{slidesPerView:1,spaceBetween:15},categoryid:this.$route.query.categoryid,type:this.$route.query.type,paperList:[],letter:[],recode:[],Visabled:!1,time:"",pageTuning:0,loaded:!1,analiysisiAble:!1,checkVisable:!0}},activated:function(){this.paperList=[],this.recode=[],this.categoryid=this.$route.query.categoryid,this.start(!0),this.getlist(),document.title="错题练习"},methods:{getlist:function(e){var t=this;this.$showLoading(),Object(i.d)({categoryid:this.categoryid}).then(function(e){if(e.list){var s=[];e.list.map(function(e,t){e.doing=0,e.signed=!1,e.collect=!1,e.answer="",e.analiysisiAble=!1,e.checkVisable=!0,s.push({bindTmIndex:t+1,num:t,sign:!1,answered:!1,collected:!1})}),t.paperList=e.list,t.recode=s,t.getEN(),t.loaded=!0,t.$hideLoading()}else t.$toast(e.msg,"error"),t.loaded=!0})},getEN:function(e){for(var t=[],s=65;s<91;s++)t.push(String.fromCharCode(s));this.letter=t},next:function(e,t,s){this.$refs.choice.swiper.slideNext(),this.recode[t].answered=!0,this.pageTuning=t+1,e.answer=s,e.doing=1},tkAnswer:function(e){this.$refs.choice.swiper.slideTo(e-1,500,!1)},sheetclick:function(){var e=this;this.Visabled?this.Visabled=!1:(this.Visabled=!0,this.$nextTick(function(){e.$refs.sheet.reset({answerList:e.recode,swiperChoice:e.$refs.choice})}))},multiple:function(e,t,s){e.answer=s,e.doing=1},start:function(e){var t=this,s=void 0,i=void 0,a=void 0;if(s=i=a=0,!0===e)setInterval(function(){a>=0&&(a+=1),a>=60&&(a=0,i+=1),i>=60&&(i=0,s+=1),t.time=s+":"+i+":"+a},1e3);else clearInterval(void 0)},ChangeStrToMinutes:function(e){var t=e.split(":");return 3==t.length?60*parseInt(t[0])+parseInt(t[1]):0},save:function(){var e=this,t=[],s=[],a=[];this.start(!1),this.$showLoading(),this.paperList.map(function(e,i){e.signed;var n=[];n.push(e.answer),e.answer&&(s.push(e.tkid),e.answer!=e.tkinfo.answer&&t.push(e.tkid)),a.push({tkid:e.tkid,useranswer:n})}),Object(i.b)({categoryid:this.categoryid,do_tk:s,errortk:t,answer:a,examtime:this.ChangeStrToMinutes(this.time),type:this.type}).then(function(t){console.log,"success"==t.result?e.$toast("保存成功","success"):e.$toast(t.msg,"error")})},checkVisabled:function(e){e.analiysisiAble=!0,e.checkVisable=!1}},components:{AnswerSheet:s("CBf6").default}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"paper__header"},[i("div",{staticClass:"paper__header-second"},[e._v(e._s(e.time))]),e._v(" "),i("div",{staticClass:"paper__header-day"},[e._v(e._s(e.pageTuning)+"/"+e._s(e.paperList.length))]),e._v(" "),i("div",{staticClass:"paper__header-card",on:{click:e.sheetclick}},[i("img",{attrs:{src:s("xT/n")}})]),e._v(" "),i("div",{staticClass:"paper__header-sumbit",on:{click:e.save}},[e._v("结束练习")])]),e._v(" "),i("div",{staticClass:"paper__contianer"},[e.paperList?i("swiper",{ref:"choice",attrs:{options:e.swiperOption}},e._l(e.paperList,function(t,s){return i("swiper-slide",{key:s},[i("div",{staticClass:"paper__contianer-title"},[e._v(e._s(s+1)+"、 "+e._s(t.title))]),e._v(" "),4!=t.tktype?i("div",{staticClass:"paper__option-box"},e._l(t.tkinfo.content,function(a,n){return i("div",{key:n,staticClass:"paper__option"},[i("span",{class:{actived:t.answer==e.letter[n]},on:{click:function(i){return e.next(t,s,e.letter[n])}}},[e._v(e._s(e.letter[n]))]),e._v("\n            "+e._s(a)+"\n          ")])}),0):e._e(),e._v(" "),3==t.tktype?i("div",{staticClass:"paper__option-box"},[i("div",{staticClass:"paper__option",on:{click:function(i){return e.multiple(t,s,1)}}},[i("span",{class:{actived:1==t.answer}},[e._v("A")]),e._v("正确\n          ")]),e._v(" "),i("div",{staticClass:"paper__option",on:{click:function(i){return e.multiple(t,s,0)}}},[i("span",{class:{actived:0==t.answer}},[e._v("B")]),e._v("错误\n          ")])]):4==t.tktype?i("div",{staticClass:"paper__option-box"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.answer,expression:"item.answer"}],staticClass:"paper__option-textarea",attrs:{placeholder:"请输入答案"},domProps:{value:t.answer},on:{input:function(s){s.target.composing||e.$set(t,"answer",s.target.value)}}})]):e._e(),e._v(" "),i("div",{staticClass:"papper__check-analysis clearfix",on:{click:function(s){return e.checkVisabled(t)}}},[t.checkVisable?i("button",{staticClass:"paper__check-btn ktj-fr"},[e._v("查看解题思路")]):e._e()]),e._v(" "),t.analiysisiAble?i("div",{staticClass:"paper__check-analysis-content"},[i("h5",{staticClass:"paper__check-h5"},[e._v("答案解析")]),e._v(" "),i("div",{staticClass:"paper__check-info"},[e._v(e._s(t.tkinfo.analysis))])]):e._e()])}),1):0==e.paperList.length&&e.loaded?i("ktj-empty",{attrs:{msg:"暂无随机练习"}}):e._e(),e._v(" "),e.Visabled?i("answer-sheet",{ref:"sheet",attrs:{Visabled:e.Visabled},on:{"update:Visabled":function(t){e.Visabled=t},"update:visabled":function(t){e.Visabled=t},callback:e.tkAnswer}}):e._e()],1)])},staticRenderFns:[]};var r=s("C7Lr")(a,n,!1,function(e){s("wArj")},"data-v-bd58d696",null);t.default=r.exports},wArj:function(e,t){}});