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
let DATA = window.__DATA || {};
export default {
    data() {
        return {
            name: DATA.name || ""
        }
    },
    methods: {
        logout() {
            location.href = "/page/logout";
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
