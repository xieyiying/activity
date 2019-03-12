<template>
    <div class="top_map">
        <div class="baidu_map" id="container">
            <div class="example">                
            </div>
             <div class="hide_name"><p class="hide_or_show" @click="hide_or_show()" id="route_show_hide"></p></div>  
            <div class="shadow">               
                <canvas id="mycanvas" style="display:none"></canvas>
                <div class="maps_bc"  id="info">
                    <div class="main">
                        <div class="map_info" id="time">
                            <p class="map_city" style="float:left;padding-left:0.4rem;">{{city}}</p>
                            <p class="map_time" id="now_time">{{runningTime}}</p>
                        </div>
                        <div class="account_info">
                            <div class="account_top">
                                <div class="userinfo">
                                    <img v-bind:src="image" class="account_img">
                                    <p class="account_name">{{nick|acName}}</p>
                                    <div class="account_id">ID:{{accountId}}</div>
                                    <div class="weather_info">{{temperature}}℃&nbsp;{{weather}}</div>
                                </div>
                                <div class="account_distance">
                                    <p class="distance_number">{{distance}}<p>
                                    <p class="disance_kilo"><i><img src="./Running_image/资源 1-8.png" class="kilo_img"></i>公里</p>
                                </div>
                            </div>
                            <div class="account_bottom">
                          <div class="speed_line">
                              <div class="line_text">
                                  <div class="text_left">
                                      <p class="slow">最快:{{max}}</p>
                                  </div>
                                  <div class="text_right">   
                                      <p class="quick">最慢:{{min}}</p>     
                                  </div>
                              </div>
                          </div>
                        <div class="process_line"></div>
                      <div class="runInfo">
                          <div class="runningInfo_top">
                              <ul>
                                  <li class="speed_text">{{speed}}</li>
                                  <li class="speed_text">{{duration}}</li>
                                  <li class="speed_text">{{kcal}}</li>
                              </ul>
                          </div>
                              <div class="runningInfo_bottom">
                                  <ul>
                                      <li><i><img  src="./Running_image/资源 2-8.png" class="speed_img"></i><p style="float:left">配速</p></li>
                                      <li><i><img  src="./Running_image/资源 3-8.png" class="speed_img"></i><p style="float:left">用时</p></li>
                                      <li><i><img  src="./Running_image/资源 4-8.png" class="speed_img" style="padding-left:0.8rem"></i><p style="float:left">千卡</p></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div class="details_info">
                        <p class="details_title">详情</p>
                        <div class="detail_left">
                            <div class="stead_running">
                                <span class="running_text" id="line_style"><p class="" style="float:left">均速</p><p class="unit">KM/h</p></span>
                                <span class="running_number">{{pace}}</span>
                            </div>
                            <div class="stead_running">
                                <span class="running_text"><p class="" style="float:left">累计下坡</p><p class="unit">m</p></span>
                                <span class="running_number">{{totaldown}}</span>
                            </div>
                            <div class="stead_running">
                                <span class="running_text"><p class="" style="float:left">步数</p><p class="unit">步</p></span>
                                <span class="running_number">{{step}}</span>
                            </div>
                            <div class="stead_running" v-show="harf_show">
                                <span class="running_text" ><p style="float:left">半马用时</p><p class="unit">h</p></span>
                                <span class="running_number">{{harf_number}}</span>
                            </div>
                        </div>
                        <div class="detail_right">
                            <div class="level">
                                <span class="running_text"><p class="" style="float:left">平均海拔</p><p class="unit" >m</p></span>
                                <span class="running_number">{{altitude}}</span>
                            </div>
                            <div class="level">
                                <span class="running_text"><p class="" style="float:left">累计上坡</p><p class="unit" >m</p></span>
                                <span class="running_number">{{totalup}}</span>
                            </div>
                            <div class="level">
                                <span class="running_text"><p class="" style="float:left">步频</p><p class="unit" >步/min</p></span>
                                <span class="running_number">{{fre}}</span>
                            </div>
                             <div class="level" v-show="all_show">
                                <span class="running_text"><p style="float:left">全马用时</p><p class="unit" >h</p></span>
                                <span class="running_number">{{all_number}}</span>
                            </div>
                        </div>
                          <div style="clear:both;"></div>
                    </div>
                        <div class="speed_info">
                            <div class="speed_title">
                                <p class="user_speed">配速</p>
                                <p class="open_up" v-on:click='showAll'>展开全部</p>
                            </div>
                            <div class="speed_list">
                                <ul>
                                    <li>公里</li>
                                    <li style="width:20%">配速</li>
                                    <li style="float:right">用时</li>
                                </ul>
                            </div>
                            <div style="padding-bottom:1.18rem">
                                <ul class="list">
                                    <li v-for="(item, i) in items" :key="i" class="process_bar">
                                        <span  v-bind:class="item.style" v-bind:id="item.span_id">
                                            <p class="order">{{item.number}}</p>
                                            <p class="order_time">{{item.pace}}</p>
                                        </span>
                                        <p class="time_cost">{{item.time}}</p>          
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="chart_info">  
                            <div class="chart_title">
                                <p class="chart_speed">步频</p>
                                <p class="chart_time">分钟</p>
                            </div>
                            <div class="chart_img">
                                <EchartSpeed :speed_number="steps" :duration_m="duration_m" ></EchartSpeed>
                            </div> 
                        </div>
                        <div class="chart_info">
                            <div class="chart_title">
                                <p class="chart_speed">海拔</p>
                                <p class="chart_time">米</p>
                            </div>
                            <div class="chart_img">
                                <Echarts :altitudes_number="altitudes" :duration_m="duration_m"></Echarts>
                            </div>   
                        </div>
                        <a  id="openAPP1" class="linkedme"  v-on:click="jumpApp">
                        <div class="bottom">
                            <div class="bottom_left">
                                <img src="./Running_image/资源 9-8.png" class="logo">
                                <div class="bottom_text">
                                    <p class="bottom_paopao" >跑跑网</p>
                                    <p class="bottom_running"  style="height:20px">跑步返现/赢lphonex,新马泰旅游</p>
                                </div>
                            </div>
                                <div class="bottom_right" style="float:right">立即下载</div>
                        </div>
                         </a>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
    import Echarts from "./Echarts.vue";
    import EchartSpeed from "./EchartSpeed.vue";
    import Vue from "vue";
    import { hexMD5 } from "../../router/Md5.js";
    export default {
        name: "Top_map",
        filters: {
            acName(v){
                return v.length>5 ? v.substr(0,4)+'...' : v;
            },
        },
        data() {
            return {
                runningTime: "",
                pace: "",
                city: "",
                altitude: 0,
                step: "",
                totalup:"",
                totaldown:"",
                image: "",
                distance: "",
                duration: "",
                kcal: "",
                speed: "",
                nick: "",
                temperature: "",
                weather: "",
                accountId: "",
                min: "",
                max: "",
                fre: "",
                kilometer_number: "",
                steps: [],
                altitudes: [],
                duration_m: "",
                items: [{ span_id: "", number: 0, style: "", pace: "", time: "" }],
                show_allstyle: [
                  { span_id: "", number: 0, style: "", pace: "", time: "" }
                ],
                westMaxPoint: null,
                southMaxPoint: null,
                northMaxPoint: null,
                eastMaxPoint: null,
                map: null,
                number_temp: null,
                harf_number: null,          
                all_number: null,
                harf_show: null,
                all_show: null, 
                altitude_array: [],
                number_a: 0,
                route_temp:[]
            };
        },
        components: {
            Echarts,
            EchartSpeed
        },
        mounted() {
            this.init();
            window.addEventListener("scroll", this.handleScroll);
            this.jumpApp();
            this.map = new AMap.Map("container", {
                 resizeEnable: true,
                // zoom: 
            });
            this.$nextTick(() => {
                this.getRouters();
            });
        },
            methods: {
                init() {
                    var running_Id;
                    var account_Id;
                    var _this = this;
                    var geturl=self.location.href;
                    var re=geturl.split("?"); 
                    for(var ke in re){
                        if(re[ke].indexOf("runningId=")!=-1){
                            var url_number=re[ke].split("&");
                            for( var i in url_number){
                                if(url_number[i].indexOf("runningId=")!=-1){
                                    var index = url_number[i].indexOf("runningId="); 
                                    running_Id=url_number[i].substring(index + "runningId=".length);
                                };
                                if(url_number[i].indexOf("accountId=")!=-1){
                                    var index_1 = url_number[i].indexOf("accountId=");  
                                    account_Id=url_number[i].substring(index_1 + "accountId=".length);
                                };
                                if(url_number[i].indexOf("totalup=")!=-1){
                                    var index_2 = url_number[i].indexOf("totalup="); 
                                    _this.totalup=url_number[i].substring(index_2 + "totalup=".length);
                                };
                                if(url_number[i].indexOf("totaldown=")!=-1){
                                    var index_3 = url_number[i].indexOf("totaldown="); 
                                    _this.totaldown=url_number[i].substring(index_3 + "totaldown=".length);                                    
                                };
                            };
                        }
                    };
                     var params = { runningId: running_Id };
                    params.accountId = account_Id;
                    var request = getSign(params, "6a64b838f0964483aa107540a26368a5");
                    //ajax请求数据
                    $.ajax({
                        type: "POST",
                        //url:"http://192.168.2.17:9999/Run/run/get", 
                        //url:"http://test.app.hpaopao.com/run/get", //getRoute
                        url: "https://app.hpaopao.com/run/get",
                        dataType: "JSON",
                        data: request,
                        success: function(data) {
                            var data = data.data;
                            //获取昵称，城市，步数，消耗千卡，距离，runningCode,天气，气温，头像
                            _this.accountId = data.user.runningcode;
                            _this.weather = data.weather;
                            _this.temperature = data.temperature;
                            _this.nick = data.user.nick;
                            _this.city = data.city;
                            _this.step = data.step;
                            _this.kcal = data.kcal.toFixed(1);
                            _this.distance = (data.distance / 1000).toFixed(2);
                            _this.image = data.user.image;
                            //改变title
                            document.getElementById("titleId").innerHTML = "我用 跑跑 跑了 " + _this.distance + " 公里";
                            //获取时间
                            _this.duration = convert_time(data.duration);
                            //计算步频
                            _this.fre = (data.step / data.duration*60).toFixed(2);
                            //计算配速
                            _this.speed = convert_pace(data.pace);
                            _this.duration_m = Math.floor(data.duration / 60);
                            //根据时间戳计算当时的跑步时间
                            var time_number = data.time;
                            _this.pace = (_this.distance / data.duration * 60 * 60).toFixed(2);
                            var date_number = new Date(time_number);
                            var month = date_number.getMonth() + 1;
                            month = month <= 9 ? "0" + month : month;
                            var day = date_number.getDate();
                            day = day <= 9 ? "0" + day : day;
                            var hours = date_number.getHours();
                            hours = hours <= 9 ? "0" + hours : hours;
                            var minutes = date_number.getMinutes();
                            minutes = minutes <= 9 ? "0" + minutes : minutes;
                            _this.runningTime = month + "月" + day + "日" + hours + ":" + minutes;
                        }
                    });
                },
                getRouters() {
                    var routes = []; //轨迹
                    var steps = []; //步频
                    var altitudes = []; //海拔
                    var temp = []; //临时
                    var _this = this;
                    var currentAltitude = 0;
                    var nowPointTime = 0;
                    var minPointIndex = 0;
                    var altitudeNumber = 0;
                    var altitudeSum = 0;
                    var altitudeArray = [];
                    var start_point = [];
                    var temp_point;
                    var running_Id;
                    var account_Id;
                    var _this = this;
                    var geturl=self.location.href;
                    var re=geturl.split("?");
                    var temp_spet=[];
                    var realtitude=[];       
                    temp_spet.push("0");
                    for(var ke in re){
                        if(re[ke].indexOf("runningId=")!=-1){
                            var url_number=re[ke].split("&");
                            for( var i in url_number){
                                if(url_number[i].indexOf("runningId=")!=-1){
                                    var index = url_number[i].indexOf("runningId="); 
                                    running_Id=url_number[i].substring(index + "runningId=".length);
                                };
                                if(url_number[i].indexOf("accountId=")!=-1){
                                    var index_1 = url_number[i].indexOf("accountId=");  
                                    account_Id=url_number[i].substring(index_1 + "accountId=".length);
                                };
                            };
                        }
                    };
                     var params = { runningId: running_Id }; //'accountId':'130000918623031296',
                    params.accountId = account_Id;
                    var request = getSign(params, "6a64b838f0964483aa107540a26368a5");
                    $.ajax({
                        type: "POST",
                        // url: "http://192.168.2.17:9999/Run/run/getRoute",
                        //url:"http://test.app.hpaopao.com/run/getRoute", //getRoute
                        url: "https://app.hpaopao.com/run/getRoute",
                        dataType: "JSON",
                        data: request,
                        success: data => {
                            var arrayData = data.data;
                            var minDuration = arrayData[0].duration;
                            var maxDuration = 1;
                            var total_duration = 0;
                            var temp_duration = 0;
                            var duration_array = [];
                            var number_style = [];
                            var show_allstyle = [];
                            var total_time = 0;
                            var i_t = 0;
                            for (var ke in arrayData) {
                                /*************保存轨迹************/
                                var route = arrayData[ke].route.split(",");  
                                for (var index in route) {
                                    temp_point = route[index].split(":");
                                    routes.push(new AMap.LngLat(temp_point[1], temp_point[0])); 
                                    var rt=[parseFloat(temp_point[1]),parseFloat(temp_point[0])];
                                    _this.route_temp.push(rt);                               
                                    if (i_t == 0) {
                                        start_point.push(temp_point[1]);
                                        start_point.push(temp_point[0]);
                                        i_t++;
                                    }
                                };
                                /*************保存步频************/                         
                                temp_spet += (arrayData[ke].steps) + ",";
                                if (temp_spet != null && temp_spet != '') {
                                temp_spet = temp_spet.split(",");
                                for (var index in temp_spet) {
                                    if (temp_spet[index] < temp_spet[index - 1])
                                        continue;
                                    if (index != 0)
                                        _this.steps.push((temp_spet[index] - temp_spet[index - 1])/5.5);
                                    else
                                        _this.steps.push((temp_spet[index])/5.5);
                                }
                            }
                                /*************保存海拔************/
                                var height = 0;
                                var temp_altitude = arrayData[ke].altitude.split(",");              
                                for (var index in temp_altitude) {    
                                    var a = parseInt(temp_altitude[index]);
                                    // if(a<0){
                                    //    realtitude.push("0"); 
                                    // }
                                    if (!(a >= 0)) continue; 
                                    height += a;
                                    realtitude.push(temp_altitude[index]);
                                };
                                    _this.altitudes=realtitude; 
                                var altitude_temp = height / temp_altitude.length;
                                _this.altitude_array.push(altitude_temp);
                                    /***************保存公里数配速****************/
                                if(arrayData[ke].duration<170)
                                    continue;
                                if (minDuration > arrayData[ke].duration) {
                                    minDuration = arrayData[ke].duration;
                                } else if (maxDuration < arrayData[ke].duration) {
                                    maxDuration = arrayData[ke].duration;
                                }
                                duration_array.push(arrayData[ke].duration);
                            };
                            //for循环外计算平均海拔
                                for (var ke in _this.altitude_array) {
                                    _this.altitude += _this.altitude_array[ke];
                                };
                                _this.altitude = (_this.altitude / _this.altitude_array.length).toFixed(2);
                               
                                /*************计算横条样式_配速************/
                                var width_temp = 76 / maxDuration;
                                _this.min = convert_pace(maxDuration);
                                _this.max = convert_pace(minDuration);
                                var span_time = 0;
                                for (var ke in duration_array) {
                                    var tm_ns = {};
                                    var list_number = parseInt(ke) + 1;//第几公里
                                    tm_ns.number = list_number;
                                    var wh = Math.floor(width_temp * duration_array[ke]);
                                    //给横条设置宽度，样式，计算配速 
                                    tm_ns.span_id = "progressBar" + tm_ns.number;
                                    if (duration_array[ke] >= maxDuration) {
                                        tm_ns.style = "process_red";
                                    } else if (duration_array[ke] <= minDuration) {
                                        tm_ns.style = "process_green";
                                    } else {
                                        tm_ns.style = "process_info";
                                    }
                                    tm_ns.pace = convert_pace(duration_array[ke]);
                                    span_time += duration_array[ke];
                                    total_time += duration_array[ke];
                                    
                                    tm_ns.time_number = total_time;
                                    tm_ns.time = convert_time(span_time);
                                    tm_ns.width = wh < 32 ? wh + 16 : wh;
                                    show_allstyle.push(tm_ns);
                                    number_style.push(tm_ns);
                                    move_style(tm_ns.width, tm_ns.span_id, list_number, 1, total_time); 
                                    // 当总公里数>=21公里计算半马用时并显示
                                    if (ke < 20) {
                                        _this.harf_show = false;
                                    } else if (ke == 20) {
                                        _this.harf_show = true;
                                        _this.harf_number = convert_time(total_time);
                                    };
                                    //当总公里数>=42公里计算全马用时并显示
                                    if (ke < 41) {
                                        _this.all_show = false;
                                    } else if (ke == 41) {
                                        _this.all_show = true;
                                        _this.all_number = convert_time(total_time);
                                    };
                                    
                                }
                                _this.items = number_style;
                                _this.show_allstyle = show_allstyle;
                                // //设置地图起点marker
                                // new AMap.Marker({
                                //     map: this.map,
                                //     position: new AMap.LngLat(temp_point[1], temp_point[0]),
                                //     icon: new AMap.Icon({
                                //         size: new AMap.Size(26, 26), //图标大小
                                //         image: "http://www.hpaopao.com/paopao/appWeb/images/start.png",
                                //         imageOffset: new AMap.Pixel(0, 0)
                                //     }),
                                //         offset: new AMap.Pixel(-11, -11)
                                // });
                                 //设置地图起点marker
                                    new AMap.Marker({
                                        map: this.map,
                                        position: new AMap.LngLat(start_point[0], start_point[1]),
                                        icon: new AMap.Icon({
                                            size: new AMap.Size(26, 26), //图标大小
                                            image: "https://www.hpaopao.com/paopao/appWeb/images/start.png",
                                            // imageSize:new AMap.Size(26, 26),
                                            imageOffset: new AMap.Pixel(0, 0)
                                        }),
                                            offset: new AMap.Pixel(-11, -11)
                                    });
                                 _this.hide_or_show();
                            }
                    });
                },
                //点击展开全部显示全部配速
                showAll() {
                    this.items = this.show_allstyle;
                    var temp = this.items;
                    this.number_temp += 1;
                    var number_times = this.number_temp;
                    temp.forEach(function(tm) {
                        move_style( tm.width,tm.span_id, tm.number,2,tm.time_number,number_times);
                    });
                },
                //点击打开跑跑进入App
                jumpApp() {
                    var data={};
                    var geturl=self.location.href;
                    var index = geturl.indexOf("runningId=");
                    var id;
                    var re=geturl.split("?"); 
                    for(var ke in re){
                        if(re[ke].indexOf("runningId=")!=-1){
                            var url_number=re[ke].split("&");
                            for( var i in url_number){
                                    if(url_number[i].indexOf("runningId=")!=-1){
                                        var index = url_number[i].indexOf("runningId="); 
                                        id=url_number[i].substring(index + "runningId=".length);
                                };
                            };
                        }
                    };
                    linkedme.init("bdf908335e5962287a7f5181b2e33f6d", data, function() {});
                    data.params = '{"path":"run/record","id":"' + id + '"}';
                    data.type = "live";
                    data.tags = "a";
                    data.ios_custom_url = "https://www.hpaopao.com/d";
                    // data.ios_direct_open = "true";
                    data.android_custom_url = "https://www.hpaopao.com/d";
                    // data.android_direct_open = "true";
                    linkedme.link(
                        data,
                        function(err, response) {
                            if (err) {
                            // 生成深度链接失败，返回错误对象err
                            } else {
                                document.getElementById("openAPP1").href = response.url;
                            }
                        },
                        false
                    );
                },
                hide_or_show(){
                    var _this = this;
                    var top = 0;
                    this.number_a+=1; 
                    if( this.number_a==1){
                            //$(".maps_bc").animate({top:"0%"},700);                         
                            $(".shadow").slideDown("slow"); 
                            $("#route_show_hide").removeClass('hide_or_show_a');
                            $("#route_show_hide").addClass('hide_or_show'); 
                    }else if(this.number_a!=1){
                        if(this.number_a%2==0){
                            $("#route_show_hide").removeClass('hide_or_show');
                            $("#route_show_hide").addClass('hide_or_show_a');                    
                            $(".shadow").slideUp("slow"); 
                            //$(".maps_bc").animate({top:"100%"},700);
                            // //绘制动态路径
                                  AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

                                    if (!PathSimplifier.supportCanvas) {
                                        alert('当前环境不支持 Canvas！');
                                        return;
                                    }

                                    var emptyLineStyle = {
                                        lineWidth: 0,
                                        fillStyle: null,
                                        strokeStyle: null,
                                        borderStyle: null
                                    };

                                    var pathSimplifierIns = new PathSimplifier({
                                        zIndex: 100,
                                        //autoSetFitView:false,
                                        map: _this.map, //所属的地图实例

                                        getPath: function(pathData, pathIndex) {

                                            return pathData.path;
                                        },
                                        getHoverTitle: function(pathData, pathIndex, pointIndex) {

                                            return null;
                                        },
                                        renderOptions: {
                                            //将点、线相关的style全部置emptyLineStyle
                                            pathLineStyle:emptyLineStyle,
                                            pathLineSelectedStyle: emptyLineStyle,
                                            pathLineHoverStyle: emptyLineStyle,
                                            keyPointStyle: emptyLineStyle,
                                            startPointStyle: emptyLineStyle,
                                            endPointStyle: emptyLineStyle,
                                            keyPointHoverStyle: emptyLineStyle,
                                            keyPointOnSelectedPathLineStyle: emptyLineStyle
                                        }
                                    });

                                    window.pathSimplifierIns = pathSimplifierIns;

                                    pathSimplifierIns.setData([{
                                        name: '测试',
                                         path:_this.route_temp                                     
                                    }]);
                                    function onload() {
                                        pathSimplifierIns.renderLater();
                                    }
                                    var navg1 = pathSimplifierIns.createPathNavigator(0, {
                                        loop: false,
                                        speed: 14000,
                                        pathNavigatorStyle: {
                                            width: 24,
                                            height: 24,
                                            //使用图片
                                            content: PathSimplifier.Render.Canvas.getImageContent("https://www.hpaopao.com/paopao/appWeb/images/endPonit.png", onload, onerror),
                                            strokeStyle: "#6489f7",
                                            fillStyle: null,
                                            //经过路径的样式
                                            pathLinePassedStyle: {
                                                lineWidth: 6,
                                                strokeStyle: "#6489f7",
                                            }
                                        }
                                    });
                                    navg1.onDestroy(function() {
                                        pathNavigs[pathIndex] = null;
                                        navg1.marker.setMap(null);
                                        $msg.html('');
                                    });
                                    navg1.start();                          
                                });                      
                        }else{ 
                            //$(".maps_bc").animate({top:"0%"},700);
                            $(".shadow").slideDown("slow"); 
                            $("#route_show_hide").removeClass('hide_or_show_a');
                            $("#route_show_hide").addClass('hide_or_show');
                         
                    }
                    
                    }                    
                }
            }
    };
