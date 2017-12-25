<template>
    <div class="loginfoot f-12" style="height:138px;width:100%;">
            <p class="f-16 plh">
            <span>
                <router-link to="/">网站首页</router-link>
                <router-link to="/about/aboutus">平台介绍</router-link>
                <router-link to="/about/newHands">新手入门</router-link>
                <router-link to="/about/helpCenter" style="border-right: 0">帮助中心</router-link>
            </span>
        </p>
        <p style="font-size:14px">版权所有 © 苏州利通金砖金融信息服务有限公司&nbsp;&nbsp;&nbsp;&nbsp;苏ICP备16020265号</p>
        <p class="text-c" style="font-size:14px">建议在IE10以上或Chrome浏览器下使用</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loginfoot p {
        color:#888888;/*字体颜色*/
    }
    .loginfoot p span a {
        border-right:1px solid;
        padding:0px 40px;
        color:#888888;/*字体颜色 超链接部分*/
    }
    .loginfoot p span #last {
        border-right:none;
    }
    .plh {
        line-height:50px;
    }
    .loginfoot {
        background:#333;/*背景颜色*/
        font-family: "\5FAE\8F6F\96C5\9ED1","Microsoft Yahei"; 
    }
</style>
