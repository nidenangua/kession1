webpackJsonp([31],{Ge1E:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("g+M4"),n={name:"",data:function(){var e=this;return{isSwiperFirsetEnd:!1,swiperOption:{slidesPerView:1,spaceBetween:15,on:{transitionStart:function(t){if(console.log(e.$refs.choice.swiper.activeIndex),e.$refs.choice.swiper.activeIndex==e.paperList.length-1)if(e.isSwiperFirsetEnd){var s=[];e.paperList.map(function(e){s.push(e.tkid)}),e.getlist({tkids:s,categoryid:e.categoryid})}else e.isSwiperFirsetEnd=!0}}},categoryid:this.$route.query.categoryid,type:this.$route.query.type,paperList:[],letter:[],recode:[],Visabled:!1,time:"",pageTuning:0,loaded:!1,analiysisiAble:!1,checkVisable:!0}},activated:function(){this.paperList=[],this.type=this.$route.query.type,this.categoryid=this.$route.query.categoryid,this.start(!0),this.getlist({categoryid:this.categoryid}),document.title="随机练习"},methods:{getlist:function(e){var t=this;this.$showLoading(),Object(i.m)(e).then(function(e){if("success"==e.result&&e.list){var s=[];e.list.map(function(e,t){e.doing=0,e.signed=!1,e.collect=!1,e.answer="",e.analiysisiAble=!1,e.checkVisable=!0,s.push({bindTmIndex:t+1,num:t,sign:!1,answered:!1,collected:!1}),2==e.tktype&&e.tkinfo.answer.map(function(e){e.options=""})}),t.paperList=e.list,console.log(t.paperList),t.recode=s,t.getEN(),t.loaded=!0,t.$hideLoading()}else t.$toast(e.msg,"error"),t.loaded=!0})},getEN:function(e){for(var t=[],s=65;s<91;s++)t.push(String.fromCharCode(s));this.letter=t},next:function(e,t,s){this.$refs.choice.swiper.slideNext(),this.recode[t].answered=!0,this.pageTuning=t+1,e.answer=s,e.doing=1},sign:function(e,t){e.signed=!e.signed,this.recode[t].sign=e.signed},collect:function(e){Object(i.p)({type:2,categoryid:this.categoryid,infoid:e.tkid}).then(function(t){"success"==t.result&&(e.collect=!0)})},tkAnswer:function(e){this.$refs.choice.swiper.slideTo(e-1,500,!1)},sheetclick:function(){var e=this;this.Visabled?this.Visabled=!1:(this.Visabled=!0,this.$nextTick(function(){e.$refs.sheet.reset({answerList:e.recode,swiperChoice:e.$refs.choice})}))},multiple:function(e,t,s){e.answer=s,e.doing=1},submitAnswer:function(e){var t=[];e.tkinfo.answer.map(function(e){t.push(e.options)}),e.answer=t,console.log(e)},start:function(e){var t=this,s=void 0,i=void 0,n=void 0;if(s=i=n=0,!0===e)setInterval(function(){n>=0&&(n+=1),n>=60&&(n=0,i+=1),i>=60&&(i=0,s+=1),t.time=s+":"+i+":"+n},1e3);else clearInterval(void 0)},ChangeStrToMinutes:function(e){var t=e.split(":");return 3==t.length?60*parseInt(t[0])+parseInt(t[1]):0},save:function(){var e=this,t=[],s=[],n=[];this.start(!1),this.$showLoading(),this.paperList.map(function(e,i){e.signed;var a=[];a.push(e.answer),e.answer&&(s.push(e.tkid),e.answer!=e.tkinfo.answer&&2!=e.tktype&&4!=e.tktype&&t.push(e.tkid)),n.push({tkid:e.tkid,useranswer:a})}),Object(i.b)({categoryid:this.categoryid,do_tk:s,errortk:t,answer:n,examtime:this.ChangeStrToMinutes(this.time),type:this.type}).then(function(t){console.log,"success"==t.result?e.$toast("保存成功","success"):e.$toast(t.msg,"error")})},checkVisabled:function(e){e.analiysisiAble=!0,e.checkVisable=!1}},components:{AnswerSheet:s("CBf6").default}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"paper__header"},[i("div",{staticClass:"paper__header-second"},[e._v(e._s(e.time))]),e._v(" "),i("div",{staticClass:"paper__header-day"},[e._v(e._s(e.pageTuning)+"/"+e._s(e.paperList.length))]),e._v(" "),i("div",{staticClass:"paper__header-card",on:{click:e.sheetclick}},[i("img",{attrs:{src:s("xT/n")}})]),e._v(" "),i("div",{staticClass:"paper__header-sumbit",on:{click:e.save}},[e._v("结束练习")])]),e._v(" "),i("div",{staticClass:"paper__contianer"},[e.paperList?i("swiper",{ref:"choice",attrs:{options:e.swiperOption}},e._l(e.paperList,function(t,s){return i("swiper-slide",{key:s},[i("div",{staticClass:"paper__contianer-title"},[e._v(e._s(s+1)+"、 "+e._s(t.title))]),e._v(" "),1==t.tktype||6==t.tktype?i("div",{staticClass:"paper__option-box"},e._l(t.tkinfo.content,function(n,a){return i("div",{key:a,staticClass:"paper__option"},[i("span",{class:{actived:t.answer==e.letter[a]},on:{click:function(i){return e.next(t,s,e.letter[a])}}},[e._v(e._s(e.letter[a]))]),e._v("\n            "+e._s(n)+"\n          ")])}),0):e._e(),e._v(" "),2==t.tktype?i("div",{staticClass:"paper__option-box"},e._l(t.tkinfo.answer,function(s,n){return i("div",{key:n,staticClass:"paper__answer-area"},[i("span",[e._v("\n              答题区"+e._s(n+1)+":\n              "),i("input",{directives:[{name:"model",rawName:"v-model",value:s.options,expression:"gap.options"}],staticClass:"paper__option-input",attrs:{type:"text",placeholder:"请输入答案"},domProps:{value:s.options},on:{blur:function(s){return e.submitAnswer(t)},input:function(t){t.target.composing||e.$set(s,"options",t.target.value)}}})])])}),0):e._e(),e._v(" "),3==t.tktype?i("div",{staticClass:"paper__option-box"},[i("div",{staticClass:"paper__option",on:{click:function(i){return e.multiple(t,s,1)}}},[i("span",{class:{actived:1==t.answer}},[e._v("A")]),e._v("正确\n          ")]),e._v(" "),i("div",{staticClass:"paper__option",on:{click:function(i){return e.multiple(t,s,0)}}},[i("span",{class:{actived:0==t.answer}},[e._v("B")]),e._v("错误\n          ")])]):4==t.tktype?i("div",{staticClass:"paper__option-box"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.answer,expression:"item.answer"}],staticClass:"paper__option-textarea",attrs:{placeholder:"请输入答案"},domProps:{value:t.answer},on:{input:function(s){s.target.composing||e.$set(t,"answer",s.target.value)}}})]):e._e(),e._v(" "),i("div",{staticClass:"papper__check-analysis clearfix",on:{click:function(s){return e.checkVisabled(t)}}},[t.checkVisable?i("button",{staticClass:"paper__check-btn ktj-fr"},[e._v("查看解题思路")]):e._e()]),e._v(" "),t.analiysisiAble?i("div",{staticClass:"paper__check-analysis-content"},[i("h5",{staticClass:"paper__check-h5"},[e._v("答案解析")]),e._v(" "),i("div",{staticClass:"paper__check-info"},[e._v(e._s(t.tkinfo.analysis))])]):e._e()])}),1):e._e(),e._v(" "),0==e.paperList.length&&e.loaded?i("ktj-empty",{attrs:{msg:"暂无随机练习"}}):e._e(),e._v(" "),e.Visabled?i("answer-sheet",{ref:"sheet",attrs:{Visabled:e.Visabled},on:{"update:Visabled":function(t){e.Visabled=t},"update:visabled":function(t){e.Visabled=t},callback:e.tkAnswer}}):e._e()],1)])},staticRenderFns:[]};var r=s("C7Lr")(n,a,!1,function(e){s("h50W")},"data-v-447190d4",null);t.default=r.exports},h50W:function(e,t){}});