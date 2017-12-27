<template>
    <div  class="overview">
        <div class="graph">
            生利宝
            <a class="redBtn" v-on:click="gotoSLB">进入生利宝</a>
            <!-- @*<a class="redBtn" href="/Member/Invest/FssTransList" style="margin-right:15px;">历史交易</a>*@ -->
        </div>
        <div class="chge"></div>
        <div class="content-rowlist" style="margin-top:20px">
            <div class="bloom">
                <div>
                    <span class="fl"></span>
                    <h3 class="fl">收益计算规则</h3>
                </div>
                <p>工作日当日15:00前购买，T+1日计息，于T+2日可进行查看。</p>
                <p>工作日当日15:00后购买，T+2日计息，于T+3日可进行查看。</p>
                <p style="margin-top: 15px;margin-bottom:20px">举例如下（假设不含节假日）：</p>
            </div>
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr>
                        <th>转入时间</th>
                        <th>基金公司确认时间</th>
                        <th>首次收益时间</th>
                        <th>首次收益显示时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>周一15:00~周二15:00</td>
                        <td>周三</td>
                        <td>周三</td>
                        <td>周四</td>
                    </tr>
                    <tr>
                        <td>周二15:00~周三15:00</td>
                        <td>周四</td>
                        <td>周四</td>
                        <td>周五</td>
                    </tr>
                    <tr>
                        <td>周三15:00~周四15:00</td>
                        <td>周五</td>
                        <td>周五</td>
                        <td>周六</td>
                    </tr>
                    <tr>
                        <td>周四15:00~周五15:00</td>
                        <td>下周一</td>
                        <td>下周一</td>
                        <td>下周二</td>
                    </tr>
                    <tr>
                        <td>周五15:00~下周一15:00</td>
                        <td>下周二</td>
                        <td>下周二</td>
                        <td>下周三</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    mounted:function(){
        var self = this;
    },
    methods: {
        gotoSLB:function() {
            var self = this;
            let _ret= self.$store.state.ifRegular == 0 ? 17 :170;
            self.$store.state._ajax(self,'/api/discovery/fssTrans', {ret: _ret}, function (data) {
                location.href = data.data;
            });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.m-rightmain .content-rowlist .bloom div {
    width: 700px;
    height: 30px;
    margin-bottom: 20px;
    font-size: 16px;
}
.m-rightmain .content-rowlist .bloom div span {
    width: 12px;
    height: 12px;
    background-color: #eb494b;
    background-size: 100% 100%;
    display: block;
    margin: 7px 11px 0 0;
}
.m-rightmain .content-rowlist .bloom div h3 {
    font-size: 24px;
    color: #323232;
    font-weight: normal;
}
.m-rightmain .content-rowlist .bloom p {
    font-size: 16px;
    color: #969696;
    text-indent: 2em;
}
</style>
