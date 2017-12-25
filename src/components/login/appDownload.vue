<template>
    <div style="width:100%;background:#323232">
        <div class="app">
            <p class="app-p">苏&nbsp州&nbsp本&nbsp土&nbsp互&nbsp联&nbsp网&nbsp金&nbsp融&nbsp品&nbsp牌</p>
            <ul class="app-ul">
                <li>
                    <div>
                        <img src="../../common/stylus/img/download_logo_img.png" alt="Alternate Text" />
                    </div>
                    <p>利通金服APP</p>
                    <img class="img1" src="../../common/stylus/img/download_slogan_img.png" alt="Alternate Text" />
                    <ul class="app-xp">
                        <li class="li-l">
                            <img src="../../common/stylus/img/download_ewm_img.png" alt="Alternate Text" />
                        </li>
                        <li class="li-r">
                            <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.litongjinfu.tskj.ltjfzzb" target="_blank"><img src="../../common/stylus/img/download_android_bnt.png" alt="Alternate Text" /></a> 
                            <a href="https://itunes.apple.com/cn/app/%E5%88%A9%E9%80%9A%E9%87%91%E6%9C%8D/id1275005799?mt=8" target="_blank"><img src="../../common/stylus/img/download_ios_bnt.png" alt="Alternate Text" /></a>
                        </li>                    
                    </ul>
                </li>
                <li style="width:9px;height:348px;margin:40px 0 0 80px">
                    <img  style="width:9px;height:348px" src="../../common/stylus/img/download_line_img.png" alt="Alternate Text" />
                </li>
                <li style="float:right">
                    <div>
                        <img src="../../common/stylus/img/jdownload_logo_img.png" style="border-radius:16px;" alt="Alternate Text" />
                    </div>
                    <p>利通金服<em style="color:#67a0d1">借款</em>APP</p>
                    <img class="img1" src="../../common/stylus/img/jdownload_slogan_img.png" alt="Alternate Text" />
                    <ul class="app-xp">
                        <li class="li-l">
                            <img src="../../common/stylus/img/jdownload_ewm_img.png" alt="Alternate Text" />
                        </li>
                        <li class="li-r">
                            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.litong.jiekuan" target="_blank"><img src="../../common/stylus/img/jdownload_android_btn.png" alt="Alternate Text" /></a>
                            <a href="https://itunes.apple.com/cn/app/li-tong-jin-fu-jie-kuan/id1179194198?mt=8" target="_blank"><img src="../../common/stylus/img/jdownload_ios_btn.png" alt="Alternate Text" /></a>
                        </li>                    
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import LTJF from '../../common/js/ltjf.js';

    export default {
        data () {
            return {
            }
        },
        created() {   
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            
            
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
    .app {
        width: 1000px;
        min-height: 672px;
        margin: 0 auto;
    }
    .app .app-p {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 60px;
        color: #fff;
        font-family: 微软雅黑;
        text-align: center;
        padding-top: 64px;
        margin-bottom: 88px;
    }
    .app .app-ul {
        width: 100%;
    }
    .app .app-ul li {
        float: left;
        width: 412px;
    }
    .app .app-ul li div {
        width: 120px;
        height: 120px;
        margin: 0 0 30px 138px;
    }
    .app .app-ul li div img {
        width: 120px;
        height: 120px;
    }
    .app .app-ul li p {
        font-family: 微软雅黑;
        font-size: 30px;
        color: #e8e8e8;
        margin: 0 0 32px 76px;
    }
    .app .app-ul li .img1 {
        width: 130px;
        height: 60px;
        margin: 0 0 25px 127px;
    }
    .app .app-ul li .app-xp {
        width: 100%;
        height: 125px;
        margin-bottom: 50px;
    }
    .app .app-ul li .app-xp .li-l {
        width: 125px;
        height: 125px;
        float: left;
    }
    .app .app-ul li .app-xp .li-l img {
        width: 125px;
        height: 125px;
    }
    .app .app-ul li .app-xp .li-r {
        width: 260px;
        height: 125px;
        float: left;
        margin: 10px 0 0 25px;
    }
    .app .app-ul li .app-xp .li-r a {
        float: left;
        width: 260px;
        height: 64px;
        cursor: pointer;
    }
</style>
