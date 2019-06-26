import Vue from 'vue'
import Router from 'vue-router'
import groupRouter from './group'
Vue.use(Router)
let routes = [
    {
      path: '/',
      name: 'Index',
      component: resolve=>{
        require(['@/pages/Index.vue'], resolve)
      }
    },
    {
      path: '/news',
      name: 'News',
      component: resolve=>{
        require(['@/pages/news/News.vue'], resolve)
      }
    },
    {
      path: '/news/:id',
      name: 'NewsContent',
      component: resolve=>{
        require(['@/pages/news/NewsContent.vue'], resolve)
      }
    },
    {
      path:'/course',
      name:'CourseList',
      component: resolve=>{
        require(['@/pages/course/CourseList.vue'], resolve)
      }
    },
    {
      path:'/course/:id',
      name:'CourseView',
      component: resolve=>{
        require(['@/pages/course/CourseView.vue'], resolve)
      }
    },
    {
      path:'/course/:id/graphicLearn',
      name:'GraphicLearn',
      component: resolve=>{
        require(['@/pages/course/GraphicLearn.vue'], resolve)
      }
    },
    {
      path:'/class/:id',
      name:'ClassView',
      component: resolve=>{
        require(['@/pages/course/ClassView.vue'], resolve)
      }
    },
    {
      path:'/column',
      name:'ColumnList',
      component: resolve=>{
        require(['@/pages/course/ColumnList.vue'], resolve)
      }
    },
    {
      path:'/column/:id',
      name:'ColumnView',
      component: resolve=>{
        require(['@/pages/course/ColumnView.vue'], resolve)
      }
    },
    {
      path:'/comment',
      name:'CommentList',
      component: resolve=>{
        require(['@/pages/comment/CommentList.vue'], resolve)
      }
    },
    
    {
      path:'/user',
      name:'UserIndex',
      component: resolve=>{
        require(['@/pages/user/UserIndex.vue'], resolve)
      }
    },
    {
      path:'/user/login',
      name:'UserLogin',
      component: resolve=>{
        require(['@/pages/user/UserLogin.vue'], resolve)
      }
    },
    {
      path:'/user/course',
      name:'UserCourse',
      component: resolve=>{
        require(['@/pages/user/UserCourse.vue'], resolve)
      }
    },
    /**
     * 我的分销
     */
    {
      path:'/user/distribution',
      name:'Distribution',
      component: resolve=>{
        require(['@/pages/user/Distribution.vue'], resolve)
      }
    },
    /**
     * 分销-提现记录
     */
    {
      path:'/user/distribution/withdrawalsRecord',
      name:'WithdrawalsRecord',
      component: resolve=>{
        require(['@/pages/user/WithdrawalsRecord.vue'], resolve)
      }
    },
    {
      path:'/user/order',
      name:'UserOrder',
      component: resolve=>{
        require(['@/pages/user/UserOrder.vue'], resolve)
      }
    },
    {
      path:'/user/verified',
      name:'UserVerified',
      component: resolve=>{
        require(['@/pages/user/UserVerified.vue'], resolve)
      }
    },
    {
      path:'/user/order/:id',
      name:'UserOrderInfo',
      component: resolve=>{
        require(['@/pages/user/UserOrderInfo.vue'], resolve)
      }
    },
    {
      path:'/user/vouceher',
      name:'UserVouceher',
      component: resolve=>{
        require(['@/pages/user/vouceher/UserVouceher.vue'], resolve)
      }
    },
    {
      path:'/user/getVouceher',
      name:'GetVouceher',
      component: resolve=>{
        require(['@/pages/user/vouceher/GetVouceher.vue'], resolve)
      }
    },
    {
      path:'/user/giftrecode',
      name:'GiftRecord',
      component: resolve=>{
        require(['@/pages/user/GiftRecord.vue'], resolve)
      }
    },
    {
      path:'/user/toGift',
      name:'ToGift',
      component: resolve=>{
        require(['@/pages/user/ToGift.vue'], resolve)
      }
    },
    {
      path:'/user/notice',
      name:'UserNotice',
      component: resolve=>{
        require(['@/pages/user/UserNotice.vue'], resolve)
      }
    },
    {
      path:'/user/setting',
      name:'UserSetting',
      component: resolve=>{
        require(['@/pages/user/UserSetting.vue'], resolve)
      }
    },
    {
      path:'/user/group',
      name:'UserGroupIndex',
      component: resolve=>{
        require(['@/pages/user/UserGroupIndex.vue'], resolve)
      }
    },
    {
      path:'/user/mycard',
      name:'UserCard',
      component: resolve=>{
        require(['@/pages/user/UserCard.vue'], resolve)
      }
    },
    {
      path:'/user/storestyle',
      name:'SetStoreStyle',
      component: resolve=>{
        require(['@/pages/user/SetStoreStyle.vue'], resolve)
      }
    },
    {
        path: '/exam/classifiy',
        name: 'Classifiy',
        component: resolve => {
            require(['@/pages/exam/PaperClassification.vue'], resolve)
        }
    },
    //错题集
    {
        path: '/exam/wrong',
        name: 'wrong',
        component: resolve => {
            require(['@/pages/exam/PaperWrong.vue'], resolve)
        }
    },
    //收藏夹
    {
        path: '/exam/favorite',
        name: 'favorite',
        component: resolve => {
            require(['@/pages/exam/PaperFavorite.vue'], resolve)
        }
    },
    //真题练习
    {
        path: '/exam/DoExercise',
        name: 'exercise',
        component: resolve => {
            require(['@/pages/exam/PaperDoexercise.vue'], resolve)
        }
    },
    //随机练习
    {
        path: '/exam/DoRadom',
        name: 'DoRadom',
        component: resolve => {
            require(['@/pages/exam/RadomDoexercise.vue'], resolve)
        }
    },
    //答题卡
    {
        path: '/exam/sheet',
        name: 'sheet',
        component: resolve => {
            require(['@/pages/exam/AnswerSheet.vue'], resolve)
        }
    },

    //考试说明
    {
        path: '/exam/explain',
        name: 'explain',
        component: resolve => {
            require(['@/pages/exam/PaperExplain.vue'], resolve)
        }
    },
    //做题记录
    {
        path: '/exam/record',
        name: 'record',
        component: resolve => {
            require(['@/pages/exam/PaperRecord.vue'], resolve)
        }
    },
    //做题记录
    {
        path: '/exam/DoRecord',
        name: 'DoRecord',
        component: resolve => {
            require(['@/pages/exam/RecordDoexercise.vue'], resolve)
        }
    },
    //试卷列表1
    {
        path: '/exam/tklist',
        name: 'tklist',
        component: resolve => {
            require(['@/pages/exam/TkList.vue'], resolve)
        }
    },
    //考试结果
    {
        path: '/exam/result',
        name: 'result',
        component: resolve => {
            require(['@/pages/exam/ViewAnswerSheet.vue'], resolve)
        }
    },
    //试卷解析
    {
        path: '/exam/analysis',
        name: 'analysis',
        component: resolve => {
            require(['@/pages/exam/PaperAnalysis.vue'], resolve)
        }

    },
    //试卷收藏查看解析
    {
        path: '/exam/CvAnalysis',
        name: 'CvAnalysis',
        component: resolve => {
            require(['@/pages/exam/CVAnalysis.vue'], resolve)
        }

    },
    //试卷错题路口
    {
        path: '/exam/WrongEnttro',
        name: 'WrongEnttro',
        component: resolve => {
            require(['@/pages/exam/WrongEntry.vue'], resolve)
        }

    },
    //做错题
    {
        path: '/exam/DoError',
        name: 'DoError',
        component: resolve => {
            require(['@/pages/exam/ErrorDoexercise.vue'], resolve)
        }

    },
    //错题解析
    {
        path: '/exam/ErrorAnaysis',
        name: 'ErrorAnaysis',
        component: resolve => {
            require(['@/pages/exam/ErrprAnalysis.vue'], resolve)
        }
    },
    //试卷入口
    {
        path: '/exam/:id',
        name: 'list',
        component: resolve => {
            require(['@/pages/exam/PaperList.vue'], resolve)
        }
    },
		// 教师入口
    {
        path: '/teacher',
        name: 'TeacherList',
        component: resolve => {
            require(['@/pages/teacher/TeacherList.vue'], resolve)
        }
    }
]
routes = routes.concat(groupRouter)
export default new Router({
  routes: routes
})
