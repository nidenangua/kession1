<template>
    <div class="ktj-bg-white">
        <div class="verified-type">
            <ktj-radio v-model="verifiedType" :label="1">
                个人认证
            </ktj-radio>
            <ktj-radio v-model="verifiedType" :label="2">
                企业认证
            </ktj-radio>
        </div>
        <ktj-list> 
            <ktj-list-item title="企业名称">
                <input type="text" class="ktj-input" placeholder="请输入">
            </ktj-list-item>
            <ktj-list-item title="联系电话">
                <input type="text" class="ktj-input" placeholder="请输入">
            </ktj-list-item>
            <ktj-list-item title="营业证件号">
                <input type="text" class="ktj-input" placeholder="请输入">
            </ktj-list-item>
             <ktj-list-item title="经营类目范围">
                <input type="text" class="ktj-input" placeholder="请输入">
            </ktj-list-item>
        </ktj-list>
        <div class="verified-photo">
            <div class="verified-photo__title">证件照片</div>
            <div class="verified-photo__tip">
                1.证件照片不得有遮挡，保证清晰<br />
                2.请在白色背景下拍摄，保证证件边缘清晰<br />
                3.请从证件的正上方拍摄，防止画面变形
            </div>
            
            <div class="verified-photo-list clearfix">
                <div class="verified-photo__item">
                    <div class="verified-photo__default verified-photo__tx"></div>
                    上传法人身份证头像面
                </div>
                <div class="verified-photo__item">
                    <div class="verified-photo__default verified-photo__gh"></div>
                    上传法人身份证国徽面
                </div>
                <div class="verified-photo__item">
                    <div class="verified-photo__default verified-photo__yyzz"></div>
                    上传营业执照
                </div>
            </div>
            
        </div>
        <ktj-list> 
            <ktj-list-item title="所在省市" show-arrow>
                请选择
            </ktj-list-item>
            <ktj-list-item title="具体地址">
                <input type="text" class="ktj-input" placeholder="请输入">
            </ktj-list-item>
        </ktj-list>
        <div class="verified-button ktj-mt15">
            <ktj-button type="primary" width="100%">确认提交</ktj-button>
        </div>
    </div>
</template>
<script>
/**
 * 实名认证
 */
export default {
    name:'UserVerified',
    data(){
        return {
            verifiedType:1
        }
    }
}
</script>
<style scoped>
.verified-type{
    padding: 20px 15px;
}
.verified-photo__tip{
    line-height: 24px;
    color:#999;
    padding:10px 0 20px 0;
}

.verified-photo,
.verified-button{
    padding: 0 15px;
}

.verified-photo__title{
    font-size: 14px;
    margin-top: 20px;
}

.verified-photo__item{
    width: 50%;
    float: left;
}
.verified-photo__default{}

</style>

