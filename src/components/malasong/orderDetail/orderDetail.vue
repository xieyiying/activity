<template>    
    <div class="orderDetail">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>
        <img src="../total_img/waitloading.gif" alt="" v-show="iconshow" class="wait">   
        <div class="orderDetail_top" v-show="!iconshow"> 
            <ul>
                <li v-for="(item,i) in enrollList" :key="i"  @click="getnum(i)" class="orderList_top">
                    <div class="order_list">
                        <div @click="order(i)" class="top_container" :class="{ top_Newcontainer:item.payStatus!=1}">   
                            <div class="top_title">{{item.eventName}}</div>
                            <div class="top_name">{{item.entry.name}}</div>
                            <div class="top_date">{{time[i]}}</div>
                            <div class="top_status">{{eventstatus[i]}}</div>
                        </div>
                        <ul>
                             <li v-for="(newItem,i) in item.list" :key="i" @click="showinfo(i)" class="order_detail_in">
                                <div class="user_item1">
                                    <div class="user_name">{{newItem.name}}</div>
                                    <div class="user_sex">{{newItem.sex}}</div>
                                </div>
                                <div  class="user_item1">                                     
                                    <div class="order_id">{{newItem.cardId}}</div>
                                    <div class="order_num">{{newItem.mobileNum}}</div>
                                </div>
                                <div  class="user_item1">
                                    <div class="order_status">{{newItem.orderStatus}}</div>
                                    <div class="order_check">{{newItem.check}}</div>
                                </div>
                            </li>
                        </ul>                       
                    </div>
                </li>     
            </ul>              
        </div>     
    </div>
</template>
<style scoped>
@import './orderDetail.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'orderDetail',
        data(){
            return{
                url:this.global.storage.url,
                enrollList:[],
                recList:[],  
                index:"",
                time:[],
                eventstatus:[],
                paystatus:[],
                checkstatus:[],
                itemShow:[],
                pageNum:1,
                array:[] ,
                match:[],
                documentHeight:[0],
                iconshow:true                            
            }
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '报名记录';    
        },
        mounted(){        
            this.ordergetinfo();
            window.addEventListener('scroll', this.getbottom);
        },
        destroyed(){
             //window.removeEventListener("scroll",this.handleScroll);
             window.removeEventListener('scroll', this.getbottom);
        },
        methods:{  
            lastPage(){
                window.history.back(-1); 
            },
            getEventstatus(status){
                switch (status) {
                case 1:
                    return "报名进行中";
                case 0:
                    return "报名已结束";
                case 2:
                    return "赛事未开始";
                case 3:
                    return "赛事进行中";
                case 4:
                    return "赛事已结束";
                case 5:
                    return "赛事已取消";
                case 10:
                    return "等待资料上传";
                default:
                    return "";
                }
            },
            getPaystatus (status){
                switch (status) {
                case 0:
                    return "未支付";
                case 1:
                    return "已失效";
                case 2:
                    return "已支付";
                case 10:
                    return "已退款";
                default:
                    return "－－－";
                }
            },
            getCheckstatus(status){
                switch (status) {
                case 0:
                case 2:
                    return "审核已通过";
                case 1:
                    return "待审核";
                case 3:
                    return "审核失败";
                case 4:
                    return "待抽签";
                case 5:
                    return "已中签";
                case 6:
                    return "未中签";
                default:
                    return "等待资料上传";
                }
            },
            order(i){
                var _this=this;
                //var obj = _this.recList[i];
                var obj = _this.enrollList[i];
                var enrollTime=new Date();
                var time = new Date(obj.endDate);
                //var timestamp3 = new Date(obj.endDate).getTime();
                if(Date.parse(enrollTime)>=obj.endDate){
                    alert('报名时间已截止');
                }else{
                    var orderNumber = obj.outTradeNo;                
                    _this.global.storage.outTradeNo=orderNumber; 
                    if (obj.payStatus==1){
                        alert("订单已失效");
                    }else if(obj.payStatus==0){
                      _this.$router.push({ path: '/topay', query: {id:orderNumber}}); 
                    }else{
                      _this.$router.push({ path: '/orderstatus', query: {orderNumber:orderNumber}});
                    }
                }
               
            },
            getnum(index){
                this.index=index;
            },
            showinfo(ke){
                var _this = this;
                var ke=ke;               
                 setTimeout(function(){
                    var index=_this.index;
                    var list = _this.enrollList;
                    var itemList = list[index];
                    //里面的list
                    var user = itemList.list[ke];
                    var id = user.id;
                    var entryId = itemList.entry.id;
                    var entryName = itemList.entry.name;
                    var ordertrade = itemList.outTradeNo;
                    _this.$router.push({ path: '/userinfo', query: {userId:id,entryId:entryId,entryName:entryName,ordertrade:ordertrade}}); 
                 },500);
                
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
                        if(documentHeight[documentHeight.length-1]>documentHeight[documentHeight.length-2])
                        {
                        documentHeight[documentHeight.length-2] = documentHeight[documentHeight.length-2] + documentHeight[documentHeight.length-1];
                        _this.match = _this.array;
                        var num = _this.pageNum;
                        num++;                        
                        _this.pageNum=num;
                        _this.ordergetinfo(); 
                        }
                　　}else{
                        p = $(this).scrollTop();
                        setTimeout(function() {
                            t = p;
                        }, 0);
                    }
                });
            },
            ordergetinfo(){
                var _this = this; 
                var params;
                params={'mobile':_this.global.storage.mobile}; 
                params.sessionid =_this.global.storage.sessionid;
                params.pageNum=_this.pageNum;      
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");   
                $.ajax({
                    type:'POST', 
                    url:_this.url+'/app/mls/order/getEnrollList',
                    dataType:'JSON',
                    data:request,
                    success:function(data){  
                        _this.iconshow=false;                     
                        _this.array=[];
                        _this.enrollList=data.list; 
                        _this.array = _this.match.concat(data.list);
                        var ordertime = _this.time;
                        //换取状态
                        var status = _this.eventstatus;
                        var itemShow = _this.itemShow;
                        for (var i = 0; i < data.list.length;i++){
                            status.push(_this.getEventstatus(data.list[i].eventStatus))
                            var date = new Date(data.list[i].matchStartDate);
                            ordertime.push(_this.transDate(date));
                            var list = data.list[i].list;
                            for(var j =0;j<list.length;j++){
                                list[j].check = _this.getCheckstatus(list[j].check);
                                list[j].orderStatus = _this.getPaystatus(list[j].orderStatus);
                            }
                            if(list.length>2){
                                itemShow.push(true);
                            }else{
                                itemShow.push(false);
                            }
                        } 
                       // _this.recList=_this.array;
                        _this.enrollList=_this.array;
                        _this.time=ordertime;
                        _this.eventstatus=status;
                        _this.itemShow=itemShow;            
                    }                        
                }); 
            },
            transDate(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute].map(this.formatNumber).join(':');
            }  ,
            formatNumber (n) {
                n = n.toString();
                return n[1] ? n : '0' + n;
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