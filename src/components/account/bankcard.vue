<template>
    <div class="overview" v-cloak>
        <div class="graph">银行卡</div>
        <div class="chgenew"></div>
        <div class="bankManageC clearfix">
            <h3>我的银行卡</h3>
            <div v-for="(bankcardInfo,index) in bankcardList" :key="index" class="bank_Card" :style="'background:url('+ bankcardInfo.bg +') no-repeat center center;background-size:cover;'">
                <i class="bankcardDelete" v-on:click="delCard(bankcardInfo.bankId)">x</i>
                <h3>{{bankcardInfo.name}} 
                    <img v-if="bankcardInfo.isQP == 1" src="../../common/stylus/img/icon_QPcard.png" />
                    <img v-if="bankcardInfo.isWD == 1" src="../../common/stylus/img/icon_WDcard.png" />
                    <img v-if="bankcardInfo.isWD != 1" src="../../common/stylus/img/icon_wcard.png"  class="wcard"/>
                </h3>
                <span>储蓄卡</span>
                <label><i>**** **** **** </i>{{bankcardInfo.bidCard}}</label>
            </div>
            <div class="bank_Card bankaddnew" v-on:click="addnewCard">
                <label style="text-align:center;">添加银行卡</label>
                <form id="AjaxForm" action="" method="POST" target="_blank">
                    <input type="hidden" name="sid" value="sid" />
                    <input type="hidden" name="type" value="" />
                    <input type="hidden" name="respType" id="respType" value="json" />
                    <input class="moneyinput form-submit" type="hidden" name="ret" v-model="ret" />
                </form>
            </div>
        </div>
        <!-- @*<div class="chge"></div>
            <div class="bankManageC clearfix">
                <h3>网银支付卡</h3>
                <div class="bank_Card bank_BOC">
                    <h3>中国银行</h3>
                    <span>储蓄卡</span>
                    <label>622848 0404693386017</label>
                </div>
            </div>*@ -->
        <p class="gotohuifua">
            <a @click="gotohuifu">进入汇付天下资金托管账户</a>
        </p>
    </div>
</template>

<script>
    
    export default {
        data () {
            return {
                sid: '',
                ret:'',
                bankcardList: [],
                regType:JSON.parse(localStorage.ltjfUserInfo).regType
            }
        },
        mounted:function(){
            var self = this;
            self.sid = localStorage.SID;
            //是否实名认证获取，若未实名就跳转到开户界面
            self._ajax(self,'/api/user/userInfo', {}, function (data) {
                if (data.data.status == 0 ) {
                    //未实名认证
                    let msg = self.regType === 0 ? '实名认证' : '企业认证';
                    layer.alert('请先进行'+msg+'!',{title: '操作提示',icon: 5},function(){self.$router.push({path:"/account/accountOpen"});layer.closeAll(); });
                    setTimeout(function () { self.$router.push({path:"/account/accountOpen"});layer.closeAll();}, 3000);
                }
            }, '');
            //绑卡接口的ret参数为11
            if (self.ifRegular == 0) {
                self.ret = 11;
            } else {
                self.ret = 110;
            }

            //银行卡获取
            self._ajax(self,'/api/bankcard/getCardList', {}, function (data) {
                var bankcardlist = data.data;
                if (bankcardlist.length > 0) {
                    for (var i = 0; i < bankcardlist.length; i++) {
                        bankcardlist[i].divbg = 'background:url("' + bankcardlist[i].bg + '") no-repeat center top -8px;background-size:105% auto;'
                    }
                }
                self.bankcardList = bankcardlist;
            }, function (data) {
                
            });
        },
        methods: {
            addnewCard: function () {
                var self = this;
                self._ajax(self,'/api/chinapnr/bidCard', {
                    type: '',
                    respType:'json'
                }, function (data) {
                    if (typeof data.data == "string") {
                        var start = data.data.indexOf('<form id="autoRedirectForm"');
                        var end = data.data.indexOf('</body>');
                        var form = data.data.substr(start, end - start);
                        $(form).appendTo('body').submit();
                    }
                }, function (data) {
                    if (data.code == '3') {
                        setTimeout(function(){self.$router.push({path:"/account/accountOpen"});layer.closeAll();}, 2000);
                        layer.alert(data.msg,{title: '操作提示',icon: 5},function(){self.$router.push({path:"/account/accountOpen"});layer.closeAll(); });
                    } else {
                        setTimeout(function(){layer.closeAll(); }, 2000);
                        layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll(); });
                    }
                });
            },
            delCard: function (bankId) {
                var self = this;
                layer.confirm("你确定要删除该银行卡嘛？",{title: '操作提示'},function(){
                    //银行卡号删除
                    self._ajax(self,'/api/chinapnr/delCard', { cardId: bankId }, function (data) {
                        layer.alert(data.msg,{title: '操作提示',icon: 6},function(){window.location.reload();});
                    },  function (data) {
                        layer.alert(data.msg,{title: '操作提示',icon: 5},function(){window.location.reload();});
                    });
                },function(){
                    layer.closeAll();
                });
                
            },
            gotohuifu: function () {
                var self = this;
                self._ajax(self,'/api/chinapnr/userLogin', {
                    type: '',
                    respType:'json'
                }, function (data) {
                    if (typeof data.data == "string") {
                        var start = data.data.indexOf('<form id="autoRedirectForm"');
                        var end = data.data.indexOf('</body>');
                        var form = data.data.substr(start, end - start);
                        $(form).appendTo('body').submit();
                    }
                },'')
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .gotohuifua{display:block;width:100%;text-align:center;position:absolute;bottom:40px;
                text-decoration:underline;
    }
</style>
