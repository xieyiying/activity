<template>
    <div class="main_page">  
        <div class="share-shade" id="share-shade"></div> 
          <a href="" class="linkedme"  id="openAPP1"  @click="jumpApp">
            <div class="goAPPl">
                <div class="goAPPl_logo" style="width: 40px">
                    <img src="../total_img/malaslogo.jpg" style="width: 100%">
                </div>
                <div class="goAPPl_enroll" style="float: left;margin-left: 80px;">马拉松报名</div>               
                <div class="goAPPl_open">下载</div>
            </div>
        </a>  
        <div class="main_page_top">
            <div class="main_page_top_img" id="malasImg">                
                <img :src="matchimg" class="main_page_top_img">
            </div>
            <div class="main_page_info">
                <div class="page_info_left">
                    <div class="info_title">{{malas_title|acName}}</div>
                    <div class="last_time">
                        <span class="time_endding">{{mals_text}}</span>
                        <span class="count_time">
                            <button :class="control_class == true ? 'endding_time' :'endding_time1'">{{day}}</button><span :class="control_class == true ? 'icon' :'icon1'">:</span>
                            <button :class="control_class == true ? 'endding_time' :'endding_time1'">{{hour}}</button><span  :class="control_class == true ? 'icon' :'icon1'">:</span>
                            <button :class="control_class == true ? 'endding_time' :'endding_time1'">{{minute}}</button><span  :class="control_class == true ? 'icon' :'icon1'">:</span>
                            <button :class="control_class == true ? 'endding_time' :'endding_time1'">{{seconds}}</button>
                        </span>
                    </div>
                </div>
                <div class="score">
                    <div class="score_info">
                        <div class="score_top">
                            <span class="score_number">{{score}}</span>
                            <span class="score_text">分</span>
                        </div>
                        <img src="../total_img/great.png" alt="" class="score_img" v-show="ifshow1">
                        <img src="../total_img/agree.png" alt="" class="score_img" v-show="ifshow2">
                        <img src="../total_img/just_so_so.png" alt="" class="score_img" v-show="ifshow3">
                        <img src="../total_img/worse.png" alt="" class="score_img" v-show="ifshow4">
                    </div>
                </div>
                <!-- <a href="" class="linkedme"  id="openAPP5"  @click="jumpApp"> -->
                    <div class="match_comments"><span class="check_comments" @click="checkComments">查看赛事评论</span><img src="../total_img/little_icon.png" alt="" class="comment_img"></div>
                <!-- </a> -->
            </div>
            <div class="middle_line">
            </div>
        </div>
        <div class="main_page_middle">
            <div class="column_content">
                <div class="content_text" id="content_text">
                    {{content_text}}
                    <div v-html="htmlurl"></div>
                </div>                
            </div>
        </div>  
        <!-- <a href="" class="linkedme"  id="openAPP4"  @click="jumpApp"> --> 
            <div v-if="event_type == 0" class="main_page_button" @click="toLogin">
                <div class="click_button" v-show="canenroll" @click="toLogin">
                    {{mals_text}}
                </div>
                <div class="click_button" style="background:#999999" v-show="cantenroll" @click="toLogin">
                    {{mals_text}}
                </div>
            </div> 
            <div v-else-if="event_type == 1">
                <div v-if="!cantenroll" class="click_button_mini click_button_float_left" @click="toLogin">
                    {{mals_text}}
                </div>
                <div v-else class="click_button_mini click_button_float_left" style="background:#999999"  @click="toLogin">
                    {{mals_text}}
                </div>
                <div  class="click_button_mini click_button_float_right" @click="join_activity">
                    免费吃火锅
                </div>
            </div>
        <!-- </a>             -->
    </div>
