<template>
<div class="footer" style="margin-top:0px;background:#fff;">
    <div class="footnav wp clearfix">
        <div class="footerMenuC">
            <title>关于</title>
            <title>安全</title>
            <title>服务</title>
            <ul class="clearfix">
                <li><router-link to="/about/aboutus">利通简介</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/product">我要投资</router-link></li>
                <li><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/service/insurance">安全保障</router-link></li>
                <li><a @click="logincheckhref('/loan')">我要借款</a></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/service/bankDeposit">银行存管</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <!-- <li><router-link to="/about/newHands">新手入门</router-link></li> -->
                <!-- <li><router-link to="/product">我要投资</router-link></li>
                <li><a @click="logincheckhref('/loan')">我要借款</a></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li> -->
            </ul>
        </div>
        <div class="footerErweimaC">
            <div class="footer_son"><img src="../../common/stylus/img/footer_erweima_licai.png" /><p>扫描关注利通服务号</p></div>
            <div class="footer_son"><img src="../../common/stylus/img/footer_erweima_jiekuan.png" /><p>扫描关注金服微信借款</p></div>
            <!-- <div class="footer_son"><img src="../../common/stylus/img/footer_telephone.png" /></div> -->
        </div>
        <div class="footerKefu">
            <img src="../../common/stylus/img/footer_kefu.png" />
            <label>400-606-1018</label>
            <span>服务时间：8:30~17:30(工作日)</span>
            <div class="footer_iconC">
                <!-- <a href="http://weibo.com/u/5929500361?topnav=1&wvr=6&topsug=1&is_all=1" target="_blank" class="top_weboa logoa" id="mvp"></a>
                <a id="contactwechat" class="top_wechata logoa" @mouseenter="wechatenter" @mouseleave="wechatleave">
                </a>
                <ul v-show="wechatul == 1" id="wechatul" class="divhide-l">
                    <li><img src="../../common/stylus/img/index_top_erweima_img.png"></li>
                </ul>
                <router-link to="/login/appDownload" class="top_appa logoa" id="em3"></router-link> -->
                <i class="footer_wechat">
                    <img class="son_img" src="../../common/stylus/img/index_top_erweima_img.png">
                </i>
                <a href="http://weibo.com/u/5929500361?topnav=1&wvr=6&topsug=1&is_all=1" target="_blank" ><i class="footer_weibo"></i></a>
                <router-link to="/login/appDownload"><i class="footer_app"></i></router-link>
            </div>
        </div>
    </div>
    <!-- <div class="dixian"></div> -->
    <div class="footertxt" style="border-top:0">
        <div class="wp">
            <div class="wpleft">
                <p class="labelp">
                    <label>友情链接：</label>
                    <a href="http://www.wdzj.com" target="_blank">网贷之家</a>
                    <a style="border:0;" href="http://www.p2peye.com/" target="_blank">网贷天眼</a>
                </p>
                <p>
                    <span>版权所有 © 苏州利通金砖金融信息服务有限公司</span>
                    <span><a href="http://www.miitbeian.gov.cn" target="_blank">苏ICP备16020265号</a></span>
                </p>
                <p>出借有风险，投资需谨慎</p>
            </div>
            <div class="wpright">
		        <a href="https://ss.knet.cn/verifyseal.dll?sn=e15121632050061819xnpe000000&a=1&pa=0.6032720989052147" target="_blank"><img src="../../common/stylus/footkexin.png" /></a>
                <a href="http://www.creditchina.gov.cn/xinyongxinxixiangqing/default.html?isEncryStr=1&encryStr=cXpzQ3I7cnlkdjA%3D%0A&name=%E8%8B%8F%E5%B7%9E%E5%88%A9%E9%80%9A%E9%87%91%E7%A0%96%E9%87%91%E8%9E%8D%E4%BF%A1%E6%81%AF%E6%9C%8D%E5%8A%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&isEncryStr=1" target="_blank"><img src="../../common/stylus/footcreditchina.png" /></a>
                <!-- <a href="http://www.365sxt.com/enterpriseDetails/showCertificationInfo?enterpriseId=738897" target="_blank"  class="suxintong"></a> -->
                <a href="../static/img/suxintong.png" target="_blank"  class="suxintong"></a>
                <!-- <a href="../src/common/stylus/img/suxintong.png" target="_blank"  class="suxintong"></a> -->
                <a href="http://webscan.360.cn/index/checkwebsite/url/www.litongjinfu.com" target="_blank"><img border="0" src="../../common/stylus/foot360.png" /></a>
                <a href="https://myssl.com/www.litongjinfu.com?status=success#certificates" target="_blank"  class="suxintong yzcx" style=""></a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods:{
      logincheckhref:function(href){
        var self = this;
        if (localStorage.uid == null || localStorage.uid == '') {
            localStorage.url = href;
            self.$router.push({path:'/login'});
        } else {
            self.$router.push({path:href})
        }
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .yzcx{background:url('../../common/stylus/img/trustasia-logo.png') no-repeat center center;
    background-size:contain;border:1px solid #ccc;}
</style>
