<template>
    <div class="activity_container">
        <div class="activity_top">
            <span class="help_text">接力火锅不停止，1元公益我参与</span>
            <div class="top_message">
                <p>获得公益金：<span>{{moneyNums}}份</span></p>
                <p>{{help_document}}</p>
            </div>
            <!-- 进度条 -->
            <div class="progress">
                <ul class="progress_num">
                    <li>0</li>
                    <li>20</li>
                    <li>40</li>
                    <li>60</li>
                    <li>80</li>
                    <li>100</li>
                </ul>
                <el-progress :percentage="per_assistanceNums" color="#fd5c3b"></el-progress>
            </div>
            <div class="find_help_btn" v-if="isShowTow == false" @click="shareActivity">请好友接力</div>
            <div class="help_button" v-if="isShowTow == true" style="top: 5.1rem">
                <button :class="{'enter_immediate': isEnter}" @click="handleEvent">{{buttonText}}</button>
                <button @click="shareActivity">请好友接力</button>
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
            <ul class="list_top_three clearfix" v-if="topThreeList.length == 3">
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
            <ul class="list_other_user" :style="{'height': otherUlHeight + 'rem'}" v-if="otherUserList.length > 0">
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
                1.活动时间为2019年3月8日到2019年4月1日；<br>
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
        <!-- 活动结束显示 -->
        <div class="ending" @touchmove.prevent v-if="isEnding == true"></div>
        <!-- 微信分享提示 -->
        <div class="wxShare" @touchmove.prevent v-if="isShareInWX == true"></div>
        <!-- 提示用户去支付 -->
        <div class="payMoney" @touchmove.prevent v-if="isShowPayMoney == true">
            <p>请在我的——报名记录里选择对应赛事支付</p>
            <button class="close_btn" @click="handleClose">关闭</button>
        </div>
        <!-- 遮罩层 -->
        <div class="mask_layer" v-show="isLayer" @touchmove.prevent></div>
    </div>
