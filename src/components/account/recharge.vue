<template>
    <div class="overview">
        <!-- 银行限额 -->
        <transition name="fade">
            <div id="ContactC" v-if="ContactC_show" @click="modehide($event)">
                <div id="Contact">
                    <div class="Contact_box">
                        <div class="cancelmodelbtn" @click="ContactC_show = !ContactC_show"><span class="icon-remove"></span></div>
                        <div class="Contact_head">
                            支持银行及限额
                        </div>
                        <div class="Contact_body">
                            <div class="sqbody">
                                <div class="sqbodyson">
                                    <table class="model_table">
                                        <thead>
                                            <tr>
                                                <td>银行名称</td>
                                                <td>单笔限额(元)</td>
                                                <td>每日限额(元)</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(bankcard,index) in bankcardlimitList" :key='index'>
                                            <td><img :src="bankcard.logo" />{{bankcard.name}}</td>
                                            <td>{{bankcard.limit}}</td>
                                            <td>{{bankcard.daylimit}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="graph">我要充值</div>
        <div class="rechargeC" id="AjaxForm"  v-cloak>
            <div class="awardListC row">
                <ul class="clearfix form-group">
                    <li :class="{awardList_active:Rechargetype == 0}" @click="typeChange(0)"><label class="rechargetypelab">快捷充值<input type="radio" name="payType" value="1" checked class="rechargeMode" style="display:none;" /></label></li>
                    <li :class="{awardList_active:Rechargetype == 1}" @click="typeChange(1)">
                        <label v-if="regType == 0" class="rechargetypelab rechargetypesel">个人网银<input type="radio" name="payType" value="2" class="rechargeMode" style="display:none;" /></label>
                        <label v-if="regType == 1" class="rechargetypelab rechargetypesel">企业网银<input type="radio" name="payType" value="3" class="rechargeMode" style="display:none;" /></label>
                        <input v-if="regType == 0" class="form-submit required" type="hidden" name="payType" id="payType" value="2" />
                        <input v-if="regType == 1" class="form-submit required" type="hidden" name="payType" id="payType" value="3" />
                    </li>
                </ul>
                <span class="accountBalance"  v-cloak>账户余额：<label>{{accountInfo.useMoney}}元</label></span>
            </div>
            <div class="chgenew"></div>
            <!-- <p class="balancetitle">账户余额</p> -->
            
            <!-- @*<div class="rechargeline">
                <label>充值方式</label>
                <label class="rechargetypelab rechargetypesel">快捷充值<input type="checkbox" class="rechargeMode"/></label>
                <label class="rechargetypelab">网银充值<input type="checkbox" class="rechargeMode" /></label>
            </div>*@ -->
            <!-- <div class="rechargeline form-group">
                <label>充值方式</label>
                <label class="rechargetypelab">快捷充值<input type="radio" name="payType" value="1" checked class="rechargeMode" /></label>
                <label v-if="regType == 0" class="rechargetypelab rechargetypesel">个人网银<input type="radio" name="payType" value="2" class="rechargeMode" /></label>
                <label v-if="regType == 1" class="rechargetypelab rechargetypesel">企业网银<input type="radio" name="payType" value="3" class="rechargeMode" /></label>
                <input v-if="regType == 0" class="form-submit required" type="hidden" name="payType" id="payType" value="2" />
                <input v-if="regType == 1" class="form-submit required" type="hidden" name="payType" id="payType" value="3" />
                <span class="tip"></span>
            </div> -->
            <div class="rechargeline form-group">
                <label>充值金额</label>
                <input class="moneyinput form-submit required" type="number" name="money" />
                元
                <span class="tip"></span>
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
                <p>5.<a style="color: #fb5a5c;text-decoration: underline;"  @click="ContactC_show = !ContactC_show">银行限额</a></p>
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
        ret:'',
        Rechargetype:1,
        bankcardlimitList:'',
        ContactC_show:false,
        regType:JSON.parse(localStorage.ltjfUserInfo).regType
      }
    },
    mounted:function(){
        var self = this;
        self.sid = localStorage.SID;
        //充值接口的ret参数为12
        if (self.ifRegular == 0) {
            self.ret = 12;
        } else {
            self.ret = 120;
        }
        //余额查询
        self._ajax(self,'/api/account/index', {}, function (data) {
            self.accountInfo = data.data;
        }, '');

        //充值方式选择
        $(".rechargetypelab").click(function () {
            $("#payType").val($("input[name='payType']:checked").val());
        })

        //提交充值申请
        self.AjaxSumbit(self,"", "/api/chinapnr/recharge", function (data) {
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
    created() {
        var self = this;
        // 银行限额信息获取
        self._ajax(self,'/api/product/bankLimit', {}, function (data) {
            self.bankcardlimitList = data.data;
        },'');   
    },
    methods: {
        typeChange:function(type){
            this.Rechargetype = type;
        },
        modehide:function(e){
            // 点击空白关闭模态框
            let self = this;            
            if (e.target.id == "ContactC" || e.target.id == "Model") {
                // $("#ContactC").hide();
                self.ContactC_show = !self.ContactC_show;
            }
        },
    }
  }


  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
input[type="number"]{-moz-appearance:textfield;}
</style>
