<template>
    <div class="overview">
        <!-- @*<div class="awardListC">
            <ul class="clearfix">
                <li class="awardList_active" ><a>申请记录</a></li>
                <li><a>历史资产记录</a></li>
            </ul>
        </div>*@ -->
        <div class="graph">申请记录</div>
        <div class="chgenew"></div>
        <div class="streamTypeC">
            <label class="introlab">申请日期：</label>
            <input class="laydate-icon input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
            <span class="spanbetweeninput">~</span>
            <input class="laydate-icon input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
            <a class="redBtn" @click="Select(1)">搜索</a>
        </div>
        <div class="content-rowlist">
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr style="white-space:nowrap;">
                        <th>申请时间</th>
                        <th>借款期限</th>
                        <th>借款金额(元)</th>
                        <th>借款利率</th>
                        <th>还款类型</th>
                        <th>借款状态</th>
                    </tr>
                </thead>
                <tbody v-if="applyList.length >0">
                    <tr v-for="(apply,index) in applyList" :key="index">
                        <td style="white-space:nowrap;">{{apply.createTime}}</td>
                        <td v-if="apply.termUnit == 1 || apply.termUnit == null">{{apply.term}}个月</td>
                        <td v-if="apply.termUnit == 2">{{apply.term}}天</td>
                        <td>{{apply.loanMoney}}</td>
                        <td>{{apply.rate}}%</td>
                        <td v-if="apply.repayType == 0">每月付息，到期还本</td>
                        <td v-if="apply.repayType == 1">按月等额</td>
                        <td v-if="apply.repayType == 2">到期还本付息</td>
                        <td v-if="apply.repayType == 3">等额本息</td>
                        <td v-if="apply.repayType == 4">等额本金</td>
                        <td>
                            <span v-if="apply.state ==0" class="f-main">审核中</span>
                            <span v-if="apply.state ==2" class="f-main">已通过</span>
                            <span v-if="apply.state ==3" class="f-main">已拒绝</span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="applyList.length == 0">
                    <tr>
                        <td colspan="6">暂无申请记录！</td>
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
    import LTJF from '../../common/js/ltjf.js';
    // 日期插件引用
    import laydate from 'layui-laydate';
    // import 'layui-laydate/dist/theme/default/laydate.css';
    
    export default {
        data () {
            return {
                applyList: []
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
            
            self.Select(1)

               
        },
        methods: {
            Select:function(_page) {
                var self = this;
                self.$store.state._ajax(self,'/api/loan/apply',
                    {
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
                            applylist[i].createTime = applylist[i].createTime.substr(0, 16)
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.Select(p);
                            }
                        });
                    }
                    self.applyList = applylist;
                }, '');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.streamTypeC .dateselinput{font-size:12px;}
</style>
