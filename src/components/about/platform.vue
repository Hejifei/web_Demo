<template>
    <div class="AboutUSC">
        <div class="bannerBG ptylBG">
            <div class="aboutUsheadTitle">
                <h1>Platform</h1>
                <h3>平台原理</h3>
            </div>
            <ul>
                <li><router-link to="/about/aboutus">关于我们</router-link></li>
                <li class="abooutusMenuSel"><router-link to="/about/platform">平台原理</router-link></li>
                <li><router-link to="/about/siteNotice">网站公告</router-link></li>
                <li><router-link to="/about/newsDynamic">新闻动态</router-link></li>
                <li><router-link to="/about/helpCenter">帮助中心</router-link></li>
                <li><router-link to="/about/newHands">新手入门</router-link></li>
                <li><router-link to="/about/corpPartner">合作伙伴</router-link></li>
                <li><router-link to="/about/joinUs">招贤纳士</router-link></li>
                <li><router-link to="/about/employeeWelfare">员工福利</router-link></li>
            </ul>
        </div>
        
        <div class="bodygrayBG">
            <div class="newsinfo-intro content" style="text-align:center;">
                <h1>
                    平台原理
                    <img src="../../common/stylus/0818new/ptyl_fenge.png"/>
                </h1>
                <img class="bigimg" src="../../common/stylus/0818new/process_control.png" alt="Alternate Text" />
            </div>
        </div>
    </div>
</template>

<script> 
    import LTJF from '../../common/js/ltjf.js';
    export default {
        name: 'HelloWorld',
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
        }
    }
    
</script>
    
<style>
    
</style>
