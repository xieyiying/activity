<template>    
    <div class="addinfo">     
        <div class="dialog_bg"> <img alt="" src="../total_img/loading_.gif" /> </div>    
        <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <img src="../total_img/waitloading.gif" alt="" v-show="iconshow" class="wait"> 
        <div v-show="!iconshow">
        <div v-for="(item,ke) in forms" :key="ke">
            <div v-if="item.formType =='text'&&item.key != 'birthday'&&item.key != 'location'&&item.key!='finishTime'&&item.key!='expectFinishTime'" class="total_style">
                <div>{{item.name}}</div>
                <input v-if="item.formType == 'text'" v-model="request[item.key]" type="text"  :name=item.key  class="Addtext" autocomplete='name' :id=item.key :placeholder="'请输入'+item.name"/>
            </div>
            <div v-else-if="item.formType == 'select'&&item.key != 'birthday'&&item.key != 'location'&&item.key!='finishTime'&&item.key!='expectFinishTime'" class="total_style">
                <div>{{item.name}}</div>
                <el-select v-model="request[item.key]" @change="selectChange($event,item.key)" :placeholder="'请选择'+item.name">
                    <el-option
                    filterable = false
                    v-for="(select,sl) in item.secondList"
                    :key="sl"
                    :label="select.name"
                    :value="select.formValue">
                    </el-option>
                </el-select>
            </div>
            <div v-else-if="item.formType == 'radio'" class="total_style">
                <div>{{item.name}}</div>
                <div v-if="item.formType == 'radio'" class="choosecity">
                    <div v-for="(radio,ro) in item.secondList" :key="ro" class="addoption-div">
                        <input  type="radio" :name=item.key v-model="request[item.key]" class="addoption" :value=radio.formValue :id=radio.name> 
                        <label class="addoption" :for=radio.name>{{radio.name}}</label>
                    </div>
                </div>
            </div>
            <div v-else-if="item.key == 'location'"  class="total_style"> 
                <div>{{item.name}}</div>
                <v-distpicker :province="selectProvince.province" @province="changeProvince"
                :city="selectProvince.city" @city="changeCity"
                :area="selectProvince.area" @area="changeArea"
                class="form-control" autocomplete="off"  v-model="request[item.key]">
                </v-distpicker>
            </div>
            <div v-else-if="item.key == 'birthday'"  class="total_style"> 
                <div>{{item.name}}</div>
                <div style="height:40px">  
                    <el-date-picker
                        v-model="request[item.key]"
                        type="date"
                        placeholder="请选择生日"
                        :name = "item.key"
                        :editable = 'dateEdit'
                        @focus="getTime1($event,item.key)"
                        @blur="getTime1($event,item.key)"
                        >
                        </el-date-picker>            
                    <!-- <el-date-picker v-model="request[item.key]" @change="getTime1"  type="date" placeholder="请选择生日" :name = "item.key" :editable = 'dateEdit'>
                    </el-date-picker> -->
                </div>
            </div>
            <div div v-else-if="item.formType == 'time' &&item.key != 'birthday'&&item.key != 'expectFinishTime'&&item.key != 'finishTime'" class="total_style">
                 <div>{{item.name}}</div>
                <div class="datechoose">
                     <el-select v-model="hours[item.key]" placeholder="0时" 
                        @change="hoursChange($event,item.key)">
                        <el-option
                        v-for="(h) in hour"
                        :key="h"
                        :label="h+'时'"
                        :value="h"
                        >
                        </el-option>
                    </el-select>
                    <el-select v-model="minutes[item.key]" placeholder="0分" 
                        @change="secondsChange($event,item.key)">
                        <el-option
                        v-for="(m) in minute"
                        :key="m"
                        :label="m+'分'"
                        :value="m"
                        >
                        </el-option>
                    </el-select>
                    <el-select v-model="seconds[item.key]" placeholder="0秒" 
                        @change="minutesChange($event,item.key)">
                        <el-option
                        v-for="(s) in second"
                        :key="s"
                        :label="s+'秒'"
                        :value="s"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div v-else-if="item.key == 'expectFinishTime' &&item.key != 'birthday'" class="total_style">
                <div>{{item.name}}</div>
                <div class="datechoose">
                     <el-select v-model="request[item.key].hours" placeholder="0时">
                        <el-option
                        v-for="(h) in hour"
                        :key="h"
                        :label="h+'时'"
                        :value="h">
                        </el-option>
                    </el-select>
                    <el-select v-model="request[item.key].minutes" placeholder="0分">
                        <el-option
                        v-for="(m) in minute"
                        :key="m"
                        :label="m+'分'"
                        :value="m">
                        </el-option>
                    </el-select>
                    <el-select v-model="request[item.key].seconds" placeholder="0秒">
                        <el-option
                        v-for="(s) in second"
                        :key="s"
                        :label="s+'秒'"
                        :value="s">
                        </el-option>
                    </el-select>
                </div>
            </div>
             <div v-else-if="item.key == 'finishTime'" class="total_style">
                <div>{{item.name}}</div>
                <div class="datechoose">
                     <el-select v-model="request[item.key].hours" placeholder="0时">
                        <el-option
                        v-for="(h) in hour"
                        :key="h"
                        :label="h+'时'"
                        :value="h">
                        </el-option>
                    </el-select>
                    <el-select v-model="request[item.key].minutes" placeholder="0分">
                        <el-option
                        v-for="(m) in minute"
                        :key="m"
                        :label="m+'分'"
                        :value="m">
                        </el-option>
                    </el-select>
                    <el-select v-model="request[item.key].seconds" placeholder="0秒">
                        <el-option
                        v-for="(s) in second"
                        :key="s"
                        :label="s+'秒'"
                        :value="s">
                        </el-option>
                    </el-select>
                </div>
            </div>    
            <div v-else-if="item.formType == 'image'" class="total_style">
                <div>{{item.name}}</div>
                <div class="review_photo">                    
                    <label v-show="isCamera" class="addimage" >
                        <input type="file" accept="image/*" class="addimage-input" :id="'camera-upload_'+ke" @change="file_upload($event,item.key,ke)" maxlength="9"/>
                    </label>   

                    <div v-for="(item_it,index_it) in image_temp" :key="index_it">
                        <div v-if="item_it.paramkey == item.key">
                            <img v-for="(item_image,index_image) in item_it.imagelist" :key="index_image" :src="item_image"  style="width:4rem; height:4rem;" :id="'deteteImg'+index_it" @touchstart="gtouchstart(item_image,'deteteImg'+index_it,item_it.paramkey)" @touchmove="gtouchmove()" @touchend="gtouchend(index_it)" />
                        </div>
                    </div>                
                </div>                                 
            </div>
        </div>
        <div>
            <div v-for="(item,i) in selectListArray" :key="i" v-show="isSelect" class="total_style">
                 <div>{{item.name}}</div>
                <el-select :placeholder="'请选择'+item.name" v-model="selectTemplist[i]" @change="changeList($event,i)">
                    <el-option
                    filterable = false
                    v-for="(select,sl) in item.p"
                    :key="sl"
                    :label="select"
                    :value="select">
                    </el-option>
                </el-select>
                 <div>{{item.selectName}}</div>
                <el-select  :placeholder="'请选择'+item.selectName" v-model="selectTemplistArray[i]">
                    <el-option
                    filterable = false
                    v-for="(select,sl) in item.c"
                    :key="sl"
                    :label="select"
                    :value="select">
                    </el-option>
                </el-select>
            </div>
            <!-- 级联选择 -->
            <!-- <div v-for="(size,i) in selectListArray" :key="i" v-show="isSelect" class="total_style">
                <div>{{size.name}}</div>
                <div style="position:relative">
                        <select :name="'Label_'+i" @change="indexSelect($event,i)" :id="'Label_'+i" class="choosse_"> 
                        <option v-for="(select,ke) in JSON.parse(size.params)" :key="ke" :value=select.p autocomplete="off">{{select.p}}</option>
                    </select>
                    <div class="el-icon-arrow-down" style="position:absolute;right:5px;top: 12px;"></div>
                </div>
                <div style="position:relative">
                    <div>{{size.selectName}}</div>
                    <select :id="'select_'+i" :name="'select_'+i" autocomplete="off">
                    </select> 
                    <div class="el-icon-arrow-down" style="position:absolute;right: 5px;top: 35px;"></div>   
                </div>                                            
            </div> -->
        </div>
            <div class="total_style" style="display:flex">
                <input type="checkbox" class="check_box" value="1" name="conent" id="addinputbox" checked v-model="ifcheck" @change="changebox">
                <div class="addinfo_agree" @click="agreeContent" id="addinfocheckbox">我已阅读并同意参赛选手声明</div>
            </div>
            <div class="addinfo_button">
                <input value="提交" type="button" id="checkbox" class="addinfo_click_button" @click="submit_save()" v-show="checkboxShow">
                <input value="提交" type="button" id="checkbox" class="addinfo_click_button" style="background:#999999" v-show="!checkboxShow">
            </div>   
        </div>
    </div>
