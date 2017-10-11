<template>
    <div class="side_bar">
        <el-row class="tac">
            <el-menu default-active="0"
                     class="el-menu-vertical"
                     :unique-opened="true">
                <template  v-for="(item, index) in nav">
                    <template v-if="item.list.length === 1">
                        <el-menu-item :index="item.list[0].id"
                                      @click="handleView(item.list[0].id)">
                            <i class="el-icon-message"></i>
                            {{item.list[0].name}}
                        </el-menu-item>
                    </template>
                    <template v-else>
                        <el-submenu :index="item.id">
                            <template slot="title">
                                <i :class="iconClass[index]"></i>
                                {{item.name}}</template>
                            <el-menu-item-group>
                                <el-menu-item v-for="(tab, idx) in item.list"
                                              v-bind:index="tab.id"
                                              :key="tab.id"
                                              @click="handleView(tab.id)">
                                    {{tab.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </template>
            </el-menu>
        </el-row>
    </div>
</template>

<script>
import {nav} from '../../index/components';
console.log(nav);
export default {
    data() {
        return {
            nav: nav,
            iconClass:['el-icon-menu','el-icon-setting','el-icon-setting']
        }
    },
    props: {
        data: {}
    },
    methods: {
        handleView (id) {
            this.$store.commit('setCurrentView', id);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
    .side_bar{
        background-color:#eef1f6;
    }

</style>


