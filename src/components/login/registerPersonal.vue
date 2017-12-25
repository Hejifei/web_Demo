<template>
    <div class="hello">
            <div class="loginC">
                <login-header></login-header>
                <div class="header" style="border-bottom:none;height:68px;width:100%;">
                    <div class="headerwp">
                        <router-link to="/index" class="ico logo fl"></router-link>
                        <span class="pl40 f-30">
                            <router-link to="/login/registerPersonal"><span class="pl40" style="border-left:2px solid #f0f0f0;">个人注册</span></router-link>
                            <router-link to="/login/registerEnterprise"><span class="pl40 c-999">企业注册</span></router-link>
                        </span>
                    
                    </div>
                </div>
                <div class="loginbody registerBG registerC" id="box" style="margin:0;width:100%;"> 
                    <div style="width:1000px;"  class="clearfix"> 
                        <div class="login-r-r fl"></div>
                        <div class="fr loginbody-z">
                            <p class="registerTitle">个人注册</p>
                            <div class="chge"></div>
                            <div class="fixbug" id="fixbug">
                                <div class="">
                                    <form class="login" id="AjaxForm">
                                        <p class="mb20 clearfix">
                                            <span class="registname fl">手机号：</span>
                                            <span class="registlabel fl form-group" >
                                                <input type="text" placeholder="请输入手机号" class="form-submit required phone" name="mobile" id="mobile" />
                                                <span class="tip"></span>
                                            </span>
                                        </p>
                                        <p class="mb20 clearfix">
                                            <span class="registname fl" style="width:126px">短信验证码：</span>
                                            <span class="registlabel fl form-group" style="width:260px">
                                                <input type="text" name="smsverify" id="smsverify" class="form-submit required"  placeholder="请输入验证码" style="width: 125px" />
                                                <span class="tip" style="right:125px;"></span>
                                                <a class="redBtn getcodeBtn" @click="getcode" id="getSmsVerify">点击获取验证码</a>
                                            </span>
                                        </p>
                                        <!--密码-->
                                        <p class="mb20 clearfix">
                                            <span class="registname fl">密码：</span>
                                            <span class="registlabel fl form-group" >
                                                <input type="password" placeholder="请输入密码" class="form-submit required password newpassword" name="password" id="password" />
                                                <span class="tip"></span>
                                            </span>
                                        </p>
                                        <!--确认密码-->
                                        <p class="mb20 clearfix">
                                            <span class="registname fl" style="width:126px">确认密码：</span>
                                            <span class="registlabel fl form-group">
                                                <input type="password" placeholder="再次确认密码" class="form-submit required newpasswordrept" name="repassword" id="repassword" />
                                                <span class="tip"></span>
                                            </span>
                                        </p>
                                        <p class="mb20 clearfix">
                                            <span class="registname fl">推荐人手机号：</span>
                                            <span class="registlabel fl form-group">
                                                <input type="text" placeholder="请输入推荐人手机号（可选填）" class="form-submit" name="inviter" id="inviter" />
                                                <span class="tip"></span>
                                                <!-- @*注册类型*@ -->
                                                <input type="hidden" class="form-submit" value="0" name="type" id="type" />
                                            </span>
                                        </p>
                                        <div class="registxieyiline form-group">
                                            <input name="autoenter" class="agreement" id="autoenter" type="checkbox" value="1" checked />&nbsp;
                                            <span class="tip" style="display:none;"></span>
                                            <label>我已阅读并同意<a class="xieyia" id="registxy" href="" target="_blank">《利通金服注册协议》</a></label>
                                        </div>
                                        <p>
                                            <a class="redBtn registbtn" id="SubmitBtn">快速注册</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                            <div class="logo1">
                                <p style="font-size:14px;color:#969696;margin-right:23px">已有账号，<router-link to="/login" style="font-size:14px;color:#eb494b">立即登录</router-link></p>
                            </div>
                        </div>
                        
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
                apiurl: '',
                sid: '',
            }
        },
        mounted:function(){
            var self = this;
            //提交登陆申请
            this.$store.state.AjaxSumbit(this,"/login", "/api/user/reg", function (j) {
                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){self.$router.push({path:"/login"});layer.closeAll();});
            },'')
        },
        created() {
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:false});
            self.apiurl = this.$store.state.APIURL;
            self.sid = localStorage.SID;
            //协议
            this.$store.state._ajax(self,'/api/open/protocol', { respType: 'json' }, function (data) {$("#registxy").attr("href", data.data);})
        },
        computed:{
        },
        methods: {
            getcode:function(){
                var self = this;
                if (this.$store.state.countdown == 60) {
                    if ($("#mobile").val() == "") {
                        layer.alert("手机号不能为空!",{title: '操作提示',icon: 5},function(){layer.closeAll()});
                    } else {
                        self.$store.state.settime();
                        self.$store.state._ajax(self,'/api/user/sendSmsVerify',
                            {
                                mobile: $("#mobile").val(),
                                type: 1
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){layer.closeAll()});
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 5},function(){layer.closeAll()});
                                
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