</template>
<style scoped>
@import 'malasmain.css';
</style>
<script>
import  weixin  from 'weixin-js-sdk';
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'mainPage',
        filters: {
            acName(v){
                if(v!=undefined)
                   return v.length>12 ? v.substr(0,12)+'...' : v;
            },
        },
        data(){
            return{
                mals_text:"",
                malas_title:"",
                matchimg:'',
                day: "",
                hour:"",
                minute:"",
                seconds:"",
                score:"",
                ifshow1:null,
                ifshow2:null,
                ifshow3:null,
                ifshow4:null,
                current:0,
                content_text:"",
                searchBarFixed:"",
                intervalid1:'',
                chaTime:0,
                control_class:null,
                url:this.global.storage.url,
                cantenroll:false,
                canenroll:true,
                eventId:'',
                outurl_flag:false,
                outurl:"",
                htmlurl:"",
                event_type:6
           }
        },
       created:function () {
            this.intervalid1 = window.setInterval(() => {
                this.chaTime-=1000;
                if(this.chaTime<=0){
                    this.chaTime=0;
                    this.control_class=false;
                }
                this.formatDuring(this.chaTime);
            }, 1000)
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '赛事简介';    
        },
        mounted(){  
            this.jumpApp();
            this.getinfo();
            this.cacullate();
            // this.init_share();
            // this.screenscroll()
            // var p = 0;
            // var t = 0;
            // $(window).scroll(function(){
            // 　　var scrollTop = $(this).scrollTop();
            // 　　var scrollHeight = $(document).height();
            // 　　var windowHeight = $(this).height();
            // 　　if(scrollTop + windowHeight == scrollHeight){
            //         $(".goAPPl").slideDown("slow"); 
            // 　　}else{
            //         p = $(this).scrollTop();
            //         if (t <= p) { //下滚                          
            //             $(".goAPPl").slideUp("slow");                              
            //         } else { //上滚
            //             $(".goAPPl").slideDown("slow"); 
            //         }
            //         setTimeout(function() {
            //             t = p;
            //         }, 0);
            //     }
            // });
            // window.addEventListener('scroll', this.handleScroll);
        },
        methods:{ 
            lastPage(){
                window.history.back(-1); 
            },
            checkComments(){
                if(this.global.storage.mobile!=""&&this.global.storage.sessionid!=""&&this.global.storage.accountId!=""&&this.global.storage.accountId!=undefined&&this.global.storage.accountId!=undefined){                    
                    this.$router.push({ path: '/comments'})
                }else{ 
                    this.$router.push({ path: '/passwordlogin',query:{eventId:this.eventId}});                    
                }
            },
            toLogin(){
                var href=location.href; 
                if(href.indexOf("ac") != -1 && href.indexOf("mb") != -1){
                    var href_split=href.split("?")[1].split("&");
                    for( var ke in href_split){
                        var k_v=href_split[ke].split("=");
                        if(k_v[0] != "ac" && k_v[0] != "mb" && k_v[0] != "ssid"){
                            continue;
                        }
                        if(k_v[0]== "ac" && k_v[1] != ""){
                            this.global.storage.accountId=k_v[1];
                        }else if(k_v[0] == "mb" && k_v[1] != ""){
                            this.global.storage.mobile=k_v[1];
                        }else if(k_v[0] == "ssid" && k_v[1] != ""){
                            this.global.storage.sessionid=k_v[1];
                        }
                    }
                }
                if(this.global.storage.mobile!=""&&this.global.storage.sessionid!=""&&this.global.storage.accountId!=""&&this.global.storage.accountId!=undefined&&this.global.storage.accountId!=undefined){                    
                    this.$router.push({ path: '/detail'})
                }else{ 
                    if(!this.outurl){
                        this.$router.push({ path: '/passwordlogin',query:{eventId:this.eventId}});
                    }else{
                        location.href=this.outurl;
                    }                    
                }                
                 
            },
            join_activity(){
                var href=location.href; 
                if(href.indexOf("ac") != -1 && href.indexOf("mb") != -1){
                    var href_split=href.split("?")[1].split("&");
                    for( var ke in href_split){
                        var k_v=href_split[ke].split("=");
                        if(k_v[0] != "ac" && k_v[0] != "mb" && k_v[0] != "ssid"){
                            continue;
                        }
                        if(k_v[0]== "ac" && k_v[1] != ""){
                            this.global.storage.accountId=k_v[1];
                        }else if(k_v[0] == "mb" && k_v[1] != ""){
                            this.global.storage.mobile=k_v[1];
                        }else if(k_v[0] == "ssid" && k_v[1] != ""){
                            this.global.storage.sessionid=k_v[1];
                        }
                    }
                }
                if(this.global.storage.mobile!=""&&this.global.storage.sessionid!=""&&this.global.storage.accountId!=""&&this.global.storage.accountId!=undefined&&this.global.storage.accountId!=undefined){                    
                    this.$router.push({
                        path: '/powerActivity',
                        query: {
                            accountId: this.global.storage.accountId,
                            eventId: this.eventId,
                            activity: 'activity'
                        }
                    })
                }else{
                    if(!this.outurl){
                        this.$router.push({ path: '/passwordlogin',query:{eventId:this.eventId, activity: 'activity'}});
                    }else{
                        location.href=this.outurl;
                    }                    
                }
            },
            cacullate(){
                var img_width=$("#malasImg").width();
                var img_height=(img_width/4)*2;
                $("#malasImg").height(img_height);
            },
            getinfo(){
                //https://192.168.2.13:8080/#/matchNews?eventId=35ecbafef9ec4f8d9adb8ad65319f56e&model=ssjj
                var geturl=self.location.href;
                var params;
                var temp=[];
                var eventId;
                var re=geturl.split("?");  
                console.log(re);
                for(var i = 0;i<re.length;i++){             
                    if(re[i].indexOf("event")!=-1){
                        if(re[i].indexOf("&")!=-1){                           
                            var url_temp=[];
                            url_temp=re[i].split('&');                            
                            for(var j=0;j<url_temp.length;j++){                                                        
                                if(url_temp[j].indexOf("event")!=-1){                              
                                    var index = url_temp[j].indexOf("event="); 
                                    eventId= url_temp[j].substring(index + "event=".length);
                                }
                            }
                        }else{
                            var index = geturl.indexOf("event=");
                            eventId=geturl.substring(index + "event=".length);
                            this.eventId=eventId;
                        }
                    }
                };     
                params={'event':eventId};   
                params.module="ssjj";  
                params.label="webs"; 
                this.global.storage.eventId=eventId;         
                console.log(params);       
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                var _this = this;               
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/app/mls/article",
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                        if(data.code==1){
                            _this.global.storage.eventLabelId=data.eventLabelId;
                            _this.matchimg=data.eventImage;
                            _this.malas_title=data.name;
                            _this.global.storage.title=data.name;
                            var newtext = data.dataDetail;
                            if(data.outUrl!="" && data.outUrl.length > 2){
                                _this.outurl_flag=true;
                                _this.outurl=data.outUrl;
                            }
                            $(newtext).appendTo("#content_text");
                             var imgstyle=document.getElementsByTagName('img');
                            for(i=0;i<imgstyle.length;i++){
                                imgstyle[i].style.width=100+'%';
                                }
                            _this.score=(data.totalStar).toFixed(1);
                            var score_num=data.totalStar;
                            if(score_num>=4&&score_num<=5){
                                _this.ifshow1=true;
                            }else if(score_num>=3&&score_num<4){
                                _this.ifshow2=true;
                            }else if(score_num>=2&&score_num<3){
                                _this.ifshow3=true;
                            }else if(score_num<2){
                                _this.ifshow4=true;
                            }                         
                            if(data.url != "" && data.url != undefined){
                                let param={
                                   accept:'text/html, text/plain'
                                }
                                   _this.$http.get(data.url,param).then((response)=>{
                                   _this.htmlurl=response.data;
                                }).catch(()=>{
                                   _this.htmlurl='请刷新页面重新加载';
                                });
                            }else{
                                _this.content_text=data.content;
                            }                            
                            var systemTime=data.systemTime;
                            var endtime=data.endDate;                      
                            var status=data.status;
                            var startteime=data.startDate;
                            var matchstart=data.matchStartDate;
                            var matchend=data.matchEndDate;
                            if(status==0){                                
                                 _this.canenroll=false;
                                 _this.cantenroll=true;
                                 _this.chaTime=startteime-systemTime;
                                 _this.mals_text="报名未开始"; 
                                 _this.control_class=false;
                            }else if(status ==1){
                                _this.mals_text="报名进行中"; 
                                _this.chaTime=endtime-systemTime;
                                _this.control_class=true;
                            }else if(status == 2){
                                 _this.canenroll=false;
                                 _this.cantenroll=true;
                                 _this.chaTime=matchstart-systemTime;
                                 _this.mals_text="即将开赛"; 
                                 _this.control_class=false;
                            }else if(status == 3){
                                _this.canenroll=false;
                                 _this.cantenroll=true;
                                 _this.chaTime=matchend-matchstart;
                                 _this.mals_text="赛事进行中"; 
                                 _this.control_class=false;
                            }else{
                                 _this.canenroll=false;
                                 _this.cantenroll=true;
                                 _this.chaTime=0;
                                 _this.mals_text="赛事已完成"; 
                                 _this.control_class=false;
                            } 
                            _this.event_type=data.eventType;
                        }  
                    }
                }); 
            },
            //倒计时
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
                this.day=daysRound;
                this.hour=hoursRound;
                this.minute=minutesRound;
                this.seconds=secondsRound;
                return daysRound + "天" + hoursRound + "小时" + minutesRound + "分" + secondsRound + "秒";
           },
            // screenscroll(){
            //     var p = 0;
            //     var t = 0;
            //     $(window).scroll(function(){
            //     　　var scrollTop = $(this).scrollTop();
            //     　　var scrollHeight = $(document).height();
            //     　　var windowHeight = $(this).height();
            //     　　if(scrollTop + windowHeight == scrollHeight){
            //            $(".goAPPl").slideDown("slow"); 
            //     　　}else{
            //             p = $(this).scrollTop();
            //             if (t <= p) { //下滚                          
            //                 $(".goAPPl").slideUp("slow");                              
            //             } else { //上滚
            //                 $(".goAPPl").slideDown("slow"); 
            //             }
            //             setTimeout(function() {
            //                 t = p;
            //             }, 0);
            //         }
            //     });
            // },
            jumpApp(){              
                var data = {};            
                var geturl=self.location.href;            
                var id
                var re=geturl.split("?");  
                for(var i = 0;i<re.length;i++){             
                    if(re[i].indexOf("event")!=-1){
                        if(re[i].indexOf("&")!=-1){                           
                            var url_temp=[];
                            url_temp=re[i].split('&');                            
                            for(var j=0;j<url_temp.length;j++){                                                        
                                if(url_temp[j].indexOf("event")!=-1){                              
                                    var index = url_temp[j].indexOf("event="); 
                                    id= url_temp[j].substring(index + "event=".length);                                                                                                              
                                }
                            }
                        }else{
                            var index = geturl.indexOf("event=");
                            id=geturl.substring(index + "event=".length);
                        }
                        }
                    };
                linkedme.init("99fbdc474cea39f4e2c83ecd87e958ee", data, function(){});
                data.params = '{"path":"run/malasong","id":"'+id+'"}';                                 
                data.type = "live";                  
                data.tags = "a";
                data.ios_custom_url = "https://www.marathonbm.com/down/marathon"; 
                //data.ios_direct_open = "true"; 
                data.android_custom_url = "https://www.marathonbm.com/down/marathon";
                //data.android_direct_open = "true";    
                linkedme.link(data, function(err, response){
                    if(err){
                    // 生成深度链接失败，返回错误对象err                    
                    } else {                                
                        document.getElementById("openAPP1").href=response.url;
                    }
                },false); 
            },
            // init_share(){
            //     $.ajax({
            //         type:'get',
            //         url:'http://ceshi.marathonbm.com/config/signature',
            //         dataType:'JSON',
            //         data:{'accountId':'123456','requesturl':'http://html.hpaopao.com/'},
            //         success:function(data){                        
            //             var data=data.objectData;
            //             wx.config({
            //                 debug:true,
            //                 appId:data.appId,
            //                 timestamp:data.timestamp,
            //                 nonceStr:data.nonceStr,
            //                 signature:data.sign,
            //                 jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            //             }); 

            //             wx.ready(function(){
            //                 wx.onMenuShareAppMessage({
            //                     title:'重庆火锅接力赛',
            //                     desc:'分享链接免费吃火锅幺',
            //                     link:'http://www.baidu.com',
            //                     imgUrl:'http://www.hpaopao.com/paopao/default_photo.png',
            //                     success:function(){

            //                     }
            //                 });
            //                 wx.error(function(res){
            //                     console.log(res);
            //                 })
            //             }); 
            //         }
            //     });
            // }
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