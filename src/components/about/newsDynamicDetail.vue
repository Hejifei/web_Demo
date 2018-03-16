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
                <div class="graph pad30">{{noticeDetail.title}}</div>
                <div class="chgenew"></div>
                <div class="recruitTip">{{noticeDetail.time}}</div>
                <div class="newsDEtail" v-html="noticeDetail.content"></div>
            </div>
        </div>
    </div>
</template>

<script> 
    import LTJF from '../../common/js/ltjf.js';    
    export default {
        data () {
            return {
                noticeDetail:[]
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        mounted:function(){
            var self = this;
            var idget = self.$store.state.getUrl(location.href).id;
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
            //新闻信息获取
            self.$store.state._ajax(self,'/api/open/getNews', {
                id: idget,
                respType: 'json'
            }, function (data) {
                self.noticeDetail = data.data;
            }, '');
        },
        methods: {  
            
        }
    }
    
</script>
    
<style>
    .recruitTip{padding: 0 30px;}
    .newsDEtail p{text-indent: 2em;}
    
</style>
