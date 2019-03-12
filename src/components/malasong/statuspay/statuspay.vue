<template>
    <div class="statuspay"> 
        <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <img src="../total_img/waitloading.gif" alt="" v-show="iconshow" class="wait"> 
        <div  v-show="!iconshow">
             <div class="status" v-if="status==0">
            <img src="../total_img/13.png" alt="" class="statusImg">
            <div class="pay_status_info">
                <div><span style="font-weight:bold">待付款</span></div>
                <div>订单号:{{payNumber}}</div>
                <div>订单金额:￥{{fee*columnList.length}}</div>
                <div>下单时间:{{payTime}}</div>
            </div>
            </div>
            <div class="status" v-else-if="status==1">
                <img src="../total_img/14.png" alt="" class="statusImg">
                <div class="pay_status_info">
                    <div style="font-weight:bold">付款超时/订单失效</div>
                    <div>订单号:{{payNumber}}</div>
                    <div>订单金额:￥{{fee*columnList.length}}</div>
                    <div>下单时间:{{payTime}}</div>
                </div>
            </div>
            <div class="status" v-else>
                <img src="../total_img/15.png" alt="" class="statusImg">
                <div class="pay_status_info">
                    <div style="font-weight:bold">恭喜您！订单付款成功</div>
                    <div>订单号:{{payNumber}}</div>
                    <div>订单金额:￥{{fee*columnList.length}}</div>
                    <div>下单时间:{{payTime}}</div>
                </div>
            </div>
            <div class="statuspay_top">
                <div class="statuspay_name">{{match_name}}</div>
                <div class="statuspay_time">
                    <img src="../total_img/5.png" class="statuspay_img">
                    <span class="statuspay_text">{{total}}</span>
                </div>
                <div class="statuspay_time">
                    <img src="../total_img/3.png" class="statuspay_img">
                    <span class="statuspay_text">比赛时间：{{match_time}}</span>
                </div>
            </div>
            <ul>
                <li v-for="(item,index) in columnList" :key="index" >
                    <div class="status_top_detail">
                        <div class="statuspay_info_left">
                            <div class="statuspay_info_style">姓名</div>
                            <div class="statuspay_info_style">手机号码</div>
                            <div class="statuspay_info_style">{{item.cardType}}</div>
                        </div>
                        <div class="statuspay_info_right">
                            <div class="statuspay_info_style">{{item.name}}</div>
                            <div class="statuspay_info_style">{{item.mobileNum}}</div>
                            <div class="statuspay_info_style">{{item.cardId|acNumber}}</div>
                        </div>
                    </div>  
                </li>
            </ul>
            <div class="pay_style">
                <div class="fee_detail">
                    <div>{{total}}￥{{fee}}</div>
                    <div class="enroll_number">x{{columnList.length}}</div>
                </div>
                <div class="fee_detail" style="border:0">
                    <div>报名费:</div>
                    <div>{{total_fee}}元</div>
                </div>
            </div> 
            <div class="pay_style">
            <div class="fee_detail">
                    <div>支付方式</div>
                </div>
                <div class="fee_detail_weix" style="border:0" v-show="value==1">                
                    <img src="../total_img/12.png" alt="" class="weixinpay">
                    <div style="margin-left:10px">微信支付</div>
                    <img src="../total_img/6.png" alt="" class="checkimg" v-if="value==1">
                <img src="../total_img/7.png" alt="" class="checkimg" v-else>
                </div>
                <div class="fee_detail_weix" style="border:0" v-show="value==2" id="alipay">                
                    <img src="../total_img/ffbc37b6794924d3e6d39a4b4b58265a.jpg" alt="" class="weixinpay">
                    <div style="margin-left:10px">支付宝支付</div>
                <img src="../total_img/6.png" alt="" class="checkimg" v-if="value==2"> 
                    <img src="../total_img/7.png" alt="" class="checkimg" v-else> 
                </div>
            </div>
            <div>
                <button class="select_button" v-if="status==0" @click="ensurePay" v-show="ensureShow">确认付款</button>
                <button class="select_button" v-else-if="status==1" @click="register">重新报名</button>
                <button class="select_button" v-else @click="down">完成</button>
                <button class="select_button" style="background:#999999" v-show="!ensureShow">确认付款</button>
                <div v-html="paydetail">{{paydetail}}</div>
            </div> 
        </div>          
    </div>
