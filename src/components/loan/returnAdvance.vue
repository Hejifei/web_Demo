<template>
    <div class="ytbBody">
        <div class="graph" style="padding:0;">
            申请提前还款
            <router-link class="redBtn" style="margin-right:10px;" to="/account/returnMoney">返回</router-link>    
        </div>
        <div class="chge"></div>
        <div class="commissionDetailC">
            <table>
                <tbody>
                    <tr></tr>
                    <tr>
                        <td>项目名称</td>
                        <td>{{advanceDetail.title}}</td>
                        <td>年化收益</td>
                        <td>{{advanceDetail.rate}} %</td>
                    </tr>
                    <tr>
                        <td>还款方式</td>
                        <td v-if="advanceDetail.repayType == 0">每月付息，到期还本</td>
                        <td v-if="advanceDetail.repayType == 1">按月等额</td>
                        <td v-if="advanceDetail.repayType == 2">到期还本付息</td>
                        <td v-if="advanceDetail.repayType == 3">等额本息</td>
                        <td v-if="advanceDetail.repayType == 4">等额本金</td>
                        <td>是否申请提前还款</td>
                        <td v-if="advanceDetail.status == null">未申请</td>
                        <td v-if="advanceDetail.status == 0">申请中</td>
                        <td v-if="advanceDetail.status == 1">审核通过</td>
                        <td v-if="advanceDetail.status == 2">未通过</td>
                    </tr>
                    <tr>
                        <td>待还本息</td>
                        <td>{{advanceDetail.repayMoney}} 元</td>
                        <td>借款服务费</td>
                        <td>{{advanceDetail.serviceMoney}} 元</td>
                    </tr>
                    <tr>
                        <td>待还本金</td>
                        <td>{{advanceDetail.capital}} 元</td>
                        <td>待还利息</td>
                        <td>{{advanceDetail.interest}} 元</td>
                    </tr>
                    <tr>
                        <td>借款期限</td>
                        <td>{{advanceDetail.term}} 个月</td>
                        <td>已还期数</td>
                        <td>{{advanceDetail.repayedTerm}} 个月</td>
                    </tr>
                    <tr>
                        <td>待还期数</td>
                        <td>{{advanceDetail.repayTerm}} 个月</td>
                        <td>发布时间</td>
                        <td>{{advanceDetail.investTime}}</td>
                    </tr>
                    <tr>
                        <td>最后一笔待还时间</td>
                        <td>{{advanceDetail.returnTime}}</td>
                        <td></td><td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="ytbSelC">
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
        </div>
        <div class="ytbBtnLine" v-if="advanceDetail.status == null">未申请>
            <p>
                <span class="logbox">
                    <a class="btn confirmBtn redBtn" @click="moneyBackSel">确认</a>
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
        self.idget = self.$store.state.getUrl(location.href).id;
        self.sid = localStorage.SID;    
        //提前还款详情
        self.$store.state._ajax(self,'/api/repay/advanceDetail', { id: self.idget }, function (data) {
            self.advanceDetail = data.data;
            self.advanceDetail.investTime=self.advanceDetail.investTime.substr(0,16);
            self.advanceDetail.returnTime=self.advanceDetail.returnTime.substr(0,16);
            for(var i=1;i<=self.advanceDetail.repayTerm;i++){
                self.repayTermList.push({"ternNo":parseInt(self.advanceDetail.repayedTerm)+i});
            }
        }, '');
    },
    mounted:function(){
        var self = this;
        // self.idget = self.$store.state.getUrl(location.href).id;
        // self.sid = localStorage.SID;    
        // //提前还款详情
        // self.$store.state._ajax(self,'/api/repay/advanceDetail', { id: self.idget }, function (data) {
        //     self.advanceDetail = data.data;
        //     self.advanceDetail.investTime=self.advanceDetail.investTime.substr(0,16);
        //     self.advanceDetail.returnTime=self.advanceDetail.returnTime.substr(0,16);
        //     for(var i=1;i<=self.advanceDetail.repayTerm;i++){
        //         self.repayTermList.push({"ternNo":parseInt(self.advanceDetail.repayedTerm)+i});
        //     }
        // }, '');
        //还款管理全选
        $(".ytbSelline").delegate("#selectall", 'click', function () {
            if ($(this).prop("checked")) {
                //全选
                $("#selectalltext").text("取消全选")
                $(".subCheckbox").prop("checked", true);
            } else {
                $("#selectalltext").text("全选")
                $(".subCheckbox").prop("checked", false);
            }
            var termsel =[];
            $(".subCheckbox").each(function () {
                if ($(this).prop('checked')) {
                    termsel.push($(this).val());
                }
            });
            self.termsel = termsel;
        })
        $(".ytbSelline").delegate(".subCheckbox", "click", function () {
            if ($("#selectall").prop("checked")) {
                $("#selectalltext").text("全选");
                $("#selectall").attr("checked", false);
            } else {
                var i = 0;
                var termsel =[];
                $(".subCheckbox").each(function () {
                    if ($(this).prop('checked')) {
                        termsel.push($(this).val());
                        i++;
                    }
                });
                self.termsel = termsel;
                if ($(".subCheckbox").length == i) {
                    $("#selectalltext").text("取消全选");
                    $("#selectall").attr("checked", true);
                }
            }        
        })
    },
    computed:{
        selInText:function(){
            if(this.termsel.length == 0){
                return '请选择还款期次';
            }else{
                return '您选择的期次有：'+this.termsel;
            }
        }
    },
    methods: {
        moneyBackSel:function() {
                var self = this;
                if(self.advanceDetail.repayType != 2){
                    var termlist = $('.subCheckbox').map(function () {
                        if ($(this).prop('checked')) {
                            return $(this).attr("value");
                        }
                    }).get().join(',');
                    if(termlist == ''){
                        layer.alert('您还没有选择要提前还款的期次！',{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    }else{
                        self.$store.state._ajax(self,'/api/repay/apply', {id:self.idget , value: termlist }, function (data) {
                            layer.closeAll();
                            layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/returnMoney"});});
                        },function (data) {
                            layer.closeAll();
                            layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});
                        });
                    }
                }else{
                    if($("#newterm").val() == ''){
                        layer.alert('您还没有输入最新的还款期限！',{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    }else{
                        self.$store.state._ajax(self,'/api/repay/apply', {id:self.idget , value: $("#newterm").val() }, function (data) {
                            layer.closeAll();
                            layer.alert(data.msg,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/returnMoney"});});
                        },function (data) {
                            layer.closeAll();
                            layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();window.location.reload();});
                        });
                    }
                }
                
                
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
