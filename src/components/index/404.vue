<template>
    <div class="index_centerC" style="min-height:100vh;">
        <div class="index_center page404">
            <div class="img404"></div>
            <h3>出错啦!</h3>
            <p>找不到你访问的页面</p>
            <router-link class="redBtn" to="/">返回首页</router-link>
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
        mounted:function(){
        },
        created() {   
            var self = this;
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:false});
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
