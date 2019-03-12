<template>
    <div class="Logistics">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <div class="Logistics_top">
            <div class="Logistics_company">物流公司：{{Logistics_company}}</div>
            <div class="Logistics_company">物流单号：{{Logistics_number}}</div>
        </div>
        <div class="Logistics_">
            <div v-for="(item,ke) in Logistics" :key="ke"  :class="ke == 0 ? 'Logistics_detail1' :'Logistics_detail'"> 
                <div :class="ke == 0 ? 'log_detail1' :'log_detail'">
                    <div  :class="ke == 0 ? '' :'Logistics_line'" ></div>  
                    <div class="Logistics_time">{{item.AcceptTime|acName}}</div>
                    <div class="Logistics_time">{{item.AcceptTime|time}}</div>                    
                </div>               
                <div :class="ke == 0 ? 'Logistics_location1' :'Logistics_location'">{{item.AcceptStation}}</div>
                <div clear="both" ></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import './Logistics.css';
</style>
<script>
import { upload } from '../../../router/ajaxfileupload.js';
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'Logistics',
          filters: {
            acName(v){
                return v.substr(11,5);
            },
            time(v){
                return v.substr(0,10);
            },
        },
        data(){
            return{
                url:this.global.storage.url, 
                Logistics:[],
                Logistics_company:'',
                Logistics_number:''        
            }
        },
       created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '物流详情'; 
        },
        mounted(){ 
            this.getLogistics();
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            getLogistics(){
                var _this=this;
                _this.Logistics_company=_this.$route.query.type;
                _this.Logistics_number=_this.$route.query.n;
                var n=_this.$route.query.n;
                var t=_this.$route.query.t;
                // var n='800970147570145145';
                // var t='YTO'
                var params={};
                params.n=n;
                params.t=t;            
                $.ajax({
                    type:'GET', 
                    url:'https://wdexpress.market.alicloudapi.com/gxali',
                    headers: {Authorization:"APPCODE dea50a28cbda46979e65342982a61cd7"},
                    dataType:"JSON",
                    data:params,
                    success:function(data){
                        _this.Logistics=data.Traces.reverse();
                    }
                })
            }
        }
    }
    function getSign(options, secret){
    // 处理参数加密
    var req = options;
    var t = new Date().getTime();
    req.marathonbm_time = t;
    // 参数排序，保证加密前统一
    var str = '';
    var keyArr = []
    for (var key in req) {
        if (options.hasOwnProperty(key)) {
            keyArr.push(key);
        }
    }
    keyArr.sort();
    keyArr.forEach((v) => {
    if (options[v] != null) {
        str += '' + options[v];
    }
    })
    req.marathonbm_sign = hexMD5(str + secret).substr(5, 20);
    return req;
    }
</script>