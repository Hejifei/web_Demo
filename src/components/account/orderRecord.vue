<template>
    <div class="overview">
        <transition name="fade">
            <div id="ContactC" v-if="ContactCshow" @click="SContactChide($event)">
                <div id="Contact">
                    <div class="Contact_box">
                        <div class="cancelmodelbtn" @click="ContactCshow = !ContactCshow"><span class="icon-remove"></span></div>
                        <div class="Contact_head">
                            收益详情
                        </div>
                        <div class="Contact_body">
                            <router-link :to="'/product/PInfo?id='+productID" style="position:absolute;bottom:15px;font-size:12px;display:block;width: 100%;text-align:center;color:#fb5a5c;">点击查看标的详情</router-link>
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
                                            <tr v-for="(ivstDet,index) in newinvestdetaillist" :key="index">
                                                <td>{{index+1}}</td>
                                                <td>{{ivstDet.repayTime}}</td>
                                                <td>{{ivstDet.payTime}}</td>
                                                <td>{{ivstDet.repayCapital}}</td>
                                                <td>{{ivstDet.repayInterest}}</td>
                                                <td>{{ivstDet.repayMoney}}</td>
                                                <td>{{ivstDet.is_pay}}</td>
                                            </tr>
                                            <tr v-if="newinvestdetaillist.length == 0">
                                                <td colspan="7">暂无数据！</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="graph">
            预约记录
        </div>
        <div class="chgenew"></div>
        <div class="index_activityC usercollecTab wid900">
            <table>
                <thead>
                    <tr>
                        <td>借款标题</td>
                        <!-- <td>年利率</td> -->
                        <td>投资期限</td>
                        <td style="padding:0;">已预约金额</td>
                        <td>排队人次</td>
                        <td>预约时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
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
                            <router-link v-if="reserveLog.status == 2 && reserveLog.tenderStatus == 1" :to="'/product/PInfo?id='+reserveLog.productID">查看详情</router-link>
                            <a v-if="reserveLog.status == 2 && reserveLog.tenderStatus == 2" @click="HuankuanDetail(reserveLog.tenderID,reserveLog.productID)">查看详情</a>
                            <!-- <a v-if="reserveLog.status != 1 && reserveLog.status != 2" class="graya"></a> -->
                            <span v-if="reserveLog.status == 3" :title="reserveLog.describe" class="sp_span">{{reserveLog.describe}}</span>
                        </td>
                    </tr>
                    <tr v-if="reserveLogList.length == 0"><td colspan="6" style="color:#323232;text-align:center;">暂无数据！</td></tr>
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
        reserveLogList: [],
        productID:'',
        ContactCshow:false,
        newinvestdetaillist:''
      }
    },
    created(){
        var self = this;
        //关注项目列表获取
        self.reserveLogListGet(1);
        
    },
    mounted:function(){
        var self = this;
    },
    methods: {
        SContactChide:function(e){
            let self = this;
            if (e.target.id == "ContactC" ) {
                self.ContactCshow = !self.ContactCshow;
            }
        },
        reserveLogListGet: function(_page) {
            var self = this;
            self._ajax(self,'/api/invest/reserveLog',
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
                self._ajax(self,'/api/invest/reserveCancel', { id: _id }, function () {
                    layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();window.location.reload();});
                    setTimeout(function() {
                        layer.closeAll();window.location.reload();
                    }, 2000);    
                }, '')
            },function(){
                layer.closeAll();
            });
        },
        HuankuanDetail:function(idget,productID) {
                var self = this;
                self.productID = productID;
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
                            // investdetaillist[i].repayTime = _type == 3 ? '--' : investdetaillist[i].repayTime;
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
                    // $(".Contact_head").html(`收益详情(<router-link to="/product/PInfo?id=${productID}">点击查看标的详情</router-link>)`);
                    // $(".Contact_head").html('收益详情(<a href="/product/PInfo?id='+productID+'">点击查看标的详情</a>)');
                    self.newinvestdetaillist = investdetaillist;
                    // self.investdetaillist = investdetaillist;
                    self.ContactCshow = !self.ContactCshow;
                }, '');
            },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index_activityC table tbody td:nth-child(2) {color: #646464;}
.index_activityC table tbody td:nth-child(4)  span{color: #fb5a5c;}
</style>
