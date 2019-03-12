<template>
    <div class="detail">
         <!-- <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>   -->
        <img src="../total_img/gobacklittleIcon.png" alt="" class="gobackIcon"  @click="lastPage">
        <div class="detail_top" id="detail_topImage">
        <img :src="detail_img" alt="" class="detail_top_img" v-show="detailImgshow">
        </div>
        <div class="detail_info">
            <div>
                <div class="detail_title">{{match_title}}</div>
                <div class="match_middle">
                    <div class="match_detail_info">
                        <img src="../total_img/malasongtime.png" alt="" class="detail_img">
                        <div class="detail_time">比赛时间</div>
                        <div class="detail_place_info">{{match_time}}</div>
                    </div>
                     <!-- <div class="match_detail_info">
                        <img src="../total_img/position.png" alt="" class="detail_img">
                        <div class="detail_time">比赛地点</div>
                        <div class="detail_place_info">{{match_place}}</div>
                    </div> -->
                     <div class="match_detail_info">
                        <img src="../total_img/malasongselect.png" alt="" class="detail_img">
                        <div class="detail_time">报名截止</div>
                        <div class="detail_place_info">{{last_time}}</div>
                    </div>
                </div>
            </div>
            <!-- <div class="detail_line"> -->
                <!-- <input placeholder="请输入报名时填写的手机号码" class="enrollNumber" v-model="checkNum" @focus="numfocus" @blur="numblur"> -->
            <!-- </div> -->
            <div>
                <div class="match_project">报名项目</div>
                <div>
                    <ul>
                        <li class="project_temp" v-for="(item, i) in eventList" :key="i" >
                            <div class="project_left">
                                <div class="type_left">{{item.eventType}}</div>
                                <div class="type_text_left">{{item.dis}}</div>
                            </div>
                            <div class="project_right">
                                <div class="type_right" @click="signUp(item)">报名</div>
                                <div class="type_text_right">￥{{item.fee}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="checkenroll" @click="checkenroll()">报名查询</div>
        </div>
    </div>
</template>
<style scoped>
@import './detail.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'detail',
        data(){
            return{
                detail_img:"",
                match_title:"",
                match_time:"",
                last_time:"",
                match_place:"",
                eventList:[],
                url:this.global.storage.url,
                checkNum:"",
                detailImgshow:true     
            }
        },
       created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '赛事详情';    
        },
        mounted(){  
            this.detailgetinfo();
            this.getlist();
            this.cacullate()
        },
        methods:{  
            lastPage(){
                window.history.back(-1); 
            },
            cacullate(){
                var img_width=$("#detail_topImage").width();
                var img_height=(img_width/4)*2;
                $("#detail_topImage").height(img_height);
            },
            numfocus(){
                 $("#detail_topImage").css("position","relative");
                 $("#detail_info").css("position","absolute");
                //this.detailImgshow=false;
            },
            numblur(){
                //this.detailImgshow=true;
            },
            signUp(info){ 
                this.$router.push({ path: '/Registration', query: {                  
                    entryId:info.entryId,
                    eventTime:info.eventTime,
                    eventType:info.eventType,
                    fee:info.fee,
                    title:this.match_title,
                    }});
            },
            checkenroll(){
                // if (this.checkNum!=this.global.storage.mobile||this.checkNum==undefined||!this.validatemobile(this.checkNum)) {
                //     alert("请填写登录时的手机号码");                  
                // }else{                    
                    this.$router.push({ path: '/orderDetail'});
                // }                
            },
            detailgetinfo(){                   
                var geturl_temp=self.location.href;
                var geturl=unescape(geturl_temp);
                var re=geturl.split("?");
                var urldetail= re[1];
                if(urldetail!=undefined&&urldetail!=""){                        
                    if(urldetail.indexOf("params")!=-1){ 
                        var url_temp_detail=urldetail.split('=');
                        var temp_url=url_temp_detail[1];
                        var tryurl=temp_url.split(":");
                        this.global.storage.mobile=tryurl[0];
                        this.global.storage.sessionid=tryurl[1];
                        this.global.storage.eventId=tryurl[2];
                        this.global.storage.accountId=tryurl[3];
                        this.global.storage.eventLabelId=tryurl[4];
                        this.global.storage.url='https://app.marathonbm.com';
                    }
                }
                var params;                
                var _this = this;                 
                params={'event':_this.global.storage.eventId};   
                params.module="ssjj";
                params.label="webs";  
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                $.ajax({
                    type:'POST', 
                    //url:'https://192.168.2.17:8082/app/mls/article',
                    url:_this.url+"/app/mls/article",
                    dataType:'JSON',
                    data:request,
                    success:function(data){               
                        if(data.code==1){
                            _this.detail_img=data.eventImage;
                            _this.match_title=data.name;
                            var time=data.matchStartDate;
                            _this.match_time=_this.time(time);                         
                            var lastTime=data.endDate;
                            _this.last_time=_this.time(lastTime);                           
                        }else{
                            
                        } 
                    }
                }); 
            },
             validatemobile(mobile) {
                if (mobile == undefined) {
                    return false;
                }
                if (mobile.length == 0) {
                    return false;
                }
                if (mobile.length != 11) {
                    return false;
                }
                var myreg=new RegExp("^1[3|4|5|6|8|7]{1}[0-9]{9}$");
                //var myreg = /^0?(13[0-9]|15[0-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
                if (!myreg.test(mobile)) {
                    return false;
                }
                return true;
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
            getlist(){
                var params;             
                var _this = this;
                params={'eventId':_this.global.storage.eventId};  
                params.pageNo=1;
                params.pagesize=10;  
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");    
                $.ajax({
                    type:'POST', 
                    //url:'https://192.168.2.17:8082/app/mls/getEventEntryList',
                    url:_this.url+"/app/mls/getEventEntryList",
                    dataType:'JSON',
                    data:request,
                    success:function(data){  
                        if(data.code==1){
                            var eventlist=data.eventList;
                            // var match_time=_this.time(new Date(eventlist[0].matchStartDate));
                            var match_time=eventlist[0].matchStartDate;
                            for(var ke in eventlist){
                                var listTemp={};  
                                listTemp.eventTime=match_time;
                                listTemp.eventType=eventlist[ke].name;
                                listTemp.fee=eventlist[ke].fee;
                                listTemp.entryId=eventlist[ke].entryId;

                                // var matchType=eventlist[ke].name;
                                // var matchFee=eventlist[ke].fee;
                                // var entry_Id=eventlist[ke].entryId;
                                // listTemp.eventTime=match_time;
                                // listTemp.eventType=matchType;
                                // listTemp.fee=matchFee;
                                // listTemp.entryId=entry_Id;
                                _this.eventList.push(listTemp);
                            }
                        }else{                            
                            //alert(data.msg);
                        } 
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