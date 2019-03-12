<template>
    <div class="topay" v-show="!iconshow">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <img src="../total_img/waitloading.gif" alt="" v-show="iconshow" class="wait"> 
        <div class="topay_top">
            <div class="topay_name">{{match_name}}</div>
            <div class="topay_time">
                <img src="../total_img/5.png" class="topay_img">
                <span class="topay_text">{{total}}</span>
            </div>
            <div class="topay_time">
                <img src="../total_img/3.png" class="topay_img">
                <span class="topay_text">比赛时间：{{match_time}}</span>
                <span class="topay_fee" @click="rechoose">重新选择</span>
            </div>
        </div>
        <ul>
            <li v-for="(item,index) in columnList" :key="index">
                <div class="topay_top_detail" style="margin-top:30px">
                    <div class="topay_info_left">
                        <div class="topay_info_style">姓名</div>
                        <div class="topay_info_style">手机号码</div>
                        <div class="topay_info_style">{{item.cardType}}</div>
                    </div>
                    <div class="topay_info_right">
                        <div class="topay_info_style">{{item.name}}</div>
                        <div class="topay_info_style">{{item.mobileNum}}</div>
                        <div class="topay_info_style">{{item.cardId|acNumber}}</div>
                    </div>
                </div> 
            </li>
        </ul>
        <div class="topay_style">
            <div class="topay_fee_detail">
                <div>{{total}}￥{{fee}}</div>
                <div class="enroll_number">x{{columnList.length}}</div>
            </div>
            <div class="topay_fee_detail" style="border:0">
                <div>报名费：</div>
                <div>{{total_fee}}元</div>
            </div>
        </div> 
         <div class="topay_style">
            <div class="topay_fee_detail">
                <div>支付方式</div>
            </div>
            <div class="fee_detail_weix" style="border:0"  @click="weixinPay">                
                <img src="../total_img/12.png" alt="" class="weixinpay">
                <div style="margin-left:10px">微信支付</div>
                <img src="../total_img/6.png" alt="" class="checkimg" v-if="value==1">
               <img src="../total_img/7.png" alt="" class="checkimg" v-else>
               <!-- <label class="radio"><input type="radio" value='1'/></label>  -->
            </div>
             <div class="fee_detail_weix" style="border:0" @click="aliPay">                
                <img src="../total_img/ffbc37b6794924d3e6d39a4b4b58265a.jpg" alt="" class="weixinpay">
                <div style="margin-left:10px">支付宝支付</div>
               <img src="../total_img/6.png" alt="" class="checkimg" v-if="value==2"> 
                <img src="../total_img/7.png" alt="" class="checkimg" v-else> 
            </div>
        </div>
        <div>
            <button class="select_button" @click="gopay">前往支付</button>
        </div>    
    </div>
</template>
<style scoped>
@import './topay.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'topay',
         filters: {
            acNumber(v){
                return v.length>18 ? v.substr(0,18)+'...' : v;
            },
        },
        data(){
            return{
                match_name:"",
                match_time:"",
                total:"",
                fee:"",
                value:0,
                columnList:[],
                url:this.global.storage.url  ,
                total_fee:"",
                iconshow:true      
            }
        },
       created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '报名缴费';    
        },
        mounted(){  
            this.gettoinfo();
        },
        methods:{ 
            lastPage(){
                window.history.back(-1); 
            },
            weixinPay(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) != 'micromessenger'){                         
                    alert('未匹配到微信浏览器，请使用支付宝支付');
                }else{        
                    this.value=1;      
                } 
            },
            aliPay(){   
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){                         
                    alert('使用支付宝支付请打开浏览器');
                }else{                   
                    this.value=2;
                } 
            },
            // paopaopay(){
            //     this.value=2;
            // },
            rechoose(){
                  this.$router.push({ path: '/Registration', query: {
                    entryId:this.global.storage.entryId,
                    eventTime:this.match_time,
                    eventType:this.total,
                    // fee:info.fee,
                    title:this.match_name,
                    }});
            },
            gopay(){
                if(this.value==0){
                    alert("请选择支付方式");
                }else{
                    var _this=this;  
                    var outTradeNo= _this.global.storage.outTradeNo;              
                    var params;
                    params={'mobile':_this.global.storage.mobile}; 
                    params.sessionid =_this.global.storage.sessionid;
                    params.outTradeNo = outTradeNo;   
                    var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                    $.ajax({
                        type:'POST', 
                        url:_this.url+"/app/mls/order/checkOrderNew",
                        dataType:'JSON',
                        data:request,
                        success:function(data){                          
                            _this.$router.push({ path: '/statuspay',query: {id:data.code,outTradeNo:outTradeNo,value:_this.value}});     
                        }
                    }); 
                }
            },
            gettoinfo(){ 
                var _this=this; 
                var outTradeNo=_this.$route.query.id; 
                var params;
                params={'mobile':_this.global.storage.mobile}; 
                params.sessionid =_this.global.storage.sessionid;
                params.outTradeNo = _this.global.storage.outTradeNo;   
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");    
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/app/mls/order/getEnroll",
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                        _this.iconshow=false;                  
                        if(data.code==1){
                            _this.match_name=data.objectData.eventName;
                            _this.match_time=_this.time(data.objectData.matchStartDate);
                            _this.total=data.objectData.entry.name;
                            var list = data.objectData.list;
                            _this.fee = data.objectData.entry.fee;
                            _this.total_fee=(_this.fee *list.length).toFixed(2);
                            var eventName= data.objectData.entry.name;
                            _this.columnList=list;    
                        }  
                    }
                }); 
            },
            time(time){
                var date_number=new Date(time);
                var year =date_number.getFullYear();
                var month = date_number.getMonth() + 1; 
                month=month<=9?"0"+month:month;
                var day =date_number.getDate();
                day=day<=9?"0"+day:day;
                return year+'-'+month+'-'+day;
            },      
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