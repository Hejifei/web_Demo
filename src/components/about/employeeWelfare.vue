<template>
    <div class="AboutUSC">
        <div class="bannerBG ygflBG">
            <div class="aboutUsheadTitle">
                <h1>Welfare</h1>
                <h3>员工福利</h3>
            </div>
            <ul>
                <li><router-link to="/about/aboutus">关于我们</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/about/newsDynamic">新闻动态</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <li><router-link to="/about/newHands">新手入门</router-link></li>
                <li><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li>
                <li class="abooutusMenuSel"><router-link to="/about/employeeWelfare">员工福利</router-link></li>
            </ul>
        </div>
        <div class="bodygrayBG">
            <div class="rightmain-c ">
                <div class="newsinfo-intro content">
                    <div class="graph pad30">员工福利</div>
                    <div class="chgenew"></div>
                    <div class="aboutcon clearfix" style="width:1000px;">
                        <div class="fl newsinfo-l">
                            <img src="../../common/stylus/0818new/welfare_card_img.png" alt="" />
                        </div>
                        <div class="fr newsinfo-r">
                            <h3>福利卡简介</h3>
                            <p>利通金服端午节福利上线啦！为答谢各位同事的辛勤工作，公司特为你送上一张心意卡 ~ 点击<a style="color:#eb494b" target="_blank" href="http://youlila.h.liguanjia.net/index.php/exchange_mall/bag/view/3748?from=singlemessage&isappinstalled=0">立即兑换></a>，通过手机验证码登录礼品兑换平台，点击“我的礼包”—“添加礼包”，输入卡片背面的卡号和密码，兑换你心仪的礼品吧！有任何问题可咨询商品热线：<em style="color:#eb494b">400-8339-567</em>。最后祝您端午节快乐！</p>
                        </div>
                        <div class="newsinfo-b">
                            <span style="position:absolute;left:0;top:15px"></span>
                            <p style="font-size:12px;color:#d7d7d7">暂无更多</p>
                            <span style="position:absolute;right:0;top:15px"></span>
                        </div>
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
            }
        },
        created () {
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted () {
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
        }
    }
    
</script>
    
<style>
.rightmain-c .newsinfo-intro .newsinfo-l {
    width: 412px;
    margin-top: 50px;
}
.rightmain-c .newsinfo-intro .newsinfo-r {
    width: 400px;
    margin-top: 60px;
    line-height: 34px;
}
.rightmain-c .newsinfo-intro .newsinfo-r h3 {
    color: #eb494b;
    font-size: 20px;
    margin: 4px 0;
}
.rightmain-c .newsinfo-intro .newsinfo-r p {
    color: #646464;
    font-size: 16px;
    text-indent: 2em;
}
.rightmain-c .newsinfo-b {
    width: 100%;
    height: 30px;
    margin: 0 auto;
    line-height: 30px;
    text-align: center;
    position: relative;
    margin-bottom: 30px;
    float: left;
}
.rightmain-c .newsinfo-b span {
    border-bottom: 1px dashed #d7d7d7;
    width: 385px;
    display: block;
}
</style>
