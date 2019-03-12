<template style="font_size:10px">
    <div class="useRecord">
        <!-- <div class="useRecordIcon">            
            <img src="../total_img/gobackIcon.png" alt="" @click="goback">
            <div class="useRecordTitle">消费记录</div>
        </div> -->
        <div style="padding-top: 10px">
            <div v-for="(item,i) in list" :key="i" class="recordInfo" v-show = "!recordShow">
                <div class="recordInfoDetail"><div style="width: 50%;text-align: left;">消费金额</div><div style="width: 50%;text-align: right;">{{item.price}}元</div></div>
                <div class="recordInfoDetail"><div style="width: 50%;text-align: left;">时间</div><div style="width: 50%;text-align: right;">{{item.createDate|acName}}</div></div>
                <div class="recordInfoDetail"><div style="width: 50%;text-align: left;">订单号</div><div style="width: 50%;text-align: right;">{{item.orderid}}</div></div>
            </div>  
            <div v-show = "recordShow" class="noRecord">
                <div>暂无消费记录</div>
                <img src="../total_img/none.png" alt="" style="width:100%">            
            </div>  
        </div>          
    </div>
</template>
<style scoped>
.useRecordIcon{
    text-align: left;
    position: relative;
    height: 40px;
    background: #fff;
}
.useRecordIcon img{
    width: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
}
.useRecordTitle{
    position: absolute;
    left: 40px;
    top: 9px;
}
.noRecord{
    top: 160px;
    position: absolute;
}
.useRecord{
    min-height: 100%;
    width: 100%;
    background: #f2f2f2;
}
.recordInfo{
    text-align: left;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
}
.recordInfoDetail{
    height: 30px;
    line-height: 30px;
    display: flex;
}
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
export default {
    name: 'useRecord',
    filters: {
        acName(v){
            return v.length>11? v.substr(0,11): v;
        },
    },
    data(){
        return{
            list:[],
            recordShow:false          
        }
    },
    beforeCreate(){
         document.getElementById('titleId').innerHTML = '消费记录';    
    },
    mounted(){  
        this.getUseRecord()
    },
    methods:{ 
        // goback(){
        //     window.history.back(-1); 
        // },
        getUseRecord(){
            var params={'couponId':this.$route.query.id};       
            var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");                 
            var _this = this;
            $.ajax({
                type:'POST', 
                url:'https://app.marathonbm.com/coupon/couponConsumeRecords',
                // url:'http://192.168.2.17:8082/coupon/couponConsumeRecords',
                // url:'http://ceshi.marathonbm.com/coupon/couponConsumeRecords',
                dataType:'JSON',
                data: request,
                success:function(data){
                    var data = data;
                    if(data.code == 1){
                        var listTemp = data.list;
                        if(listTemp.length == 0||listTemp == ""){
                            _this.recordShow = true;                          
                        }else{
                            for(var ke in listTemp){
                                _this.recordShow = false; 
                                listTemp[ke].price = (parseInt(listTemp[ke].price)*0.01).toFixed(2);
                                // listTemp[ke].redpacket = (parseInt(listTemp[ke].redpacket)*0.01).toFixed(2);
                            }
                            _this.list = listTemp;
                        }
                        // _this.getPath();
                    }else{
                        _this.recordShow = true;  
                    }                        
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
    };
    // function  strMapToObj(strMap){
    //     let obj= Object.create(null);
    //     for (let[k,v] of strMap) {
    //         obj[k] = v;
    //     }
    //     return obj;
    // };


</script>
    