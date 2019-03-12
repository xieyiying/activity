import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import { format } from 'util';

const TopMap = r => require.ensure([], () => r(require('@/components/running_active/Top_map')), 'TopMap');//懒加载方式
const Running_active = r => require.ensure([], () => r(require('@/components/shareRunning/Running_active')), 'Running_active');
const RedPacket_envelope = r => require.ensure([], () => r(require('@/components/Red_envelope/RedPacket_envelope')), 'RedPacket_envelope');
const live_page = r => require.ensure([], () => r(require('@/components/live/live_page')),'live_page');
const Agreenment = r => require.ensure([], () => r(require('@/components/Agreenment')), 'Agreenment');
const Agreenment_gg = r => require.ensure([], () => r(require('@/components/Agreenment_gg')), 'Agreenment_gg');
const peipao = r => require.ensure([], () => r(require('@/components/peipao/peipao')), 'peipao');
const aboutwallet = r => require.ensure([], () => r(require('@/components/aboutwallet')), 'aboutwallet');
const certificate = r => require.ensure([], () => r(require('@/components/certificate/certificate')), 'certificate');
const matchNews = r => require.ensure([], () => r(require('@/components/matchNews/matchNews')), 'matchNews');
const malasmain = r => require.ensure([], () => r(require('@/components/malasong/malasmain/malasmain')), 'malasmain');
const Loginmalas = r => require.ensure([], () => r(require('@/components/malasong/Loginmalas/Loginmalas')), 'Loginmalas');
const passwordlogin = r => require.ensure([], () => r(require('@/components/malasong/passwordlogin/passwordlogin')), 'passwordlogin');
const reset = r => require.ensure([], () => r(require('@/components/malasong/reset/reset')), 'reset');
const addinfo = r => require.ensure([], () => r(require('@/components/malasong/addinfo/addinfo')), 'addinfo');
const Registration = r => require.ensure([], () => r(require('@/components/malasong/Registration/Registration')), 'Registration');
const statuspay = r => require.ensure([], () => r(require('@/components/malasong/statuspay/statuspay')), 'statuspay');
const detail = r => require.ensure([], () => r(require('@/components/malasong/detail/detail')), 'detail');
const NewmainPage = r => require.ensure([], () => r(require('@/components/malasong/NewmainPage/NewmainPage')), 'NewmainPage');
const comments = r => require.ensure([], () => r(require('@/components/malasong/comments/comments')), 'comments');
const review = r => require.ensure([], () => r(require('@/components/malasong/review/review')), 'review');
const topay = r => require.ensure([], () => r(require('@/components/malasong/topay/topay')), 'topay');
const orderDetail = r => require.ensure([], () => r(require('@/components/malasong/orderDetail/orderDetail')), 'orderDetail');
const orderstatus = r => require.ensure([], () => r(require('@/components/malasong/orderstatus/orderstatus')), 'orderstatus');
const userinfo = r => require.ensure([], () => r(require('@/components/malasong/userinfo/userinfo')), 'userinfo');
const infocontent = r => require.ensure([], () => r(require('@/components/malasong/infocontent/infocontent')), 'infocontent');
const accountAbout = r => require.ensure([], () => r(require('@/components/malasong/accountAbout/accountAbout')), 'accountAbout');
const finishCompletion = r => require.ensure([], () => r(require('@/components/malasong/finishCompletion/finishCompletion')), 'finishCompletion');
const Logistics = r => require.ensure([], () => r(require('@/components/malasong/Logistics/Logistics')), 'Logistics');
const paysuccess = r => require.ensure([], () => r(require('@/components/malasong/paysuccess/paysuccess')), 'paysuccess');
const download = r => require.ensure([], () => r(require('@/components/malasong/download/download')), 'download');
const MainPage = r => require.ensure([], () => r(require('@/components/malasong/MainPage/MainPage')), 'MainPage');
const gift = r => require.ensure([], () => r(require('@/components/malasong/gift/gift')), 'gift');
const giftlist = r => require.ensure([], () => r(require('@/components/malasong/gift/giftlist')), 'giftlist');
const giftdetail = r => require.ensure([], () => r(require('@/components/malasong/gift/giftdetail')), 'giftdetail');
const useRecord = r => require.ensure([], () => r(require('@/components/malasong/gift/useRecord')), 'useRecord');
const share_video = r => require.ensure([], () => r(require('@/gg/share_video')), 'share_video');
const power_activity = r => require.ensure([], () => r(require('@/components/malasong/activity/powerActivity')), 'power_activity');
const share_activity = r => require.ensure([], () => r(require('@/components/malasong/activity/shareActivity')), 'share_activity');
const upload_file = r => require.ensure([], () => r(require('@/components/malasong/activity/uploadFile')), 'upload_file');
const fixed_page = r => require.ensure([], () => r(require('@/components/malasong/activity/fixedPage')), 'fixed_page');

