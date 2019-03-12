<template >
    <div id="routertest">
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li>
                            <router-link to="/home">Home</router-link>
                        </li>
                       <li v-for="(item, i) in items" :key="i" class="list_detail" track-by="$index">
                            <div class="recommendation_info">
                                    <img :src="item.recommendation_picture" class="recommendation_picture">
                                    <div class="recommendation_user">
                                    <img :src="item.recommendation_img" class="recommendation_img">
                                    <p class="recommendation_nick">{{item.recommendation_nick | acName}}</p>
                                    <p class="recommendation_id">ID:{{item.recommendation_code}}111111</p>
                                </div>  
                            </div>
                         </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    // import Vue from 'vue';
    // import Router from 'vue-router';
    
    export default {
        name:'routertest',
        data(){
            return{
                items:[{recommendation_nick:' 取消了所有内置过滤器，即 capitalize, uppercase, json 取消了所有内置过滤器，',recommendation_code:'',recommendation_img:'',recommendation_picture:'',recommendationlive_id:''}],
            }
        },
        filters: {
            km(v){
                return v > 1 ? (v+'Km') : (v*1000+'m');
            },
            acName(v){
                return v.length>20 ? v.substr(0,18)+'...' : v;
            },
            time(v){
                if(!v) return ''
                var t = new Date(v);
                return addZero(t.getFullYear())+'-'+addZero(t.getMonth()+1) + '-' + addZero(t.getDate()) + ' ' + addZero(t.getHours())+ ':'+addZero(t.getMinutes());
            }
        },
        mounted(){
            this.router_temp();
        },
        methods:{
            router_temp(){
                this.items.recommendation_nick="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
                this.$http({
                    　url : '/api/list',　// url 访问路径
                    　method : '',　　// HTTP 请求方法，例如 GET,POST,PUT,DELETE 等
                    　body : {},　　　// request 中的 body 数据，值可以为对象，String 类型 , 也可以是FormData 对象
                   
                    　params : {},　// get 方法时 url 上的参数，例如 /api/list?page=1
                    　headers: {},　　// 可以设置 request 的 header 属性
                    　timeout : 1500,　// 请求超时时长，单位为毫秒，如果设置为 0 的话则没有超时时长
                    　before : function(request) {},　// 请求发出前调用的函数，可以在此对 request进行修改
                    　progress: function(event) {},　// 上传图片、音频等文件时的进度，event 对象会
                    　credentials : boolean,　// 默认情况下，跨域请求不提供凭据 (cookie、HTTP 认证及
                    　emulateHTTP: boolean,　// 设置为 true 后，PUT/PATCH/DELETE 请求将被修改成
                    　emulateJSON : boolean
                 })
            }
        }
    }
</script>
