<template>
    <div class="Special_registC">
        <div class="SR_topbanner"></div>
        <div class="SR_body">
            <form><input type="password" style="width:0;height:0;"/></form>
            <div class="SR_bodyC">
                <h3><img src="../../common/stylus/img/special_regist_titlr_right.png" /> 活动详情 <img src="../../common/stylus/img/special_regist_title_left.png" /></h3>
                <div class="SR_PC">
                    <p>1.新用户注册得<span>888元</span>现金红包。</p>
                    <p>2.<span>可专享10-12%</span>预期收益新手标投资。</p>
                    <p>3.可得积分/预约投资/首尾投/好友邀请等奖励。</p>
                    <p>4.在“我的账户—我的奖券”中查看红包使用规则。</p>
                </div>
                <div class="SR_RPC">
                    <div>
                        <span><i>￥</i>10</span>
                        <span><i>￥</i>30</span>
                        <span><i>￥</i>50</span>
                        <span><i>￥</i>88</span>
                    </div>
                    <div>
                        <span><i>￥</i>100</span>
                        <span><i>￥</i>150</span>
                        <span><i>￥</i>180</span>
                        <span><i>￥</i>280</span>
                    </div>
                </div>
                <h3><img src="../../common/stylus/img/special_regist_titlr_right.png" /> 平台优势 <img src="../../common/stylus/img/special_regist_title_left.png" /></h3>
                <div class="SR_PC">
                    <div class="mg30">
                        <img src="../../common/stylus/img/special_regist_ptys_01.png" />
                        <label>
                            <p><span>2-5倍收益</span></p>
                            <p>平台预期收益是传统投资的2-5倍</p>
                        </label>
                    </div>
                    <div class="mg30">
                        <img src="../../common/stylus/img/special_regist_ptys_02.png" />
                        <label>
                            <p><span>安全可靠</span></p>
                            <p>标的真实/风控严谨/信息透明/团队靠谱</p>
                        </label>
                    </div>
                    <div class="mg30">
                        <img src="../../common/stylus/img/special_regist_ptys_03.png" />
                        <label>
                            <p><span>多重奖励</span></p>
                            <p>新手标/现金红包/邀请赚钱/加息奖励</p>
                        </label>
                    </div>
                </div>
                
                <div class="SR_Form" id="AjaxForm">
                    <div class="SR_Form_line form-group">
                        <input type="text" placeholder="请输入手机号" autocomplete="off" name="mobile" v-model="mobile" class="input_01 form-submit required phone" />
                        <span class="tip"></span>
                    </div>
                    <div class="SR_Form_line form-group">
                        <input type="text" placeholder="请输入验证码" autocomplete="off" name="smsverify" class="input_02 form-submit required" maxlength="6"/>
                        <a class="getcodeBtn" @click="getcode" id="getSmsVerify">获取验证码</a>
                        <span class="tip"></span>
                    </div>
                    <div class="SR_Form_line form-group">
                        <input type="password" placeholder="请输入密码" autocomplete="off" name="password" v-model="password" class="input_03 form-submit required password" />
                        <span class="tip"></span>
                        
                    </div>
                    <input type="password" style="width:0;height:0;" autocomplete="off" name="repassword" v-model="password" class="form-submit" />
                    <div class="SR_Form_line form-group">
                        <input type="text" placeholder="请输入推荐人手机号（可选填）" name="inviter" class="input_04 form-submit" />
                        <span class="tip"></span>
                    </div>
                    <div class="SR_Form_line">
                        <input type="hidden" class="form-submit" autocomplete="off" value="0" name="type" id="type" />
                        <a class="btna" id="SubmitBtn">注册立享 888 现金红包</a>
                        <label><input  class="agreement" type="checkbox" checked/> 我已阅读并同意 <a :href="xieyi_regist" target="_blank">《注册及服务协议》</a>和 <a :href="loanxieyi" target="_blank">《线上借款及服务协议》</a></label>
                    </div>
                    <div class="SR_joinusC">
                        <label><img src="../../common/stylus/img/qspecial_regist_q.png"/> 福利QQ群534484215 </label>
                        <label><img src="../../common/stylus/img/special_regist_wechat.png"/> 微信群加ltjfvip</label>
                    </div>
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
                mobile:'',
                password:'',
                xieyi_regist:'',
                loanxieyi:''
            }
        },
        mounted:function(){
            var self = this;
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
            //提交登陆申请
            this.AjaxSumbit(this,"/login", "/api/user/reg", function (j) {
                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){
                    // self.$router.push({path:"/login"});
                    layer.closeAll();
                });
            },'')
            //协议
            this._ajax(self,'/api/open/protocol', { respType: 'json' }, function (data) {self.xieyi_regist = data.data;})
            //借款及服务协议
            self._ajax(self,'/api/open/borrow', {respType : 'json'}, function (data) {self.loanxieyi=data.data;},'');
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
        },
        methods:{
            getcode:function(){
                var self = this;
                if (this.countdown == 60) {
                    if (self.mobile == "") {
                        layer.msg("手机号不能为空!");
                    } else {
                        self.settime();
                        self._ajax(self,'/api/user/sendSmsVerify',
                            {
                                mobile: self.mobile,
                                type: 3
                            }, function (j) {
                                layer.msg(j.msg);
                            }, function (j) {
                                layer.alert(j.msg,{title: '操作提示',icon: 5},function(){layer.closeAll()});
                                
                            })
                    }
                }
            }
        }
    }
</script>

<style>
    
</style>
