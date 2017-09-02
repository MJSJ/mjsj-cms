<template>
  <div>
      <ul class="versionUl" v-if="historyData.length>0">
          <li0 class="versionLi" v-for="item in historyData">{{item.tag}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
      return{

      }
  },
  props:{
      historyData:{
          type:Array
      }
  },
}
</script>
<style lang="less" rel="stylesheet/less">
    .versionUl{
        overflow: hidden;
        .versionLi{
            width: 100px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
    }
</style>