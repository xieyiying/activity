<template>
<div class="Running_active">
     <div class="bottom" style="position:fixed">
    <div class="bottom_left">
      <img src="../../assets/资源 9-8.png" class="logo">
      <div class="bottom_text">
        <p class="bottom_paopao" >跑跑网</p>
        <p class="bottom_running"  style="height:20px">跑步返现/赢lphonex,新马泰旅游</p>
      </div>
    </div>
    <div class="bottom_right" style="float:right">打开跑跑</div>
  </div>
  <div style="height:5rem"></div>
  <div class="share_info">
     <div class="info_top">
         <div class="account_info">
             <img v-bind:src="image" class="account_img">
            <p class="account_name">{{nick}}用户名</p>
            <p class="account_id">ID:{{accountId}}123456</p>
         </div>
         <div class="attention"><p class="attention_button">关注</p></div>
     </div>
     <div class="message"><p class="account_message">{{message}}评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论</p></div>
     <div class="post_picture"></div>
     <div class="running_detail">
         <i class="routes_line"><img v-bind:src="routes_line" class="routes_img"></i>
         <div class="kilo">
            <div class="kilometers"><img src=""  class="little_img"><p class="account_meter">跑了{{kilometer}}公里</p></div>
            <div class="kilometers"><img src=""  class="little_img"><p class="account_meter">用时{{minutes}}分钟</p><img src=""  class="little_img"><p class="account_meter">平均配速{{speed}}</p></div>
         </div>
     </div>
  </div>
  <div class="comment">热门评论</div>
  <div class="review_content">
    <ul>
        <li class="comment_area" :src="{items}">
            <div class="line">
                <img v-bind:src="comment_img" class="user_img">
                <p class="user_name">{{user_name}}例如:</p>
                <p class="more_comment">{{more_comment}}</p>
            </div>           
        </li>   
          <li class="comment_area" :src="{items}">
            <div class="line">
                <img v-bind:src="comment_img" class="user_img">
                <p class="user_name">{{user_name}}例如:</p>
                <p class="more_comment">{{more_comment}}</p>
            </div>           
        </li>  
          <li class="comment_area" :src="{items}">
            <div class="line">
                <img v-bind:src="comment_img" class="user_img">
                <p class="user_name">{{user_name}}例如:</p>
                <p class="more_comment">{{more_comment}}</p>
            </div>           
        </li>    
    </ul>
  </div>
  <div class="open_button">
      <span class="button">打开跑跑APP参与互动</span>
  </div>
  <div class="comment">更多动态</div>
  <div class="dynamic">
      <ul>
          <li class="">
              <span class="dynamic_info">
               <img v-bind:src="dynamic_image" class="dynamic_image">          
                <p class="account_name">{{account_name}}用户名</p>
                <p class="dynamic_id">ID:{{dynamic_id}}123456</p>              
              </span>
              <!-- <span class="user_dynamic"><p class="">评论评论评论评论评论评论评论评论评论</p> <img src="" class=""></span>                         -->
          </li>
      </ul>
  </div>
   <div class="bottom">
    <div class="bottom_left">
      <img src="../../assets/资源 9-8.png" class="logo">
      <div class="bottom_text">
        <p class="bottom_paopao" >跑跑网</p>
        <p class="bottom_running"  style="height:20px">跑步返现/赢lphonex,新马泰旅游</p>
      </div>
    </div>
    <div class="bottom_right" style="float:right">打开跑跑</div>
  </div>
</div>
</template>
<style scoped>
@import './Running_active.css';
</style>
<script>

export default {
  name: 'Running_active',
  data(){
    return{
        nick: '',
        accountId: '',
        message: '',
        kilometer: '',
        minutes: '',
        speed: '',
        image: '',
        routes_line: '',
        user_name: '',
        content: '',
        items: [],
        dynamic_image: '',
        more_comment: '',
        account_name: '',
        dynamic_id: '',
        comment_img: ''
    }
  },
}
</script>
    