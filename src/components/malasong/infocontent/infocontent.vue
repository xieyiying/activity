<template>
    <div class="infocontent">
         <div class="el-icon-d-arrow-left" style="position:absolute;left:5px;top:10px;z-index:10;z-index:10" @click="lastPage"></div>  
        {{content}}       
    </div>
</template>
<style scoped>
@import './infocontent.css';
</style>
<script>
    export default {
        name: 'infocontent',
        data(){
            return{
              content:""
            }
        },
       created:function () {
        },
        beforeCreate(){
        },
        mounted(){
           this.getcontent()
        },
        methods:{
            lastPage(){
                window.history.back(-1); 
            },
            getcontent(){                
                this.content=this.global.storage.content
            }
        }
    }
</script>