<template>
  <div class="hello">
    <!-- 银行限额 -->
    <transition name="fade">
        <div id="ContactC" v-if="ContactC_show" @click="modehide($event)">
            <div id="Contact">
                <div class="Contact_box">
                    <div class="cancelmodelbtn" @click="ContactC_show = !ContactC_show"><span class="icon-remove"></span></div>
                    <div class="Contact_head">
                        支持银行及限额
                    </div>
                    <div class="Contact_body">
                        <div class="sqbody">
                            <div class="sqbodyson">
                                <table class="model_table">
                                    <thead>
                                        <tr>
                                            <td>银行名称</td>
                                            <td>单笔限额(元)</td>
                                            <td>每日限额(元)</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(bankcard,index) in bankcardlimitList" :key='index'>
                                        <td><img :src="bankcard.logo" />{{bankcard.name}}</td>
                                        <td>{{bankcard.limit}}</td>
                                        <td>{{bankcard.daylimit}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    
    <!-- 借款详细图片 -->
    <div class="PhotoMagnifyC" id="PhotoMagnifyC" v-show="PhotoMagnifyC" @click="swiperBighide($event)">
        <div class="PhotoMagnify" id="PhotoMagnify">
            <a class='cancelx' @click="swiperBighide2"><span class="icon-remove"></span></a>
            <div class="swiper-container" id="swiper-containerBig">
                <div class="swiper-wrapper">
                    <div v-for="(picture,index) in picturecontent"  :key='index' class="swiper-slide">
                        <img :src="picture" />
                        <img class="Authenticatedimg" src="../../common/stylus/img/Authenticated.png" />
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
    <div class="index_centerC">
        <div class="index_center projectListC">
            <div class="projectInfoC">
                <div class="graph pad30">
                    <img :src="productDetail.img"/>
                    {{productDetail.title}}
                    <span title="此标的可使用红包" v-if="productDetail.is_reward == 1" class="ptitlelogo">红包</span>
                    <span title="此标的可使用加息券" v-if="productDetail.is_extraRate == 1" class="ptitlelogo">加息券</span>
                    <span title="此为新手专享标" v-if="productDetail.is_new == 1" class="ptitlelogo">新手</span>
                    <span title="此为私人定制标" v-if="productDetail.isCustomized == 1" class="ptitlelogo">私人定制</span>
                    
                    <a v-if="productDetail.follow == 0" @click="follow" class="redBtn">关注</a>
                    <a v-if="productDetail.follow == 1" @click="follow" class="redBtn followed">已关注</a>
                </div>
                <div class="chge"></div>
                <div class="clearfix">
                    <div class="projectInfo_headleft">
                        <ul class="clearfix">
                            <li>
                                <p><span>{{productDetail.money}}</span>元</p>
                                <p>标的总额</p>
                            </li>
                            <li>
                                <p v-if="productDetail.extra_rate == 0"><span>{{productDetail.base_rate }}</span>%</p>
                                <p v-if="productDetail.extra_rate > 0"><span>{{productDetail.base_rate }}%</span>+{{productDetail.extra_rate}}%</p>
                                <p>预期年化收益率</p>
                            </li>
                            <li>
                                <p v-if="productDetail.termUnit == 1"><span>{{productDetail.term}}</span>个月</p>
                                <p v-if="productDetail.termUnit == 2"><span>{{productDetail.term}}</span>天</p>
                                <p>还款期限</p>
                            </li>
                        </ul>
                        <div class="projectInfoLine">
                            <span><label>发标日期</label>{{productDetail.investTime}}</span>
                            <span><label>起息日期</label>{{productDetail.repayDate}}</span>
                        </div>
                        <div class="projectInfoLine">
                            <span class="projectprocessC">
                                <label>投标进度</label>
                                <div class="processline">
                                    <i v-bind:style="{width:productDetail.progress +'%'}"></i>
                                </div>
                                <label class="processtext">{{productDetail.progress}}%</label>
                            </span>
                        </div>
                        <div class="projectInfoLine">
                            <span v-if="productDetail.repay_type == 0"><label>还款方式</label>每月付息，到期还本</span>
                            <span v-if="productDetail.repay_type == 1"><label>还款方式</label>按月等额 </span>
                            <span v-if="productDetail.repay_type == 2"><label>还款方式</label>到期还本付息</span>
                            <span v-if="productDetail.repay_type == 3"><label>还款方式</label>等额本息</span>
                            <span v-if="productDetail.repay_type == 4"><label>还款方式</label>等额本金</span>
                            <!-- <span style="width:auto;padding-right:25px;"><label>投资笔数</label>{{investPnum}}</span> -->
                            <span style="width:auto;padding-right:20px;"><label>剩余金额</label>{{productDetail.amount}}元</span>
                        </div>
                    </div>
                    <div class="projectInfo_headright"  id="AjaxForm">
                        <div class="projectmoneyleft">
                            <label>可投金额</label><span>{{productDetail.availableAmount}}</span>元
                            <router-link class="fr" v-if="uid != null" to="/account/recharge">充值</router-link>
                        </div>
                        <!-- <div class="projectmoneyleft mymoneyleft" v-if="uid == null">
                            <label>可投金额</label> <span></span><router-link style="margin-top: 5px;" to="/login">登录查看</router-link>
                        </div> -->
                        <label class="mymoneyleft">
                            账户余额 
                            <span v-if="uid != null">{{accountInfo.useMoney}}元</span>
                            <span v-if="uid == null"><router-link class="logina" style="margin-top: 5px;" to="/login">登录</router-link>后查看</span>
                            <label>预计收益 <span>{{expcetedIncom}}元</span></label>
                            <!-- <router-link to="/account/recharge">充值</router-link> -->
                        </label>
                        <!-- <label v-if="uid == null" class="mymoneyleft">账户余额 <span></span><router-link  to="/login">登录查看</router-link></label> -->
                        <input v-focus maxlength="8" class="form-submit" type="text" name="money" @keyup="moneyChange" v-model="money" id="money" :placeholder="'最低'+productDetail.mini_money+'元起投'" />
                        <!-- <input maxlength="8" class="form-submit" type="text" name="money" @onkeyup="moneyChange" v-model="money" :placeholder="'最低'+productDetail.mini_money+'元起投'"  /> -->
                        <div class="awardSelLine"  v-if="uid != null">
                            <span class="spanredpackage"></span>
                            <label>理财红包</label>
                            <select v-if="redPackageList.length ==0" class="form-submit" name="vocherId" id="vocherId"  v-on:change="redpackageSel" disabled>
                                <option reMoney ="0" minMoney='0' value="">没有可用</option>
                            </select>
                            <select v-if="redPackageList.length !=0" class="form-submit" name="vocherId" id="vocherId"  v-on:change="redpackageSel">
                                <option reMoney ="0" minMoney='0' selected value="">请选择红包</option>
                                <option v-for="(redPackage,index) in redPackageList" :key="index" :minMoney="redPackage.minMoney" :reMoney="redPackage.money" :value="redPackage.id">{{redPackage.source}}：￥{{redPackage.money}}（最小起投金额：￥{{redPackage.minMoney}}）</option>
                            </select>
                        </div>
                        <div class="awardSelLine"  v-if="uid != null">
                            <span class="spanRatecoupon"></span>
                            <label>加息券</label>
                            <select v-if="CouponList.length ==0" class="form-submit" name="useRateId" id="useRateId" v-on:change="couponSel" disabled>
                                <option reMoney="0" minMoney="0" value="">没有可用</option>
                            </select>
                            <select v-if="CouponList.length !=0" class="form-submit" name="useRateId" id="useRateId" v-on:change="couponSel" style="margin-right:20px;">
                                <option reMoney="0" minMoney="0" selected value="">请选择加息券</option>
                                <option v-for="(coupon,index) in CouponList" :key="index" v-if="coupon.minMoney" :minMoney="coupon.minMoney" :reMoney="coupon.money" :value="coupon.id">{{coupon.source}}：+{{coupon.money}}%（最小起投金额：￥{{coupon.minMoney}}）</option>
                            </select>
                        </div>
                        <div class="awardunlogin" v-if="uid == null"><router-link style="margin-top: 5px;" to="/login">登录</router-link>查看我的奖券</div>
                        <div class="investActline">实际投资金额{{actualmoney}}元</div>
                        <router-link v-if="uid == null" class="redBtn buynowBtn" to="/login" style="margin-bottom:46px;">立即登录</router-link>
                        <a v-if="productDetail.status == 1 && uid != null" class="redBtn buynowBtn" v-on:click="buynow">立即投资</a>
                        <a v-if="productDetail.status == 6 && uid != null" class="redBtn buynowBtn graybtn">投资满额</a>
                        <a v-if="productDetail.status == 8 && uid != null" class="redBtn buynowBtn graybtn">正在还款</a>
                        <a v-if="productDetail.status == 9 && uid != null" class="redBtn buynowBtn graybtn">已还款</a>
                        <a v-if="productDetail.status == 10 && uid != null" class="redBtn buynowBtn graybtn">已结束</a>
                        <a v-if="productDetail.status == 11 && uid != null" class="redBtn buynowBtn graybtn">已失效</a>
                        <a v-if="productDetail.status == 13 && uid != null" class="redBtn buynowBtn graybtn">出借结束</a>
                        <a v-if="productDetail.status == 15 && uid != null" class="redBtn buynowBtn graybtn" style="color:#fff;">{{productDetail.ready_time}}</a>
                        <div class="xieyiline"  v-if="uid != null">
                            <label v-if="productDetail.status == 1"><input class="required agreement" type="checkbox" checked />我已阅读并同意<a :href="loanxieyi" target="_blank">《借款及服务协议》</a></label>
                            <label v-if="productDetail.status != 1" style="height:46px;display:block;"></label>
                            <input class="moneyinput form-submit" type="hidden" name="proId" :value="productId" />
                            <input class="moneyinput form-submit" type="hidden" value="" name="type" />
                            <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                            <input class="moneyinput form-submit" v-model="sid" type="hidden" name="sid" />
                            <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret"/>
                        </div>
                        <a class="redBtn" style="display:none;" id="SubmitBtn"  >确认投资</a>
                    </div>
                </div>
            </div>
            <div class="projectDetailBody">
                <div class="awardListC width33">
                    <ul class="oldul">
                        <li @click="projectInfoSel($event,0)" class="awardList_active">项目详情</li>
                        <li @click="projectInfoSel($event,1)" >投资记录({{investPnum}})</li>
                        <li @click="projectInfoSel($event,2)" >回款计划</li>
                    </ul>
                </div>
                <div class="projectInfoListC">
                    <!-- @*项目详情*@ -->
                    <div class="projectDetailC">
                        <h3>借款标的信息</h3>
                        <table>
                            <tbody>
                                <tr><td>借款金额</td><td>{{productDetail.money}} 元</td><td>借款期限</td>
                                    <td v-if="productDetail.termUnit == 1">{{productDetail.term}}个月</td>
                                    <td v-if="productDetail.termUnit == 2">{{productDetail.term}}天</td>
                                </tr>
                                <tr>
                                    <td>借款利率</td>
                                    <td v-if="productDetail.extra_rate == 0">{{productDetail.base_rate}}%</td>
                                    <td v-if="productDetail.extra_rate > 0">{{productDetail.base_rate}}%+{{productDetail.extra_rate}}%</td>
                                    <td>加入条件</td>
                                    <td>{{productDetail.mini_money}} 元起投</td>
                                </tr>
                                <tr><td>发标日期</td><td>{{productDetail.investTime}}</td><td>起息日期</td><td>{{productDetail.repayDate}}</td></tr>
                                <tr>
                                    <td>还款方式</td>
                                    <td v-if="productDetail.repay_type == 0">每月付息，到期还本</td>
                                    <td v-if="productDetail.repay_type == 1">按月等额</td>
                                    <td v-if="productDetail.repay_type == 2">到期还本付息</td>
                                    <td v-if="productDetail.repay_type == 3">等额本息</td>
                                    <td v-if="productDetail.repay_type == 4">等额本金</td>
                                    <td>借款用途</td>
                                    <td>{{productDetail.borrowUse}}</td>
                                </tr>
                                <tr>
                                    <td>优惠政策</td>
                                    <td colspan="3">
                                        
                                        <span class="unuescolor" v-if="productDetail.is_reward == 0"><img src="../../common/stylus/0818new/Invest_redpackageunused.png"/> 红包不可用</span>
                                        <span class="canusecolor" v-if="productDetail.is_reward == 1"><img src="../../common/stylus/0818new/Invest_redpackage.png"/> 红包可用</span>，
                                        
                                        <span class="unuescolor" v-if="productDetail.is_extraRate == 0"><img src="../../common/stylus/0818new/Invest_Ratecouponunused.png"/> 加息券不可用</span>
                                        <span class="canusecolor" v-if="productDetail.is_extraRate == 1"><img src="../../common/stylus/0818new/Invest_Ratecoupon.png"/> 加息券可用</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 v-if="user_type == 0">个人基本信息</h3>
                        <!-- <table v-if="user_type == 0">
                            <tbody id="personbaseInfo">
                                <tr><td>姓名</td><td>{{BorrowerInfo.realname}}</td><td>年龄</td><td>{{BorrowerInfo.age}}</td></tr>
                                <tr id="sextr"><td>性别</td><td>{{BorrowerInfo.sex}}</td><td>{{authInfo1}}</td><td v-if="authInfo1 !== ''">已认证</td></tr>
                                <tr><td>{{authInfo2}}</td><td v-if="authInfo2 !== ''">已认证</td><td>{{authInfo3}}</td><td v-if="authInfo3 !== ''">已认证</td></tr>
                                <tr><td>{{authInfo4}}</td><td v-if="authInfo4 !== ''">已认证</td></tr>
                            </tbody>
                        </table> -->
                        <h3 v-if="user_type == 1">企业基本信息</h3>
                        <!-- <table v-if="user_type == 1">
                            <tbody id="personbaseInfo">
                                <tr><td>企业名称</td><td>{{BorrowerInfo.companyName}}</td><td>企业法人</td><td>{{BorrowerInfo.realname}}</td></tr>
                                <tr><td>公司类型</td><td>{{BorrowerInfo.companyNature}}</td><td>{{authInfo1}}</td><td v-if="authInfo1 !== ''">已认证</td></tr>
                                <tr><td>{{authInfo2}}</td><td v-if="authInfo2 !== ''">已认证</td><td>{{authInfo3}}</td><td v-if="authInfo3 !== ''">已认证</td></tr>
                                <tr><td>{{authInfo4}}</td><td v-if="authInfo4 !== ''">已认证</td></tr>
                            </tbody>
                        </table> -->
                        <table>
                            <tbody id="personbaseInfo" v-html="BorrowerInfonew"></tbody>
                        </table>
                        <h3>风控措施</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>风险等级</td>
                                    <td colspan="3">
                                        <p>{{productrisking.dangerLevel}} <a class="getmoredangerLevel" @click="getdangerLevel">（点击查看风险等级详情）</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>还款来源</td>
                                    <td colspan="3">
                                        <p>{{productrisking.repaySource}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>保障方式</td>
                                    <td colspan="3">
                                        <p>{{productrisking.securityInfo}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>征信信息</td>
                                    <td colspan="3">
                                        <p v-for="(creditInfo,index) in productrisking.creditInfo" :key='index'>{{creditInfo}}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 v-if="productDetail.otherInfo != ''">其他信息</h3>
                        <table v-if="productDetail.otherInfo != ''">
                            <tbody>
                                <tr>
                                    <td colspan="4">
                                        <p style="color: #323232;font-size: 14px;">{{productDetail.otherInfo}}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>借款详细图片</h3>
                        <!-- Swiper -->
                        <div class="swiper-container" id="swiper-containerSmall">
                            <div class="swiper-wrapper">
                                <div v-for="(picture,index) in picturecontent" @click="swiperBig(index)"  :key='index' class="swiper-slide">
                                    <img :src="picture" />
                                    <img class="Authenticatedimg" src="../../common/stylus/img/Authenticated.png" />
                                </div>
                            </div>
                            <!-- Add Pagination -->
                            <div class="swiper-pagination"></div>
                            <!-- Add Arrows -->
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>

                        <h3>银行限额<a v-on:click="ContactC_show = !ContactC_show" class="getmoreBank">查看更多<span class="icon-double-angle-right"></span></a></h3>
                        <img class="banklimitimg" src="/static/img/bank_limit.png"/>
                    </div>
                    <!-- @*投资记录*@ -->
                    <div class="projectDetailC">
                        <table class="investmentTab">
                            <thead>
                                <tr><td>出借人手机号</td><td>出借金额</td><td>出借时间</td></tr>
                            </thead>
                            <tbody>
                                <tr v-for="(res,index) in investment.res" :key='index'>
                                    <td>
                                        <img class="logoimg" v-if="res.isApp == 1" src="../../common/stylus/img/mobile.png" style="margin-right:5px;" title="手机投标" />
                                        <img class="logoimg" v-if="res.isApp == 0" src="../../common/stylus/img/pc.png" style="margin-right:5px;" title="PC投标" />
                                        <img class="logoimg" v-if="res.isApp == 2" src="../../common/stylus/img/Automaticbid.png" style="margin-right:5px;" title="自动投标" />
                                        {{res.mobile}}
                                    </td>
                                    <td>{{res.UP_Money}} 元</td>
                                    <td>{{res.UP_CreateTime}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- @*回款计划*@ -->
                    <div class="projectDetailC">
                        <table class="investmentTab repayPlanTab">
                            <thead>
                                <tr><td>期次</td><td>计划收款日</td><td>应收本金</td><td>应收收益</td><td>应收总额</td></tr>
                            </thead>
                            <tbody>
                                <tr v-for="(repayplan,index) in repayPlan" :key='index'>
                                    <td>{{repayplan.period}}</td>
                                    <td>{{repayplan.repay_time}}</td>
                                    <td>{{repayplan.self_money}} 元</td>
                                    <td>{{repayplan.month_repay_money}} 元</td>
                                    <td>{{repayplan.repay_money}} 元</td>
                                </tr>
                            </tbody>
                        </table>
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
            uid:'',
            productDetail: [],
            accountInfo:[],
            BorrowerInfo:[],
            BorrowerInfonew:'',
            picturecontent:[],
            productrisking:[],
            investment:[],
            investPnum:0,
            repayPlan: [],
            productId: '',
            money:'',
            bankcardlimitList:'',
            PhotoMagnifyC:false,
            loanxieyi:'',
            redPackageList:[],
            CouponList:[],
            ret:0,
            sid:'',
            actualmoney:0,
            risk:0,
            user_type:0,
            authInfo1:'',
            authInfo2:'',
            authInfo3:'',
            authInfo4:'',
            ContactC_show:false
        }
    },
    created() {
        var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            // console.log('id: ' + this.$route.params.id);
            self.sid = localStorage.SID;
            var idGet = this.getUrl(location.href).id;
            self.productId = idGet;
            if (idGet == undefined || idGet == null || idGet == '') {
                self.$router.push({path:"/product"}) 
            }
            //手动投标接口的ret参数为14
            if (this.ifRegular == 0) {
                self.ret = 14;
            } else {
                self.ret = 140;
            }
            //验证是否登陆
            self.uid = localStorage.uid;
            // 如果登录
            if (localStorage.uid != null && localStorage.uid != '') {
                // 余额查询
                self._ajax(self,'/api/account/index', {}, function (data) {
                    self.accountInfo = data.data;
                });
                //借款及服务协议
                self._ajax(self,'/api/loan/contract', {respType : 'json',contractType : 1}, function (data) {self.loanxieyi=data.data;},'');
                //可用红包获取
                self.RewardgetList(1,1);
                self.RewardgetList(2,1);
            }
            //产品详情信息获取
            self._ajax(self,'/api/product/detail', { id: idGet }, function (data) {
                //console.log(data.data)
                var productdetail=data.data;
                var ready_time = productdetail.investTime;
                // productDetail.ready_time
                var investdate =self.unixChange(new Date((ready_time).substr(0,10)));
                var date = self.unixChange(new Date());
                ready_time =(date < investdate) ? "即将发布" : ((ready_time).substr(11,5)+' 开抢');
                productdetail.ready_time = ready_time;
                productdetail.investTime = productdetail.investTime.substr(0, 10);
                productdetail.progress = Math.floor(productdetail.progress);
                productdetail.extra_rate = Number(productdetail.extra_rate);
                self.productDetail = productdetail;
                self.risk = parseInt(data.data.risk);
                self.user_type = data.data.user_type;
            });
            //借款人信息获取
            self._ajax(self,'/api/product/docInfo', { id: idGet }, function (data) {
                self.BorrowerInfo = data.data;
                self.picturecontent =  data.data.picture.content;
                let newObj= (data.data.authInfo).reduce((a,b) => {
                    let key = b.sort;
                    if(a[key]){
                        key = parseFloat(Number(key) * 1.1).toFixed(1);
                    }
                    a= Object.assign(a,{[key]:[b]})
                    return a;
                },{})
                let newObjlist = [];
                for(let a in newObj){
                    newObjlist.push(parseFloat(a));
                }
                newObjlist = newObjlist.sort();
                var newarr = newObjlist.map((x)=>newObj[x]);
                let temp='';
                for(let b in newarr){
                    temp  += ((b % 2 === 0) ? `<tr><td>${newarr[b][0].title}</td><td>${newarr[b][0].content}</td>` : `<td>${newarr[b][0].title}</td><td>${newarr[b][0].content}</td></tr>`)
                }
                 self.BorrowerInfonew = temp;
                setTimeout(function(){
                    var swiper1 = new Swiper('#swiper-containerSmall', {
                        pagination: '#swiper-containerSmall .swiper-pagination',
                        nextButton: '#swiper-containerSmall .swiper-button-next',
                        prevButton: '#swiper-containerSmall .swiper-button-prev',
                        slidesPerView: 3,
                        paginationClickable: true,
                        spaceBetween: 30,
                        freeMode: false,
                        loop: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false
                    });
                    var swiper2 = new Swiper('#swiper-containerBig', {
                        pagination: '#swiper-containerBig .swiper-pagination',
                        nextButton: '#swiper-containerBig .swiper-button-next',
                        prevButton: '#swiper-containerBig .swiper-button-prev',
                        slidesPerView: 1,
                        paginationClickable: true,
                        spaceBetween: 20,
                        freeMode: false,
                        loop: true,
                        effect:'slide', 
                        autoplay: 5000,
                        autoplayDisableOnInteraction: false,
                        observer: true, //修改swiper自己或子元素时，自动初始化swiper，主要是这两行  
                        observeParents: true //修改swiper的父元素时，自动初始化swiper  
                    });
                },10)
            });
            //风控策略获取
            this._ajax(this,'/api/product/risking', {id:idGet}, function (data) {
                var risking= data.data;
                risking.creditInfo = risking.creditInfo.split('；');
                self.productrisking = risking;
                // if(self.productrisking.authInfo.length > 0){
                //     for(var i = 0;i<self.productrisking.authInfo.length;i++){
                //         var authinfonum = 'authInfo'+(i+1);
                //         self[authinfonum] =self.productrisking.authInfo[i].content;
                //     }
                // }
            
            }, '');
                    
            //投资记录获取
            self._ajax(self,'/api/product/investment', { id: idGet }, function (data) {
                var investment = data.data;
                if (investment != null && investment.res.length > 0) {
                    for (var i = 0; i < investment.res.length; i++) {
                    investment.res[i].UP_CreateTime = investment.res[i].UP_CreateTime.substr(0, 19);
                    }
                }
                self.investment = investment;
                self.investPnum = investment.res.length;
            }, '');
            //回款计划获取
            self._ajax(self,'/api/product/repayPlan', { id: idGet }, function (data) {
                // console.log(data)
                var repayPlanlist = data.data;
                if (repayPlanlist.length != 0) {
                    for (var i = 0; i < repayPlanlist.length; i++) {
                    repayPlanlist[i].repay_time = repayPlanlist[i].repay_time == '' ? "--" : repayPlanlist[i].repay_time.substr(0, 10);
                    }
                }
                // repayPlanlist[(repayPlanlist.length - 1)].month_repay_money = parseFloat(parseInt((repayPlanlist[(repayPlanlist.length - 1)].repay_money - repayPlanlist[(repayPlanlist.length - 1)].self_money) * 100) / 100).toFixed(2);
                self.repayPlan = repayPlanlist;
            }, '');

            // 银行限额信息获取
            self._ajax(self,'/api/product/bankLimit', {}, function (data) {
                self.bankcardlimitList = data.data;
            },'');      
    },  
    computed:{
        expcetedIncom:function(){
            var self = this;
            var income = self.caculate(parseInt(self.money), parseInt(self.productDetail.repay_type), parseFloat(self.productDetail.rate), self.productDetail.term, self.productDetail.termUnit)
            // self.redpackageSel();
            return income == 'NaN' ? 0.00 :income;
        }
    },
    mounted:function(){
        var self = this;
        // 顶部菜单添加选中效果
        $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
        $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");
        //提交投资
        self.AjaxSumbit(self,"/", "/api/tender/bid", function (data) {
            if (typeof data.data == "string") {
                var start = data.data.indexOf('<form id="autoRedirectForm"');
                var end = data.data.indexOf('</body>');
                var form = data.data.substr(start, end - start);
                $(form).appendTo('body').submit();
            }
        },'', true)

    },     
    methods:{
        swiperBighide2:function(){
            var self = this;
            self.PhotoMagnifyC = false;
        },
        swiperBig:function(index){
            var self = this;
            self.PhotoMagnifyC = true;
            setTimeout(function(){
                $("#swiper-containerBig .swiper-pagination").find("span").eq(index).click();
            },1)
        },
        swiperBighide:function(e){
            var self = this;
            // 点击空白关闭模态框
            if (e.target.id == "PhotoMagnifyC" && e.target.id != "PhotoMagnify") {
                self.PhotoMagnifyC = false;
            }
        },
        modehide:function(e){
            // 点击空白关闭模态框
            let self = this;            
            if (e.target.id == "ContactC" || e.target.id == "Model") {
                // $("#ContactC").hide();
                self.ContactC_show = !self.ContactC_show;
            }
        },
        projectInfoSel:function(event,index){
            $(".awardList_active").removeClass("awardList_active");
            event.target.setAttribute("class","awardList_active");
            $(".projectDetailC").hide();
            $(".projectDetailC").eq(index).show();
        },
        follow: function (ifright) {
            let self = this;
            this._ajax(this,'/api/product/follow', { id: this.productId }, function (data) {
                self.productDetail.follow = (self.productDetail.follow == 0) ? 1 :0;
            }, '');
        },
        buynow: function () {
            let self = this;
            // console.log(self.risk)
            // risk 风险提示 0未登录1未评测2风险不匹配3风险匹配
            if(self.risk === 0){
                layer.confirm("您还没有登录！",{title: '操作提示',icon: 6, btn: ['去登录','取消']},function(){
                    self.$router.push({path:"/login"});
                    layer.closeAll();
                },function(){
                    layer.closeAll();
                });
            }else if(self.risk === 1){
                layer.confirm("投资前须进行风险测评！",{title: '操作提示',icon: 6, btn: ['去测评','取消']},function(){
                    self.$router.push({path:"/account/riskTest"});
                    layer.closeAll();
                },function(){
                    layer.closeAll();
                });
            }else if(self.risk === 2){
                layer.confirm("该产品超过您当前的风险承受能力。",{title: '操作提示',icon: 6, btn: ['确认购买','取消']},function(){
                    layer.closeAll();
                    self.moneyCheck();
                },function(){
                    layer.closeAll();
                });
            }else{
                self.moneyCheck();
            }
            // self.moneyCheck();
        },
        moneyCheck:function(){
            let self = this;
            if (this.money <= 0) {
                layer.alert("请输入正确的金额!",'',function(){layer.closeAll();});
            } else if (this.money > parseFloat(this.accountInfo.useMoney)) {
                layer.alert("你的余额不足以投资，请先充值!",'',function(){self.$router.push({path:'/account/recharge'});layer.closeAll(); setTimeout(function () { layer.closeAll();self.$router.push({path:'/account/recharge'}); }, 2000) });
            } else if (this.money < parseFloat(this.productDetail.mini_money)  &&  parseFloat(this.productDetail.mini_money) < parseFloat(this.productDetail.amount)) {
                layer.alert("投资金额不能低于最低限制!",'',function(){layer.closeAll();});
            } else if (this.money > parseFloat(this.productDetail.amount)) {
                layer.alert("投资金额不能大于剩余金额!",'',function(){layer.closeAll();});
            } else {
                // self.$router.push({path:"/product/InvestConfirm?id=" + self.productId + "&money=" + self.money});
                // console.log(111)
                self.investConfirm();
            }            
        },
        RewardgetList:function(_rewardType,_page){
                var self = this;
                self._ajax(self,'/api/reward/getList', {
                    rewardType: _rewardType,
                    actionType: 2,
                    isUse:1,
                    productId: self.productId,
                    page:_page
                }, function (data) {
                    // console.log(data)
                    let getList = data.data.data;
                    let newlist = new Array();
                    if (getList.length > 0) {
                        for (let i = 0; i < getList.length; i++) {
                            getList[i].money = parseFloat(getList[i].money);
                            getList[i].minMoney = parseInt(getList[i].minMoney);
                            newlist[(data.data.current_page - 1) * data.data.per_page +i] = getList[i];
                        }
                    }
                    // console.log(newlist)
                    if(_rewardType == 1){
                        let redPackageList= self.redPackageList;
                        self.$set(redPackageList,Object.assign(redPackageList,newlist))
                    }else if(_rewardType == 2){
                        let CouponList= self.CouponList;
                        self.$set(CouponList,Object.assign(CouponList,newlist))
                    }
                    if(parseInt(data.data.current_page) < parseInt(data.data.last_page)){
                        self.RewardgetList(_rewardType,(parseInt(data.data.current_page)+1))
                    }
                }, function(){});
        },  
        redpackageSel: function () {
                var self = this;
                var reMoney = $("select[name=vocherId]").find("option:selected").attr("reMoney");
                var minMoney = $("select[name=vocherId]").find("option:selected").attr("minMoney");
                var money = $("#money").val().replace(/[^\d]/g, '');
                // if (self.money == '') {
                //     layer.alert("先输入投资金额，再选择红包!",'',function(){layer.closeAll();});
                //     setTimeout(function () {
                //         layer.closeAll();
                //     },2000)
                // } else 
                if (parseFloat(reMoney) >= parseFloat(money) && reMoney != 0) {
                    layer.msg("投资金额必须大于红包金额!");
                } else if (parseFloat(minMoney) > parseFloat(money) && reMoney != 0) {
                    layer.msg("投资金额必须大于红包最小起投金额!");
                } else {
                    var actualmoney = money - parseInt(reMoney);
                    self.actualmoney = actualmoney > 0 ? actualmoney :0;
                    // self.actualmoney = actualmoney;
                }
        },
        couponSel: function () {
                var self = this;
                var reMoney = $("select[name=useRateId]").find("option:selected").attr("reMoney")
                var minMoney = $("select[name=useRateId]").find("option:selected").attr("minMoney")
                if (parseFloat(minMoney) > parseFloat(self.moneyGet)) {
                    layer.alert("投资金额必须大于加息券最小起投金额!",'',function(){window.location.reload();});
                    setTimeout(function () {
                        window.location.reload();
                    },2000)
                } else {
                    var extramoney = 0;
                    extramoney = self.caculate(self.moneyGet, parseInt(self.productDetail.repay_type), parseFloat(reMoney), self.productDetail.term, self.productDetail.termUnit);
                    if (reMoney != 0) {
                        self.couponText = reMoney + "%加息券，加息收益" + extramoney + "元";
                    } else {
                        self.couponText =''
                    }
                }
        },
        investConfirm:function(){
            //确认投资的时候，判定是否有可用红包未选，如果有就提示，没有就跳转第三方
            if($("#vocherId").val() == '' && $("#vocherId option").length >1 || $("#useRateId").val() == '' && $("#useRateId option").length >1){
                //有可使用但是未使用的红包或者加息券
                layer.confirm("您有红包或加息券未使用，是否继续投资？",{title: '操作提示',icon: 6},function(){
                    layer.closeAll();
                    $("#SubmitBtn").click();
                },function(){
                    layer.closeAll();
                });
            }else{
               $("#SubmitBtn").click();
            }
        }, 
        caculate:function(total, type, inverstmentRate, inverstmentTerm, unit) {
                //total：投资金额；type：还款方式,inverstmentRate:年利率，inverstmentTerm：投资时间,unit:1天标 2月标  3年标
                var fee = 0;
                var monthRate = inverstmentRate / 12 / 100;
                if (unit == 1) {
                    if (type == 3) { //等额本息   fee = 月还款*期限-借款
                        fee = total * monthRate * Math.pow(1 + monthRate, inverstmentTerm) / (Math.pow(1 + monthRate, inverstmentTerm) - 1) * inverstmentTerm - total;
                    } else if (type == 4) {//等额本金   fee = Total/term * monthRate* (term+1)*term/2
                        fee = total * monthRate * (inverstmentTerm + 1) / 2;
                    } else {
                        fee = total * monthRate * inverstmentTerm;
                    }
                } else if (unit == 2) {
                    fee = total * monthRate * inverstmentTerm * 12 / 365;
                } else if (unit == 3) {
                    fee = total * monthRate * inverstmentTerm * 12;
                }
                return fee.toFixed(2);
        },
        moneyChange:function(){
            var self = this;
            self.money = $("#money").val().replace(/[^\d]/g, '');
            setTimeout(function() {
                self.redpackageSel();
            }, 500);
        },
        getdangerLevel:function(){
            layer.open({
                    type: 2,
                    title: '风险等级说明',
                    shadeClose: true,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    area: ['375px', '667px'],
                    content: 'https://cdn.litongjinfu.com/public/riskassessment.html'
                    });
        }

    },
    directives: {
        focus: {
            // 自定义指令
            // 指令的定义
            inserted: function (el) {
            el.focus()
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .getmoredangerLevel{text-align:right;color:#3a84cf;cursor:pointer;font-size: 12px;margin-left: 10px;}
  .swiper-container {
        width: 100%;
        height: 260px;
        margin: 20px auto;
    }
  .swiper-slide {
        position: relative;
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
        height:204px;
    }
  .swiper-slide img{width:100%;height:204px;cursor: pointer;}    
  .swiper-slide .Authenticatedimg{position: absolute;top: 0;left: 0;}
.logoimg{width: 12px;height: 12px;}
</style>
