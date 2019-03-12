<template>
    <div class="review">
        <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        <div class="review_top">
            <div class="reviewTitle">{{reviewTitle}}</div>
           <ul class="comment_top_list">
                <li v-for="(item,index) in reviewList" :key="index"  class="comment_top_list_detail">
                    <div  @click="addClass(index,item.eventId)" :class="{ add:index==current}">{{item.date}}</div>
                        <div :class="{column_bottom_line:index==current}"></div>
                </li>
            </ul>
        </div>
        <div class="review_text">
            <textarea name="" id="replys" v-model="comment.content" class="review_text_detail" maxlength="500" placeholder="请评价本场马拉松赛事，最多输入500字~" ></textarea>
            <!-- <div class="review_text_detail">{{review_text}}</div> -->
        </div>
        <div class="review_photo">
            <label v-show="isCamera" class="addimage"><input accept="image/*"  type="file" class="addimage-input" id="camera-upload" @change="file_upload()"/></label>
            <!-- <div style="display:flex"> -->
                <img v-for="(item,index) in commentImages" v-show="isPicture" :key="index" :src="item.image" :class="isCamera == true ? 'reciew_picture' :'reciew_picture1'" @touchstart.prevent="imgtouchstart(index,0)" @touchmove="imgtouchmove()" @touchend="imgtouchend(index)"/>
                <div class="review_middle_line" v-if="isCamera == false"></div>
            <!-- </div> -->
           
        </div>
        <div class="review_line"></div>
        <div>
            <div class="review_score_class">
                <img src="../total_img/trophy.png" alt="" class="score_img">
                <div class="match_review_score">赛事评分</div>
            </div>
            <div>
                <div class="review_Track">
                    <div class="track_view" >赛道风景</div>
                    <i v-for="(n,index) in 5" :key="index">
                        <img v-if="comment.commentStar.scenery >= n" src="../total_img/starMax.png" alt="" class="review_star" @click="comment_star('s',index)">
                        <img v-else src="../total_img/starMax-gray.png" alt="" class="review_star" @click="comment_star('s',index)" />
                    </i>                                    
                </div>
                <div class="review_Track">
                    <div class="track_view">赛道组织</div>
                     <i v-for="(n,index) in 5" :key="index">
                        <img v-if="comment.commentStar.orderly >= n" src="../total_img/starMax.png" alt="" class="review_star" @click="comment_star('o',index)">
                        <img v-else src="../total_img/starMax-gray.png" alt="" class="review_star" @click="comment_star('o',index)" />
                    </i>                   
                </div>
                <div class="review_Track">
                    <div class="track_view">赛道氛围</div>
                     <i v-for="(n,index) in 5" :key="index">
                        <img v-if="comment.commentStar.atmosphere >= n" src="../total_img/starMax.png" alt="" class="review_star" @click="comment_star('a',index)"/>
                        <img v-else src="../total_img/starMax-gray.png" alt="" class="review_star" @click="comment_star('a',index)"/>
                    </i>
                </div>
                <div class="review_Track">
                    <div class="track_view">交通便利</div>
                     <i v-for="(n,index) in 5" :key="index">
                        <img v-if="comment.commentStar.traffic >= n" src="../total_img/starMax.png" alt="" class="review_star" @click="comment_star('t',index)">
                        <img v-else src="../total_img/starMax-gray.png" alt="" class="review_star" @click="comment_star('t',index)" />
                    </i>
                </div>
            </div>
        </div>
        <div class="review_button">
            <div class="submit_comments" @click="comment_save()">提交评论</div>
        </div>
    </div>
