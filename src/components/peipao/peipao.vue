<template>
    <div class="peipao">
        <div class="enter">
            <div>
                <audio autoplay="autoplay"   loop="loop" id="bgmusic">
                    <!-- <source src="./tiager.mp3" type="audio/ogg">
                    <source src="./tiager.mp3" type="audio/mpeg"> -->
                    Your browser does not support the audio element.
                </audio>
                <img src="./image/资源 5-8.png" class="peipao_logo">
                <img src="./image/资源 4-8.png" class="music_first" v-show="music_calm" @click="stop_or_begin">
                <img src="./image/record.gif" class="music_first" @click="stop_or_begin" v-show="music_move">
            </div>
            <div>                
                <div class="run"></div>
                <div class="test" id="test_value"></div>
            </div>
            <div>            
                <div class="middle_img" id="house">
                    <div class="girl" id="boy_id"></div>
                    <div  class="boy" id="girl_id"></div>
                </div>
            </div>
            <div class="enter_bottom">
                <div class="text_name">
                    <input type="text" class="name" placeholder="输入姓名" v-model="nick" @click="fixed_height" maxlength="10" >
                </div>
                <div class="enter_button" @click="next_page" id="click_test"></div>
            </div>       
        </div>
        <div class="peipao_first">
            <div class="sports_image">
                <p class="peipao_sporters"></p>
            </div>
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="introduce">
                <div class="introduce_bg"><p class="introduce_text"></p></div>           
                <div class="middle_img">
                    <div class="girl1"></div>
                    <div class="boy1"></div>
                </div>
            </div>
            <div class="next_step" @click="jump_text_sex"></div>
        </div>
        <div class="peipao_second">
            <div class="sex_a">
                <p class="sex">
                </p>
            </div>
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="total">
                <div class="men"></div>          
                <div class="women"></div> 
            </div>
            <form action="">
                <div class="check_one">
                    <label class="radiobox" id="check_a"><input name="current" type="radio" value="1" @click="toggle1" id="choose_boy" style="display:none"></label>
                    <span class="check_men">男<i><img src="./image/资源 27-8.png" alt="" class="logo"></i></span>
                </div>
                <div class="check_two">
                    <label class="radiobox2" id="check_b"><input name="current" type="radio" value="2" @click="toggle2" id="choose_girl" style="display:none"></label>
                    <span class="check_women">女</span>
                    <span><i style="float:left"><img src="./image/资源 26-8.png" alt="" class="logo"></i></span>
                </div>
            </form>
                  
            <div class="next_step" @click="jump_next"></div>
        </div> 
        <div class="peipao_third">
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="page">1/6</div>
            <div class="question"></div>
            <div class="answer">
                <form action="">
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_two($event)" value="1">A.只可意会不可言传的感受</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_two($event)" value="2">B.有一丝丝担忧</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_two($event)" value="3">C.拒绝，选择一个人默默刷圈</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_two($event)" value="4">D.跑步？打扰了</label>
                </form>
            </div>
        </div>  
        <div class="peipao_four">
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="page">2/6</div>
            <div class="question1"></div>
            <div class="answer">
                <form action="">
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_three($event)" value="1">A.基普乔格——马拉松运动员</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_three($event)" value="2">B.张钧甯——影视演员</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_three($event)" value="3">C.宁泽涛——游泳健将</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_three($event)" value="4">D.贾玲——喜剧演员</label>
                </form>
            </div>
        </div> 
        <div class="peipao_five">
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="page">3/6</div>
            <div class="question2"></div>
            <div class="answer">
                <form action="">
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_four($event)" value="1">A.十全十美</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_four($event)" value="2">B.速度型，带你追上XXX</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_four($event)" value="3">C.不忘初心</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_four($event)" value="4">D.被耽误的段子手</label>
                </form>
            </div>
        </div>
        <div class="peipao_six">
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="page">
                4/6
            </div>
            <div class="question3">
            </div>
            <div class="answer">
                <form action="">
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_five($event)" value="1">A.管不住嘴，还迈不开腿</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_five($event)" value="2">B.师傅我坚持不住啦</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_five($event)" value="3">C.一个人太孤单</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_five($event)" value="4">D.阻力？不存在的</label>
                </form>
            </div>
        </div>
        <div class="peipao_seven">
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="page">
                5/6
            </div>
            <div class="question4">
            </div>
            <div class="answer">
                <form action="">
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_six($event)" value="1">A.旭日东升</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_six($event)" value="2">B.夜幕降临</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_six($event)" value="3">C.随时都可以</label>
                    <label class="answer_a"><input type="radio" style="display:none" @click="jump_six($event)" value="4">D.月黑风高夜</label>
                </form>
            </div>
        </div>
        <div class="peipao_eight">
            <img src="./image/资源 4-8.png" class="music_page" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_page" @click="stop_or_begin" v-show="music_move">
            <div class="page">
                6/6
            </div>
            <div class="question5">
            </div>
            <div class="answer">
                <form action="">
                    <label class="answer_a"><input type="radio" value="1" style="display:none" @click="jump_endding($event)">A.我们不一样，就这样透明下去</label>
                    <label class="answer_a"><input type="radio" value="2" style="display:none" @click="jump_endding($event)">B.来陪跑，刷存在感</label>
                    <label class="answer_a"><input type="radio" value="3" style="display:none" @click="jump_endding($event)">C.开始黑练，创造奇迹</label>
                    <label class="answer_a"><input type="radio" value="4" style="display:none" @click="jump_endding($event)">D.呵呵，人生如戏，全靠演技</label>
                </form>
            </div>
        </div>
        <div class="endding">
            <img src="./image/资源 4-8.png" class="music_endding" v-show="music_calm" @click="stop_or_begin">
            <img src="./image/record.gif" class="music_endding" @click="stop_or_begin" v-show="music_move">
            <div class="value"><div class="nick">{{nick|acName}}</div><div class="peipao_value">的陪跑价值为</div>
            </div> 
            <div class="car">
                <p class="carname">{{carname}}</p>
            </div> 
            <div class="index">
                <img src="./image/126015187816443103.png" class="star" v-show="star1">
                <img src="./image/126015187816443103.png" class="star" v-show="star2">
                <img src="./image/126015187816443103.png" class="star" v-show="star3">
                <img src="./image/126015187816443103.png" class="star" v-show="star4">
                <img src="./image/126015187816443103.png" class="star" v-show="star5">                
                <img src="./image/397063465195076569.png" class="star" v-show="starf">
                <img src="./image/397063465195076569.png" class="star" v-show="starg">
                <img src="./image/397063465195076569.png" class="star" v-show="starh">
                <img src="./image/397063465195076569.png" class="star" v-show="stari">
                <img src="./image/397063465195076569.png" class="star" v-show="starj">
                
                <img src="./image/296362280644065572.png" class="star" v-show="stara">
                <img src="./image/296362280644065572.png" class="star" v-show="starb">
                <img src="./image/296362280644065572.png" class="star" v-show="starc">
                <img src="./image/296362280644065572.png" class="star" v-show="stard">
                <img src="./image/296362280644065572.png" class="star" v-show="stare">
            </div>   
            <div class="description">{{value_text}}</div>   
            <div class="click">
                <div class="click_button click_again" @click="to_first"></div>
                <div class="click_button test_now" @click="to_peipao"></div>
            </div>
            <div class="peipao_code">
                <div class="peipao_word">长按二维码</div>
                <img src="./image/344753450459686209.jpg" class="peipao_picture">
                <div class="peipao_text">识别小程序</div>
            </div>    
        </div>
        <div class="peipao_share" v-show="if_show" @click="display">
            <div class="share_img">

            </div>
        </div>
    </div>
