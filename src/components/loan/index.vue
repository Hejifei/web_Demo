<template>
    <div class="LoanC">
    <div class="loanHead">
        <h1>欢迎来到利通金服借款中心</h1>
        <ul class="loanHd_imgul clearfix">
            <li><img src="../../common/stylus/0818new/lend_advantage_interest_icon.png" /><span>超低利息</span></li>
            <li><img src="../../common/stylus/0818new/lend_advantage_approval_icon.png" /><span>快速审核</span></li>
            <li><img src="../../common/stylus/0818new/lend_advantage_raise_icon.png" /><span>迅速筹标</span></li>
            <li><img src="../../common/stylus/0818new/lend_advantage_fast_icon.png" /><span>方便快捷</span></li>
        </ul>
        <ul class="loanHe_menuul clearfix">
            <li class="loanHe_menuul_active" v-on:click="menuSel(0,4)"><img src="../../common/stylus/0818new/lend_fcdy_icon_selected.png" />房产抵押借款</li>
            <li v-on:click="menuSel(1,5)"><img src="../../common/stylus/0818new/lend_fczy_icon_normal.png" />房产证质押借款</li>
            <li v-on:click="menuSel(2,3)"><img src="../../common/stylus/0818new/lend_zy_icon_normal.png" />车辆质押借款</li>
            <li v-on:click="menuSel(3,6)"><img src="../../common/stylus/0818new/lend_carGPS_icon_normal.png" />流动车抵押借款</li>
            <li v-on:click="menuSel(4,1)"><img src="../../common/stylus/0818new/lend_newcar_icon_normal.png" />新车购车借款</li>
            <li v-on:click="menuSel(5,2)"><img src="../../common/stylus/0818new/lend_shcar_icon_normal.png" />二手车购车借款</li>
        </ul>
    </div>
    <div class="loanBody">
        <div class="loanbodyC">
            <!-- @*房产抵押借款*@ -->
            <div class="infoTypeC" id="AjaxForm1">
                <!-- @*填写借款资料*@ -->
                <!-- 个人 -->
                <div class="loanerInfoC"  v-if="regType == 0">
                    <h3>填写借款资料</h3>
                    <div class="loanerInfowriteC clearfix">
                        <div class="infoC form-group">
                            <label><span>*</span>姓名：</label>
                            <input class="form-submit required" v-model="name" name="name" id="name" readonly />
                            <span class="tip"></span>
                            <input class="form-submit required" v-model="sid" name="sid" id="sid" type="hidden" />
                            <input class="form-submit required" v-model="type" name="type" id="type" type="hidden" />
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>性别：</label>
                            <select class="form-submit required" v-model="sex" name="sex" id="sex" disabled>
                                <option value="1">男</option>
                                <option value="0">女</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>年龄：</label>
                            <input class="form-submit required" type="number" v-model="age" name="age" id="age" readonly />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>联系电话：</label>
                            <input class="form-submit required" type="number" v-model="tell" name="tell" id="tell" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>身份证号码：</label>
                            <input class="form-submit required"  v-model="userCard" name="userCard" id="userCard" readonly />
                            <span class="tip"></span>
                        </div>
                        <div v-if="type == 4 || type == 5" class="infoC form-group">
                            <label><span>*</span>户籍：</label>
                            <input class="form-submit required" type="text" v-model="household" name="household" id="household" placeholder="请输入户籍" />
                            <span class="tip"></span>
                        </div>
                        <div v-if="type != 4 && type != 5" class="infoC form-group">
                            <label><span>*</span>学历：</label>
                            <select class="form-submit required" v-model="educational" name="educational" id="educational">
                                <option value="初中及以下">初中及以下</option>
                                <option value="职高">职高</option>
                                <option value="高中">高中</option>
                                <option value="大专">大专</option>
                                <option value="本科">本科</option>
                                <option value="研究生及以上">研究生及以上</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>婚姻状况：</label>
                            <select class="form-submit required" v-model="marry" name="marry" id="marry">
                                <option value="0">未婚</option>
                                <option value="1">已婚</option>
                                <option value="2">离异</option>
                                <option value="3">丧偶</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>工作性质：</label>
                            <select class="form-submit required" v-model="workType" name="workType" id="workType">
                                <option value="政府机构单位">政府机构单位</option>
                                <option value="企事业单位">企事业单位</option>
                                <option value="国企">国企</option>
                                <option value="私企">私企</option>
                                <option value="外企">外企</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>年收入：</label>
                            <select class="form-submit required" v-model="income" name="income" id="income">
                                <option value="10万及以下">10万及以下</option>
                                <option value="10万-20万">10万-20万</option>
                                <option value="20万-50万">20万-50万</option>
                                <option value="50万以上">50万以上</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                    </div>
                </div>
                <!-- 企业 -->
                <div class="loanerInfoC" v-if="regType == 1">
                    <h3>填写借款资料</h3>
                    <div class="loanerInfowriteC clearfix">
                        <div class="infoC form-group">
                            <label><span>*</span>企业名称：</label>
                            <input class="form-submit required" v-model="name" name="name" id="name" readonly />
                            <span class="tip"></span>
                            <input class="form-submit required" v-model="sid" name="sid" id="sid" type="hidden" />
                            <input class="form-submit required" v-model="type" name="type" id="type" type="hidden" />
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>企业电话：</label>
                            <input class="form-submit required"  type="text" v-model="tell" name="tell" id="tell" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>营业执照：</label>
                            <input class="form-submit required" type="text" v-model="userCard" name="userCard" id="userCard" readonly />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>注册资金：</label>
                            <select class="form-submit required" v-model="income" name="income" id="income">
                                <option value="10万及以下">10万及以下</option>
                                <option value="10万-20万">10万-20万</option>
                                <option value="20万-50万">20万-50万</option>
                                <option value="50万以上">50万以上</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>企业性质：</label>
                            <select class="form-submit required" v-model="workType" name="workType" id="workType">
                                <option value="政府机构单位">政府机构单位</option>
                                <option value="企事业单位">企事业单位</option>
                                <option value="国企">国企</option>
                                <option value="私企">私企</option>
                                <option value="外企">外企</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>主营业务：</label>
                            <input class="form-submit required" type="text" v-model="mainBusiness" name="mainBusiness" id="mainBusiness" />
                            <span class="tip"></span>
                        </div>
                    </div>
                </div>
                <!-- @*填写借款需求*@ -->
                <div class="loanerInfoC">
                    <h3>填写借款需求</h3>
                    <div class="loanerInfowriteC clearfix">
                        <div class="infoC form-group">
                            <label><span>*</span>借款金额（元）：</label>
                            <input class="form-submit required"  type="number" v-model="money" name="money" id="money" placeholder="请输入借款金额" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>借款期限：</label>
                            <select v-if="termUnit ==1" class="width50 form-submit required" v-model="term" name="term" id="term">
                                <option value="">请选择借款期限</option>
                                <option v-if="type != 4" value="1">1个月</option>
                                <option v-if="type != 4 && type != 6" value="2">2个月</option>
                                <option value="3">3个月</option>
                                <option v-if="type == 4 || type == 6"  value="6">6个月</option>
                                <option v-if="type == 4 || type == 6" value="12">12个月</option>
                            </select>
                            <input v-if="termUnit ==2" type="text" class="width50 form-submit required" v-model="term" name="term" id="term"  onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="6" placeholder="请输入借款期限" />
                            <select class="width50 form-submit required" v-model="termUnit" name="termUnit" id="termUnit" @change="termUnitChange">
                                <option value="1">月</option>
                                <option value="2">天</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <!-- <div class="infoC form-group">
                            <label><span>*</span>借款期限单位：</label>
                            <select class="width50 form-submit required" name="termUnit" id="termUnit" @change="termUnitChange">
                                <option value="1">月</option>
                                <option value="2">天</option>
                            </select>
                            <span class="tip"></span>
                        </div> -->
                        <div class="infoC form-group">
                            <label><span>*</span>借款利率（%）：</label>
                            <input class="form-submit required"  type="number" v-model="rate" name="rate" id="rate" placeholder="请输入借款利率" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>借款用途：</label>
                            <select class="form-submit required" v-model="use" name="use" id="use">
                                <option value="购买车辆">购买车辆</option>
                                <option value="资金周转">资金周转</option>
                                <option value="投资">投资</option>
                                <option value="消费">消费</option>
                                <option value="其他">其他</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>还款方式：</label>
                            <select class="form-submit required" v-model="returnType" name="returnType" id="returnType">
                                <option value="1" v-if="termUnit ==1">按月等额还款</option>
                                <option value="2">到期还本付息</option>
                                <option value="3" v-if="termUnit ==1">等额本息</option>
                                <option value="4" v-if="termUnit ==1">等额本金</option>
                                <option value="0" v-if="termUnit ==1">每月付息，到期还本</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>还款来源：</label>
                            <select class="form-submit required" v-model="text" name="text" id="text">
                                <option value="工资收入">工资收入</option>
                                <option value="经营收入">经营收入</option>
                                <option value="其他收入">其他收入</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                    </div>
                </div>
                <!-- @*房产信息*@ -->
                <div v-show="type == 4 || type == 5" class="loanerInfoC">
                    <h3>房产信息</h3>
                    <div class="loanerInfowriteC clearfix" id="houseaddressC">
                        <div class="infoC form-group">
                            <label><span>*</span>省：</label>
                            <select class="form-submit required prov" name="province" id="province">
                                <!-- @*<option value="">请选择省份</option>*@ -->
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>市：</label>
                            <select class="form-submit required city" name="city" id="city" disabled>
                                <!-- <option value="">@*请选择市*@</option> -->
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>详细地址：</label>
                            <input class="form-submit required" type="text"  v-model="houseAddr" name="houseAddr" id="houseAddr" placeholder="请输入详细地址" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>房产性质：</label>
                            <select class="form-submit required"  v-model="houseNature" name="houseNature" id="houseNature">
                                <option value="">请选择房产性质</option>
                                <option value="住宅">住宅</option>
                                <option value="非住宅">非住宅</option>
                                <option value="商业">商业</option>
                                <option value="其他">其他</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>房产证号：</label>
                            <input class="form-submit required" type="text"  v-model="houseCard" name="houseCard" id="houseCard" placeholder="请输入房产证号" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>房产面积(m²)：</label>
                            <input class="form-submit required" type="number" v-model="houseArea" name="houseArea" id="houseArea" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请输入房产面积" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>土地面积(m²)：</label>
                            <input class="form-submit required" type="number" v-model="groundArea" name="groundArea" id="groundArea" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请输入土地面积" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>房产用途：</label>
                            <select class="form-submit required" v-model="housePurpose" name="housePurpose" id="housePurpose">
                                <option value="">请选择房产用途</option>
                                <option value="出租">出租</option>
                                <option value="自住">自住</option>
                                <option value="空置">空置</option>
                                <option value="其他">其他</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>房产共有人：</label>
                            <input class="form-submit" type="text" v-model="houseOwner" name="houseOwner" id="houseOwner" placeholder="请输入房产共有人" />
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>土地性质：</label>
                            <select class="form-submit required" v-model="groundNature" name="groundNature" id="groundNature">
                                <option value="">请选择土地性质</option>
                                <option value="出让">出让</option>
                                <option value="划拨">划拨</option>
                                <option value="其他">其他</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>请输入验证码：</label>
                            <input class="codeInput form-submit required" type="text" name="" id="" placeholder="" />
                            <span class="tip"></span>
                            <span class="codespan">
                                <img class="codeimg" id="codeimg" v-bind:src="apiurl +'/api/user/getImgVerify?sid='+sid+'&random='+numrandom" v-on:click="numrandomChange">
                            </span>
                        </div>
                    </div>
                </div>
                <!-- @*填写其他资料*@ -->
                <div v-show="type != 4 && type != 5" class="loanerInfoC">
                    <h3>填写其他资料</h3>
                    <div class="loanerInfowriteC clearfix">
                        <div class="infoC form-group">
                            <label><span>*</span>居住地是否买房：</label>
                            <select class="form-submit required" v-model="haveHouse" name="haveHouse" id="haveHouse">
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>有无逾期记录：</label>
                            <select class="form-submit required" v-model="haveOverdue" name="haveOverdue" id="haveOverdue">
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>有无其他借款：</label>
                            <select class="form-submit required" v-model="otherLoan" name="otherLoan" id="otherLoan">
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                            <span class="tip"></span>
                        </div>
                        <div class="infoC form-group">
                            <label><span>*</span>请输入验证码：</label>
                            <input class="codeInput form-submit required" type="text" name="" id="" placeholder="" />
                            <span class="tip"></span>
                            <span class="codespan">
                                <img class="codeimg" id="codeimg" v-bind:src="apiurl +'/api/user/getImgVerify?sid='+sid+'&random='+numrandom" v-on:click="numrandomChange">
                            </span>
                        </div>
                    </div>
                </div>
                <!-- @*协议及提交按钮*@ -->
                <div class="agreeLine">
                    <p>
                        <label>
                            <input class="agreement" type="checkbox" />
                            我已阅读并同意
                            <a :href="loanxieyi" target="_blank">《借款及服务协议》</a>
                            和
                            <a :href="xieyi9" target="_blank">《授权书》</a>
                        </label>
                    </p>
                    <a class="loanSubmitBtn" @click="loansubmit">确认提交</a>
                    <a class="loanSubmitBtn" style="display:none;" id="SubmitBtn1">确认提交</a>
                </div>
            </div>
            
            <!-- @*借款流程*@ -->
            <div class="loanProcessC">
                <div class="loanProcessTitle">借款流程</div>
                <ul class="loanprocessUl clearfix">
                    <li><img src="../../common/stylus/0818new/lend_process_signup_icon.png" /><span>客户提交<br />借款申请</span></li>
                    <li><img src="../../common/stylus/0818new/lend_review_signup_icon.png" /><span>初步审核<br />&nbsp;</span></li>
                    <li><img src="../../common/stylus/0818new/lend_match_signup_icon.png" /><span>提交材料<br />&nbsp;</span></li>
                    <li><img src="../../common/stylus/0818new/lend_fangkuan_signup_icon.png" /><span>签约放款<br />&nbsp;</span></li>
                </ul>
            </div>

            <!-- @*借款须知*@ -->
            <div class="loanProcessC">
                <div class="loanProcessTitle">借款须知</div>
                <ul class="loantoKnowlist">
                    <li>
                        <h3>申请资格</h3>
                        <p>1、年满18周岁具有完全民事行为能力的自然人或法人。</p>
                        <p v-if="type == 4">2、拥有房产或土地且产权清晰。</p>
                        <p v-if="type == 5">2、拥有按揭房产或土地且产权清晰。</p>
                        <p v-if="type == 1 || type == 2 || type == 3">2、拥有可交易的非运营车辆且车况良好。</p>
                        <p v-if="type == 6">2、拥有车辆为全款车为抵押状态且持非运营牌照。</p>
                    </li>
                    <!-- 额度期限 -->
                    <li v-if="type == 4">
                        <h3>额度期限</h3>
                        <p>1、借款额度：</p>
                        <p class="pson">（1）一次抵押房产实际价值的6-7成。</p>
                        <p class="pson">（2）二次抵押房产剩余价值的7折（最高）。</p>
                        <p>2、借款期限：3个月，6个月，12个月等。</p>
                        <p>3、还款方式：每月付息，到期还本等。</p>
                    </li>
                    <li v-if="type == 5">
                        <h3>额度期限</h3>
                        <p>1、借款额度：5-20万元。</p>
                        <p>2、借款期限： 1个月，2个月，3个月等。</p>
                        <p>3、还款方式：每月付息，到期还本；到期还本付息等。</p>
                    </li>
                    <li v-if="type == 1 || type == 2 || type == 3">
                        <h3>额度期限</h3>
                        <p>1、借款额度：2-50万。</p>
                        <p>2、借款期限： 1个月，2个月，3个月等。</p>
                        <p>3、还款方式：每月付息，到期还本；到期还本付息等。</p>
                    </li>
                    <li v-if="type == 6">
                        <h3>额度期限</h3>
                        <p>1、借款额度：2-50万。</p>
                        <p>2、借款期限： 1个月，3个月，6个月，12个月等。</p>
                        <p>3、还款方式：每月付息，到期还本；到期还本付息；等额本息等。</p>
                    </li>
                    <!-- 所需材料 -->
                    <li v-if="type == 4">
                        <h3>所需材料</h3>
                        <p>1、二代身份证。</p>
                        <p>2、户口本，结婚证（共有时必须提供）。</p>
                        <p>3、房产证，土地证（不动产证）（需提供户型图及房屋朝向）。</p>
                        <p>4、征信（近15天内的有效征信）。</p>
                        <p>5、房屋抵押贷款申请表。</p>
                        <p>6、家访照片房产证质押借款。</p>
                    </li>
                    <li v-if="type == 5">
                        <h3>所需材料</h3>
                        <p>1、借款人及其配偶有效身份证件。</p>
                        <p>2、婚姻状况证明。</p>
                        <p>3、户籍证明或有效居住证明。</p>
                        <p>4、有效收入证明。</p>
                        <p>5、房产证（原件）。</p>
                        <p>6、借款人主要银行账户近六个月流水。</p>
                        <p>7、房产所有权人（含共有权人）有效身份证件。</p>
                        <p>8、根据需要提供的其他资料。</p>
                        <p>9、客户借款申请表及征信查询授权书。</p>
                    </li>
                    <li v-if="type == 1 || type == 2 || type == 3">
                        <h3>所需材料</h3>
                        <p>1、二代身份证原件。</p>
                        <p>2、车辆登记证。</p>
                        <p>3、行驶证（有效期需覆盖借款期限）。</p>
                        <p>4、交强险（需覆盖整个借款周期）。</p>
                        <p>5、车辆照片（车左右侧、车前后、里程表、合影、车架号、铭牌）。</p>
                    </li>
                    <li v-if="type == 6">
                        <h3>所需材料</h3>
                        <p>1、二代身份证原件。</p>
                        <p>2、车辆登记证（车大本）。</p>
                        <p>3、行驶证（有效期需覆盖借款期限）。</p>
                        <p>4、交强险及商业保险合同（商业险10万以下需有盗抢，第三者责任，不计免赔，车辆损失险四险中有2个就可以，10万以上需全部提供，押车无需商业险，所有保单需覆盖借款期限，若续贷时保单到期需补，若保单遗失，复印件需加盖保险公司公章）。</p>
                        <p>5、车辆照片（车左右侧、车前后、里程表、合影、车架号、铭牌）。</p>
                        <p>6、3日内个人银行征信。</p>
                        <p>7、当地不动产权证明（若不是本人名下房，直系亲属需提供户口本）。</p>
                        <p>8、工薪族提供工资卡流水证明，做生意的提供常用卡流水证明。</p>
                        <p>9、车主驾驶证。</p>
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
                regType:0,
                apiurl: '',
                sid: '',
                numrandom: Math.random(),
                useroldinfo:[],
                type: 4,
                termUnit:1,
                PA_State:'',
                name:'',
                sex:'',
                age:'',
                tell:'',
                userCard:'',
                household:'',
                educational:'初中及以下',
                marry:'0',
                workType:'政府机构单位',
                income:'10万及以下',
                money:'',
                term:'',
                termUnit:'1',
                rate:'',
                use:'购买车辆',
                returnType:'1',
                text:'工资收入',
                houseAddr:'',
                houseNature:'',
                houseCard:'',
                houseArea:'',
                groundArea:'',
                housePurpose:'',
                houseOwner:'',
                groundNature:'',
                haveHouse:0,
                haveOverdue:0,
                otherLoan:0,
                mainBusiness:'',
                loanxieyi:'',
                xieyi9:''
            }
        },
        created(){
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});

            self.apiurl = self.$store.state.APIURL;
            self.sid = localStorage.SID;

            self.$store.state.checklogin(self);   //验证是否登录
            //是否实名认证获取，若未实名就跳转到开户界面
            self.$store.state._ajax(self,'/api/user/userInfo', {}, function (data) {
                if (data.data.status == 0) {
                    self.$router.push({path:'/account/accountOpen'});
                }
                self.regType =data.data.regType;
            },'');

            //获取用户信息
            self.$store.state._ajax(self,'/api/loan/finLoan', {}, function (data) {
                // console.log(data);
                self.name = data.data.U_Name;
                self.sex = data.data.PA_Sex;
                self.age = data.data.PA_Age;
                self.userCard = data.data.U_CardID;
                self.tell = data.data.U_Mobile;
                self.PA_State = data.data.PA_State;
                if(data.data.PA_State == 0){
                    layer.confirm("您已有借款申请，是否重新编辑？",{title: '操作提示',icon: 6},function(){
                        layer.closeAll();
                    },function(){
                        self.$router.push({path:'/account/applyRecord'});
                    });
                    // PA_State为0时可以点击编辑覆盖，可以初始化数据，其他情况为添加数据：修改借款
                    self.household = data.data.PA_Census;
                    self.educational = (data.data.PA_Educational != null) ? data.data.PA_Educational :'初中及以下';
                    self.marry = data.data.PA_Mariage;
                    self.workType = data.data.PA_WorkType;
                    self.income = data.data.PA_Income;
                    self.money = data.data.PA_Money;
                    self.term = data.data.PA_TimeRange;
                    self.termUnit = data.data.PA_TimeUnit;
                    self.rate = data.data.PA_Rate;
                    self.use = data.data.PA_Use;
                    self.returnType = data.data.PA_ReturnType;
                    self.text = data.data.PA_Text;
                    self.mainBusiness = data.data.PA_MainBusiness;
                    //省市区赋值
                    $("#houseaddressC").citySelect({
                        url: "../static/js/city.min.js",
                        prov: data.data.PA_ProvID, //省份  
                        city:  data.data.PA_CityID, //城市  
                        dist: "", //区县  
                        required: false
                    });
                    self.houseAddr = data.data.PA_HouseAddress;
                    self.houseNature = data.data.PA_HouseNature;
                    self.houseCard = data.data.PA_HouseCardNo;
                    self.houseArea = data.data.PA_HouseArea;
                    self.groundArea = data.data.PA_GroundArea;
                    self.housePurpose = data.data.PA_HousePurpose;
                    self.houseOwner = data.data.PA_HouseOwner;
                    self.groundNature = data.data.PA_GroundNature;
                    self.haveHouse = data.data.PA_HaveHouse;
                    self.haveOverdue = data.data.PA_HaveOverdue;
                    self.otherLoan = data.data.PA_OtherLoan;
                }else{
                    //新增借款
                    //省市区赋值
                    $("#houseaddressC").citySelect({
                        url: "../static/js/city.min.js",
                        prov: "", //省份  
                        city: "", //城市  
                        dist: "", //区县  
                        required: false
                    });
                }
            }, '');
            
        },
        mounted:function(){
            var self = this;
            

            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav ul li").eq(2).find("a").addClass("router-link-exact-active");


            //提交房产抵押借款申请
            self.$store.state.AjaxSumbit(self,"/", "/api/loan/applyLoan", function (data) {
                layer.alert(data.msg,{title: '操作提示',icon: 6},function(){self.$router.push({path:'/account/applyRecord'});layer.closeAll();});
                setTimeout(function () {
                    self.$router.push({path:'/account/applyRecord'});
                    layer.closeAll();
                },3000)
            },'', true, '#AjaxForm1', '#SubmitBtn1')

            setTimeout(function(){
                self.$store.state._ajax(self,'/api/loan/contract', {respType : 'json',contractType : (self.regType == 0) ? 1 : 2}, function (data) {self.loanxieyi=data.data;},'');
                self.$store.state._ajax(self,'/api/open/contract', {respType : 'json',contractType : 9}, function (data) {self.xieyi9=data.data;},'');// 9 车贷授权书
            },500);
            
        },
        methods: {
            numrandomChange: function () {
                var self = this;
                self.numrandom = Math.random();
                $(".codeimg").attr('src', self.apiurl + '/api/user/getImgVerify?sid=' + bodyvue.sid + '&random=' + bodyvue.numrandom)
            },
            menuSel: function (_index,_type) {
                var self = this;
                $(".loanHe_menuul_active").removeClass("loanHe_menuul_active");
                $(".loanHe_menuul li").eq(_index).addClass("loanHe_menuul_active");
                self.type = _type;
            },
            termUnitChange: function () {
                this.termUnit = $("#termUnit").val();
            },
            loansubmit:function(){
                var self = this;
                if(self.PA_State == 0){
                    layer.confirm("您已有借款申请，是否重新提交？",{title: '操作提示',icon: 6},function(){
                        layer.closeAll();
                        $("#SubmitBtn1").click();
                    },function(){
                        self.$router.push({path:'/account/applyRecord'});
                    });
                }else{
                    $("#SubmitBtn1").click();
                }
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;}
input[type="number"]{-moz-appearance:textfield;}
.streamTypeC .dateselinput{font-size:12px;}
.width50{width: 50% !important;}
</style>
