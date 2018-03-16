<template>
    <div class="overview">
        <div class="newsinfo-title">
            <h2>{{messageDetail.title}}
                <a class="back" href="javascript:history.go(-1);">返回</a>
            </h2>
            <div class="newsinfo-time">发布时间：{{messageDetail.time}}</div>
        </div>
        <div class="newsinfo-intro" style="text-indent:2em ">
            {{messageDetail.content}}
        </div>    
    </div>
</template>

<script>
  export default {
    data () {
      return {
        messageDetail: []
      }
    },
    mounted:function(){
      var self = this;
      var idget = self.$store.state.getUrl(location.href).id;
        self.$store.state._ajax(self,'/api/message/detail', {
            type: 0,
            id: idget
        }, function (data) {
            self.messageDetail = data.data;
            self.messageDetail.time = (self.messageDetail.time).substr(0, 16);
        }, '');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    /* .content-rowlist {
        padding: 20px 30px;
    } */
    .m-rightmain .newsinfo-title {
        text-align: center;
    }
    .m-rightmain .newsinfo-title .back{
        float: right;
        color: #fb5a5c;
        font-size: 16px;
    }
    .m-rightmain .newsinfo-title h2 {
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        color: #333;
        margin: 0px;
        padding: 10px 0;
        border-bottom: 1px dashed #d7d7d7;
    }
    .m-rightmain .newsinfo-title .newsinfo-time {
        line-height: 18px;
        color: #969696;
        padding: 15px 0 0 0;
        text-align: right;
        font-size: 14px;
    }
    .m-rightmain .newsinfo-intro {
        text-indent: 2em;
        font-size: 14px;
        line-height: 24px;
        padding-bottom: 10px;
        margin: 15px 0;
        height: auto !important;
        height: 400px;
        min-height: 400px;
    }
</style>
