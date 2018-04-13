<template>
    <div class="overview">
        <div class="graph">
            我的好友 
            <router-link class="newredBtn" to="/service/special_regist">邀请好友</router-link>
            <!-- <i>小伙伴就在身边？<br />赶紧扫一扫您的专属推荐二维码</i>
            <img class="inviteFriendsImg" :src="'https://pan.baidu.com/share/qrcode?w=512&h=512&url=https://cdn.litongjinfu.com/public/reg/regred/index.html?inviter='+userid" /> -->
        </div>
        <div class="chgenew"></div>
        <div class="commissionDetailC pointsTableC friendsTableC">
            <p>
                好友列表
                <span class="bluetip" v-if="friendsNum>0">(已邀请人数 {{friendsNum}} 位)</span>  
            </p>
            <table>
                <thead>
                    <tr>
                        <td>用户名</td>
                        <td>手机号码</td>
                        <td>注册时间</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(friend,index) in List" :key="index">
                        <td>
                            <img :src="friend.avatar"/>{{friend.name}}
                            <span class="investlevel" v-if="friend.investGrade == 0" title="未实名用户"><i class="vipmin"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 1" title="未投资的用户"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 2" title="青铜：投资金额 5000 元以下"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 3" title="白银：投资金额 5000-50000 元"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 4" title="黄金：投资金额 50000-79999 元"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 5" title="白金：投资金额 80000-159999 元"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 6" title="钻石：投资金额 160000-299999 元"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                            <span class="investlevel" v-if="friend.investGrade == 7" title="王者：投资金额 300000 元以上"><i class="viplarger"></i><sub>{{friend.investGrade}}</sub></span>
                        </td>
                        <td>{{friend.mobile}}</td>
                        <td style="padding:0 !important;">{{friend.regTime}}</td>
                        <td v-if="friend.isUserAccount == 0">未实名</td>
                        <td v-if="friend.isUserAccount == 1 && friend.isInvest  == 0">未投资</td>
                        <td v-if="friend.isUserAccount == 1 && friend.isInvest  == 1">已投资</td>
                        <td><a class="redBtn graybtn">{{friend.remindTitle}}</a></td>
                    </tr>
                    <tr v-if="List.length == 0">
                        <td colspan="5">您还没有好友，快去<router-link class="hrefa" to="/service/special_regist">邀请好友</router-link>注册吧！</td>
                    </tr>
                </tbody>
            </table>
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
        List: [],
        friendsNum:'',
        userid:JSON.parse(localStorage.ltjfUserInfo).id
      }
    },
    mounted:function(){
        var self = this;
        this.getlist(1);
    },
    methods: {
        getlist: function (_page) {
            var self = this;
            //签到记录取
            self._ajax(self,'/api/discovery/getFriends', {
                page: _page
            }, function (data) {
                // console.log(data)
                var list = data.data.data;
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].regTime = list[i].regTime.substr(0, 16);
                    }
                    //分页的重置
                    $(".mypage").html("");
                    $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                    $(".tcdPageCode").createPage({
                        pageCount: data.data.last_page,
                        current: parseInt(data.data.current_page),
                        backFn: function (p) {
                            self.getlist(p);
                        }
                    });
                } else {
                    //分页的重置
                    $(".mypage").html("");
                }
                self.friendsNum = data.data.total;
                self.List = list;
            }, '');
        }
        
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .graph{position: relative;}
    .graph i{font-size: 12px;line-height: 20px !important;position: absolute;top: 15px;right: 120px;display: block;width: 180px;text-align: center;}
    .inviteFriendsImg{width: 90px;height: 90px;float: right;z-index: 999;position: absolute;top: 15px;right: 15px;}
</style>
