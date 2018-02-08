<template>
    <div class="Special_inviteC">
        <div class="SI_topbanner"></div>
        <div class="SI_body">
            <div class="SI_bodyC">
                    <h3 class="SL_title">活动内容<img class="imgR_01" src="../../common/stylus/img/Special_inviteC_right_01.png"/></h3>
                    <div class="SL_P">利通金服为回馈新老用户，活动期间凡是注册过利通金服平台的用户均可通过邀请亲朋好友注册/充值/投资获取一定金额奖励金和积分。</div>
                    <h3 class="SL_title">邀请方式<img class="imgL_01" src="../../common/stylus/img/Special_inviteC_left_01.png"/></h3>
                    <div class="SL_P">
                        <p>微信分享、短信推送、二维码分享。</p>
                        <p>分享页直接注册、填写邀请人手机号。</p>
                    </div>
                    <h3 class="SL_title">活动内容
                        <img class="imgR_02" src="../../common/stylus/img/Special_inviteC_right_02.png"/>
                        <img class="imgL_02" src="../../common/stylus/img/Special_inviteC_left_02.png"/>
                    </h3>
                    <div class="SL_P">
                        <p>1、好友注册并认证返2元/人及100积分/人。</p>
                        <p>2、首次充值≥100元好友与自己分别得2元/人。</p>
                        <p>3、好友首次投资≥1000元返200积分。</p>
                        <p>4、奖励金发放到个人账户，满50元可提现。</p>
                        <p>5、好友有效邀请所得奖励金限80元/天。</p>
                        <p>6、平台有权取消恶意刷奖用户的活动资格。</p>
                    </div>
                    <h3 class="SL_title">邀请好友</h3>
                    <div class="SL_P row">
                        <img  :src="'https://pan.baidu.com/share/qrcode?w=512&h=512&url=https://cdn.litongjinfu.com/public/reg/regred/test.html?inviter='+userid"/>
                        <div style="display:inline-block;width:600px;">
                            <p class="top35">邀请专属二维码（邀请好友一起赚钱）。</p>
                            <p class="top35">获奖举例：邀请15人注册并充值100元可获得60元奖励金，好友可获得2元奖励金。</p>
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
                userid:JSON.parse(localStorage.ltjfUserInfo).id
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
