<template>
    <div class="overview" id="mydiv"  v-cloak>
        <div class="graph">资金流水</div>
        <div class="chgenew"></div>
        <div class="streamTypeC clearfix">
            <label class="introlab">类型：</label>
            <ul class="clearfix">
                <li class="streamtypesel"><label>所有<input type="radio" name="seltranstype" @click="investListGet(0, 1)"/></label></li>
                <li><label>充值<input type="radio" name="seltranstype" value="0" @click="investListGet(1, 1)"/></label></li>
                <li><label>提现<input type="radio" name="seltranstype" value="1" @click="investListGet(2, 1)"/></label></li>
                <li><label>投资<input type="radio" name="seltranstype" value=""  @click="investListGet(3, 1)"/></label></li>
                
                <li><label>回款<input type="radio" name="seltranstype" value=""  @click="investListGet(5, 1)"/></label></li>
                <li><label>还款本金<input type="radio" name="seltranstype" value=""  @click="investListGet(7, 1)"/></label></li>
                <li><label>还款利息<input type="radio" name="seltranstype" value=""  @click="investListGet(8, 1)"/></label></li>
                <li><label>放款<input type="radio" name="seltranstype" value=""  @click="investListGet(9, 1)"/></label></li>
                <li><label>放款服务费<input type="radio" name="seltranstype" value=""  @click="investListGet(4, 1)"/></label></li>
                <li><label>奖励金<input type="radio" name="seltranstype" value=""  @click="investListGet(30, 1)"/></label></li>
                <!-- <li @click="investListGet(31, 1)"><label>汇付对账入账<input type="radio" name="seltranstype" value="" /></label></li>
                <li @click="investListGet(32, 1)"><label>汇付对账出账<input type="radio" name="seltranstype" value="" /></label></li> -->
            </ul>
        </div>
        <div class="streamTypeC">
            <label class="introlab">交易时间：</label>
            <input class="laydate-icon input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
            <span class="spanbetweeninput">~</span>
            <input class="laydate-icon input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
            <a class="redBtn" @click="investListGet(type,1)">搜索</a>
        </div>
        <div class="content-rowlist" style="">
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr style="white-space:nowrap;">
                        <th>交易时间</th>
                        <th>交易金额</th>
                        <th>手续费</th>
                        <th>账户余额</th>
                        <th>交易对方</th>
                        <!-- <th>财务类型</th> -->
                        <th>业务类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(capitalFlow,index) in flowlist" :key="index">
                        <td>{{capitalFlow.createTime}}</td>
                        <td v-if="capitalFlow.transType == '0' || capitalFlow.transType == '3' || capitalFlow.transType ==  '4'">+{{capitalFlow.operationMoney}}</td>
                        <td v-if="capitalFlow.transType == '1' || capitalFlow.transType == '2' || capitalFlow.transType ==  '5'">-{{capitalFlow.operationMoney}}</td>
                        <td><span>{{capitalFlow.fee}}</span></td>
                        <td>{{capitalFlow.accountMoney}}</td>
                        <td>{{capitalFlow.otherName}}</td>
                        <td>{{capitalFlow.title}}</td>
                        <!-- <td v-if="capitalFlow.transType == 0">充值</td>
                        <td v-if="capitalFlow.transType == 1">取现</td>
                        <td v-if="capitalFlow.transType == 2">转账转出</td>
                        <td v-if="capitalFlow.transType == 3">转账转入</td>
                        <td v-if="capitalFlow.transType == 4">生利宝入款</td>
                        <td v-if="capitalFlow.transType == 5">生利宝出款</td> -->

                        <!-- <td v-if="capitalFlow.businessType == 0">快捷充值</td>
                        <td v-if="capitalFlow.businessType == 1">网银充值</td>
                        <td v-if="capitalFlow.businessType == 2">取现</td>
                        <td v-if="capitalFlow.businessType == 3">主动投标放款</td>
                        <td v-if="capitalFlow.businessType == 4">放款服务费</td>
                        <td v-if="capitalFlow.businessType == 5">还款本金(回款本金)</td>
                        <td v-if="capitalFlow.businessType == 6">还款利息(回款利息)</td>
                        <td v-if="capitalFlow.businessType == 7">定向支付</td>
                        <td v-if="capitalFlow.businessType == 8">自动投标放款</td>
                        <td v-if="capitalFlow.businessType == 9">生利宝赎回入款</td>
                        <td v-if="capitalFlow.businessType == 10">生利宝申购出款</td>
                        <td v-if="capitalFlow.businessType == 11">加息券利息</td>
                        <td v-if="capitalFlow.businessType == 12">红包</td>
                        <td v-if="capitalFlow.businessType == 13">债权转让</td>
                        <td v-if="capitalFlow.businessType == 14">转让服务费</td>
                        <td v-if="capitalFlow.businessType == 15">红包撤回</td>
						<td v-if="capitalFlow.businessType == 16">投资撤回</td>
                        <td v-if="capitalFlow.businessType == 20">佣金</td>
                        <td v-if="capitalFlow.businessType == 30">奖励金</td>
                        <td v-if="capitalFlow.businessType == 31">汇付手动对账入账</td>
                        <td v-if="capitalFlow.businessType == 32">汇付手动对账出账</td> -->
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
                flowlist: [],
                type:'',
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

            this.investListGet(0,1);
            //资金流水类型选择
            $(".streamTypeC ul li").click(function () {
                $(".streamtypesel").removeClass("streamtypesel");
                $(this).addClass("streamtypesel");
            })
        },
        methods: {
            investListGet:function (_type, _page) {
                var self = this;
                self._ajax(self,'/api/account/record',
                {
                    type: _type,
                    page:_page,
                    recordType:2,
                    beginTime: self.unixChange($("#begintime").val()),
                    endTime: self.unixChange($("#endtime").val()) 
                },
                function (data) {
                    var flowlist = data.data.data;
                    if (flowlist.length == 0) {
                        ////分页的重置
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < flowlist.length; i++) {
                            flowlist[i].createTime = flowlist[i].createTime.substr(0, 16);
                        }
                        ////分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.investListGet(_type,p);
                            }
                        });
                    }
                    self.flowlist = flowlist;
                    self.type = _type;
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.streamTypeC .dateselinput{font-size:12px;}
</style>