function lngLat(lineArr) {
    var westMaxPoint = new AMap.LngLat(179.9, 0);
    var eastMaxPoint = new AMap.LngLat(0.0, -179.9);
    var northMaxPoint = new AMap.LngLat(-89.9, 0.0);
    var southMaxPoint = new AMap.LngLat(89.9, 0.1);
    var lp;
    //   var bounds=new Array();
    var bounds;
    for (var i = 0; i < lineArr.length; i++) {
        var temp = lineArr[i].toString();
        var p = temp.split(",");
        var longti = p[0];
        var lati = p[1];
        var mp = new AMap.LngLat(longti, lati);

        if (longti < westMaxPoint.getLng()) {
            westMaxPoint = mp;
        }
        if (longti > eastMaxPoint.getLng()) {
            eastMaxPoint = mp;
        }
        if (lati < southMaxPoint.getLng()) {
            southMaxPoint = mp;
        }
        if (lati > northMaxPoint.getLat()) {
            northMaxPoint = mp;
        }
    }
    bounds = new AMap.Bounds(
        new AMap.LngLat(westMaxPoint.getLng(), southMaxPoint.getLat()),
        new AMap.LngLat(eastMaxPoint.getLng(), northMaxPoint.getLat())
    );

    return bounds;
};
//参数加密：
function getSign(options, secret) {
  // 处理参数加密
    var req = options;
    var t = new Date().getTime();
    req.hpaopao_time = t;
    // 参数排序，保证加密前统一
    var str = "";
    var keyArr = [];
    for (var key in req) {
        if (options.hasOwnProperty(key)) {
            keyArr.push(key);
        }
    }
    keyArr.sort();
    keyArr.forEach(v => {
        if (options[v] != null) {
            str += "" + options[v];
        }
    });
    req.hpaopao_sign = hexMD5(str + secret).substr(5, 20);
    return req;
}

