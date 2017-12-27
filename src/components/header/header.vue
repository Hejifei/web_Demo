<template>
    <div class="hello">
        <div class="SignContactC" id="SignContactC" @click="SignContactChide($event)">
            <div class="SignContact" id="SignContact">
                <div class="SignContact_box">
                    <div class="cancelmodelbtn" v-on:click="modelClose"><span class="icon-remove"></span></div>
                    <div class="SignContact_body">
                        <h1>每日签到赚积分</h1>
                        <h3>积分余额：{{totalScore}}分</h3>
                        <p style="color:#ffda5c">
                            <!-- @*积分商城*@  -->
                            &nbsp; 
                        </p>
                        <div id="calendar"></div>
                        <a v-if="is_sign == 0" class="signBtn" v-on:click="SignToday">签到</a>
                        <a v-if="is_sign == 1" class="signBtn signedBtn">已签到</a>
                    </div>
                </div>
            </div>
        </div>
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
                    <!-- <div class="wp-rr logobtnC fr">
                        <a href="http://weibo.com/u/5929500361?topnav=1&wvr=6&topsug=1&is_all=1" target="_blank" class="top_weboa logoa" id="mvp"></a>
                        <a id="contactwechat" class="top_wechata logoa" @mouseenter="wechatenter" @mouseleave="wechatleave">
                        </a>
                        <ul v-show="wechatul == 1" id="wechatul" class="divhide-l">
                            <li><img src="../../common/stylus/img/index_top_erweima_img.png"></li>
                        </ul>
                        <router-link to="/login/appDownload" class="top_appa logoa" id="em3"></router-link>
                    </div> -->
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
                <!-- <span class="fl margintop20">
                    <a @click='SignNow' class="fl radius headtopbtn">
                        <img src="../../common/stylus/0818new/sign_logoUnlogin.png"/>签到
                    </a>
                </span> -->
                <!-- <span  class="fl margintop20">
                    <router-link to="/login" class="fl radius headtopbtn">
                        <img src="../../common/stylus/0818new/index_top_login_icon.png"/>登录
                    </router-link>
                </span>
                <span class="fl margintop20">
                    <router-link to="/login/registerPersonal" class="fl radius headtopbtn2">
                        <img src="../../common/stylus/0818new/index_top_personal_icon.png"/>个人注册
                    </router-link>
                </span> -->
                <!-- <span class="fl margintop20">
                    <router-link to="/login/registerEnterprise" class="fl radius headtopbtn2">
                        <img src="../../common/stylus/0818new/index_top_company_icon.png"/>企业注册
                    </router-link>
                </span> -->
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
            wechatul:0
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
            if (e.target.id == "SignContactC" ) {
            $("#SignContactC").hide();
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
                //签到的的模态框出现
                //获取今日签到信息
                that.$store.state._ajax(that,'/api/index/findScore', {}, function (data) {
                    that.is_sign=data.data.is_sign == 1?1:0;
                    //获取当月签到记录
                    that.$store.state._ajax(that,'/api/index/signDetail', {}, function (data) {
                        // //var signList = [{ "signDay": "09" }, { "signDay": "11" }, { "signDay": "12" }, { "signDay": "13" }, { "signDay": "15" }, { "signDay": "25" }];
                        // console.log(data);
                        // return;
                        var signList = [];
                        var signDetail = data.data.detail;
                        if (signDetail.length > 0) {
                            for (var i = 0 ; i < signDetail.length; i++) {
                                signList.push({ "signDay": signDetail[i].createTime.substr(8, 2) })
                            }
                        }
                        that.$store.state.calUtil.init(signList);
                        that.totalScore = data.data.score == '.00' ? 0 : parseInt(data.data.score);
                    }, function () {
                        that.$store.state.calUtil.init([]);
                        that.totalScore = 0;
                    }, false);
                    $(".SignContactC").show();
                }, '', false);
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
                        that.$store.state.calUtil.init(signList);
                    }, '', false);
                }, '', false);
        },
        modelClose: function () {
            $(".SignContactC").hide();
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
