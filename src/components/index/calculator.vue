<template>
    <div class="graybg">
        <div class="wp clearfix">
            <div class="calculatorC">
                <h3>投资计算器</h3>
                <div class="chge"></div>
                <div class="calculatorBody">
                    <div class="ccltLeft">
                        <div class="ccltinputC form-group">
                            <label>投资金额</label>
                            <input v-model="money" class="form-submit required" onkeyup="this.value=this.value.replace(/\D/g,'')" max="8"/>
                            <label>元</label>
                            <span class="tip"></span>
                        </div>
                        <div class="ccltinputC form-group">
                            <label>年化利率</label>
                            <input v-model="rate" class="form-submit required"/>
                            <label>%</label>
                            <span class="tip"></span>
                        </div>
                        <div class="ccltinputC form-group">
                            <label>投资时长</label>
                            <!-- termUnit -->
                            <input v-show="termUnit ==2" v-model="term" class="form-submit halfinput required" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
                            <select v-show="termUnit ==1" v-model="term" class="form-submit halfinput required">
                                <option value="">请选择</option>
                                <option value="1">1个</option>
                                <option value="2">2个</option>
                                <option value="3">3个</option>
                                <option value="6">6个</option>
                                <option value="12">12个</option>
                                <option value="18">18个</option>
                            </select>
                            <select v-model="termUnit" class="form-submit halfsel">
                                <option value="1">月</option>
                                <option value="2">天</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="ccltinputC form-group">
                            <label>还款方式</label>
                            <select v-model="repay_type" class="form-submit required">
                                <option value="">请选择还款方式</option>
                                <option v-if="termUnit ==1" value="0">每月付息，到期还本</option>
                                <option v-if="termUnit ==1" value="1">按月等额</option>
                                <option value="2">到期还本付息</option>
                                <option v-if="termUnit ==1" value="3">等额本息</option>
                                <option v-if="termUnit ==1" value="4">等额本金</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="ccltBtnC">
                            <a class="redBtn" @click="requirecheck">计算</a>
                            <a class="graybtn" @click="reset">重置</a>
                        </div>
                    </div>
                    <div class="ccltRight">
                        <h3>计算结果</h3>
                        <table>
                            <thead>
                                <tr><th class="width50">预计本期收益</th><th>利息</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="redtd">{{income}}元</td><td class="redtd">{{interest}}元</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="calculatorC">
                <h3>还款详细计划<span>（收益仅供参考，实际收益以最终投资结果为准！）</span></h3>
                <div class="calculatorBody">
                    <table>
                        <thead>
                            <tr><th>期次</th><th>计划收款日</th><th>应收本金（元）</th><th>应收收益（元）</th><th>应收总额（元）</th></tr>
                        </thead>
                        <tbody v-if="repayList.length > 0">
                            <tr v-for="(repay,index) in repayList" :key="index">
                                <td>{{repay.period}}</td>
                                <td>{{repay.repay_time}}</td>
                                <td class="redtd">{{repay.self_money}}</td>
                                <td class="redtd">{{repay.month_repay_money}}</td>
                                <td class="redtd">{{repay.repay_money}}</td>
                            </tr>
                        </tbody>
                    </table>
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
                money:'',
                rate:'',
                term:'',
                repay_type:'',
                termUnit:'1',
                income:0,
                interest:0,
                repayList:[]
            }
        },
        mounted:function(){
            $(".calculatorBody").find(".required").blur(function () {
                var Tip = $(this).parents(".form-group").find(".tip");
                if ($(this).val() == "") {
                    Tip.text("不能为空！");
                } else {
                    Tip.text("");
                }
            })
        },
        created() {   
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        computed:{
            
        },
        methods: {
            requirecheck:function(){
                var self = this;
                var flag = true;
                $(".calculatorBody").find("input").blur();
                $(".calculatorBody").find("select").blur();
                $(".calculatorBody").find(".tip").each(function () {
                    if ($(this).text() != "" && !$(this).is(":hidden")) {
                        flag = false;
                    }
                })
                if(flag){
                    self.caculate();
                }
            },
            caculate:function() {
                // repay_type 还款方式 
                //0 每月付息，到期还本  1 按月等额  2到期还本付息3等额本息  4等额本金
                //total：投资金额；type：还款方式,inverstmentRate:年利率，inverstmentTerm：投资时间,unit:1月标 2天标  3年标
                var self = this;
                var total = parseFloat(self.money);
                var type = self.repay_type;
                var inverstmentRate = self.rate;
                var inverstmentTerm = parseFloat(self.term);
                var unit = self.termUnit;
                var fee = 0;//收益
                var monthRate = parseFloat(inverstmentRate / 12 / 100);
                var repaylist = [];//还款详细计划
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
                self.income = (parseFloat(total) + parseFloat(fee)).toFixed(2);
                self.interest = fee.toFixed(2);
                self.$store.state._ajax(self,'/api/statistics/tool', {
                    bidMoney:total,
                    rate:inverstmentRate,
                    term:inverstmentTerm,
                    termUnit:unit,
                    repayType:type
                }, function (data) {
                    self.repayList = data.data;
                });
                
            },
            reset:function(){
                this.money = '';
                this.rate = '';
                this.term = '';
                this.repay_type = '';
                this.income = 0;
                this.interest = 0;
            }
        },
        components:{
  	    } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .calculatorC {background-color: #fff;margin:20px 0 10px 0;border-radius: 3px;}
    .calculatorC h3{
        font-size: 16px;
        line-height: 46px;
        height: 46px;
        padding-left: 25px;
        font-weight: normal;
    }
    .calculatorC h3 span{font-size: 14px;color: #999;}
    .calculatorBody{padding:0 25px 20px 25px;font-size: 0;}
    .ccltLeft{width:550px;display: inline-block;vertical-align: top;padding: 35px 0;}
    .ccltLeft .ccltinputC{width: 50%;display: inline-block;vertical-align: top;margin-bottom: 30px;}
    .ccltinputC label{vertical-align: top;color: #555;font-size: 14px;line-height: 30px;display: inline-block;}
    .ccltinputC input{vertical-align: top;margin:0 5px 0 15px;width: 154px;height: 30px;line-height: 30px;border-radius: 2px;padding: 2px 4px;border: 1px solid #e6e6e6;}
    .ccltinputC select{vertical-align: top;margin:0 5px 0 15px;width: 154px;height: 30px;line-height: 30px;border-radius: 2px;padding: 2px 4px;border: 1px solid #e6e6e6;}
    .ccltinputC .halfinput{width:77px;margin-right: 0;border-right: 0;border-top-right-radius: 0;border-bottom-right-radius: 0;}
    .ccltinputC .halfsel{width:77px;margin-left: 0;border-top-left-radius: 0;border-bottom-left-radius: 0;}
    .ccltinputC .tip{top:30px;padding-left: 0;left: 70px;}
    .ccltLeft .ccltBtnC{padding: 10px 0;text-align: center;}
    .ccltLeft .ccltBtnC a{font-size: 14px;line-height: 30px;padding: 0 50px;display: inline-block;border-radius: 3px;}
    .ccltLeft .ccltBtnC a:nth-child(1){margin-right: 60px;}
    .ccltRight{width:400px;display: inline-block;vertical-align: top;}
    .ccltRight h3{text-align: center;}
    
</style>
