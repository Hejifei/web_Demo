// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//兼容IE
import 'babel-polyfill';
import 'eventsource-polyfill';
import Vue from 'vue'


import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';


import App from './App';

// jquery引用
// import 'jquery';
import $ from 'jquery'
// import  "../static/js/my_pc3.0.js";
// import axios from 'axios';
// Vue.prototype.$http = axios;

import "common/stylus/common.css";
import "common/stylus/member.css";
import "common/stylus/style.css";
import "common/stylus/sign2.css";
import "common/stylus/tcdPageCode.css";
// 个人样式引用
import "common/stylus/pc_hejifei.less";
// swiper插件引用
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import store from './vuex/store.js';

// 字体样式引用
// import '../static/Font-Awesome-3.2.1/css/font-awesome.min.css';


// vue-layer的引用
// import layer from 'vue-layer'
// Vue.prototype.$layer = layer(Vue);

// 页面引用
import index from 'components/index/index';
import calculator from 'components/index/calculator';//计算器
import redirect from 'components/index/redirect';//重定向界面
import developing from 'components/index/developing';//开发中界面
import productList from 'components/product/productList';
import PInfo from 'components/product/PInfo';
import Pinfo_order from 'components/product/Pinfo_order';//预约抢购确认投资界面
import InvestConfirm from 'components/product/investConfirm';
import transPInfo from 'components/product/transPInfo';
import transInvestComfirm from 'components/product/transInvestComfirm';
import receipt from 'components/product/receipt';//回执单 
import objectBookingDetails from 'components/product/objectBookingDetails';//自动投标
import login from 'components/login/index';
import appDownload from 'components/login/appDownload';
import passwordReset from 'components/login/passwordReset';
import registerEnterprise from 'components/login/registerEnterprise';
import registerPersonal from 'components/login/registerPersonal';
import account from 'components/account/menuleft';
import riskTest from 'components/account/riskTest';//风险评估
import pswReset from 'components/account/pswReset';//密码重置
import emailChange from 'components/account/emailChange';//邮箱设置
import headImgChange from 'components/account/headImgChange';//头像上传
import accountOpen from 'components/account/accountOpen';//开户
import accountOpened from 'components/account/accountOpened';//开户成功
import overview from 'components/account/overview';
import reward from 'components/account/reward';
import baseInfo from 'components/account/baseInfo';
import integration from 'components/account/integration';
import friends from 'components/account/friends';
import rewards from 'components/account/rewards';
import Feedback from 'components/account/Feedback';//意见反馈
import messageCenter from 'components/account/messageCenter';//消息中心
import messageDetail from 'components/account/messageDetail';//消息详情
import wthdrawals from 'components/account/wthdrawals';
import recharge from 'components/account/recharge';
import capitalflow from 'components/account/capitalflow';
import bankcard from 'components/account/bankcard';
import authorizationEntrust from 'components/account/authorizationEntrust';//授权代收
import paymentCalendar from 'components/account/paymentCalendar';//回款日历
import investlist from 'components/account/investlist';
import investlistTransfer from 'components/account/investlistTransfer';
import personalTailorDetail from 'components/account/personalTailorDetail';//私人订制
import transferApply from 'components/account/transferApply';//转让申请
import followlist from 'components/account/followlist';//关注项目
import orderRecord from 'components/account/orderRecord';//预约记录
import fssTrans from 'components/account/fssTrans';//生利宝
import userProjectinfo from 'components/account/userProjectinfo';//回执单
import loan from 'components/loan/index';//我要出借
import applyRecord from 'components/loan/applyRecord';//申请记录
import loanManage from 'components/loan/loanManage';//借款管理
import returnMoney from 'components/loan/returnMoney';//还款管理
import returnAdvance from 'components/loan/returnAdvance';//提前还款申请
import overdueMoney from 'components/loan/overdueMoney';//逾期管理
import insurance from 'components/service/insurance';//安全保障
import bankDeposit from 'components/service/bankDeposit';//银行存管
import platformdata from 'components/service/platformdata';//平台数据
import platformdata2 from 'components/service/platformdata2';//平台数据
import ranking from 'components/service/ranking';//创富排行
import automaticBid from 'components/service/automaticBid';//自动投标专题
import personalTailor from 'components/service/personalTailor';//私人定制专题
import FirORLasInvest from 'components/service/FirORLasInvest';//首尾投专题
import refuseGlyh from 'components/service/refuseGlyh';//拒绝高利诱惑
import special_Invite from 'components/service/special_Invite';//邀请好友专题
import integratRule from 'components/service/integratRule';//积分规则
import aboutus from 'components/about/aboutus';//关于我们
import platform from 'components/about/platform';//平台原理
import siteNotice from 'components/about/siteNotice';//网站公告
import siteNoticeDetail from 'components/about/siteNoticeDetail';//网站公告详情
import newsDynamic from 'components/about/newsDynamic';//新闻动态
import newsDynamicDetail from 'components/about/newsDynamicDetail';//新闻动态详情
import helpCenter from 'components/about/helpCenter';//帮助中心
import newHands from 'components/about/newHands';//新手入门
import corpPartner from 'components/about/corpPartner';//合作伙伴
import joinUs from 'components/about/joinUs';//招贤纳士
import employeeWelfare from 'components/about/employeeWelfare';//员工福利
import NotFoundComponent from 'components/index/404';