</template>
<style scoped>
@import './statuspay.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'statuspay',
         filters: {
            acNumber(v){
                return v.length>18 ? v.substr(0,18)+'...' : v;
            },
        },
        data(){
            return{
                countTime:"",
                payFee:"",
                payTime:"",
                payNumber:"",                
                match_name:"",
                match_time:"",
                total:"",
                fee:"",
                total_fee:"",
                button_text:"确认付款",
                status:0,
                intervalid1:'',
                chaTime:3600000,
                columnList:[],
                value:0,
                title:"",
                password:"",
                url:this.global.storage.url,
                total_fee:"",
                iconshow:true,
                paydetail:'',
                ensureShow:true
                 
            }
        },
        created:function () {            
            this.intervalid1 = window.setInterval(() => {
                this.chaTime-=1000;
                if(this.chaTime<=0){
                    this.chaTime=0;
                    this.status=1;
                }
                this.formatDuring(this.chaTime);
            }, 1000)
        }, 
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '报名缴费';    
        },
        mounted(){   
            this.getpayinfo();
        },
        methods:{ 
            lastPage(){
                window.history.back(-1); 
            },
            ensurePay(){
                var _this=this; 
                _this.ensureShow=false;              
                var params;
                params={'mobile':_this.global.storage.mobile}; 
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                var ua = window.navigator.userAgent.toLowerCase(); 		
                var openId=null;
                if(_this.value==1){
                    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                        $.ajax({
                            type:'POST',
                            url:'https://www.marathonbm.com/config/getOpenId',
                            dataType:'JSON',
                            data:request,
                            success:function(data){	
                                if(data.code==1){
                                    openId=data.data.openid;
                                    _this.paysuccess(openId);
                                }else{
                                    alert('提交失败');
                                }
                            }
                        });	
                    } 
                }else{
                    _this.paysuccess(openId);
                }                
            },
            paysuccess(openid){
                var _this=this;              
                var outTradeNo=_this.global.storage.outTradeNo;              
                var params;
                var paytype;
                if(_this.value==1){
                    paytype="3";
                }else{
                    paytype="4";
                }
                var req;
                req={'mobile':_this.global.storage.mobile}; 
                req.sessionid =_this.global.storage.sessionid;
                req.outTradeNo = outTradeNo;
                req.total_fee=_this.checkfee;
                req.body=_this.title;
                req.payType =paytype;
                req.payFrom="1";
                req.password=_this.password;
                if(_this.value==1){                                       
                    req.openId=openid;
                }
                req.params= _this.global.storage.mobile+":"+ _this.global.storage.sessionid+":"+ _this.global.storage.eventId+":"+_this.global.storage.accountId+":"+_this.global.storage.eventLabelId;
                var params_request = getSign(req,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/app/mls/order/unifiedPay",
                    dataType:'JSON',
                    data:params_request,
                    success:function(data){                  
                        if(data.code==1){
                            _this.global.storage.outTradeNo=data.objectData;
                            if(_this.value==1){                  
                                _this.weixinJSAPI(data.data);                                              
                            }else{  
                                _this.ensureShow=true;                                                                                            
                                var payUrl=data.data.payUrl;
                                $(payUrl).appendTo("#alipay");
                            }
                        }else{
                            alert(data.msg);
                        }  
                    }
                });  
            },
            weixinJSAPI(paramData){
                var _this=this;           
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',{
                        "appId":paramData.payParams.appId,    
                        "timeStamp":paramData.payParams.timeStamp,      
                        "nonceStr":paramData.payParams.nonceStr, 
                        "package":paramData.payParams.package,     
                        "signType":"MD5",         
                        "paySign":paramData.payParams.paySign,
                        "sign":paramData.sign
                    },	      
                    function(res){ 
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {   
                            _this.ensureShow=true;   
                            alert('支付成功');              
                            _this.$router.push({ path: '/orderDetail'});                        
                        } 
                        if((res.err_msg == "get_brand_wcpay_request:fail")||(res.err_msg == "get_brand_wcpay_request:cancel")){	
                            _this.ensureShow=true;         
                            alert('支付失败');
                            // _this.$router.push({ path: '/orderDetail'});  
                        }
                    }
                );  		
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                        }else{
                            onBridgeReady();
                        }
            },  
            register(){
                this.$router.push({ path: '/Registration', query: {
                    entryId:this.global.storage.entryId,
                    eventTime:this.match_time,
                    eventType:this.total,
                    title:this.match_name,
                }}); 
            }, 
            down(){
            },   
            getpayinfo(){
                var _this=this; 
                var status=_this.$route.query.id;
                var value=_this.$route.query.value;
                _this.value=value;
                if(status==905){
                    _this.status=1;
                }else if(status==911){
                    _this.status=0;
                }
                if(value==1){
                    _this.value=1;
                }else if(value=2){
                    _this.value=2;
                }
                var outTradeNo=_this.$route.query.outTradeNo;   
                var params;
                params={'mobile':_this.global.storage.mobile}; 
                params.sessionid =_this.global.storage.sessionid;
                params.outTradeNo = outTradeNo;   
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");     
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/app/mls/order/getEnroll",
                    dataType:'JSON',
                    data:request,
                    success:function(data){    
                        console.log(data);
                        _this.iconshow=false;                 
                        if(data.code==1){
                            if(data.objectData.list.length<=0||data.objectData.totalFee<=0){
                                _this.$router.push({path:"/orderDetail"});
                            }
                            _this.total=data.objectData.entry.name;
                            _this.match_name=data.objectData.eventName;
                            _this.match_time=_this.time(data.objectData.matchStartDate);
                            var myDate=new Date();
                            var year=myDate.getFullYear(); 
                            var month=myDate.getMonth()+1; 
                            month=month<=9?"0"+month:month;
                            var day=myDate.getDate(); 
                            day=day<=9?"0"+day:day;
                            var hour=myDate.getHours(); 
                             hour=hour<=9?"0"+hour:hour;
                            var min=myDate.getMinutes();
                             min=min<=9?"0"+min:min;
                            _this.payTime=year+"年"+ month+"月"+ day+"日"+ " "+hour+":"+ min; 
                            var list = data.objectData.list;
                            _this.fee = data.objectData.entry.fee;
                             _this.total_fee=(_this.fee *list.length).toFixed(2);
                            var eventName= data.objectData.entry.name;
                            _this.columnList=list;
                            _this.payNumber=data.objectData.outTradeNo;
                            _this.title= data.objectData.eventName;
                            var changeFee = Math.round(data.objectData.totalFee * 100) / 100;
                            _this.checkfee = _this.accMul(changeFee,100);      
                        }  
                    }
                }); 
            },
             formatDuring(shijiancha) {
                var days = shijiancha / 1000 / 60 / 60 / 24;
                var daysRound = Math.floor(days);
                var hours = shijiancha / 1000 / 60 / 60 - (24 * daysRound);
                var hoursRound = Math.floor(hours);
                var minutes = shijiancha / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                var minutesRound = Math.floor(minutes);
                var seconds = shijiancha / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                var secondsRound = Math.floor(seconds);
                daysRound=daysRound<=9?"0"+daysRound:daysRound;
                hoursRound=hoursRound<=9?"0"+hoursRound:hoursRound;
                minutesRound=minutesRound<=9?"0"+minutesRound:minutesRound;
                secondsRound=secondsRound<=9?"0"+secondsRound:secondsRound;
                this.countTime=hoursRound+":"+minutesRound+":"+secondsRound;
                return daysRound + "天" + hoursRound + "小时" + minutesRound + "分" + secondsRound + "秒";
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
            accMul(arg1, arg2) {
                var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                try { m += s1.split(".")[1].length } catch (e) { }
                try { m += s2.split(".")[1].length } catch (e) { }
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
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