<template>
    <div>
        <div class="bankDeposittopimg"></div>
        <!-- @*什么是银行存管*@ -->
        <div class="bankDepositC">
            <div class="bankDepositBox">
                <!-- <div class="bankDepTitleC">
                    <h1>—— 拥抱合规 存管升级 ——</h1>
                    <p style="line-height:18px;">2017年5月9日，利通金服与贵州银行正式签署资金存管协议，这意味着利通金服平台将由原来的联合存管模式正式升级为直接存管模式，以保证符合监管要求。</p>
                </div> -->
                <div class="bankDepTitleline">
                    <span>什么是银行存管<i></i></span>
                </div>
                <div class="bankDepInfo" style="top:-60px;">
                    <img src="../../common/stylus/img/bankDepMan.png"/>
                    <p>银行存管是互联网金融平台在存管银行拥有独立存管子账户，由存管银行对资金进行管理与监督，是杜绝平台碰触用户资金的一种资金安全保障方式。</p>
                </div>
            </div>
        </div>
        <!-- @*利通金服银行存管模式*@ -->
        <div class="bankDepositC bankDepStyle">
            <div class="bankDepositBox">
                <div class="bankDepTitleline"  style="top:55px;">
                    <span  style="color:#fff;">利通金服银行存管模式<i class="whitei"></i></span>
                    <img  src="../../common/stylus/img/bankDepStyleCenter.png"/>
                </div>
                
            </div>
        </div>
        <!-- @*银行存管的好处*@ -->
        <div class="bankDepositC">
            <div class="bankDepositBox" style="padding-top: 20px;">
                <div class="bankDepTitleline">
                    <span>银行存管的好处<i></i></span>
                </div>
                <div class="bankDepInfo">
                    <ul class="clearfix">
                        <li>
                            <label>资金隔离</label>
                            <div>用户资金和平台资金实行账户隔离，分账管理。</div>
                        </li>
                        <li>
                            <label>交易安全</label>
                            <div>所有资金交易环节均在存管银行系统进行，用户授权方可操作执行。</div>
                        </li>
                        <li>
                            <label>账户独立</label>
                            <div>用户在存管银行开通的账户都为独立子账户，账户信息由银行保管。</div>
                        </li>
                        <li>
                            <label>交易有效</label>
                            <div>银行全程记录用户的交易指令和资金变动走向，保证交易真实有效。</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- @*合规进程 实时更新*@ -->
        <!-- <div class="bankDepositC bankDepProcess">
            <div class="bankDepositBox">
                <div class="bankDepTitleline" style="top:55px;">
                    <span style="color:#fff;">合规进程 实时更新<i class="whitei"></i></span>
                    <img src="../../common/stylus/img/bankDepProcessCenter.png"/>
                </div>
                <div class="bankDepInfo" style="margin-top:40px;line-height:18px;color:#ccc;position:static;">
                    <p style="color:#586B81;font-size:12px;">出借有风险，投资需理性。</p>
                    <p style="margin-top:0;color:#586B81;font-size:12px;">如有疑问请联系在线客服或拨打客服热线 400-606-1018</p>
                </div>
            </div>
        </div> -->
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
