<template>
    <div class="side_bar">
        <el-row class="tac">
            <el-col :span="8">
                <el-menu default-active="0"
                         class="el-menu-vertical"
                         width="208px"
                         unique-opened="true">
                    <template v-for="(item, index) in nav">
                        <el-submenu :index="index">
                            <el-menu-item-group :title="item.name">
                                <el-menu-item v-for="(tab, idx) in item.list" :index="idx">
                                    {{tab.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {nav} from '../../index/components';
export default {
    data() {
        return {
            nav: nav
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


