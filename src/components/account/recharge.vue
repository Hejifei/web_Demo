<template>
    <div class="overview">
        <div class="graph">充值</div>
        <div class="chge"></div>
        <div class="rechargeC" id="AjaxForm"  v-cloak>
            <p class="balancetitle">账户余额</p>
            <span class="accountBalance"  v-cloak><label>{{accountInfo.useMoney}}</label>元</span>
            <!-- @*<div class="rechargeline">
                <label>充值方式</label>
                <label class="rechargetypelab rechargetypesel">快捷充值<input type="checkbox" class="rechargeMode"/></label>
                <label class="rechargetypelab">网银充值<input type="checkbox" class="rechargeMode" /></label>
            </div>*@ -->
            <div class="rechargeline form-group">
                <label>充值方式</label>
                <label class="rechargetypelab">快捷充值<input type="radio" name="payType" value="1" checked class="rechargeMode" /></label>
                <label v-if="regType == 0" class="rechargetypelab rechargetypesel">个人网银<input type="radio" name="payType" value="2" class="rechargeMode" /></label>
                <label v-if="regType == 1" class="rechargetypelab rechargetypesel">企业网银<input type="radio" name="payType" value="3" class="rechargeMode" /></label>
                <input v-if="regType == 0" class="form-submit required" type="hidden" name="payType" id="payType" value="2" />
                <input v-if="regType == 1" class="form-submit required" type="hidden" name="payType" id="payType" value="3" />
                <span class="tip"></span>
            </div>
            <div class="rechargeline form-group">
                <label>充值金额</label>
                <input class="moneyinput form-submit required" type="number" name="money" />
                元
                <span class="tip" style="left:520px;"></span>
                <input class="moneyinput form-submit" type="hidden" name="type" />
                <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                <input class="moneyinput" v-model="sid" type="hidden" name="sid" />
                <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret" />
            </div>
            <!-- @*<div class="rechargeline form-group" v-show="banklistshow">
                <label>银行卡号</label>
                <select class="moneyinput form-submit" name="bankId" id="bankId">
                    <option v-if="bankcardList.length == 0">您还没有银行卡，请先去绑卡！</option>
                    <option v-for="bankcard in bankcardList" :value="bankcard.bankId">{{bankcard.name}}({{bankcard.bidCard}})</option>
                </select>
                <span class="tip" style="left:640px;"></span>
            </div>*@
            @*<div class="rechargeline">
                <label>验证码</label>
                <input class="codeinput" maxlength="6" />
                <a class="getcodebtn" id="getSmsVerify" >获取验证码</a>
            </div>*@ -->
            <div class="rechargeline">
                <label></label>
                <a class="rechargeNow" id="SubmitBtn"  >立即充值</a>
            </div>
            <div class="explainarea">
                <p>请勿使用他人身份证进行实名认证并且充值，否则将导致无法提现。</p>
                <p>1.为了您的资金安全，请您在充值之前先完成实名认证；</p>
                <p>2.每日的充值限额依据各银行限额为准；</p>
                <p>3.严禁利用充值功能进行信用卡套现、转账、洗钱等行为，一经发现，资金将退回原卡并封停账号30天；</p>
                <p>4.充值后未用于投资的提现申请金额，将视情况通过第三方支付平台退回原卡，到账时间以发卡行通知为准；</p>
                <p>5.快捷充值支持银行：农业、建设、中国、光大、兴业、平安、上海、渤海、邮储、浦发、工商、民生。</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        sid: '',
        returndata: '',
        accountInfo: '',
        bankcardList: '',
        banklistshow: false,
        regType:'',
        ret:''
      }
    },
    mounted:function(){
        var self = this;
        self.sid = localStorage.SID;
        self.regType = JSON.parse(localStorage.ltjfUserInfo).regType;
        //充值接口的ret参数为12
        if (self.$store.state.ifRegular == 0) {
            self.ret = 12;
        } else {
            self.ret = 120;
        }
        //余额查询
        self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
            self.accountInfo = data.data;
        }, '');

        //充值方式选择
        $(".rechargetypelab").click(function () {
            $(".rechargetypesel").removeClass("rechargetypesel");
            $(this).addClass("rechargetypesel")
            $("#payType").val($("input[name='payType']:checked").val());
            if ($('input[name="payType"]:checked ').val() == 1) {
                self.banklistshow = true;
            } else {
                self.banklistshow = false;
            }
        })

        //提交充值申请
        self.$store.state.AjaxSumbit(self,"", "/api/chinapnr/recharge", function (data) {
            if (typeof data.data == "string") {
                var start = data.data.indexOf('<form id="autoRedirectForm"');
                var end = data.data.indexOf('</body>');
                var form = data.data.substr(start, end - start);
                $(form).appendTo('body').submit();
            }
        }, function(data){
            if(data.code == 0){
                    setTimeout(function(){layer.closeAll();self.$router.push({path:'/account/accountOpen'});}, 2000);
                    layer.alert(data.msg, {icon: 5}, function () { layer.closeAll();self.$router.push({path:'/account/accountOpen'}); })
                    
            }else{
                    setTimeout(function(){layer.closeAll();}, 2000);
                    layer.alert(data.msg, {icon: 5}, function () { layer.closeAll(); })
            }
        }, true)
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
input[type="number"]{-moz-appearance:textfield;}
</style>
