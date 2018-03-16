<template>
    <div>
        <form style="display:none">
            <input type="password" />
        </form>
        <input type="password" style="width:0;height:0;float:left;visibility:hidden" />
        <div class="overview">
            <div class="graph">我要提现</div>
            <div class="rechargeC" id="AjaxForm"  action="" method="POST" target="_blank" v-cloak>
                <div class="awardListC row">
                <ul class="clearfix form-group">
                    <li :class="{awardList_active:Rechargetype == 0}" @click="typeChange(0)">
                        <!-- <label class="rechargetypelab">快捷充值<input type="radio" name="payType" value="1" checked class="rechargeMode" style="display:none;" /></label> -->
                        <label v-if="regType == 0" class="rechargetypelab">即时取现<input type="radio" name="wType" value="1" checked class="rechargeMode" style="display:none;"/></label>
                        <label v-if="regType == 1" class="rechargetypelab">快速提现<input type="radio" name="wType" value="1" checked class="rechargeMode" style="display:none;"/></label>
                    </li>
                    <li :class="{awardList_active:Rechargetype == 1}" @click="typeChange(1)">
                        <label v-if="regType == 0" class="rechargetypelab rechargetypesel">普通取现<input type="radio" name="wType" value="2" class="rechargeMode" style="display:none;" /></label>
                        <label v-if="regType == 1" class="rechargetypelab rechargetypesel">普通提现<input type="radio" name="wType" value="2" class="rechargeMode" style="display:none;" /></label>
                        <input class="form-submit required" type="hidden" name="wType" id="wType" value="2" />
                    </li>
                </ul>
                <span class="accountBalance"  v-cloak>账户余额：<label>{{accountInfo.useMoney}}元</label></span>
            </div>
            <div class="chgenew"></div>
                <!-- <p class="balancetitle">账户余额</p>
                <span class="accountBalance"  v-cloak><label>{{accountInfo.useMoney}}</label>元</span>
                <div class="rechargeline form-group">
                    <label>提现方式</label>
                    <label v-if="regType == 0" class="rechargetypelab">即时取现<input type="radio" name="wType" value="1" checked class="rechargeMode"/></label>
                    <label v-if="regType == 0" class="rechargetypelab rechargetypesel">普通取现<input type="radio" name="wType" value="2" class="rechargeMode" /></label>
                    <label v-if="regType == 1" class="rechargetypelab">快速提现<input type="radio" name="wType" value="1" checked class="rechargeMode"/></label>
                    <label v-if="regType == 1" class="rechargetypelab rechargetypesel">普通提现<input type="radio" name="wType" value="2" class="rechargeMode" /></label>
                    <input class="form-submit required" type="hidden" name="wType" id="wType" value="2" />
                    <span class="tip"></span>
                </div> -->
                <!-- @*<div class="rechargeline form-group">
                    <label>选择银行</label>
                    <select class="form-submit required">
                        <option>中国银行(3799)</option>
                    </select>
                    <span class="redtip">
                        <i class="icon-info-sign"></i>单笔5万，单日50万
                    </span>
                </div>*@ -->
                <div class="rechargeline form-group">
                    <label>提现金额</label>
                    <input class="moneyinput form-submit required" name="money" autocomplete="off" type="number"/>
                    元
                    <span class="tip"></span>
                    <input class="moneyinput form-submit" type="hidden" name="type" />
                    <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                    <input class="moneyinput" v-model="sid" type="hidden" name="sid" />
                    <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret"/>
                </div>
                <div class="rechargeline">
                    <label></label>
                    <a class="rechargeNow" id="SubmitBtn">确认提现</a>
                </div>
                <div class="explainarea WithdrawalsExplan">
                    <p>1. 取现时间：全天24小时实时处理；</p>
                    <p>2. 取现方式说明：</p>
                    <!-- <p>① 即时取现：支持工/招行，不论工作日与非工作日，均当天到账；</p> -->
                    <p v-if="regType == 0">① 即时取现：2小时内到账；</p>
                    <p v-if="regType == 1">① 快速提现（T+0）：工作日14:30前提交取现申请，当天到账；工作日14:30之后提交取现申请，以及非工作日提交取现申请，将顺延至下一个工作日到账；</p>
                    <p>② 普通取现（T+1）：将在下一个工作日到账；</p>
                    <p>3. 国家法定节假日：国家法定节假日期间是否处理提现等事宜，具体以即时公告为准；</p>
                    <p>4. 请勿使用他人身份证进行实名认证，否则将导致无法提现；绑定的提现银行卡开户人需与实名认证信息一致；</p>
                    <p>5. 如果有任何疑问请随时咨询在线客服或致电服务热线400-606-1018；</p>
                    <p>6. 若充值金额没有及时到账，请随时咨询在线客服或致电服务热线400-606-1018；</p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        regType:0,
        sid: '',
        returndata: '',
        accountInfo: '',
        ret:'',
        Rechargetype:1
      }
    },
    created(){
        var self = this;
        // 从localStorage获取用户是否是企业或个人
        self.regType = JSON.parse(localStorage.ltjfUserInfo).regType;
    },
    mounted:function(){
        var self = this;
        self.sid = localStorage.SID;
        //提现接口的ret参数为13
        if (self.$store.state.ifRegular == 0) {
            self.ret = 13;
        } else {
            self.ret = 130;
        }
        //银行卡号查询
        self.$store.state._ajax(self,'/api/bankcard/index', {}, function (data) {
            self.bankcardList = data.data;
        }, function (data) {
            if (data.code == 3) {
                setTimeout(function(){self.$router.push({path:'/account/bankcard'})}, 2000);
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){self.$router.push({path:'/account/bankcard'});layer.closeAll();});
            }
        });
        //余额查询
        self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
            self.accountInfo = data.data;
        }, '');

        //提现方式选择
        $(".rechargetypelab").click(function () {
            // $(".rechargetypesel").removeClass("rechargetypesel");
            // $(this).addClass("rechargetypesel")
            $("#wType").val($("input[name='wType']:checked").val());
        })

        //提交充值申请
        self.$store.state.AjaxSumbit(self,"", "/api/chinapnr/wthdrawals", function (data) {
            //$("#respType").val('html')
            //$('#AjaxForm').attr('action', APIURL + '/api/chinapnr/recharge').submit();
            if (typeof data.data == "string") {
                var start = data.data.indexOf('<form id="autoRedirectForm"');
                var end = data.data.indexOf('</body>');
                var form = data.data.substr(start, end - start);
                //var form1 = form.substr(0, 5);
                //var form2 = form.substr(5, end - start - 5);
                //$(form1 + " target = '_blank' " + form2).appendTo('body').submit();
                $(form).appendTo('body').submit();
            }
        },function(data){
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
        typeChange:function(type){
            this.Rechargetype = type;
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
input[type="number"]{-moz-appearance:textfield;}
</style>
