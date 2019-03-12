<template>
<div class="newEcharts">
<div id="Echarts" style="">
</div>
</div>
</template>
<style scoped>
#Echarts{
   width: 100%;
    height: 220px;
    margin: auto;
}
</style>
<script>
var echarts = require('echarts');
export default {
  name: 'Echarts',
  props:['altitudes_number','duration_m'],
  watch:{
      altitudes_number(v){
        var temp_m=this.duration_m;
        var m=[];
        var em=2;        
        if(temp_m>=60){
            em=10;
        }else if(temp_m >= 100){
            em=15;
        }else if(temp_m >= 160){
            em=25;
        }else if(temp_m >=26&&temp_m<60){
            em=5;
        }else{
            em=3;
        }
        for(var i=0;i<=temp_m;i+=em){
            m.push(Math.floor(i));
        }
        draw_line(this.altitudes_number,m);
      }
  },
  data() {
    return {
    }
  },
  mounted() {     
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
  }
 }
}
function draw_line(params,m){ 
 let myChart = echarts.init(document.getElementById('Echarts'))

      // 绘制图表
      myChart.setOption({
        x: 'center',
        tooltip: {
            //  trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#4a8fed',
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
        legend: {
            data: ['海拔', '米']
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
            color: '#e8b31b',
            width: 2,
            type: 'solid'
         },
        series: [{
            name: '时间/分',
            title: '海拔/米',
            type: 'line',
            data: params,
            symbol: 'none',
            smooth: true,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(235, 187, 53, 0.86)'
                    }, {
                        offset: 1,
                        color: 'rgba(246, 224, 163, 0.2)'
                    }])
                }
            },
        }]
      });
    }

</script>
    