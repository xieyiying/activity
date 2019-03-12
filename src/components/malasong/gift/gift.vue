<template style="font_size:10px">
    <div class="gift">
        <div class="giftswear" v-show="!redPacketShow"> 
        </div>
        <div class="present" id="div1" v-show="!redPacketShow">
        </div>
        <div class="giftIcon">
        </div>
        <!-- <div class="giftbg">
        </div> 
            <div class="phone" id="div1" v-show="!redPacketShow">
            </div>
        </div> -->
        <div class="bodyClass" v-show="redPacketShow">
            <div class="giftMainDetail" @click="goGift">
                <span>查看中奖明细</span>
                <span class="el-icon-arrow-right"></span>
            </div>
            <div class="giftRedpocket">  
                <div class="num">                    
                    <p>恭喜您</p>
                    <p>抽中<strong style="font-size:20px">&nbsp;{{num}}&nbsp;</strong>元幸运大礼包</p> 
                </div>
                <div class="choujiang">
                </div>  
            </div> 
        </div>
        <div class="cantReget" v-show="redPacket">
             <div class="giftMainDetail" @click="goGift">
                <span>查看中奖明细</span>
                <span class="el-icon-arrow-right"></span>
            </div>
            <div class="giftrepocket">  
                {{msg}}
            </div> 
        </div>    
    </div>
