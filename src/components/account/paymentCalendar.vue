<template>
    <div class="overview">
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
        <div class="graph">
            回款日历
        </div>
        <div class="chge"></div>
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
</template>

<script>
  export default {
    data () {
      return {
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
            self.calUtil.showMonth=parseInt(nowMonth)-1;
            self.calUtil.showYear=nowYear;
            if(self.calUtil.showMonth==0)
            {
                self.calUtil.showMonth=12;
                self.calUtil.showYear-=1;
            };
            var changetime = self.calUtil.showYear+'/'+self.calUtil.showMonth+'/01';
            changetime= new Date(changetime);
            // 如果上一个月是当前时间的月份，自动选择今天
            var nowdate = new Date();
            if(nowdate.getFullYear() == self.calUtil.showYear && (nowdate.getMonth() +1) == self.calUtil.showMonth){
                self.getCalendar(changetime,self.datetoday,true,true);
            }else{
                self.getCalendar(changetime,self.datetoday,false);
            }
        },
        nextMonth:function(){
            var self = this;
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            var nowYear = $(".calendar_month_span").html().split("年")[0];
            self.calUtil.showMonth=parseInt(nowMonth)+1;
            self.calUtil.showYear=parseInt(nowYear);
            if(self.calUtil.showMonth==13)
            {
                self.calUtil.showMonth=1;
                self.calUtil.showYear+=1;
            };
            var changetime = self.calUtil.showYear+'/'+self.calUtil.showMonth+'/01';
            changetime= new Date(changetime);
            // 如果下一个月是当前时间的月份，自动选择今天
            var nowdate = new Date();
            if(nowdate.getFullYear() == self.calUtil.showYear && (nowdate.getMonth() +1) == self.calUtil.showMonth){
                self.getCalendar(changetime,self.datetoday,true,true);
            }else{
                self.getCalendar(changetime,self.datetoday,false);
            }
        },
        getCalendar:function(_time,datetoday,ifSelecteddate,ifnexttoday){
            var self = this;
            self._ajax(self,'/api/invest/getCalendar', {
                time: self.unixChange(_time),
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
                self.calUtil.init(repayList,"#calendar_left",_time,repayedList,datetoday);
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
                        self.dailycalendar(self.unixChange(direcedate));
                        $(".Selecteddate").removeClass("Selecteddate");
                        $(this).addClass('Selecteddate');
                    }
                });
                if(ifnexttoday){
                    self.dailycalendar(self.unixChange(datetoday),ifSelecteddate);
                }else{
                    self.dailycalendar(self.unixChange(_time),ifSelecteddate);
                }
                
            }, '');
        },
        dailycalendar:function(_time,ifSelecteddate){
            var self = this;
            var unUnixedTime = self.formatTime(_time);
            self._ajax(self,'/api/invest/calendar', {
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
            var unUnixedTime = self.formatTime(_time);
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
                self._ajax(self,'/api/invest/detail', { id: idget }, function (data) {
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
<style>
    
</style>
