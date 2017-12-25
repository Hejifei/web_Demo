<template>
    <div class="overview">
        <div class="graph">头像上传</div>
        <div class="chge"></div>
        <div class="rechargeC EditrechargeC" id="AjaxForm">
            <div class="rechargeline form-group">
                <label class="width90label">头像图片</label>
                <input class="moneyinput required" name="massage" id="inputshow" />
                <input class="fileinput form-submit required" type="file"  name="file" id="file"/>
                <input class="fileinput form-submit required" name="type" id="type" />
                <a class="getcodebtn" id="ImgGet">图片选择</a>
                <span class="tip" style="left:630px;"></span>
            </div>
            <div class="rechargeline">
                <label></label>
                <a class="rechargeNow" id="SubmitBtn">确认提交</a>
            </div>
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
            

            //登录密码修改
            self.$store.state.AjaxSumbit(self,"/account/baseInfo", "/api/avatar/upload", function (j) {
                layer.alert(j.msg,{title: '操作提示',icon: 6},function(){
                    self.$router.push({path:"/account/baseInfo"});layer.closeAll();window.location.reload()
                });
                setTimeout(function(){
                    self.$router.push({path:"/account/baseInfo"});
                    layer.closeAll();
                    window.location.reload()
                },2000)
            }, '',true)

            $("#ImgGet").click(function () {
                $(this).siblings(":file").click();
            })
            $(":file").change(function () {
                var that = $(this);
                var file = that[0].files[0];
                if (/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG|BMP)$/.test(file.name)) {
                    var file = that[0].files[0];
                    //console.log(file.type)
                    $("#type").val(file.type);
                    $("#inputshow").val(file.name);
                    //var fileName = that[0].files[0].name;
                    //var reader = new FileReader();
                    //reader.readAsDataURL(file);
                    //reader.onload = function (e) {
                    //    //that.parent(".content-right-zoon").find("img").attr("src", "");
                    //    //that.parent(".content-right-zoon").find("img").attr("src", this.result);
                    //}
                }
                else {
                    //alert("")
                    layer.alert("请选择图片格式", {
                        title: '操作提示',icon: 5
                    })
                }
            })
        },
        methods: {
            getCode: function () {
                var self = this;
                if (self.$store.state.countdown == 60) {
                    if ($("#email").val() == "") {
                        layer.alert("邮箱账号不能为空",{title: '操作提示',icon: 5},function(){layer.closeAll();});
                    } else {
                        self.$store.state.settime();
                        self.$store.state._ajax(self,'/api/user/BindEmail',
                            {
                                type: 1,
                                email: $("#email").val()
                            }, function (j) {
                                layer.alert("验证码发送成功！",{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            }, function (j) {
                                layer.alert("验证码发送成功！",{title: '操作提示',icon: 6},function(){layer.closeAll();});
                            })
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
