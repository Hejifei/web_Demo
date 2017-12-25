<template>
    <div class="overview">
        <div id="zdtbC" style="background:#f0f0f0;">
            <div class="mainwp-tab">
                <div class="ordertable cardform" id="AjaxForm" >
                    <div class="ytbBody">
                        <h1 style="text-align:left;position:relative;">
                            私人定制
                        </h1>
                        <img class="hrimg" src="../../common/stylus/img/uplan_xian.png" />
                        <div class="ytbSelC">
                            <div class="ytbSelline clearfix">
                                <div class="ytbfistLine">
                                    <span class="lightgrayspan">当前可用金额</span>
                                    <span class="ytbmoneyspan">{{money}}</span>
                                    <span class="lightgrayspan">元</span>
                                    <router-link to="/account/recharge">充值</router-link>
                                    <span class="tip"></span>
                                </div>
                            </div>
                            <div class="ytbSelline clearfix">
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">可支配资金</span>
                                    <select class="form-submit" id="Fund" name="Fund" v-on:change="FundChange">
                                        <option value="0~50" minFund="0" maxFund="50">50万以下</option>
                                        <option value="50~60" minFund="50" maxFund="60">50~60万</option>
                                        <option value="60~70" minFund="60" maxFund="70" selected>60~70万</option>
                                        <option value="70~80" minFund="70" maxFund="80">70~80万</option>
                                        <option value="80~90" minFund="80" maxFund="90">80~90万</option>
                                        <option value="90~100" minFund="90" maxFund="100">90~100万</option>
                                        <option value="100~9999" minFund="100" maxFund="9999">100万以上</option>
                                    </select>
                                    <span class="tip"></span>
                                    <input type="hidden" class="form-submit" id="minFund" name="minFund" v-model="minFund" />
                                    <input type="hidden" class="form-submit" id="maxFund" name="maxFund" v-model="maxFund"/>
                                </div>
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">标的期限</span>
                                    <select class="form-submit required" id="Term" name="Term" v-on:change="TermChange">
                                        <option value="0~1" minTerm="0" maxTerm="1">1个月及以下</option>
                                        <option value="1~3" minTerm="1" maxTerm="3">1~3个月</option>
                                        <option value="3~6" minTerm="3" maxTerm="6" selected>3~6个月</option>
                                        <option value="6~12" minTerm="6" maxTerm="12">6~12个月</option>
                                        <option value="12~999" minTerm="12" maxTerm="999">12个月及以上</option>
                                    </select>
                                    <span class="tip"></span>
                                    <input type="hidden" class="form-submit" id="minTerm" name="minTerm" v-model="minTerm" />
                                    <input type="hidden" class="form-submit" id="maxTerm" name="maxTerm" v-model="maxTerm"/>
                                </div>
                            </div>
                            <div class="ytbSelline clearfix">
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">期望收益</span>
                                    <select class="form-submit" id="rate" name="rate">
                                        <option value="6">6%</option>
                                        <option value="7">7%</option>
                                        <option value="8" selected>8%</option>
                                        <option value="9">9%</option>
                                        <option value="10">10%</option>
                                        <option value="11">11%</option>
                                        <option value="12">12%</option>
                                        <option value="13">13%以上</option>
                                    </select>
                                    <span class="tip"></span>
                                </div>
                            </div>
                        </div>
                        <div class="ytbBtnLine">
                            <p>
                                <span class="logbox" >
                                    <a class="btn confirmBtn redBtn" id="SubmitBtn">确认</a>
                                </span>
                                <!-- <span class="logbox" v-show="status == 0">
                                    <a v-on:click="unautobidPlan" class="btn confirmBtn graybg">确认</a>
                                </span> -->
                            </p>
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
                minFund:60,
                maxFund:70,
                minTerm:3,
                maxTerm:6,
                money:0
            }
        },
        created() {var self = this;
            //是否实名认证获取，若未实名就跳转到开户界面
            // self.$store.state._ajax(self,'/api/user/userInfo', {}, function (data) {
            //     if (data.data.status == 0 ) {
            //         //未实名认证
            //         layer.alert('请先进行实名认证!',{title: '操作提示',icon: 5},function(){self.$router.push({path:"/account/accountOpen"});layer.closeAll(); });
            //         setTimeout(function () { self.$router.push({path:"/account/accountOpen"});layer.closeAll();}, 3000);
            //     }
            // }, '');
            self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
                self.money = data.data.useMoney;
            }, '');
        },  
        mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");

            this.$store.state.AjaxSumbit(this,"/", "/api/invest/customized", function (data) {
                layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();});
            },function (data) {
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
            })
        },     
        methods:{
            FundChange: function () {
                var self = this;
                this.minFund = $("select[name=Fund]").find("option:selected").attr("minFund");
                this.maxFund = $("select[name=Fund]").find("option:selected").attr("maxFund");
            },
            TermChange:function (){
                var self = this;
                this.minTerm = $("select[name=Term]").find("option:selected").attr("minTerm");
                this.maxTerm = $("select[name=Term]").find("option:selected").attr("maxTerm");
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mainwp-tab {
        margin: 0px auto;
        padding: 0;
        overflow: hidden;
        background: #fff;
    }
    /* Example 1 custom styles */
    #ex1Slider .slider-selection {
        background: #BABABA;
    }
    /* Example 3 custom styles */
    #RGB {
        height: 20px;
        background: rgb(128, 128, 128);
    }
    #RC .slider-selection {background: #FF8282;}
    #RC .slider-handle {background: red;}
    #GC .slider-selection {background: #428041;}
    #GC .slider-handle {background: green;}
    #BC .slider-selection {background: #8283FF;}
    #BC .slider-handle {border-bottom-color: blue;}
    .slider-handle.round{border-radius:0;}
    .round{display: inline-block;width: 12px;height: 24px;}
    .round:before {content:"";width: 12px;height: 12px;display:inline-block;background-color: #eb494b;position: absolute;top: 2px;left: 0;border-top-left-radius:4px;border-top-right-radius:4px;}
    .round:after{width:0;height:0;border-width:6px 6px 0 6px;border-color:#eb494b transparent;border-style:solid;position:absolute;bottom:4px;left:0;content:"";}
    .slider-handle{background:none;border:none;}
    .slider .slider-handle:nth-child(2){margin-left: -13px !important;}
    .slider-selection{background-color:#eb494b;}
    #R, #G, #B {width: 300px;}
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
    input[type="number"]{-moz-appearance:textfield;}
    .ytbSelline .form-group:nth-child(1) .tip{left: 100px;}
    .ytbSelline .form-group:nth-child(2) .tip{left: 130px;}
</style>
