<template>
    <div>
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

        <div class="overview"  v-cloak>
            <div class="awardListC width33">
                <ul class="clearfix">
                    <li @click="projectTypeSel($event,3)" class="awardList_active">待审核项目</li>
                    <li @click="projectTypeSel($event,1)">待收项目</li>
                    <li @click="projectTypeSel($event,2)">已结束项目</li>
                </ul>
            </div>
            <div class="streamTypeC clearfix">
                <label class="introlab">投资日期：</label>
                <input class="laydate-icon fl input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
                <span class="spanbetweeninput">~</span>
                <input class="laydate-icon fl input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
                <a class="redBtn" @click="search">搜索</a>
            </div>
            <div class="content-rowlist" style="display:block">
                <table class="table  table-bg table-border table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>投资项目</th>
                            <th>投资日期</th>
                            <th>投资金额</th>
                            <th style="line-height:19px;padding: 0 5px;">
                                <p style="font-size:14px">预期年</p>
                                <p style="font-size:14px">化收益</p>
                            </th>
                            <th>预期收益</th>
                            <th>投资期限</th>
                            <th>起息日期</th>
                            <th v-if="type == 2 || type == 1">合同</th>
                            <th v-if="type == 2 || type == 1">回执单</th>
                            <th>收益</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(invest,index) in investList" :key="index">
                            <td style="width:130px;">
                                <router-link target="_blank" :to="'/product/PInfo?id='+invest.productID"  class="c-000">{{invest.title}}</router-link>
                            </td>
                            <td style="white-space:nowrap;">{{invest.createTime}}</td>
                            <td>{{invest.bidMoney}}</td>
                            <td>{{invest.rate}}%</td>
                            <td>{{invest.totalProfit}}元</td>
                            <td v-if="invest.termUnit == 1">{{invest.term}}月</td>
                            <td v-if="invest.termUnit == 2">{{invest.term}}天</td>
                            <td style="white-space:nowrap;"><span class="f-main" style="color:#646464">{{invest.repaymentTime}}</span></td>
                            <td v-if="type == 2 || type == 1"><a class="c-000" style="color:#6794d1" @click="readxieyi(invest.id)">查看</a></td>
                            <td v-if="type == 2 || type == 1"><router-link class="c-000" style="color:#6794d1" target="_blank" :to="'/product/receipt?id='+invest.id">查看</router-link></td>
                            <td><a class="c-000" style="color:#6794d1" @click="HuankuanDetail(invest.id,type)">查看</a></td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="pages mypage clearfix">
                <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
            </div>

        </div>
    </div>
</template>

<script>
    // 日期插件引用
    import laydate from 'layui-laydate';
    import 'layui-laydate/dist/theme/default/laydate.css';

    export default {
        data () {
            return {
                investdetaillist: [],
                type:'',
                investList: [],
                type: 3
            }
        },
        mounted:function(){
            var self = this;
            var idGet = self.$store.state.getUrl(location.href).id;
            var idtransfer_id = self.$store.state.getUrl(location.href).transfer_id;
            self.productId = idGet;
            self.investListGet(1, 3);
            laydate.render({
                elem: '#begintime', //指定元素
                format: 'yyyy-MM-dd',
                istime: true,
                istoday: false,
                choose: function (datas) {
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            });
            laydate.render({
                elem: '#endtime', //指定元素
                format: 'yyyy-MM-dd',
                istime: true,
                istoday: false,
                choose: function (datas) {
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            });

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
            readxieyi:function(proid){
                var self = this;
                self.$store.state._ajax(self,'/api/invest/contract', {respType : 'json',id : proid}, function (data) {
                    // window.open(data.data)
                    layer.open({
                            type: 2,
                            title: '《借款及服务协议》',
                            shadeClose: true,
                            shade: [0.5,'#000'],
                            maxmin: false, //开启最大化最小化按钮
                            area: ['893px', '600px'],
                            content: data.data
                            });
                },'');
            },
            investListGet:function(_page, _search) {
                var self = this;
                //签到记录取
                self.$store.state._ajax(self,'/api/invest/index', { page: _page, search: _search, beginTime: self.$store.state.unixChange($("#begintime").val()), endTime: self.$store.state.unixChange($("#endtime").val())}, function (data) {
                    if (data.data.total == 0) {
                        self.investList = data.data.data;
                        $(".mypage").html("");
                    } else {
                        var investList = data.data.data;
                        for (var i = 0; i < investList.length; i++) {
                            investList[i].createTime = investList[i].createTime.substring(0,10);
                            investList[i].investTime = investList[i].investTime.substring(0, 10);
                            investList[i].repaymentTime = investList[i].repaymentTime == null ? '--' : investList[i].repaymentTime.substring(0, 10);
                            investList[i].repaymentTime = _search == 3 ? '满标后1个工作日' : investList[i].repaymentTime;
                            investList[i].returnTime = investList[i].returnTime == null ? '--' : investList[i].returnTime.substring(0, 10);
                        }
                        self.investList = investList;
                        self.type = _search;
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.investListGet(p, _search);
                            }
                        });
                    }
                }, '');
            },
            HuankuanDetail:function(idget,_type) {
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
                            investdetaillist[i].repayTime = _type == 3 ? '--' : investdetaillist[i].repayTime;
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
            projectTypeSel: function (event, Search) {
                var self = this;
                $(".awardList_active").removeClass("awardList_active");
                event.target.classList.add("awardList_active")
                self.investListGet(1, Search);
            },
            search: function () {
                $(".awardList_active").click();
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.streamTypeC .dateselinput{font-size:12px;}
.layui-layer-title{padding-left: 375px;font-weight: bold;}
</style>
