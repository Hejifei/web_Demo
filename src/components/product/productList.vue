<template>
  <div class="index_centerC">
    <div class="index_center projectListC">
        <div class="awardListC">
            <ul class="clearfix" >
                <li :class="{awardList_active:listnum ==1}" @click='ProductListGet(1,1,"")'><a>散标列表</a></li>
                <li :class="{awardList_active:listnum ==2}" @click='ProductListGet(1,2,"")'><a>债权转让</a></li>
            </ul>
        </div>
        <div class="projuectListTopInfo">
            <ul class="clearfix">
                <li>
                  <p>——累计成交总金额——</p>
                  <p>
                    <span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="totalMoney"
                            :decimals="2"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>元</p></li>
                <li>
                  <p>——累计成交总笔数——</p>
                  <p><span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="totalNum"
                            :decimals="0"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>笔</p>
                </li>
                <li><p>——累计为用户赚取——</p>
                  <p><span class="iCountUp">
                        <i-count-up
                            :start="0"
                            :end="profit"
                            :decimals="2"
                            :duration="2"
                            :options="options"
                        ></i-count-up>
                    </span>元</p></li>
            </ul>
        </div>
        <div class="index_activityC projectListTab" style="position:relative;">
            <div class="listsearchC">
                <input type="text" v-model="keywords" id="keywords" />
                <a class="redBtn" id="SearchBtn" @click='ProductListGet(1,listnum,"")'>
                  <span class="icon-search"></span>
                </a>
            </div>
            <table>
                <thead>
                    <tr v-if="listnum ==1">
                        <td>借款标题</td>
                        <td>年利率<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="3" desc_sorting="4"></span></td>
                        <td>金额<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="1" desc_sorting="2"></span></td></td>
                        <td>期限<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="5" desc_sorting="6"></span></td>
                        <td>进度</td>
                        <td></td>
                    </tr>
                    <tr v-else-if="listnum ==2">
                        <td>借款标题</td>
                        <td>年利率<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="3" desc_sorting="4"></span></td>
                        <td>转让金额<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="1" desc_sorting="2"></span></td>
                        <td>预期回款</td>
                        <td style="text-align:center;">剩余期限<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="5" desc_sorting="6"></span></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="listnum == 1 && projectlist_sblb.length >0" v-for="(sblist,index) in projectlist_sblb" :key='index'>
                        <td :title="sblist.title">
                          <router-link :to="'/product/PInfo?id='+sblist.id">
                            <img :src="sblist.img"/> 
                            {{sblist.title}} 
                            <span title="此标的可使用红包" v-if="sblist.is_reward == 1" class="ptitlelogo">红包</span>
                            <span title="此标的可使用加息券" v-if="sblist.is_extraRate == 1" class="ptitlelogo">加息券</span>
                            <span title="此为新手专享标" v-if="sblist.is_new == 1" class="ptitlelogo">新手</span>
                            <span title="此为私人定制" v-if="sblist.isCustomized == 1" class="ptitlelogo">私人</span>
                          </router-link>
                        </td>
                        <td v-if="sblist.extra_rate == 0">{{sblist.base_rate}}%</td>
                        <td v-if="sblist.extra_rate > 0">{{sblist.base_rate}}%<span class="fontS12">+{{sblist.extra_rate}}%</span></td>
                        <td>￥{{sblist.money}}</td>
                        <td v-if="sblist.termUnit == 1">{{sblist.term}}个月</td>
                        <td v-if="sblist.termUnit == 2">{{sblist.term}}天</td>
                        <td>
                            <div class="percentage-text">{{sblist.progress}}%</div>
                            <div class="outer"><span class="inner" v-bind:style="{width : sblist.progress + '%'}"></span></div>
                        </td>
                        <td>
                            <router-link v-if="sblist.status == 1" :to="'/product/PInfo?id='+sblist.id">立即投资</router-link>
                            <a v-if="sblist.status == 6" class="projectEndbtn">投资满额</a>
                            <a v-if="sblist.status == 8" class="projectEndbtn">正在还款</a>
                            <a v-if="sblist.status == 9" class="projectEndbtn">已还款</a>
                            <a v-if="sblist.status == 10" class="projectEndbtn">已结束</a>
                            <a v-if="sblist.status == 11" class="projectEndbtn">已失效</a>
                            <a v-if="sblist.status == 13" class="projectEndbtn">出借结束</a>
                            <router-link v-if="sblist.status == 15" :to="'/product/PInfo?id='+sblist.id">{{sblist.investTime}}开抢</router-link>
                            <!-- <router-link v-if="sblist.status == 15" :to="'/product/PInfo?id='+sblist.id">即将发布</router-link> -->
                        </td>
                    </tr>
                    <tr v-if="listnum == 1 && projectlist_sblb.length ==0">
                      <td colspan="7" style="text-align:center;">暂无数据!</td>
                    </tr>
                    <tr v-else-if="listnum ==2 && projectlist_zqzr.length >0" v-for="(sblist,index) in projectlist_zqzr" :key='index'>
                        <td :title="sblist.title">
                          <router-link :to="'/product/transPInfo?id='+sblist.id+'&transfer_id='+sblist.transfer_id"><img :src="sblist.img" /> {{sblist.title}}</router-link>
                        </td>
                        <td>{{sblist.rate}}%</td>
                        <td>￥{{sblist.self_money}}</td>
                        <td>￥{{sblist.transfer_money}}</td>
                        <td style="text-align:center;padding:0 20px;">{{sblist.transferTerm}}个月</td>
                        <td>
                          <router-link v-if="sblist.transfer_status == 1" :to="'/product/transPInfo?id='+sblist.id+'&transfer_id='+sblist.transfer_id">立即承接</router-link>
                          <a v-if="sblist.transfer_status == 2" class="projectEndbtn">转让结束</a>
                          <a v-if="sblist.transfer_status == 3" class="projectEndbtn">再次转让</a>
                        </td>
                    </tr>
                    <tr v-if="listnum == 2 && projectlist_zqzr.length ==0">
                      <td colspan="6" style="text-align:center;">暂无数据!</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pages mypage clearfix">
            <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
        </div>
    </div>
