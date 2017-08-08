<template>
    <div class="side_bar">
        <el-row class="tac">
            <el-col :span="8">
                <el-menu default-active="1" class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>专题列表
                    </el-menu-item>
    
                    <el-menu-item index="2">
                        <i class="el-icon-setting"></i>用户管理</el-menu-item>
    
                    <el-submenu index="3" v-show="false">
                        <template slot="title">
                            <i class="el-icon-message"></i>很多导航</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        data: {}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
    .side_bar{
        background-color:#eef1f6;
    }
</style>


