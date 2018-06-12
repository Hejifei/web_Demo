<template>
    <div>
        <img src="/static/img/personalC_zdtbTop.png" />
        <div class="overview" style="padding-top:0;">
            <div id="zdtbC" >
                <!-- @*预约标的*@ -->
                <div class="mainwp-tab" v-cloak>
                    <div class="ordertable cardform" id="AjaxForm" >
                        <div class="ytbBody">
                            <!-- <h1 style="text-align:left;position:relative;" class="row">
                                自动投标
                                <div id="div1" :class="switch1Class" @click="on_offswitch">
                                    <div id="div2" :class="switch2Class"></div>
                                    <span class="automaticSpan">{{automaticBtnText}}</span>
                                </div>
                            </h1> -->
                            <div class="ytbSelC">
                                <div class="ytbSelline clearfix row">
                                    <div class="ytbfistLine">
                                        <span class="lightgrayspan">当前可用金额</span>
                                        <span class="ytbmoneyspan">{{money}}</span>
                                        <span class="lightgrayspan">元</span>
                                        <router-link to="/account/recharge">充值</router-link>
                                        <span class="tip"></span>
                                    </div>
                                    <div class="ytbfistLine" style="text-align:right;">
                                        <span  class="blodspan">您前面还有<label class="orderNum">{{userSortRank}}</label>个人</span>
                                    </div>
                                </div>
                                <div class="chgenew"></div>
                                <div class="ytbSelline clearfix">
                                    <div class="ytbfistLine form-group">
                                        <span class="blodspan">最大投资金额</span>
                                        <input type="number" onkeyup="value=value.replace(/[^\d]/g,'') " class="form-submit required" id="maxMoney" name="maxMoney" placeholder="100元起"   v-model="maxMoney" number />
                                        <span class="blodspan">元</span>
                                        <span class="tip"></span>
                                    </div>
                                    <div class="ytbfistLine form-group">
                                        <span class="blodspan">最小投资金额</span>
                                        <input type="number" onkeyup="value=value.replace(/[^\d]/g,'') " class="form-submit required" id="minMoney" name="minMoney" placeholder="100元起"   v-model="minMoney" number />
                                        <span class="blodspan">元</span>
                                        <span class="tip"></span>
                                    </div>
                                </div>
                                <div class="ytbSelline clearfix">
                                    <div class="ytbfistLine form-group">
                                        <span class="blodspan">账户保留金额</span>
                                        <input type="number" onkeyup="value=value.replace(/[^\d]/g,'') " class="form-submit required" id="reserveMoney" name="reserveMoney"    v-model="reserveMoney" number />
                                        <span class="blodspan">元</span>
                                        <span class="tip"></span>
                                        <input class="form-submit" type="hidden" name="type" />
                                        <input class="form-submit" value="json" type="hidden" name="respType" id="respType" />
                                        <input class="form-submit" type="hidden" name="ret" v-model="ret"/>
                                    </div>
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
                                </div>
                                <div class="ytbSelline clearfix">
                                    <div class="ytbfistLine form-group">
                                        <span class="blodspan">投标状态</span>
                                        <select class="form-submit required" id="repeat" name="repeat" v-model="repeat">
                                            <option value="1">重复投资</option>
                                            <option value="2">只投一次</option>
                                        </select>
                                        <span class="tip"></span>
                                    </div>
                                    <div class="ytbfistLine form-group">
                                        <span class="blodspan">是否使用红包</span>
                                        <select class="form-submit" id="useReward" name="useReward" v-model="useReward">
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
                                        <input class="form-submit" style="display:none;" id="maxRate" v-model="maxRate" name="maxRate" />
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
                                <!-- <div class="ytbSelline clearfix">
                                    <div class="ytbfistLine">
                                        <span  class="blodspan">您前面还有<label class="orderNum">{{userSortRank}}</label>个人</span>
                                    </div>
                                </div> -->
                            </div>
                            <div class="ytbxieyiC">
                                <label><input type="checkbox" checked class="form-submit agreement"/> 我已阅读并同意 <a :href="autobid" target="_black">《自动投标须知》</a></label>
                                <!-- <i>注：自动投标默认的项目为普通散标</i> -->
                            </div>
                            <div class="ytbBtnLine">
                                <p>
                                    <span class="logbox" v-if="status == 0" >
                                        <a class="btn confirmBtn redBtn" id="SubmitBtn">确认并开启</a>
                                    </span>
                                    <span class="logbox" v-if="status == 1">
                                        <a class="btn confirmBtn redBtn" id="SubmitBtn">提交修改</a>
                                        <a v-on:click="on_offswitch" class="btn confirmBtn graybtn">关闭</a>
                                    </span>
                                </p>
                            </div>
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
                minMoney: 0,
                reserveMoney: 0.00,
                repeat:1,
                useReward:1,
                useExtraRate:1,
                automaticBtnText:'开启',
                autobid:'',
                dangerType:'',
                maxRate:36
            }
        },
        created() {
            // 非父子组件通信发送
            // LTJF.$emit("txt",{header:true});
            
            var self = this;
            //是否实名认证获取，若未实名就跳转到开户界面
            self._ajax(self,'/api/user/userInfo', {}, function (data) {
                if (data.data.status == 0 ) {
                    //未实名认证
                    layer.alert('请先进行实名认证!',{title: '操作提示',icon: 5},function(){self.$router.push({path:"/account/accountOpen"});layer.closeAll(); });
                    setTimeout(function () { self.$router.push({path:"/account/accountOpen"});layer.closeAll();}, 3000);
                }
            }, '');
            self._ajax(self,'/api/account/index', {}, function (data) {
                self.money = data.data.useMoney;
            }, '');
            //自动投标的ret参数为18
            self.ret = (self.ifRegular == 0) ? 18 : 180;
            
            //获取自动投标状态
            self._ajax(self,'/api/invest/findPlan', {}, function (data) {
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
                // self.switch1Class = (data.data.autoBid.status == 0) ? 'close1' : 'open1';
                // self.switch2Class = (data.data.autoBid.status == 0) ? 'close2' : 'open2';
                self.status = data.data.autoBid.status;
                self.minSysRate = data.data.autoBid.minSysRate;
                self.maxSysRate = data.data.autoBid.maxSysRate;
                self.minTerm = data.data.autoBid.minTerm;
                self.maxTerm = data.data.autoBid.maxTerm;
                self.Termrate = data.data.autoBid.minTerm + '~' + (data.data.autoBid.maxTerm > 12 ? 999 : data.data.autoBid.maxTerm);
                self.minRate = (data.data.autoBid.minRate == null) ? self.minSysRate : data.data.autoBid.minRate;
                self.maxMoney = parseInt(data.data.autoBid.maxMoney);
                self.minMoney = parseInt(data.data.autoBid.minMoney);
                self.reserveMoney = parseInt(data.data.autoBid.reserveMoney); 
                self.repeat = data.data.autoBid.repeat;
                self.useReward = data.data.autoBid.useReward;
                self.useExtraRate = data.data.autoBid.useExtraRate;
                // if (self.status == 1) {
                //     self.automaticBtnText = '关闭';
                // }
                
            });

            self._ajax(self,'/api/open/autobid', {respType : 'json',contractType : 1}, function (data) {self.autobid=data.data;},'');
        },  
        mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");

            this.AjaxSumbit(this,"/", "/api/invest/autobidPlan", function (data) {
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
                    // this.switch1Class = (this.switch1Class == 'close1') ? 'open1' : 'close1';
                    // this.switch2Class = (this.switch2Class == 'close2') ? 'open2' : 'close2';
                    // self.status = (this.switch1Class == 'close1') ? '0' : '1';
                    // self.automaticBtnText = (this.switch1Class == 'close1') ? '开启' : '关闭';
                    // if (this.switch1Class == 'close1' && self.autoBid.status == 1) {
                        self._ajax(self,'/api/invest/closePlan', {}, function (data) {
                            layer.alert(data.msg,{title: '操作提示',icon: 6},function(){window.location.reload();});
                        });
                    // }
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
                self._ajax(self,'/api/invest/autoSort', {
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
