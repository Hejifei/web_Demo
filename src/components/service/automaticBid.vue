<template>
    <div class="atmtcBC">
        <div class="atmtcB_head"></div>
        <div class="atmtcB_body">
            <div class="rockettopC">
                <img src="../../common/stylus/img/rocket_1.png" />
            </div>
            <div class="atmtcB_boxC">
                <div class="atmtcB_outline border_left0">
                    <div class="atmtcB_centerline border_left0">
                        <div class="atmtcB_centerline2 border_left0">
                            <div class="atmtcB_innerline border_left0">
                                <img src="../../common/stylus/img/automaticBid_logo1.png" />
                                <p>自动投标功能是利通金服新推出的自动化投标工具。投资者<br />可根据自己的风险偏好、投资习惯在自动投标中设置投资<br />参数，系统根据参数自动匹配符合条件的项目完成投标。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="starimg" src="../../common/stylus/img/automaticBid_star1.png" />
            </div>
            <div class="atmtcB_boxC up61 width92">
                <div class="atmtcB_outline border_right0">
                    <div class="atmtcB_centerline border_right0">
                        <div class="atmtcB_centerline2 border_right0">
                            <div class="atmtcB_innerline border_right0" style="padding-top: 95px !important;">
                                <p>自动投标功能可以提高资金的使用率，避免资金闲置，<br />让您的资金最大效率的为您获取利益。</p>
                                <img src="../../common/stylus/img/automaticBid_logo2.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <img class="starimg starimgleft" src="../../common/stylus/img/automaticBid_star2.png" />
            </div>
            <div class="atmtcB_boxC up61 width92 marginleft8">
                <div class="atmtcB_outline border_left0">
                    <div class="atmtcB_centerline border_left0">
                        <div class="atmtcB_centerline2 border_left0">
                            <div class="atmtcB_innerline border_left0" style="padding-left:0 !important;">
                                <img src="../../common/stylus/img/automaticBid_logo3.png" />
                                <p>平台会根据用户排队情况分配自动投标专属标的，<br />自动投标用户可以优先投资，降低资金站岗时间成本。</p>        
                            </div>
                        </div>
                    </div>
                </div>
                <img class="starimg" src="../../common/stylus/img/automaticBid_star3.png" />
            </div>
            <div class="atmtcB_boxC up61 width92">
                <div class="atmtcB_outline border_right0">
                    <div class="atmtcB_centerline border_right0">
                        <div class="atmtcB_centerline2 border_right0">
                            <div class="atmtcB_innerline border_right0" style="padding-top: 95px !important;">
                                <p>自动投标功能，可以自由设置您所喜好的利率，投标期限，<br />投标金额等。随时随地定制专属您的投资爱好。</p>
                                <img src="../../common/stylus/img/automaticBid_logo4.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <img class="starimg starimgleft" src="../../common/stylus/img/automaticBid_star4.png" />
                <div class="atmtcB_specialson">
                    <div class="atmtcB_specialsonBody"></div>
                </div>
            </div>
            <div class="automaticB_btnC">
                <router-link to="/account/objectBookingDetails">立即加入</router-link>
            </div>
            <div class="rocketcenterC">
                <img src="../../common/stylus/img/rocket_2.png" />
            </div>
            <div class="automaticB_rules">
                <p>1.	用户开启自动投标功能即视为委托利通金服平台与借款人签署借款合同，并承担该合同项下的一切权利及义务；</p>
                <p>2.	当平台有项目发布时，在项目正式开始投标前，按照用户开启自动投标功能的时间先后顺序进行排队优先投标，投资的金额不高于项目允许的单笔可投金额，完成一次投标后，该用户将移至队尾重新进行排队；</p>
                <p>3.	本平台项目，按一定比例划分为自动投标和手动投标部分，目前债权转让项目、私人定制项目及新手标不支持自动投标功能；</p>			
                <p>4.	设置参数中，“最大投资金额”表示自动投标每笔投资可使用的最大金额，如果不想将账户余额全部投资，请设置“账户保留金额”；</p>
                <p>5.	用户勾选使用红包或加息券后，平台将根据投资情况自动使用符合条件的最大面额红包或加息券。遇到投标尾单可能会导致因红包不符合使用条件而未使用；</p>
                <p>6.	若将投标状态设置为“重复投资”，自动投标成交后，用户的自动投标功能不会自动关闭，如果需要关闭，需进行手工设置；</p>		
                <p>7.	自动投标“排队人数”根据选择产品期限分别排序，用户任何对于自动投标的调整和开关都会导致用户重新排队到队尾；</p>
                <p>8.	用户点击“确认”按钮，输入交易密码，自动投标功能将立即开启；</p>
                <p>9.	本规则的解释权归利通金服所有，平台有权对本规则进行修订。</p>
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
