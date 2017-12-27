<template>
  <div class="hello">
        <div class="index_centerC" v-cloak>
    <div class="index_center projectListC">
        <div class="projectDetailBody investmentConfirmC">
            <div class="graph investmentConfirmTitle">确认投资</div>
            <div class="chge"></div>
            <div class="projectInfoListC">
                <div class="projectDetailC">
                    <h3>投资信息</h3>
                    <table>
                        <tbody>
                            <tr><td>项目名称</td><td>{{productDetail.title}}</td><td>项目编号</td><td>{{productId}}</td></tr>
                            <tr><td>预期年化收益</td><td>{{productDetail.rate}}%</td><td>收益起始日期</td><td>{{productDetail.repayDate}}</td></tr>
                            <tr>
                                <td>还款方式</td>
                                <td v-if="productDetail.repay_type == 0">每月付息，到期还本</td>
                                <td v-if="productDetail.repay_type == 1">按月等额</td>
                                <td v-if="productDetail.repay_type == 2">到期还本付息</td>
                                <td v-if="productDetail.repay_type == 3">等额本息</td>
                                <td v-if="productDetail.repay_type == 4">等额本金</td>
                                <td>期数</td>
                                <td v-if="productDetail.termUnit  == 1">{{productDetail.term}}个月</td>
                                <td v-if="productDetail.termUnit  == 2">{{productDetail.term}}天</td>
                            </tr>
                            <tr><td>可获得收益</td><td id="shouyiMoney">{{shouyiMoney}}</td>
                                <td>优惠政策</td>
                                <td>
                                    <span v-if="productDetail.is_reward == 1">红包可用</span>
                                    <span v-if="productDetail.is_reward == 0">红包不可用</span>；
                                    <span v-if="productDetail.is_extraRate == 1">加息券可用</span>
                                    <span v-if="productDetail.is_extraRate == 0">加息券不可用</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="chge"></div>
                    <h3>投资金额</h3>
                    <table>
                        <tbody>
                            <tr><td>用户名</td><td>{{accountInfo.realname}}</td><td>真实姓名</td><td>{{accountInfo.realname}}</td></tr>
                            <tr><td>资金账户金额</td><td>{{accountInfo.useMoney}}</td><td>实投金额</td><td id="actualmoney">{{moneyGet}}</td></tr>
                            <tr><td>投资总额</td><td>{{moneyGet}}</td><td></td><td></td></tr>
                        </tbody>
                    </table>
                    <form class="InvestConfirmC" id="AjaxForm"  action="" method="POST" target="_blank">
                        <div class="Redpackageline clearfix">
                            <span class="spanredpackage"></span>
                            <label>理财红包</label>
                            <select v-if="redPackageList.length ==0" class="form-submit" name="vocherId" id="vocherId"  v-on:change="redpackageSel">
                                <option reMoney ="0" value="">暂无理财红包！</option>
                            </select>
                            <select v-if="redPackageList.length !=0" class="form-submit" name="vocherId" id="vocherId"  v-on:change="redpackageSel">
                                <option reMoney ="0" selected value="">请选择红包</option>
                                <!-- <option v-for="redPackage in redPackageList" v-if="redPackage.minMoney <= moneyGet" :minMoney="redPackage.minMoney" :reMoney="redPackage.money" :value="redPackage.id">{{redPackage.source}}红包：￥{{redPackage.money}}（最小起投金额：￥{{redPackage.minMoney}}）</option> -->
                                <option v-for="(redPackage,index) in redPackageList" :key="index" :minMoney="redPackage.minMoney" :reMoney="redPackage.money" :value="redPackage.id">{{redPackage.source}}红包：￥{{redPackage.money}}（最小起投金额：￥{{redPackage.minMoney}}）</option>
                            </select>
                            <span class="spanRatecoupon" name=""></span>
                            <label>加息券</label>
                            <select v-if="CouponList.length ==0" class="form-submit" name="useRateId" id="useRateId" v-on:change="couponSel">
                                <option reMoney="0" value="">暂无加息券！</option>
                            </select>
                            <select v-if="CouponList.length !=0" class="form-submit" name="useRateId" id="useRateId" v-on:change="couponSel" style="margin-right:20px;">
                                <option reMoney="0" selected value="">请选择加息券</option>
                                <option v-for="(coupon,index) in CouponList" :key="index" v-if="coupon.minMoney" :minMoney="coupon.minMoney" :reMoney="coupon.money" :value="coupon.id">{{coupon.source}}加息券：+{{coupon.money}}%（最小起投金额：￥{{coupon.minMoney}}）</option>
                            </select>
                            <i style="color:#eb494b;font-size:12px;">{{couponText}}</i>
                        </div>
                        <div class="xieyiline">
                            <label><input class="required agreement" type="checkbox"/>同意按如下<a id="xieyi" :href="loanxieyi" target="_blank">《借款及服务协议》</a>的格式和条款生成借款协议</label>
                            <input class="moneyinput form-submit" type="hidden" name="proId" :value="productId" />
                            <input class="moneyinput form-submit" type="hidden" name="money" :value="moneyGet" />
                            <input class="moneyinput form-submit" type="hidden" value="" name="type" />
                            <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                            <input class="moneyinput form-submit" :value="sid" type="hidden" name="sid" />
                            <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret"/>
                        </div>
                        <div class="btnline">
                            <a class="redBtn"  @click="investConfirm">确认投资</a>
                            <a class="redBtn" style="display:none;" id="SubmitBtn"  >确认投资</a>
                        </div>
                    </form>
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
                sid: '',
                productDetail: [],
                accountInfo: [],
                productId: "",
                moneyGet: "",
                redPackageList:[],
                CouponList: [],
                rate: '',
                couponText:'',
                shouyiMoney:0,
                ret:'',
                loanxieyi:''
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");
            var self = this;
            //提交投资
            this.$store.state.AjaxSumbit(this,"/", "/api/tender/bid", function (data) {
                if (typeof data.data == "string") {
                    var start = data.data.indexOf('<form id="autoRedirectForm"');
                    var end = data.data.indexOf('</body>');
                    var form = data.data.substr(start, end - start);
                    $(form).appendTo('body').submit();
                }
            },'', true)
        },
        created() {
            var self = this;
            self.sid = localStorage.SID;
            //借款及服务协议
            self.$store.state._ajax(self,'/api/loan/contract', {respType : 'json',contractType : 1}, function (data) {self.loanxieyi=data.data;},'');
            // this.$store.state._ajax(this,'/api/open/borrow', { respType: 'json' }, function (data) { $("#xieyi").attr("href", data.data); })
            //手动投标接口的ret参数为14
            if (this.$store.state.ifRegular == 0) {
                self.ret = 14;
            } else {
                self.ret = 140;
            }
            var idGet = this.$store.state.getUrl(location.href).id;
            self.moneyGet = this.$store.state.getUrl(location.href).money;
            self.productId = idGet;
            //如果id或者投资金额为空，跳转到散标列表界面
            if (self.moneyGet == undefined || self.productId == undefined) {
                self.$router.push({path:'/product'});
            }

            //产品详情信息获取
            this.$store.state._ajax(this,'/api/product/detail', { id: idGet }, function (data) {
                //console.log(data.data)
                var productdetail=data.data;
                productdetail.investTime = productdetail.investTime.substr(0, 9)
                self.productDetail = productdetail;
                self.rate = productdetail.rate;
                self.shouyiMoney =self.caculate(self.moneyGet, parseInt(self.productDetail.repay_type), parseFloat(self.productDetail.rate), self.productDetail.term, self.productDetail.termUnit);
                
            }, '');
            //如果已登陆获取账户信息
            this.$store.state._ajax(this,'/api/account/index', {}, function (data) {
                self.accountInfo = data.data;
            }, '');
            //可用红包获取
            this.RewardgetList(1,1);
            this.RewardgetList(2,1);
        },
        computed:{
            
            
        },
        methods: {
            RewardgetList:function(_rewardType,_page){
                var self = this;
                self.$store.state._ajax(self,'/api/reward/getList', {
                    rewardType: _rewardType,
                    actionType: 2,
                    isUse:1,
                    productId: self.productId,
                    page:_page
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
            redpackageSel: function () {
                var self = this;
                var reMoney = $("select[name=vocherId]").find("option:selected").attr("reMoney")
                var minMoney = $("select[name=vocherId]").find("option:selected").attr("minMoney")
                if (parseFloat(reMoney) >= parseFloat(self.moneyGet)) {
                    layer.alert("投资金额必须大于红包金额!",'',function(){window.location.reload();});
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                } else if (parseFloat(minMoney) > parseFloat(self.moneyGet)) {
                    layer.alert("投资金额必须大于红包最小起投金额!",'',function(){window.location.reload();});
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000)
                } else {
                    var actualmoney = self.moneyGet - parseInt(reMoney);
                    $("#actualmoney").text(actualmoney)
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
            }
        },
        components:{
  	    } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
