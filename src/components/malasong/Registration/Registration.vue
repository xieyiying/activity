<template>
    <div class="Registration">
        <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <img src="../total_img/waitloading.gif" alt="" v-show="iconshow" class="wait">
        <div v-show="!iconshow">
            <div class="Registration_top">
                <div class="Registration_name">{{title}}</div>
                <div class="Registration_time"><img src="../total_img/3.png" class="Registration_img"><span class="Registration_text">{{match_time}}</span></div>
                <!-- <div class="Registration_time"><img src="../total_img/4.png" class="Registration_img"><span class="Registration_text">{{match_place}}</span></div> -->
                <div class="Registration_time" style="padding-bottom:10px"><img src="../total_img/5.png" class="Registration_img"><span class="Registration_text">{{match_name}}</span><span class="Registration_fee">￥{{fee}}</span></div>
            </div>
            <div class="Participants" @click="addinfo">+添加参赛者</div>
            <div>
                <ul>
                    <li v-for="(item,index) in columnList" :key="index"  class="Registration_list">
                        <div @click="checkBoxClick(item,index)" style="display:flex;cursor:pointer">                        
                            <img src="../total_img/6.png" class="Registration_image" v-if="item.check==true">
                            <img src="../total_img/7.png" class="Registration_image" v-else>
                            <div class="list_info_name">{{item.name|acName}}</div>
                            <div class="list_info">{{item.sex}}</div>
                            <div class="list_info">{{item.number}}</div>
                        </div>    
                        <div class="list_info" @click="changeInfo(index)">修改信息</div>
                                    
                        <img src="../total_img/8.png" class="Registration_image" @click="deletePeople(item.personid,index)">
                    </li>
                </ul>
            </div>
            <div class="Registration_button">
                    <div class="Registration_click_button" @click="goPay" v-show="payShow">
                        立即报名
                    </div>
                     <div class="Registration_click_button" style="background:#999999"  v-show="!payShow">
                        立即报名
                    </div>
            </div>
        </div> 
    </div>
