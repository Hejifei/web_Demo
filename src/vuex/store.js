    import Vue from 'vue';
    import Vuex from 'vuex';
    import $ from 'jquery';
    import VueResource from 'vue-resource';

    Vue.use(Vuex);
    Vue.use(VueResource);

    // console.log('root='+root);
    // self.$layer.alert("提示语",{},function(){window.location.reload();});
    // self.$layer.confirm("提示语",{},function(){},function(){});
    // layer.alert("提示语", {title: '操作提示',icon: 5}, function () { window.location.reload(); })//哭脸
    // layer.alert("提示语", {title: '操作提示',icon: 6}, function () { window.location.reload(); })//笑脸
    let APIURL = ''
    let ifRegular = 0;
    if (window.location.hostname.indexOf('pc.litongbank.com.cn') != '-1' || window.location.hostname.indexOf('localhost') != '-1') { //测试环境
        APIURL = 'https://t.litongjinfu.com'
        ifRegular = 0;
    } else {//正式环境
        APIURL = 'https://api.litongjinfu.com'
        ifRegular = 1;
    }
    //访问统计
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ea99b579e17565aa4a36d33ab52cb0cd";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    //ajax全局配置_url接口名称 a参数 b成功方法(code 1)  c失败方法(code other)
    const _ajax = function(that,_url, a, b, c, async) {
        // console.log(a)
        var _async = async == false ? false : true;
        if (typeof c != "function") {
            c = function (data) {
                setTimeout(function(){layer.closeAll();}, 2000);
                layer.alert(data.msg, {icon: 5}, function () { layer.closeAll(); })
            }
        }
        if (localStorage.SID == null || localStorage.SID == undefined || localStorage.SID == '') {
            getSID(that);
        }
        a.sid = localStorage.SID;
        that.$http.post(APIURL + _url,
            a,{emulateJSON:true}).then(
            function(res){
                let d =res.body;
                // console.log(d)
                //成功的处理
                if (d.code == '-1' || _url == "/api/session/check" && d.code == 0) {
                    getSID(that);
                } else if (d.code == '-3'|| _url == "/api/user/logout" && d.code == -1) {
                    setTimeout(function () { 
                        layer.closeAll();
                        getSID(that,'/login')
                        // that.$router.push({path:'/login'}); 
                    }, 2000)
                    layer.alert(d.msg, {title: '操作提示',icon: 5}, function () { 
                        layer.closeAll();
                        getSID(that,'/login')
                    })
                } else {
                    d.code == '1' ? b(d) : c(d);
                }
            },function(err){
                console.log('报错：' +err);
            }
        )
    }

    //获取地址栏参数
    const getUrl = function (url) {
        url = !url ? location.search : url;
        var temp = {};
        if (url.indexOf("?") != -1) {
            var params = url.substr(url.indexOf("?") + 1).split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i].split("=");
                temp[param[0]] = param[1];
            }
            return temp;
        } else {
            return false;
        }
    }

    //存cookie
    const setCookie =function(c_name, value) {
        var expiredays = 1;
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=litongjinfu.com";
    }

    //是否为空
    const ifnull = function (val) {
        if (val == "" || val == null) {
            return "无";
        } else {
            return val;
        }
    }


    //Ajax提交增、改操作
    ///FormId-表单Id，BtnId-提交按钮Id,Url-接口地址，Success-成功回调函数，Fail-失败回调函数,Ifrightshow--是否显示√
    ///类名 required--必填,int--正整数,password--密码（6-20位数字字母）,plus--正数,phone--手机号
    const AjaxSumbit = function (that,successhref, Url, Success, Fail, Ifrightshow, FormId, BtnId) {
        var Form = FormId ? $(FormId) : $("#AjaxForm");
        var Btn = BtnId ? $(BtnId) : $("#SubmitBtn");
        var ifrightshow = Ifrightshow ? Ifrightshow : false;
        Url = APIURL+ Url;
        Form.find(".required").blur(function () {
            var Tip = $(this).parents(".form-group").find(".tip");
            if ($(this).val() == "") {
                if (ifrightshow == true) {
                    Tip.removeClass("oklogo");
                }
                Tip.text("不能为空！");
            } else {
                Tip.text("");
                if (ifrightshow == true) {
                    Tip.addClass("oklogo");
                }
            }
        })
        Form.find(".radio").blur(function () {
            var Tip = $(this).parents(".form-group").find(".tip");
            if ($("input[name='" + $(this).attr("name") + "']:checked").val() == undefined) {
                if (ifrightshow == true) {
                    Tip.removeClass("oklogo");
                }
                Tip.text("请选择！");
            } else {
                Tip.text("");
                if (ifrightshow == true) {
                    Tip.addClass("oklogo");
                }
            }
        })
        //agreement 合同协议的勾选
        Form.find(".agreement").blur(function () {
            var Tip = $(this).parents(".form-group").find(".tip");
            if ($(this).prop("checked") == false) {
                //Tip.text($(this).attr("cname") + "不能为空！");
                Tip.text("不能为空！");
                layer.alert("您还没有勾选合同协议！", {title: '操作提示',icon: 5}, function () { layer.closeAll();})
            } else {
                Tip.text("");
            }
        })
        Form.find(".int").blur(function () {
            var Tip = $(this).next(".tip");
            if ($(this).val() != "") {
                var reg = /^[0-9]*$/;
                if (!reg.test($(this).val())) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("应是非负数！");
                } else {
                    Tip.text("");
                    if (ifrightshow == true) {
                        Tip.addClass("oklogo");
                    }
                }
            } else if (!$(this).hasClass("required")) {
                Tip.text("");
            }
        })
        Form.find(".password").blur(function () {
            var Tip = $(this).next(".tip");
            if ($(this).val() != "") {
                var reg = /^[0-9a-zA-Z]{6,20}$/;
                if (!reg.test($(this).val())) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("应是6-20位数字、字母组合！");
                } else {
                    Tip.text("");
                    if (ifrightshow == true) {
                        Tip.addClass("oklogo");
                    }
                }
            } else if (!$(this).hasClass("required")) {
                Tip.text("");
            }
        })
        Form.find(".newpasswordrept").blur(function () {
            var Tip = $(this).next(".tip");
            if ($(this).val() != "") {
                var reg = $(".newpassword").val();
                if ($(this).val() != reg) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("两次输入的密码不同！");
                } else {
                    Tip.text("");
                    if (ifrightshow == true) {
                        Tip.addClass("oklogo");
                    }
                }
            } else if (!$(this).hasClass("required")) {
                Tip.text("");
            }
        })
        Form.find(".phone").blur(function () {
            var Tip = $(this).next(".tip");
            if ($(this).val() != "") {
                var reg = /^[1][0-9]{10}$/;
                if (!reg.test($(this).val())) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("手机号格式错误！");
                } else {
                    Tip.text("");
                    if (ifrightshow == true) {
                        Tip.addClass("oklogo");
                    }
                }
            } else if (!$(this).hasClass("required")) {
                Tip.text("");
            }
        })
        Form.find(".idcard").blur(function () {
            var Tip = $(this).next(".tip");
            if ($(this).val() != "") {
                var pId = $(this).val();
                var arrVerifyCode = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
                var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

                if (pId.length != 15 && pId.length != 18) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("身份证号格式错误！");
                };

                var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19" + pId.slice(6, 16);

                if (!/^\d+$/.test(Ai)) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("身份证号格式错误！");
                };

                var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai.slice(12, 14);

                var d = new Date(yyyy, mm, dd), now = new Date();
                var year = d.getFullYear(), mon = d.getMonth(), day = d.getDate();

                if (year != yyyy || mon != mm || day != dd || d > now || year < 1940) {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("身份证号格式错误！");
                };

                for (var i = 0, ret = 0; i < 17; i++) ret += Ai.charAt(i) * Wi[i];
                Ai += arrVerifyCode[ret %= 11];

                return pId.length == 18 && pId != Ai ? function () {
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("身份证号格式错误！");
                } : function () {
                    Tip.text("");
                    if (ifrightshow == true) {
                        Tip.addClass("oklogo");
                    }
                };
            } else if (!$(this).hasClass("required")) {
                Tip.text("");
            }
        })
        Form.find(".money").blur(function () {
            var Tip = $(this).next(".tip");
            if ($(this).val() != "") {
                var reg = /^[0-9]+(.[0-9]{2})?$/;
                if (!reg.test($(this).val())) {
                    //Tip.text($(this).attr("cname") + "格式错误！");
                    if (ifrightshow == true) {
                        Tip.removeClass("oklogo");
                    }
                    Tip.text("金额精确到2位小数！");
                } else {
                    Tip.text("");
                    if (ifrightshow == true) {
                        Tip.addClass("oklogo");
                    }
                }
            } else if (!$(this).hasClass("required")) {
                Tip.text("");
            }
        })
        Btn.click(function () {
            Form.find("input").blur();
            Form.find("textarea").blur();
            var flag = true;
            Form.find(".tip").each(function () {
                if ($(this).text() != "" && !$(this).is(":hidden")) {
                    flag = false;
                }
            })
            Form.find(".agreement").each(function () {
                if ($(this).prop("checked") == false) {
                    flag = false;
                }
            })
            if (flag) {
                flag = false;
                Btn.prop("disabled", true);
                Success = typeof (Success) == "function" ? Success : function (j) { 
                    layer.alert(j.msg, {title: '操作提示',icon: 6}, function () { that.$router.push({path:successhref});layer.closeAll(); })
                };
                Fail = typeof (Fail) == "function" ? Fail : function (j) { 
                    setTimeout(function(){layer.closeAll();}, 4000);
                    layer.alert(j.msg,{title: '操作提示',icon: 5},function(){layer.closeAll();});
                };
                var formData = new FormData();
                Form.find(".form-submit").each(function () {
                    if ($(this).attr("type") == "file") {
                        formData.append($(this).attr("name"), $(this)[0].files[0]);
                    } else {
                        formData.append($(this).attr("name"), $(this).val());
                    }
                })
                //遍历界面的radio
                var radiolist = [];
                Form.find(".radio").each(function () {
                    if (radiolist.indexOf($(this).attr("name")) == -1) {
                        radiolist.push($(this).attr("name"))
                        formData.append($(this).attr("name"), $("input[name='" + $(this).attr("name") + "']:checked").val());
                    }
                })
                if (localStorage.SID == '' || localStorage.SID == undefined) {
                    getSID();
                }
                formData.append("sid", localStorage.SID);
                that.$http.post(Url,
                    formData,{emulateJSON:true}).then(
                    function(res){
                        let data =res.body;
                        Btn.prop("disabled", true);
                        var j = (data);
                        // console.log(data)
                        if (j.code == 1) {
                            Success(j);
                        } else if (j.code == '-1') {
                            setTimeout(function(){self.$router.push({path:"/login"});layer.closeAll();}, 2000);
                            layer.alert("请重新登录!",{title: '操作提示',icon: 5},function(){self.$router.push({path:"/login"});layer.closeAll();});
                        } else {
                            Fail(j);
                        }
                    },function(err){
                        console.log('报错：' +err);
                    }
                )
            }
            
        })
        $(".required").bind("keyup", function (event) {
            if (event.keyCode == '13') {
                Btn.click();
            }
        })
    }

    //获取sid
    const getSID =function(that,newhref) {
        that.$http.post(APIURL + '/api/session/create',
        {client: 'webpc',from:400, version:'20171227'},{emulateJSON:true}).then(
            function(res){
                let d =res.body;
                if (d.code == '1') {
                    localStorage.SID = d.data.sid;
                    setCookie('sid', d.data.sid);
                    // 获取好sid后，如果有新链接，跳转到新链接，否则刷新界面
                    if(newhref){
                        that.$router.push({path:newhref});
                    }else{
                        window.location.reload();
                    }
                }
            },function(err){
                console.log(err)
            }
        )
    }

    //验证是否登陆
    const checklogin =function(that) {
        if (localStorage.uid == null || localStorage.uid == '') {
            localStorage.url = that.$route.path;
            that.$router.push({path:'/login'});
        }
    }

    //点击链接前验证是否登录
    const logincheckhref =function(_href,that) {
        if (localStorage.uid == null || localStorage.uid == '') {
            localStorage.url = _href;
            that.$router.push({path:'/login'});
        } else {
            that.$router.push({path:_href})
        }
    }

    var countdown = 60;
    const settime =function() {
        if (countdown == 0) {
            $("#getSmsVerify").html("获取验证码");
            $("#getSmsVerify").removeClass("graybtn");
            countdown = 60;
            return;
        } else {
            $("#getSmsVerify").html(countdown + "s后重新获取");
            $("#getSmsVerify").addClass("graybtn");
            countdown--;
        }
        setTimeout(function () {
            settime();
        }, 1000);
    }
    //Unix时间戳转换
    const unixChange=function(_str){
        if(_str != ''){
            var date = new Date(_str);
            var time1 = date.getTime(); 
            return time1/1000;
        }else{
            return '';
        }
    }

    //签到日期插件
    var calUtil = {
        //当前日历显示的年份
        showYear:2015,
        //当前日历显示的月份
        showMonth:1,
        //当前日历显示的天数
        showDays:1,
        eventName:"load",
        //初始化日历
        init: function (signList) {
        var s=''
        calUtil.setMonthAndDay();
        if (typeof(s) == 'undefined'){
        }else{
            signList.splice('','',s);
        }
        calUtil.draw(signList);
        calUtil.bindEnvent(signList);
        },
        draw:function(signList){
        //绑定日历
        //alert(signList.length);
        //console.log(signList);
        if(signList.length > 21){
            //alert(21);
            $("#sign_note").empty();
            $("#sign_note").html('<button class="sign_contener" type="button"><i class="fa fa-calendar-check-o" aria-hidden="true"></i>&nbsp;已达标，获取1次抽奖</button>');
        }
        var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,signList);
        $("#calendar").html(str);
            //绑定日历表头
            $('head').append("<style>.sign_equal:after{ content:'" + calUtil.showMonth + "'  !important;}</style>");
        var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";
        $(".calendar_month_span").html(calendarName);  
        },
        //绑定事件
        bindEnvent:function(signList){
        // //绑定上个月事件
        // $(".calendar_month_prev").click(function(){
        //   //ajax获取日历json数据
        //   //var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];
        //   calUtil.eventName="prev";
        //   calUtil.init(signList);
        // });
        // //绑定下个月事件
        // $(".calendar_month_next").click(function(){
        //   //ajax获取日历json数据
        //   //var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];
        //   calUtil.eventName="next";
        //   calUtil.init(signList);
        // });
        
        //$(".calendar_record").click(function(){
        //  //ajax获取日历json数据
        //  //alert(typeof(signList)+"yxy");
        //	//var signList=[{"signDay":"10"},{"signDay":"11"},{"signDay":"12"},{"signDay":"13"}];
        //	//var tmp = {"signDay":$(this).html()};
        //  //if (typeof(signList) == 'undefined'){
        //    //不做处理
        //  //}else{
        //  //  signList.splice('','',tmp);
        //  //  console.log(signList);
        //  //  calUtil.init(signList);
        // // }
        // //alert($(this).html());
        //var tmp = {"signDay":$(this).html()};
        //calUtil.init(signList,tmp);
        
            
            
        //});
        },
        //获取当前选择的年月
        setMonthAndDay:function(){
        switch(calUtil.eventName)
        {
            case "load":
            var current = new Date();
            calUtil.showYear=current.getFullYear();
            calUtil.showMonth=current.getMonth() + 1;
            break;
            case "prev":
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            calUtil.showMonth=parseInt(nowMonth)-1;
            if(calUtil.showMonth==0)
            {
                calUtil.showMonth=12;
                calUtil.showYear-=1;
            }
            break;
            case "next":
            var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
            calUtil.showMonth=parseInt(nowMonth)+1;
            if(calUtil.showMonth==13)
            {
                calUtil.showMonth=1;
                calUtil.showYear+=1;
            }
            break;
        }
        },
        getDaysInmonth : function(iMonth, iYear){
        var dPrevDate = new Date(iYear, iMonth, 0);
        return dPrevDate.getDate();
        },
        bulidCal : function(iYear, iMonth) {
        var aMonth = new Array();
        aMonth[0] = new Array(7);
        aMonth[1] = new Array(7);
        aMonth[2] = new Array(7);
        aMonth[3] = new Array(7);
        aMonth[4] = new Array(7);
        aMonth[5] = new Array(7);
        aMonth[6] = new Array(7);
        var dCalDate = new Date(iYear, iMonth - 1, 1);
        var iDayOfFirst = dCalDate.getDay();
        var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
        var iVarDate = 1;
        var d, w;
        aMonth[0][0] = "日";
        aMonth[0][1] = "一";
        aMonth[0][2] = "二";
        aMonth[0][3] = "三";
        aMonth[0][4] = "四";
        aMonth[0][5] = "五";
        aMonth[0][6] = "六";
        for (d = iDayOfFirst; d < 7; d++) {
        aMonth[1][d] = iVarDate;
        iVarDate++;
        }
        for (w = 2; w < 7; w++) {
        for (d = 0; d < 7; d++) {
        if (iVarDate <= iDaysInMonth) {
            aMonth[w][d] = iVarDate;
            iVarDate++;
        }
        }
        }
        return aMonth;
        },
        ifHasSigned : function(signList,day){
        var signed = false;
        $.each(signList,function(index,item){
        if(item.signDay == day) {
        signed = true;
        return false;
        }
        });
        return signed ;
        },
        drawCal : function(iYear, iMonth ,signList) {
        var myMonth = calUtil.bulidCal(iYear, iMonth);
        var htmls = new Array();
        htmls.push("<div class='sign_main' id='sign_layer'>");
        htmls.push("<div class='sign_succ_calendar_title'>");
        //htmls.push("<div class='calendar_month_next'>下月</div>");
        //htmls.push("<div class='calendar_month_prev'>上月</div>");
        htmls.push("<div class='calendar_month_span'></div>");
        htmls.push("</div>");
        htmls.push("<div class='sign_equal' id='sign_cal'>");
        htmls.push("<div class='sign_row'>");
        htmls.push("<div class='th_1 bold'>" + myMonth[0][0] + "</div>");
        htmls.push("<div class='th_2 bold'>" + myMonth[0][1] + "</div>");
        htmls.push("<div class='th_3 bold'>" + myMonth[0][2] + "</div>");
        htmls.push("<div class='th_4 bold'>" + myMonth[0][3] + "</div>");
        htmls.push("<div class='th_5 bold'>" + myMonth[0][4] + "</div>");
        htmls.push("<div class='th_6 bold'>" + myMonth[0][5] + "</div>");
        htmls.push("<div class='th_7 bold'>" + myMonth[0][6] + "</div>");
        htmls.push("</div>");
        var d, w;
        for (w = 1; w < 6; w++) {
        htmls.push("<div class='sign_row'>");
        for (d = 0; d < 7; d++) {
    
        var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
        //console.log("001:"+ifHasSigned);
        if(ifHasSigned && typeof(myMonth[w][d]) != 'undefined'){
            htmls.push("<div class='td_"+d+" on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</div>");
        } else {
            htmls.push("<div class='td_"+d+" calendar_record'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</div>");
        }
        }
        htmls.push("</div>");
        }
        htmls.push("</div>");
        htmls.push("</div>");
        htmls.push("</div>");
        return htmls.join('');
        }
    };
    // 分页插件
    var ms = {
            init:function(obj,args){
                return (function(){
                    ms.fillHtml(obj,args);
                    ms.bindEvent(obj,args);
                })();
            },
            fillHtml:function(obj,args){
                return (function(){
                    obj.empty();
                    if(args.current > 1){
                        obj.append('<a href="javascript:;" class="prevPage lastpage"><</a>');
                    }else{
                        obj.remove('.prevPage');
                        obj.append('<span class="disabled lastpage"><</span>');
                    }
                    if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                        obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
                    }
                    if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                        obj.append('<span>...</span>');
                    }
                    var start = args.current -2,end = args.current+2;
                    if((start > 1 && args.current < 4)||args.current == 1){
                        end++;
                    }
                    if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                        start--;
                    }
                    for (;start <= end; start++) {
                        if(start <= args.pageCount && start >= 1){
                            if(start != args.current){
                                obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
                            }else{
                                obj.append('<span class="current">'+ start +'</span>');
                            }
                        }
                    }
                    if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                        obj.append('<span>...</span>');
                    }
                    if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                        obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
                    }
                    if(args.current < args.pageCount){
                        obj.append('<a href="javascript:;" class="nextPage lastpage">></a>');
                    }else{
                        obj.remove('.nextPage');
                        obj.append('<span class="disabled lastpage">></span>');
                    }
                })();
            },
            bindEvent:function(obj,args){
                return (function(){
                    obj.on("click","a.tcdNumber",function(){
                        var current = parseInt($(this).text());
                        ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
                        if(typeof(args.backFn)=="function"){
                            args.backFn(current);
                        }
                    });
                    obj.on("click","a.prevPage",function(){
                        var current = parseInt(obj.children("span.current").text());
                        ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
                        if(typeof(args.backFn)=="function"){
                            args.backFn(current-1);
                        }
                    });
                    obj.on("click","a.nextPage",function(){
                        var current = parseInt(obj.children("span.current").text());
                        ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
                        if(typeof(args.backFn)=="function"){
                            args.backFn(current+1);
                        }
                    });
                })();
            }
        }
    $.fn.createPage = function(options){
            var args = $.extend({
                pageCount : 10,
                current : 1,
                backFn : function(){}
            },options);
            ms.init(this,args);
    }
    
    //省市区插件
    $.fn.citySelect = function(settings) {
        if (this.length < 1) {
            return;
        }
        ;

        // 默认值
        settings = $.extend({
            url: "src/vuex/city.min.js",
            prov: null,
            city: null,
            dist: null,
            nodata: null,
            required: true
        }, settings);

        var box_obj = this;
        var prov_obj = box_obj.find(".prov");
        var city_obj = box_obj.find(".city");
        var dist_obj = box_obj.find(".dist");
        var prov_val = settings.prov;
        var city_val = settings.city;
        var dist_val = settings.dist;
        var select_prehtml = (settings.required) ? "" : "<option value=''>请选择</option>";
        var city_json;
        var temp_html;

        // 赋值市级函数
        var cityStart = function() {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
            }
            ;
            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || typeof (city_json.citylist[prov_id].c) == "undefined") {
                if (settings.nodata == "none") {
                    city_obj.css("display", "none");
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    city_obj.css("visibility", "hidden");
                    dist_obj.css("visibility", "hidden");
                }
                ;
                return;
            }
            ;
            
            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c, function(i, city) {
                temp_html += "<option value='" + city.n + "'>" + city.n + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
            distStart();
        };

        // 赋值地区（县）函数
        var distStart = function() {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
                city_id--;
            }
            ;
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0 || typeof (city_json.citylist[prov_id].c[city_id].a) == "undefined") {
                if (settings.nodata == "none") {
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    dist_obj.css("visibility", "hidden");
                }
                ;
                return;
            }
            ;

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c[city_id].a, function(i, dist) {
                temp_html += "<option value='" + dist.s + "'>" + dist.s + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({"display": "", "visibility": ""});
        };

        var init = function() {
            // 遍历赋值省份下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist, function(i, prov) {
                temp_html += "<option value='" + prov.p + "'>" + prov.p + "</option>";
            });
            prov_obj.html(temp_html);

            // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
            setTimeout(function() {
                if (settings.prov != null) {
                    prov_obj.val(settings.prov);
                    cityStart();
                    setTimeout(function() {
                        if (settings.city != null) {
                            city_obj.val(settings.city);
                            distStart();
                            setTimeout(function() {
                                if (settings.dist != null) {
                                    dist_obj.val(settings.dist);
                                }
                                ;
                            }, 1);
                        }
                        ;
                    }, 1);
                }
                ;
            }, 1);

            // 选择省份时发生事件
            prov_obj.bind("change", function() {
                cityStart();
            });

            // 选择市级时发生事件
            city_obj.bind("change", function() {
                distStart();
            });
        };

        // 设置省市json数据
        if (typeof (settings.url) == "string") {
            $.getJSON(settings.url, function(json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        }
        ;
    };
    //layer
    ;
    !
    function(e, t) {
        "use strict";
        var i, n, a = e.layui && layui.define,
            o = {
                getPath: function() {
                    var e = document.scripts,
                        t = e[e.length - 1],
                        i = t.src;
                    if (!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1)
                }(),
                config: {},
                end: {},
                minIndex: 0,
                minLeft: [],
                btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                type: ["dialog", "page", "iframe", "loading", "tips"]
            },
            r = {
                v: "3.0.3",
                ie: function() {
                    var t = navigator.userAgent.toLowerCase();
                    return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
                }(),
                index: e.layer && e.layer.v ? 1e5 : 0,
                path: o.getPath,
                config: function(e, t) {
                    return e = e || {}, r.cache = o.config = i.extend({}, o.config, e), r.path = o.config.path || r.path, "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && r.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : r.link("skin/" + e.extend), this) : this
                },
                link: function(t, n, a) {
                    if (r.path) {
                        var o = i("head")[0],
                            s = document.createElement("link");
                        "string" == typeof n && (a = n);
                        var l = (a || t).replace(/\.|\//g, ""),
                            f = "layuicss-" + l,
                            c = 0;
                        s.rel = "stylesheet", s.href = r.path + t, s.id = f, i("#" + f)[0] || o.appendChild(s), "function" == typeof n && !
                        function u() {
                            return ++c > 80 ? e.console && console.error("layer.css: Invalid") : void(1989 === parseInt(i("#" + f).css("width")) ? n() : setTimeout(u, 100))
                        }()
                    }
                },
                ready: function(e) {
                    var t = "skinlayercss",
                        i = "303";
                    return a ? layui.addcss("static/layer/modules/layer/default/layer.css?v=" + r.v + i, e, t) : r.link("../../static/layer/skin/default/layer.css?v=" + r.v + i, e, t), this
                },
                alert: function(e, t, n) {
                    var a = "function" == typeof t;
                    return a && (n = t), r.open(i.extend({
                        content: e,
                        yes: n
                    }, a ? {} : t))
                },
                confirm: function(e, t, n, a) {
                    var s = "function" == typeof t;
                    return s && (a = n, n = t), r.open(i.extend({
                        content: e,
                        btn: o.btn,
                        yes: n,
                        btn2: a
                    }, s ? {} : t))
                },
                msg: function(e, n, a) {
                    var s = "function" == typeof n,
                        f = o.config.skin,
                        c = (f ? f + " " + f + "-msg" : "") || "layui-layer-msg",
                        u = l.anim.length - 1;
                    return s && (a = n), r.open(i.extend({
                        content: e,
                        time: 3e3,
                        shade: !1,
                        skin: c,
                        title: !1,
                        closeBtn: !1,
                        btn: !1,
                        resize: !1,
                        end: a
                    }, s && !o.config.skin ? {
                        skin: c + " layui-layer-hui",
                        anim: u
                    } : function() {
                        return n = n || {}, (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), n
                    }()))
                },
                load: function(e, t) {
                    return r.open(i.extend({
                        type: 3,
                        icon: e || 0,
                        resize: !1,
                        shade: .01
                    }, t))
                },
                tips: function(e, t, n) {
                    return r.open(i.extend({
                        type: 4,
                        content: [e, t],
                        closeBtn: !1,
                        time: 3e3,
                        shade: !1,
                        resize: !1,
                        fixed: !1,
                        maxWidth: 210
                    }, n))
                }
            },
            s = function(e) {
                var t = this;
                t.index = ++r.index, t.config = i.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function() {
                    t.creat()
                }, 30)
            };
        s.pt = s.prototype;
        var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
        l.anim = ["layer-anim", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], s.pt.config = {
            type: 0,
            shade: .3,
            fixed: !0,
            move: l[1],
            title: "&#x4FE1;&#x606F;",
            offset: "auto",
            area: "auto",
            closeBtn: 1,
            time: 0,
            zIndex: 19891014,
            maxWidth: 360,
            anim: 0,
            isOutAnim: !0,
            icon: -1,
            moveType: 1,
            resize: !0,
            scrollbar: !0,
            tips: 2
        }, s.pt.vessel = function(e, t) {
            var n = this,
                a = n.index,
                r = n.config,
                s = r.zIndex + a,
                f = "object" == typeof r.title,
                c = r.maxmin && (1 === r.type || 2 === r.type),
                u = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";
            return r.zIndex = s, t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; background-color:" + (r.shade[1] || "#000") + "; opacity:" + (r.shade[0] || r.shade) + "; filter:alpha(opacity=" + (100 * r.shade[0] || 100 * r.shade) + ");") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : u) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' +
            function() {
                var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
                return r.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'), e
            }() + "</span>" + (r.btn ?
            function() {
                var e = "";
                "string" == typeof r.btn && (r.btn = [r.btn]);
                for (var t = 0, i = r.btn.length; t < i; t++) e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>";
                return '<div class="' + l[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
            }() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], u, i('<div class="layui-layer-move"></div>')), n
        }, s.pt.creat = function() {
            var e = this,
                t = e.config,
                a = e.index,
                s = t.content,
                f = "object" == typeof s,
                c = i("body");
            if (!t.id || !i("#" + t.id)[0]) {
                switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == r.ie && (t.fixed = !1), t.type) {
                case 0:
                    t.btn = "btn" in t ? t.btn : o.btn[0], r.closeAll("dialog");
                    break;
                case 2:
                    var s = t.content = f ? t.content : [t.content, "auto"];
                    t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                    break;
                case 3:
                    delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, r.closeAll("loading");
                    break;
                case 4:
                    f || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', delete t.title, t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0], t.tipsMore || r.closeAll("tips")
                }
                e.vessel(f, function(n, r, u) {
                    c.append(n[0]), f ?
                    function() {
                        2 == t.type || 4 == t.type ?
                        function() {
                            i("body").append(n[1])
                        }() : function() {
                            s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + l[0] + a).find("." + l[5]).before(r))
                        }()
                    }() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(o.moveElem = u), e.layero = i("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a)
                }).auto(a), 2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", s[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function() {
                    e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips()
                }), t.time <= 0 || setTimeout(function() {
                    r.close(e.index)
                }, t.time), e.move().callback(), l.anim[t.anim] && e.layero.addClass(l.anim[t.anim]), t.isOutAnim && e.layero.data("isOutAnim", !0)
            }
        }, s.pt.auto = function(e) {
            function t(e) {
                e = s.find(e), e.height(f[1] - c - u - 2 * (0 | parseFloat(e.css("padding-top"))))
            }
            var a = this,
                o = a.config,
                s = i("#" + l[0] + e);
            "" === o.area[0] && o.maxWidth > 0 && (r.ie && r.ie < 8 && o.btn && s.width(s.innerWidth()), s.outerWidth() > o.maxWidth && s.width(o.maxWidth));
            var f = [s.innerWidth(), s.innerHeight()],
                c = s.find(l[1]).outerHeight() || 0,
                u = s.find("." + l[6]).outerHeight() || 0;
            switch (o.type) {
            case 2:
                t("iframe");
                break;
            default:
                "" === o.area[1] ? o.fixed && f[1] >= n.height() && (f[1] = n.height(), t("." + l[5])) : t("." + l[5])
            }
            return a
        }, s.pt.offset = function() {
            var e = this,
                t = e.config,
                i = e.layero,
                a = [i.outerWidth(), i.outerHeight()],
                o = "object" == typeof t.offset;
            e.offsetTop = (n.height() - a[1]) / 2, e.offsetLeft = (n.width() - a[0]) / 2, o ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), e.offsetLeft = i.css("left")), i.css({
                top: e.offsetTop,
                left: e.offsetLeft
            })
        }, s.pt.tips = function() {
            var e = this,
                t = e.config,
                a = e.layero,
                o = [a.outerWidth(), a.outerHeight()],
                r = i(t.follow);
            r[0] || (r = i("body"));
            var s = {
                width: r.outerWidth(),
                height: r.outerHeight(),
                top: r.offset().top,
                left: r.offset().left
            },
                f = a.find(".layui-layer-TipsG"),
                c = t.tips[0];
            t.tips[1] || f.remove(), s.autoLeft = function() {
                s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0], f.css({
                    right: 12,
                    left: "auto"
                })) : s.tipLeft = s.left
            }, s.where = [function() {
                s.autoLeft(), s.tipTop = s.top - o[1] - 10, f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
            }, function() {
                s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
            }, function() {
                s.autoLeft(), s.tipTop = s.top + s.height + 10, f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
            }, function() {
                s.tipLeft = s.left - o[0] - 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
            }], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](), a.find("." + l[5]).css({
                "background-color": t.tips[1],
                "padding-right": t.closeBtn ? "30px" : ""
            }), a.css({
                left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
                top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
            })
        }, s.pt.move = function() {
            var e = this,
                t = e.config,
                a = i(document),
                s = e.layero,
                l = s.find(t.move),
                f = s.find(".layui-layer-resize"),
                c = {};
            return t.move && l.css("cursor", "move"), l.on("mousedown", function(e) {
                e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], o.moveElem.css("cursor", "move").show())
            }), f.on("mousedown", function(e) {
                e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], o.moveElem.css("cursor", "se-resize").show()
            }), a.on("mousemove", function(i) {
                if (c.moveStart) {
                    var a = i.clientX - c.offset[0],
                        o = i.clientY - c.offset[1],
                        l = "fixed" === s.css("position");
                    if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
                        var f = n.width() - s.outerWidth() + c.stX,
                            u = n.height() - s.outerHeight() + c.stY;
                        a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u)
                    }
                    s.css({
                        left: a,
                        top: o
                    })
                }
                if (t.resize && c.resizeStart) {
                    var a = i.clientX - c.offset[0],
                        o = i.clientY - c.offset[1];
                    i.preventDefault(), r.style(e.index, {
                        width: c.area[0] + a,
                        height: c.area[1] + o
                    }), c.isResize = !0, t.resizing && t.resizing(s)
                }
            }).on("mouseup", function(e) {
                c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(s)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide())
            }), e
        }, s.pt.callback = function() {
            function e() {
                var e = a.cancel && a.cancel(t.index, n);
                e === !1 || r.close(t.index)
            }
            var t = this,
                n = t.layero,
                a = t.config;
            t.openLayer(), a.success && (2 == a.type ? n.find("iframe").on("load", function() {
                a.success(n, t.index)
            }) : a.success(n, t.index)), 6 == r.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function() {
                var e = i(this).index();
                if (0 === e) a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index);
                else {
                    var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
                    o === !1 || r.close(t.index)
                }
            }), n.find("." + l[7]).on("click", e), a.shadeClose && i("#layui-layer-shade" + t.index).on("click", function() {
                r.close(t.index)
            }), n.find(".layui-layer-min").on("click", function() {
                var e = a.min && a.min(n);
                e === !1 || r.min(t.index, a)
            }), n.find(".layui-layer-max").on("click", function() {
                i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function() {
                    a.full && a.full(n)
                }, 100))
            }), a.end && (o.end[t.index] = a.end)
        }, o.reselect = function() {
            i.each(i("select"), function(e, t) {
                var n = i(this);
                n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null
            })
        }, s.pt.IE6 = function(e) {
            i("select").each(function(e, t) {
                var n = i(this);
                n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
                    layer: "1"
                }).hide(), n = null
            })
        }, s.pt.openLayer = function() {
            var e = this;
            r.zIndex = e.config.zIndex, r.setTop = function(e) {
                var t = function() {
                        r.zIndex++, e.css("z-index", r.zIndex + 1)
                    };
                return r.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), r.zIndex
            }
        }, o.record = function(e) {
            var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
            e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
                area: t
            })
        }, o.rescollbar = function(e) {
            l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"))
        }, e.layer = r, r.getChildFrame = function(e, t) {
            return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e)
        }, r.getFrameIndex = function(e) {
            return i("#" + e).parents("." + l[4]).attr("times")
        }, r.iframeAuto = function(e) {
            if (e) {
                var t = r.getChildFrame("html", e).outerHeight(),
                    n = i("#" + l[0] + e),
                    a = n.find(l[1]).outerHeight() || 0,
                    o = n.find("." + l[6]).outerHeight() || 0;
                n.css({
                    height: t + a + o
                }), n.find("iframe").css({
                    height: t
                })
            }
        }, r.iframeSrc = function(e, t) {
            i("#" + l[0] + e).find("iframe").attr("src", t)
        }, r.style = function(e, t, n) {
            var a = i("#" + l[0] + e),
                r = a.find(".layui-layer-content"),
                s = a.attr("type"),
                f = a.find(l[1]).outerHeight() || 0,
                c = a.find("." + l[6]).outerHeight() || 0;
            a.attr("minLeft");
            s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(), s === o.type[2] ? a.find("iframe").css({
                height: parseFloat(t.height) - f - c
            }) : r.css({
                height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
            }))
        }, r.min = function(e, t) {
            var a = i("#" + l[0] + e),
                s = a.find(l[1]).outerHeight() || 0,
                f = a.attr("minLeft") || 181 * o.minIndex + "px",
                c = a.css("position");
            o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), r.style(e, {
                width: 180,
                height: s,
                left: f,
                top: n.height() - s,
                position: "fixed",
                overflow: "hidden"
            }, !0), a.find(".layui-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f)
        }, r.restore = function(e) {
            var t = i("#" + l[0] + e),
                n = t.attr("area").split(",");
            t.attr("type");
            r.style(e, {
                width: parseFloat(n[0]),
                height: parseFloat(n[1]),
                top: parseFloat(n[2]),
                left: parseFloat(n[3]),
                position: t.attr("position"),
                overflow: "visible"
            }, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e)
        }, r.full = function(e) {
            var t, a = i("#" + l[0] + e);
            o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function() {
                var t = "fixed" === a.css("position");
                r.style(e, {
                    top: t ? 0 : n.scrollTop(),
                    left: t ? 0 : n.scrollLeft(),
                    width: n.width(),
                    height: n.height()
                }, !0), a.find(".layui-layer-min").hide()
            }, 100)
        }, r.title = function(e, t) {
            var n = i("#" + l[0] + (t || r.index)).find(l[1]);
            n.html(e)
        }, r.close = function(e) {
            var t = i("#" + l[0] + e),
                n = t.attr("type"),
                a = "layer-anim-close";
            if (t[0]) {
                var s = "layui-layer-wrap",
                    f = function() {
                        if (n === o.type[1] && "object" === t.attr("conType")) {
                            t.children(":not(." + l[5] + ")").remove();
                            for (var a = t.find("." + s), r = 0; r < 2; r++) a.unwrap();
                            a.css("display", a.data("display")).removeClass(s)
                        } else {
                            if (n === o.type[2]) try {
                                var f = i("#" + l[4] + e)[0];
                                f.contentWindow.document.write(""), f.contentWindow.close(), t.find("." + l[5])[0].removeChild(f)
                            } catch (c) {}
                            t[0].innerHTML = "", t.remove()
                        }
                        "function" == typeof o.end[e] && o.end[e](), delete o.end[e]
                    };
                t.data("isOutAnim") && t.addClass(a), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 6 == r.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))), r.ie && r.ie < 10 || !t.data("isOutAnim") ? f() : setTimeout(function() {
                    f()
                }, 200)
            }
        }, r.closeAll = function(e) {
            i.each(i("." + l[0]), function() {
                var t = i(this),
                    n = e ? t.attr("type") === e : 1;
                n && r.close(t.attr("times")), n = null
            })
        };
        var f = r.cache || {},
            c = function(e) {
                return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
            };
        r.prompt = function(e, t) {
            var a = "";
            if (e = e || {}, "function" == typeof e && (t = e), e.area) {
                var o = e.area;
                a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area
            }
            var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function() {
                    return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">'
                }(),
                f = e.success;
            return delete e.success, r.open(i.extend({
                type: 1,
                btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                content: l,
                skin: "layui-layer-prompt" + c("prompt"),
                maxWidth: n.width(),
                success: function(e) {
                    s = e.find(".layui-layer-input"), s.focus(), "function" == typeof f && f(e)
                },
                resize: !1,
                yes: function(i) {
                    var n = s.val();
                    "" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
                        tips: 1
                    }) : t && t(n, i, s)
                }
            }, e))
        }, r.tab = function(e) {
            e = e || {};
            var t = e.tab || {},
                n = e.success;
            return delete e.success, r.open(i.extend({
                type: 1,
                skin: "layui-layer-tab" + c("tab"),
                resize: !1,
                title: function() {
                    var e = t.length,
                        i = 1,
                        n = "";
                    if (e > 0) for (n = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; i < e; i++) n += "<span>" + t[i].title + "</span>";
                    return n
                }(),
                content: '<ul class="layui-layer-tabmain">' +
                function() {
                    var e = t.length,
                        i = 1,
                        n = "";
                    if (e > 0) for (n = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; i < e; i++) n += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
                    return n
                }() + "</ul>",
                success: function(t) {
                    var a = t.find(".layui-layer-title").children(),
                        o = t.find(".layui-layer-tabmain").children();
                    a.on("mousedown", function(t) {
                        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                        var n = i(this),
                            a = n.index();
                        n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"), o.eq(a).show().siblings().hide(), "function" == typeof e.change && e.change(a)
                    }), "function" == typeof n && n(t)
                }
            }, e))
        }, r.photos = function(t, n, a) {
            function o(e, t, i) {
                var n = new Image;
                return n.src = e, n.complete ? t(n) : (n.onload = function() {
                    n.onload = null, t(n)
                }, void(n.onerror = function(e) {
                    n.onerror = null, i(e)
                }))
            }
            var s = {};
            if (t = t || {}, t.photos) {
                var l = t.photos.constructor === Object,
                    f = l ? t.photos : {},
                    u = f.data || [],
                    d = f.start || 0;
                s.imgIndex = (0 | d) + 1, t.img = t.img || "img";
                var y = t.success;
                if (delete t.success, l) {
                    if (0 === u.length) return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
                } else {
                    var p = i(t.photos),
                        h = function() {
                            u = [], p.find(t.img).each(function(e) {
                                var t = i(this);
                                t.attr("layer-index", e), u.push({
                                    alt: t.attr("alt"),
                                    pid: t.attr("layer-pid"),
                                    src: t.attr("layer-src") || t.attr("src"),
                                    thumb: t.attr("src")
                                })
                            })
                        };
                    if (h(), 0 === u.length) return;
                    if (n || p.on("click", t.img, function() {
                        var e = i(this),
                            n = e.attr("layer-index");
                        r.photos(i.extend(t, {
                            photos: {
                                start: n,
                                data: u,
                                tab: t.tab
                            },
                            full: t.full
                        }), !0), h()
                    }), !n) return
                }
                s.imgprev = function(e) {
                    s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = u.length), s.tabimg(e)
                }, s.imgnext = function(e, t) {
                    s.imgIndex++, s.imgIndex > u.length && (s.imgIndex = 1, t) || s.tabimg(e)
                }, s.keyup = function(e) {
                    if (!s.end) {
                        var t = e.keyCode;
                        e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index)
                    }
                }, s.tabimg = function(e) {
                    if (!(u.length <= 1)) return f.start = s.imgIndex - 1, r.close(s.index), r.photos(t, !0, e)
                }, s.event = function() {
                    s.bigimg.hover(function() {
                        s.imgsee.show()
                    }, function() {
                        s.imgsee.hide()
                    }), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
                        e.preventDefault(), s.imgprev()
                    }), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
                        e.preventDefault(), s.imgnext()
                    }), i(document).on("keyup", s.keyup)
                }, s.loadi = r.load(1, {
                    shade: !("shade" in t) && .9,
                    scrollbar: !1
                }), o(u[d].src, function(n) {
                    r.close(s.loadi), s.index = r.open(i.extend({
                        type: 1,
                        id: "layui-layer-photos",
                        area: function() {
                            var a = [n.width, n.height],
                                o = [i(e).width() - 100, i(e).height() - 100];
                            if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
                                var r = [a[0] / o[0], a[1] / o[1]];
                                r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1])
                            }
                            return [a[0] + "px", a[1] + "px"]
                        }(),
                        title: !1,
                        shade: .9,
                        shadeClose: !0,
                        closeBtn: !1,
                        move: ".layui-layer-phimg img",
                        moveType: 1,
                        scrollbar: !1,
                        moveOut: !0,
                        isOutAnim: !1,
                        skin: "layui-layer-photos" + c("photos"),
                        content: '<div class="layui-layer-phimg"><img src="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '"><div class="layui-layer-imgsee">' + (u.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + "/" + u.length + "</em></span></div></div></div>",
                        success: function(e, i) {
                            s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), s.event(e), t.tab && t.tab(u[d], e), "function" == typeof y && y(e)
                        },
                        end: function() {
                            s.end = !0, i(document).off("keyup", s.keyup)
                        }
                    }, t))
                }, function() {
                    r.close(s.loadi), r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                        time: 3e4,
                        btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                        yes: function() {
                            u.length > 1 && s.imgnext(!0, !0)
                        }
                    })
                })
            }
        }, o.run = function(t) {
            i = t, n = i(e), l.html = i("html"), r.open = function(e) {
                var t = new s(e);
                return t.index
            }
        }, e.layui && layui.define ? (r.ready(), layui.define("jquery", function(t) {
            r.path = layui.cache.dir, o.run(layui.jquery), e.layer = r, t("layer", r)
        })) : "function" == typeof define && define.amd ? define(["jquery"], function() {
            return o.run(e.jQuery), r
        }) : function() {
            o.run(e.jQuery), r.ready()
        }()
    }(window);

    var wave = function(){
        var wavecanvas = document.getElementById('waveC');
        var wave = wavecanvas.getContext('2d');
        var ch = wavecanvas.height/3*2;
        var lines = ["#72b6fa","#61a4f4"];
        var step = 0;
       
        window.requestAnimFrame = (function(){
            return window.requestAnimationFrame  ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
        })();
        loop();
        function loop(){
            wave.clearRect(0,0,wavecanvas.width,wavecanvas.height);
            step++;
       
            for(var j = lines.length - 1; j >= 0; j--) {
         
                var angle = (step+j*45)*Math.PI/180;
                var deltaHeight = Math.sin(angle) * 50;
                var deltaHeightRight = Math.cos(angle) * 50;
                wave.beginPath();
                wave.fillStyle = lines[j];
                wave.moveTo(0, ch+deltaHeight);
                wave.bezierCurveTo(wavecanvas.width /2, 
                    ch+deltaHeight-50, 
                    wavecanvas.width / 2,
                    ch+deltaHeightRight-50, 
                    wavecanvas.width, 
                    ch+deltaHeightRight);
                wave.lineTo(wavecanvas.width, wavecanvas.height);
                wave.lineTo(0, wavecanvas.height);
                wave.lineTo(0, ch+deltaHeight);
                wave.closePath();
                wave.fill();
            }
            requestAnimFrame(loop);
        }
    }

    export default new Vuex.Store({
            state:{
                APIURL:APIURL,
                ifRegular:ifRegular,
                _ajax:_ajax,
                getUrl:getUrl,
                setCookie:setCookie,
                ifnull:ifnull,
                AjaxSumbit:AjaxSumbit,
                getSID:getSID,
                checklogin:checklogin,
                logincheckhref:logincheckhref,
                countdown:countdown,
                settime:settime,
                calUtil:calUtil,
                createPage:$.fn.createPage,
                citySelect:$.fn.citySelect,
                layer:layer,
                unixChange:unixChange,
                wave:wave
            },
            mutations:{
                sayhello(state,num){
                    // console.log(num)
                }
            }
    });
