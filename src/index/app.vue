<template>
<div class="app">

    <loginBar></loginBar>



    <el-row>
        <el-col :span="3">
            <SideBar></SideBar>
        </el-col>
        <el-col :span="21">
            <TabBar></TabBar>
            <ComponentsBar></ComponentsBar>
        </el-col>
    </el-row>
</div>
</template>

<script>
import SideBar from '../common/components/sideBar.vue'
import LoginBar from '../common/components/loginBar.vue'
import TabBar from '../common/components/tabBar.vue'
import ComponentsBar from '../common/components/componentsBar.vue'

import api from "../common/api/api.js"
export default {
    name: 'app',
    components: {
        SideBar,
        TabBar,
        LoginBar,
        ComponentsBar
    },
    data() {
        return {

        }
    },
    props: {
        data: {}
    },


    //在加载后会自动执行
    mounted() {
        


        //自动登录的
        //调完了后注释

        api.login({
            userID:"100001",
            password:"ddd"
        })
        .then((data)=>{
            console.log(data)

            //触发一个action
            this.$store.dispatch('fetchSubjectList');
            this.$store.dispatch('fetchUserList');
            this.$store.dispatch('fetchTotalTopics', {status: 1});
        })

    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
   
</style>
