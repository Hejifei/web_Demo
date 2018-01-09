<template>
    <div class="hello">
        <div class="pf_newOutC">
            <div class="pf_newBody">
                <div class="pf_dataC">
                    <h1><img src="../../common/stylus/img/platformdata_ptsj.png"/>平台数据</h1>
                    <ul>
                        <li><i-count-up
                                    :start="0"
                                    :end="totalMoney"
                                    :decimals="2"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up><label>累计交易总额（元）</label></li>
                        <li><i-count-up
                                    :start="0"
                                    :end="profit"
                                    :decimals="2"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up><label>累计为用户赚取收益（元）</label></li>
                        <li><i-count-up
                                    :start="0"
                                    :end="platformTime"
                                    :decimals="0"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up><label>平台安全运营（天）</label></li>
                        <li><i-count-up
                                    :start="0"
                                    :end="totalUser"
                                    :decimals="0"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up><label>累计用户（位）</label></li>
                        <li><span>100</span><label>累计交易笔数</label></li>
                        <li><span>100</span><label>借贷余额（万元）</label></li>
                        <li><span>100</span><label>借贷剩余笔数</label></li>
                        <li><span>100</span><label>预期笔数</label></li>
                    </ul>
                </div>
                <div class="pf_dataC">
                    <h1><img src="../../common/stylus/img/platformdata_ydjyze.png"/>月度交易总额</h1>
                    <div class="echarts_ydjyze" id="echarts_ydjyze"></div>
                </div>
                <div class="pf_dataC">
                    <h1><img src="../../common/stylus/img/platformdata_tzsj.png"/>投资数据</h1>
                    <div class="echarts_3">
                        <div class="echarts_son" id="echarts_newcplx"></div>
                        <div class="echarts_son" id="echarts_newbdqx"></div>
                        <div class="echarts_son" id="echarts_newtzrnlbl"></div>
                    </div>
                </div>
                <div class="pf_dataC">
                    <div class="echarts_3">
                        <div class="echarts_son" id="echarts_newtzrxb"></div>
                        <div class="echarts_son" id="echarts_newyhzd"></div>
                        <div class="echarts_son">
                            <h3>单笔投资分布</h3>
                            <div class="PTimeDistriC">
                                <div v-for="(singleBidson,index) in singleBid" :key="index" class="ptdprocessLine"><p>{{singleBidson.name}}</p><div class="ptdProcessC"><i class="ptdProcess" :title="singleBidson.name+'：'+singleBidson.value+'单'" :style="{width:+singleBidson.percent+'%'}"></i></div><span>{{singleBidson.percent}}%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pf_dataC">
                    <h1>
                        <img src="../../common/stylus/img/platformdata_jyxx.png"/>经营信息
                    </h1>
                    <ul>
                        <li><span>100</span><label>累计出借人数</label></li>
                        <li><span>100</span><label>累计借款人数</label></li>
                        <li><span>100</span><label>当期累计出借人数</label></li>
                        <li><span>100</span><label>当期累计借款人数</label></li>
                        <li><span>100</span><label>前十大借款人待还金额占比</label></li>
                        <li><span>100</span><label>最大单一借款人待还金额占比</label></li>
                        <li><span>100</span><label>关联关系借款金额（元）</label></li>
                        <li><span>100</span><label>关联关系借款笔数</label></li>
                        <li><span>100</span><label>逾期金额（元）</label></li>
                        <li><span>100</span><label>逾期笔数</label></li>
                        <li><span>100</span><label>逾期90天（不含）以上金额（元）</label></li>
                        <li><span>100</span><label>逾期90天（不含）以上笔数</label></li>
                        <li><span>100</span><label>累计代偿金额</label></li>
                        <li><span>100</span><label>累计代偿笔数</label></li>
                        <li><p>...</p></li>
                    </ul>
                </div>
                <div class="pf_dataC">
                    <h1>
                        <img src="../../common/stylus/img/platformdata_fygl.png"/>收费标准
                        <a>借款客户</a>
                        <a>投资客户</a>
                        <a class="activea">全体客户</a>
                    </h1>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from '../../../static/js/echarts.common.min.js'
    import LTJF from '../../common/js/ltjf.js';
    import ICountUp from 'vue-countup-v2';

    export default {
        data () {
            return {
                statistics:[],
                platformdata:[],
                term:[],
                singleBid:[],
                platformTime:0,
                totalUser:0,
                totalMoney:0,
                profit:0,
                options: {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: ''
                }
            }
        },
        created(){
            // 非父子组件通信发送
            LTJF.$emit("txt",{header:true});
            var self = this;
            this.$store.state._ajax(self,'/api/statistics/platformdata', {}, function (data) {
                let statistics = data.data.totalData;
                statistics.totalMoney = parseInt(statistics.totalMoney);
                statistics.profit = parseInt(statistics.profit);
                self.statistics = statistics;
                self.platformdata = data.data;
                self.term=data.data.bidData.term;

                self.platformTime = parseFloat(statistics.platformTime);
                self.totalUser = parseFloat(statistics.totalUser);
                self.totalMoney = parseFloat(statistics.totalMoney);
                self.profit = parseFloat(statistics.profit);

                var singleBid = data.data.bidData.singleBid;
                var singleBidTotal = 0;
                for(let i = 0;i<singleBid.length;i++){
                    singleBidTotal += parseInt(singleBid[i].value);
                }
                for(let j = 0;j<singleBid.length;j++){
                    singleBid[j].percent = parseFloat(100*(parseInt(singleBid[j].value))/singleBidTotal).toFixed(1);
                }
                self.singleBid = singleBid;

                //月度交易总额折线图
                var ydjqze_xAxis=[];
                var ydjqze_series=[];
                for(var i= 0;i<self.platformdata.transaction.length;i++){
                    ydjqze_xAxis.push(self.platformdata.transaction[i].date);
                    ydjqze_series.push(parseFloat(self.platformdata.transaction[i].money /10000).toFixed(2));
                }
                var echarts_ydjyze = echarts.init(document.getElementById('echarts_ydjyze'));
                var optionTecharts_ydjyze = {
                    title: {
                        show: true,
                        text: '每月交易额',
                        x: 'center',
                        y: '360px',
                        textStyle: {
                            //文字颜色
                            color: '#646464',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily: 'sans-serif',
                            //字体大小
                            fontSize: 12
                        }
                    },
                    grid: {  
                        left: '2%',  
                        right: '5%',
                        bottom: '15%',
                        top: '10%',
                        containLabel: true  
                    },
                    tooltip: {},
                    legend: {
                        data: ['单位:万元']
                    },
                    xAxis: {
                        data:ydjqze_xAxis,
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        name: '交易额',
                        type: 'line',
                        //设置柱体颜色  
                        itemStyle:{  
                            normal: {
                                color: '#498aeb',
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#fb5a5c',
                                        fontSize: 12
                                    },
                                    formatter: function (val){
                                        return val.data + "万元"
                                    }
                                }
                            }
                        },
                        barWidth: 60,//柱图宽度
                        data: ydjqze_series

                    }]
                };
                echarts_ydjyze.setOption(optionTecharts_ydjyze);

                //投资人性别比例
                self.pieChart("echarts_newtzrxb", '#fff',
                    {
                        text: "投资人性别比例",
                        subtext: "", x: "center", y: 'center',
                        textStyle: {
                            //文字颜色
                            color: '#323232',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily: 'sans-serif',
                            //字体大小
                            fontSize: 18
                        }
                    },
                    { show: true, data: ['女性','男性'], orient: 'vertical', x: 'center', y: '310px' },
                    {
                        name: '投资人性别比例',
                        type: 'pie',
                        radius: ['50%', '60%'],
                        center: ['50%', '50%'],
                        color: ["#fb5a5c", "#498aeb"],
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        data: [
                            { value: self.platformdata.bidProportion.sex.女, name: '女性'},
                            { value: self.platformdata.bidProportion.sex.男, name: '男性'}
                        ],
                        itemStyle: {
                            normal:{
                                label: {
                                    show: false,
                                    position: 'inner',
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'normal',
                                        color: '#ffffff'
                                    }
                                },
                                labelLine: { show: false },
                            },
                            
                        }
                    })

                var yeardatalist=[];
                var yearlabellist=[];
                $.each(self.platformdata.bidProportion.year,function(name,value){
                    yearlabellist.push(name);
                    yeardatalist.push({value: value, name: name});
                    // yearlabellist.pusth(name);
                })
                //投资人年龄比例
                self.pieChart("echarts_newtzrnlbl", '#fff',
                    {
                        text: "投资人年龄比例",
                        subtext: "", x: "center", y: 'center',
                        textStyle: {
                            //文字颜色
                            color: '#323232',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily: 'sans-serif',
                            //字体大小
                            fontSize: 18
                        }
                    },
                    { show: true, data: yearlabellist, orient: 'vertical', x: 'center', y: '310px' },
                    {
                        name: "各类订单数及所占比重",
                        type: "pie",
                        radius: ['50%', '60%'],
                        center: ["50%", "50%"],
                        color: ["#498bec", "#27dcb6", "#ffeb01", "#fb5a5c"],
                        selectedMode: 'single',
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'normal',
                                        color: '#969696'
                                    }
                                },
                                labelLine: { show: false },

                            }
                        },
                        data: yeardatalist
                })
                //用户终端分布
                self.pieChart("echarts_newyhzd", '#fff',
                    {
                        text: "用户终端分布",
                        subtext: "", x: "center", y: 'center',
                        textStyle: {
                            //文字颜色
                            color: '#323232',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily: 'sans-serif',
                            //字体大小
                            fontSize: 18
                        }
                    },
                    { show: true, data: [self.platformdata.bidData.terminal[1].name, self.platformdata.bidData.terminal[0].name], orient: 'vertical', x: 'center', y: '310px' },
                    {
                        name: "用户终端分布",
                        type: "pie",
                        radius: ['50%', '60%'],
                        center: ["50%", "50%"],
                        color: ["#fb5a5c", "#498aeb"],
                        selectedMode: 'single',
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'normal',
                                        color: '#969696'
                                    }
                                },
                                labelLine: { show: false },

                            }
                        },
                        data: [
                            { value: self.platformdata.bidData.terminal[1].value, name: self.platformdata.bidData.terminal[1].name},
                            { value: self.platformdata.bidData.terminal[0].value, name: self.platformdata.bidData.terminal[0].name}
                        ]
                    })
                //产品类型分布
                self.pieChart("echarts_newcplx", '#fff',
                    {
                        text: "产品类型分布",
                        subtext: "", x: "center", y: 'center',
                        textStyle:{
                            //文字颜色
                            color: '#323232',
                            //字体风格,'normal','italic','oblique'
                            fontStyle:'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily:'sans-serif',
                            //字体大小
                            fontSize:18
                        }
                    },
                    { show: true, data: [self.platformdata.bidData.productType[0].name, self.platformdata.bidData.productType[1].name], orient: 'horizontal', x: 'center',y:'310px' },
                    {
                        name: "各类订单数及所占比重",
                        type: "pie",
                        radius: ['50%', '60%'],
                        center: ["50%", "50%"],
                        color: ["#498aeb", "#fb5a5c","#27dcb6" ],
                        selectedMode: 'single',
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'normal',
                                        color: '#969696'
                                    }
                                },
                                labelLine: { show: false },
                                
                            },
                        },
                        data: [
                            { value: self.platformdata.bidData.productType[0].value, name: self.platformdata.bidData.productType[0].name },
                            { value: self.platformdata.bidData.productType[1].value, name: self.platformdata.bidData.productType[1].name }
                        ]
                    })
                //标的期限分布
                var PTermlegend = [];
                var PTermseries=[];
                for(var j = 0;j<self.term.length;j++){
                    PTermlegend.push(self.term[j].name);
                    PTermseries.push({value:self.term[j].value, name:self.term[j].name})
                }
                self.pieChart("echarts_newbdqx", '#fff',
                    {
                        text: "标的期限分布",
                        subtext: "", x: "center", y: 'center',
                        textStyle:{
                            //文字颜色
                            color: '#323232',
                            //字体风格,'normal','italic','oblique'
                            fontStyle:'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily:'sans-serif',
                            //字体大小
                            fontSize:18
                        }
                    },
                    { show: true, data: PTermlegend, orient: 'horizontal', x: 'center',y:'295px' },
                    {
                        name: "标的期限分布所占比重",
                        type: "pie",
                        radius: ['50%', '60%'],
                        center: ["50%", "50%"],
                        color: ["#498aeb", "#fb5a5c","#ffa200","#00ff66","#b049eb","#32ffd1","#32b4ff","#3259ff","#a132ff","#ff32d1","#ff3267"],
                        selectedMode: 'single',
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'normal',
                                        color: '#969696'
                                    }
                                },
                                labelLine: { show: false },
                                
                            },
                        },
                        data: PTermseries
                    })
                var pfTMC_xAxis=[];
                var pfTMC_series=[];
                for(var i= 0;i<self.platformdata.transaction.length;i++){
                    pfTMC_xAxis.push(self.platformdata.transaction[i].date);
                    pfTMC_series.push(parseFloat(self.platformdata.transaction[i].money /10000).toFixed(2));
                }
            });
        },
        mounted(){
            // 顶部菜单添加选中效果
            $(".headernav ul li .router-link-exact-active").removeClass("router-link-exact-active"); 
            $(".headernav .menuson dt a").addClass("router-link-exact-active"); 
            var self = this;
        },
        methods: {
            //饼状图公用方法
            pieChart: function (echartsId, backgroundcolor, title, legend, series) {
                var dom = echarts.init(document.getElementById(echartsId));
                
                dom.setOption({
                    backgroundColor: backgroundcolor,  //背景颜色
                    title: title,
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: legend,
                    toolbox: {
                        show: false,
                    },
                    calculable: true,
                    series: [series]
                });
            }

        },
        components:{
            ICountUp
        } 
    }
</script>

<style>
    
</style>
