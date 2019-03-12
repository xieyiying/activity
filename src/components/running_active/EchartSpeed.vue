<template>
<div>
<div id="EchartSpeed" style="">
  
</div>
</div>
</template>
<style scoped>
#EchartSpeed{
width:100%;
height:220px;
margin: auto;
}
</style>
<script>
var echarts = require('echarts');
export default {
    name: 'EchartSpeed',
    props:['speed_number','duration_m'],
    watch:{
        speed_number(v){        
            var temp_m=this.duration_m;
            var tm=this.speed_number;
            var m=[];
            var em=2;   
            var step_detail=[];
            if(temp_m>=60){
                em=20;
            }else if(temp_m >= 100){
                em=15;
            }else if(temp_m >= 160){
                em=50;
            }else if(temp_m >=26&&temp_m<60){
                em=10;
            }else{
                em=3;
            };

            for(var i=0;i<=temp_m;i+=em){
                m.push(Math.floor(i));                       
            }
            for(var i=0;i<tm.length;i++){
                if(i==0){
                    step_detail.push(tm[i]/em);
                }else{
                    step_detail.push((tm[i]-tm[i-1])/em);
                }
            }; 
            draw_line(this.speed_number,m);
        },
    },
    data() {
        return {        
        }
    },

    mounted() {
        this.drawLine();     
    },  
    methods: {
        drawLine(){  
        }
    }
}

function draw_line(params,m) {
    let myChart = echarts.init(document.getElementById('EchartSpeed'));
      // 绘制图表
      myChart.setOption({
        x: 'center',
        tooltip: {
            //  trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#2dc9d7',
                    width: 2,
                    type: 'solid'
                },
            }
        },
        height:150,
        grid:{
           x:40,
           y:22,
           x2:20,
           y2:22
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: m,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#AAAAAA'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            splitLine:{
                show: true,
                color : '#fbfbfb',
                lineStyle: {  
                    color: ['#e4e4e4'],
                    width: 1,
                    type: 'dotted'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#AAAAAA'
                }
             }
        }],
         lineStyle: {
            color: '#2dc9d7',
            width: 2,
            type: 'solid'
         },
        series: [{
            name: '步频',
            type: 'line',
            data: params,
            symbol: 'none',
            smooth: true,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(92, 211, 222, 0.86)'
                    }, {
                        offset: 1,
                        color: 'rgba(131, 223, 231, 0.2)'
                    }])
                }
            },
        }]
      });   
}

</script>
    