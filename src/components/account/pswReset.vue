<template>
    <div class="overview">
        <div class="graph">登录密码修改</div>
        <div class="chge"></div>
        <div class="rechargeC EditrechargeC" id="AjaxForm">
            <div class="rechargeline form-group">
                <label>原密码</label>
                <input class="moneyinput form-submit required password" type="password" placeholder="请输入原密码" name="oldPassword" id="oldPassword" />
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label>新密码</label>
                <input class="moneyinput form-submit required password newpassword" type="password" placeholder="6~20位数字、字母" name="newPassword" id="newPassword" />
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label class="width90label">确认新密码</label>
                <input class="moneyinput form-submit required password newpasswordrept" type="password" placeholder="请重新输入密码" name="newPasswordre" id="newPasswordre" />
                <span class="tip"></span>
            </div>
            <div class="rechargeline">
                <label></label>
                <a class="rechargeNow" id="SubmitBtn">确认提交</a>
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
            self.AjaxSumbit(self,"/account/baseInfo", "/api/user/editPassword", function (j) {
                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){
                    //密码修改成功后退出登录
                    self._ajax(self,'/api/user/logout', {}, function (data) {
                        if (data.code == '1') {
                            self.getSID(self);
                            self.$router.push({path:"/login"});
                            layer.closeAll();
                        }
                    })
                });
                setTimeout(function(){
                    //密码修改成功后退出登录
                    self._ajax(self,'/api/user/logout', {}, function (data) {
                        if (data.code == '1') {
                            self.getSID(self);
                            self.$router.push({path:"/login"})
                            layer.closeAll();
                        }
                    })
                },2000)
            }, '',true)

        },
        methods: {
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
