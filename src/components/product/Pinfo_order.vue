<template>
  <div class="hello">
    <div class="index_centerC">
        <div class="index_center projectListC">
            <div class="projectInfoC">
                <div class="graph pad30">
                    <img :src="productDetail.img"/>
                    {{productDetail.title}}
                    <span title="此标的可使用红包" v-if="productDetail.is_reward == 1" class="ptitlelogo">红包</span>
                    <span title="此标的可使用加息券" v-if="productDetail.is_extraRate == 1" class="ptitlelogo">加息券</span>
                    <span title="此为新手专享标" v-if="productDetail.is_new == 1" class="ptitlelogo">新手</span>
                    <span title="此为私人定制标" v-if="productDetail.isCustomized == 1" class="ptitlelogo">私人定制</span>
                    
                    <!-- <a v-if="productDetail.follow == 0" @click="follow" class="redBtn">关注</a>
                    <a v-if="productDetail.follow == 1" @click="follow" class="redBtn followed">已关注</a> -->
                </div>
                <div class="chge"></div>
                <div class="clearfix">
                    <div class="projectInfo_headleft">
                        <ul class="clearfix" style="margin-top:30px;">
                            <li>
                                <p><span>{{productDetail.money}}</span></p>
                                <p>已预约金额</p>
                            </li>
                            <li>
                                <p><span>{{productDetail.rate}}</span>%</p>
                                <!-- <p v-if="productDetail.extra_rate == 0"><span>{{productDetail.base_rate }}</span>%</p>
                                <p v-if="productDetail.extra_rate > 0"><span>{{productDetail.base_rate }}%</span>+{{productDetail.extra_rate}}%</p> -->
                                <p>预期年化收益率</p>
                            </li>
                            <li>
                                <p v-if="productDetail.termUnit == 1"><span>{{productDetail.term}}</span>个月</p>
                                <p v-if="productDetail.termUnit == 2"><span>{{productDetail.term}}</span>天</p>
                                <p>期限</p>
                            </li>
                        </ul>
                        <div class="projectInfoLine" style="margin-top:30px;">
                            <span><label>预约人次</label>{{productDetail.totalNum}}</span>
                            <span><label>最低预约金额</label>{{productDetail.minMoney}}</span>
                        </div>
                        <!-- <div class="projectInfoLine">
                            <span class="projectprocessC">
                                <label>投标进度</label>
                                <div class="processline">
                                    <i v-bind:style="{width:productDetail.progress +'%'}"></i>
                                </div>
                                <label class="processtext">{{productDetail.progress}}%</label>
                            </span>
                        </div>
                        <div class="projectInfoLine">
                            <span v-if="productDetail.repay_type == 0"><label>还款方式</label>每月付息，到期还本</span>
                            <span v-if="productDetail.repay_type == 1"><label>还款方式</label>按月等额 </span>
                            <span v-if="productDetail.repay_type == 2"><label>还款方式</label>到期还本付息</span>
                            <span v-if="productDetail.repay_type == 3"><label>还款方式</label>等额本息</span>
                            <span v-if="productDetail.repay_type == 4"><label>还款方式</label>等额本金</span>
                            <span style="width:auto;padding-right:20px;"><label>剩余金额</label>{{productDetail.amount}}元</span>
                        </div> -->
                    </div>
                    <div class="projectInfo_headright"  id="AjaxForm">
                        <!-- <div class="projectmoneyleft">
                            <label>最低预约金额</label>
                            <span>{{productDetail.minMoney}}</span>
                            元
                            <router-link class="fr" v-if="uid != null" to="/account/recharge">充值</router-link>
                        </div> -->
                        <div class="projectmoneyleft">
                            <label>账户余额</label>
                            <span v-if="uid != null">{{accountInfo.useMoney}}</span><i v-if="uid != null">元</i>
                            <i v-if="uid == null"><router-link class="logina" style="margin-top: 5px;position:relative;bottom:0;color: #fb5a5c;" to="/login">登录</router-link>后查看</i>
                            <!-- <span>1000.00</span> -->
                            
                            <router-link class="fr" v-if="uid != null" to="/account/recharge">充值</router-link>
                        </div>
                        <!-- <label class="mymoneyleft">
                            账户余额 
                            <span v-if="uid != null">{{accountInfo.useMoney}}元</span>
                            <span v-if="uid == null"><router-link class="logina" style="margin-top: 5px;" to="/login">登录</router-link>后查看</span>
                            <router-link class="fr" v-if="uid != null" to="/account/recharge">充值</router-link>
                            <label>预计收益 <span>{{expcetedIncom}}元</span></label>
                        </label> -->
                        <input maxlength="8" class="form-submit" type="text" name="money" @keyup="moneyChange" v-model="money" id="money" :placeholder="'最低'+productDetail.minMoney+'元起投'" />
                        <div class="awardSelLine"  v-if="uid != null">
                            <span class="spanredpackage"></span>
                            <label>理财红包</label>
                            <select v-if="redPackageList.length ==0" class="form-submit" name="vocherId" id="vocherId"  v-on:change="redpackageSel" disabled>
                                <option reMoney ="0" minMoney='0' value="">没有可用</option>
                            </select>
                            <select v-if="redPackageList.length !=0" class="form-submit" name="vocherId" id="vocherId"  v-on:change="redpackageSel">
                                <option reMoney ="0" minMoney='0' selected value="">请选择红包</option>
                                <option v-for="(redPackage,index) in redPackageList" :key="index" :minMoney="redPackage.minMoney" :reMoney="redPackage.money" :value="redPackage.id">{{redPackage.source}}：￥{{redPackage.money}}（最小起投金额：￥{{redPackage.minMoney}}）</option>
                            </select>
                        </div>
                        <div class="awardSelLine"  v-if="uid != null">
                            <span class="spanRatecoupon"></span>
                            <label>加息券</label>
                            <select v-if="CouponList.length ==0" class="form-submit" name="useRateId" id="useRateId" v-on:change="couponSel" disabled>
                                <option reMoney="0" minMoney="0" value="">没有可用</option>
                            </select>
                            <select v-if="CouponList.length !=0" class="form-submit" name="useRateId" id="useRateId" v-on:change="couponSel" >
                                <option reMoney="0" minMoney="0" selected value="">请选择加息券</option>
                                <option v-for="(coupon,index) in CouponList" :key="index" v-if="coupon.minMoney" :minMoney="coupon.minMoney" :reMoney="coupon.money" :value="coupon.id">{{coupon.source}}：+{{coupon.money}}%（最小起投金额：￥{{coupon.minMoney}}）</option>
                            </select>
                        </div>
                        <div class="awardunlogin" v-if="uid == null"><router-link style="margin-top: 5px;" to="/login">登录</router-link>查看我的奖券</div>
                        <div class="investActline"><label>预计收益 <span>{{expcetedIncom}}元</span></label>实际投资金额{{actualmoney}}元</div>
                        <router-link v-if="uid == null" class="redBtn buynowBtn" to="/login" style="margin-bottom:46px;">立即登录</router-link>
                        <a v-if="productDetail.reserveStatus == 1 && uid != null" class="redBtn buynowBtn" v-on:click="buynow">立即预约</a>
                        <a v-if="productDetail.reserveStatus == 0 && uid != null" class="redBtn buynowBtn graybtn">立即预约</a>
                        <div class="xieyiline"  v-if="uid != null">
                            <label v-if="productDetail.reserveStatus == 1"><input class="required agreement" type="checkbox" checked />我已阅读并同意<a :href="loanxieyi" target="_blank">《借款及服务协议》</a><a :href="reservexieyi" target="_blank">《预约投资服务协议》</a></label>
                            <label v-if="productDetail.reserveStatus != 1" style="height:46px;display:block;"></label>
                            <input class="moneyinput form-submit" type="hidden" name="id" :value="productId" />
                            <input class="moneyinput form-submit" type="hidden" value="" name="type" />
                            <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                            <input class="moneyinput form-submit" v-model="sid" type="hidden" name="sid" />
                            <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret"/>
                        </div>
                        <a class="redBtn" style="display:none;" id="SubmitBtn"  >确认投资</a>
                    </div>
                </div>
            </div>
            
        </div>
    </div>  
  </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
    export default {
    data () {
        return {
            uid:'',
            productDetail: [],
            accountInfo:[],
            BorrowerInfo:[],
            productrisking:[],
            investment:[],
            investPnum:0,
            repayPlan: [],
            productId: '',
            money:'',
            bankcardlimitList:'',
            PhotoMagnifyC:false,
            loanxieyi:'',
            reservexieyi:'',
            redPackageList:[],
            CouponList:[],
            ret:0,
            sid:'',
            actualmoney:0,
            risk:0
        }
    },
    created() {
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            self.sid = localStorage.SID;
            var idGet = this.getUrl(location.href).id;
            self.productId = idGet;
            if (idGet == undefined || idGet == null || idGet == '') {
                self.$router.push({path:"/product"}) 
            }
            //手动投标接口的ret参数为19
            self.ret = this.ifRegular == 0 ? 19 :190;
            //验证是否登陆
            self.uid = localStorage.uid;
            // 如果登录
            if (localStorage.uid != null && localStorage.uid != '') {
                // 余额查询
                self._ajax(self,'/api/account/index', {}, function (data) {
                    self.accountInfo = data.data;
                });
                //借款及服务协议
                self._ajax(self,'/api/loan/contract', {respType : 'json',contractType : 1}, function (data) {self.loanxieyi=data.data;},'');
                self._ajax(self,'/api/open/reserve', {respType : 'json'}, function (data) {self.reservexieyi=data.data;},'');
                
                //可用红包获取
                self.RewardgetList(1,1);
                self.RewardgetList(2,1);
            }
            //产品详情信息获取
            this._ajax(this,'/api/product/reserve', { id: idGet }, function (data) {
                self.productDetail = data.data;
                self.productDetail.investTime = (self.productDetail.investTime).substr(0,16);
                self.risk = parseInt(data.data.risk);
            });
              
    },  
    computed:{
        expcetedIncom:function(){
            var self = this;
            var income = self.caculate(parseInt(self.money), parseInt(self.productDetail.repay_type), parseFloat(self.productDetail.rate), self.productDetail.term, self.productDetail.termUnit)
            // self.redpackageSel();
            return income == 'NaN' ? 0.00 :income;
        }
    },
    mounted:function(){
        var self = this;
        //提交投资
        this.AjaxSumbit(this,"/", "/api/invest/reserve", function (data) {
            if (typeof data.data == "string") {
                var start = data.data.indexOf('<form id="autoRedirectForm"');
                var end = data.data.indexOf('</body>');
                var form = data.data.substr(start, end - start);
                $(form).appendTo('body').submit();
            }
        },function(data){
            if(data.code == 2){
                layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/orderRecord"});});
            }else if(data.code == 0){
                // 实名后才能使用预约
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();self.$router.push({path:"/account/accountOpen"});});
            }else if(data.code == 14){
                // 余额不足，跳到充值界面
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();self.$router.push({path:"/account/recharge"});});
            }else{
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
            }
        }, true)
    },     
    methods:{
        projectInfoSel:function(event,index){
            $(".awardList_active").removeClass("awardList_active");
            event.target.setAttribute("class","awardList_active");
            $(".projectDetailC").hide();
            $(".projectDetailC").eq(index).show();
        },
        buynow: function () {
            let self = this;
            // console.log(self.risk == 1)
            // risk 风险提示 0未登录1未评测2风险不匹配3风险匹配
            if(self.risk == 0){
                layer.confirm("您还没有登录！",{title: '操作提示',icon: 6, btn: ['去登录','取消']},function(){
                    self.$router.push({path:"/login"});
                    layer.closeAll();
                },function(){
                    layer.closeAll();
                });
            }else if(self.risk == 1){
                layer.confirm("投资前须进行风险测评！",{title: '操作提示',icon: 6, btn: ['去测评','取消']},function(){
                    self.$router.push({path:"/account/riskTest"});
                    layer.closeAll();
                },function(){
                    layer.closeAll();
                });
            }else if(self.risk == 2){
                layer.confirm("该产品超过您当前的风险承受能力。",{title: '操作提示',icon: 6, btn: ['确认购买','取消']},function(){
                    layer.closeAll();
                    self.moneyCheck();
                },function(){
                    layer.closeAll();
                });
            }else{
                self.moneyCheck();
            }
            // self.moneyCheck();
        },
        moneyCheck:function(){
            let self = this;
            if (this.money <= 0) {
                layer.alert("请输入正确的金额!",'',function(){layer.closeAll();});
           // } else if (this.money > parseFloat(this.accountInfo.useMoney)) {
           //     layer.alert("你的余额不足以投资，请先充值!",'',function(){self.$router.push({path:'/account/recharge'});layer.closeAll(); setTimeout(function () { layer.closeAll();self.$router.push({path:'/account/recharge'}); }, 2000) });
            } else if (this.money < parseFloat(this.productDetail.mini_money)  &&  parseFloat(this.productDetail.mini_money) < parseFloat(this.productDetail.amount)) {
                layer.alert("投资金额不能低于最低限制!",'',function(){layer.closeAll();});
           // } else if (this.money > parseFloat(this.productDetail.amount)) {
           //     layer.alert("投资金额不能大于剩余金额!",'',function(){layer.closeAll();});
            } else {
                // self.$router.push({path:"/product/InvestConfirm?id=" + self.productId + "&money=" + self.money});
                self.investConfirm();
            }            
        },
        BanklimitInfo: function () {
            $("#ContactC").show();
        },
        RewardgetList:function(_rewardType,_page){
                var self = this;
                self._ajax(self,'/api/reward/getList', {
                    rewardType: _rewardType,
                    actionType: 2,
                    isUse:1,
                    productId: self.productId,
                    page:_page,
                    productType:2
                }, function (data) {
                    // console.log(data)
                    let getList = data.data.data;
                    let newlist = new Array();
                    if (getList.length > 0) {
                        for (let i = 0; i < getList.length; i++) {
                            getList[i].money = parseFloat(getList[i].money);
                            getList[i].minMoney = parseInt(getList[i].minMoney);
                            newlist[(data.data.current_page - 1) * data.data.per_page +i] = getList[i];
                        }
                    }
                    // console.log(newlist)
                    if(_rewardType == 1){
                        let redPackageList= self.redPackageList;
                        self.$set(redPackageList,Object.assign(redPackageList,newlist))
                    }else if(_rewardType == 2){
                        let CouponList= self.CouponList;
                        self.$set(CouponList,Object.assign(CouponList,newlist))
                    }
                    if(parseInt(data.data.current_page) < parseInt(data.data.last_page)){
                        self.RewardgetList(_rewardType,(parseInt(data.data.current_page)+1))
                    }
                }, function(){});
        },  
        redpackageSel: function () {
                var self = this;
                var reMoney = $("select[name=vocherId]").find("option:selected").attr("reMoney");
                var minMoney = $("select[name=vocherId]").find("option:selected").attr("minMoney");
                var money = $("#money").val().replace(/[^\d]/g, '');
                // if (self.money == '') {
                //     layer.alert("先输入投资金额，再选择红包!",'',function(){layer.closeAll();});
                //     setTimeout(function () {
                //         layer.closeAll();
                //     },2000)
                // } else 
                if (parseFloat(reMoney) >= parseFloat(money) && reMoney != 0) {
                    layer.msg("投资金额必须大于红包金额!");
                } else if (parseFloat(minMoney) > parseFloat(money) && reMoney != 0) {
                    layer.msg("投资金额必须大于红包最小起投金额!");
                } else {
                    var actualmoney = money - parseInt(reMoney);
                    self.actualmoney = actualmoney > 0 ? actualmoney :0;
                    // self.actualmoney = actualmoney;
                }
        },
        couponSel: function () {
                var self = this;
                var reMoney = $("select[name=useRateId]").find("option:selected").attr("reMoney")
                var minMoney = $("select[name=useRateId]").find("option:selected").attr("minMoney")
                if (parseFloat(minMoney) > parseFloat(self.moneyGet)) {
                    layer.alert("投资金额必须大于加息券最小起投金额!",'',function(){window.location.reload();});
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                } else {
                    var extramoney = 0;
                    extramoney = self.caculate(self.moneyGet, parseInt(self.productDetail.repay_type), parseFloat(reMoney), self.productDetail.term, self.productDetail.termUnit);
                    if (reMoney != 0) {
                        self.couponText = reMoney + "%加息券，加息收益" + extramoney + "元";
                    } else {
                        self.couponText =''
                    }
                }
        },
        investConfirm:function(){
            //确认投资的时候，判定是否有可用红包未选，如果有就提示，没有就跳转第三方
            if($("#vocherId").val() == '' && $("#vocherId option").length >1 || $("#useRateId").val() == '' && $("#useRateId option").length >1){
                //有可使用但是未使用的红包或者加息券
                layer.confirm("您有红包或加息券未使用，是否继续投资？",{title: '操作提示',icon: 6},function(){
                    layer.closeAll();
                    $("#SubmitBtn").click();
                },function(){
                    layer.closeAll();
                });
            }else{
                $("#SubmitBtn").click();
            }
        }, 
        caculate:function(total, type, inverstmentRate, inverstmentTerm, unit) {
                //total：投资金额；type：还款方式,inverstmentRate:年利率，inverstmentTerm：投资时间,unit:1天标 2月标  3年标
                var fee = 0;
                var monthRate = inverstmentRate / 12 / 100;
                if (unit == 1) {
                    if (type == 3) { //等额本息   fee = 月还款*期限-借款
                        fee = total * monthRate * Math.pow(1 + monthRate, inverstmentTerm) / (Math.pow(1 + monthRate, inverstmentTerm) - 1) * inverstmentTerm - total;
                    } else if (type == 4) {//等额本金   fee = Total/term * monthRate* (term+1)*term/2
                        fee = total * monthRate * (inverstmentTerm + 1) / 2;
                    } else {
                        fee = total * monthRate * inverstmentTerm;
                    }
                } else if (unit == 2) {
                    fee = total * monthRate * inverstmentTerm * 12 / 365;
                } else if (unit == 3) {
                    fee = total * monthRate * inverstmentTerm * 12;
                }
                return fee.toFixed(2);
        },
        moneyChange:function(){
            var self = this;
            self.money = $("#money").val().replace(/[^\d]/g, '');
            setTimeout(function() {
                self.redpackageSel();
            }, 500);
        },
        getdangerLevel:function(){
            layer.open({
                    type: 2,
                    title: '风险等级说明',
                    shadeClose: true,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    area: ['375px', '667px'],
                    content: 'https://cdn.litongjinfu.com/public/riskassessment.html'
                    });
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .getmoredangerLevel{text-align:right;color:#3a84cf;cursor:pointer;font-size: 12px;margin-left: 10px;}
  .swiper-container {
        width: 100%;
        height: 260px;
        margin: 20px auto;
    }
  .swiper-slide {
        position: relative;
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        height:204px;
    }
  .swiper-slide img{width:100%;height:204px;cursor: pointer;}    
  .swiper-slide .Authenticatedimg{position: absolute;top: 0;left: 0;}
.logoimg{width: 12px;height: 12px;}
</style>
