<template>
    <div class="ytbBody overview">
        <div class="graph" style="padding:0;">
            申请提前还款
            <router-link class="newredBtn" to="/account/returnMoney?repayType=1">返回</router-link>    
        </div>
        <div class="chgenew"></div>
        <div class="commissionDetailC">
            <table>
                <tbody>
                    <tr></tr>
                    <tr>
                        <td>项目名称</td>
                        <td>{{advanceDetail.title}}</td>
                        <td>借款总额</td>
                        <td>￥{{advanceDetail.P_Money}}</td>
                    </tr>
                    <tr>
                        <td>预期年化收益</td>
                        <td>{{advanceDetail.rate}} %</td>
                        <td>借款期限</td>
                        <td>{{advanceDetail.term}} 个月</td>
                    </tr>
                    <tr>
                        <td>起息日期</td>
                        <td>{{advanceDetail.repaymentTime}}</td>
                        <td>截止日期</td>
                        <td>{{advanceDetail.returnTime}}</td>
                    </tr>
                    <tr>
                        <td>剩余期次</td>
                        <td>{{advanceDetail.repayTerm}} 期</td>
                        <td>还款方式</td>
                        <td v-if="advanceDetail.repayType == 0">每月付息，到期还本</td>
                        <td v-if="advanceDetail.repayType == 1">按月等额</td>
                        <td v-if="advanceDetail.repayType == 2">到期还本付息</td>
                        <td v-if="advanceDetail.repayType == 3">等额本息</td>
                        <td v-if="advanceDetail.repayType == 4">等额本金</td>
                    </tr>
                    <tr>
                        <td>剩余本息</td>
                        <td class="redtd">￥{{advanceDetail.repayMoney}}（￥{{advanceDetail.capital}}+￥{{advanceDetail.interest}} ）</td>
                        <td>减免利息</td>
                        <td class="redtd">￥{{advanceDetail.saveMoney}}</td>
                    </tr>
                    <tr>
                        <td>待还总计</td>
                        <td class="redtd">￥{{advanceDetail.repayAmount}}</td>
                        <td>是否申请提前还款</td>
                        <td v-if="advanceDetail.status == null">未申请</td>
                        <td v-if="advanceDetail.status == 0">申请中</td>
                        <td v-if="advanceDetail.status == 1">审核通过</td>
                        <td v-if="advanceDetail.status == 2">未通过</td>
                    </tr>
                    <tr>
                        <td>服务费</td>
                        <td>￥{{advanceDetail.serviceMoney}}</td>
                        <td>申请还款有效期</td>
                        <td>{{advanceDetail.validit}} 天</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div class="ytbSelC">
            <div class="ytbSelline">
                <div class="ytbfistLine" style="width:100%;"  v-if="advanceDetail.repayType != 2">
                    <span class="blodspan">还款期次</span>
                    <div class="selinpt" id="selinpt" :class="selinptactiveClass" @click="selinptactive($event)">
                        <i :title="selInText">{{selInText}}</i>
                        <ul class="repaytermdiv">
                            <li v-for="(repay,index) in repayTermList" :key="index"><label><input type="checkbox" class="subCheckbox" :value="repay.ternNo" />第 {{repay.ternNo}} 期</label></li>
                            <li><label><input id="selectall" type="checkbox"/><span id="selectalltext">全选</span></label></li>
                        </ul>
                    </div>
                    <div class="SelAllC">
                        <label v-if="termsel.length > 0">您选中的期限有：第<span v-for="(term,index) in termsel" :key="index">{{term}}、</span>期</label>
                    </div>
                </div>
                <div class="ytbfistLine" style="width:100%;"   v-if="advanceDetail.repayType == 2">
                    <span class="blodspan">请输入最新的还款期限</span>
                    <input type="text" v-model="newterm" id="newterm" @keyup="caltool" />个月
                    <div class="SelAllC" style="display:inline-block;">
                        <label v-if="fee>0">预期还款金额：{{fee}}元</label>
                    </div>

                </div>
            </div>
        </div> -->
        <div class="ytbBtnLine" v-if="advanceDetail.status == null">
            <p>
                <span class="logbox">
                    <a class="btn confirmBtn redBtn" @click="repayApply">提前还款申请</a>
                </span>
            </p>
        </div>
        <div class="ytbBtnLine" v-if="advanceDetail.status == 1">
            <p>
                <span class="logbox">
                    <a class="btn confirmBtn redBtn" @click="advanceRepay">确认提前还款</a>
                </span>
            </p>
        </div>
        <div class="ytbBtnLine" v-if="advanceDetail.status == 2">
            <p>
                <span class="logbox">
                    <a class="btn confirmBtn redBtn" @click="repayApply">再次申请提前还款</a>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
          advanceDetail:[],
          repayTermList:[],
          idget:'',
          termsel:[],
          selinptactiveClass:'',
          newterm:'',
          fee:0
      }
    },
    created(){
        var self = this;
        self.idget = self.getUrl(location.href).id;
        self.sid = localStorage.SID;    
        //提前还款详情
        self._ajax(self,'/api/repay/advanceDetail', { id: self.idget }, function (data) {
            self.advanceDetail = data.data;
            self.advanceDetail.investTime=self.advanceDetail.investTime.substr(0,10);
            self.advanceDetail.repaymentTime=self.advanceDetail.repaymentTime.substr(0,10);
            self.advanceDetail.returnTime=self.advanceDetail.returnTime.substr(0,10);
            // for(var i=1;i<=self.advanceDetail.repayTerm;i++){
            //     self.repayTermList.push({"ternNo":parseInt(self.advanceDetail.repayedTerm)+i});
            // }
        }, function (data) {
            if(data.code == 0){
                self.$router.push({path:"/account/returnMoney?repayType=2"});
            }else{
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});                        
            }
        });
    },
    mounted:function(){
        var self = this;
        // self.idget = self.getUrl(location.href).id;
        // self.sid = localStorage.SID;    
        // //提前还款详情
        // self._ajax(self,'/api/repay/advanceDetail', { id: self.idget }, function (data) {
        //     self.advanceDetail = data.data;
        //     self.advanceDetail.investTime=self.advanceDetail.investTime.substr(0,16);
        //     self.advanceDetail.returnTime=self.advanceDetail.returnTime.substr(0,16);
        //     for(var i=1;i<=self.advanceDetail.repayTerm;i++){
        //         self.repayTermList.push({"ternNo":parseInt(self.advanceDetail.repayedTerm)+i});
        //     }
        // }, '');
        // //还款管理全选
        // $(".ytbSelline").delegate("#selectall", 'click', function () {
        //     if ($(this).prop("checked")) {
        //         //全选
        //         $("#selectalltext").text("取消全选")
        //         $(".subCheckbox").prop("checked", true);
        //     } else {
        //         $("#selectalltext").text("全选")
        //         $(".subCheckbox").prop("checked", false);
        //     }
        //     var termsel =[];
        //     $(".subCheckbox").each(function () {
        //         if ($(this).prop('checked')) {
        //             termsel.push($(this).val());
        //         }
        //     });
        //     self.termsel = termsel;
        // })
        // $(".ytbSelline").delegate(".subCheckbox", "click", function () {
        //     if ($("#selectall").prop("checked")) {
        //         $("#selectalltext").text("全选");
        //         $("#selectall").attr("checked", false);
        //     } else {
        //         var i = 0;
        //         var termsel =[];
        //         $(".subCheckbox").each(function () {
        //             if ($(this).prop('checked')) {
        //                 termsel.push($(this).val());
        //                 i++;
        //             }
        //         });
        //         self.termsel = termsel;
        //         if ($(".subCheckbox").length == i) {
        //             $("#selectalltext").text("取消全选");
        //             $("#selectall").attr("checked", true);
        //         }
        //     }        
        // })
    },
    computed:{
    },
    methods: {
        repayApply:function() {
                var self = this;
                self._ajax(self,'/api/repay/apply', {id:self.idget}, function (data) {
                    layer.closeAll();
                    layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/returnMoney?repayType=1"});});
                },function (data) {
                    layer.closeAll();
                    layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});
                });
        },
        advanceRepay:function() {
                var self = this;
                var index = layer.load(2, {
                    shade: [0.2,'#000'] //0.1透明度的白色背景
                });
                self._ajax(self,'/api/repay/advanceRepay', {id:self.idget}, function (data) {
                    layer.closeAll();
                    layer.alert(data.msg ,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/returnMoney?repayType=2"});});
                },function (data) {
                    layer.closeAll();
                    if(data.code == 99){
                        //还款中
                        layer.alert(data.msg ,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/returnMoney?repayType=2"});});
                    }if(data.code == 9){
                        //还款余额不足，跳到充值界面
                        layer.alert(data.msg ,{title: '操作提示',icon: 5},function(){layer.closeAll();self.$router.push({path:"/account/recharge"});});
                    }else{
                        layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});                        
                    }
                });
        },
        selinptactive:function(e){
            // 仿下拉菜单
            var self = this;
            if($(".selinpt").hasClass("selinptactive")){
                if(e.target.getAttribute("id") == 'selinpt'){
                    self.selinptactiveClass ='';
                }else{
                    
                }
                
            }else{
                self.selinptactiveClass ='selinptactive';
            }
        },
        caltool:function(){
            var self = this;
            var temp_amount='';
            if (/[^\d]/.test($("#newterm").val())) {//替换非数字字符
                temp_amount = $("#newterm").val().replace(/[^\d]/g, '');
                $("#newterm").val(temp_amount);
                
            }
            if($("#newterm").val() == ''){

            }else{
                var total = parseFloat(self.advanceDetail.capital);
                var type = self.advanceDetail.repayType;
                var inverstmentRate = self.advanceDetail.rate;
                var inverstmentTerm = $("#newterm").val();
                var fee = 0;//收益
                var monthRate = parseFloat(inverstmentRate / 12 / 100);
                fee = total * monthRate * inverstmentTerm;
                self.fee = parseFloat(fee).toFixed(2);
                // console.log();
            }
            
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .commissionDetailC{padding: 0;margin:20px 0;}
    .commissionDetailC table tbody tr td{text-align: left;}
</style>
