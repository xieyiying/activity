<template>    
    <div class="comments">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <img src="../total_img/waitloading.gif" alt="" v-show="ifshow" class="wait">    
        <div class="comments_click_button" @click="toComments_page"></div> 
        <div style="height:40px">
            <ul class="comment_top_list">
                <li v-for="(item,index) in commmentList" :key="index"  class="comment_top_list_detail">
                    <div  @click="addClass(index,item.eventId)" :class="{ add:index==current}">{{item.date}}</div>
                        <div class="column_middle_line"></div>
                        <div :class="{column_bottom_line:index==current}" > </div>
                </li>
            </ul>
        </div>
        <div class="comments_middle_line"></div>
        <div>
            <ul>                
                <li v-for='(item,index) in commmentdetailList' :key="index"  class="comments_list" >
                    <img :src="item.photo" alt="" class="comments_image"> 
                    <div class="comments_info">
                        <div class="comments_name">{{item.name}}</div>
                        <div class="comments_detail">
                            <div class="score">              
                                <i v-for="(n,temp) in 5" :key="temp">
                                    <img v-if="item.star >= n" src="../total_img/star-full.png" alt="" class="comments_img">
                                    <img v-else-if="item.star < (n-1)" src="../total_img/star-gray.png" alt="" class="comments_img">
                                    <img v-else src="../total_img/star-half.png" alt="" class="comments_img"/>
                                </i>                                                         
                                <div class="score_num">{{item.star}}</div>
                            </div>                            
                            <div class="conmments_text">{{item.content}}</div>
                            <img v-for='(im,imageIndex) in item.commentImages' :key="imageIndex" :src="im.image" class="comment_image" :class="{comment_image_mulit:item.isMore}" />
                            <div class="comment_time">
                                <span>{{item.time}}</span>
                                <span>{{item.eventDate}}</span>
                                <span v-show="item.isEnroll" class="malasSign">马拉松报名</span>                                
                            </div>
                        </div>                        
                    </div>
                    <div class="click_likes">
                        <img v-if="item.isLike" src="../total_img/praise-blue.png" alt="" class="likes" @click="praise_function(item,index)" />
                        <img v-else src="../total_img/praise-gray.png" alt="" class="likes" @click="praise_function(item,index)" />
                        
                        <span class="likes_number">{{item.like}}</span>
                    </div>                  
                </li>
            </ul>
        </div>        
    </div>
</template>
<style scoped>
@import './comments.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'comments',
         filters: {
            acName(v){
                return v.length>12 ? v.substr(0,12)+'...' : v;
            },
        },
        data(){
            return{
                commmentList:[],
                commmentdetailList:[],
                current:0,                
                params:{},
                ifshow:true,
                url:this.global.storage.url,                              
            }
        },
       created:function () {
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '全部点评';    
        },
        mounted(){  
            this.params={'eventId':'','labelId':this.global.storage.eventLabelId,'accountId': this.global.storage.accountId,'type':1,'pageNo':1,'pageSize':10};
            this.getcommentInfo();
        },
        methods:{   
            lastPage(){
                window.history.back(-1); 
            },         
            toComments_page(){
                if(this.commmentList.length==2){
                    if(this.commmentList[1].isComment==false){
                        alert('该赛事未完赛，无法进行赛事评论');
                    }
                }else{
                    this.$router.push({ path: '../review',query:{'eventId':this.params.eventId == ""?this.commmentList[1].eventId:this.params.eventId,'accountId': this.global.storage.accountId,'labelId':this.params.labelId}});
                }
            }, 
            addClass(index,eventId){
              this.current=index;
              if(index==0){
                  this.params.eventId='';
              }else{
                  this.params.eventId=eventId;
              }              
              this.getcommentInfo();
            },
            getcommentInfo(){
                var _this = this; 
                _this.ifshow=true;             
                var request = getSign(_this.params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");                  
                $.ajax({
                    type:'POST', 
                    url:_this.url+"/comment/event/list",
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                        _this.ifshow=false; 
                        var eventDate=new Array();
                        var temp=data.objectData.list;
                        eventDate.push({"date":"全部点评","eventId":""});
                        for(var ke in temp){
                            eventDate.push(temp[ke]);
                        }                               
                        _this.commmentList= eventDate;
                                
                        var comments=new Array();
                        temp=data.list;
                        for(var ke in temp){
                            var flag=false;
                            var likeNums=temp[ke].like;
                            var commentImages=temp[ke].commentImages;   
                            if(commentImages.length>=2){
                                flag=true;
                            }                                                  
                            var comment={
                                'id':temp[ke].id,
                                'accountId':temp[ke].accountId,
                                'name':temp[ke].name,
                                'photo':temp[ke].photo,
                                'star':temp[ke].star.toFixed(1),
                                'content':temp[ke].content,
                                'like':likeNums>=1000?(likeNums>=10000?(likeNums/10000).toFixed(0)+"w":(likeNums/1000).toFixed(0)+"k"):likeNums,                                
                                'eventDate':temp[ke].eventDate,
                                'isEnroll':temp[ke].isEnroll,
                                'commentImages':commentImages,
                                'isMore':flag,
                                'isLike':temp[ke].isLike
                            };                             
                            comments.push(comment);                           
                        }
                        _this.commmentdetailList=comments;  
                    }
                }); 
            },        
            praise_function(dataP,index){                                
                 var _this = this;    
                var params={'commentId':dataP.id,'followAccountId':dataP.accountId,'authorId':_this.params.accountId};
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                $.ajax({
                    type:'POST',
                    url:_this.url+"/comment/event/like",
                    dataType:'JSON',
                    data:request,
                    success:function(data){                            
                        if(data.code == 1){                              
                            var flag=_this.commmentdetailList[index].isLike;
                            if(flag){
                                _this.commmentdetailList[index].isLike=false;
                                _this.commmentdetailList[index].like=(_this.commmentdetailList[index].like-1);
                            }else{
                                _this.commmentdetailList[index].isLike=true;
                                _this.commmentdetailList[index].like=(_this.commmentdetailList[index].like+1);
                            }
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