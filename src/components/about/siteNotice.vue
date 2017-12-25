<template>
    <div class="AboutUSC">
        <div class="bannerBG wzggBG">
            <div class="aboutUsheadTitle">
                <h1>Notice</h1>
                <h3>网站公告</h3>
            </div>
            <ul>
                <li><router-link to="/about/aboutus">关于我们</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li class="abooutusMenuSel"><router-link to="/about/siteNotice">网站公告</router-link></li>
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
                <div class="graph">网站公告</div>
                <div class="chge"></div>
                <ul class="newslist">
                    <li class="clearfix" v-for="(noticelist,index) in noticeList" :key="index">
                        <i class="ico"></i>
                        <router-link :to="'siteNoticeDetail?id='+noticelist.id+'&respType=json'">
                            {{noticelist.title}}
                        </router-link>
                        <span>{{noticelist.time}}</span>
                    </li>
                </ul>
                <div class="pages mypage clearfix">
                    <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
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
                noticeList:[]
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted:function(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
            this.noticeListGet(1);
        },
        methods: {  
            noticeListGet:function (_page) {
                var self = this;
                self.$store.state._ajax(self,'/api/news/noticeList', {
                    appType: 1,
                    page: _page
                }, function (data) {
                    if (data.data.total == 0) {
                        self.investList = data.data.data;
                        $(".mypage").html("");
                    } else {
                        var noticeList = data.data.data;
                        for (var i = 0; i < noticeList.length; i++) {
                            noticeList[i].time = noticeList[i].time.substr(0, 16);
                        }
                        self.noticeList = noticeList;
                        console.log(self.noticeList)
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: parseInt(data.data.last_page),
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.noticeListGet(p);
                            }
                        });
                    }
                    
                }, '');
            }
        }
    }
    
</script>
    
<style>
    
</style>