</template>
<style scoped>
@import './review.css';
</style>
<script>
import { upload } from '../../../router/ajaxfileupload.js';
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'review',
         filters: {
            acName(v){
                return v.length>12 ? v.substr(0,12)+'...' : v;
            },
        },
        data(){
            return{
                reviewTitle:"",
                review_text:"修改评论",
                reviewList:[],
                commentImages:[],
                comment:{'commentStar':{'scenery':5,'orderly':5,'atmosphere':5,'traffic':5}},
                current:0, 
                isCamera:false,
                params:{},
                saveParams:{},
                isPicture:true,
                url:this.global.storage.url,
                timeOutEvent:0 
            }
        },
       created:function () {
        },
        beforeCreate(){
        },
        mounted(){  
            this.params={'eventId':this.$route.query.eventId,'accountId':this.$route.query.accountId};
            this.saveParams={'eventId':this.$route.query.eventId,'accountId':this.$route.query.accountId};
            this.getreviewinfo(1);
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
              imgtouchstart:function gtouchstart(index,num){
                var _this=this;
                  this.timeOutEvent = setTimeout(function(){
                        // if(confirm("确定删除图片")){
                            if(num==0){
                                //alert(111);
                                //delete _this.commentImages[index]["image"];
                                _this.commentImages.splice(index,1);
                                $('#'+'commentImages_'+index).remove();
                                 _this.saveParams.images='';
                                for(var ph = 0;ph<_this.commentImages.length; ph++){ 
                                    if(_this.commentImages[ph].image!=undefined){
                                        if(ph==_this.commentImages.length-1){                                            
                                            _this.saveParams.images +=_this.commentImages[ph].image;
                                        }else{
                                            _this.saveParams.images +=_this.commentImages[ph].image +',';
                                        }
                                    }                                
                                } 
                                  clearTimeout(this.timeOutEvent);  
                            }
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
            addClass(index,eventId){
                this.current=index;
                this.params.eventId=eventId;
                this.saveParams.eventId=eventId;
                this.getreviewinfo(2);
            },
            getreviewinfo(num){          
                var _this = this;
                _this.reviewTitle= _this.global.storage.title;
                _this.isCamera=false; 
                var request = getSign(_this.params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                $.ajax({
                    type:'POST',
                    url:_this.url+"/comment/event/check",
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                        if(data.code == 1){
                            if(data.objectData.comment!=undefined){
                                if(data.objectData.comment.commentImages.length==0||data.objectData.comment==undefined){
                                    _this.isPicture=false;
                                }else{
                                    _this.isPicture=true; 
                                }
                            }
                            var comment=data.objectData.comment;
                            var eventList=data.objectData.eventData;                       
                             if(num==1){
                                 if(eventList.length!=0){                                     
                                    if(!data.objectData.commentCurren){
                                        //当前不可评论的赛事ID                                
                                        for(var ke in eventList){
                                            if(_this.global.storage.eventId==eventList[ke].eventId){
                                                eventList.splice(ke,1); 
                                            }
                                        }                            
                                    }  
                                    _this.reviewList=eventList;
                                    if(eventList.length==0){
                                    }else{
                                        _this.saveParams.eventId=eventList[0].eventId;
                                    }
                                 }else{

                                 }
                            }                       
                        var images;
                        if(comment == undefined){
                            var commentStar={'scenery':0,'orderly':0,'atmosphere':0,'traffic':0}
                            comment={'commentStar':commentStar,'content':''};                             
                            _this.isCamera=true;   
                            _this.commentImages=new Array();                
                        }else{
                            images= data.objectData.comment.commentImages; 
                        }                             
                        if(images != undefined && images.length>0){
                             _this.commentImages=images; 
                        }                      
                        _this.comment=comment;
                        }else{
                            alert("请求超时,请检查是否有网络!");
                        }                        
                    }             
                });                
            }, 
            comment_star(id,index){
                var _this=this;              
                switch(id){
                    case 's': _this.comment.commentStar.scenery=(index+1);_this.saveParams.scenery=(index+1);break;
                    case 'o':_this.comment.commentStar.orderly=(index+1);_this.saveParams.orderly=(index+1);break;
                    case 'a':_this.comment.commentStar.atmosphere=(index+1);_this.saveParams.atmosphere=(index+1);break;
                    case 't':_this.comment.commentStar.traffic=(index+1);_this.saveParams.traffic=(index+1);break;
                }                
            },           
            file_upload(){                
                var _this=this; 
                var formData=new FormData();
                formData.append("file",document.getElementById("camera-upload").files[0]);
                formData.append("bucketPath","eventComent");
                $.ajax({
                    type:'POST',
                    url:_this.url+"/down/uploadImage",
                    data:formData,
                    contentType:false,
                    processData:false,
                    success:function(data){
                        if(data.code == 1){
                            if( _this.commentImages.length>=9){
                                alert('图片最多可以上传九张哦~');
                            }else{
                                var image={'image':data.objectData};
                                _this.commentImages.push(image);
                                _this.isPicture=true;                                
                                var temp=_this.saveParams.images;
                                if(temp==undefined){
                                    _this.saveParams.images=data.objectData;
                                }else{
                                    _this.saveParams.images=(_this.saveParams.images+","+data.objectData);
                                }
                            }
                        }else{
                            alert("上传失败!");
                        }
                    }
                });
            },
            comment_save(){
                var _this=this;
                var content=$('#replys').val();
                if(content==""||content == undefined){
                    alert("评论内容不能为空!");
                }else if(_this.comment.commentStar.atmosphere==0||_this.comment.commentStar.orderly==0||_this.comment.commentStar.orderly==0||_this.comment.commentStar.traffic==0){
                    alert("请评分");
                }else{
                    if(_this.reviewList.length==0){
                        alert('当前赛事未完赛，不可评论');
                    }else{
                        _this.saveParams.content=content;
                        _this.saveParams.type=1;  
                        var request = getSign( _this.saveParams,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                        $.ajax({
                            type:'POST',
                            url:_this.url+"/comment/event/addition",
                            dataType:'JSON',
                            data:request,
                            success:function(data){
                                if(data.code==1){ 
                                    _this.$router.push({path:'../comments',query:{'labelId':_this.params.labelId,'accountId':_this.params.accountId,'type':1}});
                                }else{
                                    alert("评论失败!");
                                }
                            }
                        }); 
                    }                    
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