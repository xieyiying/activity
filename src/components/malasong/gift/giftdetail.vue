<template style="font_size:10px">
    <div class="giftdetail">
        <!-- <div class="giftdetailback">            
            <img src="../total_img/gobackIcon.png" alt="" @click="goback">
             <div class="giftdetailbackTitle">奖金明细</div>
        </div> -->
        <div class="Lottery_details">
            <div class="Lottery_top">
                <div class="Lottery_top_img">
                    <img src="../total_img/cjred.png" alt="">
                </div>
                <span>由跑跑网提供</span>
            </div>
            <div class="Lottery_middle">
                <div style="position: absolute;top: 20%;width: 80%;left: 10%;">                    
                    <div class="lottery_title">{{title}}</div>
                    <div class="lottery_balance">奖金余额:{{price}}元</div>
                </div>
                <div class="Lottery_info">
                    <div class="lottery_date">
                        <div class="lottery_date_left">有效期</div>
                        <div class="lottery_date_right">{{startUseTime|acName}}~~{{expireTime|acName}}</div>
                    </div>                
                    <div class="lottery_date">
                        <div class="lottery_date_left">初始面额</div>
                        <div class="lottery_date_right">{{redpacket}}元</div>
                    </div>
                    <div class="lottery_date">
                        <div class="lottery_date_text">使用说明：可用于马拉松报名和购买装备</div>
                        <!-- <div class="lottery_date_right">
                            <div class="el-icon-arrow-right lottery_icon"></div>
                        </div> -->
                    </div>
                    <div class="lottery_date" @click="goUseRecord"><div class="lottery_date_left">使用记录</div><div class="lottery_date_right"><div class="el-icon-arrow-right lottery_icon"></div></div></div>
                </div>
                
            </div>
        </div>
        </div>
    <!-- </div> -->
</template>
<style scoped>
@media screen and (max-width: 330px) {
    .lottery_date_left {
        width: 20%;
        text-align: left;
        font-size: 13px;
    }
}
.giftdetailback{
    text-align: left;
    position: relative;
    height: 40px;
}
.giftdetailback img{
    width: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
}
.giftdetailbackTitle{
    position: absolute;
    left: 40px;
    top: 9px;
    color: #fff;
}
.lottery_icon{
    right: 0px;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 15px;
}
.lottery_date{
    display: flex;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    color: #767575;
    border-bottom: 1px dashed #eee;
}
.lottery_date_left{
    width: 20%;
    text-align: left;
}
.lottery_date_text{
    /* width: 20%; */
    text-align: left;
}
.lottery_date_right{
    width: 80%;
    text-align: right;
    position: relative;
    font-size: 13px;
}
.lottery_info{
    position: absolute;
    bottom: 10px;
    width: 92%;
    margin: 0 auto;
    left: 4%;
}
.Lottery_title{
    height: 30px;
    line-height: 30px;
    /* margin-top: 10%; */
}
.lottery_balance{
    height: 70px;
    line-height: 70px;
    font-size: 24px;
    font-weight: 500;
    /* margin-top: 7%; */
}
.Lottery_top{
    height: 50px;
    position: relative;
    line-height: 50px;
    background: #f0f0f0;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}
.lottery_top span{
    position: absolute;
    left: 60px;
    font-size: 14px;
}
.Lottery_top_img{    
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: 10px;
    width: 40px;
    height: 40px;
    background: #d6994e;
    border-radius: 50%;
}
.Lottery_top_img img{
    width: 20px;
    height: 27px;
    position: absolute;
    top: 6.5px;
    left: 10px;
}
.giftdetail{    
    width: 100%;
    height: 100%;
    background: #dc0002;
}
.Lottery_details{
    width: 95%;
    height: 62%;
    background: #fff;
    position: relative;
    left: 2.5%;
    top: 30px;
    border-radius: 3px;
}
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
export default {
    name: 'gift',
    filters: {
        acName(v){
            return v.length>16 ? v.substr(0,16): v;
        },
    },
    data(){
        return{
            tradeNumber:'',
            title:this.$route.query.title,
            startUseTime:this.$route.query.startTime,
            expireTime:this.$route.query.endtime,
            redpacket:this.$route.query.redpacket,
            price:this.$route.query.price,
            
            // list:[
            //     {title:"充值",createDate:"2017-12-20",money:'+100',balance:"1600"},
            //     {title:"充值",createDate:"2017-12-20",money:'+100',balance:"1600"}
            //     ]
        }
    },
    beforeCreate(){
        document.getElementById('titleId').innerHTML = '奖金明细';    
    },
    mounted(){   
    },
    methods:{ 
        // goback(){
        //     window.history.back(-1); 
        // },
        goUseRecord(){
            this.$router.push({ path: '/useRecord',query:{id:this.$route.query.id}});
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
    // function  strMapToObj(strMap){
    //     let obj= Object.create(null);
    //     for (let[k,v] of strMap) {
    //         obj[k] = v;
    //     }
    //     return obj;
    // };


</script>
    