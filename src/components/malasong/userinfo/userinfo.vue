<template>
    <div class="userinfo">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <img src="../total_img/waitloading.gif" alt="" v-show="iconshow" class="wait">
        <div  v-show="!iconshow">
             <div class="userinfo_top">
            <div class="mine_info">我的报名信息</div>
            <ul>
                <li  v-for="(item,i) in list" :key="i">
                    <div v-if="item.formType!='image' && item.key!='expectFinishTime'"  class='userInfoitem'>
                        <div class="userInfotext">{{item.name}}</div>
                        <div class="userInfovalue" v-if="item.formType=='time'">{{value[i]|formdate}}</div> 
                        <div class="userInfovalue" v-else>{{value[i]}}</div>                     
                    </div>
                    <!-- <div v-if="item.formType!='image' && item.key=='expectFinishTime'"  class='userInfoitem'>
                        <div class="userInfotext">{{item.name}}</div>
                        <div class="userInfovalue">{{value[i]|formdate}}</div>                    
                    </div> -->
                    <div v-else   class='userInfoitem' style="height: auto;display: block;">
                        <div class="userInfotext" style="text-align:left">{{item.name}}</div>
                        <div v-if="item.key='runwayImage'">
                            <div v-for="(itemNew,ke) in value[i]" :key="ke" class='userInfoimage' :id="item.key">
                                <img :src="itemNew" alt="" class='imagelist'>
                            </div>                          
                        </div>      
                    </div>
                </li>
            </ul>
            <div v-for="(para,ke) in selectValus" :key="ke" style="color: #999999;font-size: 14px;margin-left: 15px;">
                <div class='userInfoitem'>{{para.firstGrade|size}}</div>
                <div class='userInfoitem'>{{para.secondGrade|size}}</div>
            </div>
        </div>              
        <div class="Logistics" v-show="isLogistics" @click="to_Logistics">
            <div class="Logistics_information">我的物流信息</div>
            <div class="Logistics_company">物流公司:<span style="color:#c7c7cd">{{Logistics_company}}</span></div>
            <div class="Logistics_number">物流单号:<span style="color:#c7c7cd">{{Logistics_number}}</span></div>
        </div>
            <div class="upfile" v-show="alreadyload">资料上传</div> 
            <div class="upfile" v-show="cantload" style="background:#999999">资料上传</div> 
            <div class="upfile" v-show="upload" @click="toUpfile">等待资料上传</div> 
            <div class="upfile" v-show="wait_verify" @click="toUpfile">等待审核</div>
            <div class="upfile" v-show="success_verify" @click="toUpfile" >审核通过</div> 
            <div class="upfile" v-show="failed_verify" @click="toUpfile">审核失败</div> 
             <!-- <div class="upfile" v-show="failed_verify" @click="toUpfile">审核失败</div>    -->
        </div>           
    </div>
