<template>
    <div class="overview">
        <div class="graph">实名认证</div>
        <div class="chge"></div>
        <div class="userInfoTableC smrzed">
            <img src="../../common/stylus/0818new/smrz_yes.png" />
            <p>
                恭喜，您已通过存管账户认证！
            </p>
            <h3>
                现在，您可以根据需求进行操作：
            </h3>
            <router-link to="/product" class="redBtn" style="font-size:14px;">立即投资</router-link>
        </div>
    </div>
</template>

<script>
    
    export default {
        data () {
            return {
                
            }
        },
        mounted:function(){
            var self = this;
            
        },
        methods: {
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
