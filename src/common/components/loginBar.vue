<template>
    <el-menu theme="dark" mode="horizontal">
        <el-col :span="2">
            <el-menu-item class="top-logo" index="1">MJSJ</el-menu-item>
        </el-col>
        <el-col :span="22">
            <el-row type="flex" justify="space-between">
                <el-row type="flex" justify="start">
                </el-row>
                <el-submenu index="10">
                    <template slot="title">{{name}}</template>
                    <el-menu-item index="logout" @click="logout">登出</el-menu-item>
                </el-submenu>
            </el-row>
        </el-col>
    </el-menu>
</template>

<script>
// window._DATA={
//     u:{
//         id:100001,
//         name:"旷宇",
//         role:2
//     }
// }
let user = window._DATA&&window._DATA.u || {};
import api from "../api/api.js"
export default {
    data() {
        return {
            name: user.name || ""
        }
    },
    methods: {
        logout() {
            api.logout().then((data)=>{
                if(data.success){
                    location.href = "/cms/login";
                }else{
                    this.$message.error('退出失败');
                }
            }).catch(()=>{
                this.$message.error('退出失败');
            })
        }
    }
}
</script>
<style lang="less">
.top-logo {
    color: #fff!important;
    font-size: 26px!important;
    cursor: auto!important;
}
</style>
