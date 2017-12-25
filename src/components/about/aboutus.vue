<template>
    <div class="AboutUSC">
        <div class="bannerBG">
            <div class="aboutUsheadTitle">
                <h1>About Us</h1>
                <h3>关于我们</h3>
            </div>
            <ul>
                <li class="abooutusMenuSel"><router-link to="/about/aboutus">关于我们</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/about/newsDynamic">新闻动态</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <li><router-link to="/about/newHands">新手入门</router-link></li>
                <li><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li>
                <li><router-link to="/about/employeeWelfare">员工福利</router-link></li>
            </ul>
        </div>
        <div class="bodygrayBG">
            <div class="newsinfo-intro content">
                <dl class="aboutcon">
                    <dd>
                        <h3>公司简介</h3>
                        <p>利通金服是以P2P（个体对个体）为模式的互联网金融信息中介服务平台，为广大出借人提供一个诚信、安全、便捷、高效、较低风险、较高预期收益的投资渠道，实现财富的保值增值；为广大借款人、中小微企业主提供一种普惠金融信息服务，从而缓解融资难、融资贵的市场现状。利通金服拥有完整的职能体系和风控团队，是一家安全、稳定、长期发展的互联网金融信息服务平台。</p>
                    </dd>
                    <dd style="text-align:left">
                        <h3>公司理念</h3>
                        <p class="indent0p"><em> 企 业 宗 旨</em>：以人为本、诚信为道。我们始终如一，做好服务于民的理念。</p>
                        <p class="indent0p"><em>企 业 愿 景</em>：打造中国一流的财富管理服务平台，做客户放心的财富管家。</p>
                        <p class="indent0p"><em>企业价值观</em>：自强不息、创新务实、造福他人、成就自己。</p>
                        <p class="indent0p"><em>企 业 口 号</em>：利惠苏州，通达八方。</p>
                    </dd>
                    <dd class="about-t clearfix">
                        <div class="fl">
                            <h3>客户服务</h3>
                            <i><span class="sn1"></span>客服电话:400-606-1018</i>
                            <i><span class="sn2"></span>在线客服QQ : 3104370981</i>
                            <i><span class="sn3"></span>E-mail : litong@litonggroup.com.cn</i>
                            <em><img src="../../common/stylus/img/footer_erweima_licai.png" alt=""><b>扫描关注利通服务号</b></em>
                            <em><img src="../../common/stylus/img/footer_erweima_jiekuan.png" alt=""><b>扫描关注金服微信借款</b></em>
                        </div>
                        <div class="fr" style="width:350px;">
                            <h3>公司总部联系地址</h3>
                            <p>
                                <img src="../../common/stylus/img/hoster.png" alt="Alternate Text" class="fl" />
                                <i class="fl" style="margin-left:12px">江苏省苏州市吴中区吴中东路158号利通大厦</i>
                            </p>
                            <div class="ltlocationmapC" id="ltlocationmapC">
                                <img src="/static/img/locationmap.png" />
                            </div>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script> 
    import LTJF from '../../common/js/ltjf.js';
    // import {MP} from './map.js'

    export default {
        data () {
            return {
            }
        },
        created(){
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            // self.$nextTick(function(){  
            //         var _this = self;  
            //         MP(_this.ak).then(BMap => {  
            //             //在此调用api  
            //             var map = new BMap.Map("ltlocationmapC");
            //             map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            //             var point = new BMap.Point(120.634665, 31.279125);
            //             map.centerAndZoom(point, 19);
            //             var marker = new BMap.Marker(point);  // 创建标注
            //             map.addOverlay(marker);               // 将标注添加到地图中
            //             marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            //         })
            //     })
            
        },
        mounted () {  
            // this.readyMap();
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
        },
        methods:{
            // readyMap(){
            //     var _this = self;  
            //     var map = new BMap.Map("ltlocationmapC");
            //     map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            //     var point = new BMap.Point(120.634665, 31.279125);
            //     map.centerAndZoom(point, 19);
            //     var marker = new BMap.Marker(point);  // 创建标注
            //     map.addOverlay(marker);               // 将标注添加到地图中
            //     marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            // }
        }

    }
    
</script>
    
<style>
    .BMap_cpyCtrl,.anchorBL{display:none;}
    .aboutcon .about-t i .sn1 {
        background: url(../../common/stylus/img/custom.png) no-repeat;
    }
    .aboutcon .about-t i .sn2 {
        background: url(../../common/stylus/img/qq.png) no-repeat;
    }
    .aboutcon .about-t i .sn3 {
        background: url(../../common/stylus/img/email.png) no-repeat 0 4px;
    }
    .aboutcon .about-t em {
        width: 120px;
        margin-top: 28px;
        float: left;
    }
    .aboutcon .about-t em b {
        text-align: center;
        font-size: 12px;
        line-height: 36px;
        color: #323232;
    }
    .aboutcon .about-t em:last-child {
        margin-left: 64px;
    }
    .content .aboutcon dd {
        padding: 20px 0;
    }
</style>
