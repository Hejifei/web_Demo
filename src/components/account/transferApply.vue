<template>
    <div class="overview">
        <div class="graph">
            申请债权交易-{{productDetailtitle.title}}
            <router-link class="redBtn" style="margin-right:10px;" to="/account/investlistTransfer">返回</router-link>    
        </div>
        <div class="chge"></div>
        <!-- <div class="commissionGetC">
            <p>转让金额</p>
            <span><input id="money" type="number" class="transferApplyipt" :value="productDetailinfo.transferMoney" />元</span>
        </div>
        <div class="chge"></div> -->
        <div class="commissionDetailC">
            <p>转让详情</p>
            <table>
                <tbody>
                    <tr>
                        <td>已收利息</td>
                        <td>{{productDetaildetailrepay.interest}}元</td>
                        <td>未收利息</td>
                        <td>{{productDetaildetailpay.interest}}元</td>
                    </tr>
                    <tr>
                        <td>剩余期限</td>
                        <td>{{productDetaildetailpay.num}}个月</td>
                        <td>本金</td>
                        <td>{{productDetailtitle.self_money}}元</td>
                    </tr>
                    <tr>
                        <td>最大转让</td>
                        <td>{{productDetailinfo.transferMoney}}元</td>
                        <td>手续费</td>
                        <td class="p-fee">{{p_fee}}元</td>
                    </tr>
                    <tr>
                        <td>下次回款</td>
                        <td>{{productDetail.returnTime}}</td>
                        <td>其他费用</td>
                        <td>￥{{productDetailtitle.UP_GiveMoney}}元</td>
                    </tr>
                    <tr>
                        <td>转让成功预计到账</td>
                        <td class="p-arrivalMoney">{{p_arrivalMoney}}元</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="rechargeC" id="AjaxForm"  action="" method="POST" target="_blank" v-cloak>
                <div class="rechargeline form-group">
                    <label>转让金额</label>
                    <input class="moneyinput form-submit required" name="money" id="money" autocomplete="off" v-model="money" type="number"  onkeyup="this.value=this.value.replace(/{\D}|{.}/g,'')"/>
                    元
                    <span class="tip" style="left:520px;"></span>
                    <input class="moneyinput form-submit" v-model="sid" type="hidden" name="sid" />
                    <input class="moneyinput form-submit" v-model="idget" type="hidden" name="id" />
                </div>
                <div class="rechargeline form-group">
                    <label>验证码</label>
                    <input class="codeinput form-submit required" placeholder="短信验证码" maxlength="6" name="smsverify" />
                    <a class="getcodebtn" id="getSmsVerify" @click="getCode">获取验证码</a>
                    <span class="tip"></span>
                </div>
                <div class="rechargeline">
                    <label></label>
                    <a style="display:none;" id="SubmitBtn">我要转让</a>
                    <a class="rechargeNow" @click="transferNow">我要转让</a>
                </div>
            </div>
        <!-- <div class="transferApplyBtnline"><a v-on:click="transfernow" class="redBtn">我要转让</a></div> -->
        <div class="rechargeC">
            <div class="explainarea WithdrawalsExplan">
                <h3>债权转让条件：</h3>
                <p>1.持满债权超过15天，且距离本金还款日超过15天方可申请转让；</p>
                <p>2.每次转让周期为7天，若小于下次还款日期7天，则不可发起债权转让；</p>
                <p>3.债权转让可连续发起，且可在T+1天后方可发起撤销。</p>
                <p>4.充值后未用于投资的提现申请金额，将视情况通过第三方支付平台退回原卡，到账时间以发卡行通知为准；</p>
                <p>5.代扣充值银行：中国银行、工商银行、建设银行、民生银行、招商银行等；</p>
                <p>6.若充值金额没有及时到账，请随时咨询在线客服或致电服务热线400-606-1018。</p>
                <h3>债权转让注意事项：</h3>
                <p>1.新手标、散标类产品可发起债权转让，计划类产品和私人定制不可发起；</p>
                <p>2.债权不可拆分转让，且出借人购买转让债权后不可再次转让；</p>
                <p>3.平台将收取转让金额的2%作为债权交易手续费；</p>
                <p>4.如果有任何疑问请随时咨询在线客服或致电服务热线400-606-1018。</p>
                <p>5.债权可以溢价转让或折价转让，最高溢价金额为本金加上所有收益减去已回收的本金及收益，最低折价没有限制，转让金额须大于1元；</p>
                <p>6.若持有债权包含红包或加息券，转让该债权时需扣除红包及加息券部分。</p>
                <h3>到账时间：</h3>
                <p>1.转让成功后T+1到账；</p>
                <h3>其他费用：</h3>
                <p>1.债权转让将扣除红包及加息券等优惠，计入其他费用；</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        productDetail: [],
        idget:'',
        productDetailtitle:[],
        productDetailinfo:[],
        productDetaildetailrepay:[],
        productDetaildetailpay:[],
        p_fee:'',
        p_arrivalMoney:'',
        sid:'',
        money:''
      }
    },
    mounted:function(){
        var self = this;
        self.idget = self.$store.state.getUrl(location.href).id;
        self.sid = localStorage.SID;    
        //产品详情信息获取
        self.$store.state._ajax(self,'/api/transfer/detail', { id: self.idget }, function (data) {
            var productDetail=data.data;
            productDetail.returnTime = productDetail.returnTime.substr(0, 10)
            self.productDetail = productDetail;
            self.productDetailtitle=productDetail.title;
            self.productDetailinfo=productDetail.info;
            self.productDetaildetailrepay=productDetail.detail.repay;
            self.productDetaildetailpay=productDetail.detail.pay;
            
            self.money = self.productDetailinfo.transferMoney;
            self.p_fee = (parseFloat(self.productDetailinfo.transferMoney)* 0.02).toFixed(2);
            self.p_arrivalMoney = parseFloat(parseFloat(self.productDetailinfo.transferMoney) - parseFloat(self.productDetailinfo.transferMoney) * 0.02 - parseFloat(self.productDetailtitle.UP_GiveMoney)).toFixed(2);
        }, '');

        // 输入转让金额
        $('#money').on('keyup', function () {
            var c = $(this);
            var temp_amount = c.val();
            var maxTranferMoney = self.productDetailinfo.transferMoney;
            if (/[^\d]/.test(c.val())) {//替换非数字字符
                temp_amount = c.val().replace(/[^\d.]/g, '');
            }
            temp_amount = parseFloat(temp_amount);
            if (temp_amount > maxTranferMoney) {
                temp_amount = maxTranferMoney;
            }
            $(this).val(temp_amount);
            var fee = (temp_amount * 0.02).toFixed(2);
            var arrivalMoney = (temp_amount - fee - parseFloat(self.productDetailtitle.UP_GiveMoney)).toFixed(2);
            if (!isNaN(fee)) {
                self.p_fee = fee;
                self.p_arrivalMoney = arrivalMoney;
                $(".rechargeNow").removeClass("graybtn");
            } else {
                self.p_fee = (parseFloat(maxTranferMoney) * 0.02).toFixed(2);
                self.p_arrivalMoney = (maxTranferMoney -(parseFloat(maxTranferMoney) * 0.02 - parseFloat(self.productDetailtitle.UP_GiveMoney)).toFixed(2)).toFixed(2);
                $(".rechargeNow").removeClass("graybtn");
                setTimeout(function(){
                    if($('#money').val() == ''){
                        $(".rechargeNow").addClass("graybtn");
                    }
                },1)
            }
        });

        self.$store.state.AjaxSumbit(self,"", "/api/transfer/applyTransfer", function (data) {
            layer.alert(data.msg,{title: '操作提示',icon: 6},function(){
                    layer.closeAll();
                    self.$router.push({path:'/account/investlistTransfer'})
                });
                setTimeout(function () {
                    layer.closeAll();
                    self.$router.push({path:'/account/investlistTransfer'})
                }, 2000)
        },'', true)
    },
    methods: {
        getCode: function () {
                var self = this;
                if (self.$store.state.countdown == 60) {
                    self.$store.state.settime();
                        self.$store.state._ajax(self,'/api/user/sendSmsVerify',
                            {
                                mobile:JSON.parse(localStorage.ltjfUserInfo).mobile,
                                type:1
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
                            })
                }
        },
        transferNow:function(){
            var self = this;
            var inputval = $('#money').val();
            if(inputval == ''){
                layer.alert('请输入转让金额！',{title: '操作提示',icon: 5},function(){
                    layer.closeAll();
                });
            }else if(self.p_arrivalMoney <= 0){
                layer.alert('转让金额过小，无法转让!',{title: '操作提示',icon: 5},function(){
                    layer.closeAll();
                });
            }else{
                $("#SubmitBtn").click();
            }
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
        input[type="number"]{-moz-appearance:textfield;}
     .commissionDetailC table tbody td{text-align:left;}
     .rechargeC .WithdrawalsExplan{padding:20px 5px 20px 30px }
     .explainarea h3{margin: 15px 0 10px 0;}

     .graybtn {
        background-color: #d0d0d0 !important;
        color: #969696 !important;
    }
</style>
