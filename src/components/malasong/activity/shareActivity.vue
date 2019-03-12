<template>
    <div class="activity_container">
        <div class="activity_top">
            <span class="help_text">接力火锅不停止，1元公益我参与</span>
            <div class="user_info">
                <img :src="userPhoto" alt="">
                <p class="user_name">{{userName}}</p>
            </div>
            <div class="help_button">
                <button @click="handleHelp">{{helpBtnText}}</button>
                <button @click="joinActivity">我也要免费吃火锅</button>
            </div>
        </div>
        <!-- 助力列表 -->
        <div class="help_list">
            <div class="list_title"></div>
            <p class="list_text">
                总参与人数<span>{{total_nums}}</span>人，累计公益金<span>{{total_money}}</span>份
            </p>
            <span class="list_line"></span>
            <!-- 前三名 -->
            <ul class="list_top_three clearfix">
                <li>
                    <div class="user_avatar">
                        <img src="../../../assets/powerActivity/no.3@2x.png" alt="" class="avatar_bg">
                        <img :src="topThreeList[2].userPhoto" alt="" class="avatar_img">
                    </div>
                    <span class="user_name text_over">{{topThreeList[2].userName}}</span>
                    <span class="user_num">{{topThreeList[2].assistanceNums}}人</span>
                    <span class="user_good">
                        <i></i>
                        {{topThreeList[2].moneyNums}}份
                    </span>
                </li>
                <li>
                    <div class="user_avatar">
                        <img src="../../../assets/powerActivity/no.1@2x.png" alt="" class="avatar_bg">
                        <img :src="topThreeList[0].userPhoto" alt="" class="avatar_img">
                    </div>
                    <span class="user_name text_over">{{topThreeList[0].userName}}</span>
                    <span class="user_num">{{topThreeList[0].assistanceNums}}人</span>
                    <span class="user_good">
                        <i></i>
                        {{topThreeList[0].moneyNums}}份
                    </span>
                </li>
                <li>
                    <div class="user_avatar">
                        <img src="../../../assets/powerActivity/no.2@2x.png" alt="" class="avatar_bg">
                        <img :src="topThreeList[1].userPhoto" alt="" class="avatar_img">
                    </div>
                    <span class="user_name text_over">{{topThreeList[1].userName}}</span>
                    <span class="user_num">{{topThreeList[1].assistanceNums}}人</span>
                    <span class="user_good">
                        <i></i>
                        {{topThreeList[1].moneyNums}}份
                    </span>
                </li>
            </ul>
            <!-- 其他名次 -->
            <ul class="list_other_user" :style="{'height': otherUlHeight + 'rem'}" v-show="otherUserList.length > 0">
                <li v-for="(item, index) in otherUserList" :key="index" :style="{'height': otherliHeight + 'rem'}">
                    <span class="other_num">{{index + 4}}</span>
                    <img :src="item.userPhoto" alt="" class="other_avatar">
                    <span class="other_name text_over">{{item.userName}}</span>
                    <span class="other_join">{{item.assistanceNums}}人</span>
                    <span class="other_good">
                        <i></i>
                        {{item.moneyNums}}份
                    </span>
                </li>
            </ul>
            <span class="list_line_down"></span>
        </div>
        <!-- 活动规则 -->
        <div class="activity_rule">
            <div class="title"></div>
            <div class="rule_text">
                1.活动时间为2019年3月8日到2019年3月31日；<br>
                2.活动兑换方式为发票兑换到账户，兑换时间为活动结束后7日内在提交图片证明；<br>
                3.每新注册用户助力成功则平台累计一份公益金1分钱，老用户助力则只助力成功无公益金；<br>
                4.活动在没有名重庆马拉松线上赛事前可以参与，但活动未生效；<br>
                5.必须成功报名后才能生效活动；<br>
                6.活动最终解释权归跑跑网所有；
            </div>
        </div>
        <!-- 扫码关注我们 -->
        <div class="focus_us">
            <p>
                搜索微信公众号“跑跑网”添加
            </p>
            <i class="code"></i>
        </div>
        <div class="open-app" @click="dowmloadApp">
            <i class="logo"></i>
            <span>马拉松报名</span>
            <button class="open_btn">打开</button>
        </div>
        <!-- 登录弹框 -->
        <div class="login_box" v-show="isLogin" ref="loing_box" @touchmove.prevent>
            <i class="login_logo"></i>
            <input type="text" placeholder="请输入手机号码" class="user_phone" v-model="userPhone">
            <div class="auth_code">
                <input type="text" placeholder="请输入验证码" v-model="userCode">
                <button :class="['get_auth_btn', {'active': isSend == true}]" @click="sendCode">{{codeBtnText}}</button>
            </div>
            <button class="login_btn" @click="loginIn">快捷登录</button>
        </div>
        <!-- 助力成功弹框 -->
        <div class="help_success" v-show="isHelp" @touchmove.prevent>
            <i class="success_icon"></i>
            <p v-if="isNewUser == 1">
                恭喜您助力成功<br>
                跑跑网将为您加入<span>一份公益金</span>
            </p>
            <p v-else-if="isNewUser == 0">
                恭喜您助力成功
            </p>
            <p v-else>
                您已助力过，无法再次助力
            </p>
            <button class="close_btn" @click="handleCloseHelp">关闭</button>
        </div>
        <!-- 遮罩层 -->
        <div class="mask_layer" v-show="isLayer" @touchmove.prevent></div>
        <!-- 活动结束显示 -->
        <div class="ending" @touchmove.prevent v-if="isEnding == true"></div>
    </div>
