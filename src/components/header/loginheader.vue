<template>
  <div class="hello">
      <div class="topnav" style="background:#fff;height:40px;width:100%;">
        <div class="wp clearfix">
            <div class="fl wp-ll clearfix">
                <span class="fl" style="padding:0 0;"><img src="../../common/stylus/img/index_top_tel_icon.png" /></span>
                <span class="fl" style="font-size:12px;font-family:微软雅黑">客服热线：</span>
                <span style="font-size:14px;color:#666666;font-weight:bold;font-family:微软雅黑" class="fl">400-606-1018</span>
                <router-link style="color:#eb494b;font-size:12px;font-family:微软雅黑;margin-right: 10px;margin-left: 12px;" class="fl" to="/about/helpCenter">帮助中心</router-link>
                <span class="fl" style="font-size:12px;font-family:微软雅黑">出借有风险，投资需理性</span>
            </div>
        </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
        uid: "",
        
    }
  },created() {
    let self = this;
    
  },
  methods: {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .loginC{display:-webkit-flex-box;flex-direction:column;display:-webkit-flex;width:100vw;height:100vh;min-width:1000px;min-height:768px;
            display: box;              /* OLD - Android 4.4- */
            display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
            display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
            display: -ms-flexbox;      /* TWEENER - IE 10 */
            display: -webkit-flex;     /* NEW - Chrome */
            display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
            /* 09版 */
            -webkit-box-orient: vertical;
            /* 12版 */
            -webkit-flex-direction: column;
            -moz-flex-direction: column;
            -ms-flex-direction: column;
            -o-flex-direction: column;
            flex-direction: column;
        }
    .loginbody{
        -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */  
        -moz-box-flex: 1;         /* OLD - Firefox 19- */  
        width: 20%;               /* For old syntax, otherwise collapses. */  
        -webkit-flex: 1;          /* Chrome */  
        -ms-flex: 1;              /* IE 10 */  
        flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */  
        display: box;              /* OLD - Android 4.4- */
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
        /*兼容水平居中*/
        /* 09版 */  
            -webkit-box-pack: center;  
        /* 12版 */  
        -webkit-justify-content: center;  
        -moz-justify-content: center;  
        -ms-justify-content: center;  
        -o-justify-content: center;  
        justify-content: center;  
        /* 其它取值如下： 
            align-items     主轴原点方向对齐 
            flex-end        主轴延伸方向对齐 
            space-between   等间距排列，首尾不留白 
            space-around    等间距排列，首尾留白 
        */  
        /*兼容垂直居中*/
        /* 09版 */  
        -webkit-box-align: center;  
        /* 12版 */  
        -webkit-align-items: center;  
        -moz-align-items: center;  
        -ms-align-items: center;  
        -o-align-items: center;  
        align-items: center;  
    }
</style>