</template>
<style>
@import './peipao.css';   
</style>
<script>
//import share from "./share.js";
export default {
    name:'peipao',
    filters: {
        acName(v){
            return v.length>3 ? v.substr(0,3)+'...' : v;
        },
    },
    data() {
        return {
            nick:'',
            music_calm:null,
            music_move:true,
            man_or_womon:null,
            endding_name:'',
            carname:'',
            value_text:'',
            ischecked:false,
            ifchecked:false,
            value:100,
            star1:null,
            star2:null,
            star3:null,
            star4:null,
            star5:null,
            stara:null,
            starb:null,
            starc:null,
            stard:null,
            stare:null,
            starf:null,
            starg:null,
            starh:null,
            stari:null,
            starj:null,
            if_show:null
        }
    },
    beforeCreate(){
        document.getElementById('titleId').innerHTML = '测测你的陪跑价值';  
    },
    mounted() {  
        this.fixed_height();
        this.cal();
        // this.share();
    },
    methods: {
        next_page(){
            if(this.nick==""||this.nick==null){
                alert("名字不能为空");
            }else{
                setTimeout(() => {
                    $(".enter").css("display","none");
                    $(".peipao_first").css("display","block");
                }, 500);   
               
            }
        },
        display(){
            $(".peipao_share").css("display","none");
        },
        fixed_height(){
                $(".name").focus(function(){
                    var h=$(window).height();
                    $(".peipao").height(h);
                });
                $(".name").blur(function(){

                });
       },
        stop_or_begin(){            
            var audio = document.getElementById('bgmusic');             
             if(audio!==null){      //检测播放是否已暂停.audio.paused 在播放器播放时返回false.  
                if(!audio.paused){ 
                    this.music_calm=true;
                    this.music_move=false;           
                    audio.pause(); //背景音乐暂停
                }else{
                    this.music_calm=false;
                    this.music_move=true;
                    audio.play();//背景音乐播放 
                }
             } 
        },
        jump_text_sex(){
            setTimeout(() => {
                $(".peipao_first").css("display","none");
                $(".peipao_second").css("display","block");
            }, 500);            
        },
        jump_next(){
            if(this.man_or_womon!=null){
                setTimeout(() => {
                    $(".peipao_second").css("display","none");
                    $(".peipao_third").css("display","block");
                }, 500); 
           }  
            else{
                alert("请选择性别");
            }
        },          
        jump_two(event){ 
             this.value=100;
            var value_number = event.currentTarget;            
            if(value_number.value==1){
                this.value=this.value-0;
            }else if(value_number.value==2){
                this.value=this.value-5;
            }else if(value_number.value==3){
                this.value=this.value-10;
            }else{
                this.value=this.value-15;
            }
            setTimeout(() => {
                $(".peipao_third").css("display","none");
                $(".peipao_four").css("display","block");
            }, 500);            
        } ,
        jump_three(event){ 
            var value_number =  event.currentTarget;
            if(value_number.value==1){
                this.value=this.value-1;
            }else if(value_number.value==2){
                this.value=this.value-0;
            }else if(value_number.value==3){
                this.value=this.value-3;
            }else{
                this.value=this.value-2;
            }
            setTimeout(() => {
                $(".peipao_four").css("display","none");
                $(".peipao_five").css("display","block");
            }, 500);            
        } ,
        jump_four(event){ 
            var value_number =  event.currentTarget;
            if(value_number.value==1){
                this.value=this.value-3;
            }else if(value_number.value==2){
                this.value=this.value-1;
            }else if(value_number.value==3){
                this.value=this.value-0;
            }else{
                this.value=this.value-2;
            }
            setTimeout(() => {
                $(".peipao_five").css("display","none");
                $(".peipao_six").css("display","block");
            }, 500);            
        } ,
        jump_five(event){ 
            var value_number =  event.currentTarget;
            if(value_number.value==1){
                this.value=this.value-8;
            }else if(value_number.value==2){
                this.value=this.value-6;
            }else if(value_number.value==3){
                this.value=this.value-2;
            }else{
                this.value=this.value-0;
            }
            setTimeout(() => {
                $(".peipao_six").css("display","none");
                $(".peipao_seven").css("display","block");
            }, 500);             
        } ,
        jump_six(event){ 
            var value_number =  event.currentTarget;
            if(value_number.value==1){
                this.value=this.value-1;
            }else if(value_number.value==2){
                this.value=this.value-2;
            }else if(value_number.value==3){
                this.value=this.value-0;
            }else{
                this.value=this.value-3;
            }
            setTimeout(() => {
                $(".peipao_seven").css("display","none");
                $(".peipao_eight").css("display","block");
            }, 500);            
        },
        jump_endding(event){
            var value_number =  event.currentTarget;
            if(value_number.value==1){
                this.value=this.value-3;
            }else if(value_number.value==2){
                this.value=this.value-0;
            }else if(value_number.value==3){
                this.value=this.value-1;
            }else{
                this.value=this.value-2;
            };
            if(this.value<=100&&this.value>=96){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

                this.star1=true;
                this.star2=true;
                this.star3=true;
                this.star4=true;
                this.star5=true;
                this.carname="布加迪威龙";
                this.value_text="论陪跑咱是认真的,上可知天文地理,下可去翻山越岭";
            }else if(this.value<=95&&this.value>=91){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

                this.star1=true;
                this.star2=true;
                this.star3=true;
                this.star4=true;
                this.starj=true;
                $(".star4").attr("src","./image/397063465195076569.png");
                this.carname="迈巴赫";
                this.value_text="咱具备跑步技能,不带减CD,偶尔小确幸,是被埋没的陪跑者";
            }else if(this.value<=90&&this.value>=86){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

                this.star1=true;
                this.star2=true;
                this.star3=true;
                this.star4=true;
                this.stare=true;
                this.carname="宾利";
                this.value_text="跑步与才华双全,看似摸不透,实则很热情,懂得抓住陪跑机遇";
            }else if(this.value<=85&&this.value>=81){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

               this.star1=true;
                this.star2=true;
                this.star3=true;
                this.star4=true;
                this.stare=true;              
                this.carname="劳斯莱斯";
                this.value_text="跑步多奇妙,谁跑谁知道,生活多美好,赶紧来陪跑";
            }else if(this.value<=80&&this.value>=76){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

                this.star1=true;
                this.star2=true;
                this.star3=true;
                this.stard=true;
                this.stare=true;  
                this.carname="法拉利";
                this.value_text="陪跑很适合咱,既可以赚点外快,又可以打发时间,何乐而不为";
            }else if(this.value<=75&&this.value>=71){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

                this.star1=true;
                this.star2=true;
                this.star3=true;
                this.stard=true;
                this.stare=true;
                this.carname="奔驰";
                this.value_text="跑步不可怕,懒得跑步才可怕,开启陪跑,开启不一样的人生";
            }else if(this.value<=70&&this.value>=66){
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

               this.star1=true;
                this.star2=true;
                this.starh=true;
                this.stard=true;
                this.stare=true;
                this.carname="桑塔纳";
                this.value_text="不贪，不狂，不痴不拼，不争，不伤随缘跑步，善哉善哉咱是佛系陪跑者，咱为自己代言";
            }else{
                this.star1=null;
                this.star2=null;
                this.star3=null;
                this.star4=null;
                this.star5=null;
                this.stara=null;
                this.starb=null;
                this.starc=null;
                this.stard=null;
                this.stare=null;
                this.starf=null;
                this.starg=null;
                this.starh=null;
                this.stari=null;
                this.starj=null;

                  this.star1=true;
                this.starg=true;
                this.starc=true;
                this.stard=true;
                this.stare=true;
                this.carname="奥拓";
                this.value_text="最想跑的步,在故事里,在梦里,但不在咱这里";
            };
            var request={};
            request.name=this.nick;
            request.score=this.value;
            request.sex=this.man_or_womon;
            $.ajax({
                    type:'POST', 
                    url:'https://web.hpaopao.com/peipao/qa',
                    dataType:'JSON',
                    data:request,
                    success:function(data){
                    }
            }); 
            setTimeout(() => {
                $(".peipao_eight").css("display","none");
                $(".endding").css("display","block");
            }, 500);           
        },
        to_first(){
            setTimeout(() => {
                $(".endding").css("display","none");
                $(".enter").css("display","block");
            }, 500); 
        },
        toggle1(){
            $("#check_b").attr("class","radiobox");
            var $radio = $("#choose_boy");  
            if ($radio.data('waschecked') == true) {  
                $radio.prop('checked', false);  
                $radio.data('waschecked', false); 
                $("#check_a").attr("class","radiobox"); 
                this.man_or_womon=null; 
            }  
            else{  
                $radio.prop('checked', true);  
                $radio.data('waschecked', true); 
                 $("#check_a").attr("class","radiobox1"); 
                 $("#check_b").attr("class","radiobox");
                  this.man_or_womon=$('input:radio[name="current"]:checked').val();
            };   
            $radio.siblings('input[type="radio"]').data('waschecked', false); 
        },
        toggle2(){
            $("#check_a").attr("class","radiobox"); 
            var $radio = $("#choose_girl");  
            // if this was previously checked  
            if ($radio.data('waschecked') == true)  
            {  
                $radio.prop('checked', false);  
                $radio.data('waschecked', false); 
                 $("#check_b").attr("class","radiobox"); 
                 this.man_or_womon=null; 
            }  
            else  
            {  
                $radio.prop('checked', true);  
                $radio.data('waschecked', true);  
                $("#check_b").attr("class","radiobox1");
                $("#check_a").attr("class","radiobox"); 
                 this.man_or_womon=$('input:radio[name="current"]:checked').val();
            }; 
            // remove was checked from other radios  
            $radio.siblings('input[type="radio"]').data('waschecked', false); 
        },
        to_peipao(){
           $(".peipao_share").css("display","block");
        },
        cal(){
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?dedafc89afeb54b5eec3658f16af9b0c";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();        
        },
        share(){ 
            alert(window.location.href.split('#')[0]);
            var timestamp='';
            var nonceStr='';
            var signature='';            
            $.ajax({
                type:'POST', 
                url:'https://web.hpaopao.com/weixin/accessToken?requestUrl='+window.location.href.split('#')[0],
                async: false,
                success:function(data){
                    timestamp=data.data.timestamp;
                    nonceStr=data.data.nonceStr;
                    signature=data.data.signature;
                }
            });
            wx.config({
                // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxd9f9ebeadeaf33b9', // 必填，公众号的唯一标识
                timestamp:timestamp , // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            }); 
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            }); 
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            }); 
            wx.onMenuShareTimeline({
                title: '测测你的陪跑价值', // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: './image/20180515111459.png', 
                success: function () {
                // 用户点击了分享后执行的回调函数
                }        
            });
            wx.onMenuShareAppMessage({
                 title: '测测你的陪跑价值', // 分享标题
                desc: '让跑步更来戏', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: './image/20180515111459.png', 
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                // 用户点击了分享后执行的回调函数
                }
            });
            wx.onMenuShareQQ({
                 title: '测测你的陪跑价值', // 分享标题
                desc: '让跑步更来戏', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: './image/20180515111459.png', 
                success: function () {
                // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareWeibo({
                title: '测测你的陪跑价值', // 分享标题
                desc: '让跑步更来戏', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: './image/20180515111459.png', // 分享图标
                success: function () {
                // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareQZone({
                title: '测测你的陪跑价值', // 分享标题
                desc: '让跑步更来戏', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: './image/20180515111459.png', // 分享图标
                success: function () {
                // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                // 用户取消分享后执行的回调函数
                }
            });
        }
    }
}
// var data={
//     imgurl:"http://cms-bucket.nosdn.127.net/15447b3150fc427789fa41225d843b2b20170914111552.jpeg",
//     title:"测测你的陪跑价值",
//     body:"让跑步更来戏",
//     GlobalShareUrl:window.location.href
// }
// document.addEventListener('WeixinJSBridgeReady', function() {
//     alert(1);
//   window.WeixinJSBridge.on('menu:share:appmessage', function(argv) {
//     return window.WeixinJSBridge.invoke('sendAppMessage', {
//       "img_url": data.imgurl || imgurl,
//       "link": data.GlobalShareUrl, // 获取分享出去的link
//       "desc": data.body,
//       "title": data.title
//     }, function() {
//         alert(JSON.stringify(e))

//     });
//   });
//    window.WeixinJSBridge.on('menu:share:timeline', function(argv) {
//     return window.WeixinJSBridge.invoke('shareTimeline', {
//       "img_url": data.imgurl || imgurl,
//       "link": data.GlobalShareUrl,// 获取分享出去的link
//       "desc": data.body,
//       "title": data.title
//     }, function() {
//         alert(JSON.stringify(e))
//     });
//   });
// }); 
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {// 

//发送给好友
WeixinJSBridge.on('menu:share:appmessage', function(argv){
alert(1);
});
//分享到朋友圈
WeixinJSBridge.on('menu:share:timeline', function(argv){
alert(2);
});

}, false);
 </script>
    