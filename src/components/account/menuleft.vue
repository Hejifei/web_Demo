<template>
    <div style="background:#f0f0f0;">
        <div class="crumbs">
        </div>
        <div class="wp clearfix" style="padding-top:20px;">
            <!-- 左侧菜单 -->
            <div class="sidebar" v-cloak>
                <div class="personalInfoC">
                    <router-link style="display:inline-block;width:70px;height:70px;" to="/account/headImgChange"><img class="headimg" :src="userInfo.avatar" /></router-link>
                    <a class="checkinBtn" @click="SignNow">每日签到</a>
                    <ul class="iconul">
                        <li>
                            <router-link v-if="userInfo.status == '0'" to="/account/accountOpen"><img src="../../common/stylus/accounticon/myaccount_shimingnormal.png" title="实名未认证"></router-link>
                            <router-link v-if="userInfo.status == '1'" to="/account/accountOpened"><img src="../../common/stylus/accounticon/myaccount_shimingselected.png" title="实名已认证"></router-link>
                        </li>
                        <li>
                            <router-link v-if="userInfo.U_Mail == null || userInfo.U_Mail == 0" to="/account/emailChange">
                                <img src="../../common/stylus/accounticon/myaccount_youxiangnormal.png" title="邮箱未绑定" alt="">
                            </router-link>
                            <router-link v-if="userInfo.U_Mail == 1" to="/account/emailChange">
                                <img src="../../common/stylus/accounticon/myaccount_youxiangselected.png" title="邮箱已绑定" alt="">
                            </router-link>
                        </li>
                        <li>
                            <a v-if="userInfo.mobileCheck == '0'" @click="PhoneChange">
                                <img src="../../common/stylus/accounticon/myaccount_shoujinormal.png" title="手机号码未绑定" alt="">
                            </a>
                            <a v-if="userInfo.mobileCheck == '1'" @click="PhoneChange">
                                <img src="../../common/stylus/accounticon/myaccount_shoujiselected.png" title="手机号码修改" alt="">
                            </a>
                        </li>
                        <br />
                        <li>
                            <a><img src="../../common/stylus/accounticon/myaccount_shouquannormal.png" title="未授权" alt=""></a>
                            <!-- <router-link v-if="userInfo.authorize  == '0'" to='/developing'>
                                <img src="../../common/stylus/accounticon/myaccount_shouquannormal.png" title="未授权" alt="">
                            </router-link>
                            <router-link v-if="userInfo.authorize  == '1'" to='/developing'>
                                <img src="../../common/stylus/accounticon/myaccount_shouquanselected.png" title="已授权" alt="">
                            </router-link> -->
                        </li>
                        <li>
                            <!-- <a><img src="../../common/stylus/accounticon/myaccount_risks.png" title="未进行风险评估" alt=""></a> -->
                            <router-link v-if="userInfo.dangerType  == '0'" to='/account/riskTest'>
                                <img src="../../common/stylus/accounticon/myaccount_risks.png" title="未进行风险评估" alt="">
                            </router-link>
                            <router-link v-else to='/account/riskTest'>
                                <img src="../../common/stylus/accounticon/myaccount_riskselected.png" title="已进行风险评估" alt="">
                            </router-link>
                        </li>
                        <li>
                            <!-- <router-link to='/service/personalTailor'>
                                <img src="../../common/stylus/accounticon/myaccount_sirennormal.png" title="私人定制" alt="">
                            </router-link> -->
                            <router-link v-if="userInfo.customized != 1" to='/service/personalTailor'>
                                <img src="../../common/stylus/accounticon/myaccount_sirennormal.png" title="私人定制" alt="">
                            </router-link>
                            <router-link v-if="userInfo.customized == 1"to='/service/personalTailor'>
                                <img src="../../common/stylus/accounticon/myaccount_sirenselected.png" title="私人定制" alt="">
                            </router-link>
                        </li>
                    </ul>
                </div>
                <ul id="my_menu" class="leftmenu">
                    <li>
                        <span name="Account"><i class="ico mico6"></i>账户管理</span>
                        <div class="info">
                            <router-link to="/account/overview">账户总览</router-link>
                            <router-link to="/account/reward">我的奖券</router-link>
                            <router-link to="/account/baseInfo">基本设置</router-link>
                            <router-link to="/account/integration">我的积分</router-link>
                            <router-link to="/account/friends">我的好友</router-link>
                            <router-link to="/account/messageCenter">消息中心</router-link>
                        </div>
                    </li>
                    <li>
                        <span name="Capital"><i class="ico mico2"></i>资金管理</span>
                        <div class="info">
                            <router-link to="/account/recharge">充值</router-link>
                            <router-link to="/account/withdrawals">提现</router-link>
                            <router-link to="/account/capitalflow">资金流水</router-link>  
                            <router-link to="/account/rewards">我的奖励金</router-link> 
                            <router-link to="/account/bankcard">银行卡</router-link>  
                            <!-- @*<a href="/Member/Capital/EntrustCash">委托收款</a>*@     -->
                        </div>
                    </li>
                    <li>
                        <span name="Invest"><i class="ico mico3"></i>投资管理</span>
                        <div class="info">
                            <router-link to="/account/investlist">历史投资</router-link>
                            <!-- @*<a href="/Member/Invest/myReservation">我的预约</a> -->
                            <router-link to="/account/investlistTransfer">债权转让</router-link>
                            <router-link to="/account/objectBookingDetails">自动投标</router-link>
                            <router-link to="/account/personalTailorDetail">私人定制</router-link>
                            <router-link to="/account/followlist">关注项目</router-link>
                            <router-link to="/account/fssTrans">生利宝</router-link>
                        </div>
                    </li>
                    <li>
                        <span name="Loan"><i class="ico mico4"></i>借款管理</span>
                        <div class="info">
                            <router-link to="/account/applyRecord">申请记录</router-link>
                            <router-link to="/account/loanManage">借款管理</router-link>
                            <router-link to="/account/returnMoney">还款管理</router-link>
                            <router-link to="/account/overdueMoney">逾期管理</router-link>
                            <router-link to="/account/authorizationEntrust">授权代收</router-link>  
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 右侧内容 -->
            <router-view  class="m-rightmain"></router-view>
        </div>
    </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
    export default {
        data () {
            return {
                userInfo:[]
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted:function(){
            var self = this;
            self.$store.state.checklogin(self);
            // 顶部菜单添加下划线
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav >ul >li").eq(4).find("a").addClass("router-link-exact-active");
            //个人信息获取
            self.$store.state._ajax(self,'/api/user/userInfo', {}, function (data) {
                //console.log(data)
                self.userInfo = data.data;
            }, '', false);

            //菜单选中
            $(".leftmenu li span").click(function () {
                if ($(this).hasClass("selected")) {
                    $(this).siblings(".info").slideUp(200);
                    $(this).removeClass("selected");
                } else {
                    $(".selected").siblings(".info").hide();
                    $(".selected").removeClass("selected");
                    $(this).addClass("selected");
                    $(this).siblings(".info").slideDown(200);
                }
            })
            //location.pathname
            $(".info a").each(function () {
                if ($(this).attr("href").indexOf(self.$route.path) != '-1') {
                    $(this).addClass("c");
                    $(this).parent(".info").slideDown(200);
                    $(this).parent(".info").siblings("span").addClass("selected");
                }
            })
        },
        methods: {
            SignNow: function () {
                LTJF.$emit("signtoday",1);
                // var that = this;
                //     that.$store.state.checklogin(that);
                //     //签到的的模态框出现
                //     //获取今日签到信息
                //     that.$store.state._ajax(that,'/api/index/findScore', {}, function (data) {
                //         let is_sign=data.data.is_sign == 1?1:0;
                //         LTJF.$emit("txt",{is_sign:is_sign});
                //         //获取当月签到记录
                //         that.$store.state._ajax(that,'/api/index/signDetail', {}, function (data) {
                //             // //var signList = [{ "signDay": "09" }, { "signDay": "11" }, { "signDay": "12" }, { "signDay": "13" }, { "signDay": "15" }, { "signDay": "25" }];
                //             // console.log(data);
                //             // return;
                //             var signList = [];
                //             var signDetail = data.data.detail;
                //             if (signDetail.length > 0) {
                //                 for (var i = 0 ; i < signDetail.length; i++) {
                //                     signList.push({ "signDay": signDetail[i].createTime.substr(8, 2) })
                //                 }
                //             }
                //             that.$store.state.calUtil.init(signList);
                //             let totalScore = data.data.score == '.00' ? 0 : parseInt(data.data.score);
                //             LTJF.$emit("txt",{totalScore:totalScore});
                //         }, function () {
                //             that.$store.state.calUtil.init([]);
                //             LTJF.$emit("txt",{totalScore:0});
                //         }, false);
                //         $(".SignContactC").show();
                //     }, '', false);
            },
            PhoneChange:function(){
                layer.alert("如需要更换手机号，请联系客服<br />400-606-1018",{title: '操作提示',icon: 6},function(){layer.closeAll();});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    /* .overview{margin: 0;} */
</style>
