<template>
    <div class="Special_DBF">
        <div class="DBF_topbannerC">
            <div class="DBF_topbanner"></div>
        </div>
        <div class="DBF_bodyC">
            <div class="DBF_body">
                <h3>
                    <span>端午节</span>是纪念一个伟大男人的日子；<span>父亲节</span>是属于一个无私奉献男人的日子。
                </h3>
                <img src="../../common/stylus/img/specialDBFPline.png"/>
                <div class="DBF_part1 clearfix">
                    <div class="part1_son">
                        <label>当端午节遇上父亲节</label>
                        <p>注定情意满满；当你遇上<span>“5”</span>，注定福利多多。</p>
                    </div>
                    <div class="part1_son">
                        <label>利通金服“端5节”活动正式启动</label>
                        <p>在炎炎夏日为广大投资用户带来多重福利，准备好了吗？让我们一起双节同庆喜逢<span>“5”</span>，多一点，再多一点，赚得不止一点点！</p>
                    </div>
                </div>
                <img src="../../common/stylus/img/specialDBFPline.png"/>
                <div class="DBF_part2">
                    <label>活动时间：6月14日-6月20日</label>
                    <div class="part2SonC">
                        <div class="sons son1">
                            <img src="../../common/stylus/img/specialDBF1.png"/>
                            <div class="numberC">
                                <div class="numberleft">
                                    <div class="numberlefttop">单笔投资*项目期限（月）</div>
                                    <div class="numberleftbottom">12</div>
                                </div>
                                <div class="numberright">≥ 5000元</div>
                            </div>
                            <div class="soninfoC">
                                <div class="soninfo">送50元理财红包</div>
                            </div>
                        </div>
                        <div class="sons son2">
                            <img src="../../common/stylus/img/specialDBF2.png"/>
                            <div class="numberC">
                                <div class="numberleft">
                                    <div class="numberlefttop">单笔投资*项目期限（月）</div>
                                    <div class="numberleftbottom">12</div>
                                </div>
                                <div class="numberright">≥ 15000元</div>
                            </div>
                            <div class="soninfoC">
                                <div class="soninfo">送150元理财红包</div>
                            </div>
                        </div>
                        <div class="sons son3">
                            <img src="../../common/stylus/img/specialDBF3.png"/>
                            <div class="numberC">
                                <div class="numberleft">
                                    <div class="numberlefttop">单笔投资*项目期限（月）</div>
                                    <div class="numberleftbottom">12</div>
                                </div>
                                <div class="numberright">≥ 50000元</div>
                            </div>
                            <div class="soninfoC">
                                <div class="soninfo">送500元理财红包(2*150红包、4*50红包)</div>
                            </div>
                        </div>
                    </div>
                    <div class="exampleC">
                        <i>
                            <img src='../../common/stylus/img/specialDBFexampleleft.png'/>
                            例子
                            <img src='../../common/stylus/img/specialDBFexampleright.png'/>    
                        </i>
                        <p>用户a投资了20000元期限为三个月的项目20000*3/12=5000，a即可获得50元理财红包1个。</p>
                    </div>
                </div>
                <img src="../../common/stylus/img/specialDBFPline.png"/>
                <div class="DBF_part3">
                    <label>备注</label>
                    <p><img src="../../common/stylus/img/specialDBF1.png"/>所有理财红包仅供三个月及以上项目使用</p>
                    <p><img src="../../common/stylus/img/specialDBF2.png"/>理财红包使用期限为一个月，理财红包发放时间为活动结束后两个工作日内。</p>
                </div>
                <!-- https://lanhuapp.com/web/#/item/board/detail?pid=2a47658d-5e88-4c88-ad35-8795c2b41ad4&project_id=2a47658d-5e88-4c88-ad35-8795c2b41ad4&image_id=00530be0-f3f8-4b27-a12a-492bb63beeb0 -->
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
