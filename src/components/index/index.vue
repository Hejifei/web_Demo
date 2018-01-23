<template>
  <div class="hello" >
    <!-- @*轮播*@ -->
    <div class="banner" >
      <div class="bannerwp">
        <div class="indexbanner-txt bannertopbox" v-if="uid == null || uid == ''">
          <h3>预计年化收益率</h3>
          <!-- <div class="InvestmentSumC">
            <span v-for="(totalMoneyList,index) in totalMoneyList" class="numspan" :key="index">{{totalMoneyList.key}}</span>
            万元
          </div> -->
          <div class="expectedRate">6.5%-12%</div>
          <router-link to="/login/registerPersonal" class="bannerbox_registerbtn">注册领888元红包</router-link>
          <i id="promptsonC">
            <div class="swiper-container swiper-container_promptson" id="swiper_proptson">
                <div class="swiper-wrapper swiper-wrapper_promptson">
                    <div  class="swiper-slide" v-for="(promptson,index) in prompt" :key="index" v-html="promptson.desc">
                    </div>
                </div>
            </div>
          </i>
        </div>
        <div class="indexbanner-txt bannertopbox" v-else>
          <div class="bannertopinfoC">
            <div class="baninfotopline clearfix">
              <img class="headimg" :src="accountInfo.avatar" title="头像" />
              <div class="baninfotoplineright">
                <h3>您好：{{accountInfo.realname}}</h3>
                <p><a><span>账户余额</span><span>{{accountInfo.useMoney}}</span></a></p>
              </div>
              <div class="bannerboxmenu">
                <ul>
                  <li><router-link to="/account/recharge">账户充值</router-link></li>
                  <li><router-link to="/account/withdrawals">账户提现</router-link></li>
                  <li><router-link to="/account/investlist">待收散标</router-link></li>
                  <li><router-link to="/account/overview">账户总览</router-link></li>
                </ul>
              </div>
            </div>
          </div>
          <router-link class="bannerbox_registerbtn" to="/account/overview">进入账户</router-link>
          <i></i>
        </div>
      </div>
      <!--主页BANNER滚动图片 -->
      <div class="main">
        <div class="swiper-container" id="swiper-containerBanner">
            <div class="swiper-wrapper" id="swiper-wrapperBanner">
                <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="index" style="width:100%;height:394px;">
                    <a v-if="banner.target == 0" :title="banner.title" :style="{background:'url('+banner.B_Pic+') no-repeat center center',}"></a>
                    <a v-if="banner.target == 1" :title="banner.title" :href="banner.B_Url" target="_blank" v-bind:style="{background:'url('+banner.B_Pic+') no-repeat center center',}"></a>
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
    <div class="index-total"   style="background:#fff;">
        <!-- 平台数据 -->
        <div class="index_datainfoC_top">
            <ul>
                <li>
                    <router-link to="/service/platformdata"><img class="hvr-buzz-out" title="点击查看平台数据" src="../../common/stylus/img/index_platformdata3.png" /></router-link>
                    <span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="platform_totalMoney"
                            :decimals="2"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>
                    <p>累计交易额（元）</p>
                </li>
                <li><router-link to="/service/platformdata"><img class="hvr-buzz-out" title="点击查看平台数据" src="../../common/stylus/img/index_platformdata2.png" /></router-link>
                    <span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="profit"
                            :decimals="2"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>
                    <p>用户收益额（元）</p>
                </li>
                <li><router-link to="/service/platformdata"><img class="hvr-buzz-out" title="点击查看平台数据" src="../../common/stylus/img/index_platformdata1.png" /></router-link>
                    <span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="platformTime"
                            :decimals="0"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>
                    <p>安全运营时间（天）</p>
                </li>
                <li><router-link to="/service/platformdata"><img class="hvr-buzz-out" title="点击查看平台数据" src="../../common/stylus/img/index_platformdata4.png" /></router-link>
                    <span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="totalUser"
                            :decimals="0"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>
                    <p>注册用户数（人）</p>
                </li>
            </ul>
        </div>
    </div>

    <!-- 公告 -->
    <div class="bordcastC">
      <div class="wp">
        <div class="noticeC">
            <ul id="jsfoot01" class="noticTipTxt">
                <li v-for="(newNotice,index) in newNoticeList" :key="index">
                    <router-link v-if="newNotice.type == 0" style="font-weight:bold;" :to="'/about/siteNoticeDetail?id='+newNotice.id+'&respType=json'" target="_blank">{{newNotice.title}}<span>{{newNotice.createTime}}</span></router-link>
                    <router-link v-if="newNotice.type == 1" :to="'/about/siteNoticeDetail?id='+newNotice.id+'&respType=json'" target="_blank">{{newNotice.title}}<span>{{newNotice.createTime}}</span></router-link>
                </li>
            </ul>
            <router-link class="getmoreNotice" to="/about/siteNotice">查看更多<img src="../../common/stylus/0818new/index_goto_normal_btn.png" /></router-link>
        </div>
      </div>
    </div>
    <!-- 首页中间主体 -->
    <div class="index_centerC">
      <div class="index_center">

        <!-- 新的 新人专享标/活动专享 自动投标 私人订制-->
        <div class="index_activeC">
            <div class="active_title">
                <label>精彩活动</label>
                <!-- <span>收益增值 财富不止</span> -->
            </div>
            <div class="new_index_newhandsC">
                <div class="new_index_nhSon">
                    <div class="nh_top" :class="newHandAcitvity.type == 1 ? 'newindex_xrzx' : 'newindex_hdzx'">
                        <h1 v-if="newHandAcitvity.type == 1">新人专享标</h1>
                        <h1 v-if="newHandAcitvity.type == 2">活动专享</h1>
                        <ul>
                            <li>
                                <label v-if="newHandAcitvityInfo.extra_rate == 0"><span>{{newHandAcitvityInfo.base_rate}}</span>%</label>
                                <label v-if="newHandAcitvityInfo.extra_rate > 0"><span>{{newHandAcitvityInfo.base_rate}}</span>%+{{newHandAcitvityInfo.extra_rate}}%</label>
                                <p>预期年化利率</p>
                            </li>
                            <li>
                                <label v-if="newHandAcitvityInfo.termUnit == 1"><span>{{newHandAcitvityInfo.term}}个月</span></label>
                                <label v-if="newHandAcitvityInfo.termUnit == 2"><span>{{newHandAcitvityInfo.term}}天</span></label>
                                <p>投资期限</p>
                            </li>
                            <li><label><span>￥{{newHandAcitvityInfo.limitMoney}}</span></label><p>起投金额</p></li>
                        </ul>
                    </div>
                    <div class="nh_bottom">
                        <router-link v-if="newHandAcitvityInfo.status == 1" :to="'/product/PInfo?id='+newHandAcitvityInfo.id" class="indexact_joinbtn">立即投资</router-link>
                        <router-link v-if="newHandAcitvityInfo.status == 15" :to="'/product/PInfo?id='+newHandAcitvityInfo.id" class="indexact_joinbtn">{{newHandAcitvityInfo.investTime}}开抢</router-link>
                        <a v-if="newHandAcitvityInfo.status != 1 && newHandAcitvityInfo.status != 15" class="activityenda">已结束</a>
                    </div>
                </div>
                <div class="new_index_nhSon">
                    <div class="nh_top newindex_zdtb"></div>
                    <div class="nh_bottom">
                        <router-link to="/service/automaticBid">立即开启</router-link>
                    </div>
                </div>
                <div class="new_index_nhSon">
                    <div class="nh_top newindex_srdz"></div>
                    <div class="nh_bottom">
                        <router-link to="/service/personalTailor">我要定制</router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新的 散标/债权 -->
        <div class="index_activeC">
            <div class="active_title">
                <label>散标/债权</label>
                <!-- <span>自助投资 期限灵活</span> -->
                <router-link  class="normala" to="/product">查看更多<img src="../../common/stylus/0818new/index_goto_normal_btn.png"></router-link>
            </div>
            <div class="index_newproductC" style="position:relative;">
                <!-- <img src="../../common/stylus/img/newyear_4.png" style="position:absolute;left:-328.5px;width:388.5px;height:324px;z-index:1;" /> -->
                <img src="../../common/stylus/img/newyear_3.png" style="position:absolute;left:-230px;top:0;" />
                <div class="newP_left" style="z-index:999;position:relative;">
                    <h1><img src="../../common/stylus/img/newindex_productlogo.png" />生财有道</h1>
                    <ul>
                        <li><a @click="productlistChange(3,0)" class="prolistSel">利房宝<span>{{productType1val}}</span></a></li>
                        <li><a @click="productlistChange(4,1)">利车宝<span>{{productType2val}}</span></a></li>
                        <li><a @click="productlistChange(2,2)">债权转让<span>{{typesPNum.transferNum}}</span></a></li>
                    </ul>
                    <canvas id="waveC"></canvas>
                </div>
                <div class="newP_right" v-if="type == 3 || type == 4">
                    <div v-for="(sblist,index) in projectlist_sblb" v-if="index < 5"  :key="index" class="newP_detailC">
                        <h3>
                            <router-link :to="'/product/PInfo?id='+sblist.id">
                                <img :src="sblist.img"/>  
                                {{sblist.title}} 
                                <span title="此标的可使用红包" v-if="sblist.is_reward == 1" >红包</span>
                                <span title="此标的可使用加息券" v-if="sblist.is_extraRate == 1">加息券</span>
                                <span title="此为新手专享标" v-if="sblist.is_new == 1">新手</span>
                                <span title="此为私人定制" v-if="sblist.isCustomized == 1">私人</span> 
                            </router-link>
                        </h3>
                        <ul>
                            <li>
                                <label title="预计年利率" v-if="sblist.extra_rate == 0" class="redlabel"><span>{{sblist.base_rate}}</span>%</label>
                                <label title="预计年利率" v-if="sblist.extra_rate > 0" class="redlabel"><span>{{sblist.base_rate}}</span>%+{{sblist.extra_rate}}%</label>
                            </li>
                            <li>
                                <label title="期限" v-if="sblist.termUnit == 1"><span>{{sblist.term}}</span>个月</label>
                                <label title="期限" v-if="sblist.termUnit == 2"><span>{{sblist.term}}</span>天</label>
                            </li>
                            <li>
                                <label title="金额"><span>{{sblist.money}}</span>元</label>
                            </li>
                            <li>
                                <label title="募集进度">
                                    <div class="processC">
                                        <!-- <i v-bind:style="{width:sblist.progress +'%'}"></i> -->
                                        <i :id="sblist.id"></i>
                                    </div>
                                    <div class="processText">{{sblist.progress}}%</div>
                                </label>
                            </li>
                            <li>
                                <router-link title="立即投资" v-if="sblist.status == 1" :to="'/product/PInfo?id='+sblist.id">立即投资</router-link>
                                <a v-if="sblist.status == 6" class="projectEndbtn">投资满额</a>
                                <a v-if="sblist.status == 8" class="projectEndbtn">正在还款</a>
                                <a v-if="sblist.status == 9" class="projectEndbtn">已还款</a>
                                <a v-if="sblist.status == 10" class="projectEndbtn">已结束</a>
                                <a v-if="sblist.status == 11" class="projectEndbtn">已失效</a>
                                <a v-if="sblist.status == 13" class="projectEndbtn">出借结束</a>
                                <router-link v-if="sblist.status == 15" :to="'/product/PInfo?id='+sblist.id">{{sblist.investTime}}开抢</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="newP_right" v-if="type == 2">
                    <div v-for="(sblist,index) in projectlist_sblb" v-if="index < 5"  :key="index" class="newP_detailC">
                        <h3>
                            <router-link :to="'/product/transPInfo?id='+sblist.id+'&transfer_id='+sblist.transfer_id">
                                <img :src="sblist.img"/>  
                                {{sblist.title}} 
                                <span title="此标的可使用红包" v-if="sblist.is_reward == 1" >红包</span>
                                <span title="此标的可使用加息券" v-if="sblist.is_extraRate == 1">加息券</span>
                                <span title="此为新手专享标" v-if="sblist.is_new == 1">新手</span>
                                <span title="此为私人定制" v-if="sblist.isCustomized == 1">私人</span> 
                            </router-link>
                        </h3>
                        <ul>
                            <li>
                                <label class="redlabel"><span>{{sblist.rate}}</span>%</label>
                                <p>预计年利率</p>
                            </li>
                            <li>
                                <label><span>{{sblist.transferTerm}}</span>个月</label>
                                <p >剩余期限</p>
                            </li>
                            <li>
                                <label title="金额" style="text-align:center;"><span>{{sblist.self_money}}</span>元</label>
                                <p>原本金</p>
                            </li>
                            <li>
                                <label><span>{{sblist.transfer_money}}</span>元</label>
                                <p>转让金额</p>
                            </li>
                            <li>
                                <router-link v-if="sblist.transfer_status == 1" :to="'/product/transPInfo?id='+sblist.id+'&transfer_id='+sblist.transfer_id">立即承接</router-link>
                                <a v-if="sblist.transfer_status == 2" class="projectEndbtn">转让结束</a>
                                <a v-if="sblist.transfer_status == 3" class="projectEndbtn">再次转让</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <div class="index_activeC">
            <div class="active_title">
                <label>平台保障</label>
                <!-- <span>企业成熟 安全保障</span> -->
                <router-link  class="normala" to="/about/platform">查看更多<img src="../../common/stylus/0818new/index_goto_normal_btn.png"></router-link>
            </div>
            <div class="index_datainfoC clearfix">
                <div class="indexdataC">
                    <img src="../../common/stylus/0818new/index_yhcg_icon.png"/>
                    <div class="index_yhcgC">
                        <label><router-link to="/service/bankDeposit">银行存管</router-link></label>
                        <p>交易资金通过汇付天下流转<br />保障用户资金安全</p>
                    </div>
                </div>
                <div class="indexdataC">
                    <img src="../../common/stylus/0818new/index_aqbz_icon.png" />
                    <div class="index_yhcgC">
                        <label><router-link to="/service/insurance">安全保障</router-link></label>
                        <p>借款人资质经四重保障<br />用户利益保障机制</p>
                    </div>
                </div>
                <div class="indexdataC">
                    <img src="../../common/stylus/0818new/index_assets_icon.png" />
                    <div class="index_yhcgC">
                        <label><router-link to="/product">优质资产</router-link></label>
                        <p>
                            为您精选优质资产  <br />收益稳健相伴
                        </p>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- @*合作伙伴*@ -->
        <div class="index_activeC">
            <div class="active_title">
                <label>合作伙伴</label>
                <!-- <span>一路有你 相知相依</span> -->
            </div>
            <div class="index_activityC clearfix">
                <ul class="index_partnerlist clearfix">
                    <li><a target="_blank" href="http://www.bgzchina.com/"><img title="贵州银行" src="../../common/stylus/img/gzyh.png" /></a></li>
                    <li><a target="_blank" href="https://www.tongdun.cn"><img title="同盾科技" src="../../common/stylus/img/tdkj.png" /></a></li>
                    <li><a target="_blank" href="http://www.chinapnr.com/"><img title="汇付天下" src="../../common/stylus/img/hftx.png" /></a></li>
                    <li><a target="_blank" href="http://www.pycredit.cn"><img title="鹏元征信" src="../../common/stylus/img/pyzx.png" /></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import LTJF from '../../common/js/ltjf.js';
