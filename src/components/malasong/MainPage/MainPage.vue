<template>
    <div class="MainPage">
       <div v-for="(item,ke) in eventList" :key="ke" class="Mainpage_style" @click="toEventDetail(item)">      
            <img :src="item.image" class="MainPage_list">
            <div class="MainPage_bottom">                
                <div class="eventListName">{{item.name}}</div>
                <div class="eventListTime">竞赛时间 {{item.matchStartDate|acName}}</div>
                <div class="list-item-Statustime-black" v-if="item.status==0"> 报名未开始</div>
                <div class="list-item-Statustime" v-else-if="item.status==1">报名进行中</div>
                <div class="list-item-Statustime-black" v-else-if="item.status==2"> 即将开赛</div>
                <div class="list-item-Statustime" v-else-if="item.status==3"> 赛事进行中</div>
                <div class="list-item-Statustime-black" v-else> 赛事已完成 </div>
            </div>
       </div>
    </div>
</template>
<style scoped>
@import './MainPage.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
         filters: {
            acName(v){
                return v.length>10 ? v.substr(0,10)+'' : v;
            },
        },
        name: 'userinfo', 
        data(){
            return{
               url:this.global.storage.url,
               eventList:[],
               pageNo:1,
               documentHeight:[0],
               time:[]
            }
        },
        created:function () {
            document.getElementById('titleId').innerHTML = '马拉松报名';     
        }, 
        beforeCreate(){
           
        },
        //  mounted(){        
        //     this.ordergetinfo();
        //     window.addEventListener('scroll', this.getbottom);
        // },
        destroyed(){
             //window.removeEventListener("scroll",this.handleScroll);
             window.removeEventListener('scroll', this.getbottom);
        },
        mounted(){ 
            this.countdown();
            this.getEventList();
            window.addEventListener('scroll', this.getbottom);         
        },
        methods:{ 
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
                return daysRound + "天" + hoursRound + "小时" + minutesRound + "分" + secondsRound + "秒";
            },          
            getbottom(){
                var _this=this;
                var documentHeight=_this.documentHeight;
                var p = 0;
                var t = 0;
                $(window).scroll(function(){
                　　var scrollTop = $(this).scrollTop();
                　　var scrollHeight = $(document).height();
                　　var windowHeight = $(this).height();
                    if(scrollTop + windowHeight >= scrollHeight -1 ){
                        documentHeight.push(scrollTop);
                        if(documentHeight[documentHeight.length-1]>documentHeight[documentHeight.length-2]){
                            documentHeight[documentHeight.length-2] = documentHeight[documentHeight.length-2] + documentHeight[documentHeight.length-1];
                            //_this.match = _this.array;
                            var num = _this.pageNo;
                            num++;                        
                            _this.pageNo=num;
                            _this.getEventList(); 
                        }
                　　}else{
                        p = $(this).scrollTop();
                        setTimeout(function() {
                            t = p;
                        }, 0);
                    }
                });
            },
            getEventList(){
                var img_width=$(".eventListImage").width();
                var img_height=(img_width/4)*2;
                $(".eventListImage").height(img_height);
                var _this=this;
                 var req = {};
                req.mobile = _this.global.storage.mobile;
                req.sessionid = _this.global.storage.sessionid;
                req.pageNo = _this.pageNo;
                req.status = '';
                req.entryType = '';
                req.area = '';
                req.month = 0;
                req.name= '';
                var request = getSign(req,"e1bdc0f0a45a4ce5aa16b90a02851e2a"); 
                $.ajax({
                    type:'POST', 
                    url:_this.url+'/app/mls/getEventList',
                    dataType:'JSON',
                    data:request,
                    success:function(data){ 
                        var pageNo=_this.pageNo;
                        for(var ke in data.eventList){
                            var isNative=data.eventList[ke].isNative;
                            var outUrl=data.eventList[ke].outUrl;
                            if(isNative==1&&outUrl!=''){                    
                                //_this.countdown(_this.eventList);
                            }else{            
                                _this.eventList.push(data.eventList[ke]);
                            }
                        }                                            
                    }})
            },
              // countdown: function (that) {
            //     var array=this.eventList;
            //     console.log('array',array);
            //     setTimeout(function () {
            //         var timeCur = [];
            //         for (var i = 0; i < array.length; i++) {
            //             var name = "";
            //             if (array[i].status == 0) {
            //                 console.log(array[i].status); 
            //                 var curTime = new Date().getTime();
            //                 var times = Date.parse(new Date(array[i].startDate.replace(/-/g, "/")));//指定时间的毫秒数
            //                 var sub = times - curTime;
            //                 if (0 < sub && sub < 1000) {
            //                  that.getEventList();
            //                     break;
            //                 }
            //                 name = that.formatDuring(sub);
            //             } else if (array[i].status == 1) {
            //                 var curTime = new Date().getTime();
            //                 var times = Date.parse(new Date(array[i].endDate.replace(/-/g, "/")));//指定时间的毫秒数
            //                 var sub = times - curTime;
            //                 if (0 < sub && sub < 1000) {
            //                  that.getEventList();
            //                     break;
            //                 }
            //                 name = that.formatDuring(sub);
            //             } else if (array[i].status == 2) {
            //                 var curTime = new Date().getTime();
            //                 var times = Date.parse(new Date(array[i].matchStartDate.replace(/-/g, "/")));//指定时间的毫秒数
            //                 var sub = times - curTime;
            //                 name = that.formatDuring(sub);
            //                 if (0 < sub && sub < 1000) {
            //                     that.getEventList();
            //                     break;
            //                 }
            //             }
            //             console.log('name',name);
            //             timeCur.push(name);
            //         }
            //         console.log(timeCur);
            //         //that.time=timeCur;
            //         // that.setData({
            //         //     time: timeCur
            //         // })
            //         that.countdown(that);
            //     }, 1000)
            // },
            countdown(param){
                var _this=this;
                var timeCur=[];
                setTimeout(function () {
                    for(var ke in param){
                        if (param[ke].status == 0) {
                            var curTime = new Date().getTime();
                            var times = Date.parse(new Date(param[ke].startDate.replace(/-/g, "/")));//指定时间的毫秒数
                            var sub = times - curTime;
                            if (0 < sub && sub < 1000) {
                               // _this.getEventList();
                                break;
                            }
                            name = _this.formatDuring(sub);
                        } else if (param[ke].status == 1) {
                            var curTime = new Date().getTime();
                            var times = Date.parse(new Date(param[ke].endDate.replace(/-/g, "/")));//指定时间的毫秒数
                            var sub = times - curTime;
                            if (0 < sub && sub < 1000) {
                                //_this.getEventList();
                                break;
                            }
                            name = _this.formatDuring(sub);
                        } else if (param[ke].status == 2) {
                            var curTime = new Date().getTime();
                            var times = Date.parse(new Date(param[ke].matchStartDate.replace(/-/g, "/")));//指定时间的毫秒数
                            var sub = times - curTime;
                            name = _this.formatDuring(sub);
                            if (0 < sub && sub < 1000) {
                                //_this.getEventList();
                                break;
                            }
                        }
                        timeCur.push(name);
                    } 
                    _this.countdown(param);
                    _this.time= timeCur;
                }, 1000)                   
            },
            toEventDetail(item){
                this.$router.push({path: '../malasmain',query:{'event':item.event}});
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