</template>
<script>
import { attrCenter, numFixed, getUrlParam, isWechatWeb } from '@/config/utils'
import { getActivityIndex, helpUser, getCode, getWinXinInfo } from '@/config/httpRequest'
import { httpUrl } from '@/config/network'
export default {
    name: 'activity_index',
    data() {
        return {
            isLogin: false, // 是否显示登录框
            isSend: false, // 是否已点击发送验证码按钮
            codeBtnText: '发送验证码', // 发送验证码按钮文字显示
            isHelp: false, // 是否显示助力成功弹框
            isLayer: false, // 是否显示遮罩层
            otherUlHeight: '', // 其他名次用户的ul高度计算显示
            otherliHeight: 0.55,
            total_nums: '', // 总参与人数
            total_money: '', // 总公益金份数
            topThreeList: [], // 前三名用户数组
            otherUserList: [], // 其他名次用户数组
            userPhoto: '', // 用户头像
            userName: '', // 用户昵称
            accountId: '', // 用户id
            eventId: '', // 赛事id
            isEnding: false, // 活动是否结束
            userPhone: "", // 用户手机号
            userCode: '', // 验证码
            helpBtnText: '帮TA接力', // 助力按钮文案
            timer: null,
            isNewUser: true, // 是否为老用户
            appId: '',
            sessionId: '',
        }
    },
    methods: {
        getData() {
            let data = {
                accountId: this.accountId,
                eventId: this.eventId,
                size: 20
            }
            getActivityIndex(data).then(res => {
                console.log(res)
                if(res.code === 1) {
                    // 请求成功
                    // 1. 先判断活动是否结束
                    if(res.objectData.active_status == 0) {
                        // 活动已结束
                        this.isEnding = true
                    } else {
                        // 活动正在进行中
                        this.isEnding = false
                    }
                    // 2. 其他数据的获取展示
                    this.userPhoto = res.objectData.assistance_self.userPhoto
                    this.userName = res.objectData.assistance_self.userName
                    this.topThreeList = res.objectData.assistance_list.slice(0,3) // 前三名用户数组
                    this.otherUserList = res.objectData.assistance_list.slice(3) // 其他名次用户数组
                    // 处理数字显示（如果超过10000)
                    this.topThreeList.forEach(item => {
                        item.assistanceNums = item.assistanceNums > 10000 ? numFixed(item.assistanceNums) + '万' : item.assistanceNums
                        item.moneyNums = item.moneyNums > 10000 ? numFixed(item.moneyNums) + '万' : item.moneyNums
                    })
                    this.otherUserList.forEach(item => {
                        item.assistanceNums = item.assistanceNums > 10000 ? numFixed(item.assistanceNums) + '万' : item.assistanceNums
                        item.moneyNums = item.moneyNums > 10000 ? numFixed(item.moneyNums) + '万' : item.moneyNums
                    })
                    this.computeUlHeight()
                }
                
            })
        },
        // 计算其他用户排名列表ul的高度
        computeUlHeight() {
            var otherArrLen = this.otherUserList.length
            if(otherArrLen < 7) {
                this.otherUlHeight = otherArrLen * this.otherliHeight
            } else {
                this.otherUlHeight = 7 * this.otherliHeight
            }
        },
        // 帮他助力
        handleHelp() {
            // 1. 微信授权  判断是否为微信浏览器
            if(isWechatWeb()) {
                // 是微信浏览器
                // 2. 先授权，再绑定手机登录
                // 先判断是否已经授权
                if(this.sessionId != '') {
                    // 已授权
                    this.isLogin = true
                    this.isLayer = true
                    attrCenter('.login_box')
                    attrCenter('.mask_layer')
                } else {
                    // 未授权
                    let data = {
                        accountId: this.accountId
                    }
                    getWinXinInfo(data).then(res => {
                        if(res.code == 1) {
                            this.appId = res.objectData.appid
                            var redirect_uri = httpUrl + '/config/user-info?eventId=' + this.eventId +'::' + this.accountId
                            console.log(redirect_uri)
                            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appId + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                        }
                    })
                }
            } else {
                // 不是微信浏览器
                // 2. 直接绑定手机登录
                this.isLogin = true
                this.isLayer = true
                attrCenter('.login_box')
                attrCenter('.mask_layer')
            }
        },
        // 用户绑定手机登录
        loginIn() {
            let data = {
                mobile: this.userPhone,
                identifyCode: this.userCode,
                accountId: this.accountId,
                sessionId: this.sessionId
            }
            helpUser(data).then(res => {
                this.isLogin = false
                this.isHelp = true
                attrCenter('.help_success')
                if(res.code == 1) {
                    if(res.objectData.isnew) { // 判断是否为新用户
                        // 是新用户
                        this.isNewUser = 1
                    } else {
                        // 老用户
                        this.isNewUser = 0
                    }
                } else {
                    this.isNewUser = 2
                }
            })
        },
        // 发送验证码
        sendCode() {
            if(!this.isSend) {
                this.isSend = true
                getCode({
                    mobile: this.userPhone
                }).then(res => {
                    console.log(res)
                })
                var second = 60
                clearInterval(this.timer)
                this.timer = null
                this.timer = setInterval(() => {
                    second--
                    this.codeBtnText = second + 's'
                    if (second === 0) {
                        clearInterval(this.timer)
                        this.codeBtnText = '发送验证码'
                        this.isSend = false
                    }
                }, 1000)
            }
        },
        // 关闭助力成功弹框
        handleCloseHelp() {
            this.isHelp = false
            this.isLayer = false
            this.helpBtnText = "助力成功"
            clearInterval(this.timer)
        },
        // 下载APP
        dowmloadApp() {
            var data = {};
            linkedme.init("99fbdc474cea39f4e2c83ecd87e958ee", data, function(){});
                data.params = '{"path":"run/malasong","id":"123456"}';                                 
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
                        window.location.href = response.url
                    }
                },false); 
        },
        // 我也要免费吃火锅
        joinActivity() {
            this.$router.push({
                path: '/malasmain',
                query: {
                    event: this.eventId
                }
            })
        },
    },
    created() {
        this.accountId = this.$route.params.accountId
        this.eventId = this.$route.params.eventId
        // this.eventId = '018a8b8a29984196a9a33959c99f2bc1'
        // this.accountId = '142684126351196160'
        this.getData()
        this.sessionId = getUrlParam("sessionId")
    },
    destroyed() {
        clearInterval(this.timer)
    },
}
</script>
<style>
    @import '../../../assets/less/activityIndex/powerActivity.css';
    @import '../../../assets/less/base.css';
</style>