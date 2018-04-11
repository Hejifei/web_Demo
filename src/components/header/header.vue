<template>
    <div class="hello">
        <transition name="fade">
            <div class="SignContactC" v-if="SignContactCshow" id="SignContactC" @click="SignContactChide($event)">
                <div class="SignContact clearfix" id="SignContact">
                    <div class="cancelmodelbtn" @click="SignContactCshow = !SignContactCshow"><span class="icon-remove"></span></div>
                    <div class="sign_head"></div>
                    <div class="sign_body">
                        <div class="allscoreLine">
                            积分余额：{{userSignInfo.totalScore}}积分
                            <a to="/account/integration" @click="sign_newhref($event)">签到记录</a>
                        </div>
                        <div class="TodayScoreLine">
                            <span>+{{userSignInfo.score}}</span>积分
                        </div>
                        <div class="sign_content">{{userSignInfo.content}}</div>
                        <div class="sign_processC">
                            <div class="sign_processline"><i :style="{width:sign_process +'%'}"></i></div>
                            <div class="signDay">
                                <div class="everyDay" :class="{noShow:userSignInfo.num !=1}"><i>1</i>天</div>
                                <div class="everyDay" :class="{noShow:userSignInfo.num !=2}"><i>2</i>天</div>
                                <div class="everyDay" :class="{noShow:userSignInfo.num !=3}"><i>3</i>天</div>
                                <div class="everyDay" :class="{noShow:userSignInfo.num !=4}"><i>4</i>天</div>
                                <div class="everyDay" :class="{noShow:userSignInfo.num !=5}"><i>5</i>天</div>
                                <div class="everyDay" :class="{noShow:userSignInfo.num !=6}"><i>6</i>天</div>
                                <div class="everyDay lastDay"><i>7</i>天
                                    <div class="signaward">{{userSignInfo.maxScore}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="more-list">
                            <div class="more-title row">获取更多积分
                                <a to="/service/integratRule" @click="sign_newhref($event)" class="clrCornflower">积分规则</a>
                            </div>
                            <ul>
                                <li class="row" v-for="(userSignli,index) in userSignList" :key="index">
                                    <div><img :src="userSignli.img"/><span>{{userSignli.title}}</span></div>
                                    <div v-if="userSignli.complete == 1" class="clr9">{{userSignli.rule}}</div>
                                    <a @click="sign_newhref($event)" to="/login/registerPersonal" v-if="userSignli.target == 0 && userSignli.complete==0" class="clrCornflower">{{userSignli.rule}}</a>
                                    <a @click="sign_newhref($event)" to="/account/accountOpen" v-if="userSignli.target == 24 && userSignli.complete==0" class="clrCornflower">{{userSignli.rule}}</a>
                                    <a @click="sign_newhref($event)" to="/account/objectBookingDetails" v-if="userSignli.target == 21 && userSignli.complete==0" class="clrCornflower">{{userSignli.rule}}</a>
                                    <!-- 风险评测 -->
                                    <a @click="sign_newhref($event)" to="/account/riskTest" v-if="userSignli.target == 1 && userSignli.complete==0 && userSignli.title=='风险评测'" class="clrCornflower">{{userSignli.rule}}</a>
                                    <!-- 意见反馈 -->
                                    <a @click="sign_newhref($event)" to="/account/Feedback" v-if="userSignli.target == 25 && userSignli.complete==0" class="clrCornflower">{{userSignli.rule}}</a>
                                    <!-- 邀请好友 -->
                                    <a @click="sign_newhref($event)" to="/account/friends" v-if="userSignli.target == 1 && userSignli.complete==0 && userSignli.title=='邀请好友'" class="clrCornflower">{{userSignli.rule}}</a>
                                    <!-- 好友首投 -->
                                    <a @click="sign_newhref($event)" to="/account/friends" v-if="userSignli.target == 14 && userSignli.complete==0" class="clrCornflower">{{userSignli.rule}}</a>
                                    <!-- 投资积分 -->
                                    <a @click="sign_newhref($event)" to="/product" v-if="userSignli.target == 6 && userSignli.complete==0" class="clrCornflower">{{userSignli.rule}}</a>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
       
        <div class="topnav" style="background:#fff;">
            <div class="wp clearfix">
                <div class="wp-ll publictopleft clearfix">
                    <span><img src="../../common/stylus/0818new/index_top_tel_icon.png" /></span>
                    <span>客服热线：</span>
                    <span >400-606-1018</span>
                    <span style="margin-left:10px;">
                        <router-link to="/about/newHands">新手入门</router-link>
                        <router-link to="/about/helpCenter">帮助中心</router-link>
                    </span>
                </div>
            <div class="publictopright clearfix" v-if="uid != null && uid != ''" style="width:320px;text-align:right;">
                <span class="signImg" @click='SignNow' >
                    <img src="../../common/stylus/0818new/Sign_logo.png" title="点击签到" />每日签到
                </span>
                <span>欢迎您回来,</span>
                <span v-if="userinfo.name != null">
                    <i class="namei">{{userinfo.name}}</i>
                    <router-link to="/account/messageCenter">
                        <img src="../../common/stylus/0818new/email_message.png"/>
                    </router-link>
                </span>
                <span v-if="userinfo.name == null">
                    <i class="namei">{{userinfo.mobile}}</i>
                    <router-link to="/account/messageCenter">
                        <img src="../../common/stylus/0818new/email_message.png"/>
                    </router-link>
                </span>
                <a class="f-main" v-on:click="signOut" style="font-size:12px;">退出</a>
            </div>
            <div class="publictopright clearfix" v-if="uid == null || uid == ''" style="width:320px;text-align:right;font-size:0;">
                <router-link to="/login" class="unlogina">登录</router-link>
                <router-link to="/login/registerPersonal" class="unlogina">个人注册</router-link>
            </div>
        </div>
    
        </div>

        <div class="customeServiceC clearfix">
            <div class="cstmSvBtn">
                <img src="../../common/stylus/0818new/iconfont-qq.png"/>
                <i>在</i><i>线</i><i>客</i><i>服</i>
                <span  class="margintop10 icon-double-angle-left"></span>
            </div>
            <div class="qqlist">
                <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3104370981&site=qq&menu=yes">1号客服<img src="../../common/stylus/0818new/iconfont-qq_hong.png" title="点击这里给我发消息" /></a>
                <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2731454680&site=qq&menu=yes">2号客服<img src="../../common/stylus/0818new/iconfont-qq_hong.png" title="点击这里给我发消息" /></a>
                <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1955065175&site=qq&menu=yes">技术客服<img src="../../common/stylus/0818new/iconfont-qq_hong.png" title="点击这里给我发消息" /></a>
            </div>
            <br />
            <router-link to="/login/appDownload" target="_blank" class="csphone icon-mobile-phone"></router-link>
            <router-link to="/calculator" target="_blank" class="csphone cscalculator"></router-link>
        </div>
    </div>
  
</template>

<script>
import LTJF from '../../common/js/ltjf.js';
export default {
    data () {
        return {
            uid: "",
            userinfo: '',
            unreadMsg: '',
            totalScore: 0,
            is_sign:0,
            wechatul:0,
            userSignInfo:[],
            userSignList:[],
            sign_process:0,
            SignContactCshow:false
        }
    },
    created(){
        var self = this;
        LTJF.$on("signtoday",function(){
            self.SignNow();
        });
    },
    mounted:function(){
        let self = this;
        //验证是否登陆
        self.uid = localStorage.uid;
        if (self.uid != null && self.uid != '') {
            self.userinfo = JSON.parse(localStorage.ltjfUserInfo);
            //验证是否有未读信息
            // self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
            //     self.unreadMsg = data.data.unreadMsg;
            // }, '', false);
        }

        // 消息披露子菜单上浮显示
        $(".menuson").hover(function(){
            if($(".menuson ul li:eq(0)").is(":hidden")){
                $(this).find("li").slideDown(400);
                $(this).find(".icon-angle-down").removeClass("icon-angle-down").addClass("icon-angle-up");
            }
        },function(){
            if(!$(".menuson ul li:eq(0)").is(":hidden")){
                $(this).find("li").slideUp(400);
                $(this).find(".icon-angle-up").removeClass("icon-angle-up").addClass("icon-angle-down");
            }
        })
        // 客服
        $(".cstmSvBtn").click(function () {
                if ($(this).find(".icon-double-angle-left").hasClass("icon-double-angle-right")) {
                    $(this).find(".icon-double-angle-right").removeClass("icon-double-angle-right");
                    $(".qqlist").hide();
                } else {
                    $(this).find(".icon-double-angle-left").addClass("icon-double-angle-right");
                    $(".qqlist").show();
                }
            })
    },
    methods: {
        SignContactChide:function(e){
            let self = this;
            if (e.target.id == "SignContactC" ) {
                self.SignContactCshow = !self.SignContactCshow;
            }
        },
        signOut: function () {
            let self = this;
            this.$store.state._ajax(this,'/api/user/logout', {}, function (data) {
                if (data.code == '1') {
                    localStorage.removeItem("ltjfUserInfo");
                    localStorage.removeItem("SID");
                    localStorage.removeItem("uid");
                    self.$store.state.getSID(self,'/login');
                }
            })
        },
        SignNow: function () {
            var that = this;
            
            that.$store.state.checklogin(that);
            that.$store.state._ajax(that,'/api/index/userSign', {}, function (data) {
                that.userSignInfo = data.data;  
                that.userSignList = data.data.getList;
                that.sign_process = 100*data.data.num/data.data.maxNum;
            }, function () {

            }, false);
            that.SignContactCshow = !that.SignContactCshow;
        },
        SignToday: function () {
            var that = this;
                //当日签到
                that.$store.state._ajax(that,'/api/index/getScore', {}, function (data) {
                    that.is_sign=1;
                    that.totalScore = data.data.total.totalScore;
                    // $(".signBtn").text("已签到")
                    // $(".signBtn").addClass("signedBtn");
                    that.$store.state._ajax(that,'/api/index/signDetail', {}, function (data) {
                        var signList = [];
                        var signDetail = data.data.detail;
                        if (signDetail.length > 0) {
                            for (var i = 0 ; i < signDetail.length; i++) {
                                signList.push({ "signDay": signDetail[i].createTime.substr(8, 2) })
                            }
                        }
                        var DateInsert = new Date();
                        that.$store.state.calUtil.init(signList,"#calendar",DateInsert);
                    }, '', false);
                }, '', false);
        },
        sign_newhref:function(e){
            let self = this;
            let newhref = e.target.getAttribute("to");
            self.SignContactCshow = !self.SignContactCshow;
            self.$router.push({path:newhref});
        },
        wechatenter:function(){
            this.wechatul = 1;
        },
        wechatleave:function(){
            this.wechatul = 0;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .margintop10{margin-top: 15px;}
    .namei{max-width:75px;display: inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}

    .underlineShow {
        border-bottom-style:solid;
        border-bottom-color:#eb494b;
        border-bottom-width:4px;
    }
    .underlineShow a{color:#eb494b;}
    .underlineHide {
        border-bottom-style:none;
    }
    .contacticon {
        margin-right:15px;
    }
    .wp-rr .contacticon {
        width:20px;
        height:21px;
    }
    .wp-rr .contacticon-1{
        position:relative;
    }
    .wechatdivshow {
        display:block;
        position:absolute; 
        top:35px; 
        left:780px;
        z-index:1000;
    }
    .appdivshow {
        display:block;
        position:absolute; 
        top:35px; 
        left:830px;
        z-index:1000;
    }
    .divhide {
        display:none;
    }
    .topnav .wp .wp-ll{
        width:520px;
    }
    .topnav .wp .wp-ll .wp-rr{
        width:145px;
        position:relative;
    }
    .topnav .wp .wp-ll .wp-rr .divhide-l{
        width:133px;
        height:102px;
        position:absolute;
        left:-16px;
        top:19px;
        display:block;
        z-index:5;
    }
     .topnav .wp .wp-ll .wp-rr .divhide-r{
        width:133px;
        height:102px;
        left:39px;
        top:17px;
        position:absolute;
        display:none;
    }
</style>
