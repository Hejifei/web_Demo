<template>
    <div>
        <transition name="fade">
            <div id="ContactC" v-if="ContactCshow" @click="SContactChide($event)">
                <div id="Contact">
                    <div class="Contact_box">
                        <div class="cancelmodelbtn" @click="ContactCshow = !ContactCshow"><span class="icon-remove"></span></div>
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
        <div class="overview"  v-cloak>
            <div class="graph">历史投资</div>
            <div class="awardListC">
                <ul class="clearfix">
                    <li @click="projectTypeSel($event,3)" class="awardList_active">待审核项目</li>
                    <li @click="projectTypeSel($event,1)">待收项目</li>
                    <li @click="projectTypeSel($event,2)">已结束项目</li>
                </ul>
            </div>
            <div class="chgenew"></div>
            <div class="streamTypeC">
                <label class="introlab">投资日期：</label>
                <input class="laydate-icon input dateselinput" id="begintime" name="begintime" plugin="datepicker" placeholder="起始日期">
                <span class="spanbetweeninput">~</span>
                <input class="laydate-icon input dateselinput" id="endtime" name="endtime" plugin="datepicker" placeholder="结束日期">
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
                            <th v-if="type == 2 || type == 1">合同 
                                <!-- <span @click="hetongTip()" class="icon-exclamation-sign" style="color:#fabc27;"></span> -->
                            </th>
                            <th v-if="type == 2 || type == 1">回执单</th>
                            <th>收益</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(invest,index) in investList" :key="index">
                            <td><router-link target="_blank" :to="'/product/PInfo?id='+invest.productID"  class="c-000">{{invest.title}}</router-link></td>
                            <td style="white-space:nowrap;">{{invest.createTime}}</td>
                            <td>{{invest.bidMoney}}</td>
                            <td>{{invest.rate}}%</td>
                            <td>{{invest.totalProfit}}元</td>
                            <td v-if="invest.termUnit == 1">{{invest.term}}月</td>
                            <td v-if="invest.termUnit == 2">{{invest.term}}天</td>
                            <td style="white-space:nowrap;"><span class="f-main" style="color:#646464">{{invest.repaymentTime}}</span></td>
                            <td v-if="type == 2 || type == 1">
                                <a class="c-000" style="color:#6794d1" @click="readxieyi(invest.id)">查看</a>
                                <!-- /
                                <a class="c-000" style="color:#6794d1" @click="downloadxieyi(invest.id)">下载</a> -->
                            </td>
                            <td v-if="type == 2 || type == 1"><router-link class="c-000" style="color:#6794d1" target="_blank" :to="'/product/receipt?id='+invest.id">查看</router-link></td>
                            <td><a class="c-000" style="color:#6794d1" @click="HuankuanDetail(invest.id,type)">查看</a></td>
                        </tr>
                        <tr v-if="investList.length == 0"><td colspan="8">暂无数据！</td></tr>
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
                newinvestdetaillist: [],
                type:'',
                investList: [],
                type: 3,
                ContactCshow:false,
                syxqtemp:''
            }
        },
        mounted:function(){
            var self = this;
            var idGet = self.getUrl(location.href).id;
            var idtransfer_id = self.getUrl(location.href).transfer_id;
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
        },
        methods: {
            SContactChide:function(e){
                let self = this;
                if (e.target.id == "ContactC" ) {
                    self.ContactCshow = !self.ContactCshow;
                }
            },
            hetongTip:function(){
                layer.tips('电子签章暂不支持在火狐、移动端下预览，请更换其他浏览器进行查看,建议使用谷歌浏览器！', '.icon-exclamation-sign', {
                    tips: [1, '#fabc27'],
                    time: 4000
                });
            },
            readxieyi:function(proid){
                var self = this;
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                if((navigator.userAgent.indexOf("Firefox") > -1) || (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/))  ){  
                    layer.alert('电子签章暂不支持在火狐、移动端下预览，请更换其他浏览器进行查看,建议使用谷歌浏览器！', {icon: 5}, function () { layer.closeAll(); })
                } else{
                    self._ajax(self,
                        // '/api/invest/electronicSeal',//新合同接口
                        '/api/invest/contract', //旧合同接口
                        {id : proid}, function (data) {
                            window.open(data.data)
                            // layer.open({
                            //         type: 2,
                            //         title: '《借款及服务协议》-(建议在火狐以外的浏览器中打开)',
                            //         shadeClose: true,
                            //         shade: [0.5,'#000'],
                            //         maxmin: false, //开启最大化最小化按钮
                            //         area: ['893px', '600px'],
                            //         content: data.data
                            //         });
                    },'');
                }
            },
            downloadxieyi:function(proid){
                var self = this;
                layer.open({
                    type: 1,
                    title:'利通金服提醒您',
                    shadeClose: true,
                    skin: 'layui-layer-rim', //加上边框
                    area: ['420px', '200px'], //宽高
                    content: `<div style='text-align:center;line-height:146px;font-size:14px;'>
                                <div class="layui-layer-loading" type="loading" times="9" showtime="0" contype="string" style="z-index: 19891023;width:37px;height:37px;display:inline-block;position:relative;top:13px;">
                                    <div id="" class="layui-layer-loading1"></div>
                                    <span class="layui-layer-setwin"></span>
                                </div>
                                正在生成合同，请稍候...
                            </div>`
                });
                self._ajax(self,'/api/upload/contractDownload', {id : proid}, function (data) {
                    // location.href=data.data;
                    layer.open({
                        type: 1,
                        title:'利通金服提醒您',
                        shadeClose: true,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['420px', '200px'], //宽高
                        content: `<div style='text-align:center;line-height:146px;font-size:14px;'>
                                    已经生成合同，<a href='${data.data}' style='color:rgb(103, 148, 209);' download>点击下载合同</a>
                                </div>`
                    });
                },'');
                
                
            },
            investListGet:function(_page, _search) {
                var self = this;
                //签到记录取
                self._ajax(self,'/api/invest/index', { page: _page, search: _search, beginTime: self.unixChange($("#begintime").val()), endTime: self.unixChange($("#endtime").val())}, function (data) {
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
                self._ajax(self,'/api/invest/detail', { id: idget }, function (data) {
                    var investdetaillist = data.data.list;
                    var temp = "";
                    if (investdetaillist.length == 0) {
                    } else {
                        for (var i = 0; i < investdetaillist.length; i++) {
                            investdetaillist[i].repayTime = investdetaillist[i].repayTime.substr(0, 10);
                            investdetaillist[i].repayTime = _type == 3 ? '--' : investdetaillist[i].repayTime;
                            investdetaillist[i].payTime = investdetaillist[i].payTime == null ? '--': investdetaillist[i].payTime.substr(0, 10);
                            switch (investdetaillist[i].is_pay) {
                                case '0':
                                    investdetaillist[i].is_pay = (investdetaillist[i].advance === '1') ? '提前还款' : "未还";
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
                        }
                    }
                    self.newinvestdetaillist = investdetaillist;
                    self.ContactCshow = !self.ContactCshow;
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
