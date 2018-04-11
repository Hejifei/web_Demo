<template>
    <div class="overview">
        <div class="graph">基本设置</div>
        <div class="chgenew"></div>
        <div class="userInfoTableC"  v-cloak>
            <div id="AjaxForm">
                <input type="hidden" name="sid" :value="sid" />
                <input type="hidden" name="type" value="json" />
                <input type="hidden" name="respType" id="respType" value="html" />
            </div>
            <table class="baseinfo">
                <tbody>
                    <tr>
                        <td><span class="squareSpan"></span> 存管账户</td>
                        <td>与汇付天下合作资金存管</td>
                        <!-- @*<td><a>点击查看存管协议</a></td>*@ -->
                        <td>--</td>
                        <td v-if="accountInfo.status == 1"><span class="icon-ok-sign  tdgreen"><label>已开通</label></span></td>
                        <td v-if="accountInfo.status == 1"><a id="SubmitBtn">进入存管账户</a></td>
                        <td v-if="accountInfo.status == 0"><span class="icon-ok-sign  tdgray"><label>未开通</label></span></td>
                        <td v-if="accountInfo.status == 0">
                            <!-- @*regType 0个人 1企业*@ -->
                            <router-link v-if="accountInfo.regType == 0" to="/account/accountOpen">个人开户</router-link>
                            <router-link v-if="accountInfo.regType == 1" to="/account/accountOpen">企业开户</router-link>
                        </td>
                    </tr>
                    <tr>
                        <!-- 个人 -->
                        <td  v-if="regType == 0"><span class="squareSpan"></span> 实名认证</td>
                        <!-- 个人 -->
                        <td  v-if="regType == 1"><span class="squareSpan"></span> 企业认证</td>
                        <td>账户更加安全投资更放心</td>
                        <td>{{accountInfo.name}} {{accountInfo.idcard}}</td>
                        <td v-if="accountInfo.status == 1"><span class="icon-ok-sign  tdgreen"><label>已认证</label></span></td>
                        <td v-if="accountInfo.status == 1">--</td>
                        <td v-if="accountInfo.status == 0"><span class="icon-ok-sign  tdgray"><label>未认证</label></span></td>
                        <td v-if="accountInfo.status == 0">
                            <!-- @*regType 0个人 1企业*@ -->
                            <router-link v-if="accountInfo.regType == 0" to="/account/accountOpen">实名认证</router-link>
                            <router-link v-if="accountInfo.regType == 1" to="/account/accountOpen">企业认证</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="squareSpan"></span> 绑定手机</td>
                        <td>可及时获取账户变动通知</td>
                        <td>{{accountInfo.mobile}}</td>
                        <td><span class="icon-ok-sign  tdgreen"><label>已绑定</label></span></td>
                        <!-- @*<td><a href="/Member/Account/EditMobile">修改</a></td>*@
                        @*<td><a href="/Default/Developing">修改</a></td>*@ -->
                        <td>--</td>
                    </tr>
                    <tr>
                        <td><span class="squareSpan"></span> 绑定邮箱</td>
                        <td>可及时获取账户变动通知</td>
                        <td>邮箱</td>
                        <td><span class="icon-remove-sign  tdgray"><label>未绑定</label></span></td>
                        <!-- @*<td><a href="/Member/Account/EditMail">立即绑定</a></td>*@
                        @*<td><a href="/Default/Developing">立即绑定</a></td>*@ -->
                        <td>--</td>
                    </tr>
                    <!-- <tr>
                        <td><span class="squareSpan"></span> 登录密码</td>
                        <td>保障资金安全，请定期更换交易密码,建议您交易密码区别于登录密码</td>
                        <td>--</td>
                        <td><span class="icon-ok-sign  tdgreen"><label>已设置</label></span></td>
                        <td><router-link to="/account/pswReset">修改</router-link></td>
                    </tr> -->
                    <tr>
                        <td><span class="squareSpan"></span> 风险评测</td>
                        <td>了解个人的风险承受能力</td>
                        <td v-if="accountInfo.dangerType == 0">当前投资风格 平衡型</td>
                        <td v-if="accountInfo.dangerType != 0">当前投资风格 {{accountInfo.dangerType}}</td>
                        <td v-if="accountInfo.dangerType == '0'"><span class="icon-ok-sign  tdgray"><label>未评测</label></span></td>
                        <td v-else><span class="icon-ok-sign  tdgreen"><label>已评测</label></span></td>
                        <td v-if="accountInfo.dangerType == '0'"><router-link to="/account/riskTest">立即评测</router-link></td>
                        <td v-else><router-link to="/account/riskTest">再次评测</router-link></td>
                    </tr>
                    <tr>
                        <td><span class="squareSpan"></span> 自动投标</td>
                        <td>自动复投&nbsp;&nbsp;便捷投资操作</td>
                        <td>--</td>
                        <td v-if="accountInfo.isAutobid == 1"><span class="icon-ok-sign  tdgreen"><label>已开启</label></span></td>
                        <td v-if="accountInfo.isAutobid == 0"><span class="icon-remove-sign  tdgray"><label>未开启</label></span></td>
                        <td v-if="accountInfo.isAutobid == 1"><router-link to="/account/objectBookingDetails">修改</router-link></td>
                        <td v-if="accountInfo.isAutobid == 0"><router-link to="/account/objectBookingDetails">立即开启</router-link></td>
                    </tr>
                    <tr>
                        <td><span class="squareSpan"></span> 私人订制</td>
                        <td>项目专属投资 为您量身订制</td>
                        <td>--</td>
                        <td>
                            <span v-if="accountInfo.customized == 99" class="icon-remove-sign  tdgray"><label>未开启</label></span>
                            <span v-if="accountInfo.customized == 0" class="icon-ok-sign  tdgreen"><label>申请中</label></span>
                            <span v-if="accountInfo.customized == 1" class="icon-ok-sign  tdgreen"><label>已开启</label></span>
                            <span v-if="accountInfo.customized == 2" class="icon-ok-sign  tdgreen"><label>审核不通过</label></span>
                        </td>
                        <td>
                            <router-link v-if="accountInfo.customized == 99" to="/account/personalTailorDetail">去开启</router-link>
                            <router-link v-if="accountInfo.customized != 99" to="/account/personalTailorDetail">修改</router-link>
                        </td>
                    </tr>
                    <!-- @*<tr>
                        <td><span class="squareSpan"></span> 芝麻信用</td>
                        <td>信用越高可享受越多服务</td>
                        <td>--</td>
                        <td style="padding:15px;">
                            <span class="icon-ok-sign  tdgreen"><label>已认证</label></span>
                            <span class="icon-remove-sign  tdgray"><label>未授权</label></span>
                        </td>
                        <td style="padding:15px;padding-right:50px;">
                            <a>重新认证</a>
                            <a>立即授权</a>
                        </td>
                    </tr>*@ -->
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        accountInfo: [],
        sid: localStorage.SID,
        regType:JSON.parse(localStorage.ltjfUserInfo).regType
      }
    },
    created() {
        var self = this;
        // 获取风险评测
        // self.$store.state._ajax(self,'/api/risk/getDetail', {}, function (data) {
        //     console.log(data)
        // }, '');
    },
    mounted:function(){
        var self = this;
        //用户信息获取
        self.$store.state._ajax(self,'/api/user/userInfo', {}, function (data) {
            //console.log(data.data)
            self.accountInfo = data.data;
            
            setTimeout(function () {
                //进入存管账户
                self.$store.state.AjaxSumbit(self,"", "/api/chinapnr/userLogin", function (data) {
                    //$("#respType").val('html')
                    //$('#AjaxForm').attr('action', APIURL + '/api/chinapnr/recharge').submit();
                    if (typeof data.data == "string") {
                        var start = data.data.indexOf('<form id="autoRedirectForm"');
                        var end = data.data.indexOf('</body>');
                        var form = data.data.substr(start, end - start);
                        //var form1 = form.substr(0, 5);
                        //var form2 = form.substr(5, end - start - 5);
                        //$(form1 + " target = '_blank' " + form2).appendTo('body').submit();
                        $(form).appendTo('body').submit();
                    }
                }, function (data) {
                    if (data.code == '-1') {
                        setTimeout(function(){self.$router.push({path:"/login"});layer.closeAll();}, 2000);
                        layer.alert("请重新登录!",{title: '操作提示',icon: 6},function(){self.$router.push({path:"/login"});layer.closeAll();});
                    } else {
                        setTimeout(function(){layer.closeAll();}, 2000);
                        layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    }
                }, true)
            }, 50)
        }, '');
        
    },
    methods: {
        
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
