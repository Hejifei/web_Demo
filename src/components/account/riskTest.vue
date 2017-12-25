<template>
    <div class="overview">
    <div class="graph">风险评估</div>
    <div class="chge"></div>
    <div class="risklistC"  id="AjaxForm">
        <ul class="risktestlist">
            <li class="form-group">
                <h3>1、您的年龄是？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="year" type="radio" value="1" />A.18-30岁</label></li>
                    <li><label><input class="radio" name="year" type="radio" value="2" />B.31-50岁</label></li>
                    <li><label><input class="radio" name="year" type="radio" value="3" />C.51-60岁</label></li>
                    <li><label><input class="radio" name="year" type="radio" value="4" />D.高于60岁</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>2、您家庭年收入为（折合人民币）？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="income" type="radio" value="1" />A.5万元以下</label></li>
                    <li><label><input class="radio" name="income" type="radio" value="2" />B.5万-20万元</label></li>
                    <li><label><input class="radio" name="income" type="radio" value="3" />C.20万-50万元</label></li>
                    <li><label><input class="radio" name="income" type="radio" value="4" />D.50万-100万元</label></li>
                    <li><label><input class="radio" name="income" type="radio" value="5" />E.100万元以上</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>3、在您每年的家庭收入中，可用于金融投资（储蓄存款除外）的比例为？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="proportion" type="radio" value="1" />A.小于10%</label></li>
                    <li><label><input class="radio" name="proportion" type="radio" value="2" />B.10%-25%</label></li>
                    <li><label><input class="radio" name="proportion" type="radio" value="3" />C.25%-50%</label></li>
                    <li><label><input class="radio" name="proportion" type="radio" value="4" />D.大于50%</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>4、以下哪项更能说明您的投资经验？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="experience" type="radio" value="1" />A.除存款、国债外，我几乎不投资其他金融产品</label></li>
                    <li><label><input class="radio" name="experience" type="radio" value="2" />B.大部分投资于存款、国债等，较少投资于股票、基金等风险产品</label></li>
                    <li><label><input class="radio" name="experience" type="radio" value="3" />C.资产均衡地分布于存款、国债、银行理财产品、托信产品、股票、基金等</label></li>
                    <li><label><input class="radio" name="experience" type="radio" value="4" />D.大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>5、您有多少年投资股票、基金、外汇、金融衍生品等风险投资品的经验？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="bidRisk" type="radio" value="1" />A.没有经验</label></li>
                    <li><label><input class="radio" name="bidRisk" type="radio" value="2" />B.少于2年</label></li>
                    <li><label><input class="radio" name="bidRisk" type="radio" value="3" />C.2-5年</label></li>
                    <li><label><input class="radio" name="bidRisk" type="radio" value="4" />D.5-8年</label></li>
                    <li><label><input class="radio" name="bidRisk" type="radio" value="5" />E.8年以上</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>6、以下哪项描述最符合您的投资态度？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="attitude" type="radio" value="1" />A.厌恶风险，不希望本金损失，希望获得稳定回报</label></li>
                    <li><label><input class="radio" name="attitude" type="radio" value="2" />B.保守投资，不希望本金损失，愿意承担一定幅度的收益波动</label></li>
                    <li><label><input class="radio" name="attitude" type="radio" value="3" />C.寻求资金的较高收益和成长性，愿意为此承担有限本金损失</label></li>
                    <li><label><input class="radio" name="attitude" type="radio" value="4" />D.希望赚取高回报，愿意为此承担较大本金损失</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>7、以下情况，您会选择哪一种？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="win" type="radio" value="1" />A.有100%的机会赢取1000元现金</label></li>
                    <li><label><input class="radio" name="win" type="radio" value="2" />B.有50%的机会赢取5万元现金</label></li>
                    <li><label><input class="radio" name="win" type="radio" value="3" />C.有25%的机会赢取50万元现金</label></li>
                    <li><label><input class="radio" name="win" type="radio" value="4" />D.有10%的机会赢取100万元现金</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>8、您计划的投资期限是多久？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="term" type="radio" value="1" />A.1年以下</label></li>
                    <li><label><input class="radio" name="term" type="radio" value="2" />B.1-3年</label></li>
                    <li><label><input class="radio" name="term" type="radio" value="3" />C.3-5年</label></li>
                    <li><label><input class="radio" name="term" type="radio" value="4" />D.5年以上</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>9、您的投资目的是？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="objective" type="radio" value="1" />A.资产保值</label></li>
                    <li><label><input class="radio" name="objective" type="radio" value="2" />B.资产稳健增长</label></li>
                    <li><label><input class="radio" name="objective" type="radio" value="3" />C.资产迅速增长</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <li class="form-group">
                <h3>10、您的投资出现何种程度的波动时，您会呈现明显的焦虑？</h3>
                <ul class="riskDetail">
                    <li><label><input class="radio" name="bidWave" type="radio" value="1" />A.本金无损失，但收益未达预期</label></li>
                    <li><label><input class="radio" name="bidWave" type="radio" value="2" />B.出现轻微本金损失</label></li>
                    <li><label><input class="radio" name="bidWave" type="radio" value="3" />C.本金10%以内的损失</label></li>
                    <li><label><input class="radio" name="bidWave" type="radio" value="4" />D.本金20%-50%的损失</label></li>
                    <li><label><input class="radio" name="bidWave" type="radio" value="5" />E.本金50%以上损失</label></li>
                </ul>
                <span class="tip"></span>
            </li>
            <input class="moneyinput form-submit" v-model="sid" type="hidden" name="sid" />
            <input class="moneyinput form-submit" v-model="duration" type="hidden" name="duration" />
        </ul>
        <div class="btnline">
            <a class="redBtn" @click="riskTestSubmit">提交</a>
            <a class="redBtn" style="display:none;" id="SubmitBtn">提交</a>
        </div>
    </div>
</div>
</template>

<script>
    
    export default {
        data () {
            return {
                sid:'',
                TimeComein:'',
                TimeSubmit:'',
                duration:''
            }
        },
        mounted:function(){
            var self = this;
            self.TimeComein = new Date().getTime();
            self.sid = localStorage.SID;
            self.$store.state.AjaxSumbit(self,"/", "/api/risk/index", function (data) {
				var riskMsg = data.msg;
				if(data.data){
					riskMsg ="您的评测结果为:"+data.data;
				}
                layer.alert(riskMsg,{title: '操作提示',icon: 6},function(){layer.closeAll();self.$router.push({path:"/account/baseInfo"});});
            },function(){
                layer.alert(data.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
            })
        },
        methods: {
            riskTestSubmit:function(){
                var self = this;
                self.TimeSubmit = new Date().getTime();
                self.duration = parseInt((self.TimeSubmit - self.TimeComein)/1000);
                $("#SubmitBtn").click();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