</template>
<script>
import { getTerminal, getUrlParam, numFixed, attrCenter, isWechatWeb } from '@/config/utils'
import { getActivityIndex } from '@/config/httpRequest'
import wx from 'weixin-js-sdk';
export default {
    name: 'activity_index',
    data() {
        return {
            device: '', // 判断设备
            accountId: '', // 用户id
            eventId: '', // 赛事id
            isOpenInApp: '', // 是否在APP内打开
            isShowTow: true, // 是否显示两个按钮
            isEnter: true, // 按钮是否为立即参赛
            buttonText: '立即参赛', // 按钮的文字内容
            otherUlHeight: '',
            otherliHeight: 0.55,
            // enterUser: [],
            help_totel_standard: 100, // 助力人数的标准值
            moneyNums: '', // 个人获得公益金份数
            assistanceNums: '', // 个人获得助力人数
            per_assistanceNums: 0, // 个人获得助力进度条显示
            remainingNums: '', // 剩余还差多少助力人数
            total_nums: '', // 总参与人数
            total_money: '', // 总公益金份数
            topThreeList: [], // 前三名用户数组
            otherUserList: [], // 其他名次用户数组
            help_document: '', // 助力活动文案显示
            isEnding: false, // 活动是否已结束
            isShareInWX: false, // 是否在微信中分享
            isPayMoney: '', // 是否提示用户去支付
            isShowPayMoney: false,
            isLayer: false

        }
    },
    methods: {
        // 请求数据
        getData() {
            let data = {
                accountId: this.accountId,
                eventId: this.eventId,
                size: 20
            }
            getActivityIndex(data).then(res => {
                if(res.code === 1) {
                    this.isPayMoney = res.objectData.wait_pay
                    // 请求成功
                    // 1. 先判断活动是否结束
                    if(res.objectData.active_status == 0) {
                        // 活动已结束 ——  1.1 判断用户是否为前20名
                        if(res.objectData.score >= 20) {
                            // 不是前20名
                            this.isEnding = true
                        } else {
                            // 是前20名
                            this.isShowTow = true
                            this.isEnter = false
                            this.buttonText = "上传证明"
                        }
                    } else {
                        // 活动正在进行中
                        // 2. 再判断按钮的显示情况  2.1 判断是否已经报名
                        if(res.objectData.is_enroll) {
                            // 2.1 已报名
                            // 3. 判断用户是否已支付
                            if(res.objectData.wait_pay) {
                                // 3.1 未支付
                                this.isShowTow = true
                                this.isEnter = true
                                this.buttonText = "立即参赛"
                            } else {
                                // 3.2 已支付
                                this.isShowTow = false
                            }
                        } else {
                            // 未报名
                            this.isShowTow = true
                            this.isEnter = true
                            this.buttonText = "立即参赛"
                        }
                    }
                    // 2. 其他数据的获取展示
                    let assistanceNums = res.objectData.assistance_self.assistanceNums // 个人助力数
                    // 判断用户是否为前50名 —— 助力文案的显示
                    if(res.objectData.score < 50) {
                        // 满足前50名
                        this.help_document = "已助力" + res.objectData.assistance_self.assistanceNums + '人，当前你为第：' + res.objectData.score + '名'
                    } else {
                        // 不满足前50名
                        if(res.objectData.assistance_self.assistanceNums > 100) {
                            this.help_document = "已助力" + res.objectData.assistance_self.assistanceNums + '人'
                        } else {
                            let nums = this.help_totel_standard - res.objectData.assistance_self.assistanceNums
                            this.help_document = "已助力" + res.objectData.assistance_self.assistanceNums + '人，还差' + nums + '人'
                        }
                    }
                    this.moneyNums = res.objectData.assistance_self.moneyNums // 个人获得公益金份数
                    this.assistanceNums = assistanceNums // 个人获得助力人数
                    this.per_assistanceNums =  assistanceNums > 100 ? 100 : assistanceNums// 个人获得助力进度条显示
                    this.total_nums = res.objectData.total_nums // 总参与人数
                    this.total_money = res.objectData.total_money // 总公益金份数
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
        // 点击 立即参赛 或 上传证明  不同情况的处理
        handleEvent() {
            // 1. 判断是否为立即参赛
            if(this.isEnter) {
                // 是参赛按钮
                // 判断用户是都已支付
                if(this.isPayMoney) {
                    // 未支付
                    this.isShowPayMoney = true
                    this.isLayer = true
                    attrCenter('.payMoney')
                    attrCenter('.mask_layer')
                } else {
                    // 已支付
                    // 2. 判断是否为APP进入
                    if(this.isOpenInApp == "app") {
                        // 是APP进入
                        // 3. 判断设备 与APP交互
                        if (this.device == 'ios') {
                            var message = 'signUp'
                            this.sendMessage(message)
                            try {
                                window.webkit.messageHandlers.sendMessage.postMessage(message)
                            } catch (error) {
                                console.log(error)
                            }
                        } else if (this.device == 'android') {
                            window.android.signUp()
                        }
                    } else {
                        // 不是APP进入
                        this.$router.push({
                            path: '/malasmain',
                            query: {
                                event: this.eventId
                            }
                        })
                    }
                }
                
            } else {
                // 上传证明按钮
                
                // 1. 判断是否为APP打开
                if(this.isOpenInApp == 'app') {
                    // 是APP打开
                    this.$router.push({
                        path: '/uploadFileActivity',
                        query: {
                            accountId: this.accountId,
                            eventId: this.eventId,
                            isOpenInApp: this.isOpenInApp
                        }
                    })
                } else {
                    // 不是APP打开
                    this.$router.push({
                        path: '/uploadFileActivity',
                        query: {
                            accountId: this.accountId,
                            eventId: this.eventId
                        }
                    })
                }

                
            }
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
        // 与APP交互
        sendMessage(msg) {

        },
        // 请好友助力 —— 分享活动
        shareActivity() {
            // 判断是否为APP打开
            if(this.isOpenInApp == 'app') {
                // 是APP打开  调用APP的分享
                if (this.device == 'ios') {
                    var message = 'shareActivity'
                    this.sendMessage(message)
                    try {
                        window.webkit.messageHandlers.sendMessage.postMessage(message)
                    } catch (error) {
                        console.log(error)
                    }
                } else if (this.device == 'android') {
                    window.android.shareActivity()
                }
            } else {
                // 不是APP打开  调用微信分享
                this.isShareInWX = true
                attrCenter('.wxShare')
            }
        },
        // 微信分享
        shareInWX() {
            $.ajax({
                type:'get',
                url:'http://ceshi.marathonbm.com/config/signature',
                dataType:'JSON',
                data:{'accountId': this.accountId,'requesturl':'http://html.hpaopao.com/'},
                success:function(data){                        
                    var data=data.objectData;
                    wx.config({
                        debug:true,
                        appId:data.appId,
                        timestamp:data.timestamp,
                        nonceStr:data.nonceStr,
                        signature:data.sign,
                        jsApiList:['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                    }); 

                    wx.ready(function(){
                        wx.onMenuShareAppMessage({
                            title:'重庆火锅接力赛',
                            desc:'分享链接免费吃火锅幺',
                            link:'http://www.baidu.com',
                            imgUrl:'http://www.hpaopao.com/paopao/default_photo.png',
                            success:function(){

                            }
                        });
                        wx.error(function(res){
                            console.log(res);
                        })
                    }); 
                }
            });
        },
        // 关闭支付弹框
        handleClose() {
            this.isShowPayMoney = false
            this.isLayer = false
        }
    },
    mounted() {
        this.shareInWX()
    },
    created() {
        this.device = getTerminal()
        this.accountId = getUrlParam("accountId")
        this.eventId = getUrlParam("eventId")
        this.isOpenInApp = getUrlParam("device")
        this.getData()
    },
}
</script>
<style>
    @import '../../../assets/less/activityIndex/powerActivity.css';
    @import '../../../assets/less/base.css';
</style>