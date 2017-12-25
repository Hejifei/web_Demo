<template>
    <div class="overview">
        <div class="graph">开通银行存管账户</div>
        <div class="chge"></div>
        <form class="rechargeC EditrechargeC" id="AjaxForm"  action="" method="POST" target="_blank">
            <!-- @*<p class="balancetitle">请输入本人姓名及身份证号</p>*@
            @*<div class="rechargeline form-group">
                <label>真实姓名</label>
                <input class="moneyinput form-submit required" placeholder="请输入持卡人名字" name="usrName" id="usrName"/>
                <span class="tip"></span>
            </div>*@ -->
            <div class="rechargeline form-group">
                <label>{{labeltext}}</label>
                <input class="moneyinput form-submit required" :class="inputtype" :placeholder="plactext" name="idno" id="idno" v-model="idno" />
                <span class="tip"></span>
                <input class="moneyinput form-submit" type="hidden" name="type" />
                <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType"/>
                <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret" />
                <input class="moneyinput form-submit" :value="sid" type="hidden" name="sid" />
            </div>
            <!-- @*<div class="rechargeline form-group">
                <label>银行卡号</label>
                <input class="moneyinput form-submit required" placeholder="请输入银行卡号" name="cardid"  id="cardid"/>
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label>选择银行</label>
                <select class="form-submit required" name="bankid">
                    <option value="">请选择</option>
                    <option value="ABC">农业银行</option>
                    <option value="CCB">建设银行</option>
                    <option value="BOC">中国银行</option>
                    <option value="CEB">光大银行</option>
                    <option value="CIB">兴业银行</option>
                    <option value="PINGAN">平安银行</option>
                    <option value="PSBC">中国邮政储蓄银行</option>
                    <option value="SPDB">上海浦东发展银行</option>
                    <option value="ICBC">工商银行</option>
                    <option value="CMBC">民生银行</option>
                    <option value="HFB">恒丰银行</option>
                    <option value="HXB">华夏银行</option>
                    <option value="BOCOM">交通银行</option>
                    <option value="GDB">广发银行</option>
                    <option value="CMB">招商银行</option>
                </select>
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label>选择城市</label>
                <select class="form-submit required" name="">
                    <option>苏州</option>
                </select>
                <span class="tip"></span>
                <input class="moneyinput form-submit" type="hidden" name="provId" value="0032" />
                <input class="moneyinput form-submit" type="hidden" name="areaId" value="3206" />
            </div>
            <div class="rechargeline form-group">
                <label>绑定手机</label>
                <input class="moneyinput form-submit required phone" placeholder="请输入银行预留手机号" name="usrMp" id="usrMp" />
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label>验证码</label>
                <input class="codeinput form-submit required" placeholder="短信验证码" maxlength="6" name="smsCode" />
                <a class="getcodebtn" id="getSmsVerify" v-on:click="getCode">获取验证码</a>
                <span class="tip"></span>
                <input class="moneyinput form-submit" type="hidden" name="type" value="0" />
                <input class="moneyinput form-submit" type="hidden" name="respType" value="json" />
            </div>*@ -->

            <div class="rechargeline">
                <label></label>
                <a class="rechargeNow" id="SubmitBtn">立即提交</a>
            </div>
            <div id="databackshow"></div>
        </form>
    </div>
</template>

<script>
    
    export default {
        data () {
            return {
                sid: '',
                regType:'',
                returndata: '',
                inputtype:'',
                labeltext: '身份证号',
                plactext:"请输入身份证号",
                idno:'',
                ret:''
            }
        },
        mounted:function(){
            var self = this;
            self.sid = localStorage.SID;
            //验证是否已经实名制，已经实名制跳到实名制认证成功界面
            self.$store.state._ajax(self,'/api/user/userInfo', {}, function (data) {
                if (data.data.U_IsUseAccount == '1') {
                    self.$router.push({path:"/account/accountOpened"});
                }
                self.regType = data.data.regType;
                if (self.regType == 1) {
                    //企业开户
                    self.labeltext = "营业执照";
                    self.inputtype = ""; 
                    self.plactext = "请输入营业执照编号";
                    self.idno= JSON.parse(localStorage.ltjfUserInfo).idno;
                    //提交开户申请
                    self.$store.state.AjaxSumbit(self,"/", "/api/chinapnr/corpRegister", function (data) {
                        if (typeof data.data == "string") {
                            var start = data.data.indexOf('<form id="autoRedirectForm"');
                            var end = data.data.indexOf('</body>');
                            var form = data.data.substr(start, end - start);
                            $(form).appendTo('body').submit();
                        }
                    },'' , true)
                } else {
                    //个人开户
                    self.inputtype = "idcard";
                    //提交开户申请
                    self.$store.state.AjaxSumbit(self,"/", "/api/chinapnr/userRegister", function (data) {
                        if (typeof data.data == "string") {
                            var start = data.data.indexOf('<form id="autoRedirectForm"');
                            var end = data.data.indexOf('</body>');
                            var form = data.data.substr(start, end - start);
                            $(form).appendTo('body').submit();
                        }
                    },'', true)
                }
            }, '', false);

            //开户接口的ret参数为10
            if (self.$store.state.ifRegular == 0) {
                self.ret = 10;
            } else {
                self.ret = 100;
            }
            
        },
        methods: {
            getCode: function () {
                var self = this;
                if (countdown == 60) {
                    if ($("#usrMp").val() == "") {
                        layer.alert("手机号不能为空!",{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    } else {
                        settime();
                        self.$store.state._ajax(self,'/api/deposit/sendSms',
                            {
                                busiType: 1,
                                usrMp: $("#usrMp").val(),
                                openAcctId: $("#cardid").val()
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
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