import ICountUp from 'vue-countup-v2';
export default {
    data () {
        return {
            uid: "",
            sid:"",
            UnreadMsg:[],
            accountInfo: '',
            bannerList: [],
            newNoticeList: [],
            newHandAcitvity: [],
            newHandAcitvityInfo:[],
            projectlist_sblb: [],
            cooperationList: [],
            statistics: [],
            platformTime:0,
            totalMoney:'',
            platform_totalMoney:0,
            profit:0,
            totalUser:0,
            totalMoneyList:'',
            type:3,
            typesPNum:[],
            prompt:[],
            productInfoNum:[],
            productType1val:0,
            productType2val:0,
            options: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            }
        }
    },
    created() {
            let self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            //验证是否登陆
            self.uid = localStorage.uid;
            self.sid = localStorage.sid;
            if (self.uid != null && self.uid != '') {
                //如果已登陆获取账户信息,验证是否有未读信息
                self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
                    self.accountInfo = data.data;
                    self.UnreadMsg = data.data.unreadMsg;
                }, '');
            }else{
                // 首页提示
                self.$store.state._ajax(self,'/api/product/statistics', {isPrompt:1}, function (data) {
                    self.prompt = data.data.prompt;
                    setTimeout(function () {
                        var swiper_prompt = new Swiper('#swiper_proptson', {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            centeredSlides: true,
                            paginationClickable: true,
                            loop: true,
                            autoplay: 1,
                            speed:6000,
                            autoplayDisableOnInteraction: false,
                            freeMode: true
                        });
                    },10)
                }, function(){});
            }

            //获取统计资金
            this.$store.state._ajax(self,'/api/product/statistics', {}, function (data) {
                var statistics = data.data;
                self.platformTime = parseFloat(statistics.platformTime);
                self.platform_totalMoney =parseFloat(statistics.totalMoney);
                self.profit = parseInt(statistics.profit);
                self.totalUser = parseInt(statistics.totalUser);

                statistics.totalMoney = parseInt(statistics.totalMoney / 10000);
                var totalMoneylist = [];
                totalMoneylist.push({'key':Math.floor(statistics.totalMoney / 1000)})
                totalMoneylist.push({'key':Math.floor((statistics.totalMoney % 1000) / 100)})
                totalMoneylist.push({'key':Math.floor((statistics.totalMoney % 100) / 10)})
                totalMoneylist.push({ 'key': Math.floor(statistics.totalMoney % 10) })
                self.totalMoneyList = totalMoneylist;
                self.statistics = data.data;
            });
            //轮播获取
            this.$store.state._ajax(self,'/api/index/getBanner', {}, function (data) {
                self.bannerList = data.data;
                //轮播初始化
                setTimeout(function () {
                    var swiper0 = new Swiper('#swiper-containerBanner', {
                        pagination: '#swiper-containerBanner .swiper-pagination',
                        nextButton: '#swiper-containerBanner .swiper-button-next',
                        prevButton: '#swiper-containerBanner .swiper-button-prev',
                        slidesPerView: 1,
                        paginationClickable: true,
                        spaceBetween: 0,
                        loop: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false
                    });
                },10)
            }, '', false);
            //公告栏信息获取
            this.$store.state._ajax(self,'/api/index/getTop', {}, function (data) {
                var newNoticeList = data.data.newNotice;
                for (var i = 0; i < newNoticeList.length; i++) {
                newNoticeList[i].createTime = (newNoticeList[i].createTime).substr(0, 16);
                }
                self.newNoticeList = newNoticeList;
            });
            //公告自动滚动
            setInterval(function(){
                $('.noticeC').find("#jsfoot01:first").animate({
                    marginTop: "-50px"
                }, 3000, function () {
                    $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
                });
            }, 3000);
            //新手标
            this.$store.state._ajax(self,'/api/index/newActive', {}, function (data) {
                var newHandAcitvity = data.data;
                newHandAcitvity.info.limitMoney = parseInt(newHandAcitvity.info.limitMoney);
                newHandAcitvity.info.extra_rate = Number(newHandAcitvity.info.extra_rate);
                newHandAcitvity.info.investTime = (newHandAcitvity.info.investTime).substr(11,5);
                self.newHandAcitvity = newHandAcitvity;
                self.newHandAcitvityInfo = newHandAcitvity.info;
            });
            
            // 重新获取各类标的数量
            LTJF.$emit("NumberChage",1);
            //散标、债权
            self.productlistChange(3,0);
            // 各类标数据条数获取
            self.productNumget();
            ////合作伙伴信息获取
            // this.$store.state._ajax(self,'/api/open/cooperation', {}, function (data) {
            //     self.cooperationList = data.data;
            // });
    },
    mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(0).find("a").addClass("router-link-exact-active");

            // 波浪动画
            this.$store.state.wave();
    },
    methods:{
        logincheckhref:function(href){
            this.$store.state.logincheckhref(href,this)
        },
        callback: function(ins) {
            ins.update(ins.endVal + 100);
        },
        developing:function(){
            layer.msg('即将上线，敬请期待！');
        },
        productlistChange:function(_type,_index){
            var self = this;
            
            //散标/债券数据获取
            self.$store.state._ajax(self,'/api/product/index',
            {
                page: 1,
                type: _type,
                keywords:'',
                sorting: ''
            },
            function (data) {
                var projectlist_sblb = data.data.data;
                if(data.data.data.length > 0 && _type != 2){
                    for (var i = 0; i < projectlist_sblb.length; i++) {
                        projectlist_sblb[i].investTime = (projectlist_sblb[i].investTime).substr(11,5);
                        projectlist_sblb[i].progress = Math.floor(projectlist_sblb[i].progress);
                        projectlist_sblb[i].extra_rate = Number(projectlist_sblb[i].extra_rate);
                    }
                }
                self.projectlist_sblb = projectlist_sblb;

                self.type = _type;
                $(".prolistSel").removeClass("prolistSel");
                $(".index_newproductC .newP_left ul li:eq("+_index+")").find("a").addClass("prolistSel");
                // sblist.progress
                setTimeout(function() {
                    if(data.data.data.length > 0 && _type != 2){
                        for (var i = 0; i < projectlist_sblb.length; i++) {
                            if(projectlist_sblb[i].progress > 0){
                                $("#"+projectlist_sblb[i].id+"").css("width",0);    
                                $("#"+projectlist_sblb[i].id+"").animate({
                                    width : projectlist_sblb[i].progress
                                },1000);
                            }else{
                                $("#"+projectlist_sblb[i].id+"").css("width",projectlist_sblb[i].progress)    
                            }
                            
                        }
                    }
                }, 500);
            });
        },
        productNumget:function(){
            var self = this;
            var getNumdata = JSON.parse(localStorage.getNum);
            self.typesPNum = getNumdata;
            self.productInfoNum = getNumdata.productInfo;
            self.productType1val = getNumdata.productInfo.home;
            self.productType2val = getNumdata.productInfo.car;
            //散标、债权
            if(self.productInfoNum.home > 0){
            }else if(self.productInfoNum.car > 0){
                self.productlistChange(4,1);
            }else if(self.productInfoNum.transferNum > 0){
                self.productlistChange(2,2);
            }else{
            }
        }
    }, 
    components:{
      ICountUp
  	} 
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .swiper-container {
        width: 100%;
        min-width:1050px;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
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
    .swiper-slide a{width:100%;height:394px;display:block;}

    .iCountUp {
        font-size: 12em;
        margin: 0;
        color: #4d63bc;
    }
</style>
