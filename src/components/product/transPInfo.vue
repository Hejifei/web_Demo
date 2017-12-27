<template>
  <div class="hello">
    <div id="ContactC" @click="modehide($event)">
      <div id="Contact">
        <div class="Contact_box">
            <div class="cancelmodelbtn" @click="ContactHide"><span class="icon-remove"></span></div>
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
    <div class="PhotoMagnifyC" id="PhotoMagnifyC" v-show="PhotoMagnifyC" @click="swiperBighide($event)">
        <div class="PhotoMagnify" id="PhotoMagnify">
            <a class='cancelx' @click="swiperBighide2"><span class="icon-remove"></span></a>
            <div class="swiper-container" id="swiper-containerBig">
                <div class="swiper-wrapper">
                    <div v-for="(picture,index) in BorrowerInfo.picture"  :key='index' class="swiper-slide">
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
                <div class="graph">
                    <img :src="productInfo.img"/>
                    {{productInfo.title}}
                </div>
                <div class="chge"></div>
                <div class="clearfix">
                    <div class="projectInfo_headleft">
                        <ul class="clearfix">
                            <li>
                                <p><span>{{productDetailpay.money}}</span>元</p>
                                <p>剩余本息</p>
                            </li>
                            <li>
                                <p><span>{{productInfo.rate}}</span>%</p>
                                <p>预期年化收益率</p>
                            </li>
                            <li>
                                <p><span>{{productDetailpay.num}}</span>个月</p>
                                <p>剩余期限</p>
                            </li>
                        </ul>
                        <div class="projectInfoLine">
                            <span><label>转让日期</label>{{productInfo.transferTime}}</span>
                            <span><label>回款日期</label>{{productInfo.repay_time}}</span>
                        </div>
                        <div class="projectInfoLine">
                            <span class="projectprocessC" v-if="productInfo.status == 0 ||productInfo.status == 1">
                                <label>投标进度</label>
                                <div class="processline">
                                    <i style="width:0%;"></i>
                                </div>
                                0%
                            </span>
                            <span class="projectprocessC" v-if="productInfo.status == 2 ">
                                <label>投标进度</label>
                                <div class="processline">
                                    <i style="width:100%;"></i>
                                </div>
                                100%
                            </span>
                        </div>
                        <div class="projectInfoLine">
                            <span v-if="productInfo.repay_type == 0"><label>还款方式</label>每月付息，到期还本</span>
                            <span v-if="productInfo.repay_type == 1"><label>还款方式</label>按月等额</span>
                            <span v-if="productInfo.repay_type == 2"><label>还款方式</label>到期还本付息</span>
                            <span v-if="productInfo.repay_type == 3"><label>还款方式</label>等额本息</span>
                            <span v-if="productInfo.repay_type == 4"><label>还款方式</label>等额本金</span>
                        </div>
                    </div>
                    <div class="projectInfo_headright"  id="AjaxForm">
                        <div class="projectmoneyleft" v-if="uid != null">
                            <label>转让金额</label><span>{{productInfo.transferMoney}}</span>元
                            <router-link class="fr" to="/account/recharge">充值</router-link>
                        </div>
                        <div class="projectmoneyleft mymoneyleft" v-if="uid == null">
                            <label>转让金额</label> <span></span><router-link style="margin-top: 5px;" to="/login">登录查看</router-link>
                        </div>
                        <!-- <div class="projectmoneyleft">
                            <label>转让金额</label>
                            <span>{{productInfo.transferMoney}}</span>元
                        </div> -->
                        <label v-if="uid != null" class="mymoneyleft">账户余额 <span>{{productDetail.available}}元</span></label>
                        <label v-if="uid == null" class="mymoneyleft">账户余额 <span></span><router-link  to="/login">登录查看</router-link></label>
                        <!-- <label class="mymoneyleft">账户余额 <span>{{productDetail.available}}元</span><router-link to="/account/recharge">充值</router-link></label> -->
                        <input :value="productInfo.transferMoney" class="form-submit" readonly name="money" />
                        <div class="awardunlogin"></div>
                        <div class="investActline">&nbsp;</div>
                        <router-link v-if="uid == null" class="redBtn buynowBtn" to="/login">登录查看</router-link>
                        <a class="redBtn buynowBtn graybtn" v-if="productInfo.status == '0' && uid != null" >暂未转让</a>
                        <a class="redBtn buynowBtn" v-if="productInfo.status == '1' && uid != null" v-on:click="buynow">立即投资</a>
                        <a class="redBtn buynowBtn graybtn" v-if="productInfo.status == '2' && uid != null" >转让结束</a>
                        <a class="redBtn buynowBtn graybtn" v-if="productInfo.status == '3' && uid != null" >再次转让</a>
                        <div class="xieyiline"  v-if="uid != null">
                            <label v-if="productDetail.status == 1"><input class="required agreement" type="checkbox" checked />我已阅读并同意<a :href="loanxieyi" target="_blank">《借款及服务协议》</a></label>
                            <label v-if="productDetail.status != 1" style="height:46px;display:block;"></label>
                            <input class="moneyinput form-submit" type="hidden" name="id" v-model="transfer_idGet" />
                            <input class="moneyinput form-submit" type="hidden" value="" name="type" />
                            <input class="moneyinput form-submit" value="json" type="hidden" name="respType" id="respType" />
                            <input class="moneyinput form-submit" v-model="sid" type="hidden" name="sid" />
                            <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret"/>
                            <a class="redBtn" style="display:none;" id="SubmitBtn">确认投资</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="projectDetailBody">
                <div class="awardListC">
                    <ul class="clearfix">
                        <li @click="projectInfoSel($event,0)" class="awardList_active">项目详情</li>
                        <li @click="projectInfoSel($event,1)" >回款计划</li>
                    </ul>
                </div>
                <div class="projectInfoListC">
                    <!-- @*项目详情*@ -->
                    <div class="projectDetailC">
                        <h3>借款标的信息</h3>
                        <table>
                            <tbody>
                                <tr><td>剩余本息</td><td>{{productDetailpay.money}}元</td><td>转让金额</td><td>{{productInfo.transferMoney}}元</td></tr>
                                <tr><td>剩余本金</td><td>{{productDetailpay.capital}}元</td><td>剩余利息</td><td>{{productDetailpay.interest}}元</td></tr>
                                <tr>    
                                    <td>借款利率</td>
                                    <td>{{productInfo.rate}}%</td>
                                    <td>还款方式</td>
                                    <td v-if="productInfo.repay_type == 0">每月付息，到期还本</td>
                                    <td v-if="productInfo.repay_type == 1">按月等额</td>
                                    <td v-if="productInfo.repay_type == 2">到期还本付息</td>
                                    <td v-if="productInfo.repay_type == 3">等额本息</td>
                                    <td v-if="productInfo.repay_type == 4">等额本金</td>
                                </tr>
                                <tr><td>转让日期</td><td>{{productInfo.transferTime}}</td><td>回款日期</td><td>{{productInfo.repay_time}}</td></tr>
                                <tr>
                                    <td>剩余期限</td>
                                    <td>{{productDetailpay.num}}个月</td>
                                    <td>借款用途</td>
                                    <td>{{productInfo.borrowUse}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>个人基本信息</h3>
                        <table>
                            <tbody id="personbaseInfo">
                                <tr>
                                    <td>姓名</td><td>{{BorrowerInfo.realname}}</td><td>年龄</td><td>{{BorrowerInfo.age}}</td></tr>
                                    <tr id="sextr"><td>性别</td><td>{{BorrowerInfo.sex}}</td></i>
                                </tr>
                            </tbody>
                        </table>
                        <h3>风控措施</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>征信信息</td>
                                    <td colspan="3">
                                        <p v-for="(creditInfo,index) in productrisking.creditInfo" :key='index'>{{creditInfo}}</p>
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
                            </tbody>
                        </table>
                        <h3>借款详细图片</h3>
                        <!-- Swiper -->
                        <div class="swiper-container" id="swiper-containerSmall">
                            <div class="swiper-wrapper">
                                <div v-for="(picture,index) in BorrowerInfo.picture" @click="swiperBig(index)"  :key='index' class="swiper-slide">
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

                        <h3>银行限额<a v-on:click="BanklimitInfo" class="getmoreBank">查看更多<span class="icon-double-angle-right"></span></a></h3>
                        <img class="banklimitimg" src="/static/img/bank_limit.png"/>
                    </div>
                    <!-- @*回款计划*@ -->
                    <div class="projectDetailC">
                        <table class="investmentTab repayPlanTab">
                            <thead>
                                <tr><td>期次</td><td>计划收款日</td><td>应收本金</td><td>应收收益</td><td>应收总额</td></tr>
                            </thead>
                            <tbody>
                                <tr v-for="(repayplan,index) in repayPlan" :key='index'>
                                    <td>第 {{repayplan.ROW_NUMBER}} 期</td>
                                    <td>{{repayplan.repay_time}}</td>
                                    <td>{{repayplan.self_money}} 元</td>
                                    <td>{{repayplan.month_repay_money}} 元</td>
                                    <td v-if="repayplan.is_pay == 0" style="padding:10px 0;">未收益 {{repayplan.repay_money}} 元</td>
                                    <td v-if="repayplan.is_pay == 1" style="padding:10px 0;">已收益 {{repayplan.repay_money}} 元</td>
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
            productDetail:[],
            productInfo:[],
            BorrowerInfo:[],
            productrisking:[],
            investment:[],
            repayPlan: [],
            productId:'',
            transfer_idGet:'',
            bankcardlimitList:[],
            productDetailpay:[],
            PhotoMagnifyC:false,
            loanxieyi:'',
            ret:0,
            sid:''
        }
    },
    created() {
        var self = this;
        self.sid = localStorage.SID;
        // 非父子组件通信发送
        LTJF.$emit("txt",{header:true});
        var idGet = this.$store.state.getUrl(location.href).id;
        var idtransfer_id = this.$store.state.getUrl(location.href).transfer_id;
        self.transfer_idGet = this.$store.state.getUrl(location.href).transfer_id;
        self.productId = idGet;
        if (idGet == undefined || idGet == null || idGet == ''||idtransfer_id == undefined || idtransfer_id == null || idtransfer_id == '') {
            self.$router.push({path:"/product"})
        }
        //手动投标接口的ret参数为14
        if (this.$store.state.ifRegular == 0) {
            self.ret = 15;
        } else {
            self.ret = 150;
        }
        //验证是否登陆
        self.uid = localStorage.uid;
        if (localStorage.uid != null && localStorage.uid != '') {
            // 余额查询
            self.$store.state._ajax(self,'/api/account/index', {}, function (data) {
                self.accountInfo = data.data;
            });
            //借款及服务协议
            self.$store.state._ajax(self,'/api/loan/contract', {respType : 'json',contractType : 1}, function (data) {self.loanxieyi=data.data;},'');
        }
        //产品详情信息获取
        this.$store.state._ajax(this,'/api/product/transferDetail', { id: idtransfer_id }, function (data) {
            // console.log(data.data)
            var productdetail=data.data;
            productdetail.detail.transferTime = productdetail.detail.transferTime.substr(0, 10)
            productdetail.detail.repay_time = productdetail.detail.repay_time.substr(0, 10)
            productdetail.detail.description = productdetail.detail.description.split('；');
            self.productDetail = productdetail;
            self.productInfo = productdetail.detail;
            self.productDetailpay=productdetail.pay;
            });
            //借款人信息获取
            this.$store.state._ajax(this,'/api/product/information', { id: idGet }, function (data) {
            self.BorrowerInfo = data.data;
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
                        autoplay: 5000,
                        autoplayDisableOnInteraction: false,
                        observer: true, //修改swiper自己或子元素时，自动初始化swiper，主要是这两行  
                        observeParents: true //修改swiper的父元素时，自动初始化swiper  
                    });
            },10)
        });
        //风控策略获取
        this.$store.state._ajax(this,'/api/product/risking', {id:idGet}, function (data) {
            var risking= data.data;
            risking.creditInfo = risking.creditInfo.split('；');
            self.productrisking = risking;
            // console.log(self.productrisking);
            if(self.productrisking.authInfo.length > 0){
                $("#sextr").append("<td>"+self.productrisking.authInfo[0].content+"</td><td>已认证</td>")
                let authinfoC='';
                for(var i = 1;i<self.productrisking.authInfo.length;i++){
                if(i %2 != 0){
                    authinfoC +="<tr><td>"+self.productrisking.authInfo[i].content+"</td><td>已认证</td>";
                }else{
                    authinfoC +="<td>"+self.productrisking.authInfo[2].content+"</td><td>已认证</td></tr>";
                }
                }
                $("#personbaseInfo").append(authinfoC);
            }
        }, '');
        
        //回款计划获取
        this.$store.state._ajax(this,'/api/product/transferPlan', { id: idGet,transfer_id: idtransfer_id}, function (data) {
            var repayPlanlist = data.data;
            if (repayPlanlist.length != 0) {
                for (var i = 0; i < repayPlanlist.length; i++) {
                repayPlanlist[i].repay_time = repayPlanlist[i].repay_time == '' ? "--" : repayPlanlist[i].repay_time.substr(0, 10);
                }
            }
            repayPlanlist[(repayPlanlist.length - 1)].month_repay_money = parseFloat(parseInt((repayPlanlist[(repayPlanlist.length - 1)].repay_money - repayPlanlist[(repayPlanlist.length - 1)].self_money) * 100) / 100).toFixed(2);
            self.repayPlan = repayPlanlist;
        }, '');

        // 银行限额信息获取
        this.$store.state._ajax(this,'/api/product/bankLimit', {}, function (data) {
            self.bankcardlimitList = data.data;
            }, function (data) {
        });      
    },  
    mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
            $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");
            var self = this;
            //提交转让购买
            this.$store.state.AjaxSumbit(this,"/", "/api/transfer/buyTranfer", function (data) {
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
        ContactHide:function(){
            //点击×关闭模态框
            $("#ContactC").hide();
        },
        modehide:function(e){
        // 点击空白关闭模态框
        if (e.target.id == "ContactC" || e.target.id == "Model") {
            $("#ContactC").hide();
        }
        },
        projectInfoSel:function(event,index){
            $(".awardList_active").removeClass("awardList_active");
            event.target.setAttribute("class","awardList_active");
            $(".projectDetailC").hide();
            $(".projectDetailC").eq(index).show();
        },
        buynow: function () {
            var self = this;
            if (parseFloat(this.productDetail.detail.transferMoney) > parseFloat(this.productDetail.available)) {
                layer.alert("你的余额不足以投资，请先充值!",'',function(){self.$router.push({path:'/account/recharge'});layer.closeAll(); setTimeout(function () { self.$router.push({path:'/account/recharge'}); layer.closeAll();}, 2000) });
            } else {
                // self.$router.push({path:"/product/transInvestComfirm?id=" + self.productId + "&transfer_id=" + self.productDetail.detail.transfer_id})
                $("#SubmitBtn").click();
            }            
        },
        BanklimitInfo: function () {
            $("#ContactC").show();
        }    
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

</style>
