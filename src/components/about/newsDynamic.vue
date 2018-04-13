<template>
    <div class="AboutUSC">
        <div class="bannerBG xwdtBG">
            <div class="aboutUsheadTitle">
                <h1>News</h1>
                <h3>新闻动态</h3>
            </div>
            <ul>
                <li><router-link to="/about/aboutus">关于我们</router-link></li>
                <li><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li class="abooutusMenuSel"><router-link to="/about/newsDynamic">新闻动态</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <li><router-link to="/about/newHands">新手入门</router-link></li>
                <li><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li>
                <li><router-link to="/about/employeeWelfare">员工福利</router-link></li>
            </ul>
        </div>
        <div class="bodygrayBG">
            <div class="newsinfo-intro content">
                <div class="graph pad30">新闻动态</div>
                <div class="chgenew"></div>
                <ul class="newslist">
                    <li class="clearfix" v-for="(news,index) in newsList" :key="index">
                        <i class="ico"></i>
                        <router-link :to="'/about/newsDynamicDetail?id='+news.id">
                            {{news.title}}
                        </router-link>
                        <span>{{news.create_time}}</span>
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
                newsList:[]
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted:function(){
            this.NewsListGet(1);
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
        },
        methods: {  
            NewsListGet:function (_page) {
                var self = this;
                self._ajax(self,'/api/news/index', {
                    page: _page
                }, function (data) {
                    if (data.data.total == 0) {
                        self.newsList = data.data.data;
                        $(".mypage").html("");
                    } else {
                        var newsList = data.data.data;
                        for (var i = 0; i < newsList.length; i++) {
                            newsList[i].create_time = newsList[i].create_time.substr(0, 16);
                        }
                        self.newsList = newsList;
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: parseInt(data.data.last_page),
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.NewsListGet(p);
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
