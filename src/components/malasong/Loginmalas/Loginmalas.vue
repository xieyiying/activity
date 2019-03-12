<template>
    <div class="loginmalas">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <form @submit.prevent="submit_password">
            <div class="login_img">
                <img src="../total_img/malaslogo.jpg" class="mid_img">
            </div>
            <div class="login_info">
                <div class="log_mobile" style="margin-top:60px"> 
                    <img src="../total_img/linkman.png" class="mobile_img">  
                    <input placeholder="请输入手机号码" class="log_num" autocomplete="phone" v-model="reset_info.mobile" @click="loginfocus" @blur="loginlostfocus">                          
                </div>
                <div class="log_mobile"> 
                    <img src="../total_img/10.png" class="mobile_img">  
                    <input placeholder="请输入验证码" class="log_num" autocomplete="code" v-model="reset_info.code" @click="loginfocus" @blur="loginlostfocus"> 
                    <!-- <div class="log_code">获取验证码</div> -->
                    <div class="log_code" @click="getCode">{{msg}}</div>  
                </div>
            </div>
            <div class="log_agree"><div style="text-align:center">未注册手机验证后自动登录，</div><div style="text-align:center" @click="toagreement">注册即同意《马拉松报名协议》</div></div>
            <!-- <div class="log_button" @click="login">登录</div> -->
             <input type="submit" value="登录" class="log_button">
            <div @click="password_SignUp">使用账号密码登录</div>
        </form>
    </div>
</template>
<style scoped>
@import './Loginmalas.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
import { getUrlParam } from '@/config/utils.js'
    export default {
        name: 'Loginmalas',
        data(){
            return{
                countNumber:60,
                reset_info:{},
                msg:'获取验证码',
                count: '',
                timer: null,
                url:this.global.storage.url,
                isActivity: ''
            }
        },
       created() {
           this.isActivity = getUrlParam('activity')
           console.log(this.isActivity)
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '报名登录';    
        },
        mounted(){  
        },
        methods:{ 
            lastPage(){
                window.history.back(-1); 
            },
            toagreement(){
                this.$router.push({ path: '/accountAbout'});
            },
            loginfocus(){
                $(".loginmalas").height("200"+"%");
            },
            loginlostfocus(){
                 $(".loginmalas").height("100"+"%");
            },
             getCode(){
                 var _this=this;
                var num=_this.reset_info.mobile;
                var time_count = 60;
                var params;
                params={'mobile':num};    
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");   
                if(_this.validatemobile(num)){
                    if (!_this.timer) {
                        _this.count = time_count;
                        $.ajax({
                            type:'POST', 
                            url:_this.url+"/basic/user/identify",
                            dataType:'JSON',
                            data:request,
                            success:function(data){
                                if(data.code==1){

                                }
                            }                              
                        }); 
                        _this.timer = setInterval(() => {
                        if (_this.count > 0 && _this.count <= time_count) {                      
                                _this.count--;
                                _this.msg="重新发送"+_this.count;
                            } else {
                                clearInterval(this.timer);
                                _this.timer = null;
                                _this.msg="获取验证码";
                            }
                        }, 1000)
                    }
                }else{
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
            submit_password(){
                var _this=this;
                var num=_this.reset_info.mobile;
                var code=_this.reset_info.code;
                var params;                
                params={'mobile':num}; 
                params.identifyCode=code;    
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                  if(num==""||code==""||num==undefined||code==undefined){
                    alert("手机号或验证码不能为空");                   
                }else if(!_this.validatemobile(num)){
                    alert("手机号码格式错误");
                }else{  
                    $.ajax({
                        type:'POST', 
                        url:_this.url+"/basic/user/loginByIdentify",
                        dataType:'JSON',
                        data:request,
                        success:function(data){
                            if(data.code==1){
                                _this.global.storage.accountId=data.objectData.accountId;
                                _this.global.storage.sessionid=data.objectData.sessionId;
                                _this.global.storage.mobile=num; 
                                var param= _this.global.storage.mobile+":"+ _this.global.storage.sessionid+":"+ _this.global.storage.eventId+":"+_this.global.storage.accountId+":"+_this.global.storage.eventLabelId;
                                var getopenIdUrl=_this.global.storage.mobile+'_'+param+'_'+'htmlpay';
                                var ua = window.navigator.userAgent.toLowerCase(); 
                                //重定向
                                if(ua.match(/MicroMessenger/i) == 'micromessenger'){                                     
                                    location.href='https://web.hpaopao.com/weixin/getOpenId?params='+getopenIdUrl;                                    
                                }else{
                                    if(_this.isActivity == 'activity') {
                                        console.log("powerActivity",111)
                                        _this.$router.push({
                                             path: '/powerActivity',
                                             query: {
                                                 accountId: _this.global.storage.accountId,
                                                 eventId: getUrlParam('eventId')
                                             }
                                        }); 
                                    } else {
                                        console.log("detail", 222)
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
            password_SignUp(){
                this.$router.push({ path: '/passwordlogin', query: {eventId: getUrlParam('eventId'), activity: this.isActivity}})
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