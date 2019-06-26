const groupRouter = [
    /**
     * 社群主页
     */
    {
        path:'/group',
        name:'GroupIndex',
        component: resolve=>{
          require(['@/pages/group/GroupIndex.vue'], resolve)
        }
    },
    
      /**
       * 社群管理
       */
      {
        path:'/group/manage',
        name:'GroupManage',
        component: resolve=>{
          require(['@/pages/group/GroupManage.vue'], resolve)
        }
      },
       /**
       * 社群成员
       */
      {
        path:'/group/member',
        name:'GroupMember',
        component: resolve=>{
          require(['@/pages/group/GroupMember.vue'], resolve)
        }
      },
      /**
       * 发表动态
       */
      {
        path:'/group/dynamic',
        name:'GroupDynamics',
        component: resolve=>{
          require(['@/pages/group/GroupDynamics.vue'], resolve)
        }
      },
     /**
       * 话题详情
       */
    {
      path:'/group/topic',
      name:'GroupTopic',
      component: resolve=>{
        require(['@/pages/group/GroupTopic.vue'], resolve)
    }
    },
    /**
     * 社群详情页
     */
    {
        path:'/group/:id',
        name:'GroupDetail',
        component: resolve=>{
          require(['@/pages/group/GroupDetail.vue'], resolve)
        }
    }

]

export default groupRouter