</template>
<style>
@import './addinfo.css'; 
.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #e4e4e4!important;
    height: 30px!important;
    line-height: 30px!important;
    border-radius: 0px!important;
    border: 0!important;
}
.el-date-editor.el-input, .el-date-editor{
    width: 100%!important;
    height: 40px!important;
}
.distpicker-address-wrapper select{
    -webkit-appearance: none!important;
} 
.display_none{display:none;}
.dialog_bg{width:100%; height:100%; line-height:100%; background:rgba(0,0,0,0.36); position:fixed; bottom:0; text-align:center; margin:auto; z-index:206; display:none;}
.dialog_bg img{width:16.16rem; height: 8rem; margin-top:22rem; border: 0;}
</style>
<script>
import { citys } from '../../../router/city.js';
import { hexMD5 } from '../../../router/Md5.js';
import { upload } from '../../../router/ajaxfileupload.js';
import VDistpicker from 'v-distpicker';
    export default {        
         components: {
            VDistpicker,        
    },
        name: 'addinfo',
         filters: {
            acName(v){
                return (v+'').length == 1 ? '0' + v : v;
            },
        },
        data(){
            return{
                url:this.global.storage.url,
                isCamera:true,
                commentImages:[],
                valueArray:[],
                params:[],
                checked:null,
                userinfo:[],
                secondList:[],
                forms:[],
                images:'',
                photos_:[],
                wansaizhengming_:[],
                healthCertificate_:[],
                photopaopao_:[],
                other_:[],
                beizidingzhi_:[],
                save_params:{},
                selectProvince: { province: '浙江省', city: '杭州市', area: '西湖区' } ,
                selectListArray:[],
                hour:[0,1,2,3,4,5,6,7,8,9,10,11,12],
                minute:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
                second:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59], 
                isSelect:null,
                para:[],
                timeOutEvent:0,
                eventTotalList:[],
                yearselect:[],
                monthselect:[],
                dayselect:[],
                iconshow:true,
                request:{
                    finishTime:{hours:0,minutes:0,seconds:0},
                    expectFinishTime:{hours:0,minutes:0,seconds:0},
                    completionCertificate:'',
                    runwayImage:'',
                    healthCertificate:''
                },
                ifcheck:true,
                checkboxShow:true,
                dateEdit:false,
                selectTemplist:[],
                arraySelect:[],
                selectTemplistArray:[],
                hours:[],
                minutes:[],
                seconds:[],
                image_temp:[]
            }
        },     
        created:function () {           
    
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '个人信息详情';    
        },
        mounted(){ 
           this.getEventDyncList();
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            getTime1(sel,key){
                this.$set(this.request,this.request[key], sel);
            },
            hoursChange(sel,key){
                this.$set(this.hours,this.hours[key], sel);
            },
            minutesChange(sel,key){
                this.$set(this.minutes,this.minutes[key], sel);
            },
            secondsChange(sel,key){
                this.$set(this.seconds,this.seconds[key], sel);
            },
            selectChange(sel,key){
                this.$set(this.request,this.request[key], sel);
            },
            changeList(sel,key){
                var params=JSON.parse(this.arraySelect[key].params);
                for(var ke in params){
                    if(sel==params[ke].p){
                        this.selectListArray[key].c=params[ke].c; 
                        this.selectTemplistArray[key]=params[ke].c[0];
                    }
                }
                this.arraySelect[key];
            },
            gtouchstart:function gtouchstart(item,index,keys){
                var _this=this;
                  this.timeOutEvent = setTimeout(function(){
                      for(var i=0;i<_this.image_temp.length;i++){
                          if(keys == _this.image_temp[i].paramkey){
                              for(var j=0;j<_this.image_temp[i].imagelist.length;j++){
                                  if(item == _this.image_temp[i].imagelist[j]){
                                      delete _this.image_temp[i].imagelist[j];
                                      break;
                                  }
                              }
                              break;
                          }
                      }
                      $("#"+index).remove();                     
                  },700);
                  return false;
              },
            gtouchend:function gtouchend(item){
                clearTimeout(this.timeOutEvent);
                this.timeOutEvent = 0;
                return false;
            },
            gtouchmove:function gtouchmove(){
                clearTimeout(this.timeOutEvent);
                this.timeOutEvent = 0; 
            },
            changebox(){
                var checkboxItem=this.ifcheck;
                if(checkboxItem==true){
                    $('#addinfocheckbox').css('color','#000');
                    this.checkboxShow=true;
                }else{
                    $('#addinfocheckbox').css('color','#999999');
                    this.checkboxShow=false;
                }
            },
            changeProvince(a) {
                this.selectProvince.province = a.value;
            },
            changeCity(b) {
                this.selectProvince.city = b.value;
            },
            changeArea(c) {
                this.selectProvince.area = c.value;
            },              
            agreeContent(){
                this.$router.push({ path: '/infocontent'});                 
            },   
            getEventDyncList(){           
                var _this = this;
                var entryId=_this.$route.query.entryId;
                var params;
                params={'entryId':entryId};   
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");    
                var modify=_this.$route.query.modify;   //true 修改
                var personid=_this.$route.query.personid;
                $.ajax({
                    type:'POST', 
                    url:_this.url+'/app/mls/getEventDyncList',
                    dataType:'JSON',
                    data:request,
                    success:function(data){  
                        _this.iconshow=false;
                        if(data.code==1 && data.eventList != undefined){
                            _this.eventTotalList=data.eventList;
                            var isSelect=data.isSelect;
                            if(isSelect==true){
                                _this.isSelect=true;
                                var selectArrayList=data.selects;
                                _this.arraySelect=data.selects;
                                var selectArray=[];
                                for(var ke in selectArrayList){   
                                    var selectTemp={};
                                    selectTemp.name=selectArrayList[ke].name;
                                    selectTemp.selectName=selectArrayList[ke].selectName;
                                    selectTemp.p=[];
                                    selectTemp.c=[];
                                    selectTemp.id=selectArrayList[ke].id;
                                    selectTemp.label='label'+ke;
                                    selectTemp.labelchoose='labelchoose'+ke;
                                    selectArray.push(selectTemp);
                                    var params=JSON.parse(selectArrayList[ke].params);                                    
                                    for(var i in params){
                                        selectTemp.p.push(params[i].p);
                                        selectTemp.c=params[0].c;
                                    }
                                }
                                _this.selectListArray=selectArray;
                            }else{
                                _this.isSelect=false;
                            }
                            var eventList=data.eventList;                                               
                            if(modify){
                                $.ajax({
                                    type:'POST',
                                    url:_this.url+'/app/user/getEnrollUserById',
                                    dataType:'JSON',
                                    data:{"personId":personid,'entryId':entryId},
                                    success:function(data){
                                        var selectValus=data.objectData.selectValus;
                                        if(isSelect){
                                            if(selectValus!=undefined&&selectValus!=''&&selectValus.length!=0){
                                                for(var index in selectValus){
                                                    var secondGradeValue = selectValus[index].secondGrade;
                                                    var firstGradeValue = selectValus[index].firstGrade;
                                                    var secondGrade = secondGradeValue.split('_');
                                                    var firstGrade = firstGradeValue.split('_');
                                                    _this.selectTemplist[index]=firstGrade[1]
                                                    _this.selectTemplistArray[index]=secondGrade[1];
                                                }
                                            }
                                        }
                                        var objectData=data.objectData;    
                                        for(var ke in eventList){
                                            for(var t in objectData){ 
                                                if(eventList[ke].key == t){   
                                                    if(eventList[ke].key=="finishTime"){
                                                        if(objectData[t]!=""){
                                                            var finishTime=parseInt(objectData[t]);  
                                                            _this.request.finishTime={hours:Math.floor(finishTime/3600),minutes:Math.floor(finishTime%3600/60),seconds:finishTime%3600%60};
                                                        }    
                                                    }else if(eventList[ke].key=="expectFinishTime"){
                                                        if(objectData[t]!=""){
                                                            var expectFinishTime=parseInt(objectData[t]);      
                                                            _this.request.expectFinishTime={hours:Math.floor(expectFinishTime/3600),minutes:Math.floor(expectFinishTime%3600/60),seconds:expectFinishTime%3600%60};
                                                        }    
                                                    }else{                                        
                                                        _this.request[eventList[ke].key]=objectData[t];
                                                    } 
                                                    if(eventList[ke].formType=="time"){
                                                        var valueKey=parseInt(objectData[t]);
                                                        _this.hours[eventList[ke].key]=Math.floor(valueKey/3600);
                                                        _this.minutes[eventList[ke].key]=Math.floor(valueKey%3600/60);
                                                        _this.seconds[eventList[ke].key]=valueKey%3600%60;
                                                    }
                                                    if(eventList[ke].formType == "image"){ 
                                                        var images=objectData[t].split(",");                                                        
                                                        var image_temp=_this.image_temp;
                                                        if(image_temp.length>0){
                                                            var flag_image=false;
                                                            for(var i=0;i<image_temp.length;i++){
                                                                if(image_temp[i].paramkey == t){
                                                                    if(image_temp[i].imagelist.length>=9){
                                                                        alert("图片最多只能上传9张哦~");
                                                                    }else{
                                                                        _this.image_temp[i].imagelist.push(images);
                                                                    }
                                                                    flag_image=true;
                                                                    break;
                                                                }
                                                            }
                                                            if(!flag_image){
                                                                var image_t={paramkey:t,imagelist:images};
                                                                _this.image_temp.push(image_t);
                                                            }
                                                        }else{
                                                            var image_t={paramkey:t,imagelist:images};
                                                            _this.image_temp.push(image_t);
                                                        }
                                                    }else{
                                                    } 
                                                     if(eventList[ke].key=="location"){
                                                        if(objectData[t]!=""){
                                                            var location=objectData[t].split(',');
                                                            _this.selectProvince.province= location[0]; 
                                                            _this.selectProvince.city=location[1];   
                                                            _this.selectProvince.area=location[2];
                                                        }    
                                                    }                                        
                                                    break;                                                                                                                                                       
                                                }
                                            }
                                        }
                                        _this.forms=eventList;  
                                    }
                                });
                            }else{
                                _this.forms=eventList; 
                            }
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
                var myreg=new RegExp("^1[3|4|5|6|8|7]{1}[0-9]{9}$");
                if (!myreg.test(mobile)) {
                    return false;
                }
                return true;
            },
            file_upload(e,name,ke){ 
                var _this=this; 
                var formData=new FormData();
                    formData.append("file",document.getElementById("camera-upload_"+ke).files[0]);
                    formData.append("bucketPath","eventComent");
                    $.ajax({
                        type:'POST',
                        url:_this.url+'/down/uploadImage',
                        data:formData,
                        contentType:false,
                        processData:false,            		
                        beforeSend:function(){
                            $('.dialog_bg').show();
                        },
                        success:function(data){
                            if(data.code == 1){
                                var image_temp=_this.image_temp;
                                if(image_temp.length>0){
                                    var flag_image=false;
                                    for(var i=0;i<image_temp.length;i++){
                                        if(image_temp[i].paramkey == name){
                                            if(image_temp[i].imagelist.length>=9){
                                                alert("图片最多只能上传9张哦~");
                                            }else{
                                                _this.image_temp[i].imagelist.push(data.objectData);
                                            }           
                                            flag_image=true;                                 
                                        }
                                    }
                                    if(!flag_image){
                                        var image_t={paramkey:name,imagelist:[data.objectData]};
                                        _this.image_temp.push(image_t);
                                    }
                                }else{
                                    var image_t={paramkey:name,imagelist:[data.objectData]};
                                    _this.image_temp.push(image_t);
                                }
                                console.log(_this.image_temp);                                      
                            }else{
                                alert("上传失败!");
                            }
                        },
                        complete:function(){
                            $('.dialog_bg').hide();
                        }                     
                    });      
               
            },
            submit_save(){                
                var flag=true;
                var _this=this;
                var dynamicForm=[];
                var request_params={};              
                for(var ke in  _this.eventTotalList){
                    var key=_this.eventTotalList[ke].key;
                        if(_this.eventTotalList[ke].dynamic==true){
                            if(_this.eventTotalList[ke].required==true){                              
                                var value=_this.request[key];                                
                                if(_this.eventTotalList[ke].formType=='time'){
                                    if(_this.hours[key]==undefined||_this.hours[key]==''){
                                        _this.hours[key]=0;
                                    }
                                    if(_this.minutes[key]==undefined||_this.minutes[key]==''){
                                        _this.minutes[key]=0;
                                    }
                                    if(_this.seconds[key]==undefined||_this.seconds[key]==''){
                                        _this.seconds[key]=0;
                                    }
                                    var dynamicValue=parseInt(_this.hours[key])*3600+parseInt(_this.minutes[key])*60+parseInt( _this.seconds[key]);
                                    var dynamicTemp={};                     
                                    dynamicTemp.id=_this.eventTotalList[ke].id;
                                    dynamicTemp.column=_this.eventTotalList[ke].key;
                                    dynamicTemp.value=dynamicValue;
                                    dynamicForm.push(dynamicTemp);
                                }else{
                                    if((value==undefined||value=="") &_this.eventTotalList[ke].formType != "image"){
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");
                                        alert('请输入'+_this.eventTotalList[ke].name);                                       
                                        flag=false;
                                        break;
                                    }else{
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:0;");
                                        var dynamicTemp={};                     
                                        dynamicTemp.id=_this.eventTotalList[ke].id;
                                        dynamicTemp.column=_this.eventTotalList[ke].key;
                                        if(_this.eventTotalList[ke].dynamic && _this.eventTotalList[ke].formType =="image"){
                                             var request_image=_this.image_temp; 
                                             if(request_image!=null){
                                                 for(var i=0;i<request_image.length;i++){                                                     
                                                     if(request_image[i].paramkey == _this.eventTotalList[ke].key){
                                                         var t_m="";
                                                         for(var j=0;j<request_image[i].imagelist.length;j++){
                                                             if(request_image[i].imagelist[j] == null || request_image[i].imagelist[j] == undefined)
                                                                  continue;
                                                             t_m+=(request_image[i].imagelist[j]+",");
                                                         }
                                                        dynamicTemp.value=t_m.substring(0,t_m.length-1);
                                                        break;
                                                     }
                                                 }
                                             }else{
                                                alert('请上传'+_this.eventTotalList[ke].name); 
                                                flag=false; 
                                             }
                                        }else{
                                            dynamicTemp.value=_this.request[key];
                                        }
                                        dynamicForm.push(dynamicTemp); 
                                    }                                    
                                }
                                
                            }else{
                                 if(_this.eventTotalList[ke].formType=='time'){
                                    if(_this.hours[key]==undefined||_this.hours[key]==''){
                                        _this.hours[key]=0;
                                    }
                                    if(_this.minutes[key]==undefined||_this.minutes[key]==''){
                                        _this.minutes[key]=0;
                                    }
                                    if(_this.seconds[key]==undefined||_this.seconds[key]==''){
                                        _this.seconds[key]=0;
                                    }
                                    var dynamicValue=parseInt(_this.hours[key])*3600+parseInt(_this.minutes[key])*60+parseInt( _this.seconds[key]);
                                    var dynamicTemp={};                     
                                    dynamicTemp.id=_this.eventTotalList[ke].id;
                                    dynamicTemp.column=_this.eventTotalList[ke].key;
                                    dynamicTemp.value=dynamicValue;
                                    dynamicForm.push(dynamicTemp);
                                 }else{                                     
                                    var value=_this.request[key];
                                    var dynamicTemp={};                     
                                    dynamicTemp.id=_this.eventTotalList[ke].id;
                                    dynamicTemp.column=_this.eventTotalList[ke].key;
                                    dynamicTemp.value=_this.request[key];
                                    dynamicForm.push(dynamicTemp); 
                                 }
                            }
                        
                        }else{
                            if(_this.eventTotalList[ke].formType=="text"){                                
                                if(_this.eventTotalList[ke].key=='emergencyPhone'||_this.eventTotalList[ke].key=="mobileNum"){
                                    var value=_this.request[key];
                                    if(!_this.validatemobile(value)){                                     
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");                                  
                                        alert('请输入正确的'+_this.eventTotalList[ke].name);   
                                        flag=false;                                                            
                                        break;
                                    }else if(_this.request['emergencyPhone'] == _this.request['mobileNum']){
                                        alert("手机号码与紧急联系人电话不能相同");
                                        return
                                    }
                                    else{                                       
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:0;");
                                        request_params[key]=value;
                                    }
                                }else if(_this.eventTotalList[ke].key =='email'){                                         
                                    var value=_this.request[key];
                                    var email = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
                                    if(value==undefined||value==""){
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");     
                                        alert('请输入正确的'+_this.eventTotalList[ke].name); 
                                        flag=false;                                                            
                                        break; 
                                    }else{                                    
                                        if(!value.match(email)){                                     
                                            $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");    
                                            alert('请输入正确的'+_this.eventTotalList[ke].name); 
                                            flag=false;                                                            
                                            break;  
                                        }else{                                   
                                            $('#'+_this.eventTotalList[ke].key).attr("style","border:0;");
                                            request_params[key]=value;
                                        }
                                    }
                                }else if(_this.eventTotalList[ke].key=='cardId'){
                                    var value=_this.request[key];
                                    if(value!=undefined&&value!=''){
                                        var cardType=_this.request['cardType'];
                                        if(cardType=='身份证'){
                                            var regexp=new RegExp("^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$");
                                            if(!value.match(regexp)){
                                                $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");    
                                                alert('请输入正确的身份证号码');
                                                flag=false;
                                                break;
                                            }else{
                                                $('#'+_this.eventTotalList[ke].key).attr("style","border:0;");
                                                request_params[key]=value;
                                                flag=true;
                                            }
                                        }else if(cardType=='护照'){
                                            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                                            if(reg.test(value)){     
                                                $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;"); 
                                                alert('护照格式错误');                                              
                                                flag=false;
                                                break; 
                                            }else{
                                                $('#'+_this.eventTotalList[ke].key).attr("style","border:0;");
                                                request_params[key]=value;
                                                flag=true;
                                            }
                                        }
                                    }else{
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");    
                                        alert('请输入'+_this.eventTotalList[ke].name);
                                        flag=false;
                                        break;                                
                                    }
                                    
                                }else{
                                    var value = _this.request[key];
                                    if((value==undefined||value==null||value=="")){                            
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:1px solid #ff0000;");
                                        alert('请输入'+_this.eventTotalList[ke].name); 
                                        flag=false;                         
                                        break;
                                    }else{
                                        if(_this.eventTotalList[ke].key=='name' || _this.eventTotalList[ke].key=='emergencyContact'){
                                            if(_this.request['name'] == _this.request['emergencyContact']){
                                                alert('联系人和紧急联系人不能相同'); 
                                                flag=false;  
                                                break;
                                            }
                                        }
                                        $('#'+_this.eventTotalList[ke].key).attr("style","border:0;");
                                        flag=true;         
                                        request_params[key]=value;                              
                                    }
                                }                            
                            }else if(_this.eventTotalList[ke].formType=="radio"||_this.eventTotalList[ke].formType=="select"||_this.eventTotalList[ke].formType=="time"){
                                if(key=="location"){
                                    request_params[key]=_this.selectProvince.province+","+_this.selectProvince.city+","+_this.selectProvince.area;
                                }else if(key=="expectFinishTime"){
                                    request_params[key]=parseInt(_this.request[key].hours)*3600+parseInt(_this.request[key].minutes)*60+parseInt(_this.request[key].seconds);
                                }else if(key=="finishTime"){
                                    request_params[key]=parseInt(_this.request[key].hours)*3600+parseInt(_this.request[key].minutes)*60+parseInt(_this.request[key].seconds);
                                }else if(key=="birthday"){
                                    var value=_this.request[key];
                                    if(value==""||value==undefined){
                                        alert('请选择'+_this.eventTotalList[ke].name);
                                        flag=false;                         
                                        break; 
                                    }else{
                                        var date=_this.request[key];
                                        var now = new Date(date);
                                        var year = now.getFullYear();
                                        var month =(now.getMonth() + 1).toString();
                                        var day = (now.getDate()).toString();
                                        request_params[key]=year+'-'+month+'-'+day;
                                    }
                                }
                                else{                                
                                    var value = _this.request[key];
                                    if((value==undefined||value==null||value=="")){
                                        alert('请选择'+_this.eventTotalList[ke].name); 
                                        flag=false;                         
                                        break;
                                    }else{
                                        flag=true;         
                                        request_params[key]=value;                              
                                    }
                                }
                            }else if(_this.eventTotalList[ke].formType=="image"){
                                var request_image=_this.image_temp;
                                if(request_image!=undefined){
                                    for( var i=0;i<request_image.length;i++){
                                        var t_m="";
                                        for(var j=0;j<request_image[i].imagelist.length;j++){
                                            t_m+=(request_image[i].imagelist[j]+",");
                                        }
                                        request_params[request_image[i].paramkey]=t_m.substring(0,t_m.length-1);
                                    }
                                    flag=true; 
                                }else{
                                    alert('请上传'+_this.eventTotalList[ke].name); 
                                    flag=false;  
                                }                       
                            }
                        }                                
                }                
                request_params.dynamicForm=JSON.stringify(dynamicForm);
                var personid=_this.$route.query.personid;
                var selectListArray = _this.selectListArray; 
                var para=[];     
                for(var ke in selectListArray){
                    var example={}; 
                    // var firstLabel = $("#Label_"+ke+" "+"option:selected").val();
                    // var secondLabel = $("#select_"+ke+" "+"option:selected").val();
                    var firstLabel =this.selectTemplist[ke];
                    var secondLabel = this.selectTemplistArray[ke];
                    example.firstLabel=selectListArray[ke].name;
                    example.secondLabel=selectListArray[ke].selectName;
                    example.id=selectListArray[ke].id;
                    example.firstValue=firstLabel;
                    example.secondValue=secondLabel;
                    para.push(example);
                }
                         if(flag){
                            if(_this.isSelect){       
                                for(var ke in para){
                                    if(para[ke].secondValue=='null'||para[ke].secondValue==""||para[ke].secondValue==undefined){
                                        flag=false; 
                                        break;
                                    }else{                                 
                                        flag=true; 
                                        request_params.isSelect=true;                          
                                        request_params.params=JSON.stringify(para); 
                                    }
                                }                                                       
                            }  
                         }  
                        request_params.entryId=_this.global.storage.entryId;
                        request_params.personId=personid;  
                        request_params.accountId=_this.global.storage.accountId;    
                        request_params.mobile=_this.global.storage.mobile;
                        if(flag){
                            var request = getSign(request_params,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                            $.ajax({
                                type:'POST',
                                url:_this.url+'/app/user/saveEnrollUser',
                                dataType:'JSON',
                                data:request,
                                success:function(data){
                                    if(data.code==1){
                                        alert("保存成功");
                                        window.history.back(-1); 
                                    }else{
                                        alert(data.msg);
                                    }
                                }
                            });          
                        }                        
                        // /**************验证成功开始添加报名信息***************/
                            
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