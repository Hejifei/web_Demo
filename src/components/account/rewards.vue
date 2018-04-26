<template>
    <div class="overview">
        <div class="graph">
            我的奖励金
            <span style="color:#eb494b;cursor:pointer;" 
            title="什么是奖励金？
奖励金账户是平台新上线的奖励资金存放功能，所有在平台获取的奖励（签到奖励、邀请奖励
活动奖励、其他奖励等）均会发放至奖励金账户，如果用户需要使用这笔资金，需手动从奖励
金账户中将资金转出至账户余额，在后台审核通过后发放至余额账户。" class="icon-info-sign"></span>
            <a class="newredBtn" v-on:click="outtoBalance">转出至余额</a>
        </div>
        <div class="chgenew"></div>
        <!-- @*我的奖励金*@ -->
        <div class="commissionGetC">
            <ul class="mypointsul clearfix">
                <li>
                    <p>奖励金余额（元）</p>
                    <span><label>{{reward}}</label></span>
                </li>
                <li>
                    <p>累计获得的奖励金（元）</p>
                    <span><label>{{totalReward}}</label></span>
                </li>
                <li>
                    <p></p>
                    <span><label></label></span>
                </li>
                <li>
                    <p></p>
                    <span><label></label></span>
                </li>
            </ul>
            <!-- @*<p>奖励金余额</p>
            <span><label>{{reward}}</label>元</span>*@ -->
        </div>
        <div class="chgenew"></div>
        <div class="commissionDetailC">
            <p>奖励金明细</p>
            <table>
                <thead>
                    <tr>
                        <td>业务类型</td><td>奖励金额</td><td>创建日期</td><td>到账金额</td><td>交易流水</td><td>交易时间</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(award,index) in arrlist" :key="index">
                        <td>{{award.title}}</td>
                        <td v-if="award.awardType == 1">+{{award.money}}</td>
                        <td v-if="award.awardType == 2">-{{award.money}}</td>
                        <td>{{award.createTime}}</td>
                        <td>{{award.realMoney }}</td>
                        <td>{{award.serialNum}}</td>
                        <td>{{award.payTime}}</td>
                        <!-- @*<td v-if="award.status == 0">未审核</td>
                        <td v-if="award.status == 1">已审核</td>
                        <td v-if="award.status == 2">处理中</td>*@ -->
                    </tr>
                    <tr v-if="arrlist.length == 0">
                        <td colspan="6">您还没有获得任何奖励金！</td>
                    </tr>
                </tbody>
            </table>
            <div class="pages mypage clearfix">
                <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        arrlist: [],
        reward: '',
        totalReward:''
      }
    },
    mounted:function(){
        var self = this;
        this.getawardList(1);
        // this.title = this.list.join('\n');
    },
    methods: {
        getawardList:function(_page) {
            var self = this;
            self._ajax(self,'/api/account/award',
                {
                    page: _page
                },
                function (data) {
                    //console.log(data)
                    var arrlist = data.data.record.data;
                    if (arrlist.length == 0) {
                        //分页的重置
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < arrlist.length; i++) {
                            arrlist[i].payTime = (arrlist[i].payTime == null) ? '--' : arrlist[i].payTime.substr(0, 16);
                            console.log(arrlist[i].createTime);
                            arrlist[i].createTime = (arrlist[i].createTime == null) ? '--' :  arrlist[i].createTime.substr(0, 10);
                            console.log(arrlist[i].createTime);
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.record.last_page,
                            current: parseInt(data.data.record.current_page),
                            backFn: function (p) {
                                self.getawardList(p);
                            }
                        });
                    }
                    self.reward = parseFloat(data.data.reward.reward).toFixed(2);
                    self.totalReward = parseFloat(data.data.reward.totalReward).toFixed(2);
                    self.arrlist = arrlist;
                }, '');
        },
        outtoBalance: function () {
            var self = this;
            const reward = this.reward;
            layer.confirm("是否转出至余额？",{title: '操作提示'},function(){
                //奖励金转出
                self._ajax(self,'/api/award/index', { money: reward }, function (data) {
                    self.bankcardList = data.data;
                }, function (data) {
                    layer.alert(data.msg,{title: '操作提示',icon: 5},function(){window.location.reload();});
                });
            },function(){
                layer.closeAll();
            });
        }
        
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
