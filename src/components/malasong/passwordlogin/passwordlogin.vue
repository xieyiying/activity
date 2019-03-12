<template>
    <div class="passwordlogin">
        <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <!-- <img src="../total_img/goback.png" alt="" class="gobackIcon"  @click="lastPage"> -->
        <div class="password_login_img">
            <img src="../total_img/malaslogo.jpg" class="password_mid_img">
        </div>        
        <form @submit.prevent="submit_phone_password">
            <div class="login_info">
                <div class="password_log_mobile" style="margin-top:60px"> 
                    <img src="../total_img/linkman.png" class="password_mobile_img">  
                    <input placeholder="请输入手机号码" class="password_log_num" autocomplete="phone_num"  v-model="submit_info.mobile"  @focus="getfocus" @blur="lostfocus">             
                </div>
                <div class="password_log_mobile"> 
                    <img src="../total_img/11.png" class="password_mobile_img">   
                    <input placeholder="请输入密码" autocomplete="new-password"  class="password_log_num" type="password" v-model="submit_info.password" @focus="getfocus" @blur="lostfocus">              
                </div>
            </div>
            <div class="password_log_agree">
                <div @click="password_SignUp" class="blue_">新用户登录</div>
                <div class="forgetpassword" style="text-align:right" @click="forget_password">忘记密码?</div>
            </div>            
            <input type="submit" value="登录" class="passwordlogin_button">
            <div @click="password_SignUp" class="message_login">短信登录</div>
            <!-- <div class="passwordlogin_button">登录</div> -->
            <!-- <a href="" class="linkedme"  id="openAPP1" @click="jumpApp"> -->
                
               
            <!-- </a> -->
        </form>
    </div>
</template>
<style scoped>
@import './passwordlogin.css';
.linkedme{
    text-decoration: none;
    color: #000;
    display: block;
}

.blue_{color: blue; width: 50%; float: left;}
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
import { getUrlParam } from '@/config/utils.js'
    export default {
        name: 'passwordlogin',
         filters: {
            acName(v){
                return v.length>12 ? v.substr(0,12)+'...' : v;
            },
        },
        data(){
            return{
                submit_info:{},
                mobile:"",
                sessionid:"",
                url:this.global.storage.url,
                isActivity: ''           
            }
        },
        created() {
            this.isActivity = getUrlParam('activity')
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '密码登录';    
        },
        mounted(){ 
            //this.jumpApp();
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            getmaininfo(){

            },
            getfocus(){
                $(".passwordlogin").height("200"+"%");
            },
            lostfocus(){
                 $(".passwordlogin").height("100"+"%");
            },
            submit_phone_password: function() { 
                var _this=this;
                var submitinfo =JSON.stringify(_this.submit_info);
                var submit_detail= JSON.parse(submitinfo); 
                if(submit_detail==""||submit_detail.password==""||submit_detail.password==undefined){
                    alert("手机号或密码不能为空");                   
                }else if(!_this.validatemobile(submit_detail.mobile)){
                    alert("手机号码格式错误");
                }else{
                    var paramslogin;
                    paramslogin={'mobile':submit_detail.mobile};   
                    paramslogin.password=submit_detail.password;    
                    var request = getSign(paramslogin,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                    $.ajax({
                        type:'POST', 
                        url:_this.url+"/basic/user/login",
                        dataType:'JSON',
                        data:request,
                        success:function(data){
                            if(data.code==1){
                                 _this.global.storage.accountId=data.objectData.accountId;
                                _this.global.storage.sessionid=data.objectData.sessionId;
                                _this.global.storage.mobile=data.objectData.mobile; 
                                var param= _this.global.storage.mobile+":"+ _this.global.storage.sessionid+":"+ _this.global.storage.eventId+":"+_this.global.storage.accountId+":"+_this.global.storage.eventLabelId;
                                var getopenIdUrl=_this.global.storage.mobile+'_'+param+'_'+'htmlpay';
                                var ua = window.navigator.userAgent.toLowerCase();
                                //重定向 
                                if(ua.match(/MicroMessenger/i) == 'micromessenger'){                                     
                                    location.href='https://web.hpaopao.com/weixin/getOpenId?params='+getopenIdUrl;                                    
                                }else{
                                    // 是否参加活动
                                    if(_this.isActivity == 'activity') {
                                        _this.$router.push({
                                             path: '/powerActivity',
                                             query: {
                                                 accountId: _this.global.storage.accountId,
                                                 eventId: getUrlParam('eventId')
                                             }
                                        }); 
                                    } else {
                                        _this.$router.push({ path: '/detail'}); 
                                    }
                                    
                                }	 
                            }else{
                                alert(data.msg);
                            }
                        }                              
                    });  
                }
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
            // jumpApp(){             //    
            //     var data = {};            
            //     var geturl=self.location.href;            
            //     var id;
            //     var re=geturl.split("?");  
            //     for(var i = 0;i<re.length;i++){             
            //         if(re[i].indexOf("eventId")!=-1){
            //             if(re[i].indexOf("&")!=-1){                           
            //                 var url_temp=[];
            //                 url_temp=re[i].split('&');                            
            //                 for(var j=0;j<url_temp.length;j++){                                                        
            //                     if(url_temp[j].indexOf("eventId")!=-1){                              
            //                         var index = url_temp[j].indexOf("eventId="); 
            //                         id= url_temp[j].substring(index + "eventId=".length);                                                                                                              
            //                     }
            //                 }
            //             }else{
            //                 var index = geturl.indexOf("eventId=");
            //                 id=geturl.substring(index + "eventId=".length);
            //             }
            //             }
            //         };
            //     linkedme.init("99fbdc474cea39f4e2c83ecd87e958ee", data, function(){});
            //     data.params = '{"path":"/","id":"'+id+'"}';                                 
            //     data.type = "live";                  
            //     data.tags = "a";
            //      data.ios_custom_url = "http://www.marathonbm.com/down/marathon"; 
            //     // //data.ios_direct_open = "true"; 
            //      data.android_custom_url = "http://www.marathonbm.com/down/marathon";
            //     //data.android_direct_open = "true";
            //     linkedme.link(data, function(err, response){
            //         if(err){
            //         // 生成深度链接失败，返回错误对象err                    
            //         } else {                                
            //             document.getElementById("openAPP1").href=response.url;
            //         }
            //     },false);                
            // },
            forget_password(){
                this.$router.push({ path: '/reset', query: {activity: this.isActivity, eventId: getUrlParam('eventId')}})
            },
             password_SignUp(){
                this.$router.push({ path: '/Loginmalas', query: {activity: this.isActivity, eventId: getUrlParam('eventId')}})
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