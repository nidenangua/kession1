<template>
    <div>
        <input type="file" id="oss-selectfile" ref="selectfile" @change="fileChange" v-if="show">
        
    </div>
</template>
<script>
import {uploadAliOSS,getSignature} from '@/api/alioss'
let par = {}
export default {
    name:'OssWebUpload',
    data(){
        return {
            show:true
        }
    },
    methods:{
        
        /**
         * 获取文件格式
         */
        getSuffix(filename) {
            let pos = filename.lastIndexOf('.')
            let suffix = ''
            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix
        },
        /**
         * 文件进入
         */
        fileChange(e){
            
            let file = e.target.files[0]
            let suffix = this.getSuffix(file.name)
            let reg = /^(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i
            if(suffix && !reg.test(suffix)){
                this.$msg('您选择的文件后缀不对')
                return false
            }
            this.setUploadParam(file)

        },
        /**
         * 配置上传参数
         */
        setUploadParam(file){

            /**
             * 获取阿里直传签名
             */
            let params = {
                wxid:par.wxid,
                filename:file.name
            }
            getSignature(params).then(obj=>{
                let formData = new FormData()
                formData.append('key',obj.dir)
                formData.append('policy',obj.policy)
                formData.append('OSSAccessKeyId',obj.accessid)
                formData.append('success_action_status','200')
                formData.append('callback',obj.callback)
                formData.append('signature',obj.signature)
                formData.append('file',file)
                this.uploadStart(obj.host,formData,obj.dir)

            })
            
        },
        /**
         * 开始上传
         */
        uploadStart(host,formData,dir){
            
            
            uploadAliOSS(host,formData).then(res=>{
                /**
                 * 重新加载上传节点（解决重复文件无法上传问题）
                 */
                this.show = false 
                this.$nextTick(()=>{
                    this.show = true
                })
                if(typeof res === 'object'){
                    this.callback('uploaded',res)
                }else{
                    /**
                     * 上传成功回调失败处理方案
                     */
                    this.callback('uploaded',{
                        defaultpic:host+'/'+dir
                    })
                }
                
            })
        },
        /**
         * 回调
         */
        callback(key,res){
            typeof par[key] === 'function' && par[key](res)
        },
        /**
         * 运行
         */
        start(params){
            par = params
            this.$refs.selectfile.click() 
            
        }
    }
}
</script>
<style scoped>
#oss-selectfile{
    display: none
}
</style>

