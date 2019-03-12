<template>
    <div class="live_page">
        <a  id="openAPP2" class="linkedme"  v-on:click="jumpApp">
            <div class="top">
                <div class="top_left">
                    <img src="../../assets/资源 9-8.png" class="top_logo">
                        <div class="top_text">      
                            <p class="top_running"  style="height:20px">跑步返现/赢lphonex,新马泰旅游</p>
                        </div>
                </div>
                <div class="top_right" style="float:right">打开跑跑</div>
          </div>
        </a>
        <div class="review_content">
            <video id="example_video_1" preload="auto" class="video-js mobile-first-skin vjs-big-play-centered" style="object-fit:fill" crossorigin = "use-credentials" controls autoplay="false"  webkit-playsinline playsinline x5-video-player-type="h5"  x5-video-player-fullscreen="false"> 
                <source id="a" src="" type="application/x-mpegURL"/>
            </video>
            <div v-show="if_show" class="live_end"><p class="live_endding">直播已结束</p><p class="live_endding">下载跑跑APP和主播一起互动</p></div>
            <div class="user_info">
                <img class="user_img" :src="image">
                <div class="user_nick">{{nick}}</div>
                <div class="user_id">ID:{{runningId}}</div>
            </div>
            
            <div class="chat">
                <ul>
                    <li class="chat_list" v-for="(item,i) in chat_info" :key="i">
                        <p class="list_name" >{{chat_info[i].userName}}:</p>
                        <p class="chat_info" >{{chat_info[i].message}}</p> 
                    </li>
                </ul>
            </div>
        </div>
        <div class="live_list" id="element" v-show="list_show">
            <p class="recommendation">精彩推荐</p>
            <ul>
            <li v-for="(item, i) in items" :key="i" class="list_detail" track-by="$index">
                <div class="recommendation_info" @click="jumplive(item.recommendationlive_id)">
                    <img :src="item.recommendation_picture" class="recommendation_picture">
                    <div class="recommendation_user">
                        <img :src="item.recommendation_img" class="recommendation_img">
                        <p class="recommendation_nick">{{item.recommendation_nick}}</p>
                        <p class="recommendation_id">ID:{{item.recommendation_code}}</p>
                    </div>  
                </div>
            </li>          
          <div style="clear:both;"></div>
        </ul>
      </div>
      <a  id="openAPP1" class="linkedme"  v-on:click="jumpApp">
    <div class="bottom">
        <div class="bottom_left">
            <img src="../../assets/资源 9-8.png" class="logo">
            <div class="bottom_text">
                <p class="bottom_paopao" >跑跑网</p>
                <p class="bottom_running"  style="height:20px">跑步返现/赢lphonex,新马泰旅游</p>
            </div>
        </div>
        <div class="bottom_right" style="float:right">下载跑跑</div>
    </div>
    </a>
    </div>
