<template>
    <div class="overview">
        <div class="awardListC width25">
            <ul class="clearfix">
                <li class="awardList_active" @click="getTransferlist(1)"><a>可转让债权</a></li>
                <li @click="investListGet(1,5)"><a>转让中债权</a></li>
                <li @click="investListGet(1,7)"><a>转让成功债权</a></li>
                <li @click="investListGet(1,8)"><a>转让失败债权</a></li>
            </ul>
        </div>
        <div class="streamTypeC clearfix">
            <label v-if="search == ''" class="introlab">投资日期：</label>
            <label v-if="search == 5 || search == 7 || search == 8" class="introlab">转让日期：</label>
            <input class="laydate-icon fl input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
            <span class="spanbetweeninput">~</span>
            <input class="laydate-icon fl input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
            <a class="redBtn" v-on:click='searchnow'>搜索</a>
        </div>
        <div class="content-rowlist" style="display:block">
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="width:100px;">项目名称</th>
                        <th>起息日期</th>
                        <th>转让日期</th>
                        <th v-if="iftransferList == true">投资金额</th>
                        <th v-if="iftransferList == false">转让金额</th>
                        <th style="line-height:19px;padding: 0 5px;">
                            <p style="font-size:14px">预期年</p>
                            <p style="font-size:14px">化收益</p>
                        </th>
                        <th>预期收益</th>
                        <th>还本日期</th>
                        <th>剩余期限</th>
                        <th  v-if="search == 0 || search == 5">操作</th>
                        <th  v-if="search == 7 || search == 8">状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transfer,index) in transferList" :key="index">
                        <td v-if="iftransferList == true">
                            <router-link target="_blank" :to="'/product/PInfo?id='+transfer.p_id"  class="c-000">{{transfer.title}}</router-link>
                        </td>
                        <td v-if="iftransferList == false">
                            <router-link target="_blank" :to="'/product/PInfo?id='+transfer.productID"  class="c-000">{{transfer.title}}</router-link>
                        </td>
                        <!-- @*<td v-if="iftransferList == true">{{transfer.repay_time}}</td>
                        <td v-if="iftransferList == false">{{transfer.repaymentTime}}</td>*@ -->
                        <td>{{transfer.repaymentTime}}
                        <td v-if="iftransferList == false">{{transfer.transferTime}}</td>
                        <td v-if="iftransferList == true">--</td>
                        <td v-if="iftransferList == true">￥{{transfer.self_money}}</td>
                        <td v-if="iftransferList == false">￥{{transfer.transferMoney}}</td>
                        <td>{{transfer.rate}}%</td>
                        <td v-if="iftransferList == true">￥{{transfer.payinterest}}</td>
                        <td v-if="iftransferList == false">￥{{transfer.totalProfit}}</td>
                        <td v-if="iftransferList == true">{{transfer.repay_time}}</td>
                        <td v-if="iftransferList == false">{{transfer.returnTime}}</td>
                        <!-- @*剩余期限*@ -->
                        <td v-if="iftransferList == true">{{transfer.paynum}}</td>
                        <td v-if="search == '5'">{{transfer.nums.payNum}}</td>
                        <td v-if="search == '7'">--</td>
                        <!-- @*<td v-if="iftransferList == true">{{transfer.repay.num}}</td>*@ -->
                        <td>
                            <span v-if="iftransferList == true" class="c-orange">
                                <router-link :to="'/account/transferApply?id='+transfer.id" style="color:#6794d1">申请转让</router-link>
                            </span>
                            <span v-if="search == 5" class="c-orange">
                                <a @click="tranferCancel(transfer.id)" style="color:#6794d1">撤销</a>
                            </span>
                            <!-- @*<span v-if="search == 5" class="c-orange"><a style="color:#6794d1">撤销</a></span>*@ -->
                            <span v-if="transfer.transfer_status == 2">已转让</span>
                        </td>
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
    // 日期插件引用
    import laydate from 'layui-laydate';
    import 'layui-laydate/dist/theme/default/laydate.css';
    
    export default {
        data () {
            return {
                transferList: [],
                iftransferList: '',
                search:''
            }
        },
        mounted:function(){
            var self = this;
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

            self.getTransferlist(1);
            $(".awardListC ul li").click(function () {
                $(".awardList_active").removeClass("awardList_active");
                $(this).addClass("awardList_active");
            })

               
        },
        methods: {
            investListGet:function(_page, _search) {
                var self = this;
                self.$store.state._ajax(self,'/api/invest/index', { page: _page, search: _search, beginTime: self.$store.state.unixChange($("#begintime").val()), endTime: self.$store.state.unixChange($("#endtime").val())}, function (data) {
                    if (data.data.total == 0) {
                        self.transferList = data.data.data;
                        $(".mypage").html("");
                    } else {
                        var investList = data.data.data;
                        for (var i = 0; i < investList.length; i++) {
                            investList[i].createTime = investList[i].createTime.substring(0, 10);
                            investList[i].investTime = investList[i].investTime.substring(0, 10);
                            investList[i].transferTime = investList[i].transferTime == null ? '--' : investList[i].transferTime.substring(0, 10);
                            investList[i].repaymentTime = investList[i].repaymentTime == null ? '--' : investList[i].repaymentTime.substring(0, 10);
                            investList[i].returnTime = investList[i].returnTime == null ? '--' : investList[i].returnTime.substring(0, 10);
                            investList[i].numspayNum =investList[i].nums.payNum;
                        }
                        self.transferList = investList;
                        //console.log(overviewvue.transferList);
                        self.iftransferList = false;
                        self.search = _search;
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
            getTransferlist:function(_page) {
                //转让债权列表获取
                var self = this;
                self.$store.state._ajax(self,'/api/transfer/index', {page: _page}, function (data) {
                    // console.log(data)
                    var transferlist = data.data.data;
                    if (transferlist.length > 0) {
                        for (var i = 0; i < transferlist.length; i++) {
                            transferlist[i].payTime = transferlist[i].payTime.substr(0, 10);
                            transferlist[i].repay_time = transferlist[i].repay_time.substr(0, 10);
                            transferlist[i].returnTime = transferlist[i].returnTime == null ? '--' : transferlist[i].returnTime.substring(0, 10);
                            transferlist[i].repaymentTime = transferlist[i].repaymentTime == null ? '--' : transferlist[i].repaymentTime.substring(0, 10);
                            transferlist[i].payinterest =transferlist[i].pay== null ? '--' : transferlist[i].pay.interest;
                            transferlist[i].paynum =transferlist[i].pay== null ? '--' : transferlist[i].pay.num;
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.getTransferlist(p);
                            }
                        });
                    } else {
                        //分页的重置
                        $(".mypage").html("");
                    }
                    self.transferList = transferlist;
                    self.iftransferList = true;
                    self.search = 0;
                }, '');
            },
            searchnow: function () {
                $(".awardList_active").click();
            },
            tranferCancel:function(_id){
                var self = this;
                layer.confirm("是否确定取消债权转让申请？",{title: '操作提示'},function(){
                    self.$store.state._ajax(self,'/api/transfer/cancelTranfer', { id: _id}, function (data) {
                        layer.alert(data.msg,{title: '操作提示',icon: 6},function(){window.location.reload();});
                    }, '');
                },function(){
                    layer.closeAll();
                });
                
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.streamTypeC .dateselinput{font-size:12px;}
</style>
