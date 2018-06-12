# 运行 npm run dev
# 打包 npm run build

├── build                               打包目录 
├── config                     项目配置
│   ├── dev.env                     开发项目变量
│   ├── index                       项目配置文件
│   └── prod.env                    测试环境变量
├── src                      
│   ├── common                 资源目录          
│   │   ├── js                      公用js文件夹
│   │   │    ├── hejifei.js             公用js（自定义方法、签到日历插件、分页插件、省市区插件、提示框插件）
│   │   │    └── ltjf.js                父子组件通信js
│   │   └── stylus                  公用css文件夹
│   │        ├── 0818new                公用图片文件夹
│   │        ├── accounticon            个人中心左侧图片图片      
│   │        ├── img                    公用图片文件夹   
│   │        ├── common.css             公用css   
│   │        ├── kefu.css               首页右侧客服css    
│   │        ├── member.css             公用css 
│   │        ├── pc_hejifei.less        公用less 
│   │        ├── sign2.css              公用css 
│   │        ├── style.css              公用css 
│   │        └── tcdPageCode.css        分页css 
│   ├── components             页面文件夹
│   │   ├──about                    关于利通模块
│   │   │    ├──aboutus                 关于我们
│   │   │    ├──corpPartner             合作伙伴
│   │   │    ├──employeeWelfare         员工福利
│   │   │    ├──helpCenter              帮助中心
│   │   │    ├──joinUs                  招贤纳士
│   │   │    ├──newHands                新手入门
│   │   │    ├──newsDynamic             新闻动态
│   │   │    ├──newsDynamicDetail       新闻动态详情
│   │   │    ├──platform                平台原理
│   │   │    ├──siteNotice              网站公告
│   │   │    └──siteNoticeDetail        网站公告详情
│   │   ├──account                  我的账户模块
│   │   │    ├──accountOpen             开户申请
│   │   │    ├──accountOpened           开户成功
│   │   │    ├──authorizationEntrust    授权代收
│   │   │    ├──bankcard                银行卡
│   │   │    ├──baseInfo                基本设置
│   │   │    ├──capitalflow             资金流水
│   │   │    ├──emailChange             邮箱绑定（废弃）
│   │   │    ├──Feedback                意见反馈
│   │   │    ├──followlist              关注项目
│   │   │    ├──friends                 我的好友
│   │   │    ├──fssTrans                生利宝
│   │   │    ├──headImgChange           头像上传
│   │   │    ├──integration             我的积分
│   │   │    ├──investlist              历史投资
│   │   │    ├──investlistTransfer      债权转让
│   │   │    ├──menuleft                个人中心左侧公用部分
│   │   │    ├──messageCenter           消息中心
│   │   │    ├──messageDetail           消息中心详情 
│   │   │    ├──objectBookingDetails    自动投标
│   │   │    ├──orderRecord             预约记录
│   │   │    ├──overview                账户总览
│   │   │    ├──paymentCalendar         汇款日历（废弃）
│   │   │    ├──personalTailorDetail    私人定制
│   │   │    ├──pswReset                密码修改（废弃)
│   │   │    ├──recharge                我要充值
│   │   │    ├──reward                  我的奖券
│   │   │    ├──rewards                 我的奖励金
│   │   │    ├──riskTest                风险评估
│   │   │    ├──transferApply           申请债权交易
│   │   │    ├──userProjectinfo         投资回执单
│   │   │    └──withdrawals             我要提现
│   │   ├──footer                   页面底部公共部分
│   │   │    ├──footer                  页面底部公共部分
│   │   │    └──loginfooter             登录页底部公共部分
│   │   ├──header                   页面顶部公共部分
│   │   │    ├──header                  页面顶部公共部分
│   │   │    └──loginheader             登录页顶部公共部分
│   │   ├──index                    首页模块
│   │   │    ├──404                     404界面
│   │   │    ├──calculator              投资计算器
│   │   │    ├──developing              开发中界面
│   │   │    ├──index                   首页
│   │   │    └──redirect                重定向界面
│   │   ├──loan                     我要借款模块
│   │   │    ├──applyRecord             个人中心--申请记录
│   │   │    ├──index                   借款申请界面
│   │   │    ├──loanManage              个人中心--借款管理
│   │   │    ├──overdueMoney            个人中心--逾期管理
│   │   │    ├──returnAdvance           个人中心--提前还款申请
│   │   │    └──returnMoney             个人中心--还款管理
│   │   ├──login                    登录注册模块
│   │   │    ├──appDownload             app下载界面
│   │   │    ├──index                   登录
│   │   │    ├──passwordReset           忘记密码
│   │   │    ├──registerEnterprise      企业注册
│   │   │    └──registerPersonal        个人注册
│   │   ├──product                  投资模块
│   │   │    ├──investConfirm             散标投资购买确认（废弃）
│   │   │    ├──Pinfo_order               省心宝投资详情
│   │   │    ├──PInfo                     散标投资详情
│   │   │    ├──productList               我要投资
│   │   │    ├──receipt                   我要投资
│   │   │    ├──transInvestComfirm        债权转让购买确认（废弃）
│   │   │    └──transPInfo                债权转让投资详情
│   │   └──service                  信息披露（专题）模块
│   │        ├──automaticBid              自动投标专题
│   │        ├──bankDeposit               银行存管专题
│   │        ├──FirORLasInvest            首尾投专题
│   │        ├──insurance                 安全保障专题
│   │        ├──integratRule              积分专题
│   │        ├──personalTailor            私人定制专题
│   │        ├──platformdata              平台数据
│   │        ├──platformdataold           平台数据（旧）
│   │        ├──ranking                   创富排行
│   │        ├──refuseGlyh                拒绝高息诱惑专题
│   │        ├──special_gqrz              国企入资专题
│   │        ├──special_Invite            邀请好友专题
│   │        └──special_regist            新人888注册专题
│   ├── vuex 
│   │   └── store                         vuex状态管理
│   ├── App.vue                           根组件
│   └── main.js                           入口js文件，路由配置
├── static
│   ├── Font-Awesome-3.2.1                图标字体
│   ├── img                               大图
│   ├── js                                公用js
│   ├── laydate                           日期插件
│   ├── layer                             弹框插件
└── index.html                            入口页面

#插件
layer提示框：http://layer.layui.com/
日期选择：http://www.layui.com/laydate/


