</template>
<style scoped>
@import './Registration.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'Registration',
         filters: {
            acName(v){
                return v.length>3 ? v.substr(0,3)+'...' : v;
            },
        },
        data(){
            return{
                title:"",
                match_name:"",
                match_time:"",
                fee:"",
                formdetail:[],
                columnList: [],
                eventListParam: [],
                userlist:[],
                min:"",
                max:"",
                checkedUserlist: [],
                selectNum:0,
                checked:[],
                agechecked:[],
                enoughchecked:[],
                selectList:[],
                eventList:[],
                maxage:null,
                minage:null,
                url:this.global.storage.url,
                iconshow:true,
                isensureSelect:null,
                payShow:true
            }
        },
       created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '赛事报名';    
        },
        mounted(){  
            this.payarray=[];
            this.getreinfo();
        },
        methods:{ 
            lastPage(){
                window.history.back(-1); 
            },
            checkBoxClick(item,e) {  
                var _this=this;                  
                if(item.number ==item.emergencyPhone) return alert("紧急联系人电话与联系人电话相同，请修改后报名~");
                var uselist = _this.eventList;
                var selectList =_this.selectList;  
                var agechecked = _this.agechecked;
                var enoughchecked = _this.enoughchecked;
                var enough = enoughchecked[e];
                var agecheckchoose=agechecked[e];
                var obj = agechecked[e];
                var temp_user=uselist[e];             
                var check_flag=false;
                for(var ke in _this.eventListParam){
                    for(var ke_temp in temp_user){
                        if(_this.eventListParam[ke].required){
                            if(_this.eventListParam[ke].key == ke_temp){
                                check_flag=true;
                                if(temp_user[ke_temp] =="" || temp_user[ke_temp] == undefined){
                                    alert("信息不完整，请补全信息");
                                    break;
                                }else{
                                    break;
                                }
                            }
                        }else{
                            check_flag=true;
                            break;
                        }
                    }
                    if(!check_flag){
                        alert("信息不完整，请补全信息");
                        return;
                    }else{
                        check_flag=false;
                    }
                }                          
                if(_this.isensureSelect==true){
                    var selectListItem = uselist[e].selectValus;
                    var params;           
                    params={'entryId':_this.$route.query.entryId};   
                    params.cardId=uselist[e].cardId;  
                    var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");  
                    $.ajax({
                        type:'POST', 
                        url:_this.url+"/app/mls/order/checkEnrollSelects",
                        dataType:'JSON',
                        data:request,
                        success:function(data){
                            if(data.code!=1){
                                alert('信息已过期，请重新填写报名信息');
                                _this.$router.push({ path: '/addinfo', query: {personid:uselist[e].id,entryId:_this.$route.query.entryId,modify:true}});

                            }else{
                                if(!enough||selectListItem == ""||selectListItem == undefined||selectListItem.length == 0){
                                    alert('报名信息不完整');
                                }else if(!agecheckchoose){
                                    alert("年龄不在范围内，不可选");
                                }else{ 
                                    var checked = _this.checked;
                                    for (var i = 0; i < checked.length; i++) {
                                        if (i == e) {
                                            if(!checked[e]){
                                                selectList.push(uselist[e]);
                                            }else{
                                                for(var ke in selectList){
                                                    if(item.personid==selectList[ke].id){
                                                        selectList.splice(ke,1);                                            
                                                    }
                                                }
                                            }
                                            var check = _this.columnList[e].check;
                                            _this.columnList[e].check = !check ; 
                                            checked[e] = !checked[e];
                                        }   
                                    }; 
                                    _this.selectList=selectList;
                                }
                            }                           
                        }
                    })
                }else{
                    if(!enough){
                        alert("信息不完整，不可选");
                    }else if(!agecheckchoose){
                        alert("年龄不在范围内，不可选");
                    }else{
                        var checked = _this.checked;
                        for (var i = 0; i < checked.length; i++) {
                            if (i == e) {
                                if(!checked[e]){
                                    selectList.push(uselist[e]);
                                }else{
                                    for(var ke in selectList){
                                        if(item.personid==selectList[ke].id){
                                              selectList.splice(ke,1);                                            
                                        }
                                    }
                                }
                                var check = _this.columnList[e].check;
                                _this.columnList[e].check = !check ; 
                                checked[e] = !checked[e];
                            }   
                        }; 
                        _this.selectList=selectList;   
                    }                    
                 }                   
            },
            deletePeople(id,index){
                var sure=window.confirm('确认删除?');
                if(sure){
                    var params;               
                    var _this = this;
                    params={'mobile':_this.global.storage.mobile};   
                    params.sessionid=_this.global.storage.sessionid;  
                    params.personId = id;  
                    var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");  
                    $.ajax({
                        type:'POST', 
                        url:_this.url+"/app/user/deleteUser",
                        dataType:'JSON',
                        data:request,
                        success:function(data){
                            if(data.code==903){
                                _this.columnList.splice(index,1);
                            }
                        }
                    })
                }               
            },
            goPay(){
                var _this = this;
                var getInfo=_this.$route.query;
                var enrollTime=new Date();
                if(enrollTime>=_this.eventendTime){
                    alert('报名时间截止');
                }else{
                    if(_this.selectList.length ==0){
                        alert('请勾选报名用户');
                    }else{
                        if (_this.selectList.length >= _this.min && _this.selectList.length <= _this.max) {
                            var checkedUserlist = _this.selectList;
                            var map = {};
                            var params = [];
                            for (var i = 0; i < checkedUserlist.length; i++) {
                                var obj = checkedUserlist[i];
                                var cardId = obj.cardId;
                                var id = obj.id;
                                map[obj.cardId] = obj.id;
                                var map2json=JSON.stringify(map);
                            }       
                            var paramtemp;
                            paramtemp={'mobile':_this.global.storage.mobile};   
                            paramtemp.sessionid=_this.global.storage.sessionid;
                            paramtemp.entryId=getInfo.entryId;  
                            paramtemp.from = "from_webs";
                            paramtemp.additionals = params;  
                            paramtemp.param = map2json;
                            var requesttemp = getSign(paramtemp,"e1bdc0f0a45a4ce5aa16b90a02851e2a");  
                                $.ajax({
                                type:'POST', 
                                url:_this.url+"/app/mls/order/enrolls",
                                dataType:'JSON',
                                data:requesttemp,
                                success:function(data){                                     
                                    _this.payShow=false;
                                    if(data.code==900){
                                        alert("已经存在报名信息");
                                        _this.$router.push({ path: '/orderDetail'}); 
                                    }else if(data.code==906){
                                        var outTradeNo=data.objectData.outTradeNo;
                                        _this.global.storage.outTradeNo=outTradeNo; 
                                        _this.$router.push({ path: '/topay', query: {id:outTradeNo}}); 
                                    }else{
                                        alert(data.msg);
                                    }
                                }
                            }) 
                        } else {
                            var msg="人数不得少于"+_this.min+"人且不得多于"+_this.max+"人";
                            alert(msg);                
                        }
                    }
                   
                }
            },
         
            changeInfo(index){
                var _this = this;
                var getInfo=_this.$route.query;
                var personid = this.columnList[index].personid;
                this.$router.push({ path: '/addinfo', query: {personid:personid,entryId:getInfo.entryId,modify:true}});
            },
            addinfo(){ 
                var _this = this;
                var getInfo=_this.$route.query;
                var personid ="";
                this.$router.push({ path: '/addinfo', query: {personid:personid,entryId:getInfo.entryId,modify:false}});
            },
            getreinfo(){          
                var _this = this;                
                if(_this.$route.query.id!=""||_this.$route.query.id!=undefined){
                    var getInfo=_this.$route.query;                    
                    _this.match_name=getInfo.eventType;
                    _this.match_time=getInfo.eventTime;
                    _this.title=_this.$route.query.title;
                }else{
                };
                var param;
                var checked=[];
                param={'mobile':_this.global.storage.mobile};   
                param.sessionid=_this.global.storage.sessionid;
                _this.global.storage.entryId=getInfo.entryId;
                param.entryId=getInfo.entryId;  
                param.pageNo = 1;     
                var requesttemp = getSign(param,"e1bdc0f0a45a4ce5aa16b90a02851e2a");                 
                var _this = this;
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/app/mls/getEventDyncList",
                    dataType:'JSON',
                    data:requesttemp,
                    success:function(data){ 
                        if(data.code==1){ 
                            _this.iconshow=false;
                            _this.isensureSelect=data.isSelect;
                            var time=data.objectData.marathonEvent.endDate;
                            var timestamp = new Date(time).getTime();
                            _this.eventendTime=timestamp;
                            _this.eventListParam = data.eventList;
                            _this.fee=data.objectData.fee;
                            _this.max = data.objectData.enrollMax;
                            _this.min = data.objectData.enrollMin;
                            _this.maxage = data.objectData.maxAge;
                            _this.minage = data.objectData.minAge;
                            var content = data.objectData.content;
                            _this.global.storage.content=content;
                            _this.enrollUser();                                                
                        }       
                    }
                }); 
            },
            enrollUser(){
                var _this=this;
                var getInfo=_this.$route.query;
                var params;
                params={'mobile':_this.global.storage.mobile}; 
                params.entryId=getInfo.entryId;
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");      
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/app/user/enrollUserList",
                    dataType:'JSON',
                    data:request,
                    success:function(data){ 
                       if(data.code==1){
                            if (data.list.length == 0 || data.list == null) {
                                return
                            }
                            var array = [];
                            if (_this.selectList == undefined || _this.selectList.length == 0) {
                                for (var i = 0; i < data.list.length; i++) {
                                    array.push(false);
                                }
                            } else {
                            };
                            var enrollListArray=_this.eventListParam;
                            var checkflag=false;
                            for(var ke in enrollListArray){
                                if(enrollListArray[ke].key=='birthday'){
                                    checkflag=true;
                                }
                            }
                            if(!checkflag){
                                var agecheck = [];
                                for (var i = 0; i < data.list.length; i++) {
                                    agecheck.push(true);
                                }                                
                            }else{
                                var agecheck = [];
                                for (var i = 0; i < data.list.length; i++) {
                                    var age = data.list[i].birthday;
                                    var ddate = new Date(age).getTime();        
                                    if (ddate > _this.minage || ddate < _this.maxage) {
                                        agecheck.push(false);
                                    } else {
                                        agecheck.push(true);
                                    }
                                }
                            }                            
                            var enoughcheck = [];
                            for (var i = 0; i < data.list.length; i++) {
                                var user = data.list[i];
                                var flag = _this.checkDefaultUser(user);
                                if (flag) {
                                    enoughcheck.push(true);
                                } else {
                                    enoughcheck.push(false);
                                }
                            };
                            _this.checked=array;
                            _this.agechecked=agecheck;
                            _this.enoughchecked=enoughcheck;
                            _this.eventList=data.list;
                            var eventlist=data.list;
                            for(var ke in eventlist){
                                var listTemp={};
                                var Manname=eventlist[ke].name;
                                var Mansex=eventlist[ke].sex;
                                var mobileNum=eventlist[ke].mobileNum;
                                var id=eventlist[ke].id;
                                var cardType=eventlist[ke].cardType;
                                var cardId=eventlist[ke].cardId;
                                listTemp.name=Manname;
                                listTemp.sex=Mansex;
                                listTemp.number=mobileNum;
                                listTemp.personid=id;
                                listTemp.check=false;
                                listTemp.card_id=cardId;
                                listTemp.card_Type=cardType;
                                listTemp.emergencyPhone=eventlist[ke].emergencyPhone;
                                _this.columnList.push(listTemp); 
                            }                         
                        }       
                    }
                });
            },
            checkDefaultUser: function (user) {
                var params=this.eventListParam;
                //校验性别
                var sex = user.sex;
                if (sex != "" && sex != undefined && sex != null) {
                    var sexflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "sex") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (sex == secondList[j].name) {
                                    sexflag = true;
                                }
                            }
                        }
                    }
                    if (!iscontain) {
                        return true;
                    }
                    if (!sexflag) {
                        return false;
                    }
                }
                //证件类型
                var cardType = user.cardType;
                if (cardType != "" && cardType != undefined && cardType != null) {
                    var cardTypeflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "cardType") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (cardType == secondList[j].name) {
                                cardTypeflag = true;
                                }
                            }
                        }
                    }
                        if (!iscontain) {
                            return true;
                        }
                        if (!cardTypeflag) {
                            return false;
                        }
                }
                //服装尺寸
                var clothSize = user.clothSize;
                if (clothSize != "" && clothSize != undefined && clothSize != null) {
                    var clothSizeflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "clothSize") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (clothSize == secondList[j].name) {
                                    clothSizeflag = true;
                                }
                            }
                        }
                    }
                        if (!iscontain) {
                            return true;
                        }
                        if (!clothSizeflag) {
                            return false;
                        }
                }
                //血型校验
                var blood = user.blood;
                if (blood != "" && blood != undefined && blood != null) {
                    var bloodflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "blood") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (blood == secondList[j].name) {
                                bloodflag = true;
                                }
                            }
                        }
                    }
                        if (!iscontain) {
                            return true;
                        }
                        if (!bloodflag) {
                            return false;
                        }
                }
                //空校验
                var nullflag = true;
                //各项不为空的校验
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].key;
                    var value = user[key];
                    // if(key=="runwayImage"){                       
                    //     if((user.photos== "" ||user.photos== undefined || user.photos== null) && params[i].required){
                    //         nullflag = false; 
                    //     }
                    // }else if(key=="wansaizhengming"){                         
                    //      if((user.completionCertificate== "" ||user.completionCertificate== undefined || user.completionCertificate== null) && params[i].required){
                    //         nullflag = false;
                    //     }
                    // }else{                       
                        if ((value == "" || value == undefined || value == null) && params[i].required) {
                            nullflag = false;
                           
                        }
                    // }
                    // if(key=="runwayImage"||key=="wansaizhengming"){                       
                    //     if((user.photos== "" ||user.photos== undefined || user.photos== null) && params[i].required){
                    //         nullflag = false; 
                    //     }
                    //      if((user.completionCertificate== "" ||user.completionCertificate== undefined || user.completionCertificate== null) && params[i].required){
                    //         nullflag = false;
                    //     }
                    // }else{                        
                    //     if ((value == "" || value == undefined || value == null) && params[i].required) {
                    //         nullflag = false;
                    //     }
                    // }
                }
                if (!nullflag) {
                    return false;
                }
                    return true;
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
    };
    function  strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    };
    /**
     *map转换为json
    */
    function  mapToJson(map) {
        return JSON.stringify(JsonUitl.strMapToObj(map));
    };
</script>