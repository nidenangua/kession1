<template>
  <div class="user-setting">
    <ktj-list item-height="49px">
        <ktj-list-item title="头像" @click="changeAvatar" show-arrow>
            <input type="file" ref="file_avatar" class="ktj-none" @change="uploadAvatar">
            <ktj-create-bg type="user" class="user-image" :src="$store.state.userInfo.headimg" tpye="user" />
        </ktj-list-item>
    </ktj-list>
    <ktj-list class="ktj-pt10" item-height="49px">
        <ktj-list-item title="昵称">
            {{$store.state.userInfo.name || '暂无'}}
        </ktj-list-item>
        <ktj-list-item title="手机号">
            {{$store.state.userInfo.mobile || '未填写'}}
        </ktj-list-item>
        <ktj-list-item title="账号">
            {{$store.state.userInfo.username || '暂无'}}
        </ktj-list-item>
        <ktj-list-item title="密码">
            ******<span class="user-updata" @click="showbox(2)" >点击修改</span>
        </ktj-list-item>
        <ktj-list-item title="邮箱">
            {{$store.state.userInfo.email || '未填写'}}
        </ktj-list-item>
    </ktj-list>

 
    <div class="user-btn-box">
		<div class="btn" @click="showbox(1)">
			修改资料
		</div>
		<div class="btn btn-lgout" @click="loginout">
			退出登录
		</div>
	</div>
    
    <ktj-dialog :title="(tab==1 && '修改资料') || (tab==2 && '修改密码')" :visible.sync="showFlag">
        <ktj-form label-width="80px" v-if="tab==1">
            <ktj-form-item label="昵称">
                <input class="ktj-input" type="text" v-model="name" placeholder="请输入昵称" />
            </ktj-form-item>
            <ktj-form-item label="手机号">
                <input class="ktj-input" type="number" v-model="phone" placeholder="请输入手机号码" />
            </ktj-form-item>
            <ktj-form-item label="邮箱">
                <input class="ktj-input" type="text" v-model="email" placeholder="请输入邮箱" />
            </ktj-form-item>
        </ktj-form>
   
        <ktj-form label-width="80px" v-if="tab==2">
            <ktj-form-item label="旧密码">
                <input class="ktj-input" type="password" autocomplete="off" v-model="oldpwd" placeholder="请输入旧密码"  />
            </ktj-form-item>
            <ktj-form-item label="新密码">
                <input class="ktj-input" type="password" autocomplete="off" v-model="newpwd" placeholder="请输入新密码" />
            </ktj-form-item>
            <ktj-form-item label="确认新密码">
                <input class="ktj-input" type="password" autocomplete="off" v-model="surepwd" placeholder="重复输入新密码" />
            </ktj-form-item>

        </ktj-form>
     
        <div class="confirm-btn-wrap">
            <ktj-button @click="showFlag = false" size="medium">取消</ktj-button>
            <ktj-button class="ktj-ml10" @click="sure" size="medium" type="primary">确定</ktj-button>
        </div>
    </ktj-dialog>
    <store-footer />
  </div>
  
</template>

<script>
import {savePersonMsg,changeHead,loginOut} from '@/api/user';
export default {
    name: 'UserSetting',
    data () {
        return {
            headimg:null,
            phone:'',
            name:'',
            showFlag:false,
            email:'',
            tab:null,
            oldpwd:null,
            newpwd:null,
            surepwd:null,
            id:null
        }
    },

    methods:{
        /**
         * 确认修改
         */
        sure(){ 
            if(this.tab == 1){
                this.confirm()
            }else{
                this.cp()
            }
        },
        confirm(){
            if(this.name ==''){
                this.$toast('请输入昵称')
                return false
            }else if (this.phone == ''){
                this.$toast('请输入手机号')
                return false
            }
            this.$showLoading()
            savePersonMsg({
                email:this.email,
                mobile:this.phone,
                name:this.name,
                type:1 
            }).then(res=>{
                
                if (res.errCode == 10000) {
                    this.$store.dispatch('updateUserInfo').then(()=>{
                        this.$hideLoading()
                        this.$toast('修改成功','success')
                        this.showFlag = false  
                    })
                    
                }

            })
        },

        /**
         * 退出登录
         */
        loginout () {
            this.$confirm('确认退出吗？').then(()=>{
                this.$showLoading('正在退出')
                loginOut().then(res=>{
                    this.$toast('退出成功','success')
                    this.$store.dispatch('updateUserInfo').then(()=>{
                        this.$hideLoading()
                        this.$navigateBack()
                    })
                    
                })
            })
           
        },
        showbox(tab){
            this.tab = tab;
            this.showFlag = true
        },
        cp(){
            if ( this.oldpwd == '' || this.newpwd == '' || this.surepwd == '') {
                this.$toast('内容不能为空')
                return;
            }
            if ( this.newpwd != this.surepwd) {
                this.$toast('修改密码不一致')
                return;
            }
            
            savePersonMsg({
                oldpwd: this.oldpwd,
                newpwd: this.newpwd,
                type:2 
            }).then(res=>{
                
                if (res.errCode == 10000) {
                    
                    this.showFlag = false
                    this.$store.dispatch('updateUserInfo').then(()=>{
                        this.$toast('修改成功','success').then(()=>{
                            this.$router.push({
                                name:'UserLogin'
                            })
                        })
                        
                    })

                }else{
                    this.$toast(res.errMsg)
                }
                
            })
        },
        /**
         * 选择头像
         */
		changeAvatar(){
            this.$refs.file_avatar.click()
        },
        /**
         * 更新头像
         */
        uploadAvatar(e){
            this.$showLoading()
            let file = this.$refs.file_avatar.files[0];
            let render = new FileReader();
            render.readAsDataURL(file);
            render.addEventListener('load',e=>{
                let base64 = e.target.result;
                changeHead({
                    headImg:base64
                }).then(res=>{
                    
                    if(res.result === 'success'){
                        this.$store.dispatch('updateUserInfo').then(()=>{
                            this.$hideLoading()
                        })
                    }
                })
            })
           
        }
    },

    activated(){
        this.$showLoading()
        document.title = '设置'
        this.$store.ready(state=>{
            if(state.isLogin == 1){
                this.phone = state.userInfo.mobile;
                this.id = state.userInfo.username;
                this.email = state.userInfo.email;
                this.name = state.userInfo.name;
            }
            
            this.$hideLoading()
        })
        
    },
    deactivated(){
        this.showFlag = false
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.user-setting .user-image{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: relative;
    top: 8px;
}

.user-btn-box .btn{
    line-height: 49px;
    height: 49px;
    text-align: center;
    background: #fff;
    margin-top: 10px;
    font-size: 16px;
}
.user-btn-box .btn-lgout{
    color: #e64a3b
}

.user-updata {
    color: #e64a3b;
    font-size: 14px;
    margin-left: 15px;
}

.confirm-btn-wrap {
    text-align: center;
    padding:15px 0 5px 0;
}


</style>
