<template>
    <div class="resetMain">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <form  @submit.prevent="submit_password">
            <div class="reset_login_img">
                <img src="../total_img/malaslogo.jpg" class="reset_mid_img">  
            </div>
            <div class="">
                <div class="reset_log_mobile" style="margin-top:60px"> 
                     <img src="../total_img/linkman.png" class="reset_mobile_img">
                    <input placeholder="请输入手机号码" class="reset_log_num" autocomplete="phone" v-model="reset_info.mobile"  @click="resetfocus" @blur="resetblur">             
                </div>
                <div class="reset_log_mobile"> 
                     <img src="../total_img/10.png" class="reset_mobile_img"> 
                    <input placeholder="请输入验证码" class="reset_log_num" autocomplete="code" v-model="reset_info.identify_code" @click="resetfocus" @blur="resetblur"> 
                    <div class="reset_log_code" @click="getCode">{{msg}}</div>               
                </div>
                <div class="reset_log_mobile"> 
                     <img src="../total_img/11.png" class="reset_mobile_img">
                    <input placeholder="请输入新密码，且不少于8位" class="reset_log_num" type="password" autocomplete="current-password" v-model="reset_info.password"  @click="resetfocus" @blur="resetblur">             
                </div>
            </div>
            <!-- <div class="reset_button" @click="submit_password">重置密码</div> -->
            <input type="submit" value="重置密码" class="reset_button">
        </form>
    </div>
</template>
<style scoped>
@import './reset.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
import { getUrlParam } from '@/config/utils.js'
    export default {
        name: 'reset',
        data(){
            return{
                countNumber:60,
                reset_info:{},
                msg:'获取验证码',
                count: '',
                timer: null,
                url:this.global.storage.url              
            }
        },
       created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '重置密码';    
        },
        mounted(){  
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            resetfocus(){
                $(".resetMain").height("200"+"%");
            },
            resetblur(){
                 $(".resetMain").height("100"+"%");
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
                    alert("手机号码格式错误");
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
                var params=_this.reset_info;   
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                if(params==""||params==undefined){
                }else if(params.mobile==""||params.mobile==undefined){
                   alert("手机号码不能为空")
                }else if(params.identify_code==""||params.identify_code==undefined){
                   alert("验证码不能为空")
                }else{
                    $.ajax({
                        type:'POST', 
                        url:_this.url+"/basic/user/forgetPassword",
                        dataType:'JSON',
                        data:request,
                        success:function(data){
                            if(data.code==411){
                                alert("用户不存在");
                            }else if(data.code==409){
                                alert("短信验证码不正确");
                            }else{
                                alert("修改密码成功,去登陆~");
                                 _this.$router.push({ path: '/passwordlogin', query: {activity: getUrlParam('activity'), eventId: getUrlParam('eventId')}}); 
                            }
                        }                              
                    });  
                }                       
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