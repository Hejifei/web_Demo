<template>
  <div id="app">
    <v-header v-if="headshow"></v-header>
    <div v-if="headshow" class="header" style="padding:0;">
      <div class="headerwp">
        <div class="fl headmenuleft">
            <router-link class="fl" to="/index">
              <img class="newlogoimg" src="./common/stylus/img/newlogo.png" />
            </router-link>
            <router-link  to="/service/bankDeposit" class="logo-r fl">
                <div class="logo-cg">银行资金存管</div>
                <!-- <div class="logo-cg-zt"></div> -->
                <img src="./common/stylus/img/yuan2.png" class="yuan2">
                <img src="./common/stylus/img/yuan3.png" class="yuan3">
                <img src="./common/stylus/img/yuan4.png" class="yuan4">
                <div class="cg-bg">
                    <img src="./common/stylus/img/cg-bg.png">
                </div>
            </router-link>
            <!-- <span class="bankmoneymanage">银行资金存管</span> -->
            <!-- <p>利/惠/苏/州/通/达/八/方/</p> -->
        </div>
        <div class="headernav">
            <ul>
                <li><router-link class="outA" to="/index">首页</router-link></li>
                <li><router-link class="outDl" to="/product">我要投资<label v-if="proNum > 0" class="pronum">{{proNum}}</label></router-link></li>
                <li><a class="outDl" @click="logincheckhref('/loan')">我要借款</a></li>
                <li class="disclosure">
                  <!-- <a>信息披露<span class="topmenuspan icon-angle-down"></span></a> -->
                  <div class="menuson clearfix">
                    <dt><a class="xiaoxia">信息披露<span class="topmenuspan icon-angle-down"></span></a></dt>
                    <ul>
                      <li><router-link to="/service/platformdata">平台数据</router-link></li>
                      <li><router-link to="/service/ranking">创富排行</router-link></li>
                      <li><router-link to="/service/FirORLasInvest">首投尾投</router-link></li>
                      <li><router-link to="/service/insurance">安全保障</router-link></li>
                      <li><router-link to="/service/bankDeposit">银行存管</router-link></li>
                      <li><router-link to="/about/aboutus">关于利通</router-link></li>
                    </ul>
                  </div>
                </li>
                <li><a class="outDl" @click="logincheckhref('/account')">我的账户</a></li>
            </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <v-footer v-if="headshow"></v-footer>
  </div>
</template>

<script>
  import LTJF from 'common/js/ltjf.js';
  import header from 'components/header/header.vue';
  import footer from 'components/footer/footer.vue';

  export default {
    name: 'app',
    data(){
        return{
          headshow:true,
          msg:'',
          proNum: 0
        }
    },
    created() {
      var self= this;
      // 非父子组件通信接收
      LTJF.$on('txt', function(msg){
        self.headshow = msg.header == false ? false : true
      })
      self.NumberGet();
      // 定时重新获取顶部出借数据条数
      setInterval(function(){
        self.NumberGet();
      },120000);

      LTJF.$on("NumberChage",function(){
            self.NumberGet();
      });
    },
    mounted:function(){
        
    },
    computed:{
      
    },
    methods:{
      NumberGet:function(_rewardType,_page){
        var self = this;
        self.$store.state._ajax(self,'/api/product/getNum', {}, function (data) {
          localStorage.getNum = JSON.stringify(data.data);
          self.proNum = parseInt(data.data.productsNum + data.data.transferNum);
        }, function(){});
      },
      logincheckhref:function(href){
        this.$store.state.logincheckhref(href,this);
      },
    },
    components:{
      'v-header':header,
      'v-footer':footer
  	}
  }

</script>

<style>
  .topmenuspan{margin-left: 5px;}
  .pronum{
        position: absolute;
        min-width: 18px;
        height: 18px;
        margin-top: -4px;
        margin-left: 2px;
        padding: 0 3px;
        color: #fff;
        font-size: 13px;
        line-height: 18px;
        text-align: center;
        background-color: #eb494b;
        border-radius: 9px;
    }
  /* .headernav ul > li{position: relative;} */
  

</style>
