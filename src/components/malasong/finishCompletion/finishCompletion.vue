<template>
    <div style="width:100%;height:100%;background:#f2f2f2">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <div class="finishCompletion">
            <div class="Completion_top" style="padding-top: 40px;">
                <div class="finishCompletion_number">参赛号码</div>
                <input type="text" placeholder="请输入参赛号码" class="finishCompletion_num" @change="finishCompletion_num($event)" :value="saveParams.compeitionNumber">
            </div>
            <div class="Completion_top">
                <div class="finishCompletion_number">完赛时间</div>
                <div style="height: 40px;line-height: 40px; width:70%">
                    <select @change="chooseHour($event)"  style="width:30%;padding-left:10px;border:0" name="finishHour">
                        <option :value="h" v-for="(h) in hour" :key="h" :v-model="endtime.hour">{{h|acName}}时</option>
                    </select>
                    <select  @change="chooseMinute($event)"  style="width:30%;padding-left:10px;border:0" name="finishMinute">
                        <option :value="m" v-for="(m) in minute" :key="m"  :v-model="endtime.minute">{{m|acName}}分</option>
                    </select>
                    <select  @change="chooseSecond($event)" style="width:30%;padding-left:10px;border:0" name="finishSecond">
                        <option :value="s" v-for="(s) in second" :key="s"  :v-model="endtime.second">{{s|acName}}秒</option>
                    </select>
                </div>
                                
                  <!-- <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="请选择完赛时间">
                </el-date-picker> -->
            </div>  
            <div class="Completion_prove">
                <div class="finishCompletion_upText">完赛证明上传</div>
                <label v-show="isCamera" class="addimage"><input type="file" accept="image/*" class="addimage-input" id="camera-upload" @change="file_upload()"/></label>
                <img v-for="(item,index) in commentImages" v-show="isPicture" :key="index" :src="item.image" style="width:6rem; height:6rem;" class="reciew_picture" :id="'commentImages_'+index" @touchstart.prevent="imgtouchstart(index,0)" @touchmove="imgtouchmove()" @touchend="imgtouchend(index)"/>
            </div> 
            <div class="up_Completion">
                <div class="finishCompletion_upText">赛道证明上传(最多可上传9张)</div>
                    <label v-show="isCamera" class="addimage"><input type="file" accept="image/*"  maxlength="9" class="addimage-input" id="camera_upfile" @change="image_upload()"/></label>
                    <img v-for="(item,index) in runCompletionImages" v-show="isPicture" :key="index" :src="item.image" style="width:6rem; height:6rem;" :id="'finishCompletionImages_'+index" class="reciew_picture" @touchstart.prevent="imgtouchstart(index,1)" @touchmove="imgtouchmove()" @touchend="imgtouchend(index)"/>
            </div> 
            <div class="get_Completion">
                <div class="finishCompletion_upText">成绩达标奖励</div>
                <div class="Completion_reward">
                     <div :class="checked == true ? 'finishCompletion_icon' :'finishCompletion_littleIcon'"></div>
                    <!-- <img src="../total_img/finishCompletion_reward.png" alt="" class="finishCompletion_icon"> -->
                    <label for="reward">奖金
                        <input name="current" type="radio" value="1" :checked="checked" id="reward" style="display:none" @change="radaioChange($event)">
                        </label>
                    <!-- <div class="finishCompletion_reward">奖金</div> -->
                </div>
                <div class="Completion_good">
                    <div :class="ischecked == true ? 'finishCompletion_icon' :'finishCompletion_littleIcon'"></div>
                     <!-- <img src="../total_img/finishCompletion_good.png" alt="" class="finishCompletion_littleIcon"> -->
                    <label for="good" >奖金所对应的实物<input name="current" :checked="ischecked" style="display:none" type="radio" value="2" id="good"  @change="goodchange($event)"></label>
                    
                    <!-- <div class="finishCompletion_good">奖金所对应的实物</div> -->
                </div>
            </div>
            <div style="clear:both"></div>  
          </div> 
        <div class="finishCompletion_Review" v-show="ensure" @click="ensureCheck">确认提交审核</div>
        <div class="finishCompletion_Review" v-show="wait" style="background:#999999">等待审核</div> 
        <div class="finishCompletion_Review" v-show="already">审核通过</div> 
        <div class="finishCompletion_Review" v-show="re" @click="ensureCheck">重新上传</div>         
    </div>
