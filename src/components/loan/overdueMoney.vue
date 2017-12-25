<template>
    <div class="overview"  v-cloak>
        <div class="awardListC">
            <ul class="clearfix">
                <li @click="Select(' ', 1)" class="awardList_active"><a>未处理逾期</a></li>
                <li @click="Select(1, 1)"><a>已处理逾期</a></li>
            </ul>
        </div>
        <div class="streamTypeC clearfix">
            <label class="introlab">创建日期：</label>
            <input class="laydate-icon fl input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
            <span class="spanbetweeninput">~</span>
            <input class="laydate-icon fl input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
            <a class="redBtn" @click="Select(overdueType,1)">搜索</a>
        </div>
        <div class="content-rowlist" style="display:block">
            <table class="table  table-bg table-border table-bordered table-striped">
                <thead>
                    <tr>
                        <th>项目名称</th>
                        <th>预期年化收益</th>
                        <th>应还日期</th>
                        <th>应还金额</th>
                        <th>垫付日期</th>
                    </tr>
                </thead>
                <tbody v-if="arrayList.length != 0">
                    <tr v-for="(borrow,index) in arrayList" :key="index">
                        <td>
                            <router-link :to="'/product/PInfo?id='+borrow.id" target="_blank" class="c-000">{{borrow.title}}</router-link>
                        </td>
                        <td>{{borrow.rate}}%</td>
                        <td>{{borrow.returnTime}}</td>
                        <td>{{borrow.repayMoney}}元</td>
                        <td>{{borrow.paytime}}</td>
                    </tr>
                </tbody>
                <tbody v-if="arrayList.length == 0">
                    <tr><td colspan="5">暂无逾期记录！</td></tr>
                </tbody>
            </table>
        </div>
        <div class="fenyeC">
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
                arrayList: [],
                overdueType: '',
                moneySel: 0.00,
                moneyAll: ''
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

            self.Select(' ', 1);

            //已选菜单切换
            $(".awardListC ul li").click(function () {
                $(".awardList_active").removeClass("awardList_active");
                $(this).addClass("awardList_active");
            })
            
        },
        methods: {
            Select:function(_overdueType, _page) {
                var self = this;
                self.$store.state._ajax(self,'/api/loan/overdue',
                    {
                        overdueType: _overdueType,
                        page: _page,
                        beginTime: self.$store.state.unixChange($("#begintime").val()),
                        endTime: self.$store.state.unixChange($("#endtime").val())
                    },
                function (data) {
                    //console.log(data)
                    var applylist = data.data.data;
                    if (applylist.length == 0) {
                        //分页的重置
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < applylist.length; i++) {
                            applylist[i].returnTime = applylist[i].returnTime.substr(0, 10);
                            applylist[i].paytime = applylist[i].paytime.substr(0, 10);
                        }

                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.Select(_overdueType, p);
                            }
                        });
                    }
                    self.arrayList = applylist;
                    self.overdueType = _overdueType;
                }, '');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .tcdPageCode{padding:0;}
    .letterwebFooter .fenyeC{position:relative;top:0;}
    .streamTypeC .dateselinput{font-size:12px;}
</style>
