<template>
    <div class="paysuccess">
        支付成功
    </div>
</template>
<style scoped>
@import './paysuccess.css';
</style>
<script>
import { hexMD5 } from '../../../router/Md5.js';
    export default {
        name: 'userinfo',
        data(){
            return{             
            }
        },
        created:function () {
            document.getElementById('titleId').innerHTML = '支付成功';
        }, 
        beforeCreate(){
           
        },
        mounted(){ 
           
        },
        methods:{ 
        } 
    }
</script>