</template>
<style scoped>
@import './userinfo.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'userinfo',
        filters: {
            size(v){
                return v.replace(/\_/g, "      ");
            },
            formdate(v){
                var days = v / 60 / 60 / 24;
                var daysRound = Math.floor(days);
                var hours = v / 60 / 60 - (24 * daysRound);
                var hoursRound = Math.floor(hours);
                var minutes = v / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
                var minutesRound = Math.floor(minutes);
                var seconds = v - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                var secondsRound = Math.floor(seconds);
                daysRound=daysRound<=9?"0"+daysRound:daysRound;
                hoursRound=hoursRound<=9?"0"+hoursRound:hoursRound;
                minutesRound=minutesRound<=9?"0"+minutesRound:minutesRound;
                secondsRound=secondsRound<=9?"0"+secondsRound:secondsRound;
                return v= hoursRound + "时" + minutesRound + "分" + secondsRound + "秒";
                // return v/1000
            },
        },
        
        data(){
            return{
                url:this.global.storage.url,
                list: [],
                value: [],
                Logistics_company:"暂无",
                Logistics_number:"暂无",
                isLogistics:null,
                upload:null,
                wait_verify:null,
                success_verify:null,
                failed_verify:null,
                verifyStatus:"",
                logisticsCode:"",
                itemNew:[],
                runwayImage:[],
                CertificateImage:[],
                selectValus:[],
                alreadyload:false,
                cantload:false,
                iconshow:true

            }
        },
        created:function () {
            document.getElementById('titleId').innerHTML = this.$route.query.entryName;
        }, 
        beforeCreate(){
           
        },
        mounted(){ 
            this.getuserInfo()
           
        },
        methods:{ 
            lastPage(){
                window.history.back(-1); 
            },
            to_Logistics(){
                var _this=this;
                _this.$router.push({ path: '/Logistics', query: {n:_this.Logistics_number,t:_this.logisticsCode,type:_this.Logistics_company}}); 
            },
            toUpfile(){
                var _this=this;
                var id = _this.$route.query.userId;
                var entryId = _this.$route.query.entryId;
                var entryName =_this.$route.query.entryName;
                var ordertrade =_this.$route.query.ordertrade;
                _this.$router.push({ path: '/finishCompletion', query: {userId:id,entryId:entryId,entryName:entryName,ordertrade:ordertrade,verifyStatus:_this.verifyStatus}}); 
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
                        _this.iconshow=false;
                        _this.selectValus=data.objectData.selectValus;
                        _this.list=data.list;
                        _this.isLogistics=data.isLogistics;
                        _this.upload=data.upload;
                        var alreadyload=data.upload;
                        var verifyStatus=data.verifyStatus;
                        _this.verifyStatus=data.verifyStatus;
                        var imageValidate=data.imageValidate;
                        if(imageValidate!=false){
                            if(alreadyload==true){                            
                                if(verifyStatus==1){
                                    _this.wait_verify=true;
                                    _this.upload=false;
                                }else if(verifyStatus==2){
                                    _this.success_verify=true;
                                    _this.upload=false;
                                }else if(verifyStatus==3){
                                    _this.failed_verify=true;
                                    _this.upload=false;
                                }else if(verifyStatus==10){
                                    _this.upload=true;  
                                }
                            }else{
                                _this.cantload=true;
                            }
                        }else{
                            _this.upload=false;  
                            _this.wait_verify=false;
                            _this.alreadyload=false;                          
                            _this.success_verify=false;
                        }
                        
                        if(data.objectData.photos!=undefined){                            
                             _this.runwayImage=(data.objectData.photos).split(",");
                        }
                        if(data.objectData.wansaizhengming!=undefined){
                              _this.CertificateImage=(data.objectData.wansaizhengming).split(",");
                        } 
                        if(data.logisticsCompany!=undefined){
                            _this.Logistics_company=data.logisticsCompany;
                        } 
                        if(data.logisticsNo!=undefined){                            
                            _this.Logistics_number=data.logisticsNo;
                        }                      
                        _this.logisticsCode=data.logisticsCode;
                        var data = data.objectData;
                        var cuvalueArray = [];
                        for (var i = 0; i < _this.list.length; i++) {
                            var key = _this.list[i].key;
                            if (_this.list[i].formType=="image"){
                                if(data[key]!=undefined){           
                                    var array = data[key].split(",");
                                    cuvalueArray.push(array);
                                }else{
                                    if(_this.list[i].name=="比赛照片"){
                                        if(data.photos!=undefined){                                            
                                            var array = data.photos.split(",");
                                            cuvalueArray.push(array);
                                        }else{
                                             cuvalueArray.push("");
                                        }
                                    }
                                    if(_this.list[i].name=="完赛证明"){
                                        if(data.wansaizhengming!=undefined){ 
                                            var array = data.wansaizhengming.split(",");
                                            cuvalueArray.push(array);
                                        }else{
                                            cuvalueArray.push("");
                                        }
                                    }
                                                                       
                                }
                            }else{
                                cuvalueArray.push(data[key]);
                            }
                        }
                        _this.value=cuvalueArray;
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