// const addinfo1 = r => require.ensure([], () => r(require('@/components/malasong/addinfo1/addinfo1')), 'addinfo1');







Vue.use(Router);
Vue.use(VueResource);
const router = new Router({
  // mode:'history',
  routes: [{
      path: '/getRoute',
      name: 'Top_map',
      component: TopMap
    },
    {
      path: '/run/redPacket',
      name: 'RedPacket_envelope',
      component: RedPacket_envelope
    },
    {
      path: '/activity',
      name: 'Running_active',
      component: Running_active
    },
    {
      path: '/run/live',
      name: 'live_page',
      component: live_page
    },
    {
      path: '/agreement',
      name: 'Agreenment',
      component: Agreenment
    },
    {
      path: '/agreement_gg',
      name: 'Agreenment_gg',
      meta: {
        title: '用户注册协议'
      },
      component: Agreenment_gg
    },
    {
      path: '/peipao',
      name: 'peipao',
      component: peipao
    },
    {
      path: '/aboutwallet',
      name: 'aboutwallet',
      component: aboutwallet

    },
    {
      path: '/certificate',
      name: 'certificate',
      component: certificate
    },
    {
      path: '/matchNews',
      name: 'matchNews',
      component: matchNews
    },
    {
      path: '/malasmain',
      name: 'malasmain',
      component: malasmain
    },
    {
      path: '/Loginmalas',
      name: 'Loginmalas',
      component: Loginmalas
    },
    {
      path: '/passwordlogin',
      name: 'passwordlogin',
      component: passwordlogin
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    },
    {
      path: '/addinfo',
      name: 'addinfo',
      component: addinfo
    },
    {
      path: '/Registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/statuspay',
      name: 'statuspay',
      component: statuspay
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/NewmainPage',
      name: 'NewmainPage',
      component: NewmainPage
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/review',
      name: 'review',
      component: review
    },
    {
      path: '/topay',
      name: 'topay',
      component: topay
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/orderstatus',
      name: 'orderstatus',
      component: orderstatus
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },
    {
      path: '/infocontent',
      name: 'infocontent',
      component: infocontent
    },
    {
      path: '/accountAbout',
      name: 'accountAbout',
      component: accountAbout
    },
    {
      path: '/finishCompletion',
      name: 'finishCompletion',
      component: finishCompletion
    },
    {
      path: '/Logistics',
      name: 'Logistics',
      component: Logistics
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: paysuccess
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/d/mls',
      name: 'download',
      component: download
    },
    {
      path: '/gift',
      name: 'gift',
      component: gift
    },
    {
      path: '/giftlist',
      name: 'giftlist',
      component: giftlist
    },
    {
      path: '/giftdetail',
      name: 'giftdetail',
      component: giftdetail
    },
    {
      path: '/useRecord',
      name: 'useRecord',
      component: useRecord
    },
    {
      path: '/share_video',
      name: 'share_video',
      component: share_video
    },
    {
      path: '/powerActivity',
      name: 'power_activity',
      component: power_activity,
      meta: {
        title: '免费吃火锅'
      }
    },
    {
      path: '/shareActivity/:accountId/:eventId',
      name: 'share_activity',
      component: share_activity
    },
    {
      path: '/uploadFileActivity',
      name: 'upload_file',
      component: upload_file
    },
    {
      path: '/fixedPageActivity',
      name: 'fixed_page',
      component: fixed_page
    },
  ],


});



router.beforeEach((to, from, next) => {
  // var nameArr = ['power_activity', 'share_activity', 'malasmain']
  // var routerToName = to.name
  // var routerFromName = from.name
  // if (!nameArr.includes(routerToName) && !nameArr.includes(routerFromName)) {
  //   next()
  //   return false
  // }
  // if (nameArr.includes(routerToName) || nameArr.includes(routerFromName)) {
  //     window.location.reload();
  // }

  var name = ['power_activity', 'share_activity', 'malasmain']
  var routerToName = to.name
  var routerFromName = from.name
  if ((name.includes(routerToName) && name.includes(routerFromName))) {
    window.location.reload()
    next()
    return false
  }
  if (to.meta.title) { // 路由发生变化修改页面title
    document.title = to.meta.title
  }
  next()
})

export default router