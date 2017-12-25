<template>
    <div class="AboutUSC">
        <div class="bannerBG hzhbBG">
            <div class="aboutUsheadTitle">
                <h1>Partner</h1>
                <h3>合作伙伴</h3>
            </div>
            <ul>
                <li><router-link to="/about/aboutus">关于我们</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/about/newsDynamic">新闻动态</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <li><router-link to="/about/newHands">新手入门</router-link></li>
                <li class="abooutusMenuSel"><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li>
                <li><router-link to="/about/employeeWelfare">员工福利</router-link></li>
            </ul>
        </div>
        <div class="bodygrayBG">
        <div class="newsinfo-intro content">
            <ul class="partnerul">
                <li>
                    <div class="fl" style="">
                        <img src="../../common/stylus/0818new/aboutus_partner_gzyh_img.png" alt="" />
                    </div>
                    <div class="clas-r">
                        <h3>贵州银行</h3>
                        <p>贵州银行股份有限公司于2012年10月11日正式挂牌开业，是以遵义市商业银行、六盘水市商业银行、安顺市商业银行为基础合并重组设立的省级地方法人金融机构，是贵州省委、省政府直接领导下的国有大型企业。截至2017年3月31日，贵州银行资产总额2521.82亿元，全行共有市州分行级机构9个、营业机构209个，实现了全省县域机构全覆盖。在中国银行业协会公布的《2016年中国前100家银行排名》中，贵州银行已跃居第61位。</p>
                    </div>
                </li>
                <li>
                    <div class="fl" style="">
                        <img src="../../common/stylus/0818new/aboutus_partner_zmxy_img.png" alt="" />
                    </div>
                    <div class="clas-r">
                        <h3>芝麻信用</h3>
                        <p>芝麻信用管理有限公司是合法独立的信用评估及信用管理机构，其推出的芝麻信用是面向社会的信用服务体系，依据方方面面的信息，运用大数据及云计算技术客观呈现个人的信用状况，通过连接各种服务，让每个人都能体验信用所带来的价值。芝麻信用输出标准化的身份识别、反欺诈、信用风险识别等产品与服务，为互联网金融公司预防贷前、贷中、贷后等环节的欺诈、逾期风险，提供整套风控解决方案。</p>
                    </div>
                </li>
                <li class="liborderbottom">
                    <div class="fl" style="">
                        <img src="../../common/stylus/0818new/aboutus_partner_pyzx_img.png" alt="" />
                    </div>
                    <div class="clas-r">
                        <h3>鹏元征信</h3>
                        <p>鹏元征信有限公司成立于2005年4月8日，是在国家工商总局注册，经深圳市政府和中国人民银行深圳市中心支行批准设立，专门开展个人征信、企业征信、企业评分、个人评分、征信系统设计开发、软件设计开发和中小企业信用风险控制等业务的征信机构，是深圳市高新技术企业和深圳市双软企业，信息系统安全等级保护为三级。公司已安全从事征信业务超过12年，2015年1月5日，鹏元征信有限公司获得中国人民银行批准开始准备开展个人征信业务。</p>
                    </div>
                </li>
            </ul>
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
</style>
