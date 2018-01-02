<template>
    <div class="overview">
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
                            <a><img :src="daylist.img" />{{daylist.title}}<label>{{daylist.repayTime}}<i class="icon-angle-right"></i></label></a>
                            <p>
                                <label>待收本金：<span>{{daylist.captial}}元</span></label>
                                <label>待收利息：<span>{{daylist.interest}}元</span></label>
                            </p>
                        </li>
                    </ul>
                    <div class="dayListC" v-if="dayList.length == 0">
                        <img src="/static/img/nopayment.png"/>
                    </div>
                    <div class="btnLine">
                        <a v-if="nextTime != ''">查看下一收益日</a>
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
        // 时间转unix
        // self.$store.state.unixChange()
        var self = this;
        //关注项目列表获取
        var DateInsert = new Date();
        var datetoday = ''+ DateInsert.getFullYear()+'-'+(DateInsert.getMonth() +1)+'-'+DateInsert.getDate();
        self.getCalendar(DateInsert,datetoday);
    },
    mounted:function(){
        
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
            var changetime = self.$store.state.calUtil.showYear+'-'+self.$store.state.calUtil.showMonth+'-01';
            self.getCalendar(changetime);
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
            var changetime = self.$store.state.calUtil.showYear+'-'+self.$store.state.calUtil.showMonth+'-01';
            self.getCalendar(changetime);
        },
        getCalendar:function(_time,datetoday){
            var self = this;
            self.$store.state._ajax(self,'/api/invest/getCalendar', {
                time: self.$store.state.unixChange(_time),
            }, function (data) {
                console.log(data);
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
                        var direcedate = new Array($(this).attr("date"));
                        self.dailycalendar(self.$store.state.unixChange(direcedate),direcedate);
                    }
                });
                self.dailycalendar(self.$store.state.unixChange(_time),_time);
            }, '');
        },
        dailycalendar:function(_time,unUnixedTime){
            var self = this;
            self.$store.state._ajax(self,'/api/invest/calendar', {
                time: _time,
            }, function (data) {
                var dayList=data.data.dayList;
                if(dayList != null &&dayList.length > 0){
                    for(var i =0;i<dayList.length;i++){
                        dayList[i].repayTime = (dayList[i].repayTime).substr(0,10);
                    }
                }
                self.dayList = dayList;
                self.nextTime = data.data.nextTime;
                $(".Selecteddate").removeClass("Selecteddate");
                
                $(".sign_row div").each(function(){
                    if($(this).attr("date") && $(this).attr("date") == unUnixedTime){
                        console.log(unUnixedTime);
                        $(this).addClass('Selecteddate');
                    }
                })
            })
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
