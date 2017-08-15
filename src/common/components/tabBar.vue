<template>
    <el-tabs v-model="currentView" type="card" closable @tab-remove="removeTab">
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
            return this.$store.state.tabs;
        },
        currentView () {
            return this.$store.state.currentView;
        }
    },
    methods: {
        removeTab(targetName, action) {
        }
    }
}
</script>