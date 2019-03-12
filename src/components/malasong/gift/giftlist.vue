<template style="font_size:10px">
    <div class="giftList">
        <!-- <div class="giftDetailIcon">            
            <img src="../total_img/gobackIcon.png" alt="" @click="goback">
            <div class="recordTitle">抽奖记录</div>
        </div> -->
        <div v-for="(item,i) in list" :key="i" class="lotteryTotal"  v-show = "!recordShow" >
            <div @click="goDetail(item)" :class="item.status == '0' ? 'lotteryList':'lotteryListgrey'" >
            <!-- <div @click="goDetail(item)" class="lotteryList" v-if="item.status == '0'"> -->
                <div class="lotteryimg">
                    <img src="../total_img/cjred.png" alt="">
                </div>
                <div class="lotteryDetail">
                    <div class="lotteryTitle">
                        {{item.price}}元
                       <!-- {{item.price}} -->
                    </div>
                    <div class="lotteryconsume">
                        跑跑奖金
                    </div>
                    <div class="lotterydate">
                        有效期：{{item.expireTime}}
                    </div>
                </div>
            </div>                                
        </div> 
        <div v-show = "recordShow" class="noRecord">
            <div>{{msg}}</div>
            <img src="../total_img/none.png" alt="" style="width:100%">            
        </div>        
        <!-- <span>抽奖列表</span> -->
    </div>
</template>
<style scoped>
.noRecord{
    top: 160px;
    position: absolute;
}
.giftDetailIcon{
    text-align: left;
    position: relative;
    height: 40px;
    background: #fff;
}
.giftDetailIcon img{
    width: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
}
.recordTitle{
    position: absolute;
    left: 40px;
    top: 9px;
}
.lotterytitle{
    height: 30px;
    display: table-cell;
    vertical-align: bottom;
}
.lotteryconsume{
    border-bottom: 1px dashed #fff;
    font-size: 14px;
    height: 40px;
    line-height: 30px;
}
.lotterydate{
    font-size: 14px;
    height: 30px;
    line-height: 30px;
}
.lotteryDetail{    
    position: relative;
    left: 50px;
    color: #fff;
    text-align: left;
    width: 70%;
}
.lotteryimg{    
    position: relative;
    top: 50%;
    margin-top: -20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 50%
}
.lotteryimg img{
    width: 20px;
    height: 27px;
    position: absolute;
    top: 6.5px;
    left: 10px;
}
.giftList{    
    height: 100%;
    width: 100%;
    background: #eee;
    overflow-x: hidden;
}
.lotteryTotal{
    padding-top: 10px
}
.lotteryListgrey{
    display: flex;
    height: 100px;
    /* line-height: 30px; */
    background: #fff;
    /* border-bottom: 1px solid #eee; */
    width: 95%;
    margin-left: 2.5%;
    background: #999;
    color: #fff;
    border-radius: 8px;
    position: relative;
}
.lotteryList{    
    display: flex;
    height: 100px;
    /* line-height: 30px; */
    background: #fff;
    /* border-bottom: 1px solid #eee; */
    width: 95%;
    margin-left: 2.5%;
    background: #dc0002;
    color: #fff;
    border-radius: 8px;
    position: relative;
}
/* .lotteryLeft{
    width:50%;
    text-align: left;
    padding-left: 20px;
}
.lotteryRight{
    width:50%;
    text-align: right;
    padding-right: 20px;
} */
/* .lotteryDate{
    color: #999;
    font-size: 15px;
} */
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
// import from 
export default {
    name: 'gift',
    data(){
    return{
        list:[],
        listArray:[],
        recordShow:false,
        msg:'',
        pageNo:1,
        array:[],
        match:[]
    }
    },
    beforeCreate(){
        document.getElementById('titleId').innerHTML = '抽奖记录';    
    },
    mounted(){  
        this.getList();
        window.addEventListener('scroll', this.getbottom);
    },
    destroyed(){
        //window.removeEventListener("scroll",this.handleScroll);
        window.removeEventListener('scroll', this.getbottom);
    },
    methods:{ 
        goback(){
            window.history.back(-1); 
        },
        goDetail(item){
            var title = item.title;
            var startTime = item.startUseTime;
            var endtime = item.expireTime;
            var price = item.price;
            var redpacket = item.redpacket;
            var id = item.id;
            this.$router.push({ path: '/giftdetail',query:{title:title,startTime:startTime,endtime:endtime,price:price,redpacket:redpacket,id:id}});
        },
        getList(){
            let loading = this.$loading()
            var geturl=self.location.href;  
            var params;
            var temp=[];  
            var mobile;
            var re=geturl.split("?");  
            for(var i = 0;i<re.length;i++){             
                if(re[i].indexOf("mobile")!=-1){
                    if(re[i].indexOf("&")!=-1){                           
                        var url_temp=[];
                        url_temp=re[i].split('&');                            
                        for(var j=0;j<url_temp.length;j++){                                                        
                            if(url_temp[j].indexOf("mobile")!=-1){                              
                                var index = url_temp[j].indexOf("mobile="); 
                                activeId= url_temp[j].substring(index + "mobile=".length);
                            }
                        }
                    }else{
                        var index = geturl.indexOf("mobile=");
                        mobile=geturl.substring(index + "mobile=".length);
                    }
                }
            };
            params={'mobile':mobile,pageNo:this.pageNo};       
            var request = getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");                 
            var _this = this;
            $.ajax({
                type:'POST', 
                url:'https://app.marathonbm.com/coupon/luckDrawList',
                // url:'http://192.168.2.17:8082/coupon/luckDrawList',                
                // url:'http://ceshi.marathonbm.com/coupon/luckDrawList',

                dataType:'JSON',
                data: request,
                success:function(data){
                    var data = data;
                    if(data.code == 1){
                        var listTemp = data.list;
                        if(listTemp.length==0){
                            _this.msg="暂无抽奖记录";
                            _this.recordShow=true;
                        }else{
                            for(var ke in listTemp){
                                listTemp[ke].price = (parseInt(listTemp[ke].price)*0.01).toFixed(2);
                                listTemp[ke].redpacket = (parseInt(listTemp[ke].redpacket)*0.01).toFixed(2);
                                _this.list.push(listTemp[ke]);
                            }
                            // _this.list.push(listTemp);
                            // _this.array=[];
                            // _this.enrollList=data.list; 
                            // _this.array = _this.match.concat(data.list);
                        }                        
                        // _this.getPath();
                    }else{
                    }                        
                }
            })  
            loading.close()
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
                        // _this.match = _this.array;
                        var num = _this.pageNo;
                        num++;                        
                        _this.pageNo=num;
                        _this.getList(); 
                        }
                　　}else{
                        p = $(this).scrollTop();
                        setTimeout(function() {
                            t = p;
                        }, 0);
                    }
                });
            },
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


</script>
    