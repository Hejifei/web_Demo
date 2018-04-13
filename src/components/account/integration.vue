<template>
    <div class="overview">
        <div class="graph">
            我的积分
            <a class="newredBtn" @click="developing">积分商城</a>
        </div>
        <!-- <div class="chge"></div> -->
        <div class="commissionGetC"  v-cloak>
            <ul class="mypointsul clearfix">
                <li>
                    <p>可用积分</p>
                    <span>
                        <label>{{allScore.availableScore}}</label>
                        <router-link to="/service/integratRule">(如何赚取更多积分)</router-link>
                    </span>
                </li>
                <li>
                    <p>累计使用</p>
                    <span><label>{{allScore.totalConsumption}}</label></span>
                </li>
                <li>
                    <p>累计获得</p>
                    <span><label>{{allScore.getScore}}</label></span>
                </li>
                <li>
                    <p>过期积分</p>
                    <span><label>{{allScore.overdueScore}}</label></span>
                </li>
            </ul>
        </div>
        <div class="chgenew"></div>
        <div class="commissionDetailC pointsTableC">
            <p>积分明细</p>
            <table>
                <thead>
                    <tr>
                        <td>时间</td>
                        <td>积分行为</td>
                        <td>积分变化</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(sign,index) in signList" :key="index">
                        <td>{{sign.createTime}}</td>
                        <td style="text-align:center;">{{sign.title}}</td>
                        <td v-if="sign.recordType == 1">+{{sign.score}}</td>
                        <td v-if="sign.recordType == 2">{{sign.score}}</td>
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
        signList: [],
        allScore:''
      }
    },
    mounted:function(){
        var self = this;
        self.getsignlist(1);
    },
    methods: {
        getsignlist:function(_page) {
            var self = this;
            //签到记录取
            self._ajax(self,'/api/score/getScoreList', {
                page: _page
            }, function (data) {
                self.allScore = data.data.total;
                self.allScore.availableScore = parseInt(self.allScore.availableScore);
                self.allScore.totalConsumption = Math.abs(self.allScore.totalConsumption);
                var transferlist = data.data.list.data;
                if (transferlist.length > 0) {
                    for (var i = 0; i < transferlist.length; i++) {
                        transferlist[i].createTime = transferlist[i].createTime.substr(0, 10);
                        transferlist[i].score = parseInt(transferlist[i].score);
                    }
                    //分页的重置
                    $(".mypage").html("");
                    $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                    $(".tcdPageCode").createPage({
                        pageCount: data.data.list.last_page,
                        current: parseInt(data.data.list.current_page),
                        backFn: function (p) {
                            self.getsignlist(p);
                        }
                    });
                } else {
                    //分页的重置
                    $(".mypage").html("");
                }
                self.signList = transferlist;
            }, '');
        },
        developing: function(){
            var self = this;
              layer.alert("您可以下载APP访问积分商城！",{title: '操作提示',icon: 6},function(){
                layer.closeAll();
            });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pointsTableC table tbody tr td:nth-child(1){padding-left: 55px;}
</style>
