<template>
    <div class="upload">
        <span class="upload_tips_text">接力火锅不停止，1元公益我参与</span>
        <ul class="img_list" :style="{height: imgUlHeight + 'rem'}">
            <li class="upload_img" @click="uploadFile" v-if="isShowUpload == true && isInApp == true"></li>
            <li class="upload_img" v-if="isShowUpload == true && isInApp == false">
                <input type="file" id="inputUpload" @change="webUploadFile">
            </li>
            <li
              v-for="(item, index) in imgList"
              :key="index"
              :style="{backgroundImage: 'url(' + item +')'}"
              ></li>
        </ul>
        <p class="tips" v-if="isShowTips == true">
            提示:<br>
            1.图片最多可上传9张，每张不能超过5M<br>
            2.线上跑步数据截图，火锅发票图片，现场吃火锅图片，3张及以上
        </p>
        <button :class="['commit_img', {'active': isCommit == true}]" @click="commitImg">提交</button>
    </div>
</template>
<script>
import { getTerminal, getUrlParam } from '@/config/utils'
import { uploadImg } from '@/config/httpRequest'
import { uploadImgServer } from '@/config/httpRequest.js'
import {
  httpUrl
} from '@/config/network'
export default {
    name: 'upload_file',
    data() {
        return {
            imangeUrl: '',
            device: '',
            imgUlHeight: 1.8,
            imgList: [],
            isShowUpload: true, // 是否显示上传按钮
            isCommit: false, // 是否可以提交
            isShowTips: true, // 是否显示提示文案
            accountId: '',
            eventId: '',
            isOpenInApp: '',
            isInApp: false
        }
    },
    methods: {
        uploadImg(message) {

        },
        webUploadFile() {
            var formData=new FormData();
            formData.append("file",document.getElementById("inputUpload").files[0]);
            $.ajax({
                type:'POST',
                url: httpUrl +'/down/uploadImage',
                data:formData,
                contentType:false,
                processData:false,            		
                success:(data) => {
                    if(data.code == 1) {
                        this.imgList.push(data.objectData)
                        var imgLen = this.imgList.length
                        if(imgLen >= 9) {
                            this.isShowUpload = false
                        } else if(imgLen >= 3) {
                            this.isCommit = true
                        } else if(imgLen >= 1) {
                            this.isShowTips = false;
                            this.imgUlHeight = 5.12
                        }
                    } else {
                        alert('上传失败')
                    }
                }                   
            });
        },
        uploadFile() {
            if (this.device == 'ios') {
                var message = 'uploadFile'
                this.uploadImg(message)
                try {
                    window.webkit.messageHandlers.uploadImg.postMessage(message)
                } catch (error) {
                    console.log(error)
                }
            } else if (this.device == 'android') {
                window.android.takeImg()
            }
        },
        upload(result) {
            this.imgList.push(result)
            var imgLen = this.imgList.length
            if(imgLen >= 9) {
                this.isShowUpload = false
            } else if(imgLen >= 3) {
                this.isCommit = true
            } else if(imgLen >= 1) {
                this.isShowTips = false;
                this.imgUlHeight = 5.12
            }
        },
        // 提交图片
        commitImg() {
            if(this.isCommit) {
                // 请求接口
                var imgListData = this.imgList.join(',')
                uploadImg({
                    image: imgListData,
                    accountId: this.accountId,
                    eventId: this.eventId
                }).then(res => {
                    console.log(res)
                })
            }
        }
    },
    created() {
        this.device = getTerminal()
        this.$parent.setComponent(this);
        this.accountId = getUrlParam("accountId")
        this.eventId = getUrlParam("eventId")
        this.isOpenInApp = getUrlParam("isOpenInApp")
        if(this.isOpenInApp == '') {
            this.isInApp = false
        } else {
            this.isInApp = true
        }
    },
}
</script>
<style>
    @import '../../../assets/less/activityIndex/uploadFile.css';
    @import '../../../assets/less/base.css';
</style>