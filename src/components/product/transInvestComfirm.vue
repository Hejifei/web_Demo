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
                            <tr><td>项目名称</td><td>{{product_detail.title}}</td><td>项目编号</td><td>{{transfer_idGet}}</td></tr>
                            <tr><td>预期年化收益</td><td>{{product_detail.rate}}%</td><td>收益起始日期</td><td>满标后1个工作日</td></tr>
                            <tr>
                                <td>还款方式</td>
                                <td v-if="product_detail.repay_type == 0">每月付息，到期还本</td>
                                <td v-if="product_detail.repay_type == 1">按月等额</td>
                                <td v-if="product_detail.repay_type == 2">到期还本付息</td>
                                <td v-if="product_detail.repay_type == 3">等额本息</td>
                                <td v-if="product_detail.repay_type == 4">等额本金</td>
                                <td>剩余期数</td>
                                <td>{{product_pay.num}}个月</td>
                            </tr>
                            <tr><td>剩余本金</td><td>{{product_pay.capital}}</td><td>剩余利息</td><td>{{product_pay.interest}}</td></tr>
                            <tr><td>剩余本息</td><td>{{product_pay.money}}</td><td></td><td></td></tr>
                        </tbody>
                    </table>
                    <div class="chge"></div>
                    <h3>投资金额</h3>
                    <table>
                        <tbody>
                            <tr><td>用户名</td><td>{{accountInfo.realname}}</td><td>真实姓名</td><td>{{accountInfo.realname}}</td></tr>
                            <tr><td>资金账户金额</td><td>{{accountInfo.useMoney}}</td><td>转让金额</td><td>{{product_detail.transferMoney}}</td></tr>
                        </tbody>
                    </table>
                    <form class="InvestConfirmC" id="AjaxForm" action="" method="POST" target="_blank">
                        <div class="xieyiline">
                            <label><input class="required agreement" type="checkbox" />同意按如下<a id="xieyi" href="" target="_blank">《线上借款及服务协议》</a>的格式和条款生成转让协议</label>
                            <input class="moneyinput form-submit" type="hidden" name="id" :value="transfer_idGet" />
                            <input class="moneyinput form-submit" type="hidden" name="money" :value="product_detail.transferMoney" />
                            <input class="moneyinput form-submit" type="hidden" value="" name="type" />
                            <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                            <input class="moneyinput form-submit" :value="sid" type="hidden" name="sid" />
                            <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret"/>
                        </div>
                        <div class="btnline">
                            <a class="redBtn" id="SubmitBtn">确认投资</a>
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
                product_detail:[],
                product_pay:[],
                accountInfo: [],
                productId: "",
                transfer_idGet: "",
                ret:''
            }
        }, 
        mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");
            var self = this;
            //提交转让购买
            this.$store.state.AjaxSumbit(this,"/", "/api/transfer/buyTranfer", function (data) {
                //$("#respType").val('html')
                //$('#AjaxForm').attr('action', APIURL + '/api/tender/bid').submit();
                if (typeof data.data == "string") {
                    var start = data.data.indexOf('<form id="autoRedirectForm"');
                    var end = data.data.indexOf('</body>');
                    var form = data.data.substr(start, end - start);
                    //var form1 = form.substr(0, 5);
                    //var form2 = form.substr(5, end - start-5);
                    //$(form1 + " target = '_blank' " + form2).appendTo('body').submit();
                    $(form).appendTo('body').submit();
                }
            },'', true)
        },
        created() {
            var self = this;
            self.sid = localStorage.SID;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            //借款及服务协议
            this.$store.state._ajax(this,'/api/open/borrow', { respType: 'json' }, function (data) { $("#xieyi").attr("href", data.data); })
            //手动投标接口的ret参数为14
            if (this.$store.state.ifRegular == 0) {
                self.ret = 15;
            } else {
                self.ret = 150;
            }
            var idGet = this.$store.state.getUrl(location.href).id;
            self.transfer_idGet = this.$store.state.getUrl(location.href).transfer_id;
            self.productId = idGet;

            this.$store.state.checklogin(this);

            //转让标的详情信息获取
            this.$store.state._ajax(this,'/api/product/transferDetail', { id: self.transfer_idGet }, function (data) {
                var productdetail = data.data;
                productdetail.detail.transferTime = productdetail.detail.transferTime.substr(0, 9)
                productdetail.detail.repay_time = productdetail.detail.repay_time.substr(0, 9)
                productdetail.detail.description = productdetail.detail.description.split('；');
                self.productDetail = productdetail;
                self.product_detail = productdetail.detail;
                self.product_pay = productdetail.pay;
            }, '');
            //如果已登陆获取账户信息
            this.$store.state._ajax(this,'/api/account/index', {}, function (data) {
                self.accountInfo = data.data;
            }, '');
        },
        computed:{
        },
        methods: {
        },
        components:{
  	    } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
