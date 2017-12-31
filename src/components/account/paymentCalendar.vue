<template>
    <div class="overview">
        <div class="graph">
            回款日历
        </div>
        <div class="chge"></div>
        <div class="index_activityC usercollecTab clearfix">
            <div class="calendar_left" id="calendar_left"></div>
            
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    created(){
        // 时间转unix
        // self.$store.state.unixChange()
    },
    mounted:function(){
        var self = this;
        //关注项目列表获取
        var DateInsert = new Date();
        var signList = [{ "signDay": "09" }, { "signDay": "11" }, { "signDay": "12" }, { "signDay": "13" }, { "signDay": "15" }, { "signDay": "25" }];
        self.$store.state.calUtil.init(signList,"#calendar_left",DateInsert);
        self.preMonth();
    },
    methods: {
        preMonth:function(){
            var self = this;
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            // var nowYear = $(".calendar_month_span").html().split("年")[0];
            self.$store.state.calUtil.showMonth=parseInt(nowMonth)-1;
            if(self.$store.state.calUtil.showMonth==0)
            {
                self.$store.state.calUtil.showMonth=12;
                self.$store.state.calUtil.showYear-=1;
            };
            var changetime = self.$store.state.calUtil.showYear+'-'+self.$store.state.calUtil.showMonth+'-01';
            console.log(self.$store.state.unixChange(changetime));
        },
        getCalendar:function(){

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .calendar_left{width:220px;display: inline-block;}
</style>
