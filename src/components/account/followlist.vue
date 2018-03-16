<template>
    <div class="overview">
        <div class="graph">
            关注项目
        </div>
        <div class="chge"></div>
        <div class="index_activityC usercollecTab wid900">
            <table v-if="followList.length != 0">
                <thead>
                    <tr>
                        <td>借款标题</td>
                        <td>年利率</td>
                        <td>期限</td>
                        <td>金额</td>
                        <td>募集进度</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(follow,index) in followList" :key="index">
                        <td><a target="_blank" :href="'/#/product/PInfo?id='+follow.id">{{follow.title}}</a></td>
                        <td v-if="follow.extra_rate == 0">{{follow.base_rate}}%</td>
                        <td v-if="follow.extra_rate > 0">{{follow.base_rate}}%+{{follow.extra_rate}}%</td>
                        <td v-if="follow.termUnit ==1">{{follow.term}}个月</td>
                        <td v-if="follow.termUnit ==2">{{follow.term}}天</td>
                        <td>￥{{follow.money}}</td>
                        <td>
                            <div class="percentage-text">{{follow.progress}}%</div>
                            <div class="outer"><span class="inner"  v-bind:style="{width:follow.progress +'%'}"></span></div>
                        </td>
                        <td>
                            <a v-on:click='followCancel(follow.id)'>取消关注</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="havenolist" v-if="followList.length == 0">
                <h3>抱歉！您还没有关注任何项目</h3>
                <p>快去<router-link to="/product">关注</router-link>吧！</p>
            </div>
            <div class="pages mypage clearfix">
                <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        followList: []
      }
    },
    created(){
        var self = this;
        //关注项目列表获取
        self.followListGet(1);
    },
    mounted:function(){
        
    },
    methods: {
        followListGet: function(_page) {
            var self = this;
            self.$store.state._ajax(self,'/api/invest/follow',
                {page: _page},
                function (data) {
                    //bodyvue.followList = data.data;
                    var followList = data.data;
                    if (data.data.data.length == 0) {
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < followList.data.length; i++) {
                            followList.data[i].progress = Math.floor(followList.data[i].progress);
                            followList.data[i].extra_rate = Number(followList.data[i].extra_rate);
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.followListGet(p);
                            }
                        });
                    }
                    self.followList = followList.data;
                }, '', true);
        },
        followCancel:function (_id) {
            var self = this;
            layer.confirm("是否确认取消关注？",{title: '操作提示',icon: 6},function(){
                self.$store.state._ajax(self,'/api/product/follow', { id: _id }, function () {
                        window.location.reload();
                }, '')
            },function(){
                layer.closeAll();
            });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .index_activityC table tbody td:nth-child(1) {
    padding: 0 5px 0 5px;
}
.usercollecTab{padding: 20px 30px;} */
/* .index_activityC table td{padding: 0 5px;} */
</style>
