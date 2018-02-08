<template>
    <div class="overview">
        <div class="graph">
            预约记录
        </div>
        <div class="chge"></div>
        <div class="index_activityC usercollecTab clearfix">
            <table>
                <thead>
                    <tr>
                        <td>借款标题</td>
                        <!-- <td>年利率</td> -->
                        <td>投资期限</td>
                        <td>预约金额</td>
                        <td>排队人数</td>
                        <td>预约时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody class="tb_p0">
                    <tr v-for="(reserveLog,index) in reserveLogList" :key="index">
                        <td>
                            <router-link :to="'/product/Pinfo_order?id='+reserveLog.reserveID" target="_blank">
                                <img :src="reserveLog.img" />{{reserveLog.title}}
                                <!-- //预约状态， 1预约中，2预约成功，3预约失败，4预约超时，5预约取消 -->
                                <i v-if="reserveLog.status == 1" style="font-size:12px;color:#3a84cf;">(预约中)</i>
                                <i v-if="reserveLog.status == 2" style="font-size:12px;color:#fb5a5c;">(预约成功)</i>
                                <i v-if="reserveLog.status == 3" style="font-size:12px;color:#646464;">(预约失败)</i>
                                <i v-if="reserveLog.status == 4" style="font-size:12px;color:#646464;">(预约超时)</i>
                                <i v-if="reserveLog.status == 5" style="font-size:12px;color:#646464;">(预约取消)</i>
                            </router-link></td>
                        <!-- <td>{{reserveLog.rate}}%起</td> -->
                        <td v-if="reserveLog.termUnit == 1">{{reserveLog.term}}个月</td>
                        <td v-if="reserveLog.termUnit == 2">{{reserveLog.term}}天</td>
                        <td>￥{{reserveLog.money}}</td>
                        <td v-if="reserveLog.status == 1">你前面还有<span>{{reserveLog.tenderNum}}</span>人</td>
                        <td v-if="reserveLog.status != 1"></td>
                        <td>{{reserveLog.createTime}}</td>
                        <td>
                            <!-- "status": "1",//预约状态， 1预约中，2预约成功，3预约失败，4预约超时，5预约取消 -->
                            <!-- <a v-if="reserveLog.status == 1" class="graya">预约中</a> -->
                            <a v-if="reserveLog.status == 1" @click='reserveCancel(reserveLog.id)'>取消预约</a>
                            <a v-if="reserveLog.status != 1" class="graya"></a>
                        </td>
                    </tr>
                    <tr v-if="reserveLogList.length == 0"><td colspan="6" style="color:#323232;text-align:center;">暂无预约记录!</td></tr>
                </tbody>
            </table>
            <!-- <div class="havenolist" v-if="reserveLogList.length == 0">
                <h3>抱歉！您还没有预约任何项目</h3>
                <p>快去<router-link to="/product">预约</router-link>吧！</p>
            </div> -->
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
        reserveLogList: []
      }
    },
    created(){
        var self = this;
        //关注项目列表获取
        self.reserveLogListGet(1);
    },
    mounted:function(){
        
    },
    methods: {
        reserveLogListGet: function(_page) {
            var self = this;
            self.$store.state._ajax(self,'/api/invest/reserveLog',
                {page: _page},
                function (data) {
                    var reserveLogList = data.data;
                    if (data.data.data.length == 0) {
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < reserveLogList.data.length; i++) {
                            reserveLogList.data[i].createTime = (reserveLogList.data[i].createTime).substr(0,16);
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.reserveLogListGet(p);
                            }
                        });
                    }
                    self.reserveLogList = reserveLogList.data;
                }, '', true);
        },
        reserveCancel:function (_id) {
            var self = this;
            layer.confirm("是否取消本次预约投资？",{title: '操作提示',icon: 6},function(){
                self.$store.state._ajax(self,'/api/invest/reserveCancel', { id: _id }, function () {
                    layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();window.location.reload();});
                    setTimeout(function() {
                        layer.closeAll();window.location.reload();
                    }, 2000);    
                }, '')
            },function(){
                layer.closeAll();
            });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index_activityC table tbody td:nth-child(2) {color: #646464;}
.index_activityC table tbody td:nth-child(4)  span{color: #fb5a5c;}
</style>
