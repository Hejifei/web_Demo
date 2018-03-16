<template>
    <div class="overview">
        <div class="graph">我的奖券</div>
        <div class="awardListC">
            <ul class="clearfix">
                <li @click="getawardList(1, 0, 1,0)" class="awardList_active">红包</li>
                <li @click="getawardList(2, 0, 1,1)">加息券</li>
            </ul>
        </div>
        <div class="chgenew"></div>
        <!-- @*红包列表*@ -->
        <div class="awardsonlistC"  v-cloak>
            <ul class="awardsonlist clearfix">
                <label>红包状态：</label>
                <li class="awardsonlist_active" @click="getawardList(1, 0, 1,0)">未使用</li>
                <li @click="getawardList(1, 1, 1,0)">已使用</li>
                <li @click="getawardList(1, 2, 1,0)">已过期</li>
            </ul>
            
            <div class="awardDetailListC">
                <!-- @*未使用红包列表*@ -->
                <div class="awardDetailList">
                    <div class="awardoutC" v-if="keywords == 0 && awardInfo.length != 0" v-for="(award,index) in awardInfo" :key='index'>
                        <div class="award_Info_left">
                            <div class="awdinfoL_top">
                                <div class="DinFont"><i>￥</i>{{award.money}}</div>
                                <div class="tr">
                                    <p class="grayDarkColor">{{award.source}}</p><p>{{award.title}}</p>
                                </div>
                            </div>
                            <div class="awdinfoL_mid" v-html="award.content"></div>
                            <div class="awdinfoL_btm">有效期：{{award.beginTime}}~{{award.endTime}}</div>
                        </div>
                        <div class="award_Info_right"><router-link to="/product">立即使用</router-link></div>
                    </div>
                    <div v-if="keywords == 0 && awardInfo.length == 0" class="havenoaward"><em>暂无未使用红包</em></div>
                </div>
                <!-- @*已使用红包列表*@ -->
                <div class="awardDetailList">
                    <div class="awardoutC" v-if="keywords == 1 && awardInfo.length != 0" v-for="(award,index) in awardInfo" :key="index">
                        <div class="award_Info_left">
                            <div class="awdinfoL_top">
                                <div class="DinFont"><i>￥</i>{{award.money}}</div>
                                <div class="tr">
                                    <p class="grayDarkColor">{{award.source}}</p><p>{{award.title}}</p>
                                </div>
                            </div>
                            <div class="awdinfoL_mid" v-html="award.content"></div>
                            <div class="awdinfoL_btm">有效期：{{award.beginTime}}~{{award.endTime}}</div>
                        </div>
                        <div class="award_Info_right awdused"><a to="/product">已使用</a></div>
                    </div>
                    <div v-if="keywords == 1 && awardInfo.length == 0" class="havenoaward"><em>暂无已使用红包</em></div>
                </div>
                <!-- @*已过期红包列表*@ -->
                <div class="awardDetailList">
                    <div class="awardoutC" v-if="keywords == 2 && awardInfo.length != 0" v-for="(award,index) in awardInfo" :key="index">
                        <div class="award_Info_left">
                            <div class="awdinfoL_top">
                                <div class="DinFont"><i>￥</i>{{award.money}}</div>
                                <div class="tr">
                                    <p class="grayDarkColor">{{award.source}}</p><p>{{award.title}}</p>
                                </div>
                            </div>
                            <div class="awdinfoL_mid" v-html="award.content"></div>
                            <div class="awdinfoL_btm">有效期：{{award.beginTime}}~{{award.endTime}}</div>
                        </div>
                        <div class="award_Info_right awdused"><a to="/product">已过期</a></div>
                    </div>
                    <div v-if="keywords == 2 && awardInfo.length == 0" class="havenoaward"><em>暂无已过期红包</em></div>
                </div>
            </div>
        </div>
        <!-- @*加息券列表*@ -->
        <div class="awardsonlistC"  v-cloak>
            <ul class="awardsonlist clearfix">
                <label>加息券状态：</label>
                <li @click="getawardList(2, 0, 1,1)" class="awardsonlist_active">未使用</li>
                <li @click="getawardList(2, 1, 1,1)">已使用</li>
                <li @click="getawardList(2, 2, 1,1)">已过期</li>
            </ul>
            <div class="chge"></div>
            <div class="awardDetailListC">
                <!-- @*未使用加息券列表*@ -->
                <div class="awardDetailList">
                    <div class="awardoutC jxqC" v-if="keywords == 0 && awardInfo.length != 0" v-for="(award,index) in awardInfo" :key="index">
                        <div class="award_Info_left">
                            <div class="awdinfoL_top">
                                <div class="DinFont">{{award.money}}%</div>
                                <div class="tr">
                                    <p class="grayDarkColor">{{award.source}}</p><p>{{award.title}}</p>
                                </div>
                            </div>
                            <div class="awdinfoL_mid" v-html="award.content"></div>
                            <div class="awdinfoL_btm">有效期：{{award.beginTime}}~{{award.endTime}}</div>
                        </div>
                        <div class="award_Info_right"><router-link to="/product">立即使用</router-link></div>
                    </div>
                    <div class="havenoaward" v-if="keywords == 0 && awardInfo.length == 0"><em>暂无未使用加息券</em></div>
                </div>
                <!-- @*已使用加息券列表*@ -->
                <div class="awardDetailList">
                    <div class="awardoutC jxqC" v-if="keywords == 1 && awardInfo.length != 0" v-for="(award,index) in awardInfo" :key="index">
                        <div class="award_Info_left">
                            <div class="awdinfoL_top">
                                <div class="DinFont">{{award.money}}%</div>
                                <div class="tr">
                                    <p class="grayDarkColor">{{award.source}}</p><p>{{award.title}}</p>
                                </div>
                            </div>
                            <div class="awdinfoL_mid" v-html="award.content"></div>
                            <div class="awdinfoL_btm">有效期：{{award.beginTime}}~{{award.endTime}}</div>
                        </div>
                        <div class="award_Info_right awdused"><a to="/product">已使用</a></div>
                    </div>
                    <div class="havenoaward" v-if="keywords == 1 && awardInfo.length == 0"><em>暂无已使用加息券</em></div>
                </div>
                <!-- 期加息券列表 -->
                <div class="awardDetailList">
                    <div class="awardoutC jxqC" v-if="keywords == 2 && awardInfo.length != 0" v-for="(award,index) in awardInfo" :key="index">
                        <div class="award_Info_left">
                            <div class="awdinfoL_top">
                                <div class="DinFont">{{award.money}}%</div>
                                <div class="tr">
                                    <p class="grayDarkColor">{{award.source}}</p><p>{{award.title}}</p>
                                </div>
                            </div>
                            <div class="awdinfoL_mid" v-html="award.content"></div>
                            <div class="awdinfoL_btm">有效期：{{award.beginTime}}~{{award.endTime}}</div>
                        </div>
                        <div class="award_Info_right awdused"><a to="/product">已过期</a></div>
                    </div>
                    <div class="havenoaward" v-if="keywords == 2 && awardInfo.length == 0"><em>暂无已过期加息券</em></div>
                </div>
            </div>
        </div>
        <div class="pages mypage clearfix">
            <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        awardInfo: [],
        type: '',
        keywords: ''
      }
    },
    mounted:function(){
      var self = this;
      this.getawardList(1,0,1,0)

      //红包与加息券切换
    //   $(".awardListC ul li").click(function () {
    //     $(".awardList_active").removeClass("awardList_active");
    //     $(this).addClass("awardList_active");
    //     $(".awardsonlistC").hide();
    //     $(".awardsonlistC").eq($(this).index()).show();
    //   })
    //   $(".awardsonlist li").click(function () {
    //     $(this).siblings(".awardsonlist_active").removeClass("awardsonlist_active");
    //     $(this).addClass("awardsonlist_active");
    //     $(this).parent(".awardsonlist").siblings(".awardDetailListC").find(".awardDetailList").hide();
    //     $(this).parent(".awardsonlist").siblings(".awardDetailListC").find(".awardDetailList").eq($(this).index()).show();
    //   })

        //使用规则的开关
            $(".overview").delegate(".awardoutC .routeLab", 'click', function () {
                if ($(this).find("span").hasClass("icon-angle-up")) {
                    $(this).find(".icon-angle-up").removeClass("icon-angle-up").addClass("icon-angle-down");
                    $(this).parents(".awardoutC").find(".routeDetail").hide();
                } else {
                    $(this).find(".icon-angle-down").removeClass("icon-angle-down").addClass("icon-angle-up")
                    $(this).parents(".awardoutC").find(".routeDetail").css("display", "inline-block")
                }
                
            })
    },
    methods: {
        getawardList:function(_type, _keywords, _page,_index) {
            var self = this;
            //红包列表获取
            self.$store.state._ajax(self,'/api/reward/getList',
                {
                    rewardType: _type,
                    keywords: _keywords,
                    page: _page
                },
                function (data) {
                    // console.log(data)
                    var awardInfo = data.data.data;
                    if (awardInfo.length == 0) {
                        //分页的重置
                        $(".mypage").html("");
                    } else {
                        for (var i = 0; i < awardInfo.length; i++) {
                            awardInfo[i].beginTime = awardInfo[i].beginTime.substr(0, 10);
                            awardInfo[i].endTime = awardInfo[i].endTime.substr(0, 10);
                            if (_type == 1) {
                                awardInfo[i].money = parseInt(awardInfo[i].money);
                            } else {
                                awardInfo[i].money = parseFloat(awardInfo[i].money).toFixed(1);
                            }
                            awardInfo[i].minMoney = parseInt(awardInfo[i].minMoney);
                        }
                        //分页的重置
                        $(".mypage").html("");
                        $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                        $(".tcdPageCode").createPage({
                            pageCount: data.data.last_page,
                            current: parseInt(data.data.current_page),
                            backFn: function (p) {
                                self.getawardList(_type, _keywords, p,_index);
                            }
                        });
                    }
                    self.keywords = _keywords;
                    self.awardInfo = awardInfo;
                        
                    $(".awardList_active").removeClass("awardList_active");
                    $(".awardListC ul li").eq(_index).addClass("awardList_active");
                    $(".awardsonlistC").hide();
                    $(".awardsonlistC").eq(_index).show();    
                    $(".awardsonlist_active").removeClass("awardsonlist_active");
                    $(".awardsonlistC").eq(_index).find(".awardsonlist li").eq(_keywords).addClass("awardsonlist_active");
                    $(".awardsonlistC").eq(_index).find(".awardDetailListC .awardDetailList").hide();
                    $(".awardsonlistC").eq(_index).find(".awardDetailListC .awardDetailList").eq(_keywords).show();
                    // $(".awardsonlist li").click(function () {
                    //     $(".awardsonlist_active").removeClass("awardsonlist_active");
                    //     $(".awardsonlist li").eq(_keywords).addClass("awardsonlist_active");
                    //     $(".awardDetailList").hide();
                    //     $(this).parent(".awardsonlist").siblings(".awardDetailListC").find(".awardDetailList").eq($(this).index()).show();
                    // })
                }, '');
            
            
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
