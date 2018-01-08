<template>
    <div class="ytbBody">
        <div class="graph" style="padding:0;">
            申请提前还款
            <router-link class="redBtn" style="margin-right:10px;" to="/account/returnMoney">返回</router-link>    
        </div>
        <div class="chge"></div>
        <div class="ytbSelC">
            <div class="ytbSelline clearfix">
                <div class="ytbfistLine form-group">
                    <span class="blodspan">项目名称</span>
                    <i class="graytext">利房宝 SD1802006</i>
                </div>
                <div class="ytbfistLine form-group">
                    <span class="blodspan">借款总额</span>
                    <i class="redtext">￥50.00</i>
                </div>
            </div>
            <div class="ytbSelline clearfix">
                <div class="ytbfistLine form-group">
                    <span class="blodspan">年化收益</span>
                    <input type="number" class="form-submit required" id="" name=""   />
                    <span class="tip"></span>
                </div>
                <div class="ytbfistLine form-group">
                    <span class="blodspan">借款期限</span>
                    <select class="form-submit required" id="" name="">
                        <option value="1">12个月</option>
                        <option value="2">只投一次</option>
                    </select>
                    <span class="tip"></span>
                </div>
            </div>
            <div class="ytbSelline clearfix">
                <div class="ytbfistLine form-group">
                    <span class="blodspan">发布日期</span>
                    <i class="graytext">2017-06-12</i>
                </div>
                <div class="ytbfistLine form-group">
                    <span class="blodspan">截止日期</span>
                    <i class="graytext">2018-06-12</i>
                </div>
            </div>
            <div class="ytbSelline clearfix">
                <div class="ytbfistLine form-group">
                    <span class="blodspan">剩余期次</span>
                    <i class="redtext">11期</i>
                </div>
                <div class="ytbfistLine form-group">
                    <span class="blodspan">还款期次</span>
                    <select class="form-submit required" id="" name="">
                        <option value="1">12个月</option>
                        <option value="2">只投一次</option>
                    </select>
                    <span class="tip"></span>
                </div>
            </div>
            <div class="ytbSelline clearfix">
                <div class="ytbfistLine form-group">
                    <span class="blodspan">还款方式</span>
                    <select class="form-submit required" id="" name="">
                        <option value="0">每月付息，到期还本</option>
                        <option value="1">按月等额</option>
                        <option value="2">到期还本付息</option>
                        <option value="3">等额本息</option>
                        <option value="4">等额本金</option>
                    </select>
                    <span class="tip"></span>
                </div>
            </div>
        </div>
        <div class="ytbBtnLine">
            <p>
                <span class="logbox">
                    <a class="btn confirmBtn redBtn" id="SubmitBtn">确认</a>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted:function(){
        var self = this;
        self.idget = self.$store.state.getUrl(location.href).id;
        self.sid = localStorage.SID;    
        //产品详情信息获取
        self.$store.state._ajax(self,'/api/transfer/detail', { id: self.idget }, function (data) {
            
        }, '');

        

        self.$store.state.AjaxSumbit(self,"", "/api/transfer/applyTransfer", function (data) {
            layer.alert(data.msg,{title: '操作提示',icon: 6},function(){
                    layer.closeAll();
                    self.$router.push({path:'/account/investlistTransfer'})
                });
                setTimeout(function () {
                    layer.closeAll();
                    self.$router.push({path:'/account/investlistTransfer'})
                }, 2000)
        },'', true)
    },
    methods: {
        
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
        
</style>
