<template>
    <div class="overview">
        <div class="graph">授权待收</div>
        <div class="awardListC">
            <ul class="clearfix">
                <li @click="Select(1, 1)" class="awardList_active"><a>未授权</a></li>
                <li @click="Select(2, 1)"><a>已授权</a></li>
            </ul>
        </div>
        <div class="chgenew"></div>
        <div class="streamTypeC row">
            <label class="introlab">授权：</label>
            <a v-if='arrayList.length != 0' class="redBtn" @click="moneyBackSel" style="position:relative;top:18px;">选定项授权</a>
            <!-- @*<a class="redBtn fr">全部授权</a>*@ -->
        </div>
        <div class="chge"></div>
        <div class="commissionDetailC">
            <table class="table table-bg table-striped">
                <thead>
                    <tr>
                        <th v-if="state ==1" class="chkText">选择</th>
                        <th>项目名称</th>
                        <th>金额(元)</th>
                        <th>授权书</th>
                        <th>是否同意</th>
                        <th>是否审核</th>
                    </tr>
                </thead>
                <tbody v-if='arrayList.length != 0'>
                    <tr v-for="(array,index) in arrayList" :key="index">
                        <td v-if="state ==1"><input class="Checkbox px subCheckbox" type="checkbox" name="subCheckbox" :value="array.P_ID" /></td>
                        <td><router-link :to="'/product/PInfo?id='+array.P_ID" class="c-000">{{array.title}}</router-link></td>
                        <td>{{array.money}}</td>
                        <td><span class="f-main"><a :href="xieyi9" target="_blank" style="color:#d1aa67;">查看</a></span></td>
                        <td v-if="array.state == 0"><span class="f-main">待授权</span></td>
                        <td v-else><span class="f-main">已授权</span></td>
                        <td v-if="array.complete == 1"><span class="f-main">已审核</span></td>
                        <td v-else><span class="f-main">待审核</span></td>
                    </tr>
                </tbody>
                <tbody v-if='arrayList.length == 0'>
                    <tr><td colspan="7">暂无数据！</td></tr>
                </tbody>
            </table>
            <div class="letterwebFooter">
                <div class="fenyeC">
                    <div class="pages mypage clearfix">
                        <div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>
                    </div>
                </div>
            </div>
            <form id="AjaxForm" action="" method="POST" >
                <input type="hidden" name="sid" v-model="sid" />
                <input type="hidden" name="id" v-model="id" />
                <input type="hidden" name="respType" id="respType" value="html" />
                <input class="moneyinput form-submit" type="hidden" name="ret" id="ret" v-model="ret" />
            </form>
        </div>
    
    </div>
</template>

<script>
  export default {
    data () {
      return {
        arrayList: [],
        state: '',
        sid: '',
        id:'',
        ret:'',
        xieyi9:''
      }
    },
    mounted:function(){
        var self = this;
        self.sid = localStorage.SID

        //复选框单选
        $(".content-rowlist table").delegate(".subCheckbox", "click", function () {
            if ($(this).prop("checked", true)) {
                $(this).prop("checked", false)
            } else {
                $(".subCheckbox").prop("checked", false);
                $(this).prop("checked", true)
            }
        })

        //已选菜单切换
        $(".awardListC ul li").click(function () {
            $(".awardList_active").removeClass("awardList_active");
            $(this).addClass("awardList_active");
        })

        self.$store.state._ajax(self,'/api/open/contract', {respType : 'json',contractType : 9}, function (data) {self.xieyi9=data.data;},'');// 9 车贷授权书
        self.Select(1, 1);
    },
    methods: {
        Select:function(_state, _page) {
            var self = this;
            self.$store.state._ajax(self,'/api/loan/findAuth',
                {
                    state: _state,
                    page: _page
                },
            function (data) {
                var applylist = data.data.data;
                if (applylist.length == 0) {
                    //分页的重置
                    $(".mypage").html("");
                } else {
                    for (var i = 0; i < applylist.length; i++) {
                        applylist[i].repaymentTime = applylist[i].repaymentTime.substr(0, 10);
                    }

                    //分页的重置
                    $(".mypage").html("");
                    $(".mypage").html('<div class="tcdPageCode" id="TcdPageCode" Totalpage=""></div>')
                    $(".tcdPageCode").createPage({
                        pageCount: data.data.last_page,
                        current: parseInt(data.data.current_page),
                        backFn: function (p) {
                            Select(_state, p);
                        }
                    });
                }
                self.arrayList = applylist;
                self.state = _state;
            }, '');
        },
        moneyBackSel:function() {
            var self = this;
            var idlist = $('.subCheckbox').map(function () {
                if ($(this).prop('checked')) {
                    return $(this).attr("value");
                }
            }).get().join(',');
            self.ret = self.$store.state.ifRegular == 1 ? 160 : 16;
            self.id = idlist;
            console.log('idlist=' + idlist)
            self.$store.state._ajax(self,'/api/loan/direcTrfAuth', { id: idlist, respType: 'json', ret: self.ret }, function (data) {
                if (typeof data.data == "string") {
                            var start = data.data.indexOf('<form id="autoRedirectForm"');
                            var end = data.data.indexOf('</body>');
                            var form = data.data.substr(start, end - start);
                            $(form).appendTo('body').submit();
                        }
            }, '');
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
