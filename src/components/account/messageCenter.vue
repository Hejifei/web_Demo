<template>
    <div class="overview">
        <div class="graph">消息中心</div>
        <div class="chge"></div>
        <div class="letterFromwebC">
            <ul v-if="messagelist.length > 0">
                <li v-for="(message,index) in messagelist" :key="index"   v-bind:class="{letterreaded: message.isRead ==1}">
                    <label>{{message.title}}</label>
                    <router-link class="clearfix cursor" :class="{letterreaded:message.isRead}" :to="'/account/messageDetail?id='+message.id">
                        <label :title="message.content">{{message.content}}</label>
                        <span>
                            {{message.time}}
                            <i v-if="message.isRead ==0" class="icon-circle" ></i>
                            <i v-else-if="message.isRead ==1" style="width:6.86px;height:1px;display:inline-block;"></i>
                        </span>
                    </router-link>
                </li>
            </ul>
            <p v-if="messagelist.length == 0" class="f-14 text-c mb20">暂无消息</p>
            <div class="pages mypage clearfix">
                <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
            </div>
            <!-- @*<div class="letterwebFooter clearfix">
                <label><input type="checkbox" id="selectall" /><i id="selectalltext">全选</i></label>
                <div class="fenyeC">
                    <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
                </div>
                <a class="redBtn"><span class="icon-trash"></span></a>
                <a class="redBtn">标记为已读</a>
            </div>*@ -->
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        messagelist:[]
      }
    },
    mounted:function(){
      var self = this;
      self.messageGet(1);
    },
    methods:{
        messageGet: function (_page) {
            var self = this;
            self.$store.state._ajax(self,'/api/message/index', {
                type: 0,
                page:_page
            }, function (data) {
                var messages = data.data.data;
                if(messages.length >0){
                    for(var i= 0;i<messages.length;i++){
                        messages[i].time = messages[i].time.substr(0, 16);
                    }
                    //分页的重置
                    $(".mypage").html("");
                    $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                    $(".tcdPageCode").createPage({
                        pageCount: data.data.last_page,
                        current: parseInt(data.data.current_page),
                        backFn: function (p) {
                            self.messageGet(p);
                        }
                    });
                }else{
                    $(".mypage").html("");
                }
                self.messagelist = messages;
                
            }, '');
            }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cursor{cursor:pointer;}
.letterFromwebC ul .letterreaded label {
    color: #969696;
    font-weight: normal;
}
</style>
