<template>
    <div class="hello">
        <div class="loginC">
            <login-header></login-header>
            <div class="header" style="border-bottom:none;height:68px;width:100%;">
                <div class="headerwp">
                    <router-link to="/index" class="ico logo fl" ></router-link>
                    <span class="pl40 f-30"><span class="pl40 c-999" style="border-left:2px solid #f0f0f0;">忘记密码</span></span>
                </div>
            </div>
            <div class="loginbody registerBG" style="margin:0;width:100%;">
                <div style="width:1200px;height:450px;" class="clearfix">
                    <div class="login-form fr" style="width:410px;height:450px;padding-top:0;border-top:1px solid #d8d8d8;margin-bottom: 0;margin-left:40px;">
                        <div class="login-title clearfix">
                            <div class="login-title">
                                <p>
                                    <span style="margin-left: 16px;font-size:20px;color:#323232">忘记密码</span>
                                </p>
                            </div>
                        </div>
                        <div class="chge"></div>
                        <div class="">
                            <form class="login" id="AjaxForm">
                                <p class="mb20 clearfix">
                                    <span class="registname fl">手机号：</span>
                                    <span class="registlabel fl form-group">
                                        <input type="text" placeholder="请输入手机号" class="form-submit required phone" name="mobile" id="mobile">
                                        <span class="tip"></span>
                                    </span>
                                </p>
                                <p class="mb20 clearfix">
                                    <span class="registname fl">短信验证码：</span>
                                    <span class="registlabel fl form-group">
                                        <input type="text" name="smsverify" id="smsverify" class="form-submit required" placeholder="请输入验证码" style="width: 125px">
                                        <span class="tip" style="right:125px;"></span>
                                        <a class="redBtn getcodeBtn" id="getSmsVerify" @click="getCode">点击获取验证码</a>
                                    </span>
                                </p>
                                <!--密码-->
                                <p class="mb20 clearfix">
                                    <span class="registname fl">密码：</span>
                                    <span class="registlabel fl form-group">
                                        <input type="password" placeholder="请输入密码" class="form-submit required password newpassword" name="newPassword" id="newPassword">
                                        <span class="tip"></span>
                                    </span>
                                </p>
                                <!--确认密码-->
                                <p class="mb20 clearfix">
                                    <span class="registname fl">确认密码：</span>
                                    <span class="registlabel fl form-group">
                                        <input type="password" placeholder="再次确认密码" class="form-submit required newpasswordrept" name="repassword" id="repassword">
                                        <span class="tip"></span>
                                    </span>
                                </p>
                                <p>
                                    <a class="redBtn registbtn" id="SubmitBtn">提交</a>
                                </p>
                            </form>
                        </div>
                        <div class="logo1">
                            
                            <p style="font-size:14px;color:#969696;margin-right:23px;text-align:right;">还没有利通金服账号？<router-link to="/login/registerPersonal"  style="font-size:14px;color:#eb494b">快速注册&gt;</router-link></p>
                        </div>
                    </div>
                    <div class="login-r-r fl pswdRest"></div>
                </div>

            </div>
            <login-footer></login-footer>
        </div>
    </div>
  
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
    import loginheader from '../header/loginheader.vue';
    import loginfooter from '../footer/loginfooter.vue';

    export default {
        data () {
            return {
               
            }
        },
        mounted:function(){
            var self = this;
            //提交登陆申请
            this.$store.state.AjaxSumbit(this,"/", "/api/user/resetPassword", function (j) {
                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/login"});});
            }, '')
        },
        created() {   
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:false});
            
            
        
        },
        computed:{
            
        },
        methods: {
            getCode:function(){
                var self = this;
                if (this.$store.state.countdown == 60) {
                    if ($("#mobile").val() == "") {
                        layer.alert("手机号不能为空",{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    } else {
                        self.$store.state.settime();
                        this.$store.state._ajax(self,'/api/user/sendSmsVerify',
                            {
                                mobile: $("#mobile").val(),
                                type: 1
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
                            })
                    }
                }
            }
            
        },
        components:{
            'login-header':loginheader,
            'login-footer':loginfooter
  	    } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