</div>
</template>

<script>
    import '../../../static/Font-Awesome-3.2.1/font/fontawesome-webfont.woff';
    import LTJF from '../../common/js/ltjf.js';
    import ICountUp from 'vue-countup-v2';
    export default {
      name: 'HelloWorld',
      data () {
        return {
          uid: "",
          projectlist_sblb: [],
          projectlist_zqzr: [],
          statistics:[],
          keywords:'',
          listnum:1,
          totalMoney:0,
          profit:0,
          totalNum:0,
          options: {
              useEasing: true,
              useGrouping: true,
              separator: ',',
              decimal: '.',
              prefix: '',
              suffix: ''
          }
        }
      },
      created() {
        let self = this;
        // 非父子组件通信发送
        LTJF.$emit("txt",{header:true});
        //获取统计资金
        this.$store.state._ajax(self,'/api/product/statistics', {}, function (data) {
          var statistics = data.data;
          self.statistics = statistics;
          self.totalMoney = parseFloat(statistics.totalMoney);
          self.profit = parseFloat(statistics.profit);
          self.totalNum = parseInt(statistics.totalNum);
 
          // self.numberChange(statistics.totalMoney,'totalMoney',309123);
          // self.numberChange(statistics.profit,'profit',4334);
          // self.numberChange(statistics.totalNum,'totalNum',25);
        });
        this.ProductListGet(1, 1, '');
        
      },
      mounted:function(){
        let self = this;
        // 顶部菜单添加选中效果
        $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
        $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");
        
      },
      methods: {
        listsort:function(event,_type){
          let self = this;
          if (event.target.classList.contains("sort_asc")) {
            event.target.classList.remove("sort_asc");
            event.target.classList.add("sort_desc");
            self.ProductListGet(1, _type, event.target.getAttribute("desc_sorting"));
          } else if (event.target.classList.contains("sort_desc")) {
            event.target.classList.remove("sort_desc")
            self.ProductListGet(1 ,_type , '');
          } else {
            $(".sort_asc").removeClass("sort_asc");
            $(".sort_desc").removeClass("sort_desc");
            event.target.classList.add("sort_asc");
            self.ProductListGet(1, _type, event.target.getAttribute("asc_sorting"));
          }
        },
        ProductListGet:function (_page, _type, _sorting) {
          let self = this;
          self.listnum = _type;
          self.$store.state._ajax(self,'/api/product/index',
          {
            page: _page,
            type: _type,
            keywords:self.keywords,
            sorting: _sorting
          },
          function (data) {
            if (data.code == '1') {
              if (_type == 1) {
                let projectlist_sblb = data.data.data;
                for (var i = 0; i < projectlist_sblb.length; i++) {
                  projectlist_sblb[i].investTime = (projectlist_sblb[i].investTime).substr(11,5);
                  projectlist_sblb[i].progress = Math.floor(projectlist_sblb[i].progress);
                  projectlist_sblb[i].extra_rate = Number(projectlist_sblb[i].extra_rate);
                }
                self.projectlist_sblb = projectlist_sblb;
              } else if (_type == 2) {
                self.projectlist_zqzr = data.data.data;
              }
              //分页的重置
              if(data.data.data.length == 0){
                $(".mypage").html("");
              }else{
                $(".mypage").html("");
                $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                $(".tcdPageCode").createPage({
                  pageCount: data.data.last_page,
                  current: parseInt(data.data.current_page),
                  backFn: function (p) {
                    self.ProductListGet(p, _type, _sorting);
                  }
                });
              }
            } else {
              window.location.reload();
            }
          });
        },
        numberChange:function(oldvalue,newvue,speed){
          let self = this;
          let i = 0;
          var returnnum= 0;
          var interval =  setInterval(function(){
            i=i+speed;
            if((i) > oldvalue){
              clearInterval(interval);
            }
            self[newvue] = (i > oldvalue) ? oldvalue : i;
          },1)
        }
      },
      components:{
        ICountUp
      } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
