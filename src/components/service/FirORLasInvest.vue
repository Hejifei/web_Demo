<template>
    <div class="FORLIC">
        <div class="FORLI_head"></div>
        <div class="FORLI_body">
            <div class="FORLI_page">
                <h2>活动规则</h2>
                <ul class="bottom_radius">
                    <li class="content1">活动期间单个标的首单投资、尾单投资、累计最大投资用户满足最低投资金额可获取1~3个红包奖励。</li>
                    <li class="content2">以上三种奖励方式所获得红包可以累计，例如：用户A既是首单投资用户，又是最大投资用户，此用户就可以累计获得两个红包奖励。</li>
                    <li class="content3">单标最低投资金额获取红包条件为：尾单投资金额≥1000元，首单投资金额≥5000元，累计最大投资金额≥10000元。</li>
                    <li class="content4">红包在投资成功后发放到个人账户“我的奖券”中，其中榜首投资红包在满标后发放，红包来源为“尾单投资”“首单投资”“最大投资”即为活动奖励。</li>
                </ul>
            </div>
            <div class="FORLI_page">
                <h2>单标投资红包奖励</h2>
                <ul>
                    <li>累计榜首投资用户奖励现金红包50元。</li>
                    <li>首单投资用户奖励现金红包30元。</li>
                    <li>尾单投资用户奖励现金红包20元。</li>
                </ul>
                <div class="FORLI_Redpakglist bottom_radius">
                    <div class="redpakgC">
                        <h3>榜首奖</h3>
                        <h4>￥50</h4>
                        <p>单笔投资满20000元使用</p>
                        <p>（限六个月以上标的）</p>
                    </div>
                    <div class="redpakgC">
                        <h3>首投奖</h3>
                        <h4>￥30</h4>
                        <p>单笔投资满15000元使用</p>
                        <p>（限三个月以上标的）</p>
                    </div>
                    <div class="redpakgC">
                        <h3>尾投奖</h3>
                        <h4>￥20</h4>
                        <p>单笔投资满10000元使用</p>
                        <p>（限一个月以上标的）</p>
                    </div>
                </div>
            </div>
            <router-link to="/product" class="FORLI_a">立即投资</router-link>
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
        mounted () {  
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        }
    }
</script>

<style>
    
</style>
