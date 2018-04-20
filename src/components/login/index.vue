<template>
  <div class="hello">
        <div class="loginC">
            <login-header></login-header>
            <div class="header" style="border-bottom:none;height:63px;width:100%;">
                <div class="headerwp">
                    <router-link to="/index" class="ico logo fl"></router-link>
                    <span class="pl40 f-30"><span class="pl40 c-999" style="border-left:2px solid #f0f0f0;">登录</span></span>
                </div>
                <input type="password" style="width:0;height:0;"/>
                </div>
                <div class="loginbody registerBG" style="margin:0;width:100%;">
                    <div style="width:1200px;height:450px;"  class="clearfix">
                        <div class="login-form fr" style="width:362px;height:395px;padding-top:0;border-top:1px solid #d8d8d8;margin-bottom: 0;margin-left:40px;">
                            <div class="login-title clearfix">
                                <div class="login-title">
                                    <p>
                                        <span style="font-size:20px;color:#323232">登录</span>
                                        <span>
                                            <router-link to="/login/registerPersonal"><span class="fr f-red pr15" style="font-size:12px">个人注册></span></router-link>
                                            <router-link to="/login/registerEnterprise"><span class="fr f-red" style="font-size:12px">企业注册></span></router-link>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        <div class="chge"></div>
                        <div class="login" id="AjaxForm">
                            <p class="mb20 clearfix">
                                <span class="logname fl">手机号：</span>
                                <span class="loglabel fl form-group" style="width:240px">
                                    <input maxlength="11" type="text" v-model="mobile" name="mobile" id="mobile" placeholder="请输入手机号码"  class="input_text radius form-submit required phone" onkeyup="value=value.replace(/[^\d]/g,'')"/>
                                    <span class="tip"></span>
                                </span>
                            </p>
                            <!--密码-->
                            <p class="mb20 clearfix">
                                <span class="logname fl"><em class="f-red"></em>密码：</span>
                                <span class="loglabel fl form-group" style="width:240px">
                                    <input type="password" v-model="password" name="password" id="password" placeholder="请输入密码" class="input_text radius form-submit required password"/>
                                    <span class="tip"></span>
                                </span>
                            </p>
                            <p class="mb20 clearfix">
                                <span class="logname fl">验证码：</span>
                                <span class="loglabel fl form-group" style="width:240px">
                                    <input maxlength="6" type="text"  placeholder="请输入验证码" class="input_text  radius w90 form-submit required" name="imgverify" id="imgverify" v-model="imgverify">
                                    <span class="tip" style="right: 120px;"></span>
                                    <span class="code">
                                        <!-- <img id="codeimg" :src="codeimgurl" @click='numchange'> -->
                                        <img id="codeimg" v-bind:src="apiurl +'/api/user/getImgVerify?sid='+sid+'&random='+numrandom" v-on:click="numchange" ref="img">                                  
                                    </span>
                                    
                                </span>
                            </p>
                            <p style="margin-bottom:15px;">
                                <span class="loglabel" style="padding:0 27px;">
                                    <input type="checkbox" checked value="1" id="autoenter" name="autoenter">&nbsp;
                                    <label for="autoenter" style="font-size:14px;font-family:微软雅黑">记住用户名</label>
                                    <router-link to="/login/passwordReset" class="pl10 f-red fr" style="font-size:14px;font-family:微软雅黑">忘记密码？</router-link>
                                </span>
                            </p>
                            <p style="padding:0 30px;">
                                <a class="redBtn loginbtn" id="SubmitBtn">立即登录</a>
                            </p>
                        </div>
                    </div>
                    <div class="login-r-r fl" style="background-position-y:0px;height:450px;"></div>
                </div>
            </div>
            <router-view></router-view>
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
                mobile:'',
                numrandom : '',
                password:'',
                yzmFailCount:0,
                imgverify:''
            }
        },
        mounted:function(){
            var self = this;
            // setTimeout(function(){
            //     self.numchange();
            // },0)

            //提交登陆申请
            this.AjaxSumbit(this,"/", "/api/user/login", function (j) {
                localStorage.uid = j.data.id;
                layer.msg(j.msg);
                localStorage.ltjfUserInfo = JSON.stringify(j.data);
                //记住用户名
                if ($("#autoenter").prop("checked")) {
                    localStorage.ltjfUserPhone = $("#mobile").val();
                }
                if (localStorage.url != '' && localStorage.url != null && localStorage.url != undefined) {
                    self.$router.push({path:localStorage.url});
                    localStorage.removeItem("url");
                } else {
                    self.$router.push({path:"/"});
                }
            }, function (j) {
                //记住用户名
                if ($("#autoenter").prop("checked")) {
                    localStorage.ltjfUserPhone = $("#mobile").val();
                }
                layer.alert(j.msg,{title: '操作提示',icon: 5},function(){
                    layer.closeAll();
                    if(j.code == 0){
                        self.getSID(self);
                    }else{
                        // window.location.reload();
                        self.numchange();
                        self.password ='';
                        self.imgverify='';
                    }
                    
                });
            })

            //验证码获取失败重新获取sid
            this.$refs.img.onerror = () => {
                // self.getSID(self);
                if(self.yzmFailCount === 0){
                    self._ajax(self,'/api/session/check', {}, function (data) {
                        self.yzmFailCount = Number(self.yzmFailCount)+1;
                        self.numchange();
                        return ;
                    }, function(){});
                }else if(self.yzmFailCount < 5){
                    self.yzmFailCount = Number(self.yzmFailCount)+1;
                    self.numchange();
                    return ;
                }else{
                    layer.alert("验证码获取失败，请联系客服<br />400-606-1018",{title: '操作提示',icon: 5},function(){layer.closeAll();});
                }
                
            }
        },
        created() {   
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:false});
            self.apiurl = this.APIURL;
            self.sid = localStorage.SID;
            self.numrandom = Math.random();

            //检索用户名
            if (localStorage.ltjfUserPhone) {
                self.mobile = localStorage.ltjfUserPhone;
            }
            
        },
        computed:{
            codeimgurl: function () {
                return this.apiurl + '/api/user/getImgVerify?sid=' + this.sid + '&random=' + this.numrandom;
            }
        },
        methods: {
            numchange:function(){
                this.numrandom = Math.random();
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
