<template style="font_size:10px">
    <div class="RedPacket_envelope">
        <div class="top_picture" id="picture_id">            
            <div class="top_image"> 
                <img src="./Red_envelope/share_top.png" class="image" id="image_id">
            </div>
        </div>
        <div class="main_part">
            <div class="text_info">
               <p class="periods_number" id="periods_id">{{number}}期红包总额(元)</p>
               <p class="total" id="total_id" style="height:3.5rem">{{total}}</p>
               <p class="content">参赛后跑步单次里程达到{{distance}}公里后分红包</p>
               <p class="content">当前已有{{people}}人报名</p>
            </div>
            <div class="bottom" id="bottom_id">
                <a class="linkedme" id="openAPP2" v-on:click="jumpApp">
                <div class="sign_up" id="change_class">
                     <p id="apply_id" class="apply_now">立即报名</p>
                     <!-- <p class="apply_now" id="apply1_id" v-show="hide_on">等待开赛</p> -->
                     <p class="starting_time" id="time_id">{{runningTime}}</p>
                     <p class="begining">开赛</p>
                     
                </div>
                </a>
                <div class="regulation" id="regulation_id">
                     <div class="detail" id="detail_id">
                         <p class="rules">详情规则</p>
                         <span class="rules_info">
                             <ul id="rules_id">
                                 <li id="text_list1"><p class="detail_number" id="number1_id">1</p><p class="detail_word" id="change_text1">点击报名缴纳{{promise_money}}元保证金即报名成功 (明日开赛)</p></li>
                                 <li  id="text_list2"><p class="detail_number" id="number2_id">2</p><p class="detail_word"  id="change_text2">使用跑跑APP完成单次里程{{distance}}公里(挑战成功)</p></li>
                                 <li  id="text_list3"><p class="detail_number" id="number3_id">3</p><p class="detail_word"  id="change_text3">完赛后挑战成功即可获得现金(红包奖励)</p></li>
                             </ul>
                         </span>
                     </div>
                     <a  id="openAPP1" class="linkedme"  v-on:click="jumpApp">
                     <div class="apply">
                         <p class="apply_bottom">打开跑跑</p>                                       
                     </div>
                     </a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import './Red_envelope.css';
