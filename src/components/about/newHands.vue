<template>
    <div class="AboutUSC">
        <div class="bannerBG slrmBG">
            <div class="aboutUsheadTitle">
                <h1>New to Litong</h1>
                <h3>新手入门</h3>
            </div>
            <ul>
                <li><router-link to="/about/aboutus">关于我们</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/about/newsDynamic">新闻动态</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <li class="abooutusMenuSel"><router-link to="/about/newHands">新手入门</router-link></li>
                <li><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li>
                <li><router-link to="/about/employeeWelfare">员工福利</router-link></li>
            </ul>
        </div>
        <div class="bodygrayBG">
            <div class="newsinfo-intro content">
                <div class="graph">新手入门</div>
                <div class="chge"></div>
                <ul class="newhandsList">
                    <li>
                        <div class="listTitle">
                            注册
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <!-- <p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">个人注册：</span></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">1.进入利通金服官方网站；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">2.在网站首页右上角点击【个人注册】；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">3.填写注册所需信息；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">4.认真阅读《注册及服务协议》和《线上借款及服务协议》，同意协议，点击【快速注册】；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">5.如无推荐人，推荐人手机号码无需填写；</span></strong></p><p><br></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">企业注册：</span></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">1.进入利通金服官方网站；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">2.在网站首页右上角点击【企业注册】；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">3.根据提示信息，填写注册所需信息；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">4.认真阅读《注册及服务协议》和《线上借款及服务协议》，同意协议，点击【快速注册】；</span></strong></p> -->
                                <div class="swiper-container" id="swiper_register">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register2.png" />
                                            <p>第二步：输入手机号密码注册账号</p>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register3.png" />
                                            <p>第三步：注册成功</p>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register1.png" />
                                            <p>第一步：进入利通金服首页，点击注册</p>
                                        </div>
                                    </div>
                                    <!-- Add Pagination -->
                                    <div class="swiper-pagination"></div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="listTitle">
                            认证
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <!-- <p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">1.登录进入个人中心页面；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">2.点击【实名认证】，按要求填写用户名、真实姓名和身份证号码（企业用户需填写：用户名、真实公司名称和统一社会信用代码），点击【提交】；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">3.进入第三方平台，设置第三方账户的登录密码和支付密码，企业用户还需登录注册邮箱获取验证码，点击【确定】，系统会显示你已通过认证；</span></strong></p> -->
                                <div class="swiper-container" id="swiper_authentication">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register5.png" />
                                            <p>第二步：银行存管信息填写</p>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register6.png" />
                                            <p>第三步：个人信息补充</p>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register7.png" />
                                            <p>第四步：开户成功</p>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register8.png" />
                                            <p>第五步：通过存管账户认证</p>
                                        </div>
                                        <div class="swiper-slide">
                                            <img src="/static/img/help_register/help_register4.png" />
                                            <p>第一步：开通银行托管</p>
                                        </div>
                                    </div>
                                    <!-- Add Pagination -->
                                    <div class="swiper-pagination"></div>
                                    <!-- Add Arrows -->
                                    <div class="swiper-button-next"></div>
                                    <div class="swiper-button-prev"></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="listTitle">
                            充值
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <p style="line-height: 2em;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"></span></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;"></span></strong></span></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong>1.充值前，需先完成实名认证；</strong></span></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong>2.进入个人中心页面，点击【充值】，输入充值金额，填写验证码，点击【前往充值】；</strong></span></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong>3.进入第三方平台核对相关信息，并选择要充值的银行，点击【下一步】；</strong></span></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong>4.进入网上银行页面，输入所需信息，充值成功；</strong></span></p><p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong>5.也可选择无卡支付（快捷支付）方式充值；</strong></span></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="listTitle">
                            投资
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">1.进入利通金服官方网站；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">2.注册利通金服账户，并进行实名认证；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">3.点击【我要投资】，浏览利通金服投资项目列表，选择合适的投资项目；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">4.确认投资项目，输入投资金额；&nbsp;</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">5.查看投资项目的详细信息，确认投资的项目符合期望的投资回报率，阅读并同意《借款及服务协议》,确认购买后，系统会提示投资成功；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">6.只有个人账户可进行投资；</span></strong></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="listTitle">
                            借款
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">1.进入利通金服官方网站；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">2.注册利通金服账户，并进行实名认证；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">3.点击【我要借款】，按要求填写借款申请表，阅读并同意相关借款协议，点击确认提交；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">4.等待审核专员与您线下联系；</span></strong></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="listTitle">
                            提现
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">1.提现前，需先绑定银行卡，绑定提现银行卡仅能添加与实名认证信息一致的储蓄卡；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">2.进入个人中心页面，点击【银行卡】，进入绑定银行卡页面，选择要绑定的银行，输入卡号及相关信息，点击【确认提交】，绑定银行卡成功；</span></strong></p><p><strong><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;">3.点击【提现】，选择银行账户，输入提现金额和登录密码，点击【确认提现】，提现成功；</span></strong></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="listTitle">
                            散标
                            <span class="icon-chevron-right"></span>
                        </div>
                        <div class="listDetail">
                            <div class="info" style="display: block;">
                                <p><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 14px;"><strong>通过线下严格审核后提交到线上网站的小额借款申请标，这些标的借款额度、预期年化收益和借款期限均不相同，对应的风险程度也不一样，投资者可以根据自己的承受能力和个人喜好自主地选择合适的标。</strong></span></p>
                            </div>
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
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted () {  
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
            //每条数据的展开与收缩
            $(".newhandsList").delegate("li .listTitle", "click", function () {
                if($(this).siblings(".listDetail").is(":hidden")){
                    $(".listDetail").slideUp(200);
                    $(".icon-chevron-down").removeClass("icon-chevron-down")
                    $(this).find(".icon-chevron-right").addClass("icon-chevron-down")
                    $(this).siblings(".listDetail").slideDown(200);
                } else {
                    $(this).find(".icon-chevron-down").removeClass("icon-chevron-down")
                    $(this).siblings(".listDetail").slideUp(200);
                }
            })
            // 注册流程
            var swiper_register = new Swiper('#swiper_register', {
                // pagination: '.swiper-pagination',
                nextButton: '#swiper_register .swiper-button-next',
                prevButton: '#swiper_register .swiper-button-prev',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true,
                loop: true,
                // autoplay: 3000,
                // autoplayDisableOnInteraction: false,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper，主要是这两行  
                observeParents: true //修改swiper的父元素时，自动初始化swiper  
            });
            
            // 认证流程
            var swiper_authentication = new Swiper('#swiper_authentication', {
                // pagination: '.swiper-pagination',
                nextButton: '#swiper_authentication .swiper-button-next',
                prevButton: '#swiper_authentication .swiper-button-prev',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true,
                loop: true,
                // autoplay: 3000,
                // autoplayDisableOnInteraction: false,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper，主要是这两行  
                observeParents: true //修改swiper的父元素时，自动初始化swiper  
            });
        }
    }
    
</script>
    
<style scoped>
    .swiper-container {
        width: 100%;
    }
  .swiper-slide {
        position: relative;
        text-align: center;
        font-size: 18px;
        background: #fff;
        width: 100%;
        height: 480px;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
  .swiper-slide img{width:100%;cursor: pointer;display: block;position: absolute;top: 0;left: 0;}    
  .swiper-slide p{position: absolute;bottom: 0;left: 0;height: 80px;width: 100%;display: block;line-height: 80px;text-align: center;font-size: 32px;}
</style>
