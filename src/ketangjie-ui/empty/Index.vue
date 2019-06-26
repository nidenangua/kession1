<template>
    <div class="ktj-empty" :class="'ktj-empty-'+(type || 'nogift')">
          {{msg}}
          <slot />
      </div>
</template>
<script>
export default {
    name:'KtjEmpty',
    props:['msg','type'],
    mounted(){

    }
}
</script>
<style scoped>
/*空数据*/
.ktj-empty{
  text-align: center;
  color: #b5b5b5;
  background-repeat: no-repeat;
  background-size: auto 140px;
  background-position: 50% 40px;
  padding:170px 0 30px 0;
  font-size: 14px

}
.ktj-empty-nolesson{
  background-image: url(./images/common_icon_nolesson.png)
}
.ktj-empty-nogift{
  background-image: url(./images/common_icon_nogift.png)
}
.ktj-empty-nocoupon{
  background-image: url(./images/common_icon_nocoupon.png)
}
.ktj-empty-nomessage{
  background-image: url(./images/common_icon_nomessage.png)
}
.ktj-empty-noorder{
  background-image: url(./images/common_icon_noorder.png)
}
.ktj-empty-norecord{
  background-image: url(./images/common_icon_norecord.png)
}
.ktj-empty-nosubject{
  background-image: url(./images/common_icon_nosubject.png)
}
.ktj-empty-notest{
  background-image: url(./images/common_icon_notest.png)
}
.ktj-empty-noweb{
  background-image: url(./images/common_icon_noweb.png)
}
.ktj-empty-nocomment{
  background-image: url(./images/common_icon_nocomment.png)
}

</style>

