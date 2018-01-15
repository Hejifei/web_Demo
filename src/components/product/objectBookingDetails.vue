<template>
    <div class="overview">
        <div id="zdtbC" style="background:#f0f0f0;">
            <!-- @*预约标的*@ -->
            <div class="mainwp-tab">
                <div class="ordertable cardform" id="AjaxForm" >
                    <div class="ytbBody">
                        <h1 style="text-align:left;position:relative;">
                            自动投标
                            <div id="div1" :class="switch1Class" @click="on_offswitch">
                                <div id="div2" :class="switch2Class"></div>
                                <span class="automaticSpan">{{automaticBtnText}}</span>
                            </div>
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
                                    <span class="blodspan">最大投资金额</span>
                                    <input type="text" class="form-submit required" id="maxMoney" name="maxMoney" placeholder="100元起"  onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="maxMoney"  />
                                    <span class="blodspan">元</span>
                                    <span class="tip"></span>
                                </div>
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">账户保留金额</span>
                                    <input type="number" class="form-submit required" id="reserveMoney" name="reserveMoney"  onkeyup="this.value=this.value.replace(/\D/g,'')"  v-model="reserveMoney"  />
                                    <span class="blodspan">元</span>
                                    <span class="tip"></span>
                                    <input class="form-submit" type="hidden" name="type" />
                                    <input class="form-submit" value="json" type="hidden" name="respType" id="respType" />
                                    <input class="form-submit" type="hidden" name="ret" v-model="ret"/>
                                </div>
                            </div>
                            <!-- @*<div class="ytbSelline clearfix">
                                <span class="blodspan">产品期限（月）</span>
                                <div class="timeline visible">
                                    <div class="timelineMain" draggable="false">
                                        <input id="ex16b" style="width:625px;" type="text" /><br />
                                        <div draggable="false" class="timeNumber" style="left: -3px;">0</div>
                                        <div draggable="false" class="timeNumber" style="left: 23px;">1</div>
                                        <div draggable="false" class="timeNumber" style="left: 49px;">2</div>
                                        <div draggable="false" class="timeNumber" style="left: 75px;">3</div>
                                        <div draggable="false" class="timeNumber" style="left: 101px;">4</div>
                                        <div draggable="false" class="timeNumber" style="left: 127px;">5</div>
                                        <div draggable="false" class="timeNumber" style="left: 153px;">6</div>
                                        <div draggable="false" class="timeNumber" style="left: 179px;">7</div>
                                        <div draggable="false" class="timeNumber" style="left: 205px;">8</div>
                                        <div draggable="false" class="timeNumber" style="left: 231px;">9</div>
                                        <div draggable="false" class="timeNumber" style="left: 253px;">10</div>
                                        <div draggable="false" class="timeNumber" style="left: 279px;">11</div>
                                        <div draggable="false" class="timeNumber" style="left: 305px;">12</div>
                                        <div draggable="false" class="timeNumber" style="left: 331px;">13</div>
                                        <div draggable="false" class="timeNumber" style="left: 357px;">14</div>
                                        <div draggable="false" class="timeNumber" style="left: 383px;">15</div>
                                        <div draggable="false" class="timeNumber" style="left: 409px;">16</div>
                                        <div draggable="false" class="timeNumber" style="left: 435px;">17</div>
                                        <div draggable="false" class="timeNumber" style="left: 461px;">18</div>
                                        <div draggable="false" class="timeNumber" style="left: 487px;">19</div>
                                        <div draggable="false" class="timeNumber" style="left: 513px;">20</div>
                                        <div draggable="false" class="timeNumber" style="left: 539px;">21</div>
                                        <div draggable="false" class="timeNumber" style="left: 565px;">22</div>
                                        <div draggable="false" class="timeNumber" style="left: 591px;">23</div>
                                        <div draggable="false" class="timeNumber" style="left: 617px;">24</div>
                                    </div>
                                </div>
                            </div>*@ -->
                            <div class="ytbSelline clearfix">
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">产品期限</span>
                                    <select class="form-submit" id="Termrate" name="Termrate" v-on:change="Termratechange" v-model="Termrate">
                                        <option value="0~1" minTerm="0" maxTerm="1">1个月及以下</option>
                                        <option value="1~3" minTerm="1" maxTerm="3">1~3个月</option>
                                        <option value="3~6" minTerm="3" maxTerm="6">3~6个月</option>
                                        <option value="6~12" minTerm="6" maxTerm="12">6~12个月</option>
                                        <option value="12~999" minTerm="12" maxTerm="999">12个月及以上</option>
                                    </select>
                                    <span class="tip"></span>
                                    <input type="hidden" class="form-submit" id="minTerm" name="minTerm" v-model="minTerm" />
                                    <input type="hidden" class="form-submit" id="maxTerm" name="maxTerm" v-model="maxTerm"/>
                                </div>
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">投标状态</span>
                                    <select class="form-submit required" id="repeat" name="repeat" v-model="repeat">
                                        <option value="1">重复投资</option>
                                        <option value="2">只投一次</option>
                                    </select>
                                    <span class="tip"></span>
                                </div>
                            </div>
                            <div class="ytbSelline clearfix">
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">是否使用红包</span>
                                    <select class="form-submit" id="useReward" name="useReward" v-model="useReward">
                                        <option value="0">不使用</option>
                                        <option value="1">使用</option>
                                    </select>
                                    <span class="tip"></span>
                                </div>
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">是否使用加息券</span>
                                    <select class="form-submit" id="useExtraRate" name="useExtraRate" v-model="useExtraRate">
                                        <option value="0">不使用</option>
                                        <option value="1">使用</option>
                                    </select>
                                    <span class="tip"></span>
                                </div>
                            </div>
                            <div class="ytbSelline clearfix">
                                <div class="ytbfistLine form-group">
                                    <span class="blodspan">年化收益</span>
                                    <!-- @*<label class="redspan specialLab">6.80%</label>起*@ -->
                                    <span class="ytbSYbtn" @click="ytbsylChange('minus')">-</span>
                                    <input placeholder="5.50" maxlength="4" class="ytbsylinp form-submit" readonly id="minRate" v-model="minRate" name="minRate" onkeyup="this.value = this.value.replace(/\D/g,'')" />
                                    <label class="ytb_sylIntro">%起</label>
                                    <span class="ytbSYbtn" @click="ytbsylChange('plus')">+</span>
                                    <span class="tip"></span>
                                </div>
                                <div class="ytbfistLine">
                                    <span  class="blodspan">您前面还有<label class="orderNum">{{userSortRank}}</label>个人</span>
                                </div>
                                <!-- @*<div class="ytbfistLine">
                                    <i class="icon-info-sign redspan"></i>
                                    当前参考率：<span class="redspan">6.80%</span>，此利率下平均等待交易时间<span class="redspan">10</span>天
                                </div>*@ -->
                            </div>
                        </div>
                        <div class="ytbxieyiC">
                            <label><input type="checkbox" checked class="form-submit agreement"/> 我已阅读并同意 <a :href="autobid" target="_black">《自动投标须知》</a></label>
                            <!-- <i>注：自动投标默认的项目为普通散标</i> -->
                        </div>
                        <div class="ytbBtnLine">
                            <p>
                                <span class="logbox" v-show="status == 1" >
                                    <a class="btn confirmBtn redBtn" id="SubmitBtn">确认</a>
                                </span>
                                <span class="logbox" v-show="status == 0">
                                    <a v-on:click="unautobidPlan" class="btn confirmBtn graybg">确认</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    
    <!-- @*投标流程*@ -->
    <!-- <div class="mainwp-tab" style="background:#f0f0f0;padding:0 0 20px ;">
        <div class="ytbBody">
            <h1 style="text-align:left;">
                投标流程
            </h1>
            <img class="hrimg" src="../../common/stylus/img/uplan_xian.png" />
            <div class="ytbProcessC clearfix">
                <div class="ytbProcessli">
                    <img src="../../common/stylus/img/order_succeed_icon.png" />
                    <span class="icon-chevron-right"></span>
                    <label>预约成功</label>
                </div>
                <div class="ytbProcessli">
                    <img src="../../common/stylus/img/order_wait_icon.png" />
                    <span class="icon-chevron-right"></span>
                    <label>预约等待中</label>
                </div>
                <div class="ytbProcessli">
                    <img src="../../common/stylus/img/order_buy_icon.png" />
                    <label>自动购买成功</label>
                </div>
            </div>
        </div>
    </div> -->
    <!-- @*预约介绍、加入记录、常见问题*@
        @*<div class="mainwp-tab" style="background:#f0f0f0;padding:0 0 20px ;">
        <div class="ytbBody" style="padding:0 0 20px;">
            <ul class="ytbDetailMenu clearfix">
                <li class="activeytbli">预约介绍</li>
                <li>加入记录</li>
                <li>常见问题</li>
            </ul>
            <ul class="ytbDetailInfoList">
                <li style="display:block;">
                    <table class="ytbIntroTable">
                        <tbody>
                            <tr>
                                <td>计划介绍</td>
                                <td>预约投标是利通金服为您提供的本金自动循环出借及到期自动转让退出的投标工具，并由系统为您实现分散投标，更好的满足您多样化的投资需求。该计划所对应的借款均100%适用于人人贷用户利益保障机制。您出借所获得的利息收益可选择收益再投资（到期一次性领取本金和收益）或每月领取收益（到期领取本金），不同的收益处理方式对应的预期年化利率不同，具体以您在加入时页面展示的相应预期年化利率为准。预期收益不等于实际收益，出借人需自行承担资金出借的风险与责任；市场有风险，投资需谨慎。</td>
                            </tr>
                            <tr>
                                <td>投标范围</td>
                                <td>机构担保标、实地认证标</td>
                            </tr>
                            <tr>
                                <td>
                                    利息收益处理方式及<br />
                                    预期年化利率
                                </td>
                                <td>
                                    1.收益再投资 8.80%<br />
                                    2.提取至账户 8.47%<br />
                                    *一经选择，无法修改。
                                </td>
                            </tr>
                            <tr>
                                <td>锁定期</td>
                                <td>1个月</td>
                            </tr>
                            <tr>
                                <td>退出日期</td>
                                <td>2017年08月15日</td>
                            </tr>
                            <tr>
                                <td>加入条件</td>
                                <td>加入金额1,000元起，且为1,000元的整数倍递增。</td>
                            </tr>
                            <tr>
                                <td>加入上限</td>
                                <td>2,000,000元</td>
                            </tr>
                            <tr>
                                <td>开始加入时间</td>
                                <td>2017年07月19日 10:00</td>
                            </tr>
                            <tr>
                                <td>到期退出方式</td>
                                <td>系统将通过债权转让自动完成退出，您所持债权转让完成的具体时间，视债权转让市场交易情况而定。</td>
                            </tr>
                            <tr>
                                <td>提前退出方式</td>
                                <td>锁定期内支持提前退出，详情参见<a>《U计划服务协议》</a>。</td>
                            </tr>
                            <tr>
                                <td>费用</td>
                                <td>
                                    加入费用：<span>0.0%</span><br />
                                    管理费用：参见<a>《预投标的服务协议》</a><br />
                                    退出费用：<span>0.0%</span><br />
                                    提前退出费用：加入金额 x <span>2.0%</span>，详情参见<a>《预投标的服务协议》</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>保障方式</td>
                                    <td>100%用户利益保障机制</td>
                                </tr>
                                <tr>
                                    <td>服务协议</td>
                                    <td><a>【点击查看】</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                <li >
                        <div class="ytbRecordInfodiv">
                            <span>
                                加入总人次
                                <label>50</label>
                                人
                            </span>
                            <span>
                                加入金额
                                <label>500</label>
                                元
                            </span>
                        </div>
                        <table class="ytbInsertRecord">
                            <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>投资人</td>
                                    <td>加入金额</td>
                                    <td>来源</td>
                                    <td>加入时间</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>何继飞</td>
                                    <td>50</td>
                                    <td><span>电脑</span></td>
                                    <td>20170906</td>
                                </tr>

                            </tbody>
                        </table>
                    </li>
                <li>
                        <ul class="ytb_question_ul" style="display:block;">
                            <li>
                                1. 预投标的安全吗？
                                <p>利通金服以严谨负责的态度对每笔借款进行严格筛选。同时，U计划所对应借款100%适用用户利益保障机制。</p>
                            </li>
                            <li>
                                2. 预投标的发布时间？
                                <p>自2016年11月25日起，工作日、周末、节假日预投标的系列发布时间统一为每日上午10:00，其他时间会根据用户投资情况随机发布U计划，请随时关注官网及APP灵活安排您的投资时间。</p>
                            </li>
                            <li>
                                3. 预投标的预期利率有多少？
                                <p>预投标的主要有5种， 预投标计划A锁定期3个月，预投标计划B锁定期6个月，预投标计划C类别有3种不同长度锁定期，不同锁定期长度的U计划预期年化利率不同，具体以当期U计划公布的预期年化利率为准。</p>
                            </li>
                            <li>
                                4. 预投标的收益处理方式是什么？
                                <p>预投标的提供以下两种出借所获利息收益处理方式：再出借，或由用户自行支配。用户在加入预投标的时可进行选择，暂不支持中途修改。
    另外，在预投标计划退出后，债权转让所得资金及借款回款本息将返回至用户的民生银行存管账户，供用户自行支配。</p>
                            </li>
                            <li>
                                5. 锁定期是什么？
                                <p>预投标的有锁定期限制，锁定期内，您可操作提前退出，但会产生相应费用，提前退出费用=加入计划金额*2.0%。锁定期满后自动退出预投标计划，系统通过转让届时U计划所投债权标的实现您投资资金的回收。</p>
                            </li>
                            <li>
                                6. 预投标的到期后，我如何退出并实现收益?
                                <p>预投标的到期当日，系统将自动通过债权转让为您收回出借本金，转让完成时间一般为1~3个工作日。</p>
                            </li>
                            <li>
                                www.litongjinfu.com平台仅为信息发布平台，未以任何明示或暗示的方式对出借人提供担保或承诺保本保息，出借人应根据自身的投资偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任。市场有风险，投资需谨慎。
                            </li>
                        </ul>
                    </li>
            </ul>

            </div>
        </div>*@ -->
    </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
    export default {
        data () {
            return {
                switch1Class: 'close1',
                switch2Class: 'close2',
                autoBid: [],
                money: 0,
                userSortRank: 0,
                ret: 0,
                submitbtntype: 'graybg',
                status: 0,
                minTerm: 0,
                maxTerm: 1,
                Termrate: '',
                minRate: '',
                minSysRate:0,
                maxSysRate:0,
                maxMoney: 0,
                reserveMoney: 0.00,
                repeat:1,
                useReward:1,
                useExtraRate:1,
                automaticBtnText:'开启',
                autobid:'',
                dangerType:''
            }
        },
        created() {
            // 非父子组件通信发送
            // LTJF.$emit("txt",{header:true});
            
            var self = this;
            //是否实名认证获取，若未实名就跳转到开户界面
            self.$store.state._ajax(self,'/api/user/userInfo', {}, function (data) {
                if (data.data.status == 0 ) {
                    //未实名认证
                    layer.alert('请先进行实名认证!',{title: '操作提示',icon: 5},function(){self.$router.push({path:"/account/accountOpen"});layer.closeAll(); });
                    setTimeout(function () { self.$router.push({path:"/account/accountOpen"});layer.closeAll();}, 3000);
                }
            }, '');
            self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
                self.money = data.data.useMoney;
            }, '');
            //自动投标的ret参数为18
            self.ret = (self.$store.state.ifRegular == 0) ? 18 : 180;
            
            //获取自动投标状态
            self.$store.state._ajax(self,'/api/invest/findPlan', {}, function (data) {
                self.autoBid = data.data.autoBid;
                self.dangerType = data.data.autoBid.dangerType;
                if(self.dangerType == null){
                    layer.confirm("投资前须进行风险测评！",{title: '操作提示',icon: 6, btn: ['去测评','取消']},function(){
                        self.$router.push({path:"/account/riskTest"});
                        layer.closeAll();
                    },function(){
                        layer.closeAll();
                    });
                }
                self.userSortRank = data.data.userSortRank;
                self.switch1Class = (data.data.autoBid.status == 0) ? 'close1' : 'open1';
                self.switch2Class = (data.data.autoBid.status == 0) ? 'close2' : 'open2';
                self.status = data.data.autoBid.status;
                self.minSysRate = data.data.autoBid.minSysRate;
                self.maxSysRate = data.data.autoBid.maxSysRate;
                self.minTerm = data.data.autoBid.minTerm;
                self.maxTerm = data.data.autoBid.maxTerm;
                self.Termrate = data.data.autoBid.minTerm + '~' + (data.data.autoBid.maxTerm > 12 ? 999 : data.data.autoBid.maxTerm);
                self.minRate = (data.data.autoBid.minRate == null) ? self.minSysRate : data.data.autoBid.minRate;
                self.maxMoney = data.data.autoBid.maxMoney;
                self.reserveMoney = data.data.autoBid.reserveMoney; 
                self.repeat = data.data.autoBid.repeat;
                self.useReward = data.data.autoBid.useReward;
                self.useExtraRate = data.data.autoBid.useExtraRate;
                if (self.status == 1) {
                    self.automaticBtnText = '关闭';
                }
                
            });

            self.$store.state._ajax(self,'/api/open/autobid', {respType : 'json',contractType : 1}, function (data) {self.autobid=data.data;},'');
        },  
        mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");

            this.$store.state.AjaxSumbit(this,"/", "/api/invest/autobidPlan", function (data) {
                if (typeof data.data == "string") {
                    var start = data.data.indexOf('<form id="autoRedirectForm"');
                    var end = data.data.indexOf('</body>');
                    var form = data.data.substr(start, end - start);
                    $(form).appendTo('body').submit();
                }
            },function (data) {
                if(data.code ==6){
                    layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();window.location.reload();});
                    setTimeout(function() {
                        layer.closeAll();
                        window.location.reload();
                    }, 2000);
                }else{
                    layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
                }
                
            })
        },     
        methods:{
            on_offswitch: function () {
                var self = this;
                if(self.dangerType == null){
                    layer.confirm("投资前须进行风险测评！",{title: '操作提示',icon: 6, btn: ['去测评','取消']},function(){
                        self.$router.push({path:"/account/riskTest"});
                        layer.closeAll();
                    },function(){
                        layer.closeAll();
                    });
                }else{
                    this.switch1Class = (this.switch1Class == 'close1') ? 'open1' : 'close1';
                    this.switch2Class = (this.switch2Class == 'close2') ? 'open2' : 'close2';
                    self.status = (this.switch1Class == 'close1') ? '0' : '1';
                    self.automaticBtnText = (this.switch1Class == 'close1') ? '开启' : '关闭';
                    if (this.switch1Class == 'close1' && self.autoBid.status == 1) {
                        self.$store.state._ajax(self,'/api/invest/closePlan', {}, function (data) {
                            layer.alert(data.msg,{title: '操作提示',icon: 6},function(){window.location.reload();});
                        });
                    }
                }
            },
            unautobidPlan: function () {
                layer.alert('您还没有开启自动投标按钮！',{title: '操作提示',icon: 2},function(){layer.closeAll();});
            },
            Termratechange: function () {
                var self = this;
                this.minTerm = $("select[name=Termrate]").find("option:selected").attr("minTerm");
                this.maxTerm = $("select[name=Termrate]").find("option:selected").attr("maxTerm");
                // 自动投标排序
                self.$store.state._ajax(self,'/api/invest/autoSort', {
                    maxTerm:self.maxTerm,
                    minTerm:self.minTerm
                }, function (data) {
                    // console.log(data.data)
                    self.userSortRank = data.data.sort;
                    self.minRate = data.data.minSysRate;
                    self.minSysRate = data.data.minSysRate;
                    self.maxSysRate = data.data.maxSysRate;
                });
            },
            ytbsylChange: function (type) {
                var self = this;
                var minRate = parseFloat(self.minRate);
                if (type == "plus") {
                    if ((minRate + 0.1) <= self.maxSysRate) {
                        minRate += 0.1;
                    }
                } else {
                    if ((minRate - 0.1) >= self.minSysRate) {
                        minRate -= 0.1;
                    }
                }
                self.minRate = parseFloat(minRate).toFixed(2);
                //$(".ytbsylinp").val(parseFloat(ytbsylnum).toFixed(2))
            },
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
    #div1{
        width: 56px;
        height: 26px;
        display:inline-block;
        border-radius: 12.5px;
        position: absolute;
        right:0;
        top:15px;
        cursor: pointer;
    }
    .automaticSpan{position: absolute;top: 0;line-height: 24px;font-size: 12px;color:#969696;}
    .close1 .automaticSpan{padding-left: 26px;}
    .open1 .automaticSpan{padding-left: 6px;color: #fff;}
    #div2{
        width: 24px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        border-radius: 12px;
        position: absolute;
        background: white;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.4);
        
    }
    .open1{
        background: rgba(0,184,0,0.8);
    }
    .open2{
        top: 1px;
        right: 1px;
    }
    .close1{
        background: rgba(255,255,255,0.4);
        border:1px solid rgba(0,0,0,0.15);
        border-left: transparent;
    }
    .close2{
        left: 0px;
        top: 0px;
        border:1px solid rgba(0,0,0,0.1);
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
    input[type="number"]{-moz-appearance:textfield;}
    .ytbSelline .form-group:nth-child(1) .tip{left: 100px;}
    .ytbSelline .form-group:nth-child(2) .tip{left: 130px;}
</style>
