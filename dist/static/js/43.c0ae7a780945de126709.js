webpackJsonp([43],{M1BT:function(t,s){},ihlL:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("g+M4"),n={name:"",data:function(){return{swiperOption:{slidesPerView:1,spaceBetween:15},answerId:this.$route.query.id,anliysisList:[],letter:[]}},activated:function(){var t=this;this.answerId=this.$route.query.id,this.anliysisList=[],this.$showLoading(),Object(i.k)({id:this.answerId,type:1}).then(function(s){s.map(function(s){s.tklist.map(function(s){t.anliysisList.push(s)})}),t.anliysisList.map(function(t){3==t.tkinfo.tktype?1==t.tkinfo.tkinfo.answer?(t.tkinfo.tkinfo.answer="正确",t.useranswer="正确"):(tem.tkinfo.tkinfo.answer="错误",t.useranswer="错误"):2==t.tkinfo.tktype&&(t.tkinfo.tkinfo.answer=t.tkinfo.tkinfo.answer.join("  ;  "),t.useranswer=t.useranswer.join("  ;  "))}),console.log(t.anliysisList),t.$hideLoading(),t.getEN()}),document.title="查看解析"},methods:{getEN:function(t){for(var s=[],e=65;e<91;e++)s.push(String.fromCharCode(e));this.letter=s}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"paper__contianer"},[e("swiper",{ref:"choice",attrs:{options:t.swiperOption}},t._l(t.anliysisList,function(s,i){return e("swiper-slide",{key:i},[e("div",{staticClass:"paper__contianer-title"},[t._v(t._s(i+1)+"、"+t._s(s.tkinfo.title))]),t._v(" "),e("div",{staticClass:"paper__option-box"},t._l(s.tkinfo.tkinfo.content,function(i,n){return e("div",{key:n,staticClass:"paper__option"},[e("span",{class:{error:0==s.reply&&t.letter[n]==s.useranswer,right:1==s.reply&&t.letter[n]==s.useranswer}},[t._v(t._s(t.letter[n]))]),t._v("\n            "+t._s(i)+"\n          ")])}),0),t._v(" "),e("div",{staticClass:"paper__answer"},[e("div",{staticClass:"paper__answer-box paper__answer-line"},[t._v("参考答案\n            "),e("p",[t._v(t._s(s.tkinfo.tkinfo.answer))])]),t._v(" "),e("div",{staticClass:"paper__answer-box"},[t._v("您的答案\n            "),e("p",[t._v(t._s(s.useranswer))])])]),t._v(" "),e("div",{staticClass:"paper__answer-analysis"},[e("div",{staticClass:"paper__answer-analysis-title"},[t._v("答案解析")]),t._v(" "),e("div",{staticClass:"paper__answer-analysis-content"},[t._v(t._s(s.tkinfo.tkinfo.analysis))])])])}),1)],1)])},staticRenderFns:[]};var r=e("C7Lr")(n,a,!1,function(t){e("M1BT")},"data-v-145bc2c0",null);s.default=r.exports}});