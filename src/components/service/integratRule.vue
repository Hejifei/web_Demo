<template>
    <div class="integrationC">
        <div class="integration_head"></div>
        <div class="integration_body">
            <h3 class="cloudtitle_1">活动内容</h3>
            <div class="cloudP1">
                <p>即日起至2018.7.22</p>
                <p>凡是平台用户均可通过签到/投</p>
                <p>资/邀请好友等规则获取新的积分，历史已</p>
                <p>获取积分予以保留，所获积分均可根据平</p>
                <p>台后续抽奖/红包/话费/购物券/加息</p>
                <p>券/实物兑换等活动进行消耗。</p>
            </div>
            <img class="img2" src="../../common/stylus/img/integrationRuletitle2.png"/>
            <div class="cloudP2"></div>
            <h3 class="cloudtitle_2">备注</h3>
            <div class="cloudP3">
                <p>以前活动规则所发放的注册积分与签到积分保留；积分每一年7.1日自动针对前一年的所获总积分清零一次。</p>
                <p>推荐好友在平台注册或者投资的，凡是平台能够自动识别推荐人的，根据好友推荐规则发放相应积分到个人账户。</p>
            </div>
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
