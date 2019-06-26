<template>
  <div>
      
      <ktj-tab :tab-info="tabInfo" />
      <user-group v-if="tabInfo.current === 0" />
      <user-topic v-else-if="tabInfo.current === 1"/>
      <user-zan v-else-if="tabInfo.current === 2"/>
      <store-footer />

 </div>
</template>

<script>
import UserGroup from './group/UserGroup'
import UserZan from './group/UserZan'
import UserTopic from './group/UserTopic'
export default {
  name: 'GroupIndex',
  data () {
    return {

      tabInfo:{
        options:['加入的社群','我的评论','我的点赞'],
        current:0,
        values:['list','comment','zan']
      }
    }
  },

  activated() {
   document.title="我的社群"

  },
  components:{
    UserGroup,
    UserZan,
    UserTopic
  }
}

</script>



