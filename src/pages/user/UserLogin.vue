<template>
    <form>
        <div class="login">
            <div class="title">用户登录</div>
            <ul>
                <li class="line">
                    <span class="eva-icon person-outline"></span>
                    <input type="text" v-model="username" placeholder="请输入用户名/手机号" ref="username">
                </li>
                <li>
                    <span class="eva-icon lock-outline"></span>
                    <input type="password" autocomplete="off" v-model="password" placeholder="请输入登录密码" ref="password">
                </li>
            </ul>
        </div>
        <div type="submit" class="login-button" @click="login">登录</div>
        <store-footer />
    </form>
</template>
<script>
import {checkLogin} from '@/api/user'
export default {
    name:'UserLogin',
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        login(){
            if(!this.username){
                this.$toast('请输入账户名')
                this.$refs.username.focus()
                return false
            }else if(!this.password){
                this.$toast('请输入密码')
                this.$refs.password.focus()
                return false
            }
            this.$showLoading('正在登陆')
            checkLogin({
                username:this.username,
                password:this.password
            }).then(res=>{
                
                this.$store.dispatch('updateUserInfo').then(()=>{
                    this.$hideLoading()
                    this.$toast('登录成功','success')
                    this.$navigateBack()
                    
                })
                
            })
            
        }
    },
    activated(){
        document.title = '登录'
    }
}
</script>
<style scoped>
.login .title{
    height: 49px;
    line-height: 49px;
    overflow: hidden;
    padding: 0 15px;
    font-size: 16px;
}
.login li{
    height: 49px;
    background: #fff;
    padding: 0 10px 0 44px;
    position: relative;
}
.login li .eva-icon{
    width: 49px;
    height: 49px;
    position: absolute;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-size:24px;
    background-position: 50% 50%;
}

.login li input{
    width: 100%;
    height: 39px;
    position: relative;
    top: 5px;
    background: none;
    font-size: 14px;
    border: 0px;
}
.login-button{
   height: 44px;
   line-height: 44px;
   text-align: center;
   font-size: 16px;
   background: #e64a3b;
   color:#fff;
   border-radius: 4px;
   margin: 15px;
}

</style>


