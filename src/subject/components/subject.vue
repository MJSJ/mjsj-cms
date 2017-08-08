<template>
    <div class="subject">
        <p>这是具体专题页,下面是接口吐出的数据</p>
        <p>{{subject.content}}</p>
    </div>
</template>

<script>

export default {
    data() {
       return {
        }
    },
    props:{
        subject:{}
    },
    methods:{
    },
    mounted(){
    }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">


</style>
