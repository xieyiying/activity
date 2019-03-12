<template>    
    <div class="orderstatus">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <div class='tradeNo'>
            <div class='tradeNo-tag'>订单号:</div>
            <div class='tradeNo-num'>{{outTradeNo}}</div>
            <div class='tradeNo-status'>已支付</div>
        </div>
        <div class='line'></div>
        <div class='userinfo'>
            <div class='orderstatus_name'>
                <div class='tradeNo-tag'>付款人:</div>
                <div class='tradeNo-num'>{{name}}</div>
            </div>
            <div class='phoneNum'>
                <div class='tradeNo-tag'>手机号:</div>
                <div class='tradeNo-num'>{{phoneNum}}</div>
            </div>
            <div class='payWay'>
                <div class='tradeNo-tag'>支付方式:</div>
                <div class='tradeNo-num'>{{payWay}}</div>
            </div>
        </div>
        <div class='orderinfo'>
            <div class='allfee'>
            <div class='allfee-tag'>订单总金额</div>
            <div class='allfee-num'>￥{{allFee}}</div>
            </div>
            <div class='benefit'>
            <div class='benefit-tag'>优惠金额</div>
            <div class='benefit-num'>￥{{benefit}}</div>
            </div>
            <div class='payfee'>
            <div class='allfee-tag'>实付金额</div>
            <div class='allfee-num'>￥{{payFee}}</div>
            </div>
        </div>
        <div class='orderDetail'>订单详情</div>
        <div class='line'></div>
        <div class='add-item'>
            <div class='add-tag'>报名总费用</div>
            <div class='add-mid'>￥{{enrollPrice}}x{{enrollNum}}</div>
            <div class='add-right'>￥{{enrollPrice*enrollNum}}</div>
            <!-- <img class='add-img' src='/images/icon_enroll_input_select_type.png'> -->
        </div>
        <div class='line'></div>
        <div class='add'>
            <li v-for="(item,ke) in tradeNolist" :key="ke">
            <div class='add-item'>
                <div class='add-tag'>{{item.name}}</div>
                <div class='add-mid'>￥{{item.price}}x{{item.num}}</div>
                <div class='add-right'>￥{{item.price*item.num}}</div>
                <!-- <img class='add-img' src='/images/icon_enroll_input_select_type.png'> -->
            </div>
            <div class='line'></div>
            </li>
        </div>       
    </div>
</template>
<style scoped>
@import './orderstatus.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'orderstatus',
        data(){
            return{
                url:this.global.storage.url, 
                outTradeNo:"",
                name:"",
                phoneNum:"",
                payWay:"",
                allFee:"",
                benefit:"",
                payFee:"",
                addlist:"",
                enrollNum:"",
                enrollPrice:"",
                tradeNolist:[]                                            
            }
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '订单信息';    
        },
        mounted(){  
            this.orderinfo()
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            orderinfo(){
                var _this = this; 
                var req = {};
                req={'mobile':_this.global.storage.mobile}; 
                req.sessionid =_this.global.storage.sessionid;
                req.outTradeNo = _this.$route.query.orderNumber;
                req.version = 'new';           
                var request = getSign(req,"e1bdc0f0a45a4ce5aa16b90a02851e2a");   
                $.ajax({
                    type:'POST', 
                    url:_this.url+'/app/mls/order/paySuccess',
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                        var allfee = Math.round(data.objectData.totalFee * 100) / 100;
                        var beni;
                        if (data.objectData.prefFee==0){
                            beni = "-"+data.objectData.prefFee+".00";
                        }else{
                            beni = Math.round(data.objectData.prefFee * 100) / 100;
                        }
                        _this.enrollNum=data.objectData.enrollNum;
                        _this.addlist=data.objectData.addits;
                        _this.name=data.objectData.payName;
                        _this.outTradeNo=data.objectData.outTradeNo;
                        _this.payWay=data.objectData.payWay;
                        _this.phoneNum= data.objectData.mobile;
                        _this.allFee=allfee;
                        _this.benefit= beni;
                        _this.payFee= data.objectData.actualPayment;
                        _this.enrollPrice=data.objectData.enrollPrice;                      
                        
                    }                        
                }); 
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