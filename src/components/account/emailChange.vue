<template>
    <div class="overview">
        <div class="graph">邮箱绑定</div>
        <div class="chge"></div>
        <div class="rechargeC EditrechargeC" id="AjaxForm">
            <div class="rechargeline form-group">
                <label>邮箱账号</label>
                <input class="moneyinput form-submit required" placeholder="请输入邮箱账号" name="email" id="email"/>
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label class="width90label">邮箱验证码</label>
                <input class="codeinput form-submit required" placeholder="邮箱验证码" maxlength="6" name="massage" />
                <a class="getcodebtn" id="getSmsVerify" v-on:click="getCode">获取验证码</a>
                <span class="tip"></span>
            </div>
            <div class="rechargeline">
                <label></label>
                <a class="rechargeNow" id="SubmitBtn">确认</a>
                <input class="moneyinput form-submit" type="hidden"  name="type" id="type" value="2"/>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        data () {
            return {
                
            }
        },
        mounted:function(){
            var self = this;
            

            //登录密码修改
            self.$store.state.AjaxSumbit(self,"/account/baseInfo", "/api/user/BindEmail", function (j) {
                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){
                    self.$router.push({path:"/account/baseInfo"});layer.closeAll();
                });
                setTimeout(function(){
                    self.$router.push({path:"/account/baseInfo"});
                    layer.closeAll();
                },2000)
            }, '',true)

        },
        methods: {
            getCode: function () {
                var self = this;
                if (self.$store.state.countdown == 60) {
                    if ($("#email").val() == "") {
                        layer.alert("邮箱账号不能为空",{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    } else {
                        self.$store.state.settime();
                        self.$store.state._ajax(self,'/api/user/BindEmail',
                            {
                                type: 1,
                                email: $("#email").val()
                            }, function (j) {
                                layer.alert("验证码发送成功！",{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            }, function (j) {
                                layer.alert("验证码发送成功！",{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            })
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