</template>
<style scoped>
@import './live_page.css';
</style>
<script>
    export default {
        name: 'live_page',
        data(){
            return{
                nick: '',
                runningId: '',
                image: '',
                items:[{recommendation_nick:'',recommendation_code:'',recommendation_img:'',recommendation_picture:'',recommendationlive_id:''}],
                if_show:null,
                list_show:true,
                list_info:null,
                chat_info:[],

            }
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '跑跑马拉松直播';    
        },
        mounted(){  
            this.calculate_height();
            this.init();      
            this.jumpApp();
            this.chat();
        },
        methods:{
            //第一次请求数据
            init(){
                var _this = this;
                var eventId; 
                //解析url地址
                var geturl=self.location.href;
                var index = geturl.indexOf("liveId=");
                var id = geturl.substring(index+"liveId=".length);
                var link=geturl.split("&");
                for(var ke in link) {
                    if(link[ke].indexOf("eventId=")!=-1){
                        var id_temp=link[ke].split("?");
                        for(var index in id_temp){
                            if (id_temp[index].indexOf("eventId=")!=-1) {
                                eventId=id_temp[index];
                            }
                        }
                    }                                  
                };
                var dataparam = {};                
                dataparam.flag = true;
                dataparam.liveId = id;
                dataparam.accountId = "99526098273959936";
                // if(geturl.indexOf("null")!=-1){
                //     dataparam.flag=true;
                // }else{
                //     dataparam.flag=false;
                // };
                //获取liveid,更新source的src地址，初始化video
                document.getElementById("a").src="https://hls.hpaopao.com/live/"+id+"/index.m3u8";
                var player = ksplayer('example_video_1',{
                    language: 'zh-CN',
                    controls: false, 
                    autoHeight: false,
                    autoWidth: false,
                    fluid: true,  //响应式
                    bigPlayButton: true,
                    autoplay:false,
                    height:500,
                    controlBar: {
                        volumeMenuButton: {
                            inline: true,
                            vertical: true
                        }
                    }
                });
                
                player.on("ready", function(event) {
                });
                player.on("ended",function(event, data) {
                });

                player.on("pause",function(event, data) {
                });

                player.on("play",function(event, data) {
                //	 myPlayer.play();     
                });

                player.on("playing",function(event, data) {
                });

                player.on("seeked",function(event, data) {
                });

                player.on("seeking",function(event, data) {
                });

                player.on("loadstart",function(event, data) {
                });


                player.on("loadeddata", function(event) {
                });

                player.on("loadedmetadata", function(event) {
                });


                player.on("useractive", function(event) {
                });

                player.on("userinactive", function(event) {
                });

                player.on("volumechange", function(event) {
                });

                player.on("durationchange", function(event) {
                });

                player.on("error", function(event) {
                    var myPlayer = this;
                    myPlayer.play();
                });
               // var src= player.src({ type: "video/mp4", src: "https://hls.hpaopao.com/live/"+id+"/index.m3u8" });

                // player.load();
                //ajax请求数据
                $.ajax({
                    type:'POST', 
                    url:'https://web.hpaopao.com/live/voideList',
                    dataType:'JSON',
                    data:dataparam,
                    success:function(data){
                        _this.list_info = data.list;
                        var code = data.code;
                        var account_data = data.data.account;
                        //获取video播放用户的image runningcode nick 占位picture id         
                        _this.image = account_data.image;
                        _this.runningId = account_data.runningcode;                                                            
                        _this.nick = account_data.nick;
                        var picture_url = data.data.picture;
                        //获取list用户nick runningcode 头像image 占位picture id push到items数组中
                        var videolist_array = []; 
                        for( var ke in _this.list_info){  
                            var info = {}; 
                            info.recommendation_nick = _this.list_info[ke].account.nick; 
                            info.recommendation_code = _this.list_info[ke].account.runningcode;
                            info.recommendation_img = _this.list_info[ke].account.image;
                            info.recommendation_picture = _this.list_info[ke].picture;
                            info.recommendationlive_id = _this.list_info[ke].id;
                        
                            videolist_array.push(info);                
                        }; 
                        _this.items = videolist_array;                                           
                    }
                }); 
            },
            //点击直播列表观看
            jumplive(live_id){ 
                document.getElementById("a").src="https://hls.hpaopao.com/live/"+live_id+"/index.m3u8";
                var player2 = ksplayer('example_video_1');
                 player2.on("ready", function(event) {
                });
                player2.on("ended",function(event, data) {
                });

                player2.on("pause",function(event, data) {
                });

                player2.on("play",function(event, data) {
                //	 myPlayer.play();     
                });

                player2.on("playing",function(event, data) {
                });

                player2.on("seeked",function(event, data) {
                });

                player2.on("seeking",function(event, data) {
                });

                player2.on("loadstart",function(event, data) {
                });


                player2.on("loadeddata", function(event) {
                });

                player2.on("loadedmetadata", function(event) {
                });


                player2.on("useractive", function(event) {
                });

                player2.on("userinactive", function(event) {
                });

                player2.on("volumechange", function(event) {
                });

                player2.on("durationchange", function(event) {
                });

                player2.on("error", function(event) {
                    var myPlayer = this;
                    myPlayer.play();
                });
                //点击时修改video上面的头像 runningcode 昵称
                for(var ke in this.list_info){
                    if(this.list_info[ke].id==live_id){
                        this.image = this.list_info[ke].account.image;
                        this.runningId =this.list_info[ke].account.runningcode;                                                            
                        this.nick = this.list_info[ke].account.nick;
                    }
                };
                //点击时修改聊天室的chatRoomId
                var token="";
                var appkey="";
                var userId="";
                var userName="";
                var chatRoomId=live_id;
                var _this=this; 
                $.ajax({
                    type:'POST',
                    url:"https://web.hpaopao.com/getToken/rongcloud",
                    async: false,
                    success:function(data){
                        token=data.token;
                        appkey=data.appkey;
                        userId=data.userId;
                        userName=data.userName;
                    }
                });
                //连接状态监听器
                RongIMClient.setConnectionStatusListener({
                    onChanged: function (status) {	   
                        switch (status) {
                            case RongIMLib.ConnectionStatus.CONNECTED:
                                break;
                            case RongIMLib.ConnectionStatus.CONNECTING:
                                break;
                            case RongIMLib.ConnectionStatus.DISCONNECTED:
                                break;
                            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                                break;
                            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                                break;
                        }
                    }
                });
                // 消息监听器
                RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function (message) {	   
                    // 判断消息类型
                    switch(message.messageType){
                        case RongIMClient.MessageType.LiveLine:  
                            var value=eval((JSON.parse(message.content.content)));
                            break;
                        case RongIMClient.MessageType.TextMessage:
                            var userName=message.content.user.name;
                            var temp={"userName":message.content.user.name,"message":message.content.content};
                            _this.chat_info.push(temp);
                            break;
                        case RongIMClient.MessageType.VoiceMessage:
                            // message.content.content 格式为 AMR 格式的 base64 码
                            RongIMLib.RongIMVoice.preLoaded(message.content.content);
                            break;
                        case RongIMClient.MessageType.ImageMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.LocationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.RichContentMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.InformationNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ContactNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ProfileNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandMessage:
                            // do something...               
                            break;
                        case RongIMLib.ConversationType.CHATROOM:

                            break;
                        case RongIMClient.MessageType.UnknownMessage:
                            // do something...
                            break;
                        
                        default:
                            // 自定义消息
                            // do something...
                    }
                }
                });
                //初始化SDK                
                RongIMClient.init(appkey);
                RongIMLib.RongIMClient.init(appkey);
                RongIMClient.RegisterMessage.LiveMessage = function(message){
                    this.messageName = "LiveMessage";
                    this.encode = function(){
                    return "accountId="+message.accountId+";nick="+message.nick+";image="+message.image+";runningcode="+message.runningcode+";sex="+message.sex
                    +";longitude="+message.longitude+";latitude="+message.latitude+";duration="+message.duration+";distance="+message.distance+";rank="+message.rank+
                    ";age="+message.age+";lv="+message.lv+";eventId="+message.eventId+";entryId="+message.entryId;}
                    this.decode = function(message){
                    if (typeof message != "string") {
                        return message;
                    }
                    var strArrs = message.split(";"),
                    msg = new RongIMClient.RegisterMessage.LiveMessage();
                    for(var p in strArrs){
                        msg[strArrs[p].split("=")[0]]=strArrs[p].split("=")[1];
                    }
                    return msg;
                    }
                };
                //创建消息
                var messageName = "LiveLine"; // 消息名称。
                var objectName = "PP:LiveLineTxtMsg"; // 消息内置名称，请按照此格式命名。
                var mesasgeTag = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
                var propertys = ["accountId","nick","image","runningcode","sex","longitude","latitude","duration","distance","rank","age","lv","praiseNum","eventId","entryId"]; // 消息类中的属性名。
                RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,["content","extra"]);
                var conversationType = RongIMLib.ConversationType.CHATROOM;//聊天室
                //连接融云服务器。
                    RongIMClient.connect(token, {
                    onSuccess: function(userId) { 

                        var count = 20;// 拉取最近聊天最多 50 条。
                        RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
                            onSuccess: function() {

                                //  sendMessage("游客加入聊天室",userId,"https://www.hpaopao.com/paopao/appWeb/images/newslog.png","匿名用户",chatRoomId,RongIMLib.ConversationType.CHATROOM);
                            },
                            onError: function(error) {
                                // 加入聊天室失败
                            }
                        });
                        RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count ,1, {
                            onSuccess: function(chatRoom) {


                            },
                            onError: function(error) {

                            }
                        });
                    },
                    onTokenIncorrect: function() {

                    },
                    onError:function(errorCode){
                        var info = '';
                        switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                        }

                    }
                });             
            },
            // 计算video高度和宽度
            calculate_height(){
                var top_height=$(".top").height();
                var bottom_height=$(".bottom").height();
                var screen_height=$(window).height();
                var h=screen_height- top_height;
                $(".review_content").height(h); 
                $(".video-js").height(h);
                $(".video-js").width("100%");
            },
            //linkme生成深度链接 点击下载跑跑,打开跑跑进入APP
            jumpApp(){  
                var data = {};
                var geturl=self.location.href;              
                var index = geturl.indexOf("liveid=");
                var id = geturl.substring(index+"liveid=".length);               
                linkedme.init("bdf908335e5962287a7f5181b2e33f6d", data, function(){});
                    if(geturl.indexOf("run/live")!=-1){	
                        data.params = '{"path":"run/live","id":"'+id+'"}'; 
                    };                 
                data.type = "live";                  
                data.tags = "a";
                data.ios_custom_url = "https://www.hpaopao.com/d"; 
                // data.ios_direct_open = "true"; 
                data.android_custom_url = "https://www.hpaopao.com/d";
                // data.android_direct_open = "true";    
                linkedme.link(data, function(err, response){
                    if(err){
                    // 生成深度链接失败，返回错误对象err                    
                    } else {                                
                        document.getElementById("openAPP1").href=response.url; 
                        document.getElementById("openAPP2").href=response.url;                    
                    }
                },false);
            },
            //处理会话列表
            chat(){
                var msg = new RongIMLib.InformationNotificationMessage({"message": "命令"});           
                var datas="";
                var token="";
                var appkey="";
                var userId="";
                var userName="";
                var _this = this;
                var eventId; 
                var geturl=self.location.href;
                var index = geturl.indexOf("liveId=");
                var id = geturl.substring(index+"liveId=".length);
                var link=geturl.split("&");
                for(var ke in link) {
                    if(link[ke].indexOf("eventId=")!=-1){
                        var id_temp=link[ke].split("?");
                        for(var index in id_temp){
                            if (id_temp[index].indexOf("eventId=")!=-1) {
                                eventId=id_temp[index];
                            }
                        }
                    }                                  
                }; 
                var dataparam = {};  
                dataparam.flag = true;
                dataparam.liveId = id;
                dataparam.accountId = "99526098273959936";           
                var chatRoomId="";      
                $.ajax({
                    type:'POST', 
                    url:'https://web.hpaopao.com/live/voideList',
                    dataType:'JSON',
                    data:dataparam,
                    success:function(data){
                        chatRoomId=data.data.id;
                    }
                }); 
                $.ajax({
                    type:'POST',
                    url:"https://web.hpaopao.com/getToken/rongcloud",
                    async: false,
                    success:function(data){
                        token=data.token;
                        appkey=data.appkey;
                        userId=data.userId;
                        userName=data.userName;
                    }
                });
                //连接状态监听器
                RongIMClient.setConnectionStatusListener({
                    onChanged: function (status) {	   
                        switch (status) {
                            case RongIMLib.ConnectionStatus.CONNECTED:

                                break;
                            case RongIMLib.ConnectionStatus.CONNECTING:

                                break;
                            case RongIMLib.ConnectionStatus.DISCONNECTED:

                                break;
                            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:

                                break;
                            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:

                                break;
                        }
                    }
                });
                // 消息监听器
                RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function (message) {	   
                    // 判断消息类型
                    switch(message.messageType){
                        case RongIMClient.MessageType.LiveLine:  
                            var value=eval((JSON.parse(message.content.content)));

                            break;
                        case RongIMClient.MessageType.TextMessage:
                            var userName=message.content.user.name;
                            var temp={"userName":message.content.user.name,"message":message.content.content};

                            _this.chat_info.push(temp);
                            break;
                        case RongIMClient.MessageType.VoiceMessage:
                            // message.content.content 格式为 AMR 格式的 base64 码
                            RongIMLib.RongIMVoice.preLoaded(message.content.content);
                            break;
                        case RongIMClient.MessageType.ImageMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.LocationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.RichContentMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.InformationNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ContactNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.ProfileNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandNotificationMessage:
                            // do something...
                            break;
                        case RongIMClient.MessageType.CommandMessage:
                            // do something...               
                            break;
                        case RongIMLib.ConversationType.CHATROOM:

                            break;
                        case RongIMClient.MessageType.UnknownMessage:
                            // do something...
                            break;
                        
                        default:
                            // 自定义消息
                            // do something...
                    }
                }
                });
                //初始化SDK                
                RongIMClient.init(appkey);
                RongIMLib.RongIMClient.init(appkey);
                RongIMClient.RegisterMessage.LiveMessage = function(message){
                    this.messageName = "LiveMessage";
                    this.encode = function(){
                    return "accountId="+message.accountId+";nick="+message.nick+";image="+message.image+";runningcode="+message.runningcode+";sex="+message.sex
                    +";longitude="+message.longitude+";latitude="+message.latitude+";duration="+message.duration+";distance="+message.distance+";rank="+message.rank+
                    ";age="+message.age+";lv="+message.lv+";eventId="+message.eventId+";entryId="+message.entryId;}
                    this.decode = function(message){
                    if (typeof message != "string") {
                        return message;
                    }
                    var strArrs = message.split(";"),
                    msg = new RongIMClient.RegisterMessage.LiveMessage();
                    for(var p in strArrs){
                        msg[strArrs[p].split("=")[0]]=strArrs[p].split("=")[1];
                    }
                    return msg;
                    }
                };
                //创建消息
                var messageName = "LiveLine"; // 消息名称。
                var objectName = "PP:LiveLineTxtMsg"; // 消息内置名称，请按照此格式命名。
                var mesasgeTag = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
                var propertys = ["accountId","nick","image","runningcode","sex","longitude","latitude","duration","distance","rank","age","lv","praiseNum","eventId","entryId"]; // 消息类中的属性名。
                RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,["content","extra"]);
                var conversationType = RongIMLib.ConversationType.CHATROOM;//聊天室
                //连接融云服务器。
                    RongIMClient.connect(token, {
                    onSuccess: function(userId) { 

                        var count = 20;// 拉取最近聊天最多 50 条。
                        RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
                            onSuccess: function() {
                                //  sendMessage("游客加入聊天室",userId,"https://www.hpaopao.com/paopao/appWeb/images/newslog.png","匿名用户",chatRoomId,RongIMLib.ConversationType.CHATROOM);
                            },
                            onError: function(error) {
                                // 加入聊天室失败
                            }
                        });
                        RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count ,1, {
                            onSuccess: function(chatRoom) {


                            },
                            onError: function(error) {

                            }
                        });
                    },
                    onTokenIncorrect: function() {

                    },
                    onError:function(errorCode){
                        var info = '';
                        switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                        }

                    }
                });             
            },
        }
    }
</script>