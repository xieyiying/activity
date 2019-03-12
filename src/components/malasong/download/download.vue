<template>
    <div class="matchNews">
        <div class="News_logo" @click="jumpApp">
            
        </div>
        <!-- <img src="../total_img/marathonbg.png" class="News_logo" @click="jumpApp"> -->
             
    </div>
</template>
<style scoped>
.News_logo{
    width: 100%;
    height: 100%;
    background-image: url(../total_img/marathonbg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
@media screen and (max-width: 330px) {
    .News_logo{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/iphone5bj.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
@media screen and (min-height:750px) {
    .News_logo{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/iphoneX.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
@media screen and (width: 414) {
    .News_logo{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/iphone6bj.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
/* @media screen and (min-height: 560px) {
    .News_logo{
        width: 100%;
        height: 100%;
        background-image: url(../total_img/android.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
} */
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'matchNews',
        data(){
            return{
            }
        },
        beforeCreate(){
            document.getElementById('titleId').innerHTML = '点击下载';    
        },
        mounted(){  
            // this.jumpApp();
        },
        methods:{           
            jumpApp(){   
                // var clientHeight=document.body.clientHeight;
                // var clientWidth=document.body.clientWidth;
                // alert(clientHeight);
                // alert(clientWidth);
                window.location.href="https://android.myapp.com/myapp/detail.htm?apkName=com.hpaopao.marathon&ADTAG=mobile";         
            }
        }
    }
</script>