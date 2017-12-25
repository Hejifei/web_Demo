<template>
    <div class="psTailorC">
        <div class="pstc_head"></div>
        <div class="pstc_body">
            <div class="pstc_circle pstc_circle_left"></div>
            <div class="pstc_circle pstc_circle_right"></div>
            <div class="introduceText">“私人定制”是利通金服为满足投资者个性化的投资需求，为其量身打造一对一专属债权项目的高端投资服务，投资人可以灵活选择债权的类型、还款方式、收益区间、评级，以及借款人的性别、所在地区等。</div>
            <router-link class="pstc_btn" to="/account/personalTailorDetail">立即申请预约</router-link>
            <h1><img src="../../common/stylus/img/personalTailor_circle_left.png" /><span>尊享优质服务</span><img src="../../common/stylus/img/personalTailor_circle_right.png" /></h1>
            <div class="pstc_squareC">
                <div class="pstc_square">
                    <div class="pstc_squareson">
                        <h3>量身定制 收益节节高</h3>
                        <p>投资人可根据自身需求灵活定制债权的金额和期限，私人定制标的收益较普通散标更高。</p>
                    </div>
                </div>
                <div class="pstc_square" style="left:495px;">
                    <div class="pstc_squareson">
                        <h3>优质项目 信息更透明</h3>
                        <p>专业风控团队全程服务，挑选优质项目，投资人可以全程考察借款人的相关情况，项目更透明更安全。</p>
                    </div>
                </div>
                <div class="pstc_square" style="left:938px;">
                    <div class="pstc_squareson">
                    </div>
                </div>
                <div class="pstc_square" style="left:-178px;top:228px;">
                    <div class="pstc_squareson">
                    </div>
                </div>
                <div class="pstc_square" style="left:267px;top:228px;">
                    <div class="pstc_squareson">
                        <h3>快速计息 资金不站岗</h3>
                        <p>无需选标或等待标满，投资成功即计息，收益最大化。</p>
                    </div>
                </div>
                <div class="pstc_square" style="left:710px;top:228px;">
                    <div class="pstc_squareson">
                        <h3>贴心体验 一对一服务</h3>
                        <p>专业的投资顾问，专业的优质服务，专享的贵宾体验。</p>
                    </div>
                </div>
            </div>
            <h1><img src="../../common/stylus/img/personalTailor_circle_left.png" /><span>项目定制流程</span><img src="../../common/stylus/img/personalTailor_circle_right.png" /></h1>
            <img class="processimg" src="../../common/stylus/img/personalTailor_process.png" />
            <h1><img src="../../common/stylus/img/personalTailor_circle_left.png" /><span>定制常见问题</span><img src="../../common/stylus/img/personalTailor_circle_right.png" /></h1>
            <div class="pstc_regularQuestionC">
                <div class="pstc_questionC">
                    <label><img src="../../common/stylus/img/q1.png"/>申请私人定制需要什么条件？</label>
                    <p>申请人需要为利通金服已注册实名用户，申请定制项目的单笔投资金额一般为50万及以上。</p>
                </div>
                <div class="pstc_questionC">
                    <label><img src="../../common/stylus/img/q2.png"/>私人定制标的年化收益率是多少？</label>
                    <p>根据投资期限不同，年化收益率不同，私人定制标的一般预期年化收益率在8%～15%，但通常比普通散标预期收益高。</p>
                </div>
                <!-- <div class="pstc_questionC">
                    <label><img src="../../common/stylus/img/q3.png"/>私人定制申请后多久可以发标？</label>
                    <p>为了更好并及时的找到合适匹配您需求的项目产品，通常从申请到发标时间为1~2周。</p>
                </div> -->
                <div class="pstc_questionC">
                    <label><img src="../../common/stylus/img/q3.png"/>私人定制可以进行债权转让吗？</label>
                    <p>由于私人定制是一对一专属服务，所以投资过程中不能在平台发起债权转让。</p>
                </div>
                <div class="pstc_questionC">
                    <label><img src="../../common/stylus/img/q4.png"/>私人定制标的投标时间有限制吗？</label>
                    <p>投资人接受私人定制项目后需要在一定时间内一对一投资所属定制产品；如发生两次以上单方毁约（即投资人申请的定制产品未如期投资），利通金服将不再接受该用户的定制申请。</p>
                </div>
                <div class="pstc_questionC">
                    <label><img src="../../common/stylus/img/q5.png"/>私人定制标在哪里申请预约？</label>
                    <p>私人定制可在利通金服官方网站PC端【我的账户>投资管理>私人定制】、手机APP【我的>投资管理>私人定制】或联系理财经理进行申请预约投资。</p>
                </div>
            </div>
            <router-link class="pstc_btn" to="/account/personalTailorDetail">立即申请预约</router-link>
            <p class="bottomexplan">利通金服对该服务有最终解释权，在法律允许范围之内有权对该服务内容进行调整。</p>
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
