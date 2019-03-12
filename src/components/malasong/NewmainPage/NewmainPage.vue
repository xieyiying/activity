<template>
    <div class="main_page">
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
             <!-- <div class="column"  id="searchBar" :class="searchBarFixed == true ? 'isFixed' :''">
                <ul> -->
                    <!-- <li>
                        <div class="add">赛事介绍</div>
                        <div class="column_middle_line" id="remove_class"></div>
                        <div class="column_bottom_line"></div>
                    </li>
                    <li>
                        <a href="" class="linkedme"  id="openAPP1"  @click="jumpApp">
                            <div class="add1">赛事新闻</div>
                            <div class="column_middle_line" id="remove_class"></div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="linkedme"  id="openAPP2"  @click="jumpApp">
                            <div class="add1">赛事住宿</div>
                            <div class="column_middle_line" id="remove_class"></div>
                        </a>
                    </li>
                    <li> 
                        <a href="" class="linkedme"  id="openAPP3"  @click="jumpApp">
                            <div class="add1">赛事出行</div>
                        </a>
                    </li> 
                     <li v-for="(item,index) in columnList" :key="index">
                        <div @click="addClass(index)" :class="{ add:index==current}">{{item.title}}</div>
                        <div class="column_middle_line" id="remove_class"></div>
                        <div :class="{column_bottom_line:index==current}"></div>
                    </li> --> 
                <!-- </ul>
            </div>  -->
            <div class="column_content">
                <div class="content_text" id="content_text">
                    {{content_text}}</div>                
            </div>
        </div>  
        <!-- <a href="" class="linkedme"  id="openAPP4"  @click="jumpApp"> -->
            <div class="main_page_button" @click="toLogin">
                <div class="click_button" v-show="canenroll" @click="toLogin">
                    我要报名
                </div>
                  <div class="click_button" style="background:#999999" v-show="cantenroll" @click="toLogin">
                    我要报名
                </div>
            </div> 
        <!-- </a>             -->
    </div>
</template>
<style scoped>
@import './NewmainPage.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'mainPage',
        filters: {
            acName(v){
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
                canenroll:true   
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
            this.getinfo();
            this.cacullate();
        },
        methods:{ 
            checkComments(){
                if(this.global.storage.mobile!=""&&this.global.storage.sessionid!=""&&this.global.storage.accountId!=""&&this.global.storage.accountId!=undefined&&this.global.storage.accountId!=undefined){                    
                    this.$router.push({ path: '/comments'})
                }else{ 
                    this.$router.push({ path: '/passwordlogin',query:{from:"comments"}});                    
                }
            },
            toLogin(){
                this.$router.push({ path: '/passwordlogin',query:{from:"login"}}); 
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
                        }
                    }
                };     
                params={'event':eventId};   
                params.module="ssjj";  
                params.label="webs"; 
                this.global.storage.eventId=eventId;                
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
                            var systemTime=data.systemTime;
                            var endtime=data.endDate;                      
                            var status=data.status;
                            if(status==1){
                                _this.mals_text="报名进行中"; 
                                _this.chaTime=endtime-systemTime;
                                _this.control_class=true;
                            }else{
                                _this.canenroll=false;
                                _this.cantenroll=true;
                                 _this.chaTime=0;
                                 _this.mals_text="报名已结束"; 
                                 _this.control_class=false;
                            }                          
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
            jumpApp(){
                var data={};
                var geturl=self.location.href;  
                var params;
                var temp=[];  
                var id;
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
                        //  document.getElementById("openAPP1").href=response.url;
                        //  document.getElementById("openAPP2").href=response.url; 
                        //  document.getElementById("openAPP3").href=response.url; 
                        //  document.getElementById("openAPP4").href=response.url; 
                        //  document.getElementById("openAPP5").href=response.url;  
                    }
                },false);
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