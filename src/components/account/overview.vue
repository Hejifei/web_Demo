<template>
  <div class="overview" v-cloak>
    <div class="graph">
        账户总览
        <router-link class="redBtn" style="margin-right:10px;" to="/account/recharge">充值</router-link>
        <router-link class="redBtn" style="margin-right:10px;" to="/account/withdrawals">提现</router-link>
    </div>
    <div class="chge"></div>
    <div class="commissionGetC">
        <ul class="mypointsul clearfix">
            <li>
                <p>总资产（元）</p>
                <span><label>{{accountAssets.totalMoney}}</label></span>
            </li>
            <li>
                <p>账户余额（元）</p>
                <span><label>{{accountAssets.useMoney}}</label></span>
            </li>
            <li>
                <p>投资待收（元）</p>
                <span><label>{{accountAssets.repayMoney}}</label></span>
            </li>
            <li>
                <p>冻结资金（元）</p>
                <span><label>{{accountAssets.frozen}}</label></span>
            </li>
        </ul>
    </div>
    <div class="chge"></div>
    <div class="commissionDetailC pointsTableC">
        <p>投资资产 <router-link to="/account/investlist" class="getmore">更多</router-link></p>
        <table>
            <thead>
                <tr>
                    <td>累计收益（元）</td>
                    <td>待收本金（元）</td>
                    <td>待收利息（元）</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{accountAssets.getInterest}}</td>
                    <td>{{accountAssets.repayCapital}}</td>
                    <td>{{accountAssets.repayInterest}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="chge"></div>
    <div class="commissionDetailC pointsTableC">
        <p>资金记录 <router-link to="/account/capitalflow" class="getmore">更多</router-link></p>
        <table>
            <thead>
                <tr>
                    <td>累计投资（元）</td>
                    <td>累计充值（元）</td>
                    <td>累计提现（元）</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{accountAssets.bidMoney}}</td>
                    <td>{{accountAssets.totalRecharge}}</td>
                    <td>{{accountAssets.totalWithdraw}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- @*<div class="userInfoTableC" >
        <table>
            <tbody>
                <tr>
                    <td><span class="squareSpan"></span> 账户余额</td><td>可用金额</td><td>{{accountAssets.useMoney}}元</td><td colspan="2"><a class="tixianbtn" href="/Member/Capital/Withdraw">提现</a><a class="chongzhibtn" href="/Member/Capital/Recharge">充值</a></td>
                </tr>
                <tr>
                    <td><span class="squareSpan"></span> 预约投标</td><td>持有资产</td><td>{{accountAssets.autoMoney}}元</td><td>累计收益</td><td>{{accountAssets.autoInterest}}元</td>
                </tr>
                <tr>
                    <td><span class="squareSpan"></span> 私人订制</td><td>持有资产</td><td>{{accountAssets.bespokeMoney}}元</td><td>累计收益</td><td>{{accountAssets.bespokeInterest}}元</td>
                </tr>
                <tr>
                    <td><span class="squareSpan"></span> 散标债权</td><td>持有资产</td><td>{{accountAssets.bidMoney}}元</td><td>累计收益</td><td>{{accountAssets.getInterest}}元</td>
                </tr>
                <tr>
                    <td><span class="squareSpan"></span> 生利宝</td><td>持有资产</td><td>{{accountAssets.fssTransMoney}}元</td><td>累计收益</td><td>{{accountAssets.fssTransInterest}}元</td>
                </tr>
                <tr>
                    <td><span class="squareSpan"></span> 我的借款</td><td>已借金额</td><td>{{accountAssets.loanMoney}}元</td><td>五日待还</td><td class="jiekuantd">{{accountAssets.loanInterest}}元</td>
                </tr>
            </tbody>
        </table>
    </div>*@ -->
</div>
</template>

<script>
  export default {
    data () {
      return {
        accountAssets: []
      }
    },
    mounted:function(){
      var self = this;
      //用户信息获取
      self.$store.state._ajax(self,'/api/account/assets', {}, function (data) {
        //console.log(data)
        self.accountAssets = data.data;
      }, '');
            
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pointsTableC table td:nth-child(1){text-align:center;}
    .pointsTableC table td:nth-child(3){text-align:center;}
    .getmore{float:right;color:#969696;}
</style>
