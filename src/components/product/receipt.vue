<template>
    <div class="graybg">
        <div class="wp clearfix">
            <div class="overview">
                <div class="graph huizhidantitle">
                    <router-link to="/account/investlist" class="newredBtn" >返回</router-link>
                    投资回执单
                </div>
                <div class="receipt">
                    <div class="chgenew"></div>
                    <ul>
                        <li class="ltv1">
                            <span style="margin-left:20px;margin-right:40px">投资金额：<em style="color:#eb494b">{{userProjectinfo.payInfo.money}}元</em></span>
                            <span style="margin-right:120px">大写：<em style="color:#eb494b">{{userProjectinfo.payInfo.bigMoney}}</em></span>
                            <span style="float:right;margin-right:20px;"><em style="color:#eb494b">*</em>温馨提示：若对回单有疑问，请联系客服，<em style="color:#eb494b">400-606-1018</em></span>
                        </li>
                        <li class="ltv2">
                            <span>平台名称：利通金服</span>
                            <span>电子回单编号：{{userProjectinfo.payInfo.id}}</span>
                            <!-- @*<span style="margin-right:0">投资编号：{{userProjectinfo.payInfo.id}}</span>*@ -->
                            <span style="margin-right:0">回单打印日期：{{userProjectinfo.payInfo.printingTime}}</span>
                            <span>投资日期：{{userProjectinfo.payInfo.createTime}}</span>
                            <!-- @*<span style="margin-right:0">受理日期：{{userProjectinfo.borrowInfo.repaymentTime}}</span>*@ -->
                        </li>
                        <li class="ltv3">
                            <div class="box-l">
                                <div style="background:#fff;color:#666;width:164px; height:76px;font-size:24px">付款方</div>
                                <div style="background:#fff;color:#666;width:164px; height:76px;font-size:24px">收款方</div>
                            </div>
                            <div class="box-r">
                                <table style="width:100%;border:0;height:152px; border-collapse:collapse;text-align:center">
                                    <tr style="border-bottom:1px solid #f8bec0">
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">开户人</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.payInfo.username}}</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">身份证号</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.payInfo.idcard}}</td>
                                    </tr>
                                    <tr>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">手机号</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.payInfo.mobile}}</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">投资编号</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.payInfo.id}}</td>
                                    </tr>
                                    <tr style="border-bottom:1px solid #f8bec0">
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">开户人</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.borrowInfo.username}}</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">身份证号/营业执照号</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.borrowInfo.idcard}}</td>
                                    </tr>
                                    <tr>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">手机号</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.borrowInfo.mobile}}</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">项目编号</td>
                                        <td style="background:#fff;color:#646464;font-size:12px;font-family:微软雅黑;width:199px;text-align:center">{{userProjectinfo.borrowInfo.id}}</td>
                                    </tr>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
export default {
  data () {
    return {
        productId: '',
        userProjectinfo:[]
    }
  },
  created() {
    var self = this;
    // 非父子组件通信发送
    LTJF.$emit("txt",{header:true});
    var idGet = this.$store.state.getUrl(location.href).id;
    self.productId = idGet;
            
    this.$store.state._ajax(self,'/api/invest/userProjectinfo', { id: idGet }, function (data) {
        self.userProjectinfo = data.data;
        self.userProjectinfo.payInfo.createTime = self.userProjectinfo.payInfo.createTime.substr(0, 10);
        self.userProjectinfo.borrowInfo.repaymentTime = self.userProjectinfo.borrowInfo.repaymentTime.substr(0, 10);
        self.userProjectinfo.payInfo.printingTime = self.userProjectinfo.payInfo.printingTime.substr(0, 10);
        var name = self.userProjectinfo.borrowInfo.username;
        self.userProjectinfo.borrowInfo.username = name.substr(0, 1) + (name.substr(1, name.length - 1)).replace(/./g, '*')
    }, '');

  },       
  methods:{
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .overview {
        background-color: #fff;
        border-radius: 10px;
        margin:20px 0 40px 0;
    }
</style>
