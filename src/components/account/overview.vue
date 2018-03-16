<template>
  <div class="overview" v-cloak>
    <div class="commissionDetailC pointsTableC">
        <p>总资产（元）</p>
        <div class="zzcline">
            <label>{{accountAssets.totalMoney}}</label>
            <router-link class="whiteBtn" to="/account/withdrawals">提现</router-link>
            <router-link class="redBtn" to="/account/recharge">充值</router-link>
        </div>
        <div class="zhzl_ulC">
            <ul>
                <li>账户余额（元）：{{accountAssets.useMoney}}</li>
                <li>投资待收（元）：{{accountAssets.repayMoney}}</li>
                <li>冻结资金（元）：{{accountAssets.frozen}}</li>
            </ul>
        </div>
    </div>
    <div class="chgenew"></div>
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
    <div class="chgenew"></div>
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
    <div class="chgenew"></div>
    <div class="commissionDetailC pointsTableC">
        <p>回款日历</p>
        <div class="usercollecTab">
            <div class="calendarC">
                <div class="calendar_left">
                    <div id="calendar_left"></div>
                    <div class="calendar_left_text">
                        <div><label>{{nowMonth}}月待收本息：</label><span>{{repayNum}}元</span></div>
                        <div><label>{{nowMonth}}月已收本息：</label><span>{{repayedNum}}元</span></div>
                    </div>
                </div>
                <div class="calendar_right">
                    <ul class="dayListC" v-if="dayList.length > 0">
                        <li v-for="(daylist,index) in dayList" :key="index">
                            <a @click="HuankuanDetail(daylist.UPID)"><img :src="daylist.img" />{{daylist.title}}<label>{{daylist.repayTime}}<i class="icon-angle-right"></i></label></a>
                            <p v-if="daylist.isPay == 0">
                                <label>待收本金：<span>{{daylist.captial}}元</span></label>
                                <label>待收利息：<span>{{daylist.interest}}元</span></label>
                            </p>
                            <p v-if="daylist.isPay == 1">
                                <label>已收本金：<span>{{daylist.captial}}元</span></label>
                                <label>已收利息：<span>{{daylist.interest}}元</span></label>
                            </p>
                        </li>
                    </ul>
                    <div class="dayListC" v-if="dayList.length == 0">
                        <img class="norepayimg" src="/static/img/nopayment.png"/>
                    </div>
                    <div class="btnLine">
                        <a v-if="nextTime != ''" @click="nextPaydate(nextTime)">查看下一收益日</a>
                        <router-link  v-if="nextTime == ''" to="/product">赚更多收益</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="ContactC">
            <div id="Contact">
                <div class="Contact_box">
                    <div class="cancelmodelbtn"><span class="icon-remove"></span></div>
                    <div class="Contact_head">
                        收益详情
                    </div>
                    <div class="Contact_body">
                        <div class="sqbody" style="height:296px;">
                            <div class="sqbodyson">
                                <table class="model_table" style=''>
                                    <thead>
                                        <tr>
                                            <td>期次</td>
                                            <td>应收日期</td>
                                            <td>实收日期</td>
                                            <td>应收本金</td>
                                            <td>应收收益</td>
                                            <td>应收总额</td>
                                            <td>状态</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        accountAssets: [],
        repayNum:0,
        repayedNum:0,
        dayList:[],
        nextTime:'',
        nowMonth:'0'
      }
    },
    created(){
        var self = this;
        //关注项目列表获取
        var DateInsert = new Date();
        var datetoday = ''+ DateInsert.getFullYear()+'-'+(DateInsert.getMonth() +1)+'-'+DateInsert.getDate();
        self.datetoday = datetoday;
        self.getCalendar(DateInsert,datetoday,true);
    },
    mounted:function(){
        var self = this;
        //用户信息获取
        self.$store.state._ajax(self,'/api/account/assets', {}, function (data) {
            //console.log(data)
            self.accountAssets = data.data;
        }, '');

        //模态框隐藏
        $(".cancelmodelbtn").click(function () {
            $("#ContactC").hide();
        })
        $("#ContactC").click(function (e) {
            if (e.target.id == "ContactC" || e.target.id == "Model") {
                $("#ContactC").hide();
            }
        })      
    },
    methods: {
        preMonth:function(){
            var self = this;
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            var nowYear = $(".calendar_month_span").html().split("年")[0];
            self.$store.state.calUtil.showMonth=parseInt(nowMonth)-1;
            self.$store.state.calUtil.showYear=nowYear;
            if(self.$store.state.calUtil.showMonth==0)
            {
                self.$store.state.calUtil.showMonth=12;
                self.$store.state.calUtil.showYear-=1;
            };
            var changetime = self.$store.state.calUtil.showYear+'/'+self.$store.state.calUtil.showMonth+'/01';
            changetime= new Date(changetime);
            // 如果上一个月是当前时间的月份，自动选择今天
            var nowdate = new Date();
            if(nowdate.getFullYear() == self.$store.state.calUtil.showYear && (nowdate.getMonth() +1) == self.$store.state.calUtil.showMonth){
                self.getCalendar(changetime,self.datetoday,true,true);
            }else{
                self.getCalendar(changetime,self.datetoday,false);
            }
        },
        nextMonth:function(){
            var self = this;
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            var nowYear = $(".calendar_month_span").html().split("年")[0];
            self.$store.state.calUtil.showMonth=parseInt(nowMonth)+1;
            self.$store.state.calUtil.showYear=parseInt(nowYear);
            if(self.$store.state.calUtil.showMonth==13)
            {
                self.$store.state.calUtil.showMonth=1;
                self.$store.state.calUtil.showYear+=1;
            };
            var changetime = self.$store.state.calUtil.showYear+'/'+self.$store.state.calUtil.showMonth+'/01';
            changetime= new Date(changetime);
            // 如果下一个月是当前时间的月份，自动选择今天
            var nowdate = new Date();
            if(nowdate.getFullYear() == self.$store.state.calUtil.showYear && (nowdate.getMonth() +1) == self.$store.state.calUtil.showMonth){
                self.getCalendar(changetime,self.datetoday,true,true);
            }else{
                self.getCalendar(changetime,self.datetoday,false);
            }
        },
        getCalendar:function(_time,datetoday,ifSelecteddate,ifnexttoday){
            var self = this;
            self.$store.state._ajax(self,'/api/invest/getCalendar', {
                time: self.$store.state.unixChange(_time),
            }, function (data) {
                self.repayNum = data.data.repayNum != null ? data.data.repayNum : 0;
                self.repayedNum = data.data.repayed != null ? data.data.repayedNum : 0;
                self.nextTime = data.data.nextTime;
                var repayList = new Array();
                var repayedList = new Array();
                if(data.data.repay != null && (data.data.repay).length > 0){
                    for(var i = 0;i<data.data.repay.length;i++){
                        let repayTime = data.data.repay[i].repayTime.substr(8,2);
                        repayList.push({ "signDay": repayTime });
                    }
                }else if(data.data.repayed != null && (data.data.repayed).length > 0){
                    for(var i = 0;i<data.data.repayed.length;i++){
                        let repayTime = data.data.repayed[i].repayTime.substr(8,2);
                        repayedList.push({ "signDay": repayTime });
                    }
                }
                // var repayList = [{ "signDay": "09" }, { "signDay": "11" }, { "signDay": "12" }, { "signDay": "13" }, { "signDay": "15" }, { "signDay": "25" }];
                self.$store.state.calUtil.init(repayList,"#calendar_left",_time,repayedList,datetoday);
                var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
                self.nowMonth = nowMonth;
                // 绑定点击查看上一个月
                $(".prevbtn").click(function(){
                    self.preMonth();
                });
                $(".nextbtn").click(function(){
                    self.nextMonth();
                });
                $(".sign_row div").click(function(){
                    if($(this).attr("date")){
                        var direcedate = $(this).attr("date");
                        direcedate = direcedate.replace(/-/g, "\/");
                        direcedate = new Date(direcedate);
                        self.dailycalendar(self.$store.state.unixChange(direcedate));
                        $(".Selecteddate").removeClass("Selecteddate");
                        $(this).addClass('Selecteddate');
                    }
                });
                if(ifnexttoday){
                    self.dailycalendar(self.$store.state.unixChange(datetoday),ifSelecteddate);
                }else{
                    self.dailycalendar(self.$store.state.unixChange(_time),ifSelecteddate);
                }
                
            }, '');
        },
        dailycalendar:function(_time,ifSelecteddate){
            var self = this;
            var unUnixedTime = self.$store.state.formatTime(_time);
            self.$store.state._ajax(self,'/api/invest/calendar', {
                time: _time,
            }, function (data) {
                var dayList=data.data.dayList;
                if(dayList != null && dayList.length > 0){
                    for(var i =0;i<dayList.length;i++){
                        dayList[i].repayTime = (dayList[i].repayTime).substr(0,10);
                    }
                }
                self.dayList = dayList == null ? [] :dayList;
                self.nextTime = data.data.nextTime;
                if(ifSelecteddate){
                    $(".Selecteddate").removeClass("Selecteddate");
                    $(".sign_row div").each(function(){
                        if($(this).attr("date") && $(this).attr("date") == unUnixedTime){
                            $(this).addClass('Selecteddate');
                        }
                    })
                }
            })
        },
        nextPaydate:function(_time){
            var self = this;
            var unUnixedTime = self.$store.state.formatTime(_time);
            unUnixedTime = unUnixedTime.replace(/-/g, "\/");
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            var purposeMonth = (new Date(unUnixedTime)).getMonth() + 1;
            if(purposeMonth != nowMonth){
                // var DateInsert = new Date();
                // var datetoday = ''+ DateInsert.getFullYear()+'-'+(DateInsert.getMonth() +1)+'-'+DateInsert.getDate();
                var purposeDate = new Date(unUnixedTime);
                self.getCalendar(purposeDate,self.datetoday,true);
            }else{
                self.dailycalendar(_time,true);
            }
        },
        HuankuanDetail:function(idget) {
                var self = this;
                //签到记录取
                self.$store.state._ajax(self,'/api/invest/detail', { id: idget }, function (data) {
                    var investdetaillist = data.data.list;
                    $(".model_table tbody").html("");
                    var temp = "";
                    if (investdetaillist.length == 0) {
                        temp='<tr><td colspan="7">暂无数据</td></tr>'
                    } else {
                        for (var i = 0; i < investdetaillist.length; i++) {
                            investdetaillist[i].repayTime = investdetaillist[i].repayTime.substr(0, 10);
                            investdetaillist[i].payTime = investdetaillist[i].payTime == null ? '--': investdetaillist[i].payTime.substr(0, 10);
                            switch (investdetaillist[i].is_pay) {
                                case '0':
                                    investdetaillist[i].is_pay = "未还";
                                    break;
                                case '1':
                                    investdetaillist[i].is_pay = "已还";
                                    break;
                                case '2':
                                    investdetaillist[i].is_pay = "提前还款";
                                    break;
                                case '3':
                                    investdetaillist[i].is_pay = "结束";
                                    break;
                                case '4':
                                    investdetaillist[i].is_pay = "已返";
                                    break;
                            }
                            temp += '<tr>'+
                                        '<td>'+ (i+1) +'</td>' +
                                        '<td>' + investdetaillist[i].repayTime + '</td>' +
                                        '<td>' + investdetaillist[i].payTime + '</td>' +
                                        '<td>' + investdetaillist[i].repayCapital + '</td>' +
                                        '<td>' + investdetaillist[i].repayInterest + '</td>' +
                                        '<td>' + investdetaillist[i].repayMoney + '</td>' +
                                        '<td>' + investdetaillist[i].is_pay + '</td>' +
                                '</tr>'
                        }
                    }
                    $(".model_table tbody").html(temp);
                    self.investdetaillist = investdetaillist;
                    $("#ContactC").show();
                }, '');
            },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pointsTableC table td:nth-child(1){text-align:center;}
    .pointsTableC table td:nth-child(3){text-align:center;}
    .getmore{float:right;color:#969696;}
</style>