</template>
<style scoped>
@import './finishCompletion.css';
.el-input__inner{
    outline: none;
}
.el-input__prefix{
    display: none;
}
</style>
<script>
import { upload } from '../../../router/ajaxfileupload.js';
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'finishCompletion',
        filters: {
            acName(v){
                return (v+'').length == 1 ? '0' + v : v;
            },
        },
        data(){
            return{  
                endtime: {
                     hour: 0, 
                     minute: 0, 
                     second: 0 },               
                isCamera:true,
                commentImages:[],
                isPicture:true,
                url:this.global.storage.url,
                value1:'',
                runCompletionImages:[],
                saveParams:{"compeitionNumber":""}, 
                checked:true,
                ischecked:false,
                ensure:false,
                already:null,
                wait:null,
                re:null,
                timeOutEvent:0,
                hour:[0,1,2,3,4,5,6,7,8,9,10,11,12],
                minute:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
                second:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],

            }
        },
        created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '资料上传';    
        },
        mounted(){ 
            this.getverifyStatus();
            this.getuserInfo()
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            chooseHour(event){
                this.endtime.hour=event.target.value;
            },
            chooseMinute(event){
                this.endtime.minute=event.target.value;
            },
            chooseSecond(event){     
                this.endtime.second=event.target.value;
            },
             imgtouchstart:function gtouchstart(index,num){
                    var _this=this;
                  this.timeOutEvent = setTimeout(function(){
                        // if(confirm("确定删除图片")){
                            if(num==0){
                                delete _this.commentImages[index]["image"];
                                _this.commentImages.splice(index,1);
                               // $('#'+'commentImages_'+index).remove();
                                  _this.saveParams.completionCertificate='';
                                for(var ph = 0;ph<_this.commentImages.length; ph++){
                                    if(_this.commentImages[ph].image!=undefined){
                                        if(ph==_this.commentImages.length-1){                                            
                                            _this.saveParams.completionCertificate +=_this.commentImages[ph].image;
                                        }else{
                                            _this.saveParams.completionCertificate +=_this.commentImages[ph].image +',';
                                        }
                                    }                                
                                }   
                                clearTimeout(this.timeOutEvent);                     
                            }
                            if(num==1){
                                delete _this.runCompletionImages[index]["image"];
                                _this.runCompletionImages.splice(index,1);
                                //$('#'+'finishCompletionImages_'+index).remove();
                                _this.saveParams.runwayImage='';
                                for(var ph = 0;ph<_this.runCompletionImages.length; ph++){
                                    if(_this.runCompletionImages[ph].image!=undefined){
                                        if(ph==_this.runCompletionImages.length-1){
                                            _this.saveParams.runwayImage += _this.runCompletionImages[ph].image;
                                        }else{
                                            _this.saveParams.runwayImage +=_this.runCompletionImages[ph].image +',';
                                        }
                                    }
                                }
                                clearTimeout(this.timeOutEvent);
                            }                            
                            clearTimeout(this.timeOutEvent); 
                        // }
                  },700);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
                  return false;
              },
              //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
              imgtouchend:function gtouchend(item){
                  clearTimeout(this.timeOutEvent);//清除定时器
                  this.timeOutEvent = 0;
                  return false;
              },
              //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
              imgtouchmove:function gtouchmove(){
                  clearTimeout(this.timeOutEvent);//清除定时器
                  this.timeOutEvent = 0; 
              },
            getverifyStatus(){
                var _this=this;
                var verifyStatus=_this.$route.query.verifyStatus;
                if(verifyStatus==1){
                    _this.wait=true;
                     _this.ensure=false; 
                }else if(verifyStatus==2){
                    _this.already=true;
                     _this.ensure=false; 
                }else if(verifyStatus==3){
                    _this.re=true; 
                    _this.ensure=false;                    
                }else if(verifyStatus==10){
                    _this.ensure=true;                    
                }
            },
            radaioChange(event){
                this.checked=!this.checked; 
                this.ischecked=!this.ischecked;             
            },
            goodchange(event){
                this.checked=!this.checked; 
                this.ischecked=!this.ischecked;
            },
            image_upload(){
                var _this=this; 
                var formData=new FormData();
                formData.append("file",document.getElementById("camera_upfile").files[0]);
                formData.append("bucketPath","eventComent");
                $.ajax({
                    type:'POST',
                    //url:'https://192.168.2.17:8082/down/uploadImage',
                    url:_this.url+"/down/uploadImage",
                    data:formData,
                    contentType:false,
                    processData:false,
                    success:function(data){
                        if(data.code == 1){
                            if( _this.runCompletionImages.length>=9){
                                alert("图片最多只能上传9张哦~");
                            }else{                                
                                var image={'image':data.objectData};
                                _this.runCompletionImages.push(image);
                                var temp=_this.saveParams.runwayImage;
                                if(temp==undefined){
                                    _this.saveParams.runwayImage=data.objectData;
                                }else{
                                    _this.saveParams.runwayImage=(_this.saveParams.runwayImage+","+data.objectData);
                                }
                            }
                        }else{
                            alert("上传失败!");
                        }
                    }
                });
            },
             getuserInfo(){
                var _this=this;
                var id = _this.$route.query.userId;
                var entryId = _this.$route.query.entryId;
                var entryName =_this.$route.query.entryName;
                var ordertrade =_this.$route.query.ordertrade;
                var req = {};
                req.mobile = _this.global.storage.mobile;
                req.sessionid = _this.global.storage.sessionid;
                req.orderUserId = id;
                req.entryId = entryId;
                req.outTradeNo = ordertrade;
                var request = getSign(req,"e1bdc0f0a45a4ce5aa16b90a02851e2a");              
                $.ajax({
                    type:'POST', 
                    url:_this.url+'/app/mls/order/getEnrollInfo',
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                        if(data.objectData.finishTime!=undefined){
                             var finishCompletion_time=data.objectData.finishTime;
                            var Completion_time=parseInt(finishCompletion_time);
                            var days = Completion_time / 60 / 60 / 24;
                            var daysRound = Math.floor(days);
                            var hours = Completion_time / 60 / 60 - (24 * daysRound);
                            var hoursRound = Math.floor(hours);
                            var minutes = Completion_time / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                            var minutesRound = Math.floor(minutes);
                            var seconds = Completion_time - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                            var secondsRound = Math.floor(seconds);
                            daysRound=daysRound<=9?"0"+daysRound:daysRound;
                            hoursRound=hoursRound<=9?"0"+hoursRound:hoursRound;
                            minutesRound=minutesRound<=9?"0"+minutesRound:minutesRound;
                            secondsRound=secondsRound<=9?"0"+secondsRound:secondsRound;
                            //return v= hoursRound + "时" + minutesRound + "分" + secondsRound + "秒";
                            var hour=hoursRound;
                            _this.endtime.hour=hour;
                            document.getElementsByName("finishHour")[0].value=parseInt(hour);
                            var minute=minutesRound;
                            _this.endtime.minute=minute;
                            document.getElementsByName("finishMinute")[0].value=parseInt(minute);
                            var second=secondsRound;
                            _this.endtime.second=second;                            
                            document.getElementsByName("finishSecond")[0].value=parseInt(second);
                        }                       
                        if(data.objectData.bonus==true){
                            _this.checked=true;
                            _this.ischecked=false;
                        }else{
                            _this.checked=false;
                            _this.ischecked=true;
                        }
                        if(data.objectData.compeitionNumber!=undefined&&data.objectData.compeitionNumber!=""){                           
                            _this.saveParams.compeitionNumber=data.objectData.compeitionNumber;
                        }
                        if(data.objectData.runwayImage!=""&&data.objectData.runwayImage!=undefined){
                            var image=data.objectData.runwayImage.split(",");
                            for(var i in image){
                                var image_1={'image':image[i]};
                                if(image[i]!='undefined'){                                    
                                    _this.runCompletionImages.push(image_1);
                                }
                            }
                           _this.saveParams.runwayImage=(_this.saveParams.runwayImage+","+data.objectData.runwayImage);      
                           
                        }
                        if(data.objectData.completionCertificate!=""&&data.objectData.completionCertificate!=undefined){
                            var image=data.objectData.completionCertificate.split(",");
                            for(var i in image){
                                var image_1={'image':image[i]};
                                if(image[i]!='undefined'){
                                    _this.commentImages.push(image_1);
                               }
                            }
                            _this.saveParams.completionCertificate=(_this.saveParams.completionCertificate+","+data.objectData.completionCertificate);                     
                        }
                        
                    }
                }); 
            },  
            finishCompletion_num(event){
                this.saveParams.compeitionNumber=event.target.value;
            },
            file_upload(){                
                var _this=this; 
                var formData=new FormData();
                formData.append("file",document.getElementById("camera-upload").files[0]);
                formData.append("bucketPath","eventComent");
                $.ajax({
                    type:'POST',
                    //url:'https://192.168.2.17:8082/down/uploadImage',
                    url:_this.url+"/down/uploadImage",
                    data:formData,
                    contentType:false,
                    processData:false,
                    success:function(data){
                        if(data.code == 1){
                            if( _this.commentImages.length>=9){
                                 alert("图片最多只能上传9张哦~");
                            }else{
                                var image={'image':data.objectData};
                                _this.commentImages.push(image);
                                var temp=_this.saveParams.completionCertificate;
                                if(temp==undefined){
                                    _this.saveParams.completionCertificate=data.objectData;
                                }else{
                                    _this.saveParams.completionCertificate=(_this.saveParams.completionCertificate+","+data.objectData);
                                }
                            }                          
                        }else{
                            alert("上传失败!");
                        }
                    }
                });
            },
            ensureCheck(){ 
                var val=$('input:radio[name="current"]:checked').val(); 
                var _this=this;
                if(_this.saveParams.compeitionNumber==""||_this.saveParams.compeitionNumber==undefined){
                    alert("请输入参赛号码");
                }else if(_this.saveParams.completionCertificate==""||_this.saveParams.completionCertificate==undefined){
                    alert("请上传完赛证明");
                }else if(_this.saveParams.runwayImage==""||_this.saveParams.runwayImage==undefined){
                    alert("请上传赛道证明");
                }else{
                    var req;                    
                    req={'compeitionNumber':_this.saveParams.compeitionNumber};
                    if(val==2){
                        req.bonus=false;
                    }else{
                        req.bonus=true;
                    }   
                    req.completionCertificate=_this.saveParams.completionCertificate;
                    req.runwayImage=_this.saveParams.runwayImage;
                    req.finishTime=parseInt(_this.endtime.hour)*3600+parseInt(_this.endtime.minute)*60+parseInt(_this.endtime.second); 
                    // req.finishTime=finishTime_temp.toString();
                    req.updateId= _this.$route.query.userId;
                    var request = getSign(req,"e1bdc0f0a45a4ce5aa16b90a02851e2a");

                    $.ajax({
                        type:'POST', 
                        url:_this.url+'/app/mls/order/updateEnroll',
                        dataType:'JSON',
                        data:request,
                        success:function(data){
                            if(data.code==1){
                                if(data.code==1){
                                    alert("上传成功");
                                    window.history.back(-1); 
                                }else{
                                    alert(data.msg);
                                }
                            }
                        }
                    })
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