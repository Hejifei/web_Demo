<template>
    <div class="overview"  v-cloak>
        <div class="awardListC width25">
            <ul class="clearfix">
                <li @click="Select('',1)" class="awardList_active"><a>近10天待付本息</a></li>
                <li @click="Select(1,1)"><a>待还列表</a></li>
                <li @click="Select(2,1)"><a>已还列表</a></li>
                <li @click="Select(3,1)"><a>已逾期列表</a></li>
            </ul>
        </div>
        <div class="streamTypeC clearfix">
            <!-- <label class="introlab">还款日期：</label>
            <input class="laydate-icon fl input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
            <span class="spanbetweeninput">~</span>
            <input class="laydate-icon fl input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
            <a class="redBtn" @click="Select(repayType, 1)">搜索</a> -->
            <a v-if="repayType == ''" class="redBtn" @click="moneyBackAll()">当页全部还款</a>
            <a v-if="repayType == ''" class="redBtn" @click="moneyBackSel()">选定项还款</a>
        </div>
        <div class="RetuurnDetilInfo" style="height:32px;">
            <p v-if="repayType == ''">已选项金额：<span id="lenth">￥{{moneySel}}</span></p>
            <p v-if="repayType == ''">待付总金额：<span>￥{{moneyAll}}</span></p>
        </div>
        <div class="content-rowlist" style="display:block">
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr style="white-space:nowrap;">
                        <th v-if="repayType == ''">选择</th>
                        <th>项目名称</th>
                        <th v-if="repayType == '' || repayType ==2 || repayType ==3">投资编号</th>
                        <th v-if="repayType == '' || repayType ==2 || repayType ==3">投资人账号</th>
                        <th v-if="repayType != 1">收益</th>
                        <th v-if="repayType == 1">待还利息</th>
                        <th v-if="repayType != 1">本金</th>
                        <th v-if="repayType == 1">待还本金</th>
                        <th v-if="repayType ==2 || repayType ==3">服务费</th>
                        <th v-if="repayType ==1">待还服务费</th>
                        <th>还款金额</th>
                        <th>还款日期</th>
                        <th v-if="repayType ==1">还款方式</th>
                        <th v-if="repayType == ''">状态</th>
                        <th v-if="repayType ==2 || repayType ==3">支付日期</th>
                        <th v-if="repayType == 1">提前还款</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(array,index) in arrayList" :key="index">
                        <td v-if="repayType == ''"><input class="Checkbox px subCheckbox" type="checkbox" name="subCheckbox" :value="array.id" :money="array.repayMoney" /></td>
                        <td>
                            <router-link :to="'/product/PInfo?id='+array.ppid" target="_blank" class="c-000">{{array.title}}</router-link>
                        </td>
                        <td v-if="repayType == '' || repayType ==2 || repayType ==3">{{array.pid}}</td>
                        <td v-if="repayType == '' || repayType ==2 || repayType ==3"><span>{{array.mobile}}</span></td>
                        <td>{{array.interest}}</td>
                        <td>{{array.capital}}</td>
                        <td v-if="repayType ==1 ||repayType ==2 || repayType ==3">￥{{array.serviceMoney}}</td>
                        <td>{{array.repayMoney}}</td>
                        <td><span class="c-orange">{{array.returnTime}}</span></td>
                        <td v-if="repayType ==1">
                            <span v-if="array.repayType == 0">每月付息，到期还本</span>
                            <span v-if="array.repayType == 1">按月等额</span>
                            <span v-if="array.repayType == 2">到期还本付息</span>
                            <span v-if="array.repayType == 3">等额本息</span>
                            <span v-if="array.repayType == 4">等额本金</span>
                        </td>
                        <td v-if="repayType == ''"><span class="f-main">正常</span></td>
                        <td v-if="repayType ==2 && array.isPay == 1 || repayType ==3 && array.isPay == 1">{{array.paytime}}</td>
                        <td v-if="repayType ==2 && array.isPay == 0 || repayType ==3 && array.isPay == 0">未支付</td>
                        <td v-if="repayType == 1"><router-link to="/account/returnAdvance?id='+array.ppid" style="color: #6794d1;">发起申请</router-link></td>
                    </tr>

            </tbody>
        </table>
        </div>
        <div class="letterwebFooter">
            <label  v-if="arrayList.length != 0 && repayType == ''"><input type="checkbox" id="selectall"><i id="selectalltext">当页全选</i></label>
            <div class="fenyeC">
                <div class="pages mypage clearfix">
                    <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
                </div>
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
                arrayList: [],
                repayType: '',
                moneySel: 0.00,
                moneyAll:''
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

            //还款管理全选
            $(".letterwebFooter").delegate("#selectall", 'click', function () {
                console.log("click")
                if ($(this).prop("checked")) {
                    //全选
                    $("#selectalltext").text("取消全选")
                    $(".subCheckbox").prop("checked", true);
                } else {
                    $("#selectalltext").text("当页全选")
                    $(".subCheckbox").prop("checked", false);
                }
                var len = $("input[name='subCheckbox']:checked").length;
                $("#lenth").text(len);//填充内容 
                //已选金额
                var remoney = 0;
                $('input[name="subCheckbox"]:checked').each(function () {
                    remoney += Number($(this).attr("money"));
                });
                $("#lenth").text("￥" + remoney.toFixed(2))
            })
            

            $(".content-rowlist table").delegate(".subCheckbox", "click", function () {
                if ($("#selectall").prop("checked")) {
                    $("#selectalltext").text("当页全选")
                    $("#selectall").attr("checked", false);
                } else {
                    var i = 0;
                    $(".subCheckbox").each(function () {
                        if ($(this).prop('checked')) {
                            i++;
                        }
                    });
                    if ($(".subCheckbox").length == i) {
                        $("#selectalltext").text("取消全选")
                        $("#selectall").attr("checked", true);
                    }
                }
                //已选金额
                var remoney = 0;
                $('input[name="subCheckbox"]:checked').each(function () {
                    remoney += Number($(this).attr("money"));
                });
                $("#lenth").text("￥" + parseFloat(remoney).toFixed(2))
            })

            //已选菜单切换
            $(".awardListC ul li").click(function () {
                $(".awardList_active").removeClass("awardList_active");
                $(this).addClass("awardList_active");
            })


            self.Select('', 1);
            
        },
        methods: {
            Select:function(_repayType, _page) {
                var self = this;
                $("#selectalltext").text("当页全选")
                $("#selectall").prop("checked", false);
                var beginTime = $("#begintime").val();
                // console.log(self.unixChange(beginTime))
                self.$store.state._ajax(self,'/api/loan/repayLoan',
                    {
                        repayType: _repayType,
                        page: _page,
                        // beginTime: self.$store.state.unixChange($("#begintime").val()),
                        // endTime: self.$store.state.unixChange($("#endtime").val())
                    },
                function (data) {
                    var applylist = data.data.data;
                    var moneyAll = 0;//待还总金额
                    if (applylist.length == 0) {
                        //分页的重置
                        $(".mypage").html("");
                        moneyAll = 0.00;
                    } else {
                        for (var i = 0; i < applylist.length; i++) {
                            applylist[i].returnTime = (applylist[i].returnTime == null) ? '' : applylist[i].returnTime.substr(0, 10);
                            applylist[i].paytime = (applylist[i].paytime == null) ? '' : applylist[i].paytime.substr(0, 10);
                            moneyAll += parseFloat(applylist[i].repayMoney);
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.Select(_repayType, p);
                            }
                        });
                    }
                    self.arrayList = applylist;
                    self.repayType = _repayType;
                    self.moneyAll = parseFloat(moneyAll).toFixed(2);
                }, '');
            },
            moneyBackSel:function() {
                var index = layer.load(2, {
                    shade: [0.2,'#000'] //0.1透明度的白色背景
                });
                var self = this;
                var idlist = $('.subCheckbox').map(function () {
                    if ($(this).prop('checked')) {
                        return $(this).attr("value");
                    }
                }).get().join(',');
                self.$store.state._ajax(self,'/api/repay/index', { id: idlist }, function (data) {
                    layer.closeAll();
                    layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();window.location.reload();});
                },function (data) {
                    layer.closeAll();
                    layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});
                });
            },
            moneyBackAll:function() {
                var index = layer.load(2, {
                    shade: [0.2,'#000'] //0.1透明度的白色背景
                });
                var self = this;
                var idlist = $('.subCheckbox').map(function () {
                    return $(this).attr("value");
                }).get().join(',');
                self.$store.state._ajax(self,'/api/repay/index', { id: idlist }, function (data) {
                    layer.closeAll();
                    layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();window.location.reload();});
                },function (data) {
                    layer.closeAll();
                    layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});
                });
            },
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .tcdPageCode{padding:0;}
    .letterwebFooter .fenyeC{position:relative;top:0;}
    .streamTypeC .dateselinput{font-size:12px;}
</style>
