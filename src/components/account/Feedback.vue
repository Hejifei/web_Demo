<template>
    <div class="overview">
        <div class="graph">意见反馈</div>
        <div class="awardListC">
            <ul class="clearfix">
                <li :class="{awardList_active:feedbacktype ==0}" @click="feedbacktypeChange(0)">反馈信息</li>
                <li :class="{awardList_active:feedbacktype ==1}" @click="feedbacktypeChange(1)">历史反馈</li>
            </ul>
        </div>
        <div class="chgenew"></div>
        <!-- 意见反馈 -->
        <div class="feedbackBubmitC" v-if="feedbacktype == 0">
            <div class="tip_line row">
                <div>请详细描述您遇到的问题、您的意见或建议</div>
                <label>您还可以输入{{textarea_Insertpromise}}字</label>
            </div>
            <textarea v-model="content" maxlength="200"></textarea>
            <div class="inputline">
                <label>QQ、邮箱或手机等联系方式</label>
                <input maxlength="25" v-model="tel"/>
                <span>（您的联系方式有助于我们沟通和解决问题，仅工作人员可见）</span>
            </div>
            <a class="submitbtn redBtn" @click="submit">提交反馈</a>
        </div>
        <!-- 历史反馈 -->
        <div class="Feedbacklist" v-if="feedbacktype == 1">
            <ul>
                <li class="row" v-for="(feedback,index) in feedbacklist" :key="index"><label :title="feedback.content">{{feedback.content}}</label><span>{{feedback.createTime}}</span></li>
                <li v-if="feedbacklist.length == 0" style="text-align:center;">您还没有提交过任何反馈！</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                feedbacktype:0,//0：意见反馈 1：历史反馈
                content:'',
                tel:'',
                feedbacklist:[]
            }
        },
        computed:{
            textarea_Insertpromise:function(){
                // 您还可以输入多少字
                var self = this;
                return 200-self.content.length;
            }
        },
        mounted:function(){
            var self = this;
            self.getFeedbackList();    
        },
        methods: {
            submit:function(){
                var self = this;
                if(self.content == ''){
                    // 请填写反馈内容
                    layer.alert("请填写反馈内容", {title: '操作提示',icon: 5}, function () { layer.closeAll(); })
                }else{
                    self.$store.state._ajax(self,'/api/account/feedback',
                        {content: self.content,tel:self.tel},
                        function (data) {
                            layer.alert(data.msg, {title: '操作提示',icon: 6}, function () { layer.closeAll();self.getFeedbackList();  self.feedbacktype = 1;})
                        }, '', true);
                }
            },
            feedbacktypeChange:function(type){
                this.feedbacktype = type;
            },
            getFeedbackList:function(){
                var self = this;
                self.$store.state._ajax(self,'/api/account/getFeedback',{},
                    function (data) {
                        var feedbacklist = data.data;
                        if(feedbacklist.length >0){
                            for(var i = 0;i<feedbacklist.length;i++){
                                feedbacklist[i].createTime = feedbacklist[i].createTime.substr(0,16);
                            }
                        }
                        self.feedbacklist = feedbacklist;
                    }, function(data){
                        self.feedbacklist ='';
                    }, true);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
