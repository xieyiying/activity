<template>
    <div class="matchNews">
        <div class="Newsmain">
            <!-- <div class="NewsTitle">{{newsTitle}}</div>
            <div class="NewsTime">{{NewsTime}}</div> -->
            <div class="NewsText">{{test}}               
            </div>
        </div>
        <div class="news_middle" id="change_News">        
            <div class="News_info">
                <div class="hot_content" v-show="click_show">
                    <div class="content">
                        <div class="line"></div>
                        <div class="content_text">热门评论</div>
                        <div class="line"></div>
                    </div>
                </div>
                <img src="./matchNews/214651225455653539.png" class="news_img" @click="checkAll" v-show="click_hide">                    
                <a href="" class="linkedme"  id="openAPP2"  @click="jumpApp">
                    <div class="malasong">{{msg}}</div>
                </a>
            </div>
            <a href="" class="linkedme"  id="openAPP1"  @click="jumpApp">
                <div class="News_bottom">
                    <div class="News_bottom_left">
                        <img src="./matchNews/568089132123597636.jpg" class="News_logo">
                        <div class="News_bottom_text">
                            <p class="News_bottom_paopao" >马拉松报名</p>
                            <p class="News_bottom_running"  style="height:20px">官方马拉松报名信息新闻发布平台</p>
                        </div>
                    </div>
                    <div class="News_bottom_right" style="float:right">打开</div>
                </div>
            </a>
        </div>
    </div>
</template>
<style scoped>
@import './matchNews.css';
</style>
<script>
import { hexMD5 } from '../../router/Md5.js';
    export default {
        name: 'matchNews',
        data(){
            return{
                newsTitle:"",
                NewsTime: "",
                click_show:null,
                click_hide:true,
                msg:"打开马拉松报名，阅读全文",
                test:""
            }
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '赛事新闻';    
        },
        mounted(){  
            this.jumpApp();
            this.calheight();
            this.init();
        },
        methods:{
            init(){
                var geturl=self.location.href;  
                var params;
                var temp=[];  
                var articleId;
                var re=geturl.split("?");  
                for(var i = 0;i<re.length;i++){             
                    if(re[i].indexOf("articleId")!=-1){
                        if(re[i].indexOf("&")!=-1){                           
                            var url_temp=[];
                            url_temp=re[i].split('&');                            
                            for(var j=0;j<url_temp.length;j++){                                                        
                                if(url_temp[j].indexOf("articleId")!=-1){                              
                                    var index = url_temp[j].indexOf("articleId="); 
                                    articleId= url_temp[j].substring(index + "articleId=".length);                                                                                         
                                }
                            }
                        }else{
                            var index = geturl.indexOf("articleId=");
                            articleId=geturl.substring(index + "articleId=".length);
                        }
                    }
                };                            
                params={'articleId':articleId};
                var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");                 
                var _this = this;
                $.ajax({
                    type:'POST', 
                    url: "https://www.marathonbm.com/share/news/content",
                    //url: "https://ceshiweb.marathonbm.com/share/news/content",
                    //url:'http://192.168.2.17:8888/share/news/content',
                    dataType:'JSON',
                    data:request,
                    success:function(data){                      
                        if(data.code==1){
                            var info=data.objectData; 
                            _this.newsTitle=info.title;
                            _this.NewsTime=(info.createDate).substr(0,10);
                            var newtext = info.marathonArticleData.content;
                            console.log(newtext);
                            $(newtext).appendTo(".NewsText");
                            var imgstyle=document.getElementsByTagName('img');
                            for(i=0;i<imgstyle.length;i++){
                                imgstyle[i].style.width=100+'%';
                                }
                        }  
                    }
                }); 
            },
            checkAll(){
                this.click_show=true;
                this.click_hide=false; 
                this.msg="打开马拉松报名，查看全部热评";
                var screenHeight=$(window).height();
                var bottom_height=$(".news_middle").height();
                var mainHeight=screenHeight-bottom_height-70;
                $(".Newsmain").css("minHeight", mainHeight);
                $(".Newsmain").css("height", "auto");
                $(".Newsmain").css("marginBottom", "65px");
                $('#change_News').removeClass("news_middle");
                $('#change_News').addClass("news_middle_open");           
                this.screenscroll();
            },
            calheight(){
                var screenHeight=$(window).height();
                var bottom_height=$(".news_middle").height();
                var mainHeight=screenHeight-bottom_height-60;
                $(".Newsmain").css("height", mainHeight);
            },
            screenscroll(){
                var p = 0;
                var t = 0;
                $(window).scroll(function(){
                　　var scrollTop = $(this).scrollTop();
                　　var scrollHeight = $(document).height();
                　　var windowHeight = $(this).height();
                　　if(scrollTop + windowHeight == scrollHeight){
                       $(".News_bottom").slideDown("slow"); 
                　　}else{
                        p = $(this).scrollTop();
                        if (t <= p) { //下滚                          
                            $(".News_bottom").slideUp("slow");                              
                        } else { //上滚
                            $(".News_bottom").slideDown("slow"); 
                        }
                        setTimeout(function() {
                            t = p;
                        }, 0);
                    }
                });
            },
            jumpApp(){   
                var data = {};            
                var geturl=self.location.href;            
                var id
                var re=geturl.split("?");  
                for(var i = 0;i<re.length;i++){             
                    if(re[i].indexOf("articleId")!=-1){
                        if(re[i].indexOf("&")!=-1){                           
                            var url_temp=[];
                            url_temp=re[i].split('&');                            
                            for(var j=0;j<url_temp.length;j++){                                                        
                                if(url_temp[j].indexOf("articleId")!=-1){                              
                                    var index = url_temp[j].indexOf("articleId="); 
                                    id= url_temp[j].substring(index + "articleId=".length);                                                                                                              
                                }
                            }
                        }else{
                            var index = geturl.indexOf("articleId=");
                            id=geturl.substring(index + "articleId=".length);
                        }
                        }
                    };
                linkedme.init("99fbdc474cea39f4e2c83ecd87e958ee", data, function(){});
                data.params = '{"path":"run/matchNews","id":"'+id+'"}';                                 
                data.type = "live";                  
                data.tags = "a";
                data.ios_custom_url = "https://www.marathonbm.com/down/marathon"; 
                //data.ios_direct_open = "true"; 
                data.android_custom_url = "https://www.marathonbm.com/down/marathon";
                //data.android_direct_open = "true";    
                linkedme.link(data, function(err, response){
                    if(err){
                    // 生成深度链接失败，返回错误对象err                    
                    } else {                                
                        document.getElementById("openAPP2").href=response.url;
                        document.getElementById("openAPP1").href=response.url;
                    }
                },false);                
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