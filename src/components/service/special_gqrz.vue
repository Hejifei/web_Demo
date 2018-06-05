<template>
    <div class="Special_gqrzC">
        <div class="SG_topbanner"></div>
        <div class="SG_body">
            <div class="SG_bodyC">
                <div class="gqrzP">
                    <h3>
                        <img src="../../common/stylus/img/gqrz_title_left.png"/>
                        利通金服受国企资本青睐，综合实力再升级
                        <img src="../../common/stylus/img/gqrz_title_right.png"/>
                    </h3>
                    <p>随着互金整改的不断深入，网贷平台想要得到国企资本的认可并非易事。然而利通金服，却以其出色的平台实力以及运营的合规性，获得了国企资本的青睐，并签订收购协议。</p>
                </div>
                <div class="gqrzP">
                    <h3>
                        <img src="../../common/stylus/img/gqrz_title_left.png"/>
                        与国企签到收购协议
                        <img src="../../common/stylus/img/gqrz_title_right.png"/>
                    </h3>
                    <div class="row">
                        <p class="width530">5月8日，江苏国陕经协能源科技有限公司与利通金服签订收购协议。据了解，江苏国陕经协能源科技有限公司是由陕西省经济协作总公司控股的全资子公司，注册资金为5亿元，而陕西省经济协作总公司则是名副其实的国企。自此利通金服跻身国资系P2P行列，实力更上一层楼。</p>
                        <img src="../../common/stylus/img/gqrz_qy.png" />
                    </div>
                </div>
                <div class="gqrzP">
                    <h3>
                        <img src="../../common/stylus/img/gqrz_title_left.png"/>
                        平台实力强劲，引国企关注
                        <img src="../../common/stylus/img/gqrz_title_right.png"/>
                    </h3>
                    <div class="row width550C">
                        <div class="width550">
                            <p class="top13p bottom20p">利通金服是苏州利通金砖金融信息服务有限公司重点打造的互联网金融平台，旨在为广大出借人提供一个诚信、安全、便捷、高效、风险适度可控、收益丰盈可期的投资渠道，实现财富的保值增值，因而深受平台投资用户的青睐。</p>
                            <p>与此同时，为了实现大众投资者财富的稳定增长，利通金服从成立之日起，就一直拥有专业的投资管理团队，并精心研究与设计了利房宝、利企宝、利车宝等优质的理财项目，年化收益率均在6.8%-13%，项目周期分布在7天-36个月之间，方</p>
                        </div>
                        <img src="../../common/stylus/img/gqrz_gx.png" />
                    </div>
                    <p class="textindent0">便投资者自由选择。不仅如此，平台在项目选择上均坚持“小额分散”的投资原则，从源头上把控项目风险，给予投资者强力的资金安全保障。</p>
                    <div class="row">
                        <img class="img_safe top20p" src="../../common/stylus/img/gqrz_safe.png" />
                        <div class="width580">
                            <p class="top20p">江苏国陕经协能源科技有限公司选择收购利通金服，就是看中平台在运营能力、财务状况、风险评估、盈利预期、前景判定等各方面均有不俗的成绩，且平台合规性也受到了多方面的认可，因此该公司十分看好利通金服的发展前景。</p>
                        </div>
                    </div>
                    
                </div>
                <div class="gqrzP">
                    <h3>
                        <img src="../../common/stylus/img/gqrz_title_left.png"/>
                        国资收购，综合实力再升级
                        <img src="../../common/stylus/img/gqrz_title_right.png"/>
                    </h3>
                    <p>由国企控股的全资子公司收购，对利通金服来说，可以带来更多的资源；对投资者来说，资金安全保障性更高。同时，国资收购，说明了利通金服稳健的合规运营，也意味着利通金服在网贷领域获得国资企业的广泛认可。</p>
                    <div class="row">
                        <div class="width570">
                            <p class="top20p bottom20p">收购以后，利通金服的综合实力得到进一步提升：其一，相对而言更规范，风控更严。国资系向上要对控股企业负责，向下要对投资者负责，相对于民营系风控更加严格；其二，安全性更突出。国资系P2P平台业务来源相对更优质，运营流程更规范，比民营系平台更安全；其三，品牌影响力更大，资源更多。老牌国有企业在行业内有很大的品牌影响力和知名度，在获取优质资源中，比民营系平台有更多的优质资源。</p>
                        </div>
                        <img src="../../common/stylus/img/gqrz_sj.png" />
                    </div>
                    <p>晋升为国资系平台，利通金服未来将继续以合规建设作为平台</p>
                    <p class="textindent0">发展的核心，并将通过互联网技术与金融服务相融合，为广大投资人提供诚信安全的互联网金融理财服务，助推中国普惠金融的发展更上一层楼！</p>
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
