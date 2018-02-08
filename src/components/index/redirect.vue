<template>
  
  
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';

    export default {
        data () {
            return {
            }
        },
        mounted:function(){
        },
        created() {   
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:false});

            //正式的ret的值是测试链接的ret值的10倍
            var code = this.$store.state.getUrl(location.href).code;
            var ret = this.$store.state.getUrl(location.href).ret;
            var newret = ret < 100 ? ret : ret / 10;
            var urlRegular = 'https://www.litongjinfu.com/#';
            var urlTest = 'http://pc.litongbank.com.cn/#';
            var newurl = ret < 100 ? urlTest : urlRegular;
            // if(ret < 100){
                //测试环境
                switch (newret) {
                    case '10':
                        //开户
                        self.$router.push({path:"/"});
                        if (code == 1) { self.$router.push({path:'/account/accountOpen'}); } else { self.$router.push({path:'/account/accountOpen'}); }
                        break;
                    case '11':
                        //绑卡
                        self.$router.push({path:"/account/bankcard"});
                        break;
                    case '12':
                        //充值
                        if (code == 1) { self.$router.push({path:"/account/overview"}); } else { self.$router.push({path:'/account/recharge'}); }
                        break;
                    case '13':
                        //提现
                        if (code == 1) { self.$router.push({path:'/account/overview'}); } else { self.$router.push({path:'/account/withdrawals'}); }
                        break;
                    case '14':
                        //手动投标
                        if (code == 1) { self.$router.push({path:'/account/investlist'}); } else { self.$router.push({path:'/product'}); }
                        break;
                    case '15':
                        //债权转让
                        if (code == 1) { self.$router.push({path:'/account/investlistTransfer'}); } else { self.$router.push({path:'/product'}); }
                        break;
                    case '16':
                        //授权
                        self.$router.push({path:'/account/authorizationEntrust'});
                        break;
                    case '17':
                        //生利宝
                        self.$router.push({path:'/account/overview'});
                        break;
                    case '18':
                        //自动投标
                        self.$router.push({path:'/account/overview'});
                        break;
                    case '19':
                        //省心宝
                        self.$router.push({path:'/account/orderRecord'});
                        break;
                    default:
                        self.$router.push({path:'/'});
                        break;
                }
            // }else{
            //     //正式环境 老版本
            //     switch (newret) {
            //         case '10':
            //             //开户
            //             if (code == 1) { location.href = newurl + '/Member/Account/BaseInfo'; } else { location.href = newurl + '/Member/Account/AccountOpen'; }
            //             break;
            //         case '11':
            //             //绑卡
            //             location.href = newurl + '/Member/Capital/BankCard';
            //             break;
            //         case '12':
            //             //充值
            //             if (code == 1) { location.href = newurl + '/Member/Account/AccountOverview'; } else { location.href = newurl + '/Member/Capital/Recharge'; }
            //             break;
            //         case '13':
            //             //提现
            //             if (code == 1) { location.href = newurl + '/Member/Account/AccountOverview'; } else { location.href = newurl + '/Member/Capital/Withdraw'; }
            //             break;
            //         case '14':
            //             //手动投标
            //             if (code == 1) { location.href = newurl + '/Member/Invest/Standardinvestment'; } else { location.href = newurl + '/Project/ListP1'; }
            //             break;
            //         case '15':
            //             //债权转让
            //             if (code == 1) { location.href = newurl + '/Member/Invest/TransferInvestment'; } else { location.href = newurl + '/Project/ListP2'; }
            //             break;
            //         case '16':
            //             //授权
            //             location.href = newurl + '/Member/Capital/EntrustCarBuy';
            //             break;
            //         case '17':
            //             //生利宝
            //             location.href = newurl + '/Member/Account/AccountOverview';
            //             break;
            //         case '18':
            //             //自动投标
            //             location.href = newurl + '/Project/objectBookingDetails';
            //             break;
            //         default:
            //             location.href = newurl;
            //             break;
            //     }
            // }
            // window.location.reload();
        },
        computed:{
        },
        methods: {
        },
        components:{
  	    } 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>
