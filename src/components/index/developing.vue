<template>
  <div class="index_centerC" style="min-height:100vh;">
        <div class="index_center page404">
            <div class="imgdeveloping"></div>
            <p class="developingP">我们的程序员正在挑灯夜战努力建设中......</p>
            <p class="lookingforward">尽请期待！</p>
            <router-link to="/" class="redBtn">返回首页</router-link>
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
