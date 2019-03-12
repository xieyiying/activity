<template>
    <div>
    <video controls  autoplay="autoplay" name="media"><source src="https://api.amemv.com/aweme/v1/play/?video_id=v0200f250000bgtl9m59688g508he1fg&line=0&ratio=540p&media_type=4&vr_type=0&test_cdn=None&improve_bitrate=0" type="video/mp4"></video>
    </div>    
</template>
<script>


export default {
    name:'share_video',
    data(){
        return{
            nick:'',
            photo:'',
            source_address:'',
            pares:0,
            comment:0,
            share:0
        }
    },
    beforeCreate(){

    },
    mounted(){
        this.init();
    },
    methods:{       
        init(){
        $.ajax({
            type:'POST',
            url:'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f4d0000bfsbch81ahqbho6o5e2g&line=0',
            dataType:'json',
            success:function(data){
                console.log(data);

            }
          });  
        }
             

    }
}
</script>

