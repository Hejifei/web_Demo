<template>
    <div class="overview">
        <div class="graph">借款管理</div>
        <div class="awardListC">
            <ul class="clearfix">
                <li @click="Select(1,1)" class="awardList_active"><a>已发布的借款</a></li>
                <li @click="Select(2, 1)"><a>待审核的借款</a></li>
                <li @click="Select(3, 1)"><a>还款中的借款</a></li>
                <li @click="Select(4, 1)"><a>已结束的借款</a></li>
            </ul>
        </div>
        <div class="chgenew"></div>
        <div class="streamTypeC">
            <label class="introlab">借款日期</label>
            <input class="laydate-icon input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
            <span class="spanbetweeninput">~</span>
            <input class="laydate-icon input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
            <a class="redBtn" @click="Select(state,1)">搜索</a>
        </div>
        <div class="content-rowlist" style="display:block">
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr style="white-space:nowrap;">
                        <th>项目名称</th>
                        <th>借款总额</th>
                        <th style="line-height:19px;padding: 0 5px;">
                            <p style="font-size:14px">预期年</p>
                            <p style="font-size:14px">化收益</p>
                        </th>
                        <th>服务费</th>
                        <th>发布日期</th>
                        <th>标的类型</th>
                        <th>融资期限</th>
                        <th>已融金额</th>
                        <th>是否放款</th>
                        <!-- @*<th v-if="state == '3'">提前还款</th>*@ -->
                    </tr>
                </thead>
                <tbody v-if="borrowList.length != 0">
                    <tr v-for="(borrow,index) in borrowList" :key="index">
                        <td><router-link :to="'/product/PInfo?id='+borrow.id" class="c-000">{{borrow.title}}</router-link></td>
                        <td>￥{{borrow.loanMoney}}</td>
                        <td>{{borrow.rate}}%</td>
                        <td>￥{{borrow.serviceMoney}}</td>
                        <td style="white-space:nowrap;">{{borrow.createTime}}</td>

                        <td>{{borrow.bidProdtype}}</td>
                        <!-- <td v-if="borrow.bidProdtype == 01">房贷类</td> -->
                        <!-- <td v-else-if="borrow.bidProdtype == 02" >车贷类</td>
                        <td v-else-if="borrow.bidProdtype == 03" >收益权转让类</td>
                        <td v-else-if="borrow.bidProdtype == 04" >信用贷款类</td>
                        <td v-else-if="borrow.bidProdtype == 05" >股票配资类</td>
                        <td v-else-if="borrow.bidProdtype == 06" >银行承兑汇票</td>
                        <td v-else-if="borrow.bidProdtype == 07" >商业承兑汇票</td>
                        <td v-else-if="borrow.bidProdtype == 08" >消费贷款类</td> -->
                        <!-- <td v-else style="white-space:nowrap;">供应链类</td> -->

                        <td><span class="c-orange">{{borrow.term}}个月</span></td>
                        <td><span class="c-orange">￥{{borrow.finishMoney}}</span></td>
                        <td>
                            <span v-if="borrow.complete == 1" class="f-main">已放款</span>
                            <span v-if="borrow.complete == 0" class="f-main">未放款</span>
                        </td>
                        <!-- @*<td  v-if="state == '3'"><span class="c-orange"><a href="/Member/Loan/ApplyforPrepayment" style="color:#6794d1">申请</a></span></td>*@ -->
                    </tr>
                </tbody>
                <tbody v-if="borrowList.length == 0">
                    <tr><td colspan="9">暂无借款记录！</td></tr>
                </tbody>
            </table>
        </div>
        <div class="pages mypage clearfix">
            <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
        </div>
    </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
    // 日期插件引用
    import laydate from 'layui-laydate';
    // import 'layui-laydate/dist/theme/default/laydate.css';
    
    export default {
        data () {
            return {
                borrowList: [],
                state:''
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
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

            //预约记录与历史资产记录切换
            $(".awardListC ul li").click(function () {
                $(".awardList_active").removeClass("awardList_active");
                $(this).addClass("awardList_active");
            })

            self.Select(1,1)
        },
        methods: {
            Select:function(_state, _page) {
                var self = this;
                self.$store.state._ajax(self,'/api/loan/borrow',
                    {
                        state:_state,
                        page: _page,
                        beginTime: self.$store.state.unixChange($("#begintime").val()),
                        endTime: self.$store.state.unixChange($("#endtime").val())
                    },
                function (data) {
                    var applylist = data.data.data;
                    if (applylist.length == 0) {
                        //分页的重置
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < applylist.length; i++) {
                            applylist[i].serviceMoney = parseFloat((parseFloat(applylist[i].sysRate)/100)*(parseFloat(applylist[i].loanMoney))).toFixed(2);
                            applylist[i].createTime = applylist[i].createTime.substr(0, 10);
                            switch(applylist[i].bidProdtype){
                                case '01':
                                    applylist[i].bidProdtype = '房贷类';
                                    break;
                                case '02':
                                    applylist[i].bidProdtype = '车贷类';
                                    break;
                                case '03':
                                    applylist[i].bidProdtype = '收益权转让类';
                                    break;
                                case '04':
                                    applylist[i].bidProdtype = '信用贷款类';
                                    break;
                                case '05':
                                    applylist[i].bidProdtype = '股票配资类';
                                    break;
                                case '06':
                                    applylist[i].bidProdtype = '银行承兑汇票';
                                    break;
                                case '07':
                                    applylist[i].bidProdtype = '商业承兑汇票';
                                    break;  
                                case '08':
                                    applylist[i].bidProdtype = '消费贷款类';
                                    break;
                                default:
                                    applylist[i].bidProdtype = '其他';
                            }
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.Select(_state,p);
                            }
                        });
                    }
                    self.borrowList = applylist;
                    self.state = _state;
                }, '');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.streamTypeC .dateselinput{font-size:12px;}
</style>
