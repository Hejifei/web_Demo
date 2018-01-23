<template>
    <div class="FORLIC">
        <div class="FORLI_head"></div>
        <div class="FORLI_body">
            <div class="FORLI_page">
                <h2>活动规则</h2>
                <ul class="bottom_radius">
                    <li class="content1">活动期间凡是针对单个标的第一个投资用户(首单)、最后一个投资用户(尾单)、累计最大投资用户（最大），满足一定投资金额条件，均可获取对应的红包奖励。</li>
                    <li class="content2">以上三种奖励方式所获得红包可以累计，例如：用户A既是首单投资用户，又是最大投资用户，此用户就可以累计获得两个红包奖励。</li>
                    <li class="content3">单标最低投资金额获取红包条件为：尾单投资金额≥1000元，首单投资金额≥5000元，累计最大投资金额≥10000元</li>
                    <li class="content4">首单奖励红包在投资成功后发放，尾单和累计最大投资奖励红包在满标后发放，具体使用规则在“我的奖券”中点击相应红包查看。</li>
                </ul>
            </div>
            <div class="FORLI_page">
                <h2>单标投资红包奖励</h2>
                <ul>
                    <li>累计最大投资用户奖励6个月起投的理财红包50元。</li>
                    <li>首单投资用户奖励3个月起投的理财红包30元。</li>
                    <li>尾单投资用户奖励1个月起投的理财红包20元。</li>
                </ul>
                <div class="FORLI_Redpakglist bottom_radius">
                    <div class="redpakgC">
                        <h3>最大奖</h3>
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
