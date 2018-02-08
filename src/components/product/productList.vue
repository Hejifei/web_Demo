<template>
  <div class="index_centerC">
    <div class="index_center projectListC">
      <!-- <p class="prolistP">出借有风险，投资需谨慎</p> -->
      <div class="newPLC">
        <div class="newPLC_left">
          <label>产品列表</label>
          <ul class="np_left_menuul">
            <!-- <li :class="{np_left_liactive:listnum ==1}" @click='ProductListGet(1,1,"")'>散标投资（{{getNum.productsNum}}）</li> -->
            <li :class="{np_left_liactive:listnum ==3}" @click='ProductListGet(1,3,"")'>利房宝（{{productInfo.home}}）</li>
            <li :class="{np_left_liactive:listnum ==4}" @click='ProductListGet(1,4,"")'>利车宝（{{productInfo.car}}）</li>
            <li :class="{np_left_liactive:listnum ==2}" @click='ProductListGet(1,2,"")' style="border-top:0;">债权转让（{{getNum.transferNum}}）</li>
            <li :class="{np_left_liactive:listnum ==5}" @click='ProductListGet(1,5,"")' style="border-top:0;">预约抢购</li>
          </ul>
          <div class="investDynamicC">
            <!-- <img class="newyearimg" src="../../common/stylus/img/newyear_prolist1.png" /> -->
            <label style="border-top:0;">投资动态</label>
            <div class="dynamicC">
              <ul>
                <li v-for="(bidDynamic,index) in bidDynamicList" :key="index">
                  <router-link :to="'/product/PInfo?id='+bidDynamic.id">
                    <p>{{bidDynamic.name}} 成功投标 {{bidDynamic.title}} <span>{{bidDynamic.bidMoney}}</span> 元<i> {{bidDynamic.createTime}}</i></p>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="newPLC_right">
          <div class="NoTypeLine">
            <label>排序方式</label>
            <ul>
              <li>项目规模<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="1" desc_sorting="2"></span></li>
              <li>预计年化<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="3" desc_sorting="4"></span></li>
              <li>投资期限<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="5" desc_sorting="6"></span></li>
            </ul>
            <!-- <ul v-if="listnum ==2">
              <li>项目规模<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="1" desc_sorting="2"></span></li>
              <li>预计年化<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="3" desc_sorting="4"></span></li>
              <li>投资期限<span @click="listsort($event,listnum)" class="sort_both" asc_sorting="5" desc_sorting="6"></span></li>
            </ul> -->
            <div class="listsearchC">
                <input type="text" v-model="keywords" id="keywords" maxlength="14" />
                <a class="redBtn" id="SearchBtn" @click='ProductListGet(1,listnum,"")'>
                  <span class="icon-search"></span>
                </a>
            </div>
          </div>
          <div class="newprodtList">
            <ul v-if="listnum != 2  && listnum != 5 && projectlist_sblb.length >0">
              <li v-for="(sblist,index) in projectlist_sblb" :key='index'>
                <h3 :title="sblist.title">
                  <router-link :to="'/product/PInfo?id='+sblist.id">
                    <img :src="sblist.img"/> 
                    {{sblist.title}} 
                    <span title="此标的可使用红包" v-if="sblist.is_reward == 1" class="ptitlelogo">红包</span>
                    <span title="此标的可使用加息券" v-if="sblist.is_extraRate == 1" class="ptitlelogo">加息券</span>
                    <span title="此为新手专享标" v-if="sblist.is_new == 1" class="ptitlelogo">新手</span>
                    <span title="此为私人定制" v-if="sblist.isCustomized == 1" class="ptitlelogo">私人</span>
                  </router-link>
                  <router-link  class="projectingbtn" v-if="sblist.status == 1" :to="'/product/PInfo?id='+sblist.id">立即投资</router-link>
                    <a v-if="sblist.status == 6" class="projectingbtn projectEndbtn">投资满额</a>
                    <a v-if="sblist.status == 8" class="projectingbtn projectEndbtn">正在还款</a>
                    <a v-if="sblist.status == 9" class="projectingbtn projectEndbtn">已还款</a>
                    <a v-if="sblist.status == 10" class="projectingbtn projectEndbtn">已结束</a>
                    <a v-if="sblist.status == 11" class="projectingbtn projectEndbtn">已失效</a>
                    <a v-if="sblist.status == 13" class="projectingbtn projectEndbtn">出借结束</a>
                  <router-link  class="projectingbtn" v-if="sblist.status == 15" :to="'/product/PInfo?id='+sblist.id">{{sblist.investTime}}</router-link>
                </h3>
                <div class="newprodInfo">
                  <div class="newInfoSon">
                    <label class="redtext" v-if="sblist.extra_rate == 0">{{sblist.base_rate}}<span class="fontS16">%</span></label>
                    <label class="redtext" v-if="sblist.extra_rate > 0">{{sblist.base_rate}}<span class="fontS16">%</span><span class="fontS12">+</span>{{sblist.extra_rate}}<span class="fontS16">%</span></label>
                    <p>预期年化</p>
                  </div>
                  <div class="newInfoSon">
                    <label v-if="sblist.termUnit == 1">{{sblist.term}}<span class="fontS16">个月</span></label>
                    <label v-if="sblist.termUnit == 2">{{sblist.term}}<span class="fontS16">天</span></label>
                    <p>期限</p>
                  </div>
                  <div class="newInfoSon">
                    <label>{{sblist.amount}}<span class="fontS16">元</span></label>
                    <p>剩余金额</p>
                  </div>
                  <div class="newInfoSon2">
                    <p>
                      投资进度
                      <i class="outer"><span class="inner" v-bind:style="{width : sblist.progress + '%'}"></span></i>
                      {{sblist.progress}}%
                    </p>
                    <p>
                      借款金额 
                      <label>{{sblist.money}}<span class="fontS16">元</span></label>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <ul v-if="listnum != 2  && listnum != 5 && projectlist_sblb.length ==0"><p class="nodata">暂无数据!</p></ul>
            <!-- 债权转让列表 -->
            <ul v-else-if="listnum ==2 && projectlist_zqzr.length >0">
              <li v-for="(sblist,index) in projectlist_zqzr" :key='index'>
                <h3 :title="sblist.title">
                  <router-link :to="'/product/transPInfo?id='+sblist.id+'&transfer_id='+sblist.transfer_id"><img :src="sblist.img" /> {{sblist.title}}</router-link>
                  <router-link  class="projectingbtn" v-if="sblist.transfer_status == 1" :to="'/product/transPInfo?id='+sblist.id+'&transfer_id='+sblist.transfer_id">立即承接</router-link>
                  <a v-else class="projectingbtn projectEndbtn">转让结束</a>
                </h3>
                <div class="newprodInfo">
                  <div class="newInfoSon">
                    <label class="redtext">{{sblist.base_rate}}<span class="fontS16">%</span></label>
                    <p>预期年化</p>
                  </div>
                  <div class="newInfoSon">
                    <label v-if="sblist.termUnit == 1">{{sblist.term}}<span class="fontS16">个月</span></label>
                    <label v-if="sblist.termUnit == 2">{{sblist.term}}<span class="fontS16">天</span></label>
                    <p>期限</p>
                  </div>
                  <div class="newInfoSon">
                    <label>{{sblist.self_money}}<span class="fontS16">元</span></label>
                    <p>原本金</p>
                  </div>
                  <div class="newInfoSon2">
                    <label class="zrlabel">{{sblist.transfer_money}}<span class="fontS16">元</span></label>
                    <p class="tc">转让金额</p>
                    
                    <!-- <router-link v-if="sblist.status == 1" :to="'/product/PInfo?id='+sblist.id">立即投资</router-link>
                    <a v-if="sblist.status == 6" class="projectEndbtn">投资满额</a>
                    <a v-if="sblist.status == 8" class="projectEndbtn">正在还款</a>
                    <a v-if="sblist.status == 9" class="projectEndbtn">已还款</a>
                    <a v-if="sblist.status == 10" class="projectEndbtn">已结束</a>
                    <a v-if="sblist.status == 11" class="projectEndbtn">已失效</a>
                    <a v-if="sblist.status == 13" class="projectEndbtn">出借结束</a>
                    <router-link v-if="sblist.status == 15" :to="'/product/PInfo?id='+sblist.id">{{sblist.investTime}}开抢</router-link> -->
                  </div>
                </div>
              </li>
            </ul>
            <ul v-if="listnum == 2 && projectlist_zqzr.length ==0"><p class="nodata">暂无数据!</p></ul>
            <!-- 预约抢购列表 -->
            <ul v-else-if="listnum ==5 && projectlist_yyqg.length >0">
              <li v-for="(sblist,index) in projectlist_yyqg" :key='index'>
                <h3 :title="sblist.title">
                  <router-link :to="'/product/Pinfo_order?id='+sblist.id"><img :src="sblist.img" /> {{sblist.title}}</router-link>
                  <router-link  class="projectingbtn" v-if="sblist.reserveStatus == 1" :to="'/product/Pinfo_order?id='+sblist.id">确认预约</router-link>
                  <a  v-if="sblist.reserveStatus != 1" class="projectingbtn projectEndbtn">立即预约</a>
                </h3>
                <div class="newprodInfo">
                  <div class="newInfoSon">
                    <label class="redtext">{{sblist.rate}}<span class="fontS16">%起</span></label>
                    <p>预期年化</p>
                  </div>
                  <div class="newInfoSon">
                    <label v-if="sblist.termUnit == 1">{{sblist.term}}<span class="fontS16">个月</span></label>
                    <label v-if="sblist.termUnit == 2">{{sblist.term}}<span class="fontS16">天</span></label>
                    <p>期限</p>
                  </div>
                  <div class="newInfoSon">
                    <label>{{sblist.totalNum}}<span class="fontS16">人</span></label>
                    <p>预约人数</p>
                  </div>
                  <div class="newInfoSon2">
                    <label class="zrlabel"><span class="fontS16"></span>{{sblist.money}}</label>
                    <p class="tc">预约金额</p>
                    
                    <!-- <router-link v-if="sblist.reserveStatus == 1" :to="'/product/Pinfo_order?id='+sblist.id">确认预约</router-link>
                    <a v-if="sblist.reserveStatus == 6" class="projectEndbtn">预约结束</a> -->
                    <!-- <a v-if="sblist.status == 8" class="projectEndbtn">正在还款</a>
                    <a v-if="sblist.status == 9" class="projectEndbtn">已还款</a>
                    <a v-if="sblist.status == 10" class="projectEndbtn">已结束</a>
                    <a v-if="sblist.status == 11" class="projectEndbtn">已失效</a>
                    <a v-if="sblist.status == 13" class="projectEndbtn">出借结束</a>
                    <router-link v-if="sblist.status == 15" :to="'/product/PInfo?id='+sblist.id">{{sblist.investTime}}开抢</router-link> -->
                  </div>
                </div>
              </li>
            </ul>
            <ul v-if="listnum == 5 && projectlist_yyqg.length ==0"><p class="nodata">暂无预约项目!</p></ul>
          </div>
          <div class="pages mypage clearfix">
              <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
          </div>
        </div>
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
          projectlist_yyqg: [],
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
          },
          getNum:[],
          productInfo:[],
          bidDynamicList:[]
        }
      },
      created() {
        let self = this;
        // 非父子组件通信发送
        LTJF.$emit("txt",{header:true});
        //获取统计资金
        // this.$store.state._ajax(self,'/api/product/statistics', {}, function (data) {
        //   var statistics = data.data;
        //   self.statistics = statistics;
        //   self.totalMoney = parseFloat(statistics.totalMoney);
        //   self.profit = parseFloat(statistics.profit);
        //   self.totalNum = parseInt(statistics.totalNum);
        // });
        this.ProductListGet(1, 1, '');
        // 重新获取各类标的数量
        LTJF.$emit("NumberChage",1);
        self.getNum = JSON.parse(localStorage.getNum);
        self.productInfo = JSON.parse(localStorage.getNum).productInfo;
        self.bidDynamic();
      },
      mounted:function(){
        let self = this;
        // 顶部菜单添加选中效果
        $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active");
        $(".headernav ul li").eq(1).find("a").addClass("router-link-exact-active");
        
        // 投资动态定时自动滚动
        var dynamicInterval = setInterval(function(){
          $('.dynamicC').find("ul:first").animate({
            marginTop: "-50px"
          }, 3000, function () {
            $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
          });
        },3000)
        
        // 投资动态数据定时更新
        setInterval(function(){
          self.bidDynamic();
        },300000)

        $('.dynamicC').hover(function(){
          $('.dynamicC').find("ul:first").stop();
          clearInterval(dynamicInterval);
        },function(){
          dynamicInterval = setInterval(function(){
            $('.dynamicC').find("ul:first").animate({
              marginTop: "-50px"
            }, 3000, function () {
              $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
            });
          },3000)
        })
      },
      methods: {
        bidDynamic:function(){
          let self = this;
          self.$store.state._ajax(self,'/api/product/bidDynamic', {num:10}, function (data) {
            var bidDynamic = data.data;
            for(var i = 0;i<bidDynamic.length;i++){
              bidDynamic[i].createTime = bidDynamic[i].createTime.substr(0,16);
            }
            self.bidDynamicList = bidDynamic;
          });
        },
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
          self.$store.state._ajax(self,'/api/product/index',
          {
            page: _page,
            type: _type,
            keywords:self.keywords,
            sorting: _sorting
          },
          function (data) {
            if (data.code == '1') {
              if (_type != 2 && _type != 5) {
                let projectlist_sblb = data.data.data;
                for (var i = 0; i < projectlist_sblb.length; i++) {
                  var investdate =self.$store.state.unixChange(new Date((projectlist_sblb[i].investTime).substr(0,10)));
                  var date = self.$store.state.unixChange(new Date());
                  projectlist_sblb[i].investTime =(date < investdate) ? "即将发布" : ((projectlist_sblb[i].investTime).substr(11,5)+'开抢');
                  projectlist_sblb[i].progress = Math.floor(projectlist_sblb[i].progress);
                  projectlist_sblb[i].extra_rate = Number(projectlist_sblb[i].extra_rate);
                }
                self.projectlist_sblb = projectlist_sblb;
              } else if (_type == 2) {
                self.projectlist_zqzr = data.data.data;
              } else if (_type == 5) {
                self.projectlist_yyqg = data.data.data;
              }
              
              self.listnum = _type;

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