</style>
<script>
import { hexMD5 } from '../../router/Md5.js';
// import from 
export default {
  name: 'RedPacket_envelope',
  data(){
      return{
            number:'',
            total:'',
            people:'',
            runningTime:'',
            distance:'',
            promise_money:'',
        //   login:''
      }
  },
  beforeCreate(){
    document.getElementById('titleId').innerHTML = '红包大挑战（跑步赢现金，越跑越来劲）';    
  },
 mounted(){
    this.getPath();
    this.getSize();
    this.jumpApp();
  },
  methods:{
        getSize(){
            $('.text_info').animate({bottom:"70%"},700);

            var screenWidth=document.body.clientWidth ;
            
            if(screenWidth<=330){
                
                $('#change_class').removeClass("sign_up");
                $('#change_class').addClass("sign1_up");
                $('.detail_word').removeClass("detail_word");
                $('#change_text1').addClass("detail1_word");
                $('#change_text2').addClass("detail1_word");
                $('#change_text3').addClass("detail1_word");
                $('#detail_id').removeClass("detail");
                $('#detail_id').addClass("detail1");
                $('#picture_id').removeClass("top_picture");
                $('#picture_id').addClass("top_picture1");  
                $('#total_id').removeClass("total");
                $('#total_id').addClass("total1");  
                $('#regulation_id').removeClass("regulation");
                $('#regulation_id').addClass("regulation1");
                $('#apply_id').removeClass("apply_now");
                $('#apply_id').addClass("apply_new");
                $('#apply1_id').removeClass("apply_now");            
                $('#apply1_id').addClass("apply_new"); 
                $('#time_id').removeClass("starting_time");
                $('#time_id').addClass("starting1_time");
                $('.detail_number').removeClass("detail_number");
                $('#number1_id').addClass("detail1_number");
                $('#number2_id').addClass("detail1_number");
                $('#number3_id').addClass("detail1_number");
                $('#image_id').removeClass("image");
                $('#image_id').addClass("image1");
                $('.rules_info ul').css("margin","0.2rem");
            }
            var screenheight=$(window).height();
            var screenheight=document.body.offsetHeight ;
            var screenwidth=$(window).width();           
            if (screenheight>=700) {
                $('#change_class').removeClass("sign_up");
                $('#change_class').addClass("signX_up");
                $('#regulation_id').removeClass("regulation");
                $('#regulation_id').addClass("regulationX");
                $('#detail_id').removeClass("detail");
                $('#detail_id').addClass("detailX");
                $('#image_id').removeClass("image");
                $('#image_id').addClass("imageX");
                $('#bottom_id').removeClass("bottom");
                $('#bottom_id').addClass("bottomX");
                $('#text_list1').addClass("list");
                $('#text_list2').addClass("list");
                $('#text_list3').addClass("list");
                $('#rules_id').addClass("rules_infoX");            
            }

        },
        getPath(){            
            var geturl=self.location.href;  
            var params;
            var temp=[];  
            var activeId;
            var re=geturl.split("?");  
            for(var i = 0;i<re.length;i++){             
                if(re[i].indexOf("activeId")!=-1){
                    if(re[i].indexOf("&")!=-1){                           
                        var url_temp=[];
                        url_temp=re[i].split('&');                            
                        for(var j=0;j<url_temp.length;j++){                                                        
                            if(url_temp[j].indexOf("activeId")!=-1){                              
                                var index = url_temp[j].indexOf("activeId="); 
                                activeId= url_temp[j].substring(index + "activeId=".length);
                            }
                        }
                    }else{
                        var index = geturl.indexOf("activeId=");
                        activeId=geturl.substring(index + "activeId=".length);
                    }
                }
            };
            params={'activeId':activeId};       
            var request = getSign(params,"6a64b838f0964483aa107540a26368a5");                 
            var _this = this;
            $.ajax({
                type:'POST', 
                url:'https://web.hpaopao.com/activity/shareIndex',
                dataType:'JSON',
                data: request,
                success:function(data){
                    var data=data.data;
                    var periods_number=data.periods;
                    periods_number = (periods_number>=1000) ? periods_number : (periods_number>=100 ? '0'+periods_number : (periods_number>=10 ? '00'+periods_number : '000'+periods_number));
                    _this.number=periods_number;
                    _this.total=((data.totalPrice)/100).toFixed(2);
                    _this.people=data.enrollNumbers;
                    _this.distance=data.km;
                    _this.promise_money=((data.enrollPrice)/100);                    
                    var time=data.todayMatchDate;
                    var date_number=new Date(time);
                    var year =date_number.getFullYear();
                    var month = date_number.getMonth() + 1; 
                    month=month<=9?"0"+month:month;
                    var day =date_number.getDate();
                    day=day<=9?"0"+day:day;
                    var hours = date_number.getHours();
                    hours=hours<=9?"0"+hours:hours;
                    var minutes = date_number.getMinutes();
                    minutes=minutes<=9?"0"+minutes:minutes;
                    _this.runningTime=year+'/'+month+'/'+day+' '+hours+':'+minutes; 
                }
            })
        },
        jumpApp(){    
            var data = {};            
            var geturl=self.location.href;            
            var id
            var re=geturl.split("?");  
            for(var i = 0;i<re.length;i++){             
                if(re[i].indexOf("activeId")!=-1){
                    if(re[i].indexOf("&")!=-1){                           
                        var url_temp=[];
                        url_temp=re[i].split('&');                            
                        for(var j=0;j<url_temp.length;j++){                                                        
                            if(url_temp[j].indexOf("activeId")!=-1){                              
                                var index = url_temp[j].indexOf("activeId="); 
                                id= url_temp[j].substring(index + "activeId=".length);                                                                                                              
                            }
                        }
                    }else{
                        var index = geturl.indexOf("activeId=");
                        id=geturl.substring(index + "activeId=".length);
                    }
                }
            };
            linkedme.init("bdf908335e5962287a7f5181b2e33f6d", data, function(){});
                    if(geturl.indexOf("run/redPacket")!=-1){	
                        data.params = '{"path":"run/redPacket","id":"'+id+'"}'; 
                    };                 
                data.type = "live";                  
                data.tags = "a";
                data.ios_custom_url = "https://www.hpaopao.com/d"; 
                data.android_custom_url = "https://www.hpaopao.com/d";
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
    req.hpaopao_time = t;
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
    req.hpaopao_sign = hexMD5(str + secret).substr(5, 20);
    return req;
    }

</script>
    