// 注册
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

const routes = [
  {path: '/',redirect: '/index'},
  {path: '/index',component: index}, 
  {path: '/calculator',component: calculator},
  {path: '/redirect',component: redirect},
  {path: '/developing',component: developing}, 
  {path: '/login',component: login}, 
  {path: '/login/appDownload',component: appDownload},
  {path: '/login/passwordReset',component: passwordReset},
  {path: '/login/registerEnterprise',component: registerEnterprise},
  {path: '/login/registerPersonal',component: registerPersonal},
  {path: '/loan',component: loan,},
  {path: '/product',component: productList,},
  {path: '/product/PInfo',component: PInfo,},
  {path: '/product/Pinfo_order',component: Pinfo_order,},
  {path: '/product/InvestConfirm',component: InvestConfirm,},
  {path: '/product/transPInfo',component: transPInfo,},
  {path: '/product/transInvestComfirm',component: transInvestComfirm,},
  {path: '/product/receipt',component: receipt,},
  {path: '/account',component: account,
    children:[
      {path: '',redirect: '/account/overview'},
      {path: '/account/riskTest',component: riskTest,},
      {path: '/account/pswReset',component: pswReset,},
      {path: '/account/emailChange',component: emailChange,},
      {path: '/account/headImgChange',component: headImgChange,},
      {path: '/account/accountOpen',component: accountOpen,},
      {path: '/account/accountOpened',component: accountOpened,},
      {path: '/account/overview',component: overview,},
      {path: '/account/reward',component: reward,},
      {path: '/account/baseInfo',component: baseInfo,},
      {path: '/account/integration',component: integration,},
      {path: '/account/friends',component: friends,},
      {path: '/account/rewards',component: rewards,},
      {path: '/account/Feedback',component: Feedback,},
      {path: '/account/messageCenter',component: messageCenter,},
      {path: '/account/messageDetail',component: messageDetail,},
      {path: '/account/recharge',component: recharge,},
      {path: '/account/withdrawals',component: wthdrawals,},
      {path: '/account/capitalflow',component: capitalflow,},
      {path: '/account/bankcard',component: bankcard,},
      {path: '/account/authorizationEntrust',component: authorizationEntrust,},
      {path: '/account/paymentCalendar',component: paymentCalendar,},
      {path: '/account/investlist',component: investlist,},
      {path: '/account/investlistTransfer',component: investlistTransfer,},
      {path: '/account/personalTailorDetail',component: personalTailorDetail,},
      {path: '/account/transferApply',component: transferApply,},
      {path: '/account/followlist',component: followlist,},
      {path: '/account/orderRecord',component: orderRecord,},
      {path: '/account/fssTrans',component: fssTrans,},
      {path: '/account/applyRecord',component: applyRecord,},
      {path: '/account/loanManage',component: loanManage,},
      {path: '/account/returnMoney',component: returnMoney,},
      {path: '/account/returnAdvance',component: returnAdvance,},
      {path: '/account/overdueMoney',component: overdueMoney,},
      {path: '/account/objectBookingDetails',component: objectBookingDetails,},
    ]
  },
  {path: '/userProjectinfo',component: userProjectinfo,},
  {path: '/service/insurance',component: insurance,},
  {path: '/service/bankDeposit',component: bankDeposit,},
  {path: '/service/platformdata',component: platformdata,},
  {path: '/service/platformdata2',component: platformdata2,},
  {path: '/service/ranking',component: ranking,},
  {path: '/service/automaticBid',component: automaticBid,},
  {path: '/service/personalTailor',component: personalTailor,},
  {path: '/service/FirORLasInvest',component: FirORLasInvest,},
  {path: '/service/refuseGlyh',component: refuseGlyh,},
  {path: '/service/special_Invite',component: special_Invite,},
  {path: '/service/integratRule',component: integratRule,},
  {path: '/about/aboutus',component: aboutus,},
  {path: '/about/platform',component: platform,},
  {path: '/about/siteNotice',component: siteNotice,},
  {path: '/about/siteNoticeDetail',component: siteNoticeDetail,},
  {path: '/about/newsDynamic',component: newsDynamic,},
  {path: '/about/newsDynamicDetail',component: newsDynamicDetail,},
  {path: '/about/helpCenter',component: helpCenter,},
  {path: '/about/newHands',component: newHands,},
  {path: '/about/corpPartner',component: corpPartner,},
  {path: '/about/joinUs',component: joinUs,},
  {path: '/about/employeeWelfare',component: employeeWelfare,},
  { path: '*', component: NotFoundComponent }
];
//创建router实例,然后传routes配置
const router = new VueRouter({
  linkActiveClass: 'active',
  // mode:'history',
  routes
});
//切换页面后滚动到页面头部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});