</template>
<style scoped>
.gift{
    position: relative;
    background: #f44040;
    width: 100%;
    height: 100%;
}
.giftswear{
    position: absolute;
    width:228.5px;
    height: 79px;
    top: 10%;
    left: 50%;
    margin-left: -114.25px;
    /* margin-top: -39.5px; */
    background-image: url(../total_img/swearText.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;     
}
.present{
    position: absolute;
    width:287.5px;
    height: 289.5px;
    top: 22%;
    left: 50%;
    margin-left: -143.75px;
    /* margin-top: -39.5px; */
    background-image: url(../total_img/handPhone.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;     
}
.giftIcon{
    position: absolute;
    width:88px;
    height:30px;
    bottom: 10%;
    left: 50%;
    margin-left: -44px;
    /* margin-top: -39.5px; */
    background-image: url(../total_img/paopaoicon.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;      
}
.giftRedpocket{    
    position: relative;
    height: 300px;
    top: 50%;
    margin-top: -240px;
    width: 300px;
    left: 50%;
    margin-left: -150px;
}
.giftrepocket{
    position: relative;
    height: 300px;
    top: 50%;
    margin-top: -240px;
    width: 300px;
    left: 50%;
    margin-left: -150px;
    color: #fff;
    line-height: 300px;    
}
.routes{
    -webkit-transform:rotate(-20deg);
    transform:rotate(-20deg);
    -webkit-transition:-webkit-transform 0.2s linear;
    transition:transform 0.2s linear;
    /* transform: scale(1.2, 1.2) */
}
.route1{
    -webkit-transform:rotate(20deg);
    transform:rotate(20deg);
    -webkit-transition:-webkit-transform 0.2s linear;
    transition:transform 0.2s linear;
}
.bodyClass{    
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.cantReget{
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.num{
    position: absolute;
    width: 300px;
    color: #fff;
    top: 24%;
}
.choujiang{
    /* width: 316px;
    position: absolute;
    left: 50%;
    margin-left: -158px;
    top: 50%;
    background-image: url(../total_img/boxprevent.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 191.5px;
    margin-top: -95.75px; */
    width: 316px;
    position: absolute;
    background-image: url(../total_img/boxprevent.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 191.5px;
    bottom: 0px;
}
.giftMainDetail{
    color: #fff;
    position: absolute;
    right: 20px;
    top: 20px;
}
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
// import from 
export default {
    name: 'gift',
    data(){
        return{
            redPacketShow:false,
            num:"",
            redPacket:false,
            PacketShow: true,
            msg:'',
            mobile:''
            
        }
    },
    beforeCreate(){
        document.getElementById('titleId').innerHTML = '领幸运红包';    
    },
    mounted(){   
        // this.getPath();
        this.pocket();
        // this.jumpApp();
    },
    methods:{   
        pocket(){
            var geturl=self.location.href;  
            var params;
            var temp=[];  
            var mobile;
            var ruleId="";
            var re=geturl.split("?");  
            for(var i = 0;i<re.length;i++){             
                if(re[i].indexOf("mobile")!=-1){
                    if(re[i].indexOf("&")!=-1){                           
                        var url_temp=[];
                        url_temp=re[i].split('&');                            
                        for(var j=0;j<url_temp.length;j++){                                                        
                            if(url_temp[j].indexOf("mobile")!=-1){                              
                                var index = url_temp[j].indexOf("mobile="); 
                                mobile= url_temp[j].substring(index + "mobile=".length);
                            };
                            if(url_temp[j].indexOf("ruleId")!=-1){                              
                                var index = url_temp[j].indexOf("ruleId="); 
                                ruleId= url_temp[j].substring(index + "ruleId=".length);
                            }
                        }
                    }else{
                        var index = geturl.indexOf("mobile=");
                        mobile=geturl.substring(index + "mobile=".length);
                        ruleId="";
                    }
                }
            };
            // alert(mobile);
            if(mobile==""||mobile==undefined||mobile==null) return window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.hpaopao.marathon&ADTAG=mobile";  
            params={'mobile':mobile,ruleId:ruleId};  
            var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");                 
            var _this = this;            
            _this.mobile = mobile;  
            $.ajax({
                type:'POST', 
                url:'https://app.marathonbm.com/coupon/luckDraw',
                // url:'http://192.168.2.17:8082/coupon/luckDraw',
                // url:'http://ceshi.marathonbm.com/coupon/luckDraw',
                dataType:'JSON',
                data: request,
                success:function(data){
                    var data = data;
                    if(data.code == 1){                      
                        _this.num = (parseInt(data.objectData.redpacket)*0.01).toFixed(2);
                        _this.getPath();
                    }else if(data.code == 0){   
                        _this.msg = data.msg;
                        _this.redPacket = true;    
                        _this.PacketShow = false;                    
                    }else if(data.code==411){
                       window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.hpaopao.marathon&ADTAG=mobile";         
                    }else{
                        alert(data.msg);
                    }
                    // clearInterval(t1);
                    // div1.style.left = 50 + '%'; 
                    // // $('#div1').addClass('route1');
                    // $('#div1').removeClass("routes");  
                    // $('#div1').removeClass("route1");  
                    // _this.redPacketShow = true;                          
                }                
            })  
        },
        goGift(){
           this.$router.push({ path: '/giftlist',query:{mobile:this.mobile}}); 
        }, 
        getPath(){ 
            // var clientHeight=document.body.clientHeight;
            // var clientWidth=document.body.clientWidth;
            // alert(clientHeight);
            // alert(clientWidth);
            var div1 = document.querySelector('#div1');
            var a = true;
            var t1=setInterval(function() {
                // div1.style.left = (a ? 48 : 52) + '%';  
                if(a){   
                    $('#div1').removeClass("route1"); 
                    $('#div1').addClass('routes');
                }else{
                    $('#div1').removeClass("routes");  
                    $('#div1').addClass('route1');                    
                }
                a = !a;
            }, 120);     
           setTimeout(() => {
               clearInterval(t1);
                div1.style.left = 50 + '%'; 
                // $('#div1').addClass('route1');
                $('#div1').removeClass("routes");  
                $('#div1').removeClass("route1");  
                this.redPacketShow = true;   
                this.PacketShow = false;          
            }, 2500);  
        },
    //     jumpApp(){    
    //         var data = {};            
    //         var geturl=self.location.href;            
    //         var id
    //         var re=geturl.split("?");  
    //         for(var i = 0;i<re.length;i++){             
    //             if(re[i].indexOf("activeId")!=-1){
    //                 if(re[i].indexOf("&")!=-1){                           
    //                     var url_temp=[];
    //                     url_temp=re[i].split('&');                            
    //                     for(var j=0;j<url_temp.length;j++){                                                        
    //                         if(url_temp[j].indexOf("activeId")!=-1){                              
    //                             var index = url_temp[j].indexOf("activeId="); 
    //                             id= url_temp[j].substring(index + "activeId=".length);                                                                                                              
    //                         }
    //                     }
    //                 }else{
    //                     var index = geturl.indexOf("activeId=");
    //                     id=geturl.substring(index + "activeId=".length);
    //                 }
    //             }
    //         };
    //         linkedme.init("bdf908335e5962287a7f5181b2e33f6d", data, function(){});
    //                 if(geturl.indexOf("run/redPacket")!=-1){	
    //                     data.params = '{"path":"run/redPacket","id":"'+id+'"}'; 
    //                 };                 
    //             data.type = "live";                  
    //             data.tags = "a";
    //             data.ios_custom_url = "https://www.hpaopao.com/d"; 
    //             data.android_custom_url = "https://www.hpaopao.com/d";
    //             linkedme.link(data, function(err, response){
    //                 if(err){
    //                 // 生成深度链接失败，返回错误对象err                    
    //                 } else {                                
    //                 document.getElementById("openAPP2").href=response.url;
    //                 document.getElementById("openAPP1").href=response.url;
    //                 }
    //             },false);
    //     }
        
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
    function  strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    };
</script>
    