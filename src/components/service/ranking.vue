<template>
    <div class="rankingC">
        <div class="rankingHead"></div>
        <div class="rankingBody">
            <div class="rankB_left">
                <h1><img src="../../common/stylus/img/ranking_leftlogo.png" />创富排行</h1>
                <ul>
                    <li><a @click="RankingListGet(4,0)" class="rankingSel">创富月榜</a></li>
                    <li><a @click="RankingListGet(1,1)">创富总榜</a></li>
                    <li><a @click="RankingListGet(5,2)">积分排行</a></li>
                </ul>
            </div>
            <div class="rankB_right" style="position:relative;">
                <table>
                    <tbody>
                        <tr v-for="(rankinglist,index) in rankingList" :key="index">
                            <td><img :src="rankinglist.avatar"/>{{rankinglist.mobile}}</td>
                            <td v-if="type != 5">￥ {{rankinglist.figure}}</td>
                            <td v-if="type == 5">{{rankinglist.figure}}</td>
                            <td v-if="rankinglist.ROW_NUMBER == 1"><img src="../../common/stylus/img/rankingNum_1.png"/></td>
                            <td v-if="rankinglist.ROW_NUMBER == 2"><img src="../../common/stylus/img/rankingNum_2.png"/></td>
                            <td v-if="rankinglist.ROW_NUMBER == 3"><img src="../../common/stylus/img/rankingNum_3.png"/></td>
                            <td v-if="rankinglist.ROW_NUMBER > 3">{{rankinglist.ROW_NUMBER}}</td>
                        </tr>
                        <tr v-if="rankingList.length == 0"><td colspan="">暂无数据！</td></tr>
                    </tbody>
                </table>
                <table style="position:absolute;top:640px;">
                    <tbody>
                        <tr class="selftr">
                            <td><img :src="userInfo.avatar"/>{{userInfo.name}}</td>
                            <!-- <td>您已成功获得 <img src="../../common/stylus/img/rankingNum_1.png"/></td> -->
                            <td v-if="myRanking.paiming == 1">您已成功获得 <img src="../../common/stylus/img/rankingNum_1.png"/></td>
                            <td v-if="myRanking.paiming == 2">您已成功获得 <img src="../../common/stylus/img/rankingNum_2.png"/></td>
                            <td v-if="myRanking.paiming == 3">您已成功获得 <img src="../../common/stylus/img/rankingNum_3.png"/></td>
                            <td v-if="myRanking.paiming > 3 && myRanking.paiming <= 10">您已成功挤入前 {{myRanking.paiming}} 名</td>
                            <td v-if="myRanking.paiming > 10 || myRanking.paiming == 0">您已经击败了 {{myRanking.num}} %的用户</td>
                            <td>
                                <router-link v-if="type != 5" class="redBtn" to="/product">投资升榜</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';
    export default {
        data () {
            return {
                rankingList:[],
                myRanking:[],
                userInfo:JSON.parse(localStorage.ltjfUserInfo),
                type:4
            }
        },
        mounted () {  
            
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
            
        },
        created(){
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            this.RankingListGet(4);
            
        },
        methods:{
            RankingListGet:function(_type,_index){
                $(".rankingSel").removeClass("rankingSel");
                $(".rankB_left ul li").eq(_index).find("a").addClass("rankingSel");
                var self = this;
                self.type = _type;
                self._ajax(self,'/api/discovery/ranking', {type:_type}, function (data) {
                    self.rankingList = data.data.rankingList;
                    if(_type == 5){
                        for(var i = 0;i<self.rankingList.length;i++){
                            self.rankingList[i].figure = parseInt(self.rankingList[i].figure);
                        }
                    }
                    self.myRanking = data.data.myRanking;
                    $(".specialtr").removeClass("specialtr");
                    if(self.myRanking.paiming <= 10){
                        setTimeout(function() {
                            $(".rankB_right table tbody").find("tr").eq(self.myRanking.paiming - 1).addClass("specialtr");
                        }, 100);
                    }
                }, '');
            }
        }
    }
</script>

<style>
    .specialtr{background: rgb(254, 198, 179) !important;}
</style>