function move_style(params, id, number, number1, total_time, number_temp) {
    var _this = this;
    var ht = $(window).height();
    //隔5行加宽配速横条间隔
    if (number % 5 == 1 && number != 1) {
            $("#" + id).parent().css("margin-top", "1.2rem");
        } else if (number == 22) {
            $("#" + id).parent().css("margin-top", "2.0rem");
        } else if (number == 43){
            $("#" + id) .parent().css("margin-top", "2.0rem");
        } else {
            $("#" + id).parent().css("margin-top", "0.6rem");
    }
    //计算全马用时，半马用时，并控制是否显示
    if (number == 21) {
        if (number_temp == 1) {
            var harf_length = document.createElement("p");
            harf_length.innerHTML = "半马用时" + total_time;
            var model_time = convert_time(total_time);
            $("#" + id).parent().after("<p class='harf_length'>半马用时:" + model_time + "</p>");
            $(".harf_length").css({margin: "0 0.2rem",float: "left",height: "2.0rem","line-height": "2.0rem", width: "45%","padding-left": "0.7rem"});
        }
    }
    if (number == 42) {
        if (number_temp == 1) {
            var harf_length = document.createElement("p");
            harf_length.innerHTML = "半马用时" + total_time;
            var model_time = convert_time(total_time);
            $("#" + id).parent().after("<p class='harf_length'>全马用时:" + model_time + "</p>");
            $(".harf_length").css({margin: "0 0.2rem",float: "left",height: "1.5rem","line-height": "1.5rem", width: "45%","padding-top": "0.3rem", "padding-left": "0.7rem"});
            if (number == 1) {
                $(".harf_length").hide();
            } else {
                $(".harf_length").show();
            }
        }
    }
    document.getElementById("container").style.height = ht + "px";
    var main_height = $("#main").height();
    document.getElementById("info").style.height = main_height + "px";
    var percentage = 0;
    //给横条设置动效
    var interval = setInterval(function() {
        if (percentage < params) {
            percentage += 1.2;
            var widthTemp = percentage + "%";
            //  $("#"+id).animate({right:widthTemp},2000);
             $("#" + id).css("width", widthTemp);
            if (number > 5) {
                if (number1 == 1) {
                    $("#" + id).parent().hide();
                } else {
                    $("#" + id).parent().show();
                }
            }
        } else {
            return;
        }
    }, 10);
}
//格式化时间
function convert_time(duration) {
    var h = Math.floor(duration / 3600);
    h = h <= 9 ? "0" + h : h;
    var m = Math.floor((duration - h * 60 * 60) / 60);
    m = m <= 9 ? "0" + m : m;
    var s = duration % 60;
    s = s <= 9 ? "0" + s : s;
    return h + ":" + m + ":" + s;
}
//格式化配速
function convert_pace(duration) {
    var m = Math.floor(duration / 60);
    m = m <= 9 ? "0" + m : m;
    var s = duration % 60;
    s = s <= 9 ? "0" + s : s;
    return m + "'" + s + "''";
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./public.css";
a:hover {color:black;}  a:visited {color:black;} a:link {color:black;}  a {color:black;}
.amap-icon img {
  position: absolute;
  z-index: -1;
  border-radius: 50% !important;
  /* border: 0.1rem solid #fff; */
}
.hide_or_show{
    z-index: 100;
    position: absolute;
    right: 5%;
    top: 2%;
    background-image: url(./Running_image/76142312537384521.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 1.5rem;
    height: 1.5rem;
}
.hide_or_show_a{
    z-index: 100;
    position: absolute;
    right: 5%;
    top: 2%;
    background-image: url(./Running_image/160355285715360610.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 1.5rem;
    height: 1.5rem;
}
.hide_name{
   width: 100%;
    height: 2.5rem;
}
</style>
