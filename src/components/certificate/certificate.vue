<template style="font_size:10px">
    <div class="certificate">
        <div><img src="./certificate/841962803499182929.png" onclick="return false" class="certificate_bj"></div>
        <div class="certificate_info">
                <div class="certificate_successful"></div>
            <div class="complete_match">
                <div class="completion_Certificate">
                    <div class="completion_Certificate_top">
                             <img src="./certificate/资源 11-8.png" class="completion_Certificate_image">
                        <span class="certificate_text" style="margin-bottom:0px">完赛证书</span>
                    </div>
                    <p class="paopao">跑跑马拉松组织委员会官方认证</p>
                </div>
            </div>
            <div class="base_info"  style=" border-bottom: 1px solid #f9f9f9">
                <div class="info_left"> 
                        <div class="info_top">
                             <img src="./certificate/资源 3-8.png" class="info_image"><span class="firstname">姓名</span>
                        </div>  
                        <p class="certificate_name">{{name}}</p>
                </div>
                <div class="info_right">
                    <div class="info_top">
                    <img src="./certificate/资源 2-8.png"  class="info_image"><span class="firstname">号码</span>
                    </div>
                    <p class="certificate_name">{{runningCode}}</p>
                </div>
            </div> 
            <div class="base_info" style=" border-bottom: 1px solid #f9f9f9">
                <div class="info_left">                    
                    <div class="info_top">
                    <img src="./certificate/资源 4-8.png" class="info_image"><span class="firstname">项目</span>
                    </div>
                    <p class="certificate_name">{{entryName}}</p></div>
                 <div class="info_right">
                    <div class="info_top">
                        <img src="./certificate/资源 7-8.png"  class="info_image"><span class="firstname">成绩</span>
                    </div>
                   <p class="certificate_name">{{duration}}</p>
                </div>    
            </div> 
              <div class="base_info"  style=" border-bottom: 1px solid #f9f9f9">
                <div class="info_left">                    
                    <div class="info_top">
                    <img src="./certificate/资源 6-8.png" class="info_image"><span class="firstname">排名</span>
                    </div>
                    <p class="certificate_name" style="text-align:center;float:left">{{score}}</p>
                </div>
                 <div class="info_right">
                    <div class="info_top">
                   <img src="./certificate/资源 5-8.png"  class="info_image"><span class="firstname" style="margin-left:-2.0rem">完赛日期</span>
                    </div>
                   <p class="certificate_name">{{finishDate}}</p>
                </div>    
            </div>
            <div class="base_info">
                <div class="match_info_left"><p class="firstname" style="margin-left:0rem">赛事主管</p><img src="./certificate/315311329761212273.png"  class="signture"></div>
                <div class="match_info_right"><p class="firstname" style="margin-left:0rem">赛事主席</p><img src="./certificate/610545389086431761.png"  class="signture"></div>
            </div>
            <div class="paopao_logo"></div> 
        </div>
        <a href="" class="linkedme"  id="openAPP1" @click="jumpApp">
            <div class="certificate_bottom" v-show="if_show" >
                <div class="certificate_bottom_left">
                    <img src="./certificate/资源 9-8.png" class="certificate_logo">
                    <div class="certificate_bottom_text">
                        <p class="certificate_bottom_paopao" >跑跑网</p>
                        <p class="certificate_bottom_running"  style="height:20px">跑步返现/赢lphonex,新马泰旅游</p>
                    </div>
                </div>
                <div class="certificate_bottom_right" style="float:right">立即下载</div>
            </div>
        </a>
    </div>
