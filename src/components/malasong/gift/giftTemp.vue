<template style="font_size:10px">
    <div class="gift">
        <div class="giftbg">
            <div class="phone" id="div1" v-show="!redPacketShow">
            </div>
        </div>
        <div class="bodyClass" v-show="redPacketShow">
            <div class="choujiang" >  
                <div class="num">                    
                    <p>恭喜您</p>
                    <p>抽中{{num}}<strong style="font-size:20px">&nbsp;20元&nbsp;</strong>幸运大礼包</p> 
                </div>  
            </div> 
        </div>  
    </div>
</template>
<style scoped>
.bodyClass{    
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.gift{
    position: relative;
}
.phone{
    width: 298px;
    height: 342px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -148px;
    margin-top: -171px;
    background-image: url(../total_img/yyy@2x.png);
    background-repeat: no-repeat;
    background-size: 100% 100%; 
}
.giftbg{
    width: 100%;
    height: 100%;
    background-image: url(../total_img/ip6.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;    
}
.choujiang{
   /* width: 164px;
    position: absolute;
    height: 212px;
    left: 50%;
    margin-left: -82px;
    top: 120px;
    background-image: url(../total_img/redpocket.png);
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    width: 246px;
    position: absolute;
    left: 50%;
    margin-left: -123px;
    top: 50%;
    background-image: url(../total_img/choujianghongbao.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 318px;
    margin-top: -159px;
}
.choujiang p{
    color: #fff;
    font-size: 18px;
}
.num{
    margin-top:40px;
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
@media screen and (min-height: 720px) {
    .phone{
        width: 298px;
        height: 342px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -148px;
        margin-top: -171px;
        background-image: url(../total_img/yyy@3x.png);
        background-repeat: no-repeat;
        background-size: 100% 100%; 
    }
    .giftbg{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/iphoneXbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;    
    }
}
@media screen and (min-height: 680px min-width 400px) {
    .giftbg{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/6p.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;    
    }
}
@media screen and (max-width: 320px) {
     .giftbg{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/ip5.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;    
    }
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
        num:""
    }
  },
  beforeCreate(){
    document.getElementById('titleId').innerHTML = '领幸运红包';    
  },
 mounted(){   
    this.getPath();
    // this.jumpApp();
  },
  methods:{        
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
                 // var geturl=self.location.href;  
                // var params;
                // var temp=[];  
                // var activeId;
                // var re=geturl.split("?");  
                // for(var i = 0;i<re.length;i++){             
                //     if(re[i].indexOf("activeId")!=-1){
                //         if(re[i].indexOf("&")!=-1){                           
                //             var url_temp=[];
                //             url_temp=re[i].split('&');                            
                //             for(var j=0;j<url_temp.length;j++){                                                        
                //                 if(url_temp[j].indexOf("activeId")!=-1){                              
                //                     var index = url_temp[j].indexOf("activeId="); 
                //                     activeId= url_temp[j].substring(index + "activeId=".length);
                //                 }
                //             }
                //         }else{
                //             var index = geturl.indexOf("activeId=");
                //             activeId=geturl.substring(index + "activeId=".length);
                //         }
                //     }
                // };
                // params={'activeId':activeId};       
                // var request = getSign(params,"6a64b838f0964483aa107540a26368a5");                 
                // var _this = this;
                // $.ajax({
                //     type:'POST', 
                //     url:'https://web.hpaopao.com/activity/shareIndex',
                //     dataType:'JSON',
                //     data: request,
                //     success:function(data){
                        
                //     }
                // })       
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
    req.hpaopao_time = t;
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
    req.hpaopao_sign = hexMD5(str + secret).substr(5, 20);
    return req;
    }

</script>
    