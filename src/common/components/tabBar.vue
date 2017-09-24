<template>
    <el-tabs v-model="currentView"
             type="card" closable
             class="header-tabs"
             @tab-click="changeView"
             @tab-remove="removeTab">
        <el-tab-pane
                v-for="(item, index) in tabs"
                :key="item.id"
                :label="item.name"
                :name="item.id">
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed:{
        tabs () {
            return this.$store.state.historyTabs;
        },
        currentView () {
            return this.$store.state.currentView;
        }
    },
    methods: {
        removeTab (targetName) {
            this.$store.commit('removeCurrentView', targetName);
        },
        changeView (target) {
            this.$store.commit('setCurrentView', target.name);
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less">
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border-top: 0;
        border-radius: 0;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
        padding: 0 50px 0 50px;
    }
</style>