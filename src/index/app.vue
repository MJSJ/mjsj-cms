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
    import {mapMutations} from 'vuex'
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
            // 调试用
             window._DATA={
                 u:{
                     id:100001,
                     name:"旷宇",
                     role:2
                 }
             }
             api.login({
                 userID:"100001",
                 password:"ddd"
             })
             .then((data)=>{
                 this.$store.dispatch('fetchUserList');
                 this.$store.dispatch('fetchSubjectList');
                 this.$store.dispatch('fetchTotalTopics', {status: 1});
             })

            /**
             * 正式环境调用
             * push 到master都应该把
             * 调试的注释了
             */
//            if(window._DATA&&window._DATA.u){
//                this.$store.dispatch('fetchUserList');
//                this.$store.dispatch('fetchSubjectList');
//                this.$store.dispatch('fetchTotalTopics', {status: 1});
//            }


        },
        methods: {
            ...mapMutations(['setLoginUser'])
        },
        computed: {

        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