</template>
<style>
@import './certificate.css';
</style>
<script>
import { hexMD5 } from '../../router/Md5.js';
// import from 
export default {
    name: 'certificate',
    data(){
        return{
            name:'',
            date:'',
            runningCode:'',
            entryName:'',
            duration:'',
            score:'',
            finishDate:'',
            if_show:null
        }
    },
    beforeCreate(){
        document.getElementById('titleId').innerHTML = '完赛证书';    
    },
     mounted(){
        this.init();
        this.jumpApp();
  },
  methods:{
        convert_time(duration) {
            var h = Math.floor(duration / 3600);
            h = h <= 9 ? "0" + h : h;
            var m = Math.floor((duration - h * 60 * 60) / 60);
            m = m <= 9 ? "0" + m : m;
            var s = duration % 60;
            s = s <= 9 ? "0" + s : s;
            return h + ":" + m + ":" + s;
        },
      init(){
            var entryId;
            var accountId;
            var _this = this;
            var geturl=self.location.href;//type=0不显示,type=1显示
            var re=geturl.split("?");
            if(geturl.indexOf("type=1")!=-1){
                _this.if_show=true;
            }else{              
                _this.if_show=false;
            };
            for(var ke in re){                  
                if(re[ke].indexOf("entryId=")!=-1){
                    var url_number=re[ke].split("&"); 
                    for( var i in url_number){    
                        if(url_number[i].indexOf("entryId=")!=-1){
                            var index = url_number[i].indexOf("entryId="); 
                            entryId=url_number[i].substring(index + "entryId=".length);
                        };
                        if(url_number[i].indexOf("accountId=")!=-1){
                            var index_1 = url_number[i].indexOf("accountId=");  
                            accountId=url_number[i].substring(index_1 + "accountId=".length);
                        };                        
                    };
                }
            };
            var params = { accountId: accountId };
            params.entryId = entryId;
            var request = getSign(params, "6a64b838f0964483aa107540a26368a5");
            $.ajax({
                type: "POST",
                url: "https://web.hpaopao.com/certificate/webview",
                //url: "https://ceshiweb.hpaopao.com/certificate/webview",
                // url: "https://192.168.2.50:8888/web/certificate/webview",
                dataType: "JSON",
                data: params,
                success: function(data) {
                    var data = data.data; 
                    var image=data.background;
                    if(image!="" || image!=null){
                        $('.certificate_bj').attr('src', data.background); 
                    }
                    _this.name=data.name;
                    _this.runningCode=data.runningCode;
                    _this.entryName=data.entryName;
                    _this.duration=_this.convert_time(data.duration);
                    _this.score=data.score;
                    var time=data.finishDate;
                    var date_number=new Date(time);
                    var year =date_number.getFullYear();
                    var month = date_number.getMonth() + 1; 
                    month=month<=9?"0"+month:month;
                    var day =date_number.getDate();
                    day=day<=9?"0"+day:day;
                    _this.finishDate=year+'.'+month+'.'+day;                

                }
            })           
      },
        jumpApp(){    
                var data={};
                    var geturl=self.location.href;
                    var index = geturl.indexOf("entryId=");
                    var id;
                    var re=geturl.split("?"); 
                    for(var ke in re){
                        if(re[ke].indexOf("entryId=")!=-1){
                            var url_number=re[ke].split("&");
                            for( var i in url_number){
                                    if(url_number[i].indexOf("entryId=")!=-1){
                                        var index = url_number[i].indexOf("entryId="); 
                                        id=url_number[i].substring(index + "entryId=".length);
                                };
                            };
                        }
                    };
                linkedme.init("bdf908335e5962287a7f5181b2e33f6d", data, function(){});                	
                data.params = '{"path":"run/certificate","id":"'+id+'"}';                                 
                data.type = "live";                  
                data.tags = "a";
                data.ios_custom_url = "https://www.hpaopao.com/d"; 
                //data.ios_direct_open = "true"; 
                data.android_custom_url = "https://www.hpaopao.com/d";
                //data.android_direct_open = "true"; 

                linkedme.link(data, function(err, response){
                    if(err){
                    // 生成深度链接失败，返回错误对象err                    
                    } else {                                
                    document.getElementById("openAPP1").href=response.url;
                    }
                },false);
        }
        
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
    