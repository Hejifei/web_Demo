<template>
    <div class="hello">
        <div class="pf_newOutC">
            <div class="pf_newBody">
                <div class="pf_dataC">
                    <h1><img src="../../common/stylus/img/platformdata_ptsj.png"/>平台数据</h1>
                </div>
            </div>
        </div>



        <div class="PF_outC">
            <div class="PFbody">
                <!-- @*数据总览*@ -->
                <div class="PFTitle">数据总览</div>
                <div class="PFzlC">
                    <div class="zlDetail">
                        <span>平台安全运营（天）</span>
                        <span class="iCountUp">
                            <i-count-up
                                    :start="0"
                                    :end="platformTime"
                                    :decimals="0"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up>
                        </span>
                    </div>
                    <div class="zlDetail">
                        <span>累计用户（人）</span>
                        <span class="iCountUp">
                            <i-count-up
                                    :start="0"
                                    :end="totalUser"
                                    :decimals="0"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up>
                        </span>
                    </div>
                    <div class="zlDetail">
                        <span>累计交易总额（元）</span>
                        <span class="iCountUp">
                            <i-count-up
                                    :start="0"
                                    :end="totalMoney"
                                    :decimals="2"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up>
                        </span>
                    </div>
                    <div class="zlDetail">
                        <span>累计为用户赚取收益（元）</span>
                        <span class="iCountUp">
                            <i-count-up
                                    :start="0"
                                    :end="profit"
                                    :decimals="2"
                                    :duration="2"
                                    :options="options"
                                ></i-count-up>
                        </span>
                    </div>
                </div>

                <!-- @*每月交易额*@ -->
                <div class="PFTitle">每月交易额</div>
                <div class="pfTMC" id="pfTMC"></div>

                <!-- @*投资数据*@ -->
                <div class="PFTitle">投资数据</div>
                <div class="pfTMC">
                    <div class="halfdiv" id="PTdistribution"></div>
                    <div class="halfdiv" id="PTermdistribution"></div>
                </div>
                <div class="pfTMC">
                    <div class="halfdiv" id="PAgedistribution"></div>
                    <div class="halfdiv" id="">
                        <h3>单笔投资分布</h3>
                        <div class="PTimeDistriC">
                            <div v-for="(singleBidson,index) in singleBid" :key="index" class="ptdprocessLine"><p>{{singleBidson.name}}</p><div class="ptdProcessC"><i class="ptdProcess" :title="singleBidson.name+'：'+singleBidson.value+'单'" :style="{width:+singleBidson.percent+'%'}"></i></div><span>{{singleBidson.percent}}%</span></div>
                        
                        </div>
                    </div>
                </div>
                <div class="pfTMC">
                    <div class="halfdiv" id="PSexdistribution"></div>
                    <div class="halfdiv" id="PFTerminaldstbtion"></div>
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
            //获取统计资金
            // this.$store.state._ajax(self,'/api/product/statistics', {}, function (data) {
            //     let statistics = data.data;
            //     statistics.totalMoney = parseInt(statistics.totalMoney);
            //     statistics.profit = parseInt(statistics.profit);
            //     self.statistics = statistics;
            // });
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

                //投资人性别比例
                self.pieChart("PSexdistribution", '#fff',
                    {
                        text: "投资人性别比例",
                        subtext: "", x: "center", y: '25px',
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
                            fontSize: 24
                        }
                    },
                    {
                        show: true, data: ["女性", "男性"], orient: 'vertical', x: '20px', y: '20px',
                    },
                    {
                        name: '投资人性别比例',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '55%'],
                        color: ["#fe7228", "#498bec"],
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        data: [
                            { value: self.platformdata.bidProportion.sex.女, name: '女性：'+self.platformdata.bidProportion.sex.女 },
                            { value: self.platformdata.bidProportion.sex.男, name: '男性：'+self.platformdata.bidProportion.sex.男 }
                        ],
                        itemStyle: {
                            normal:{
                                label: {
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

                //用户终端分布
                self.pieChart("PFTerminaldstbtion", '#fff',
                    {
                        text: "用户终端分布",
                        subtext: "", x: "center", y: '25px',
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
                            fontSize: 24
                        }
                    },
                    { show: true, data: [self.platformdata.bidData.terminal[1].name, self.platformdata.bidData.terminal[0].name], orient: 'vertical', x: '20px', y: '20px' },
                    {
                        name: "用户终端分布",
                        type: "pie",
                        radius: ['50%', '70%'],
                        center: ["50%", "55%"],
                        color: ["#fe7228", "#498bec"],
                        selectedMode: 'single',
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position :'inner',
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'normal',
                                        color: '#969696'
                                    },
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}}  {per|{d}%}  ',
                                    backgroundColor: '#def6ff',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 12,
                                            lineHeight: 33
                                        },
                                        c:{
                                            fontSize: 14,
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    },
                                    labelLine: { show: false },
                                },
                                
                            }
                        },
                        data: [
                            { value: self.platformdata.bidData.terminal[1].value, name: self.platformdata.bidData.terminal[1].name + "：" +self.platformdata.bidData.terminal[1].value+'笔'},
                            { value: self.platformdata.bidData.terminal[0].value, name: self.platformdata.bidData.terminal[0].name + "：" +self.platformdata.bidData.terminal[0].value+'笔', selected: true }
                        ]
                    })
                var yeardatalist=[];
                var yearlabellist=[];
                $.each(self.platformdata.bidProportion.year,function(name,value){
                    yearlabellist.push(name);
                    yeardatalist.push({value: value, name: name});
                    // yearlabellist.pusth(name);
                })
                //投资人年龄比例
                self.pieChart("PAgedistribution", '#fff',
                    {
                        text: "投资人年龄比例",
                        subtext: "", x: "center", y: '25px',
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
                            fontSize: 24
                        }
                    },
                    { show: true, data: yearlabellist, orient: 'vertical', x: '20px', y: '20px' },
                    {
                        name: "各类订单数及所占比重",
                        type: "pie",
                        radius: ['50%', '70%'],
                        center: ["50%", "55%"],
                        color: ["#fe7228", "#27dcb6", "#ffeb01", "#498bec"],
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
                //产品类型分布
                self.pieChart("PTdistribution", '#fff',
                    {
                        text: "产品类型分布",
                        subtext: "", x: "center", y: '25px',
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
                            fontSize:24
                        }
                    },
                    { show: true, data: [self.platformdata.bidData.productType[0].name, self.platformdata.bidData.productType[1].name], orient: 'vertical', x: '30px',y:'30px' },
                    {
                        name: "各类订单数及所占比重",
                        type: "pie",
                        radius: ['50%', '70%'],
                        center: ["50%", "55%"],
                        color: ["#fe7228", "#498bec","#27dcb6" ],
                        selectedMode: 'single',
                        hoverAnimation: false,//设置鼠标上浮的时候不变宽
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
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
                self.pieChart("PTermdistribution", '#fff',
                    {
                        text: "标的期限分布",
                        subtext: "", x: "center", y: '25px',
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
                            fontSize:24
                        }
                    },
                    { show: false, data: PTermlegend, orient: 'vertical', x: '30px',y:'30px' },
                    {
                        name: "标的期限分布所占比重",
                        type: "pie",
                        radius: ['50%', '70%'],
                        center: ["50%", "55%"],
                        color: ["#ff3232", "#ff6c32","#ffb932","#c3ff32","#32ff4f","#32ffd1","#32b4ff","#3259ff","#a132ff","#ff32d1","#ff3267"],
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
                //每月交易额柱状图
                var myChartTM = echarts.init(document.getElementById('pfTMC'));
                // 指定图表的配置项和数据
                var optionTM = {
                    title: {
                        show: true,
                        text: '每月交易额',
                        x: 'center',
                        y: '25px',
                        textStyle: {
                            //文字颜色
                            color: '#fe7228',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily: 'sans-serif',
                            //字体大小
                            fontSize: 24
                        }
                    },
                    grid: {  
                        left: '5%',  
                        right: '5%',
                        bottom: '5%',
                        top: '25%',
                        containLabel: true  
                    },
                    tooltip: {},
                    legend: {
                        data: ['单位:万元']
                    },
                    xAxis: {
                        data:pfTMC_xAxis,
                        
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        name: '交易额',
                        type: 'bar',
                        //设置柱体颜色  
                        itemStyle:{  
                            normal: {
                                color: '#fe7228',
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#fe7228',
                                        fontSize: 14
                                    },
                                    formatter: function (val){
                                        return val.data + "万元"
                                    }
                                }
                            }
                        },
                        barWidth: 60,//柱图宽度
                        data: pfTMC_series

                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChartTM.setOption(optionTM);
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
